/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/objParser.ts":
/*!**************************!*\
  !*** ./src/objParser.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadObj: () => (/* binding */ loadObj),
/* harmony export */   parseObj: () => (/* binding */ parseObj)
/* harmony export */ });
async function loadObj(filePath) {
    const res = await fetch(filePath);
    const file = await res.text();
    return file;
}
function parseObj(text) {
    let lines = text.split('\n');
    let firstVertIndex = lines.findIndex((line) => {
        return line.split(" ")[0] == 'v';
    }) - 1;
    let vertexData = new Array;
    lines.forEach((line) => {
        if (line.split(" ")[0] == 'f') {
            let lineElements = line.trim().split(" ").slice(1);
            let id1 = parseInt(lineElements[0].split("/")[0]);
            let data1 = getVertexData(lines[id1 + firstVertIndex]);
            for (let i = 0; i < lineElements.length - 2; i++) {
                let id2 = parseInt(lineElements[1 + i].split("/")[0]);
                let data2 = getVertexData(lines[id2 + firstVertIndex]);
                let id3 = parseInt(lineElements[2 + i].split("/")[0]);
                let data3 = getVertexData(lines[id3 + firstVertIndex]);
                vertexData.push(...[...data1, ...data2, ...data3]);
            }
        }
    });
    return new Float32Array(vertexData);
}
function getVertexData(line) {
    let lineElements = line.split(" ").slice(1);
    let output = lineElements.map((el) => parseFloat(el));
    output.push(1.0);
    return output;
}


/***/ }),

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Renderer: () => (/* binding */ Renderer)
/* harmony export */ });
/* harmony import */ var _shaders_triangle_wgsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shaders/triangle.wgsl */ "./src/shaders/triangle.wgsl");

