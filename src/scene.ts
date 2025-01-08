import { Camera } from "./camera";
import { IObject } from "./interfaces/IObject";

export class Scene {
    public container: Array<IObject>;

    constructor(camera: Camera){
        this.container = new Array<IObject>(camera);

    }

    public add(object: IObject){
        this.container.push(object);
    }
}