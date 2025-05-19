import { Camera } from "./Objects/camera";
import { Scene } from "./scene";
import { Cube } from "./Objects/shapes/cube";
import { Light } from "./Objects/light";
import { Model } from "./Objects/shapes/model";
import { Sphere } from "./Objects/shapes/sphere";

import { RenderDataDescriptor } from "./Objects/shapes/shape";

import objColorShader from "./shaders/objColorShader.wgsl";
import objTextureShader from "./shaders/objTextureShader.wgsl";
import debugShader from "./shaders/debugShader.wgsl";
import { TextureAtlas } from "./textureAtlas";

export class Renderer {
    private canvas: HTMLCanvasElement;
    private device!: GPUDevice;
    private context!: GPUCanvasContext;
    private presentationFormat!: GPUTextureFormat;
    private colorRenderPipeline!: GPURenderPipeline;
    private textureRenderPipeline!: GPURenderPipeline;
    private debugRenderPipeline!: GPURenderPipeline;
    private renderPassDescriptor!: GPURenderPassDescriptor;

    private multisamlpeTexture!: GPUTexture;

    private renderTarget!: GPUTexture;
    private renderTargetView!: GPUTextureView;

    private cameraBuffer!: GPUBuffer;
    private lightBuffer!: GPUBuffer;
    private objectsBindGroup!: GPUBindGroup;

