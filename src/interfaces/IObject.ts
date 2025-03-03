import { Vec3 } from "wgpu-matrix";

export interface IObject {
    name: string,
    id: string,
    position: Vec3,
    rotation: Vec3,
    move: (x: number, y: number, z: number) => void,
    rotate: (rotX: number, rotY: number, rotZ: number) => void,
}