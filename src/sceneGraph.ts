import { mat4, Mat4 } from "wgpu-matrix";
import { IObject } from "./interfaces/IObject";

export class SceneGraphNode {
    private name: string;
    private source: IObject;
    private localMatrix: Mat4;
    private worldMatrix: Mat4;
    private children: Array<SceneGraphNode>;
    private parent?: SceneGraphNode;

    constructor(name: string, source: IObject) {
        this.name = name;
        this.source = source;        
        this.localMatrix = mat4.identity();
        this.worldMatrix = mat4.identity();
        this.children = new Array<SceneGraphNode>();
        this.parent = undefined;
    }

    addChild(child: SceneGraphNode) {
        child.setParent(this);
    }

    removeChild(child: SceneGraphNode) {
        child.setParent(undefined);
    }

    setParent(parent?: SceneGraphNode) {
        if (this.parent !== undefined) {
            const idx = this.parent.children.indexOf(this);
            if (idx >= 0) {
                this.parent.children.splice(idx, 1);
            }
        }
        if (parent !== undefined) {
            parent.children.push(this);
        }
        this.parent = parent;
    }

    updateWorldMatrix(parentWorldMatrix: Mat4) {

    }
}