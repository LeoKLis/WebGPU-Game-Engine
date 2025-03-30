import { mat4, Mat4, vec3 } from "wgpu-matrix";
import { IObject } from "../interfaces/IObject";
import { unescapeLeadingUnderscores } from "typescript";

export interface ObjectDescriptor {
    name: string;
    id: string;
    position: [number, number, number];
    rotation: [number, number, number];
    size?: [number, number, number];
}

export class Object implements IObject {
    public name: string;
    public id: string;
    public position: Float32Array;
    public rotation: Float32Array;
    public size: Float32Array;
    protected positionMatrix: Mat4;
    protected rotationMatrix: Mat4;
    protected scaleMatrix: Mat4;
    protected right: Float32Array;
    protected up: Float32Array;
    protected back: Float32Array;
    
    public yaw!: number;
    public pitch!: number;
    public roll: number;

    constructor(
        objectDescriptor: ObjectDescriptor
    ) {
        this.name = objectDescriptor.name;
        this.id = objectDescriptor.id;
        this.rotation = vec3.create(...objectDescriptor.rotation);
        if (objectDescriptor.size !== undefined)
            this.size = vec3.create(...objectDescriptor.size);
        else
            this.size = vec3.create(1, 1, 1);

        this.positionMatrix = mat4.translate(mat4.identity(), objectDescriptor.position);
        this.position = new Float32Array(this.positionMatrix.buffer, 4 * 12, 3);

        this.scaleMatrix = mat4.scale(mat4.identity(), this.size);

        this.rotationMatrix = mat4.rotateX(mat4.identity(), this.rotation[0]);
        mat4.rotateY(this.rotationMatrix, this.rotation[1], this.rotationMatrix);
        mat4.rotateZ(this.rotationMatrix, this.rotation[2], this.rotationMatrix);

        this.right = new Float32Array(this.rotationMatrix.buffer, 4 * 0, 3);
        this.up = new Float32Array(this.rotationMatrix.buffer, 4 * 4, 3);
        this.back = new Float32Array(this.rotationMatrix.buffer, 4 * 8, 3);
        
        this.yaw = Math.atan2(this.back[0], this.back[2]);
        this.pitch = -Math.asin(this.back[1]);
        this.roll = Math.atan2(-this.up[0], this.right[0]);
    }
    
    public globalMove (x: number, y: number, z: number) : void{
        mat4.translate(this.positionMatrix, [x, y, z], this.positionMatrix);
    }

    public globalRotate (x: number, y: number, z: number) : void {
        mat4.rotateX(this.rotationMatrix, x * 180 / Math.PI, this.rotationMatrix);
        mat4.rotateY(this.rotationMatrix, y * 180 / Math.PI, this.rotationMatrix);
        mat4.rotateZ(this.rotationMatrix, z * 180 / Math.PI, this.rotationMatrix);
    }

    public localMove(x: number, y: number, z: number) : void {
        let relativeDirection = vec3.create(0, 0, 0);
        relativeDirection = vec3.addScaled(relativeDirection, this.right, x);
        relativeDirection = vec3.addScaled(relativeDirection, this.up, y);
        relativeDirection = vec3.addScaled(relativeDirection, this.back, z);        
        mat4.translate(this.positionMatrix, relativeDirection, this.positionMatrix);
    }

    public localRotate(x: number, y: number, z: number) : void {
        this.yaw += y * 180 / Math.PI;
        this.pitch += x * 180 / Math.PI;
        this.roll += z * 180 / Math.PI;

        const rotY = mat4.rotationY(this.yaw);
        const rotX = mat4.rotationX(this.pitch);
        const rotZ = mat4.rotationZ(this.roll);

        mat4.multiply(rotY, rotX, this.rotationMatrix);
        mat4.multiply(this.rotationMatrix, rotZ, this.rotationMatrix);
    }

    public scale(x: number, y: number, z: number) : void {
        mat4.scale(this.scaleMatrix, [x, y, z], this.scaleMatrix);
    }

    public getRotationMatrix() {
        return this.rotationMatrix;
    }

    public hashCode () : number {
        return this.name.split('').reduce((hash, char) => {
            return char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash;
        }, 0);
    }
}