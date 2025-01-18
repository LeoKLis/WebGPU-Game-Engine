import { Mat4, Vec3, Vec4, mat4, vec3, vec4 } from "wgpu-matrix";
import { IObject } from "../../interfaces/IObject";
import { IShape } from "../../interfaces/IShape"

export class Cube implements IObject, IShape {
    public id: string;
    public name: string;
    public position: Vec3;
    public orientation: Vec3;
    public scale: Vec3;

    private positionMatrix: Mat4;
    private rotationMatrix: Mat4;
    private scaleMatrix: Mat4;

    public color: Vec4;

    private positions: Float32Array;
    public vertexData: Float32Array;
    public indexData: Uint16Array;
    private vertexNormals: Float32Array;

    constructor(name: string, position: [number, number, number], orientation: [number, number, number], scale: [number, number, number], color: [number, number, number, number]) {
        this.name = name;
        this.position = vec3.create(...position);
        this.orientation = vec3.create(...orientation);
        this.scale = vec3.create(...scale);

        this.positionMatrix = mat4.translate(mat4.identity(), this.position);
        this.rotationMatrix = mat4.identity();
        this.scaleMatrix = mat4.scale(mat4.identity(), scale);

        this.color = vec4.create(...color);

        let d = new Date();
        this.id = d.getTime().toString() + this.name;

        this.positions = new Float32Array([
            -0.5, 0.5, 0.5, // front face
            -0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, -0.5, // right f
            0.5, 0.5, 0.5,
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, -0.5, // back f
            0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,
            -0.5, -0.5, -0.5,
            -0.5, 0.5, 0.5, // left f
            -0.5, 0.5, -0.5,
            -0.5, -0.5, 0.5,
            -0.5, -0.5, -0.5,
            0.5, -0.5, 0.5, // bottom f
            -0.5, -0.5, 0.5,
            0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,
            -0.5, 0.5, 0.5, // top f
            0.5, 0.5, 0.5,
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5
        ]);

        this.vertexNormals = new Float32Array([
            0, 0, 1, // Front
            1, 0, 0, // Right
            0, 0, -1, // Back
            -1, 0, 0, // Left
            0, -1, 0, // Bottom
            0, 1, 0 // Top
        ]);

        this.indexData = new Uint16Array([
            0, 1, 2, 2, 1, 3,  // front
            4, 5, 6, 6, 5, 7,  // right
            8, 9, 10, 10, 9, 11,  // back
            12, 13, 14, 14, 13, 15,  // left
            16, 17, 18, 18, 17, 19,  // bottom
            20, 21, 22, 22, 21, 23,  // top
        ]);

        this.vertexData = new Float32Array(this.indexData.length * 6);

        for (let i = 0; i < this.indexData.length; i++){
            const positionIdx = this.indexData[i] * 3;
            const position = this.positions.slice(positionIdx, positionIdx + 3);
            
            this.vertexData.set(position, i * 6);

            const quadIdx = (i / 6 | 0) * 3;
            const normal = this.vertexNormals.slice(quadIdx, quadIdx + 3);
            
            this.vertexData.set(normal, i * 6 + 3);
        }

    }

    public move = (x: number, y: number, z: number) => {
        let tranVec = vec3.create(x, y, z);
        mat4.translate(this.positionMatrix, tranVec, this.positionMatrix);
    }

    public rotate = (degX: number, degY: number, degZ: number) => {
        let radX = degX * 180 / Math.PI;
        let radY = degY * 180 / Math.PI;
        let radZ = degZ * 180 / Math.PI;

        this.orientation[0] += radY;
        this.orientation[1] += radX;
        mat4.rotateX(mat4.rotationY(this.orientation[0]), this.orientation[1], this.rotationMatrix);
    }

    public getData = () => {
        let outMat = mat4.multiply(mat4.multiply(this.positionMatrix, this.rotationMatrix), this.scaleMatrix);
        return {
            vertexData: this.vertexData,
            numVerticies: this.indexData.length,
            objectMatrix: outMat,
            color: this.color.buffer,
        };
    }

}