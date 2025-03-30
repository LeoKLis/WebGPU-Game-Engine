import { Object } from "./Objects/object";

export class Scene {
    public objects: Array<Object>;
    private objectLookup: Map<number, Object>;
    
    public constructor() {
        this.objects = new Array<Object>();
        this.objectLookup = new Map<number, Object>();
    }

    public addObjects(...objects: Object[]) {
        for (let object of objects) {
            if (this.objectLookup.has(object.hashCode())) continue;
            this.objects.push(object);
            this.objectLookup.set(object.hashCode(), object);
        }
    }

    public removeObjects(...objects: Object[]) {
        for (let object of objects) {
            if (!this.objectLookup.has(object.hashCode())) continue;
            this.objectLookup.delete(object.hashCode());
            this.objects = this.objects.splice(this.objects.indexOf(object));
        }
    }
}