import { mat4, vec3, vec4, Vec4 } from "wgpu-matrix";
import { Object, ObjectDescriptor } from "../object";

export interface SphereDescriptor extends ObjectDescriptor {
    radius: number,
    color: [number, number, number, number];
}

export class Sphere extends Object {
    public color: Vec4;
    private radius: number;
    private vertices: Float32Array;

    constructor(sphereDescriptor: SphereDescriptor) {
        super(sphereDescriptor);
        this.color = vec4.create(...sphereDescriptor.color);
        this.radius = sphereDescriptor.radius;
        this.size[0] = this.radius;
        this.size[1] = this.radius;
        this.size[2] = this.radius;

        this.vertices = this.initVertices(this.radius, 20, 20);
    }

    public getData() {
        let outMat = mat4.multiply(mat4.multiply(this.positionMatrix, this.rotationMatrix), this.scaleMatrix);
        return {
            vertexData: this.vertices,
            numVerticies: this.vertices.length / 6,
            objectMatrix: outMat,
            color: this.color.buffer,
        };
    }

    public setRadius(radius: number) : void {
        this.size[0] = radius;
        this.size[1] = radius;
        this.size[2] = radius;
        mat4.scaling([radius, radius, radius], this.scaleMatrix);
    }

    public getRadius() : number{
        return this.size[0];
    }

    private initVertices(radius: number, latSegments: number, lonSegments: number): Float32Array {
        const data: number[] = [];
        const vertexMap: number[][] = []; // Stores raw vertices

        // Step 1: Generate unique vertices and normals
        for (let lat = 0; lat <= latSegments; lat++) {
            const theta = (lat * Math.PI) / latSegments; // Latitude angle (0 to π)
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            for (let lon = 0; lon <= lonSegments; lon++) {
                const phi = (lon * 2 * Math.PI) / lonSegments; // Longitude angle (0 to 2π)
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);

                // Compute vertex position
                const x = cosPhi * sinTheta;
                const y = cosTheta;
                const z = sinPhi * sinTheta;

                // Store as an array entry
                vertexMap.push([radius * x, radius * y, radius * z, x, y, z]); // Position + Normal
            }
        }

        // Step 2: Generate triangle data, duplicating vertices
        for (let lat = 0; lat < latSegments; lat++) {
            for (let lon = 0; lon < lonSegments; lon++) {
                const i0 = lat * (lonSegments + 1) + lon;
                const i1 = i0 + 1;
                const i2 = i0 + (lonSegments + 1);
                const i3 = i2 + 1;

                // First triangle (i0, i2, i1)
                data.push(...vertexMap[i0], ...vertexMap[i2], ...vertexMap[i1]);

                // Second triangle (i1, i2, i3)
                data.push(...vertexMap[i1], ...vertexMap[i2], ...vertexMap[i3]);
            }
        }

        return new Float32Array(data);
    }

}