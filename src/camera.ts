import { Coords, Object } from "./object";
import { vec3, mat4 } from "../node_modules/wgpu-matrix/dist/2.x/wgpu-matrix";

export enum CameraType {
    perspective,
}

export class Camera implements Object {
    public position: Coords;
    public orientation: Coords;

    public type: CameraType;
    public fov: number;
    public near: number;
    public far: number;
    public aspectRatio: number;

    public projectionMatrix = mat4.identity();
    public positionMatrix = mat4.identity();
    public rotationMatrix = mat4.identity();
    
    constructor(type: CameraType, aspectRatio: number, fov?: number, near?: number, far?: number) {
        this.position = {
            x: 0.0,
            y: 0.0,
            z: -3.0,
        };
        this.orientation = {
            x: 0.0,
            y: 0.0,
            z: 0.0,
        };        
        this.type = type;
        this.fov = fov === undefined ? 90 * Math.PI / 180 : fov * Math.PI / 180;
        this.near = near === undefined ? 0.1 : near;
        this.far = far === undefined ? 50 : far;
        this.aspectRatio = aspectRatio;

        this.projectionMatrix = mat4.perspective(this.fov, this.aspectRatio, this.near, this.far);
    }

    public move(x = 0.0, y = 0.0, z = 0.0){
        mat4.translate(this.positionMatrix, [x, y, z], this.positionMatrix);
    }

    public rotate(degreesX = 0.0, degreesY = 0.0, degreesZ = 0.0){
        let radiansX = degreesX * 180 / Math.PI;
        let radiansY = degreesY * 180 / Math.PI;
        let radiansZ = degreesZ * 180 / Math.PI;

        mat4.rotateX(this.rotationMatrix, radiansX, this.rotationMatrix);
        mat4.rotateY(this.rotationMatrix, radiansY, this.rotationMatrix);
        mat4.rotateZ(this.rotationMatrix, radiansZ, this.rotationMatrix);
    }

    public calculate(){
        let out = mat4.create();
        mat4.identity(out);
        mat4.multiply(this.rotationMatrix, out, out);
        mat4.multiply(this.positionMatrix, out, out);
        mat4.multiply(this.projectionMatrix, out, out);

        return out;
    }
    // private setProjectionMatrix = () => {
    //     let tempArr = new Float32Array(16);
    //     tempArr[0] = 1.0 / (this.aspectRatio * Math.tan(this.fov / 2));
    //     tempArr[5] = 1.0 / Math.tan(this.fov / 2);
    //     tempArr[10] = this.far / (this.far - this.near);
    //     tempArr[14] = 1;
    //     tempArr[11] = -this.far * this.near / (this.far - this.near);
    //     return tempArr;
    // }
}