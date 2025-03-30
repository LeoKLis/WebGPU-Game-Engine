import { vec3, mat4, Mat4, Vec3, Vec4 } from "wgpu-matrix";
import { Object, ObjectDescriptor } from "./object";

export enum CameraType {
    perspective,
}

export interface CameraDescriptor extends ObjectDescriptor {
    name: string;
    id: string;
    position: [number, number, number];
    rotation: [number, number, number];
    size: [number, number, number];
    cameraType: CameraType;
    active: boolean;
}

export class Camera extends Object{
    public type: CameraType;
    public fov: number;
    public near: number;
    public far: number;
    public aspectRatio: number;

    public active: boolean;
    
    private projectionMatrix: Float32Array;
    
    constructor(
        cameraDescriptor: CameraDescriptor
    ) {      
        super(cameraDescriptor);

        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.aspectRatio = canvas.width / canvas.height;
        this.type = cameraDescriptor.cameraType;
        this.fov = Math.PI/3;
        this.near = 0.1;
        this.far = 100;
        this.projectionMatrix = mat4.perspective(this.fov, this.aspectRatio, this.near, this.far);
        this.active = cameraDescriptor.active;
    }

    public update () {
        let mdl = mat4.multiply(mat4.inverse(this.rotationMatrix), this.positionMatrix);
        return mat4.multiply(this.projectionMatrix, mat4.scale(mdl, this.size));
    }
}