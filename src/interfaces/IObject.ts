import { Vec3 } from "wgpu-matrix";
import { FixedFloat32Array } from "../containers/fixedFloat32Array";

export interface IObject {
    name: string,
    id: string,
    position: Float32Array,
    rotation: Float32Array,
    localRotate: (x: number, y: number, z: number) => void,
    globalRotate: (x: number, y: number, z: number) => void,
    localMove: (x: number, y: number, z: number) => void,
    globalMove: (x: number, y: number, z: number) => void,
    // customRotate: (x: number, y: number, z: number, pitch?: number, yaw?: number, roll?: number) => void,
}