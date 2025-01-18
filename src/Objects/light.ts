import { Vec3, vec3 } from "wgpu-matrix";
import { IObject } from "../interfaces/IObject";

export class Light implements IObject {
    public name: string;
    public id: string;
    public position: Vec3;
    public orientation: Vec3;

    private yaw = 0;
    private pitch = 0;
    private origin = vec3.create(0, 0, 0);

    private modified = true;
    
    constructor(name: string, orientation: [number, number, number]){
        this.name = name;
        this.position = vec3.create(0, 0, 0);
        // this.orientation = new Float32Array([orientation[0], orientation[1], orientation[2]]);
        this.orientation = vec3.create(orientation[0], orientation[1], orientation[2]);
        vec3.normalize(this.orientation, this.orientation);

        let d = new Date();
        this.id = d.getTime().toString() + name;
    }

    public move = (x: number, y: number, z: number) => {

    }

    public rotate = (rotX: number, rotY: number, rotZ: number) => {
        this.modified = true;
        let radX = rotX * 180 / Math.PI;
        let radY = rotY * 180 / Math.PI;
        let radZ = rotZ * 180 / Math.PI;

        vec3.rotateX(vec3.rotateY(this.orientation, this.origin, radY), this.origin, radX, this.orientation);
    };

    public getData = () => {
        return {
            orientation: this.orientation,
        }
    }
};