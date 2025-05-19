import { mat4, vec3, vec4, Vec4 } from "wgpu-matrix";
import { Shape, ShapeDescriptor } from "./shape";

export interface SphereDescriptor extends ShapeDescriptor {
    radius: number,
}

export class Sphere extends Shape {
    private radius: number;
    protected sizeMatrix: Float32Array;
    protected vertices: Float32Array;

    constructor(sphereDescriptor: SphereDescriptor) {
        super(sphereDescriptor);

        this.radius = sphereDescriptor.radius;
        this.sizeMatrix = mat4.identity();
        this.setRadius(this.radius);

        this.vertices = this.initVertices(this.radius, 16, 16);
    }

    public setRadius(radius: number) : void {
        this.radius = radius;
        mat4.scale(this.sizeMatrix, [radius, radius, radius], this.sizeMatrix);
    }

    public getRadius() : number{
        return this.radius;
    }
    
    public getNormal(x: number, y: number, z: number) {
        // console.log(vec3.create(x, y, z));
        // console.log(this.position);
        // console.log(vec3.subtract(vec3.create(x, y, z), this.position));
        // console.log(vec3.subtract(this.position, vec3.create(x, y, z)));
        return vec3.normalize(vec3.subtract(vec3.create(x, y, z), this.position));
    }

    private initVertices(radius: number, latSegments: number, lonSegments: number): Float32Array {
        const data: number[] = [];
        const vertexMap: number[][] = []; // Stores raw vertices

        // Step 1: Generate unique vertices and normals
        for (let lat = 0; lat <= latSegments; lat++) {
            const theta = (lat * Math.PI) / latSegments; // Latitude angle (0 to π)
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);
            let v: number;
            if (this.texture === undefined) {
                v = lat / latSegments;
            } else {
                v = (lat / latSegments + this.texture.indexY) / this.texture.atlas.colElements;
            }

            for (let lon = 0; lon <= lonSegments; lon++) {
                const phi = (lon * 2 * Math.PI) / lonSegments; // Longitude angle (0 to 2π)
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);
                let u: number;
                if (this.texture === undefined) {
                    u = 1 - lon / lonSegments;
                } else {
                    u = (1 - lon / lonSegments + this.texture?.indexX) / this.texture?.atlas.rowElements;
                }

                // Compute vertex position
                const x = cosPhi * sinTheta;
                const y = cosTheta;
                const z = sinPhi * sinTheta;

                // Store as an array entry
                vertexMap.push([radius * x, radius * y, radius * z, x, y, z, u, v]); // Position + Normal + UV
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
                // data.push(...vertexMap[i0], ...vertexMap[i1], ...vertexMap[i2]);

                // Second triangle (i1, i2, i3)
                data.push(...vertexMap[i1], ...vertexMap[i2], ...vertexMap[i3]);
                // data.push(...vertexMap[i1], ...vertexMap[i2], ...vertexMap[i3]);
            }
        }

        return new Float32Array(data);
    }

}