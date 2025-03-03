import { mat4, Mat4, vec3, Vec3, vec4, Vec4 } from "wgpu-matrix";
import { IObject } from "../interfaces/IObject";
import { load, parse } from "@loaders.gl/core"
import { OBJLoader } from "@loaders.gl/obj";
import { IShape } from "../interfaces/IShape";

export class Model implements IObject, IShape {
    public name: string;
    public id: string;
    public position: Vec3;
    public rotation: Vec3;
    public scale: Float32Array;

    private positionMatrix: Mat4;
    private rotationMatrix: Mat4;
    private scaleMatrix: Mat4;

    public color: Vec4;
    
    // private positions!: Float32Array;
    public vertexData!: Float32Array;
    public normalsData!: Float32Array;
    public indexData!: Uint16Array;
    public vertexNormals!: Float32Array;

    constructor(name: string, position: [number, number, number], orientation: [number, number, number], scale: [number, number, number], color: [number, number, number, number]) {
        this.name = name;
        this.position = vec3.create(...position);
        this.rotation = vec3.create(...orientation);
        this.scale = vec3.create(...scale);

        this.positionMatrix = mat4.translate(mat4.identity(), this.position);
        this.rotationMatrix = mat4.identity(); 
        this.scaleMatrix = mat4.scale(mat4.identity(), scale);

        this.color = vec4.create(...color);

        let d = new Date();
        this.id = d.getTime().toString() + name;
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

    public move = (x: number, y: number, z: number) => {
        let tranVec = vec3.create(x, y, z);
        mat4.translate(this.positionMatrix, tranVec, this.positionMatrix);
    };

    public rotate = (rotX: number, rotY: number, rotZ: number) => {
        let radX = rotX * 180 / Math.PI;
        let radY = rotY * 180 / Math.PI;
        let radZ = rotZ * 180 / Math.PI;

        this.rotation[0] += radY;
        this.rotation[1] += radX;
        mat4.rotateX(mat4.rotationY(this.rotation[0]), this.rotation[1], this.rotationMatrix);
    };

    public getData = () => {
        if (this.vertexData === undefined) {
            return undefined;
        }
        let outMat = mat4.multiply(mat4.multiply(this.positionMatrix, this.rotationMatrix), this.scaleMatrix);
        return {
            vertexData: this.vertexData,
            numVerticies: this.vertexData.length / 6,
            objectMatrix: outMat,
            color: this.color.buffer,
        }
    }

}