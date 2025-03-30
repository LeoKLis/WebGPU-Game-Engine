import { Vec3 } from "wgpu-matrix";

export interface IObject {
    name: string,
    id: string,
    position: Float32Array,
    rotation: Float32Array,
    size: Float32Array,
    globalMove: (x: number, y: number, z: number) => void,
    globalRotate: (x: number, y: number, z: number) => void,
    localMove: (x: number, y: number, z: number) => void,
    localRotate: (x: number, y: number, z: number) => void,
    scale: (x: number, y: number, z: number) => void,
}