import { Camera, CameraType } from "./src/camera";
import { Renderer } from "./src/renderer";
import { vec3, mat4 } from "./node_modules/wgpu-matrix/dist/2.x/wgpu-matrix";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const fpsCounter = document.getElementById("fps") as HTMLDivElement;

let aspect = canvas.width * 1.0 / canvas.height;
const camera = new Camera(CameraType.perspective, aspect, 60);

const renderer = new Renderer(canvas);
await renderer.initializeRenderer(camera);

let keyPressed: Map<String, boolean> = new Map();
let lastTime = 0;
let deltaTime = 0;
let speed = 0.003;

let render = (time: number) => {
    fpsCounter.innerText = `FPS: ${Math.round(1 / ((time - lastTime) * 0.001))}`
    deltaTime = time - lastTime;
    lastTime = time;
    if (keyPressed.get("a")) {
        camera.position.x -= speed * deltaTime;
        camera.move(-speed * deltaTime);
    }
    if (keyPressed.get("d")) {
        camera.move(speed * deltaTime);
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

    renderer.render(camera, time);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);

window.addEventListener("keydown", (e) => {
    keyPressed.set(e.key, true);
});

window.addEventListener("keyup", (e) => {
    keyPressed.set(e.key, false);
});
