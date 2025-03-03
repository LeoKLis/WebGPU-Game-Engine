import { Camera, CameraType } from "./src/Objects/camera";
import { InputHandler } from "./src/inputHandler";
import { Renderer } from "./src/renderer";
import { Scene } from "./src/scene";
import { Cube } from "./src/Objects/shapes/cube";
import { Light } from "./src/Objects/light";
import { Model } from "./src/Objects/model";
import { IObject } from "./src/interfaces/IObject";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const renderer = new Renderer(canvas);
await renderer.initializeRenderer();

const inputHandler = new InputHandler(canvas, 0.3, 0.002);

const scene = new Scene();

const camera = new Camera(
    CameraType.perspective,
    canvas.width / canvas.height,
    undefined,
    undefined,
    undefined,
    true
);

const cube = new Cube("Kocka", [2, 0, 0], [0, 0, 0], [1, 1, 1], [0.8, 0.5, 0.2, 1]); // Narancasta kocka desno
const light = new Light("Svijetlo", [-0.4, -0.8, -1]);

scene.add(camera, cube, light);

let lastTime = 0;
let render = (time: number) => {
    let deltaTime = time - lastTime;
    lastTime = time;
    inputHandler.defaultInputControls(camera, deltaTime);

    renderer.render(scene, time);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
