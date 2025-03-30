import { rotate } from "mathjs";
import { IObject } from "./interfaces/IObject";


export class InputHandler {
    private canvas: HTMLCanvasElement;
    private keysPressed: Map<String, boolean>;

    private mouseDeltaX: number;
    private mouseDeltaY: number;
    private mouseScrollDelta: number;

    private moveSpeed: number;
    private rotateSpeed: number;

    private leftMouseDown: boolean;
    private middleMouseDown: boolean;
    private rightMouseDown: boolean;

    constructor(canvas: HTMLCanvasElement, moveSpeed: number, rotateSpeed: number) {
        this.canvas = canvas;
        this.keysPressed = new Map();

        this.mouseDeltaX = 0;
        this.mouseDeltaY = 0;
        this.mouseScrollDelta = 0;

        this.moveSpeed = moveSpeed / 1000;
        this.rotateSpeed = rotateSpeed / 1000;
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

    public getKeysPressed = () => {
        return this.keysPressed;
    }

    public getMouseMovement = () => {
        let output = [this.mouseDeltaX, this.mouseDeltaY, this.mouseScrollDelta]
        this.mouseDeltaX = 0;
        this.mouseDeltaY = 0;
        this.mouseScrollDelta = 0;
        return output;
    }

    public defaultInputControls = (object: IObject, deltaTime: number) => {
        let keyPressed = this.getKeysPressed();
        keyPressed.forEach((val, key) => {
            if (!val) return;
            switch (key) {
                case 'a':
                    // object.move(this.moveSpeed * deltaTime, 0, 0);
                    break;
                case 'd':
                    // object.move(-this.moveSpeed * deltaTime, 0, 0);
                    break;
                case 'w':
                    // object.move(0, 0, this.moveSpeed * deltaTime);
                    break;
                case 's':
                    // object.move(0, 0, -this.moveSpeed * deltaTime);
                    break;

            }
        })

        let mouseMove = this.getMouseMovement();
        
        if (this.leftMouseDown) {
            object.localMove(mouseMove[0] * deltaTime * this.moveSpeed, mouseMove[1] * deltaTime * -this.moveSpeed, 0);
        }
        else if (this.rightMouseDown) {
            object.localRotate(mouseMove[1] * deltaTime * this.rotateSpeed, mouseMove[0] * deltaTime * this.rotateSpeed, 0);
        } 
        else if (this.middleMouseDown) {
            object.localRotate(0, 0, mouseMove[0] * deltaTime * this.rotateSpeed);
        }
        object.localMove(0, 0, mouseMove[2] * deltaTime * -this.moveSpeed);
    }
}