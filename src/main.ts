import { Renderer } from "./renderer";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const renderer: Renderer = new Renderer(canvas);
renderer.init();

function createCircleVerts({
    radius = 1, numSubdivs = 120, innerRadius = 0, startAngle = 0, endAngle = Math.PI * 2,
} = {}) {
    const numVerticies = numSubdivs * 2 * 3;
    const vertexData = new Float32Array(numVerticies * (2 + 4)); // 2 za x i y koordinate, 4 za boje

    let offset = 0;
    const addVertex = (x: number, y: number, color: { red: number, green: number, blue: number, alpha: number }) => {
        vertexData[offset++] = x;
        vertexData[offset++] = y;
        vertexData.set([color.red, color.green, color.blue, color.alpha], offset);
        offset += 4;
    };

    for (let i = 0; i < numSubdivs; i++) {
        const angle1 = startAngle + (i + 0) * (endAngle - startAngle) / numSubdivs;
        const angle2 = startAngle + (i + 1) * (endAngle - startAngle) / numSubdivs;

        const c1 = Math.cos(angle1);
        const s1 = Math.sin(angle1);
        const c2 = Math.cos(angle2);
        const s2 = Math.sin(angle2);

        var col = { red: ((Math.sin(i / numSubdivs * Math.PI)) / 2) + 0.33, green: ((Math.sin(i / numSubdivs * Math.PI)) / 2) + 0.33, blue: ((Math.sin(i / numSubdivs * Math.PI)) / 2) + 0.33, alpha: 1 }

        addVertex(c1 * radius, s1 * radius, col);
        addVertex(c2 * radius, s2 * radius, col);
        addVertex(c1 * innerRadius, s1 * innerRadius, col);

        addVertex(c1 * innerRadius, s1 * innerRadius, col);
        addVertex(c2 * radius, s2 * radius, col);
        addVertex(c2 * innerRadius, s2 * innerRadius, col);
    }

    return { vertexData, numVerticies };
}