// import { cubeVertex } from "./objects/cube"
let corX = document.getElementById("cordX");
let corY = document.getElementById("cordY");
let corZ = document.getElementById("cordZ");
let sclX = document.getElementById("sclX");
let sclY = document.getElementById("sclY");
let sclZ = document.getElementById("sclZ");
let fov = document.getElementById("fov");
class Renderer {
    canvas;
    device;
    context;
    renderPipeline;
    bindGroup;
    bindGroupLayout;
    uniformBuffer;
    teapotBuffer;
    bufferData;
    depthTexture;
    vertexData;
    constructor(canvas) {
        this.canvas = canvas;
    }
    async init(vertexData) {
        this.vertexData = vertexData;
        const adapter = await navigator.gpu.requestAdapter();
        this.device = await adapter.requestDevice();
        this.context = this.canvas.getContext('webgpu');
        this.context.configure({
            device: this.device,
            format: navigator.gpu.getPreferredCanvasFormat()
        });
        this.bindGroupLayout = this.device.createBindGroupLayout({
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: {
                        type: "uniform",
                    }
                },
                {
                    binding: 1,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: {
                        type: "read-only-storage",
                    }
                }
            ]
        });
        const pipelineLayout = this.device.createPipelineLayout({
            bindGroupLayouts: [this.bindGroupLayout]
        });
        this.renderPipeline = this.device.createRenderPipeline({
            label: "Render pipeline",
            layout: pipelineLayout,
            vertex: {
                module: this.device.createShaderModule({ code: _shaders_triangle_wgsl__WEBPACK_IMPORTED_MODULE_0__["default"] })
            },
            fragment: {
                module: this.device.createShaderModule({ code: _shaders_triangle_wgsl__WEBPACK_IMPORTED_MODULE_0__["default"] }),
                targets: [{ format: navigator.gpu.getPreferredCanvasFormat() }]
            },
            depthStencil: {
                format: 'depth24plus',
                depthWriteEnabled: true,
                depthCompare: 'less',
            },
            primitive: {
                topology: 'point-list'
            }
        });
        this.depthTexture = this.device.createTexture({
            size: [this.canvas.clientWidth * window.devicePixelRatio, this.canvas.clientHeight * window.devicePixelRatio],
            format: 'depth24plus',
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
        });
        let bufferDataLength = 4 * 4 * 2;
        this.bufferData = new Float32Array(bufferDataLength);
        this.uniformBuffer = this.device.createBuffer({
            label: 'Ovaj buffer?',
            size: bufferDataLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });
        this.teapotBuffer = this.device.createBuffer({
            size: this.vertexData.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        });
        this.bindGroup = this.device.createBindGroup({
            label: 'Bind group for rotating triangles',
            layout: this.bindGroupLayout,
            entries: [
                { binding: 0, resource: { buffer: this.uniformBuffer } },
                { binding: 1, resource: { buffer: this.teapotBuffer } },
            ]
        });
        requestAnimationFrame(this.render);
    }
    loadData(vertexData) {
        this.vertexData = vertexData;
        this.teapotBuffer = this.device.createBuffer({
            size: this.vertexData.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        });
        this.bindGroup = this.device.createBindGroup({
            label: 'Bind group for rotating triangles',
            layout: this.bindGroupLayout,
            entries: [
                { binding: 0, resource: { buffer: this.uniformBuffer } },
                { binding: 1, resource: { buffer: this.teapotBuffer } },
            ]
        });
    }
    changeTexture(type) {
        const pipelineLayout = this.device.createPipelineLayout({
            bindGroupLayouts: [this.bindGroupLayout]
        });
        this.renderPipeline = this.device.createRenderPipeline({
            label: "Render pipeline",
            layout: pipelineLayout,
            vertex: {
                module: this.device.createShaderModule({ code: _shaders_triangle_wgsl__WEBPACK_IMPORTED_MODULE_0__["default"] })
            },
            fragment: {
                module: this.device.createShaderModule({ code: _shaders_triangle_wgsl__WEBPACK_IMPORTED_MODULE_0__["default"] }),
                targets: [{ format: navigator.gpu.getPreferredCanvasFormat() }]
            },
            depthStencil: {
                format: 'depth24plus',
                depthWriteEnabled: true,
                depthCompare: 'less',
            },
            primitive: {
                topology: type
            }
        });
    }
    render = (time) => {
        this.bufferData[0] = sclX.valueAsNumber / 100;
        this.bufferData[1] = sclY.valueAsNumber / 100;
        this.bufferData[2] = sclZ.valueAsNumber / 100;
        this.bufferData[3] = fov.valueAsNumber / 10;
        this.bufferData[4] = corX.valueAsNumber;
        this.bufferData[5] = corY.valueAsNumber;
        this.bufferData[6] = corZ.valueAsNumber;
        this.bufferData[7] = time * 0.001;
        this.device.queue.writeBuffer(this.uniformBuffer, 0, this.bufferData, 0, 8);
        this.device.queue.writeBuffer(this.teapotBuffer, 0, this.vertexData);
        const commandEncoder = this.device.createCommandEncoder({ label: "Command encoder in renderer" });
        const renderPassDescriptor = {
            label: "Render pass in renderer",
            colorAttachments: [
                {
                    view: this.context.getCurrentTexture().createView(),
                    clearValue: { r: 0.2, g: 0.2, b: 0.2, a: 1.0 },
                    loadOp: 'clear',
                    storeOp: 'store',
                }
            ],
            depthStencilAttachment: {
                view: this.depthTexture.createView(),
                depthClearValue: 1.0,
                depthLoadOp: 'clear',
                depthStoreOp: 'store',
            }
        };
        const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor);
        renderPass.setPipeline(this.renderPipeline);
        renderPass.setBindGroup(0, this.bindGroup);
        renderPass.draw(this.vertexData.byteLength);
        renderPass.end();
        this.device.queue.submit([commandEncoder.finish()]);
        requestAnimationFrame(this.render);
    };
}
;


/***/ }),

