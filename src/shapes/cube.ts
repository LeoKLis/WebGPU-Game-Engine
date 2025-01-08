import { Mat4, Vec3, mat4, vec3 } from "wgpu-matrix";
import { IObject } from "../interfaces/IObject";
import { IShape } from "../interfaces/IShape"

export class Cube implements IObject, IShape {
    public name: string;
    public position: Vec3;
    public orientation: Vec3;
    public scale: Vec3;

    private positionMatrix: Mat4;
    private rotationMatrix: Mat4;
    private scaleMatrix: Mat4;

    constructor(name: string, position: [number, number, number], orientation: [number, number, number], scale: [number, number, number]) {
        this.name = name;
        this.position = vec3.create(position[0], position[1], position[2]);
        this.orientation = vec3.create(orientation[0], orientation[1], orientation[2]);
        this.scale = vec3.create(scale[0], scale[1], scale[2]);

        this.positionMatrix = mat4.translate(mat4.identity(), this.position);
        this.rotationMatrix = mat4.identity();
        this.scaleMatrix = mat4.scale(mat4.identity(), scale);
    }

    public move = (x: number, y: number, z: number) => {
        this.position[0] += x;
        this.position[1] += y;
        this.position[2] += z;

        let tranVec = vec3.create(x, y, z);
        mat4.translate(this.positionMatrix, tranVec,  this.positionMatrix);
    }

    public rotate = (degX: number, degY: number, degZ: number) => {
        let radX = degX * 180 / Math.PI;
        let radY = degY * 180 / Math.PI;
        let radZ = degZ * 180 / Math.PI;

        this.orientation[0] += radY;
        this.orientation[1] += radX;
        mat4.rotateX(mat4.rotationY(this.orientation[0]), this.orientation[1], this.rotationMatrix);
    }

    public getCubeVerticies = () => {
        const cubeVertexData = new Float32Array([
            // front face
            -0.5, 0.5, 0.5, 1,
            -0.5, -0.5, 0.5, 1,
            0.5, 0.5, 0.5, 1,
            0.5, -0.5, 0.5, 1,
            // right face
            0.5, 0.5, -0.5, 1,
            0.5, 0.5, 0.5, 1,
            0.5, -0.5, -0.5, 1,
            0.5, -0.5, 0.5, 1,
            // back face
            0.5, 0.5, -0.5, 1,
            0.5, -0.5, -0.5, 1,
            -0.5, 0.5, -0.5, 1,
            -0.5, -0.5, -0.5, 1,
            // left face
            -0.5, 0.5, 0.5, 1,
            -0.5, 0.5, -0.5, 1,
            -0.5, -0.5, 0.5, 1,
            -0.5, -0.5, -0.5, 1,
            // bottom face
            0.5, -0.5, 0.5, 1,
            -0.5, -0.5, 0.5, 1,
            0.5, -0.5, -0.5, 1,
            -0.5, -0.5, -0.5, 1,
            // top face
            -0.5, 0.5, 0.5, 1,
            0.5, 0.5, 0.5, 1,
            -0.5, 0.5, -0.5, 1,
            0.5, 0.5, -0.5, 1
        ]);

        let outMat = mat4.multiply(mat4.multiply(this.positionMatrix, this.rotationMatrix), this.scaleMatrix);

        const indexData = new Uint16Array([
            0, 1, 2, 2, 1, 3,  // front
            4, 5, 6, 6, 5, 7,  // right
            8, 9, 10, 10, 9, 11,  // back
            12, 13, 14, 14, 13, 15,  // left
            16, 17, 18, 18, 17, 19,  // bottom
            20, 21, 22, 22, 21, 23,  // top
        ]);

        return {
            cubeVertexData, outMat, indexData, numVerticies: indexData.length,
        };
    }

}