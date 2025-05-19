import { mat4, Mat4, Vec3, vec3 } from "wgpu-matrix";
import { IObject } from "../interfaces/IObject";
import { FixedFloat32Array } from "../containers/fixedFloat32Array";

export interface LockAxisDescriptor {
    x: boolean;
    y: boolean;
    z: boolean;
}

export interface ObjectDescriptor {
    name: string;
    id: string;
    position: [number, number, number];
    rotation: [number, number, number];
    lockAxis?: LockAxisDescriptor;
}

export class Object implements IObject {
    public name: string;
    public id: string;
    public position: Float32Array;
    public rotation: Float32Array;
    protected positionMatrix: Mat4;
    public rotationMatrix: Mat4;
    protected rotationMatrixX: Mat4;
    protected rotationMatrixY: Mat4;
    protected rotationMatrixZ: Mat4;
    protected right: Float32Array;
    protected up: Float32Array;
    protected back: Float32Array;

    protected lockAxis: LockAxisDescriptor;

    public yaw: number;
    public pitch: number;
    public roll: number;

    public parent?: Object;
    public child?: Object;

    constructor(objectDescriptor: ObjectDescriptor) {
        this.name = objectDescriptor.name;
        this.id = objectDescriptor.id;
        this.rotation = new Float32Array(objectDescriptor.rotation);

        this.positionMatrix = mat4.translate(mat4.identity(), objectDescriptor.position);
        this.position = new Float32Array(this.positionMatrix.buffer, 4 * 12, 3)

        this.rotationMatrix = mat4.rotateX(mat4.identity(), this.rotation[0] * Math.PI / 180);
        this.rotationMatrix = mat4.rotateY(this.rotationMatrix, this.rotation[1] * Math.PI / 180);
        this.rotationMatrix = mat4.rotateZ(this.rotationMatrix, this.rotation[2] * Math.PI / 180);
        this.rotationMatrixX = mat4.rotateX(mat4.identity(), this.rotation[0] * Math.PI / 180);
        this.rotationMatrixY = mat4.rotateY(mat4.identity(), this.rotation[1] * Math.PI / 180);
        this.rotationMatrixZ = mat4.rotateZ(mat4.identity(), this.rotation[2] * Math.PI / 180);

        // Vec x
        this.right = new Float32Array(this.rotationMatrix.buffer, 4 * 0, 3);
        // Vec y
        this.up = new Float32Array(this.rotationMatrix.buffer, 4 * 4, 3);
        // Vec z
        this.back = new Float32Array(this.rotationMatrix.buffer, 4 * 8, 3);

        if (objectDescriptor.lockAxis !== undefined) {
            this.lockAxis = objectDescriptor.lockAxis;
        } else {
            this.lockAxis = { x: false, y: false, z: false }
        }

        this.yaw = Math.atan2(this.back[0], this.back[2]);
        this.pitch = -Math.asin(this.back[1]);
        this.roll = Math.atan2(-this.up[0], this.right[0]);
    }

    public localMove(x: number, y: number, z: number): void {
        let relativeDirection = vec3.create(0, 0, 0);
        relativeDirection = vec3.addScaled(relativeDirection, this.right, x);
        relativeDirection = vec3.addScaled(relativeDirection, this.up, y);
        relativeDirection = vec3.addScaled(relativeDirection, this.back, z);
        mat4.translate(this.positionMatrix, relativeDirection, this.positionMatrix);

        if (this.child !== undefined) {
            mat4.translate(this.child.positionMatrix, relativeDirection, this.child.positionMatrix);
        }
    }

    public globalMove(x: number, y: number, z: number): void {
        mat4.translate(this.positionMatrix, [x, y, z], this.positionMatrix);
        if (this.child !== undefined) {
            mat4.translate(this.child.positionMatrix, [x, y, z], this.child.positionMatrix);
        }
    }

    public localRotate(x: number, y: number, z: number): void {
        if (!this.lockAxis.x) {
            this.pitch += x * Math.PI / 180;
            mat4.rotateX(this.rotationMatrixX, x * Math.PI / 180, this.rotationMatrixX);
            mat4.rotateX(this.rotationMatrix, x * Math.PI / 180, this.rotationMatrix);
        }
        if (!this.lockAxis.y) {
            this.yaw += y * Math.PI / 180;
            mat4.rotateY(this.rotationMatrixY, y * Math.PI / 180, this.rotationMatrixY);
            mat4.rotateY(this.rotationMatrix, y * Math.PI / 180, this.rotationMatrix);
        }
        if (!this.lockAxis.z) {
            this.roll += z * Math.PI / 180;
            mat4.rotateZ(this.rotationMatrixZ, z * Math.PI / 180, this.rotationMatrixZ);
            mat4.rotateZ(this.rotationMatrix, z * Math.PI / 180, this.rotationMatrix);
        }
    }

