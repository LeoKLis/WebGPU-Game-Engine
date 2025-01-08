import { rotate } from "mathjs";
import { IObject } from "./interfaces/IObject";


export class InputHandler {
    private canvas: HTMLCanvasElement;
    private keyPressed: Map<String, boolean>;

    private mouseDeltaX: number;
    private mouseDeltaY: number;

    private moveSpeed: number;
    private rotateSpeed: number;

    constructor(canvas: HTMLCanvasElement, moveSpeed: number, rotateSpeed: number) {
        this.canvas = canvas;
        this.keyPressed = new Map();
        this.mouseDeltaX = 0;
        this.mouseDeltaY = 0;
        this.moveSpeed = moveSpeed;
        this.rotateSpeed = rotateSpeed;
        this.listen();
    }

    public listen = () => {
        window.addEventListener("keydown", (e) => {
            this.keyPressed.set(e.key, true);
        });
        window.addEventListener("keyup", (e) => {
            this.keyPressed.set(e.key, false);
        });

        let mouseDown: boolean;
        this.canvas.style.touchAction = 'pinch-zoom';
        this.canvas.addEventListener('pointerdown', () => {
            mouseDown = true;
        });
        this.canvas.addEventListener('pointerup', () => {
            mouseDown = false;
        });
        this.canvas.addEventListener('pointermove', (e) => {
            if (mouseDown) {
                this.mouseDeltaX += e.movementX;
                this.mouseDeltaY += e.movementY;
            }
        });
    }

    public getPressed = () => {
        return this.keyPressed;
    }

    public getMouseMovement = () => {
        let output = [this.mouseDeltaX, this.mouseDeltaY]
        this.mouseDeltaX = 0;
        this.mouseDeltaY = 0;
        return output;
    }

    public defaultInputControls = (object: IObject, deltaTime: number) => {
        // Tipke
        {
            let keyPressed = this.getPressed();
            if (keyPressed.get("a")) {
                object.move(this.moveSpeed * deltaTime, 0, 0);
            }
            if (keyPressed.get("d")) {
                object.move(-this.moveSpeed * deltaTime, 0, 0);
            }
            if (keyPressed.get("w")) {
                object.move(0, 0, this.moveSpeed * deltaTime);
            }
            if (keyPressed.get("s")) {
                object.move(0, 0, -this.moveSpeed * deltaTime);
            }
            if (keyPressed.get(" ")) {
                object.move(0, this.moveSpeed * deltaTime, 0);
            }
            if (keyPressed.get("Shift")) {
                object.move(0, -this.moveSpeed * deltaTime, 0);
            }
            if (keyPressed.get("ArrowRight")) {
                object.rotate(0, -this.rotateSpeed * deltaTime, 0);
            }
            if (keyPressed.get("ArrowLeft")) {
                object.rotate(0, this.rotateSpeed * deltaTime, 0);
            }
            if (keyPressed.get("ArrowUp")) {
                object.rotate(this.rotateSpeed * deltaTime, 0, 0);
            }
            if (keyPressed.get("ArrowDown")) {
                object.rotate(-this.rotateSpeed * deltaTime, 0, 0);
            }
        }

        // Mis
        {
            let mouseMove = this.getMouseMovement();
            object.rotate(mouseMove[1] * deltaTime * this.rotateSpeed, mouseMove[0] * deltaTime * this.rotateSpeed, 0);
        }
    }
}