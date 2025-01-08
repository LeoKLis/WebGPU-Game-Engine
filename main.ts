import { typeOf } from "mathjs";
import { Camera, CameraType } from "./src/camera";
import { InputHandler } from "./src/inputHandler";
import { Renderer } from "./src/renderer";
import { Scene } from "./src/scene";
import { Cube } from "./src/shapes/cube";
import objectHash from "object-hash";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const inputHandler = new InputHandler(canvas, 0.003, 0.000006);

const camera = new Camera(CameraType.perspective, canvas.width * 1.0 / canvas.height);
camera.active = true;

const renderer = new Renderer(canvas);
await renderer.initializeRenderer(camera);

const scene = new Scene(camera);

const cube = new Cube("Kocka", [0, 0, 0], [0, 0, 0], [1, 1, 1]);

scene.add(cube);

scene.container.forEach((el) => console.log(objectHash(el), el.name));


let lastTime = 0;
let render = (time: number) => {
    let deltaTime = time - lastTime;
    lastTime = time;
    
    inputHandler.defaultInputControls(camera, deltaTime);

    renderer.render(scene, time);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