    public globalRotate(x: number, y: number, z: number): void {
        if (!this.lockAxis.x && x != 0) {
            this.pitch += x * Math.PI / 180;
            let rotationMatrixX = mat4.rotationX(x * Math.PI / 180);
            this.rotationMatrix = mat4.multiply(rotationMatrixX, this.rotationMatrix);
            this.rotationMatrixX = mat4.multiply(rotationMatrixX, this.rotationMatrixX);
        }
        if (!this.lockAxis.y && y != 0) {
            this.yaw += y * Math.PI / 180;
            let rotationMatrixY = mat4.rotationY(y * Math.PI / 180);
            this.rotationMatrix = mat4.multiply(rotationMatrixY, this.rotationMatrix);
            this.rotationMatrixY = mat4.multiply(rotationMatrixY, this.rotationMatrixY);
            // Napravljeno zbog kamere
            if (this.child !== undefined) {
                this.child.yaw += y * Math.PI / 180;
                let childPos = new Float32Array([this.child.position[0], this.position[1], this.child.position[2]]);
                let radius = vec3.distance(this.position, childPos);
                let childBack = new Float32Array(this.child.rotationMatrix.buffer, 4 * 8, 3);
                let angle = -y * Math.PI / 180 + this.angleBetween(new Float32Array([1, 0]), new Float32Array([childBack[0], childBack[2]]));

                this.child.position[0] = radius * Math.cos(angle) + this.position[0];
                this.child.position[2] = radius * Math.sin(angle) + this.position[2];

                this.child.rotationMatrix = mat4.multiply(rotationMatrixY, this.child.rotationMatrix);
                this.child.rotationMatrixY = mat4.multiply(rotationMatrixY, this.child.rotationMatrixY);
            }
        }
        if (!this.lockAxis.z && z != 0) {
            this.roll += z * Math.PI / 180;
            let rotationMatrixZ = mat4.rotationZ(z * Math.PI / 180);
            this.rotationMatrix = mat4.multiply(rotationMatrixZ, this.rotationMatrix);
            this.rotationMatrixZ = mat4.multiply(rotationMatrixZ, this.rotationMatrixZ);
        }

        this.recalculateAngles();
    }

    public rotateAroundChild(childAxis: 'x'|'y'|'z', amount: number): void {
        if (this.child !== undefined) {
            let rotation: Float32Array;
            if (childAxis == 'x') {
                let right = new Float32Array(this.child.rotationMatrix.buffer, 4 * 0, 3);
                rotation = mat4.axisRotation(right, amount * Math.PI / 180);
            } else if (childAxis == 'y') {
                let up = new Float32Array(this.child.rotationMatrix.buffer, 4 * 4, 3);
                rotation = mat4.axisRotation(up, amount * Math.PI / 180);
            } else {
                let back = new Float32Array(this.child.rotationMatrix.buffer, 4 * 8, 3);
                rotation = mat4.axisRotation(back, amount * Math.PI / 180);
            }
            this.rotationMatrix = mat4.multiply(rotation, this.rotationMatrix);
        }
    }

    public getPositionMatrix() {
        return this.positionMatrix;
    }

    public getRotationMatrix() {
        return this.rotationMatrix;
    }

    public getRotationMatrixX() {
        return this.rotationMatrixX;
    }

    public getRotationMatrixY() {
        return this.rotationMatrixY;
    }

    public getRotationMatrixZ() {
        return this.rotationMatrixZ;
    }

    public setPositionMatrix(matrix: Mat4) {
        this.positionMatrix = matrix;
    }

    public attachTo(parent: Object) {
        this.parent = parent;
    }

    public attach(child: Object) {
        this.child = child;
    }

    public getData() { };

    public hashCode(): number {
        return this.name.split('').reduce((hash, char) => {
            return char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash;
        }, 0);
    }

    private recalculateAngles() {
        this.yaw = Math.atan2(this.back[0], this.back[2]);
        this.pitch = -Math.asin(this.back[1]);
        this.roll = Math.atan2(-this.up[0], this.right[0]);
    }

    private angleBetween(vec1: Float32Array, vec2: Float32Array) {
        let thetaU = Math.atan2(vec1[1], vec1[0])
        let thetaV = Math.atan2(vec2[1], vec2[0])
        let angle = thetaV - thetaU;
        if (angle < 0) {
            angle += 2 * Math.PI;
        }
        return angle;
    }
}
