export const createBuffer = (device: GPUDevice, size: number, usage: number) => {
    let outBuf = device.createBuffer({
        size: size,
        usage: usage
    });
    return outBuf;
}

export const createBindGroup = (device: GPUDevice, layout: GPUBindGroupLayout, entries: Array<{buffer: GPUBuffer, size: number}>) => {
    let outBg = device.createBindGroup({
        layout: layout,
        entries: entries.map((el, id) => {            
            return {
                binding: id,
                resource: { 
                    buffer: el.buffer,
                    offset: 0,
                    size: el.size
                }
            }
        }) 
    });
    return outBg;
}

export const createRenderPipelineDescriptor = (
    device: GPUDevice,
    shader: any,
    presentationFormat: GPUTextureFormat,
    bindGroupLayouts: Array<GPUBindGroupLayout>,
    vertexBufferLayouts: Array<GPUVertexBufferLayout>,
    multisampled: boolean,
) => {
    const modul = device.createShaderModule({ code: shader });
    const pipelineLayout = device.createPipelineLayout({
        bindGroupLayouts: bindGroupLayouts
    });
    const renderPipelineDescriptor: GPURenderPipelineDescriptor = {
        label: 'Default render pipeline',
        layout: pipelineLayout,
        vertex: {
            module: modul,
            buffers: vertexBufferLayouts
        },
        fragment: {
            module: modul,
            targets: [{ format: presentationFormat}]
        },
        depthStencil: {
            format: 'depth24plus',
            depthWriteEnabled: true,
            depthCompare: 'less',
        },
        multisample: {
            count: multisampled ? 4 : 1,
        }
    }
    return renderPipelineDescriptor;
}

export const createBindGroupLayout = (
    device: GPUDevice,
    entries: Array<{visibility: number, bufferType: GPUBufferBindingType, hasDynamicOffset: boolean}>,
) => {
    const bindGroupLayoutDescriptor: GPUBindGroupLayoutDescriptor = {
        entries: entries.map((el, id) => {
            return {
                binding: id,
                visibility: el.visibility,
                buffer: { type: el.bufferType, hasDynamicOffset: el.hasDynamicOffset }
            }
        })
    }
    return device.createBindGroupLayout(bindGroupLayoutDescriptor);
}

export const createTexture = (
    device: GPUDevice,
    context: GPUCanvasContext,
    format: GPUTextureFormat,
    usage: number,
    multisampled: boolean,
) => {
    const outTex = device.createTexture({
        size: [context.getCurrentTexture().width, context.getCurrentTexture().height],
        format: format,
        usage: usage,
        sampleCount: multisampled ? 4 : 1,
    });
    return outTex;
}

export const setRenderPassDescriptor = (
    clearValue: GPUColor,
    loadOp: GPULoadOp,
    storeOp: GPUStoreOp,
    depthTexture: GPUTexture
) => {
    const outRPD = {
        colorAttachments: [
            {
                clearValue: clearValue,
                loadOp: loadOp,
                storeOp: storeOp
            }
        ],
        depthStencilAttachment: {
            view: depthTexture.createView(),
            depthClearValue: 1.0,
            depthLoadOp: 'clear',
            depthStoreOp: 'discard',
        }
    } as GPURenderPassDescriptor;
    return outRPD;
}