    private shapesMatrixBuffer!: GPUBuffer;
    private shapesColorBuffer!: GPUBuffer;
    private shapesTextureBuffer!: GPUTexture;
    private debugColorBuffer!: GPUBuffer;
    private sampler!: GPUSampler;
    private shapesColorBindGroup!: GPUBindGroup;
    private shapesTextureBindGroup!: GPUBindGroup;
    private debugBindGroup!: GPUBindGroup;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    public async initialize(textureAtlas: TextureAtlas) {
        if (navigator.gpu === undefined) {
            console.log("This browser/device doesn't support WebGPU...");
            return;
        }

        // Get device
        let adapter = await navigator.gpu.requestAdapter();
        console.log(adapter);
        this.device = await adapter!.requestDevice();
        if (this.device === undefined) {
            console.log("Couldn't load device (not supported)");
            return;
        }

        // Configure context
        this.context = this.canvas.getContext('webgpu') as GPUCanvasContext;
        this.presentationFormat = navigator.gpu.getPreferredCanvasFormat();
        this.context.configure({
            device: this.device,
            format: navigator.gpu.getPreferredCanvasFormat(),
            alphaMode: 'premultiplied'
        });

        // Set canvas size
        this.canvas.width = this.canvas.clientWidth * window.devicePixelRatio;
        this.canvas.height = this.canvas.clientHeight * window.devicePixelRatio;

        // ========== Create bind group layouts ==========
        const objectsBindGroupLayoutDescriptor: GPUBindGroupLayoutDescriptor = {
            label: 'Objects bind group layout desc',
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: {
                        type: "uniform",
                        hasDynamicOffset: false,
                    },
                },
                {
                    binding: 1,
                    visibility: GPUShaderStage.FRAGMENT,
                    buffer: {
                        type: "uniform",
                        hasDynamicOffset: false,
                    },
                },
            ]
        };
        const objectsBindGroupLayout = this.device.createBindGroupLayout(objectsBindGroupLayoutDescriptor);

        const shapesColorBindGroupLayoutDescriptor: GPUBindGroupLayoutDescriptor = {
            label: 'Shapes bind group layout descriptor',
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: {
                        type: 'uniform',
                        hasDynamicOffset: true,
                    },
                },
                {
                    binding: 1,
                    visibility: GPUShaderStage.FRAGMENT,
                    buffer: {
                        type: 'uniform',
                        hasDynamicOffset: true,
                    },
                },
            ]
        }
        const shapesColorBindGroupLayout = this.device.createBindGroupLayout(shapesColorBindGroupLayoutDescriptor);

        const shapesTextureBindGroupLayoutDescriptor: GPUBindGroupLayoutDescriptor = {
            label: 'Shapes texture bind group layout',
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: {
                        type: 'uniform',
                        hasDynamicOffset: true,
                    },
                },
                {
                    binding: 1,
                    visibility: GPUShaderStage.FRAGMENT,
                    sampler: {
                        type: 'filtering',
                    },
                },
                {
                    binding: 2,
                    visibility: GPUShaderStage.FRAGMENT,
                    texture: {
                        sampleType: 'float',
                        viewDimension: '2d',
                        multisampled: false,
                    },
                },
            ]
        }
        const shapesTextureBindGroupLayout = this.device.createBindGroupLayout(shapesTextureBindGroupLayoutDescriptor);

        // ========== Create render pipeline for solid colored objects ==========
        const colorShaderModule = this.device.createShaderModule({ code: objColorShader });
        const colorRenderPipelineDescriptor: GPURenderPipelineDescriptor = {
            label: 'Color render pipeline',
            layout: this.device.createPipelineLayout({ bindGroupLayouts: [objectsBindGroupLayout, shapesColorBindGroupLayout] }),
            vertex: {
                module: colorShaderModule,
                buffers: [
                    {
                        arrayStride: (3 + 3 + 2) * 4, // 3 vertex coords & 3 normals coords & 2 texture coords
                        attributes: [
                            { shaderLocation: 0, offset: 0, format: 'float32x3' },
                            { shaderLocation: 1, offset: 3 * 4, format: 'float32x3' },
                            { shaderLocation: 2, offset: 6 * 4, format: 'float32x2' },
                        ]
                    }
                ]
            },
            fragment: {
                module: colorShaderModule,
                targets: [{ format: this.presentationFormat }]
            },
            primitive: {
                topology: 'triangle-list'
            },
            depthStencil: {
                format: 'depth24plus',
                depthWriteEnabled: true,
                depthCompare: 'less',
            },
            multisample: { count: 4 },
        }
        this.colorRenderPipeline = this.device.createRenderPipeline(colorRenderPipelineDescriptor);

        // ========= Create render pipeline for textured objects ============
        const textureShaderModule = this.device.createShaderModule({ code: objTextureShader });
        const textureRenderPipelineDescriptor: GPURenderPipelineDescriptor = {
            label: 'Texture render pipeline',
            layout: this.device.createPipelineLayout({ bindGroupLayouts: [objectsBindGroupLayout, shapesTextureBindGroupLayout] }),
            vertex: {
                module: textureShaderModule,
                buffers: [
                    {
                        arrayStride: (3 + 3 + 2) * 4, // 3 vertex coords & 3 normals coords & 2 texture coords
                        attributes: [
                            { shaderLocation: 0, offset: 0, format: 'float32x3' },
                            { shaderLocation: 1, offset: 3 * 4, format: 'float32x3' },
                            { shaderLocation: 2, offset: 6 * 4, format: 'float32x2' },
                        ]
                    }
                ]
            },
            fragment: {
                module: textureShaderModule,
                targets: [{ format: this.presentationFormat }]
            },
            primitive: {
                topology: 'triangle-list'
            },
            depthStencil: {
                format: 'depth24plus',
                depthWriteEnabled: true,
                depthCompare: 'less',
            },
            multisample: { count: 4 }
        }
        this.textureRenderPipeline = this.device.createRenderPipeline(textureRenderPipelineDescriptor);

        const debugBindGroupLayoutDescriptor: GPUBindGroupLayoutDescriptor = {
            label: 'Debug bind group layout descriptor',
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: {
                        type: 'uniform',
                        hasDynamicOffset: false,
                    },
                },
                {
                    binding: 1,
                    visibility: GPUShaderStage.FRAGMENT,
                    buffer: {
                        type: 'uniform',
                        hasDynamicOffset: true,
                    },
                },
            ]
        };
        const debugBindGroupLayout = this.device.createBindGroupLayout(debugBindGroupLayoutDescriptor);

        const debugShaderModule = this.device.createShaderModule({ code: debugShader });
        const debugRenderPipelineDescriptor: GPURenderPipelineDescriptor = {
            layout: this.device.createPipelineLayout({ bindGroupLayouts: [debugBindGroupLayout] }),
            vertex: {
                module: debugShaderModule,
                buffers: [
                    {
                        arrayStride: 3 * 4,
                        attributes: [
                            { shaderLocation: 0, offset: 0, format: 'float32x3' },
                        ]
                    }
                ]
            },
            fragment: {
                module: debugShaderModule,
                targets: [{ format: this.presentationFormat }]
            },
            primitive: {
                topology: 'line-list'
            },
            depthStencil: {
                format: 'depth24plus',
                depthWriteEnabled: true,
                depthCompare: 'less'
            },
            multisample: { count: 4 }
        }
        this.debugRenderPipeline = this.device.createRenderPipeline(debugRenderPipelineDescriptor);

        // ========== Objects Bind Group ==========
        this.cameraBuffer = this.device.createBuffer({
            size: 4 * 4 * 4, // 4 x 4 float32 matrix
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });
        this.lightBuffer = this.device.createBuffer({
            label: 'Meduspremnik za svjetlo',
            size: 3 * 4 + 4,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });
        this.objectsBindGroup = this.device.createBindGroup({
            layout: this.colorRenderPipeline.getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: this.cameraBuffer,
                        offset: 0,
                        size: 16 * 4,
                    }
                },
                {
                    binding: 1,
                    resource: {
                        buffer: this.lightBuffer,
                        offset: 0,
                        size: 3 * 4 + 4,
                    }
                },
            ],
        });

        // ========== Shape bind group ==========
        this.shapesMatrixBuffer = this.device.createBuffer({
            label: 'Meduspremnik za matrice oblika',
            size: 4 * 16 * 1024,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });
        this.shapesColorBuffer = this.device.createBuffer({
            label: 'Meduspremnik za boje oblika',
            size: 4 * 4 * 1024,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });
        this.shapesTextureBuffer = this.device.createTexture({
            label: 'Meduspremnik za teksture oblika',
            format: 'rgba8unorm',
            size: [textureAtlas.image.width, textureAtlas.image.height],
            usage: GPUTextureUsage.TEXTURE_BINDING |
                GPUTextureUsage.COPY_DST |
                GPUTextureUsage.RENDER_ATTACHMENT,
        });
        this.debugColorBuffer = this.device.createBuffer({
            label: 'Meduspremnik za boje u debugu',
            size: 4 * 4 * 1024,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        })
        this.sampler = this.device.createSampler({
            addressModeU: 'repeat',
            addressModeV: 'repeat',
        })
        this.shapesColorBindGroup = this.device.createBindGroup({
            layout: this.colorRenderPipeline.getBindGroupLayout(1),
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: this.shapesMatrixBuffer,
                        size: 16 * 4,
                    }
                },
                {
                    binding: 1,
                    resource: {
                        buffer: this.shapesColorBuffer,
                        size: 4 * 4,
                    }
                }
            ]
        });
        this.shapesTextureBindGroup = this.device.createBindGroup({
            layout: this.textureRenderPipeline.getBindGroupLayout(1),
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: this.shapesMatrixBuffer,
                        size: 16 * 4,
                    }
                },
                {
                    binding: 1,
                    resource: this.sampler,
                }, {
                    binding: 2,
                    resource: this.shapesTextureBuffer.createView(),
                },

            ]
        });
        this.debugBindGroup = this.device.createBindGroup({
            layout: this.debugRenderPipeline.getBindGroupLayout(0),
            entries: [
                { binding: 0, resource:  { buffer: this.cameraBuffer, size: 16 * 4 }},
                { binding: 1, resource: { buffer: this.debugColorBuffer , size: 4 * 4} }
            ]
        })

        // Prepare depth texture
        const depthTexture = this.device.createTexture({
            size: [this.context.getCurrentTexture().width, this.context.getCurrentTexture().height],
            format: 'depth24plus',
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
            sampleCount: 4,
        });

        // Initialize and set render pass descriptor
        this.renderPassDescriptor = {
            // @ts-ignore
            colorAttachments: [{
                clearValue: [0.2, 0.2, 0.2, 1],
                loadOp: 'clear',
                storeOp: 'store',
            }
            ],
            depthStencilAttachment: {
                view: depthTexture.createView(),
                depthClearValue: 1.0,
                depthLoadOp: 'clear',
                depthStoreOp: 'discard',
            }
        }
    }

    public render(scene: Scene) {
        const canvasTexture = this.context.getCurrentTexture();
        if (!this.multisamlpeTexture ||
            this.multisamlpeTexture.width !== canvasTexture.width ||
            this.multisamlpeTexture.height !== canvasTexture.height) {
            if (this.multisamlpeTexture) {
                this.multisamlpeTexture.destroy();
            }
            this.multisamlpeTexture = this.device.createTexture({
                format: canvasTexture.format,
                usage: GPUTextureUsage.RENDER_ATTACHMENT,
                size: [canvasTexture.width, canvasTexture.height],
                sampleCount: 4,
            })
        }

        const encoder = this.device.createCommandEncoder({ label: 'Default encoder' });
        (this.renderPassDescriptor.colorAttachments as GPURenderPassColorAttachment[])[0].view = this.multisamlpeTexture.createView();
        (this.renderPassDescriptor.colorAttachments as GPURenderPassColorAttachment[])[0].resolveTarget = canvasTexture.createView();

        const renderPass = encoder.beginRenderPass(this.renderPassDescriptor);

        this.device.queue.writeBuffer(this.cameraBuffer, 0, scene.camera.getData());
        this.device.queue.writeBuffer(this.lightBuffer, 0, scene.light.getData());

        scene.vectors.forEach((vec, idx) => {
            renderPass.setBindGroup(0, this.debugBindGroup, [idx * 256]);
            renderPass.setPipeline(this.debugRenderPipeline);
            let pos = vec.getData();
            const vertexBuffer = this.device.createBuffer({
                label: 'Vertex buffer for debugging',
                size: pos.data.byteLength,
                usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
            });
            this.device.queue.writeBuffer(vertexBuffer, 0, pos.data);
            this.device.queue.writeBuffer(this.debugColorBuffer, idx * 256, pos.color);
            renderPass.setVertexBuffer(0, vertexBuffer);
            renderPass.draw(2);
        });

        renderPass.setBindGroup(0, this.objectsBindGroup);

        let offset = 0;
        scene.shapes.forEach((shape) => {
            let renderData = shape.getData();
            // If image is not set, render with color
            if (renderData.texture?.atlas.image === undefined) {
                renderPass.setPipeline(this.colorRenderPipeline);
                renderPass.setBindGroup(1, this.shapesColorBindGroup, [offset * 256, offset * 256]);
                this.device.queue.writeBuffer(this.shapesMatrixBuffer, offset * 256, renderData.matrix);
                this.device.queue.writeBuffer(this.shapesColorBuffer, offset * 256, renderData.color);
            }
            else {
                renderPass.setPipeline(this.textureRenderPipeline);
                renderPass.setBindGroup(1, this.shapesTextureBindGroup, [offset * 256]);
                this.device.queue.writeBuffer(this.shapesMatrixBuffer, offset * 256, renderData.matrix);
                this.device.queue.copyExternalImageToTexture(
                    { source: renderData.texture.atlas.image },
                    { texture: this.shapesTextureBuffer },
                    {
                        width: renderData.texture.atlas.image.width,
                        height: renderData.texture.atlas.image.height,
                    },
                )
            }

            const vertexBuffer = this.device.createBuffer({
                label: `Vertex buffer for ${renderData.name}`,
                size: renderData.vertices.byteLength * 4,
                usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
            });
            this.device.queue.writeBuffer(vertexBuffer, 0, renderData.vertices);
            renderPass.setVertexBuffer(0, vertexBuffer);

            renderPass.draw(renderData.numberVertices);

            offset += 1;
        });

        renderPass.end();

        const commandBuffer = encoder.finish();
        this.device.queue.submit([commandBuffer]);
    }
};
