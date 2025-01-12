import { Camera, CameraType } from "./src/camera";
import { InputHandler } from "./src/inputHandler";
import { Renderer } from "./src/renderer";
import { Scene } from "./src/scene";
import { Cube } from "./src/shapes/cube";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const inputHandler = new InputHandler(canvas, 0.003, 0.000006);

const camera = new Camera(CameraType.perspective, canvas.width * 1.0 / canvas.height);
camera.active = true;

const renderer = new Renderer(canvas);
await renderer.initializeRenderer();

const scene = new Scene(camera);

const cube = new Cube("Kocka", [1, 0, 0], [0, 0, 0], [1, 1, 1], [0.8, 0.5, 0.2, 1]); // Narancasta kocka desno
const cube2 = new Cube("KockaDruga", [-1, 0, 0], [0, 0, 0], [1, 1, 1], [0.2, 0.5, 0.8, 1]); // Plava kocka lijevo

scene.add(cube2);
scene.add(cube);

let lastTime = 0;
let render = (time: number) => {
    let deltaTime = time - lastTime;
    lastTime = time;
    // cube2.move(0.001, 0, 0);
    inputHandler.defaultInputControls(camera, deltaTime);

    renderer.render(scene, time);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
