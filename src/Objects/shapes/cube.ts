import { Mat4, Vec3, Vec4, mat4, vec3, vec4 } from "wgpu-matrix";
import { Object, ObjectDescriptor } from "../object";

export interface CubeDescriptor extends ObjectDescriptor {
    size: [number, number, number];
    color: [number, number, number, number];
}

export class Cube extends Object{
    public color: Vec4;
    private vertices: Float32Array;

    constructor(
        cubeDescriptor: CubeDescriptor
    ) {
        super(cubeDescriptor);
        this.color = vec4.create(...cubeDescriptor.color);
        this.vertices = this.initVertices();
    }

    public getData() {
        let outMat = mat4.multiply(mat4.multiply(this.positionMatrix, this.rotationMatrix), this.scaleMatrix);
        return {
            vertexData: this.vertices,
            numVerticies: 36,
            objectMatrix: outMat,
            color: this.color.buffer,
        };
    }

    private initVertices() : Float32Array {
        let vertices = new Float32Array([
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

        let normalsData = new Float32Array([
            0, 0, 1, // Front
            1, 0, 0, // Right
            0, 0, -1, // Back
            -1, 0, 0, // Left
            0, -1, 0, // Bottom
            0, 1, 0 // Top
        ]);

        let indexData = new Uint16Array([
            0, 1, 2, 2, 1, 3,  // front
            4, 5, 6, 6, 5, 7,  // right
            8, 9, 10, 10, 9, 11,  // back
            12, 13, 14, 14, 13, 15,  // left
            16, 17, 18, 18, 17, 19,  // bottom
            20, 21, 22, 22, 21, 23,  // top
        ]);

        let out = new Float32Array(indexData.length * 6);

        for (let i = 0; i < indexData.length; i++){
            const positionIdx = indexData[i] * 3;
            const position = vertices.slice(positionIdx, positionIdx + 3);
            
            out.set(position, i * 6);

            const quadIdx = (i / 6 | 0) * 3;
            const normal = normalsData.slice(quadIdx, quadIdx + 3);
            
            out.set(normal, i * 6 + 3);
        }

        return out;
    }
}