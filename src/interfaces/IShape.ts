import { Vec3 } from "wgpu-matrix";

export interface IShape {
    scale: Vec3,
    vertexData: Float32Array,
    normalsData: Float32Array,
    indexData: Uint16Array
}