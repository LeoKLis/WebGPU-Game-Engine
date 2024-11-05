import { loadObj, parseObj } from "./objParser";
import { Renderer } from "./renderer"

const teapot = document.getElementById("teapot") as HTMLInputElement;
const cat = document.getElementById("cat") as HTMLInputElement;
const triangle_list = document.getElementById("triangle-list") as HTMLInputElement;
const point_list = document.getElementById("point-list") as HTMLInputElement;
const line_list = document.getElementById("line-list") as HTMLInputElement;

export const observeInputs = (renderer: Renderer) => {
    teapot.addEventListener("click", () => {
        renderer.removeVertexData(0);
        loadObj("./objects/utahTeapot.obj")
            .then((val) => {
                renderer.loadVertexData(parseObj(val));
            });
    });
    cat.addEventListener("click", () => {
        renderer.removeVertexData(0);
        loadObj("./objects/cat.obj")
            .then((val) => {
                renderer.loadVertexData(parseObj(val));
            });
    });
    
    triangle_list.addEventListener("click", () => { renderer.changeTopology('triangle-list') });
    point_list.addEventListener("click", () => { renderer.changeTopology('point-list') });
    line_list.addEventListener("click", () => { renderer.changeTopology('line-list') });
}