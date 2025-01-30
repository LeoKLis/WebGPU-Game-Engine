import { Camera } from "./Objects/camera";
import { Scene } from "./scene";
import shader from "./shaders/shaderMain.wgsl";
import { Cube } from "./Objects/shapes/cube";
import { createBindGroup, createBindGroupLayout, createBuffer, createRenderPipelineDescriptor, createTexture, setRenderPassDescriptor } from "./helpers"
import { Light } from "./Objects/light";
import { Model } from "./Objects/model";

export class Renderer {
    private canvas: HTMLCanvasElement;
    private device!: GPUDevice;
    private context!: GPUCanvasContext;
    private presentationFormat!: GPUTextureFormat;
    private renderPipeline!: GPURenderPipeline;
    private renderPassDescriptor!: GPURenderPassDescriptor;

    private multisamlpeTexture!: GPUTexture;
    
    private renderTarget!: GPUTexture;
    private renderTargetView!: GPUTextureView;

    private cameraBindGroup!: GPUBindGroup;
    private objectBindGroup!: GPUBindGroup;

    private cameraBuffer!: GPUBuffer;
    private lightBuffer!: GPUBuffer;

    private objTranBuffer!: GPUBuffer;
    private colorBuffer!: GPUBuffer;

    private isMultisampled = true;

    private objectMap: Map<String, GPUBuffer>;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.objectMap = new Map<String, GPUBuffer>();
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

        this.canvas.width = this.canvas.clientWidth * window.devicePixelRatio;
        this.canvas.height = this.canvas.clientHeight * window.devicePixelRatio;

        // ========== Create bind group layouts ==========
        const cameraBindGroupLayout = createBindGroupLayout(
            this.device,
            [
                {
                    visibility: GPUShaderStage.VERTEX,
                    bufferType: 'uniform',
                    hasDynamicOffset: false
                },
                {
                    visibility: GPUShaderStage.FRAGMENT,
                    bufferType: 'uniform',
                    hasDynamicOffset: false
                }
            ],
        )
        const objectBindGroupLayout = createBindGroupLayout(
            this.device,
            [
                {
                    visibility: GPUShaderStage.VERTEX,
                    bufferType: 'uniform',
                    hasDynamicOffset: true
                },
                {
                    visibility: GPUShaderStage.FRAGMENT,
                    bufferType: 'uniform',
                    hasDynamicOffset: true
                }
            ],
        )

        // Create render pipeline
        this.renderPipeline = this.device.createRenderPipeline(createRenderPipelineDescriptor(
            this.device,
            shader,
            navigator.gpu.getPreferredCanvasFormat(),
            [cameraBindGroupLayout, objectBindGroupLayout],
            [
                {
                    arrayStride: (3 + 3) * 4, // vertex (3) i normals (3)
                    attributes: [
                        { shaderLocation: 0, offset: 0, format: 'float32x3' },
                        { shaderLocation: 1, offset: 3 * 4, format: 'float32x3' }
                    ]
                }
            ],
            this.isMultisampled,
        ));

        // ========== Camera Bind Group ==========
        this.cameraBuffer = createBuffer(this.device, 16 * 4, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);
        this.lightBuffer = createBuffer(this.device, 3 * 4 * 4, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);
        this.lightBuffer.label = "Svjetlo meduspremnik";
        this.cameraBindGroup = createBindGroup(this.device, this.renderPipeline.getBindGroupLayout(0), [{ buffer: this.cameraBuffer, size: 16 * 4 }, { buffer: this.lightBuffer, size: 3 * 4 * 4 }]);

        // ========== Object Bind Group ==========
        this.objTranBuffer = createBuffer(this.device, 4 * 16 * 1024, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);
        this.colorBuffer = createBuffer(this.device, 4 * 4 * 1024, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);
        this.objectBindGroup = createBindGroup(this.device, this.renderPipeline.getBindGroupLayout(1), [{ buffer: this.objTranBuffer, size: 4 * 16 }, { buffer: this.colorBuffer, size: 4 * 4 }]);

