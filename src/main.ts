import { Renderer } from "./renderer";
import { loadObj, parseObj } from "./objParser";
import { observeInputs } from "./inputObserver";



const canvas = document.getElementById("canvas") as HTMLCanvasElement;


const renderer = new Renderer(canvas);
await renderer.init();

observeInputs(renderer);
canvas.onmousedown = (ev) => {
    console.log(ev.offsetX);
    renderer.rotateMouse(ev.offsetX, ev.offsetY);
}
renderer.start();



