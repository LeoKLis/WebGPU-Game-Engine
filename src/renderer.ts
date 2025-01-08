import objectHash from "object-hash";
import { Camera } from "./camera";
import { Scene } from "./scene";
import shader from "./shaders/shaderMain.wgsl";
import { Cube } from "./shapes/cube";

export class Renderer {
    private canvas: HTMLCanvasElement;
    private device!: GPUDevice;
    private context!: GPUCanvasContext;
    private presentationFormat!: GPUTextureFormat;
    private renderPipeline!: GPURenderPipeline;
    private renderPassDescriptor!: GPURenderPassDescriptor;

    public cameraBindGroup!: GPUBindGroup;

    private staticBuffer!: GPUBuffer;
    private cameraBuffer!: GPUBuffer;

    private objectBufferMap: Map<String, [GPUBuffer, GPUBuffer]>;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.objectBufferMap = new Map<String, [GPUBuffer, GPUBuffer]>();
    }

    public async initializeRenderer(camera: Camera) {
        if (navigator.gpu === undefined) {
            console.log("This browser/device doesn't support WebGPU...");
            return;
        }
        // Get device
        let adapter = await navigator.gpu.requestAdapter();
        this.device = await adapter!.requestDevice();
        if (this.device === undefined) {
            console.log("Couldn't load device. Exiting...");
            return;
        }

        // Configure context
        this.context = this.canvas.getContext('webgpu') as GPUCanvasContext;
        this.presentationFormat = navigator.gpu.getPreferredCanvasFormat();
        this.context.configure({
            device: this.device,
            format: this.presentationFormat,
            alphaMode: 'premultiplied'
        });

        // Create render pipeline
        const renderPipelineDescriptor = this.createRenderPipelineDescriptor();
        this.renderPipeline = this.device.createRenderPipeline(renderPipelineDescriptor);

        this.staticBuffer = this.device.createBuffer({
            size: 4,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        })

        this.cameraBuffer = this.device.createBuffer({
            size: 4 * 16,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        })

        this.cameraBindGroup = this.device.createBindGroup({
            layout: this.renderPipeline.getBindGroupLayout(0),
            entries: [
                { binding: 0, resource: { buffer: this.staticBuffer } },
                { binding: 1, resource: { buffer: this.cameraBuffer } },
            ]
        })

        // Prepare depth texture
        const depthTexture = this.device.createTexture({
            size: [this.context.getCurrentTexture().width, this.context.getCurrentTexture().height],
            format: 'depth24plus',
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
        });

        // Initialize render pass descriptor
        this.renderPassDescriptor = {
            label: 'Default render pass descriptor',
            colorAttachments: [
                {
                    clearValue: [0.3, 0.3, 0.3, 1],
                    loadOp: 'clear',
                    storeOp: 'store',
                },
            ],
            depthStencilAttachment: {
                view: depthTexture.createView(),
                depthClearValue: 1.0,
                depthLoadOp: 'clear',
                depthStoreOp: 'store',
            },
        } as GPURenderPassDescriptor;
    }

    private createRenderPipelineDescriptor = () => {
        const module = this.device.createShaderModule({ code: shader });

        const cameraBindGroupLayoutDescriptor: GPUBindGroupLayoutDescriptor = {
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: { type: "uniform" },
                },
                {
                    binding: 1,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: { type: "uniform" },
                },
            ]
        };

        const cameraBindGroupLayout = this.device.createBindGroupLayout(cameraBindGroupLayoutDescriptor);
        const pipelineLayout = this.device.createPipelineLayout({
            bindGroupLayouts: [cameraBindGroupLayout]
        })

        let renderPipelineDescriptor = {
            label: 'Default render pipeline',
            layout: pipelineLayout,
            vertex: {
                module: module,
                buffers: [
                    {
                        arrayStride: 4 * 4,
                        attributes: [
                            {shaderLocation: 0, offset: 0, format: 'float32x4'}
                        ]
                    }
                ]
            },
            fragment: {
                module: module,
                targets: [{ format: this.presentationFormat }],
            },
            depthStencil: {
                format: 'depth24plus',
                depthWriteEnabled: true,
                depthCompare: 'less'
            }
        } as GPURenderPipelineDescriptor;
        return renderPipelineDescriptor;
    }

    public render = (scene: Scene, time: number) => {
        time = time * 0.001;
        this.device.queue.writeBuffer(this.staticBuffer, 0, new Float32Array([time]), 0, 1);



        for (let el of this.renderPassDescriptor.colorAttachments) {
            el!.view = this.context.getCurrentTexture().createView();
        }
        const encoder = this.device.createCommandEncoder({ label: 'Default encoder' });
        const renderPass = encoder.beginRenderPass(this.renderPassDescriptor);
        renderPass.setPipeline(this.renderPipeline);


        scene.container.forEach((el, id) => {
            if (el instanceof Camera && el.active) {
                this.device.queue.writeBuffer(this.cameraBuffer, 0, el.update(), 0, 16);
                renderPass.setBindGroup(0, this.cameraBindGroup);
            }
            if (el instanceof Cube) {
                let objVerts = el.getCubeVerticies();
                let val = this.objectBufferMap.get(objectHash(el))!;
                if (val === undefined) {
                    let objBuffer = this.device.createBuffer({
                        label: el.name,
                        size: objVerts.cubeVertexData.byteLength,
                        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
                    });
                    let idxBuffer = this.device.createBuffer({
                        label: el.name,
                        size: objVerts.indexData.byteLength,
                        usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
                    });
                    val = [objBuffer, idxBuffer];
                    this.objectBufferMap.set(objectHash(el), [objBuffer, idxBuffer]);
                }

                this.device.queue.writeBuffer(val[0], 0, objVerts.cubeVertexData);
                this.device.queue.writeBuffer(val[1], 0, objVerts.indexData);
                renderPass.setVertexBuffer(0, val[0]);
                renderPass.setIndexBuffer(val[1], 'uint16');
                renderPass.drawIndexed(objVerts.numVerticies);
            }

        });

        // renderPass.draw(3, undefined, 3);

        renderPass.end();
        const commandBuffer = encoder.finish();
        this.device.queue.submit([commandBuffer]);
    }
};
