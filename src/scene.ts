import { Camera } from "./objects/camera";
import { Light } from "./objects/light";
// import { Object } from "./Objects/object";
import { Shape } from "./objects/shapes/shape";
import { Vector } from "./objects/vector";

export class Scene {
    public shapes: Array<Shape>;
    public vectors: Array<Vector>;
    public light!: Light;
    public camera!: Camera;
    
    public constructor() {
        this.shapes = new Array<Shape>();
        this.vectors = new Array<Vector>();
    }

    public addShapes(...shapes: Shape[]) {
        for (let shape of shapes) {
            if (this.shapes.includes(shape)) continue;
            this.shapes.push(shape);
        }
    }

    public removeShapes(...shapes: Shape[]) {
        for (let shape of shapes) {
            this.shapes = this.shapes.splice(this.shapes.indexOf(shape));
        }
    }

    public setLight(light: Light) {
        this.light = light;
    }

    public setCamera(camera: Camera) {
        this.camera = camera;
    }
}