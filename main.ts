import { Camera, CameraType } from "./src/camera";
import { InputHandler } from "./src/inputHandler";
import { Renderer } from "./src/renderer";
import { vec3, mat4 } from "wgpu-matrix";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const fpsCounter = document.getElementById("fps") as HTMLDivElement;

const inputHandler = new InputHandler(canvas);
inputHandler.listen();

let aspect = canvas.width * 1.0 / canvas.height;
const camera = new Camera(CameraType.perspective, aspect);

const renderer = new Renderer(canvas);
await renderer.initializeRenderer(camera);

let speed = 0.003;
let rotationSpeed = 0.00003;
let mouseSpeed = 0.00003;

let lastTime = 0;
let render = (time: number) => {
    let deltaTime = time - lastTime;
    fpsCounter.innerText = `FPS: ${Math.round(1 / (deltaTime * 0.001))}`;
    inputControls(deltaTime);

    renderer.render(camera, time);
    requestAnimationFrame(render);
    lastTime = time;
}
requestAnimationFrame(render);

function inputControls(deltaTime: number) {
    // Tipke
    {
        let keyPressed = inputHandler.getPressed();
        if (keyPressed.get("a")) {
            camera.move(speed * deltaTime, 0, 0);
        }
        if (keyPressed.get("d")) {
            camera.move(-speed * deltaTime, 0, 0);
        }
        if (keyPressed.get("w")) {
            camera.move(0, 0, speed * deltaTime);
        }
        if (keyPressed.get("s")) {
            camera.move(0, 0, -speed * deltaTime);
        }
        if (keyPressed.get(" ")) {
            camera.move(0, speed * deltaTime, 0);
        }
        if (keyPressed.get("Shift")) {
            camera.move(0, -speed * deltaTime, 0);
        }
        if (keyPressed.get("ArrowRight")) {
            camera.rotate(0, rotationSpeed * deltaTime, 0);
        }
        if (keyPressed.get("ArrowLeft")) {
            camera.rotate(0, -rotationSpeed * deltaTime, 0);
        }
        if (keyPressed.get("ArrowUp")) {
            camera.rotate(-rotationSpeed * deltaTime, 0, 0);
        }
        if (keyPressed.get("ArrowDown")) {
            camera.rotate(rotationSpeed * deltaTime, 0, 0);
        }
    }

    // Mis
    {
        let mouseMove = inputHandler.getMouseMovement();
        camera.rotate(mouseMove[1] * deltaTime * mouseSpeed, mouseMove[0] * deltaTime * mouseSpeed, 0);
    }
}