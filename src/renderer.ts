import shader from "./shaders/triangle.wgsl";

let corX = document.getElementById("cordX") as HTMLInputElement;
let corY = document.getElementById("cordY") as HTMLInputElement;
let corZ = document.getElementById("cordZ") as HTMLInputElement;
let sclX = document.getElementById("sclX") as HTMLInputElement;
let sclY = document.getElementById("sclY") as HTMLInputElement;
let sclZ = document.getElementById("sclZ") as HTMLInputElement;
let fov = document.getElementById("fov") as HTMLInputElement;

export class Renderer {
    private canvas: HTMLCanvasElement;
    private device!: GPUDevice;
    private context!: GPUCanvasContext;

    private pipelineLayout!: GPUPipelineLayout;
    private renderPipeline!: GPURenderPipeline;

    private bindGroupLayout!: GPUBindGroupLayout;
    private bindGroup!: GPUBindGroup;

    private uniformBufferData!: Float32Array;
    private uniformBuffer!: GPUBuffer;

    private modelVertexData: Float32Array[];
    private modelVertDataLen: number;
    private modelBuffers: GPUBuffer[];

    private depthTexture!: GPUTexture;

    private topologyType: GPUPrimitiveTopology;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.modelVertexData = [];
        this.modelBuffers = [];
        this.modelVertDataLen = 0;
        this.topologyType = 'point-list';
    }

    public async init() {
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

        this.pipelineLayout = this.device.createPipelineLayout({
            bindGroupLayouts: [this.bindGroupLayout]
        });

        this.renderPipeline = this.device.createRenderPipeline({
            label: "Render pipeline",
            layout: this.pipelineLayout,
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
            size: [
                this.canvas.clientWidth * window.devicePixelRatio,
                this.canvas.clientHeight * window.devicePixelRatio,
            ],
            format: 'depth24plus',
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
        })

        let bufferDataLength = 4 * 4 * 3;
        this.uniformBufferData = new Float32Array(bufferDataLength);
        this.uniformBuffer = this.device.createBuffer({
            label: 'Ovaj buffer?',
            size: bufferDataLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });
    }

    public loadVertexData = (vertexData: Float32Array) => {
        this.modelVertexData.push(vertexData);

        let modelBuffer = this.device.createBuffer({
            size: vertexData.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        });
        this.modelVertDataLen += vertexData.byteLength;
        this.modelBuffers.push(modelBuffer);

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

        this.pipelineLayout = this.device.createPipelineLayout({
            bindGroupLayouts: [this.bindGroupLayout],
        })

        this.renderPipeline = this.device.createRenderPipeline({
            label: "Render pipeline",
            layout: this.pipelineLayout,
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
                topology: this.topologyType
            }
        });

        this.bindGroup = this.device.createBindGroup({
            label: 'Bind group for all now',
            layout: this.bindGroupLayout,
            entries: [
                { binding: 0, resource: { buffer: this.uniformBuffer } },
                { binding: 1, resource: { buffer: this.modelBuffers[this.modelBuffers.length - 1] } },
            ]
        });
        return this.modelVertexData.length - 1;
    }

    public removeVertexData = (index: number) => {
        if(this.modelVertexData.length == 0 || this.modelVertexData.length <= index){
            console.log("Length of vertex data array is 0 (throw error later). skipping...");
            return;
        }
        let len = this.modelVertexData[index].byteLength;
        this.modelVertDataLen -= len;
        this.modelVertexData.splice(index, 1);
        this.modelBuffers.splice(index, 1);
    }

    public changeTopology = (type: GPUPrimitiveTopology) => {
        this.topologyType = type;
        this.renderPipeline = this.device.createRenderPipeline({
            label: "Render pipeline",
            layout: this.pipelineLayout,
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
                topology: this.topologyType
            }
        });
    }

    private writeUniBufferData = (uniformBufferData: Float32Array, time: number) => {
        uniformBufferData[0] = sclX.valueAsNumber / 100;
        uniformBufferData[1] = sclY.valueAsNumber / 100;
        uniformBufferData[2] = sclZ.valueAsNumber / 100;
        uniformBufferData[3] = fov.valueAsNumber / 10;
        uniformBufferData[4] = corX.valueAsNumber;
        uniformBufferData[5] = corY.valueAsNumber;
        uniformBufferData[6] = corZ.valueAsNumber;
        uniformBufferData[7] = time * 0.001;
        // uniBuffer[8] = mouseCordX
        // uniBuffer[9] = mouseCordY
    }

    public rotateMouse(posX: number, posY: number){
        this.uniformBufferData[8] = posY / this.canvas.clientWidth * Math.PI * 2;
        this.uniformBufferData[9] = posX / this.canvas.clientHeight * Math.PI * 2;
    }

    public render = (time: number) => {
        this.writeUniBufferData(this.uniformBufferData, time);

        this.device.queue.writeBuffer(this.uniformBuffer, 0, this.uniformBufferData, 0, 12);
        for (let i = 0; i < this.modelVertexData.length; i++) {
            this.device.queue.writeBuffer(this.modelBuffers[i], 0, this.modelVertexData[i]);
        }

        const commandEncoder = this.device.createCommandEncoder({ label: "Command encoder in renderer" });
        const renderPass = commandEncoder.beginRenderPass({
            label: "Render pass in renderer",
            colorAttachments: [{
                view: this.context.getCurrentTexture().createView(),
                clearValue: { r: 0.2, g: 0.2, b: 0.2, a: 1.0 },
                loadOp: 'clear',
                storeOp: 'store',
            }],
            depthStencilAttachment: {
                view: this.depthTexture.createView(),
                depthClearValue: 1.0,
                depthLoadOp: 'clear',
                depthStoreOp: 'store',
            }
        });
        renderPass.setPipeline(this.renderPipeline);
        renderPass.setBindGroup(0, this.bindGroup);
        if (this.modelVertDataLen != 0) {
            renderPass.draw(this.modelVertDataLen);
        }
        renderPass.end();
        this.device.queue.submit([commandEncoder.finish()]);
        requestAnimationFrame(this.render);
    }

    public start = () => {
        requestAnimationFrame(this.render);
    }
};

