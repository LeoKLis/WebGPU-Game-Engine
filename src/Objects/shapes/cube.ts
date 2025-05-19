import { Mat4, Vec3, Vec4, mat3, mat4, vec3, vec4 } from "wgpu-matrix";
import { Object, ObjectDescriptor } from "../object";
import { Shape, ShapeDescriptor } from "./shape";
import { NotUndefined } from "object-hash";

export interface CubeDescriptor extends ShapeDescriptor {
    lenght: [number, number, number];
}

export class Cube extends Shape {
    protected vertices: Float32Array;
    protected sizeMatrix: Float32Array;
    private length: [number, number, number];

    constructor(
        cubeDescriptor: CubeDescriptor
    ) {
        super(cubeDescriptor);

        this.length = cubeDescriptor.lenght;
        this.sizeMatrix = mat4.identity();
        mat4.scale(this.sizeMatrix, this.length, this.sizeMatrix);

        this.vertices = this.initVertices();
    }

    public getLength(): [number, number, number] {
        return this.length;
    }

    public setLength(lenght: [number, number, number]) {
        this.length = lenght;
        mat4.scale(this.sizeMatrix, this.length, this.sizeMatrix);
    }

    public getNormal(x: number, y: number, z: number) {
        const localPoint = vec3.subtract(vec3.create(x, y, z), this.position);
        const invRotation = mat4.transpose(this.rotationMatrix);
        const pointLocal = vec3.transformMat4Upper3x3(localPoint, invRotation);

        const halfSize = [this.length[0] / 2, this.length[1] / 2, this.length[2] / 2];

        // Step 2: Determine closest face in local space
        const dx = Math.abs(pointLocal[0]) - halfSize[0];
        const dy = Math.abs(pointLocal[1]) - halfSize[1];
        const dz = Math.abs(pointLocal[2]) - halfSize[2];

        const distances = [dx, dy, dz];
        // console.log(maxAxis);
        let minAxis = 0;
        let minAbs = Math.abs(distances[0]);

        for (let i = 1; i < 3; i++) {
            const absVal = Math.abs(distances[i]);
            if (absVal < minAbs) {
                minAbs = absVal;
                minAxis = i;
            }
        }
        const localNormal = vec3.create(0, 0, 0);
        localNormal[minAxis] = Math.sign(pointLocal[minAxis]);

        // Step 3: Transform normal back to world space
        const worldNormal = vec3.transformMat4Upper3x3(localNormal, this.rotationMatrix);
        return vec3.normalize(worldNormal);
    }

    initVertices(): Float32Array {
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

        let textureData = new Array(
            0, 0.34, // front face (4)
            1 / 4, 0.34,
            0, 0.66,
            1 / 4, 0.66,
            2 / 4, 1, // right face (5)
            1 / 4, 1,
            2 / 4, 0.667,
            1 / 4, 0.667,
            3 / 4, 0.66, // back face (2)
            2 / 4, 0.66,
            3 / 4, 0.34,
            2 / 4, 0.34,
            1 / 4, 0, // left face (6)
            2 / 4, 0,
            1 / 4, 0.33,
            2 / 4, 0.33,
            2 / 4, 0.66, // bottom face (3)
            2 / 4, 0.34,
            1 / 4, 0.66,
            1 / 4, 0.34,
            1, 0.66, // top face (1)
            1, 0.34,
            3 / 4, 0.66,
            3 / 4, 0.34,
        );


        if (this.texture !== undefined) {
            textureData.forEach((el, id) => {
                if (this.texture !== undefined) {
                    if (id % 2 == 0) {
                        textureData[id] = (el + this.texture.indexX) / this.texture.atlas.rowElements
                    } else {
                        textureData[id] = (el + this.texture.indexY) / this.texture.atlas.colElements
                    }
                }
            })
        }

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

        let out = new Float32Array(indexData.length * 8);

        for (let i = 0; i < indexData.length; i++) {
            const positionIdx = indexData[i] * 3;
            const position = vertices.slice(positionIdx, positionIdx + 3);
            out.set(position, i * 8);

            const quadIdx = (i / 6 | 0) * 3;
            const normal = normalsData.slice(quadIdx, quadIdx + 3);
            out.set(normal, i * 8 + 3);

            const texIdx = indexData[i] * 2;
            const texture = textureData.slice(texIdx, texIdx + 2);
            out.set(texture, i * 8 + 6);
        }

        return out;
    }

    private mat3frommat4(matrix4: Mat4) {
        return new Float32Array([matrix4[0], matrix4[1], matrix4[2], matrix4[4], matrix4[5], matrix4[6], matrix4[8], matrix4[9], matrix4[10]]);
    }
}