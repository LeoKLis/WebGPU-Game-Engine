import { mat4, Mat4, vec3, Vec3, vec4, Vec4 } from "wgpu-matrix";
import { load, parse } from "@loaders.gl/core"
import { OBJLoader } from "@loaders.gl/obj";
import { Object, ObjectDescriptor } from "../object";

export interface ModelDescriptor extends ObjectDescriptor {
    name: string;
    id: string;
    position: [number, number, number]; 
    rotation: [number, number, number]; 
    size: [number, number, number]; 
    color: [number, number, number, number];
}

export class Model extends Object {
    public color: Float32Array;
    
    // private positions!: Float32Array;
    public vertexData!: Float32Array;
    public normalsData!: Float32Array;
    public indexData!: Uint16Array;
    public vertexNormals!: Float32Array;

    constructor(
        modelDescriptor: ModelDescriptor
    ) {
        super(modelDescriptor);
        this.color = vec4.create(...modelDescriptor.color);
    }

    public loadDataFromFile = async (url: string) => {
        const data = await parse(fetch(`../../${url}`), OBJLoader);
        const dataPosition = data.attributes['POSITION'].value;
        if (data.attributes['NORMAL'] === undefined){
            this.vertexData = new Float32Array(dataPosition.length * 6);

            for (let i = 0; i < dataPosition.length; i++){
                const position = dataPosition.slice(i * 3, i * 3 + 3) as Float32Array;
                this.vertexData.set(position, i * 6);
                this.vertexData.set([1, 1, 1], i * 6 + 3);
            }
        }
        else {
            const dataNormal = data.attributes['NORMAL'].value;
            
            this.vertexData = new Float32Array(dataPosition.length * 6);
            for (let i = 0; i < dataPosition.length; i++) {
                const position = dataPosition.slice(i * 3, i * 3 + 3) as Float32Array;
                this.vertexData.set(position, i * 6);
    
                const normal = dataNormal.slice(i * 3, i * 3 + 3) as Float32Array;
                this.vertexData.set(normal, i * 6 + 3);
            }
        }
    }

    public getData = () => {
        if (this.vertexData === undefined) {
            return undefined;
        }
        return {
            vertexData: this.vertexData,
            numVerticies: this.vertexData.length / 6,
            objectMatrix: this.positionMatrix,
            color: this.color.buffer,
        }
    }

}