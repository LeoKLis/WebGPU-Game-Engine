import { Renderer } from "./renderer";
import { loadObj, parseObj } from "./objParser";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const teapot = document.getElementById("teapot") as HTMLInputElement;
const cat = document.getElementById("cat") as HTMLInputElement;

const triangle_list = document.getElementById("triangle-list") as HTMLInputElement;
const point_list = document.getElementById("point-list") as HTMLInputElement;
const line_list = document.getElementById("line-list") as HTMLInputElement;

const renderer = new Renderer(canvas);
let text = loadObj("./objects/utahTeapot.obj");
text.then((val) => {
    renderer.init(parseObj(val));
});

teapot.addEventListener("click", () => {
    if (teapot.checked) {
        let text = loadObj("./objects/utahTeapot.obj");
        text.then((val) => {
            renderer.loadData(parseObj(val));
        });
    }
    else if (cat.checked) {
        let text = loadObj("./objects/cat.obj");
        text.then((val) => {
            renderer.loadData(parseObj(val));
        });
    }
});

cat.addEventListener("click", () => {
    if (teapot.checked) {
        let text = loadObj("./objects/utahTeapot.obj");
        text.then((val) => {
            renderer.loadData(parseObj(val));
        });
    }
    else if (cat.checked) {
        let text = loadObj("./objects/cat.obj");
        text.then((val) => {
            renderer.loadData(parseObj(val));
        });
    }
});

triangle_list.addEventListener("click", () => {
    if (triangle_list.checked) {
        renderer.changeTexture('triangle-list');
    }
});
point_list.addEventListener("click", () => {
    if (point_list.checked) {
        renderer.changeTexture('point-list');
    }
});
line_list.addEventListener("click", () => {
    if (line_list.checked) {
        renderer.changeTexture('line-list');
    }
});


