import { Camera, CameraType } from "./src/Objects/camera";
import { InputHandler } from "./src/inputHandler";
import { Renderer } from "./src/renderer";
import { Scene } from "./src/scene";
import { Cube } from "./src/Objects/shapes/cube";
import { Light } from "./src/Objects/light";
import { Model } from "./src/Objects/model";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const renderer = new Renderer(canvas);
await renderer.initializeRenderer();

const inputHandler = new InputHandler(canvas, 0.003, 0.000006);

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
const cube1 = new Cube("KockaDruga", [-2, 0, 0], [0, 0, 0], [1, 1, 1], [0.2, 0.5, 0.8, 1]); // Plava kocka lijevo
// const cube2 = new Cube("KockaTreca", [0, 0, 0], [0, 0, 0], [1, 1, 1], [0.2, 0.8, 0.6, 1]); // Plava kocka lijevo
const model = new Model("Cajnik", [0, 0, 0], [0, 0, 0], [0.01, 0.01, 0.01], [0.2, 0.8, 0.6, 1]);
model.loadDataFromFile("dist/objects/utahTeapot.obj");

// const model2 = new Model("Macka", [1, 0, 1], [0, 0, 0], [0.01, 0.01, 0.01], [0.9, 0.5, 0.3, 1]);
// model2.loadDataFromFile("dist/objects/cat.obj");

const light = new Light("Svijetlo", [-0.5, -0.7, -1]);
const light2 = new Light("Svijetlo", [0.5, 0.7, 0.4]);

scene.add(camera, cube, cube1, /* model, */ model, light, light2);

let lastTime = 0;
let render = (time: number) => {
    let deltaTime = time - lastTime;
    lastTime = time;

    cube.rotate(0, 0.0001, 0);
    // model.rotate(0, 0.0001, 0);
    light2.rotate(0, 0.001, 0);
    inputHandler.defaultInputControls(camera, deltaTime);

    renderer.render(scene, time);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
