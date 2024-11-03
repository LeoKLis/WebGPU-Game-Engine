import { Renderer } from "./renderer";
import { loadObj, parseObj } from "./objParser";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const renderer = new Renderer(canvas);
let text = loadObj("./objects/utahTeapot.obj");
text.then((val) => {
    renderer.init(parseObj(val));
});
