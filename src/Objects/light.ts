import { vec3 } from "wgpu-matrix";
import { Object, ObjectDescriptor } from "./object";

export class Light extends Object{
    constructor(lightDescriptor: ObjectDescriptor){
        super(lightDescriptor);
    }

    public localRotate = (degX: number, degY: number, degZ: number) => {
        vec3.rotateX(this.rotation, vec3.zero(), degX * 180 / Math.PI, this.rotation);
        vec3.rotateY(this.rotation, vec3.zero(), degY * 180 / Math.PI, this.rotation);
        vec3.rotateZ(this.rotation, vec3.zero(), degZ * 180 / Math.PI, this.rotation);
    };

    public getData() {
        return this.rotation;
    }
};