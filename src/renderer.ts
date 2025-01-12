import { Camera } from "./camera";
import { Scene } from "./scene";
import shader from "./shaders/shaderMain.wgsl";
import { Cube } from "./shapes/cube";
import { createBindGroup, createBindGroupLayout, createBuffer, createRenderPipelineDescriptor, createTexture, setRenderPassDescriptor } from "./helpers"

export class Renderer {
    private canvas: HTMLCanvasElement;
    private device!: GPUDevice;
    private context!: GPUCanvasContext;
    private presentationFormat!: GPUTextureFormat;
    private renderPipeline!: GPURenderPipeline;
    private renderPassDescriptor!: GPURenderPassDescriptor;

    public cameraBindGroup!: GPUBindGroup;
    public objectBindGroup!: GPUBindGroup;

    private staticBuffer!: GPUBuffer;
    private cameraBuffer!: GPUBuffer;

    private objTranBuffer!: GPUBuffer;
    private colorBuffer!: GPUBuffer;

    private objBuffer!: GPUBuffer;
    private idxBuffer!: GPUBuffer;
    private objBuffer1!: GPUBuffer;
    private idxBuffer1!: GPUBuffer;

    private tempArr!: Map<String, [GPUBuffer, GPUBuffer]>;

    private objectMap: Map<String, [GPUBuffer, GPUBuffer, number]>;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.objectMap = new Map<String, [GPUBuffer, GPUBuffer, number]>();
    }

    public async initializeRenderer() {
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
            format: navigator.gpu.getPreferredCanvasFormat(),
            alphaMode: 'premultiplied'
        });

        // ========== Create bind group layouts ==========
        const cameraBindGroupLayout = createBindGroupLayout(
            this.device,
            [
                {
                    visibility: GPUShaderStage.VERTEX,
                    bufferType: 'uniform'
                }
            ]
        )
        const objectBindGroupLayout = createBindGroupLayout(
            this.device, 
            [
                {
                    visibility: GPUShaderStage.VERTEX,
                    bufferType: 'uniform'
                },
                {
                    visibility: GPUShaderStage.FRAGMENT,
                    bufferType: 'uniform'
                }
            ]
        )

        // Create render pipeline
        this.renderPipeline = this.device.createRenderPipeline(createRenderPipelineDescriptor(
            this.device,
            shader,
            navigator.gpu.getPreferredCanvasFormat(),
            [cameraBindGroupLayout/* , objectBindGroupLayout */],
            [
                {
                    arrayStride: 3 * 4,
                    attributes: [
                        { shaderLocation: 0, offset: 0, format: 'float32x3' }
                    ]
                }
            ]
        ));

        // ========== Camera Bind Group ==========
        this.cameraBuffer = createBuffer(this.device, 4 * 16, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);
        this.cameraBindGroup = createBindGroup(this.device, this.renderPipeline.getBindGroupLayout(0), [this.cameraBuffer]);

        // ========== Object Bind Group ==========
        // this.objTranBuffer = createBuffer(this.device, 4 * 16, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);
        // this.colorBuffer = createBuffer(this.device, 4 * 4, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);
        // this.objectBindGroup = createBindGroup(this.device, this.renderPipeline.getBindGroupLayout(1), [this.objTranBuffer, this.colorBuffer]);

        // ========== Object vertex and index buffer ==========
        this.objBuffer = createBuffer(this.device, 4 * 9, GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST);
        this.idxBuffer = createBuffer(this.device, 2 * 4, GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST);
        this.device.queue.writeBuffer(this.objBuffer, 0, new Float32Array([0.6, 0, 0, 0, 1, 0, -1, 0, 0]))
        this.device.queue.writeBuffer(this.idxBuffer, 0, new Uint16Array([0, 1, 2, 0]));

        this.objBuffer1 = createBuffer(this.device, 4 * 9, GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST);
        this.idxBuffer1 = createBuffer(this.device, 2 * 4, GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST);
        this.device.queue.writeBuffer(this.objBuffer1, 0, new Float32Array([1, 0, 0, 0, 1, 0, 1.5, 1, 0]))
        this.device.queue.writeBuffer(this.idxBuffer1, 0, new Uint16Array([0, 1, 2, 0]));

        this.tempArr = new Map<String, [GPUBuffer, GPUBuffer]>;
        this.tempArr.set('1', [this.objBuffer, this.idxBuffer]);
        this.tempArr.set('2', [this.objBuffer1, this.idxBuffer1]);

        // Prepare depth texture
        const depthTexture = createTexture(this.device, this.context, 'depth24plus', GPUTextureUsage.RENDER_ATTACHMENT);

        // Initialize and set render pass descriptor
        this.renderPassDescriptor = setRenderPassDescriptor([0.2, 0.2, 0.2, 1], 'clear', 'store', depthTexture);
    }

    public render = (scene: Scene, time: number) => {
        // time = time * 0.001;
        for (const el of scene.container) {
            if (el instanceof Camera && el.active) {
                this.device.queue.writeBuffer(this.cameraBuffer, 0, el.update(), 0, 16);
            }
            if (el instanceof Cube) {
                let objVerts = el.getCubeVerticies();
                let val = this.objectMap.get(el.id);
                if (val === undefined) {
                    console.log(`Create map entry for ${el.name}!`);
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
                    this.device.queue.writeBuffer(objBuffer, 0, objVerts.outMat);
                    this.device.queue.writeBuffer(objBuffer, 16 * 4, objVerts.color);
                    this.device.queue.writeBuffer(objBuffer, 16 * 4 + 8 * 4, objVerts.cubeVertexData);
                    this.device.queue.writeBuffer(idxBuffer, 0, objVerts.indexData);

                    val = [objBuffer, idxBuffer, objVerts.numVerticies];
                    this.objectMap.set(el.id, val);
                }
            }
        }

        const encoder = this.device.createCommandEncoder({ label: 'Default encoder' });
        for (let el of this.renderPassDescriptor.colorAttachments) {
            el!.view = this.context.getCurrentTexture().createView();
        }

        const renderPass = encoder.beginRenderPass(this.renderPassDescriptor);
        renderPass.setPipeline(this.renderPipeline);

        renderPass.setBindGroup(0, this.cameraBindGroup);
        
        this.objectMap.forEach((val, key) => {
            renderPass.setVertexBuffer(0, val[0]);
            renderPass.setIndexBuffer(val[1], 'uint16');
            
            // renderPass.setBindGroup(1, this.objectBindGroup);
            renderPass.drawIndexed(val[2], 1, 8);
        })

        // this.tempArr.forEach((el) => {
        //     renderPass.setVertexBuffer(0, el[0]);
        //     renderPass.setIndexBuffer(el[1], 'uint16');
        //     renderPass.drawIndexed(3);
        // })
        // this.device.queue.writeBuffer(this.objBuffer, 0, new Float32Array([0.6, 0, 0, 0, 1, 0, -1, 0, 0]))
        // this.device.queue.writeBuffer(this.idxBuffer, 0, new Uint16Array([0, 1, 2, 0]));
        // renderPass.setVertexBuffer(0, this.objBuffer);
        // renderPass.setIndexBuffer(this.idxBuffer, 'uint16');
        // renderPass.drawIndexed(3);

        // this.device.queue.writeBuffer(this.objBuffer1, 0, new Float32Array([1, 0, 0, 0, 1, 0, 1.5, 1, 0]))
        // this.device.queue.writeBuffer(this.idxBuffer1, 0, new Uint16Array([0, 1, 2, 0]));
        // renderPass.setVertexBuffer(0, this.objBuffer1);
        // renderPass.setIndexBuffer(this.idxBuffer1, 'uint16');
        // renderPass.drawIndexed(3);

        // renderPass.draw(6);

        renderPass.end();

        const commandBuffer = encoder.finish();
        this.device.queue.submit([commandBuffer]);
    }
};
