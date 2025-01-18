import { Camera } from "./Objects/camera";
import { IObject } from "./interfaces/IObject";

export class Scene {
    public container: Array<IObject>;

    constructor(camera?: Camera){
        if(camera === undefined){
            this.container = new Array<IObject>();
        }
        else {
            this.container = new Array<IObject>(camera);
        }
    }

    public add(...object: Array<IObject>){
        this.container.push(...object);
    }
}