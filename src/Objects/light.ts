import { mat4, Mat4, Vec3, vec3 } from "wgpu-matrix";
import { IObject } from "../interfaces/IObject";
import { Object, ObjectDescriptor } from "./object";

export interface LightDescriptor extends ObjectDescriptor {
    name: string;
    id: string;
    position: [number, number, number];
    rotation: [number, number, number];
    size: [number, number, number];
}

export class Light extends Object{

    constructor(lightDescriptor: LightDescriptor){
        super(lightDescriptor);
    }

    public localRotate = (degX: number, degY: number, degZ: number) => {
        vec3.rotateX(this.rotation, vec3.zero(), degX * 180 / Math.PI, this.rotation);
        vec3.rotateY(this.rotation, vec3.zero(), degX * 180 / Math.PI, this.rotation);
        vec3.rotateZ(this.rotation, vec3.zero(), degX * 180 / Math.PI, this.rotation);
    };

    public getData = () => {
        return {
            orientation: this.rotation,
        }
    }
};