        // Prepare depth texture
        const depthTexture = createTexture(this.device, this.context, 'depth24plus', GPUTextureUsage.RENDER_ATTACHMENT, this.isMultisampled);

        // Initialize and set render pass descriptor
        this.renderPassDescriptor = setRenderPassDescriptor([0.2, 0.2, 0.2, 1], 'clear', 'store', depthTexture);
    }

    public render = (scene: Scene, time: number) => {
        const canvasTexture = this.context.getCurrentTexture();
        if(!this.multisamlpeTexture || 
            this.multisamlpeTexture.width !== canvasTexture.width ||
            this.multisamlpeTexture.height !== canvasTexture.height){
            if (this.multisamlpeTexture){
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
        for (let el of this.renderPassDescriptor.colorAttachments) {
            el!.view = this.multisamlpeTexture.createView();
            el!.resolveTarget = canvasTexture.createView();
        }

        const renderPass = encoder.beginRenderPass(this.renderPassDescriptor);
        renderPass.setPipeline(this.renderPipeline);

        renderPass.setBindGroup(0, this.cameraBindGroup);

        let objectCount = 0;
        let lightCount = 0;
        let lightArr = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        scene.container.forEach((el) => {
            if (el instanceof Camera && el.active) {
                this.device.queue.writeBuffer(this.cameraBuffer, 0, el.update(), 0, 16);
            }
            if (el instanceof Cube) {
                let objVerts = el.getData();
                let val = this.objectMap.get(el.id);
                if (val === undefined) {
                    console.log(`Create map entry for ${el.name}!`);
                    let objBuffer = this.device.createBuffer({
                        label: el.name,
                        size: objVerts.vertexData.byteLength,
                        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
                        mappedAtCreation: true,
                    });
                    let buffer = objBuffer.getMappedRange();
                    let view = new Float32Array(buffer);
                    view.set(objVerts.vertexData);
                    
                    objBuffer.unmap();
                    val = objBuffer;
                    this.objectMap.set(el.id, val);
                }

                this.device.queue.writeBuffer(this.objTranBuffer, objectCount * 256, objVerts.objectMatrix);
                this.device.queue.writeBuffer(this.colorBuffer, objectCount * 256, objVerts.color);

                renderPass.setVertexBuffer(0, val);
                renderPass.setBindGroup(1, this.objectBindGroup, [objectCount * 256, objectCount * 256]);

                renderPass.draw(objVerts.numVerticies);
                objectCount += 1;
            }
            if (el instanceof Model) {
                let objVerts = el.getData();
                if (objVerts === undefined) {
                    return;
                }
                let val = this.objectMap.get(el.id);
                if (val === undefined) {
                    console.log(`Create map entry for ${el.name}`);
                    let objBuffer = this.device.createBuffer({
                        label: el.name,
                        size: 20352384,
                        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
                        mappedAtCreation: true,
                    });
                    let buffer = objBuffer.getMappedRange();
                    let view = new Float32Array(buffer);
                    view.set(objVerts.vertexData);
                    
                    objBuffer.unmap();
                    val = objBuffer;
                    this.objectMap.set(el.id, val);
                }

                this.device.queue.writeBuffer(this.objTranBuffer, objectCount * 256, objVerts.objectMatrix);
                this.device.queue.writeBuffer(this.colorBuffer, objectCount * 256, objVerts.color);

                renderPass.setVertexBuffer(0, val);
                renderPass.setBindGroup(1, this.objectBindGroup, [objectCount * 256, objectCount * 256]);

                renderPass.draw(objVerts.numVerticies);
                objectCount += 1;
            }
            if (el instanceof Light) {
                let lightData = el.getData();
                lightArr.set(lightData.orientation, lightCount * 4);

                this.device.queue.writeBuffer(this.lightBuffer, 0, lightArr);
                lightCount += 1;
            }
        });
        // renderPass.draw(6);
        renderPass.end();

        const commandBuffer = encoder.finish();
        this.device.queue.submit([commandBuffer]);
    }
};
