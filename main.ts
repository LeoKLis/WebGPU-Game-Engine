import { Camera, CameraType } from "./src/Objects/camera";
import { InputHandler } from "./src/inputHandler";
import { Renderer } from "./src/renderer";
import { Scene } from "./src/scene";
import { Cube } from "./src/Objects/shapes/cube";
import { Light } from "./src/Objects/light";
import { Sphere } from "./src/Objects/shapes/sphere";
import { checkCollision } from "./src/collision";

const canvas = window.document.getElementById("canvas") as HTMLCanvasElement;
const renderer = new Renderer(canvas);
await renderer.initialize();

const inputHandler = new InputHandler(canvas, 0.3, 0.002);

const scene = new Scene();

const camera = new Camera({
    name: "Kamera",
    id: "kameraID",
    position: [0, 0, -5],
    rotation: [0, 0.1, 0],
    size: [1, 1, 1],
    cameraType: CameraType.perspective,
    active: true
});

const cube = new Cube({
    name: "Kocka", 
    id: "kockaID", 
    position: [0, 0, 0], 
    rotation: [0, 0, 0], 
    size: [2, 1, 1], 
    color: [0.8, 0.5, 0.2, 1],
});

const sphere = new Sphere({
    name: "Lopta",
    id: "sphereID",
    position: [1, 1.5, 0],
    rotation: [0, 0, 0],
    radius: 1,
    color: [0.4, 0.9, 0.3, 1],
})

const light = new Light({
    name: "Svijetlo",
    id: "svijetloID",
    position: [0, 0, 0],
    rotation: [-0.4, -0.8, -1],
    size: [1, 1, 1]
})


scene.addObjects(camera, cube, light, sphere);

let lastTime = 0;
let render = (time: number) => {
    let deltaTime = time - lastTime;
    lastTime = time;
    inputHandler.defaultInputControls(camera, deltaTime);

    // sphere.localMove(0, 0, 0.0006);
    cube.localRotate(0.0001, 0.0001, 0);

    console.log(checkCollision(sphere, cube));

    renderer.render(scene, time);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
