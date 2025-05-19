import { vec3 } from "wgpu-matrix";

export interface VectorDescriptor {
    position?: Float32Array;
    vector?: Float32Array;
    color?: [number, number, number];
}

export class Vector {
    public position!: Float32Array;
    public vector!: Float32Array;
    public color: Float32Array;

    constructor(vectorDescriptor: VectorDescriptor) {
        if (vectorDescriptor.position !== undefined) {
            this.position = vectorDescriptor.position;
        } else {
            this.position = new Float32Array([0, 0, 0]);
        }
        if (vectorDescriptor.vector !== undefined) {
            this.vector = vectorDescriptor.vector;
        } else {
            this.vector = new Float32Array([0, 1, 0]);
        }
        if (vectorDescriptor.color !== undefined) {
            this.color = new Float32Array(vectorDescriptor.color);
        } else {
            this.color = new Float32Array([1, 0, 0]);
        }
    }

    public setPosition(position: Float32Array) {
        this.position = position;
    }

    public setVector(vector: Float32Array) {
        this.vector = vector;
    }

    public getData() {
        const startPosition = this.position;
        const endPosition = vec3.addScaled(this.position, this.vector, 2);
        let result = new Float32Array(startPosition.length + endPosition.length);
        result.set(startPosition);
        result.set(endPosition, 3);
        return { 
            data: result, 
            color: this.color,
        };
    }
}