import { rotate } from "mathjs";
import { IObject } from "./interfaces/IObject";
import { Object } from "./objects/object";
import { Vec3 } from "wgpu-matrix";

export enum ControllerDevice {
    mouse,
    keyboard
}

export class InputHandler {
    private canvas: HTMLCanvasElement;
    private keysPressed: Map<String, boolean>;
    private keyPress: Set<String>;

    private mouseDeltaX: number;
    private mouseDeltaY: number;
    private mouseScrollDelta: number;

    private leftMouseDown: boolean;
    private middleMouseDown: boolean;
    private rightMouseDown: boolean;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.keysPressed = new Map();
        this.keyPress = new Set();

        this.mouseDeltaX = 0;
        this.mouseDeltaY = 0;
        this.mouseScrollDelta = 0;

        this.leftMouseDown = false;
        this.middleMouseDown = false;
        this.rightMouseDown = false;
        this.listen();
    }

    public listen = () => {
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

        window.addEventListener("keydown", (e) => this.keysPressed.set(e.key, true));
        window.addEventListener("keyup", (e) => this.keysPressed.set(e.key, false));

        this.canvas.style.touchAction = 'pinch-zoom';
        this.canvas.addEventListener('mousedown', (e) => {
            switch (e.button) {
                case 0:
                    this.leftMouseDown = true;
                    break;
                case 1:
                    this.middleMouseDown = true;
                    break;
                case 2:
                    this.rightMouseDown = true;
                    break;
            }
        });
        this.canvas.addEventListener('mouseup', (e) => {
            switch (e.button) {
                case 0:
                    this.leftMouseDown = false;
                case 1:
                    this.middleMouseDown = false;
                case 2:
                    this.rightMouseDown = false;
            }
        });
        this.canvas.addEventListener('pointermove', (e) => {
            if (this.leftMouseDown || this.middleMouseDown || this.rightMouseDown) {
                this.mouseDeltaX += e.movementX;
                this.mouseDeltaY += e.movementY;
            }
        });
        this.canvas.addEventListener('wheel', (e) => {
            this.mouseScrollDelta += e.deltaY;
        })
    }

    public getKeysPressed() {
        return this.keysPressed;
    }

    public getKeyPress() {
        return this.keyPress;
    }

    public getMouseMovement = () => {
        let output = [this.mouseDeltaX, this.mouseDeltaY, this.mouseScrollDelta]
        this.mouseDeltaX = 0;
        this.mouseDeltaY = 0;
        this.mouseScrollDelta = 0;
        return output;
    }

    public control(object: Object, grounded: boolean, moveSpeed: number, rotateSpeed: number, jumpForce: number, deltaTime: number, device: ControllerDevice) {
        let used = false;
        if (device == ControllerDevice.keyboard) {
            let keyPressed = this.getKeysPressed();
            keyPressed.forEach((val, key) => {
                if (!val) return;
                used = true;
                switch (key) {
                    case 'a':
                        object.globalRotate(0, 100 * deltaTime, 0);
                        break;
                    case 'd':
                        object.globalRotate(0, -100 * deltaTime, 0);
                        break;
                    case 'w':
                        object.rotateRelative('x', -rotateSpeed * deltaTime);
                        break;
                    case 's':
                        object.rotateRelative('x', rotateSpeed * deltaTime);
                        break;
                    case 'q':
                        object.rotateRelative('z', rotateSpeed * deltaTime);
                        break;
                    case 'e':
                        object.rotateRelative('z', -rotateSpeed * deltaTime);
                        break;
                    case ' ':
                        if (grounded)
                            object.addForce(0, jumpForce * deltaTime, 0);
                        break;
                    case 'r':
                        location.reload();
                        break;
                }
            });
        }

        if (device == ControllerDevice.mouse) {
            let mouseMove = this.getMouseMovement();
            if (this.leftMouseDown) {
                object.globalMove(0, mouseMove[1] * deltaTime * -moveSpeed, 0);
                object.localMove(mouseMove[0] * deltaTime * -moveSpeed, 0, 0);
                used = true;
            }
            else if (this.rightMouseDown) {
                object.globalRotate(mouseMove[1] * deltaTime * rotateSpeed, mouseMove[0] * deltaTime * rotateSpeed, 0);
                used = true;
            }
            else if (this.middleMouseDown) {
                object.globalRotate(0, 0, mouseMove[0] * deltaTime * rotateSpeed);
                used = true;
            }
            object.localMove(0, 0, mouseMove[2] * deltaTime * -moveSpeed);
        }
        return used;
    }

    public forceControl(moveAccel: number, rotateAccel: number, objVelocity: Vec3, objAngularVelocity: Vec3, deltaTime: number) {
        let used = false;
        let keyPressed = this.getKeysPressed();
        keyPressed.forEach((val, key) => {
            if (!val) return;
            used = true;
            switch (key) {
                case 'a':
                    // object.globalRotate(0, rotateSpeed * deltaTime, 0);
                    break;
                case 'd':
                    // object.globalRotate(0, -rotateSpeed * deltaTime, 0);
                    break;
                case 'w':
                    // object.rotateAroundChild('x', -rotateSpeed * deltaTime);
                    objAngularVelocity[0] += rotateAccel * deltaTime;
                    break;
                case 's':
                    // object.rotateAroundChild('x', rotateSpeed * deltaTime);
                    objAngularVelocity[0] -= rotateAccel * deltaTime;
                    break;
                case 'q':
                    // object.rotateAroundChild('z', rotateSpeed * deltaTime);
                    objAngularVelocity[2] += rotateAccel * deltaTime;
                    break;
                case 'e':
                    // object.rotateAroundChild('z', -rotateSpeed * deltaTime);
                    objAngularVelocity[2] -= rotateAccel * deltaTime;
                    break;
            }
        });

        return used;
    }
}