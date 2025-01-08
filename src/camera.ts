import { IObject } from "./interfaces/IObject";
import { vec3, mat4, Mat4, Vec3, Vec4 } from "wgpu-matrix";

export enum CameraType {
    perspective,
}

export class Camera implements IObject{
    public name: string;
    public position = vec3.create(0, 0, -5);
    public orientation = vec3.create(0, 0, 0);
    // public front: Vec3;
    public right: Vec3;
    public up: Vec3;
    public back: Vec3;

    public yaw = 0;
    public pitch = 0;

    public type: CameraType;
    public fov: number;
    public near: number;
    public far: number;
    public aspectRatio: number;

    public projectionMatrix: Mat4;
    public positionMatrix: Mat4;
    public rotationMatrix: Mat4;

    public active: boolean;
    
    constructor(type: CameraType, aspectRatio: number, fov = Math.PI/3, near = 0.1, far = 100) {      
        this.name = "camera";
        this.type = type;
        this.fov = fov;
        this.near = near;
        this.far = far;
        this.aspectRatio = aspectRatio;

        this.projectionMatrix = mat4.perspective(this.fov, this.aspectRatio, this.near, this.far);
        this.rotationMatrix = mat4.identity();
        this.positionMatrix = mat4.translate(mat4.identity(), this.position);

        this.right = new Float32Array(this.rotationMatrix.buffer, 4 * 0, 3);
        this.up = new Float32Array(this.rotationMatrix.buffer, 4 * 4, 3);
        this.back = new Float32Array(this.rotationMatrix.buffer, 4 * 8, 3);
        this.recalcAngles(this.back);
        this.active = false;
    }

    public move(x = 0.0, y = 0.0, z = 0.0){
        let movement = vec3.create(0, 0, 0);
        movement = vec3.addScaled(movement, this.right, x);
        movement = vec3.addScaled(movement, this.up, y);
        movement = vec3.addScaled(movement, this.back, z);        
        
        mat4.translate(this.positionMatrix, movement, this.positionMatrix);
    }

    public rotate(degreesX = 0.0, degreesY = 0.0, degreesZ = 0.0){
        let radiansX = degreesX * 180 / Math.PI;
        let radiansY = degreesY * 180 / Math.PI;

        this.yaw += radiansY;
        this.pitch += radiansX;

        mat4.rotateX(mat4.rotationY(this.yaw), this.pitch, this.rotationMatrix);
    }

    public recalcAngles(vec: Vec3){
        this.yaw = Math.atan2(vec[0], vec[2]);
        this.pitch = -Math.asin(vec[1]);
    }

    public update(){
        let viewMatrix = mat4.multiply(mat4.inverse(this.rotationMatrix), this.positionMatrix);
        return mat4.multiply(this.projectionMatrix, viewMatrix);
    }

    public printMat4(matrix: Mat4) {
        let str = "";
        matrix.forEach((el, idx) => {
            str += el + " ";
            if((idx+1) % 4 == 0 && idx != 1){
                console.log(str);
                str = "";
            }
        });
    }
}