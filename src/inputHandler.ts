

export class InputHandler {
    private canvas: HTMLCanvasElement;
    private keyPressed: Map<String, boolean>;

    private mouseDeltaX: number;
    private mouseDeltaY: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.keyPressed = new Map();
        this.mouseDeltaX = 0;
        this.mouseDeltaY = 0;
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
            if(mouseDown){
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
}