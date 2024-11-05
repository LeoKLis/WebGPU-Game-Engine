export async function loadObj(filePath: string) {
    const res = await fetch(filePath);
    const file = await res.text();
    return file;
}

export function parseObj(text: string) {
    let lines = text.split('\n');
    let firstVertIndex = lines.findIndex((line) => {
        return line.split(" ")[0] == 'v';
    }) - 1;    

    let vertexData = new Array<number>;
    let normalsData = new Array<number>;
    lines.forEach((line) => {
        if (line.split(" ")[0] == 'f') {
            let lineElements = line.trim().split(" ").slice(1);
            let id1 = parseInt(lineElements[0].split("/")[0]);
            let data1 = getVertexData(lines[id1+firstVertIndex]);            
            for (let i = 0; i < lineElements.length - 2; i++) {
                let id2 = parseInt(lineElements[1 + i].split("/")[0]);
                let data2 = getVertexData(lines[id2+firstVertIndex]);
                let id3 = parseInt(lineElements[2 + i].split("/")[0]);                
                let data3 = getVertexData(lines[id3+firstVertIndex]);
                vertexData.push(...[...data1, ...data2, ...data3]);
            }
        }
    });
    return new Float32Array(vertexData);
}

function getVertexData(line: string) {
    let lineElements = line.split(" ").slice(1);
    let output = lineElements.map((el) => parseFloat(el));
    output.push(1.0);
    return output;
}

function parseLine(lineElement: string, i: number){
    let els = lineElement[i].split("/");
    let v_id = parseInt(els[0]);
    let vn_id = parseInt(els[1])
}