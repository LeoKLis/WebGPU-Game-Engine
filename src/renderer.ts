import shader from "./shaders/triangle.wgsl"

export class Renderer {
    private device!: GPUDevice;
    private canvas: HTMLCanvasElement;
    private context!: GPUCanvasContext;
    private renderPipeline!: GPURenderPipeline;

    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
    }

    public async init() {
        const adapter = await navigator.gpu.requestAdapter() as GPUAdapter;
        this.device = await adapter.requestDevice();

        this.context = this.canvas.getContext('webgpu') as GPUCanvasContext;
        this.context.configure({
            device: this.device,
            format: navigator.gpu.getPreferredCanvasFormat()
        });

        this.createPipeline();
        this.render();
    }

    private createPipeline(){
        const renderPipelineDescriptor: GPURenderPipelineDescriptor = {
            label: "Render pipeline",
            layout: "auto",
            vertex: {
                module: this.device.createShaderModule({ code: shader })
            },
            fragment: {
                module: this.device.createShaderModule({ code: shader }),
                targets: [{ format: navigator.gpu.getPreferredCanvasFormat() }]
            }
        };
        this.renderPipeline = this.device.createRenderPipeline(renderPipelineDescriptor);
    }

    private render(bindGroups?: Array<GPUBindGroup>) {
        const commandEncoder = this.device?.createCommandEncoder({ label: "Command encoder in renderer" });
        
        const renderPassDescriptor: GPURenderPassDescriptor = {
            label: "Render pass in renderer",
            colorAttachments: [
                {
                    view: this.context.getCurrentTexture().createView(),
                    clearValue: { r: 0.2, g: 0.2, b: 0.2, a: 1.0 },
                    loadOp: 'load',
                    storeOp: 'store'
                }
            ]
        }
        const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor);
        renderPass.setPipeline(this.renderPipeline);
        if (bindGroups !== undefined) {
            bindGroups?.forEach((bg, idx) => {
                renderPass.setBindGroup(idx, bg);
            });
        }
        renderPass.draw(3);
        renderPass.end();
        this.device.queue.submit([commandEncoder.finish()]);
    }
};