/***/ "./src/shaders/triangle.wgsl":
/*!***********************************!*\
  !*** ./src/shaders/triangle.wgsl ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("struct Uniforms {\r\n    scale: vec3f,\r\n    fov: f32,\r\n    position: vec3f,\r\n    time: f32,\r\n};\r\n\r\nstruct Cube {\r\n    @builtin(position) cubeVerts: vec4f,\r\n    // @location(0) cubeColor: vec4f\r\n};\r\n\r\n@group(0) @binding(0) var<uniform> uni: Uniforms;\r\n@group(0) @binding(1) var<storage, read> cube: array<Cube>;\r\n\r\n@vertex\r\nfn vert(@builtin(vertex_index) vertIndex: u32) -> Cube {\r\n\r\n    let rotationMatrixY = mat4x4f(\r\n        vec4f(cos(uni.time), 0, sin(uni.time), 0),\r\n        vec4f(0, 1, 0, 0),\r\n        vec4f(-sin(uni.time), 0, cos(uni.time), 0),\r\n        vec4f(0, 0, 0, 1),\r\n    );\r\n\r\n    let rotationMatrixX = mat4x4f(\r\n        vec4f(1, 0, 0, 0),\r\n        vec4f(0, cos(uni.time * 2), -sin(uni.time * 2), 0),\r\n        vec4f(0, sin(uni.time * 2), cos(uni.time * 2), 0),\r\n        vec4f(0, 0, 0, 1),\r\n    );\r\n\r\n    let perspMatrix = mat4x4f(\r\n        vec4f(1 / tan(3.1415 * uni.fov / 4), 0, 0, 0),\r\n        vec4f(0, 1 / tan(3.1415 * uni.fov / 4), 0, 0),\r\n        vec4f(0, 0, -600.0 / 599.99, -1),\r\n        vec4f(0, 0, -6 / 599.99, 0),\r\n    );\r\n\r\n    let scaleMatr = mat4x4f(\r\n        vec4f(uni.scale.x, 0, 0 , 0),\r\n        vec4f(0, uni.scale.y, 0 , 0),\r\n        vec4f(0, 0, uni.scale.z , 0),\r\n        vec4f(0, 0, 0 , 1),\r\n    );\r\n\r\n    let offset = vec4f(uni.position, 0);\r\n\r\n    var output: Cube;\r\n    output.cubeVerts = perspMatrix * (rotationMatrixY * scaleMatr * cube[vertIndex].cubeVerts + offset);\r\n    // output.cubeColor = cube[vertIndex].cubeColor;\r\n    return output;\r\n}\r\n\r\n@fragment\r\nfn frag(input: Cube) -> @location(0) vec4f {\r\n    // return input.cubeColor;\r\n    return vec4f(0.7, 0.7, 0.7, 1.0);\r\n}\r\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ "./src/renderer.ts");
/* harmony import */ var _objParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objParser */ "./src/objParser.ts");


const canvas = document.getElementById("canvas");
const teapot = document.getElementById("teapot");
const cat = document.getElementById("cat");
const triangle_list = document.getElementById("triangle-list");
const point_list = document.getElementById("point-list");
const line_list = document.getElementById("line-list");
const renderer = new _renderer__WEBPACK_IMPORTED_MODULE_0__.Renderer(canvas);
let text = (0,_objParser__WEBPACK_IMPORTED_MODULE_1__.loadObj)("./objects/utahTeapot.obj");
text.then((val) => {
    renderer.init((0,_objParser__WEBPACK_IMPORTED_MODULE_1__.parseObj)(val));
});
teapot.addEventListener("click", () => {
    if (teapot.checked) {
        let text = (0,_objParser__WEBPACK_IMPORTED_MODULE_1__.loadObj)("./objects/utahTeapot.obj");
        text.then((val) => {
            renderer.loadData((0,_objParser__WEBPACK_IMPORTED_MODULE_1__.parseObj)(val));
        });
    }
    else if (cat.checked) {
        let text = (0,_objParser__WEBPACK_IMPORTED_MODULE_1__.loadObj)("./objects/cat.obj");
        text.then((val) => {
            renderer.loadData((0,_objParser__WEBPACK_IMPORTED_MODULE_1__.parseObj)(val));
        });
    }
});
cat.addEventListener("click", () => {
    if (teapot.checked) {
        let text = (0,_objParser__WEBPACK_IMPORTED_MODULE_1__.loadObj)("./objects/utahTeapot.obj");
        text.then((val) => {
            renderer.loadData((0,_objParser__WEBPACK_IMPORTED_MODULE_1__.parseObj)(val));
        });
    }
    else if (cat.checked) {
        let text = (0,_objParser__WEBPACK_IMPORTED_MODULE_1__.loadObj)("./objects/cat.obj");
        text.then((val) => {
            renderer.loadData((0,_objParser__WEBPACK_IMPORTED_MODULE_1__.parseObj)(val));
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

})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map