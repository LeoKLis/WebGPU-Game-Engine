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