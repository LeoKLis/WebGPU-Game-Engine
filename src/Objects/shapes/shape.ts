import { mat4, Vec3 } from "wgpu-matrix";
import { Object, ObjectDescriptor } from "../object";
import { TextureAtlas } from "../../textureAtlas";

export interface TextureDescriptor {
    atlas: TextureAtlas;
    indexX: number;
    indexY: number;
}

export interface ShapeDescriptor extends ObjectDescriptor {
    color?: [number, number, number, number];
    texture?: TextureDescriptor;
}

export interface RenderDataDescriptor {
    name: string
    vertices: Float32Array;
    numberVertices: number;
    matrix: Float32Array;
    color: Float32Array;
    containsTexture: boolean;
    // texture?: TextureDescriptor;
}

export abstract class Shape extends Object {
    color: Float32Array;
    texture?: TextureDescriptor;
    containsTexture: boolean;
    // image?: ImageBitmap;

    protected abstract sizeMatrix: Float32Array;
    protected abstract vertices: Float32Array;

    constructor(shapeDescriptor: ShapeDescriptor) {
        super(shapeDescriptor);
        this.color = shapeDescriptor.color !== undefined ? new Float32Array(shapeDescriptor.color) : new Float32Array([0.8, 0.5, 0.2, 1]);
        this.texture = shapeDescriptor.texture;
        this.containsTexture = this.texture === undefined ? false : true;
    }

    protected abstract getNormal(x: number, y: number, z: number): Vec3;

    public getScaleMatrix() {
        return this.sizeMatrix;
    }

    getData(): RenderDataDescriptor { 
        let outMat = mat4.multiply(mat4.multiply(this.positionMatrix, this.rotationMatrix), this.sizeMatrix);
        return {
            name: this.name,
            vertices: this.vertices,
            numberVertices: this.vertices.byteLength / 8,
            matrix: outMat,
            color: this.color,
            containsTexture: this.containsTexture,
        }
    }
}