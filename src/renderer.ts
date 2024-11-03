import shader from "./shaders/triangle.wgsl"
// import { cubeVertex } from "./objects/cube"

let corX = document.getElementById("cordX") as HTMLInputElement;
let corY = document.getElementById("cordY") as HTMLInputElement;
let corZ = document.getElementById("cordZ") as HTMLInputElement;
let sclX = document.getElementById("sclX") as HTMLInputElement;
let sclY = document.getElementById("sclY") as HTMLInputElement;
let sclZ = document.getElementById("sclZ") as HTMLInputElement;
let fov = document.getElementById("fov") as HTMLInputElement;

export class Renderer {
    private canvas: HTMLCanvasElement;
    public device!: GPUDevice;
    private context!: GPUCanvasContext;
    private renderPipeline!: GPURenderPipeline;
    private bindGroup!: GPUBindGroup;
    private bindGroupLayout!: GPUBindGroupLayout;
    private uniformBuffer!: GPUBuffer;
    private teapotBuffer!: GPUBuffer;
    private bufferData!: Float32Array;
    private depthTexture!: GPUTexture;
    private vertexData!: Float32Array;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    public async init(vertexData: Float32Array) {
        this.vertexData = vertexData;
        const adapter = await navigator.gpu.requestAdapter() as GPUAdapter;
        this.device = await adapter.requestDevice();

        this.context = this.canvas.getContext('webgpu') as GPUCanvasContext;
        this.context.configure({
            device: this.device,
            format: navigator.gpu.getPreferredCanvasFormat()
        });

        this.bindGroupLayout = this.device.createBindGroupLayout({
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: {
                        type: "uniform",
                    }
                },
                {
                    binding: 1,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: {
                        type: "read-only-storage",
                    }
                }
            ]
        });

        const pipelineLayout = this.device.createPipelineLayout({
            bindGroupLayouts: [this.bindGroupLayout]
        });

        this.renderPipeline = this.device.createRenderPipeline({
            label: "Render pipeline",
            layout: pipelineLayout,
            vertex: {
                module: this.device.createShaderModule({ code: shader })
            },
            fragment: {
                module: this.device.createShaderModule({ code: shader }),
                targets: [{ format: navigator.gpu.getPreferredCanvasFormat() }]
            },
            depthStencil: {
                format: 'depth24plus',
                depthWriteEnabled: true,
                depthCompare: 'less',
            },
            primitive: {
                topology: 'point-list'
            }
        });

        this.depthTexture = this.device.createTexture({
            size: [this.canvas.clientWidth * window.devicePixelRatio, this.canvas.clientHeight * window.devicePixelRatio],
            format: 'depth24plus',
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
        })

        let bufferDataLength = 4 * 4 * 2;
        this.bufferData = new Float32Array(bufferDataLength);
        this.uniformBuffer = this.device.createBuffer({
            label: 'Ovaj buffer?',
            size: bufferDataLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        this.teapotBuffer = this.device.createBuffer({
            size: this.vertexData.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        })

        this.bindGroup = this.device.createBindGroup({
            label: 'Bind group for rotating triangles',
            layout: this.bindGroupLayout,
            entries: [
                { binding: 0, resource: { buffer: this.uniformBuffer } },
                { binding: 1, resource: { buffer: this.teapotBuffer } },
            ]
        });
        requestAnimationFrame(this.render)
    }

    public loadData(vertexData: Float32Array) {
        this.vertexData = vertexData;

        this.teapotBuffer = this.device.createBuffer({
            size: this.vertexData.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        })

        this.bindGroup = this.device.createBindGroup({
            label: 'Bind group for rotating triangles',
            layout: this.bindGroupLayout,
            entries: [
                { binding: 0, resource: { buffer: this.uniformBuffer } },
                { binding: 1, resource: { buffer: this.teapotBuffer } },
            ]
        });
    }

    public changeTexture(type: GPUPrimitiveTopology){
        const pipelineLayout = this.device.createPipelineLayout({
            bindGroupLayouts: [this.bindGroupLayout]
        });

        this.renderPipeline = this.device.createRenderPipeline({
            label: "Render pipeline",
            layout: pipelineLayout,
            vertex: {
                module: this.device.createShaderModule({ code: shader })
            },
            fragment: {
                module: this.device.createShaderModule({ code: shader }),
                targets: [{ format: navigator.gpu.getPreferredCanvasFormat() }]
            },
            depthStencil: {
                format: 'depth24plus',
                depthWriteEnabled: true,
                depthCompare: 'less',
            },
            primitive: {
                topology: type
            }
        });
    }

    public render = (time: number) => {
        this.bufferData[0] = sclX.valueAsNumber / 100;
        this.bufferData[1] = sclY.valueAsNumber / 100;
        this.bufferData[2] = sclZ.valueAsNumber / 100;
        this.bufferData[3] = fov.valueAsNumber / 10;
        this.bufferData[4] = corX.valueAsNumber;
        this.bufferData[5] = corY.valueAsNumber;
        this.bufferData[6] = corZ.valueAsNumber;
        this.bufferData[7] = time * 0.001;

        this.device.queue.writeBuffer(this.uniformBuffer, 0, this.bufferData, 0, 8);
        this.device.queue.writeBuffer(this.teapotBuffer, 0, this.vertexData);

        const commandEncoder = this.device.createCommandEncoder({ label: "Command encoder in renderer" });

        const renderPassDescriptor: GPURenderPassDescriptor = {
            label: "Render pass in renderer",
            colorAttachments: [
                {
                    view: this.context.getCurrentTexture().createView(),
                    clearValue: { r: 0.2, g: 0.2, b: 0.2, a: 1.0 },
                    loadOp: 'clear',
                    storeOp: 'store',
                }
            ],
            depthStencilAttachment: {
                view: this.depthTexture.createView(),
                depthClearValue: 1.0,
                depthLoadOp: 'clear',
                depthStoreOp: 'store',
            }
        }
        const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor);
        renderPass.setPipeline(this.renderPipeline);
        renderPass.setBindGroup(0, this.bindGroup);
        renderPass.draw(this.vertexData.byteLength);
        renderPass.end();
        this.device.queue.submit([commandEncoder.finish()]);
        requestAnimationFrame(this.render)
    }
};

