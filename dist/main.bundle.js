/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/inputObserver.ts":
/*!******************************!*\
  !*** ./src/inputObserver.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   observeInputs: () => (/* binding */ observeInputs)
/* harmony export */ });
/* harmony import */ var _objParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objParser */ "./src/objParser.ts");

const teapot = document.getElementById("teapot");
const cat = document.getElementById("cat");
const triangle_list = document.getElementById("triangle-list");
const point_list = document.getElementById("point-list");
const line_list = document.getElementById("line-list");
const observeInputs = (renderer) => {
    teapot.addEventListener("click", () => {
        renderer.removeVertexData(0);
        (0,_objParser__WEBPACK_IMPORTED_MODULE_0__.loadObj)("./objects/utahTeapot.obj")
            .then((val) => {
            renderer.loadVertexData((0,_objParser__WEBPACK_IMPORTED_MODULE_0__.parseObj)(val));
        });
    });
    cat.addEventListener("click", () => {
        renderer.removeVertexData(0);
        (0,_objParser__WEBPACK_IMPORTED_MODULE_0__.loadObj)("./objects/cat.obj")
            .then((val) => {
            renderer.loadVertexData((0,_objParser__WEBPACK_IMPORTED_MODULE_0__.parseObj)(val));
        });
    });
    triangle_list.addEventListener("click", () => { renderer.changeTopology('triangle-list'); });
    point_list.addEventListener("click", () => { renderer.changeTopology('point-list'); });
    line_list.addEventListener("click", () => { renderer.changeTopology('line-list'); });
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ "./src/renderer.ts");
/* harmony import */ var _inputObserver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inputObserver */ "./src/inputObserver.ts");


const canvas = document.getElementById("canvas");
const renderer = new _renderer__WEBPACK_IMPORTED_MODULE_0__.Renderer(canvas);
await renderer.init();
(0,_inputObserver__WEBPACK_IMPORTED_MODULE_1__.observeInputs)(renderer);
canvas.onmousedown = (ev) => {
    console.log(ev.offsetX);
    renderer.rotateMouse(ev.offsetX, ev.offsetY);
};
renderer.start();

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

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
    let normalsData = new Array;
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
function parseLine(lineElement, i) {
    let els = lineElement[i].split("/");
    let v_id = parseInt(els[0]);
    let vn_id = parseInt(els[1]);
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
    pipelineLayout;
    renderPipeline;
    bindGroupLayout;
    bindGroup;
    uniformBufferData;
    uniformBuffer;
    modelVertexData;
    modelVertDataLen;
    modelBuffers;
    depthTexture;
    topologyType;
    constructor(canvas) {
        this.canvas = canvas;
        this.modelVertexData = [];
        this.modelBuffers = [];
        this.modelVertDataLen = 0;
        this.topologyType = 'point-list';
    }
    async init() {
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
        this.pipelineLayout = this.device.createPipelineLayout({
            bindGroupLayouts: [this.bindGroupLayout]
        });
        this.renderPipeline = this.device.createRenderPipeline({
            label: "Render pipeline",
            layout: this.pipelineLayout,
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
            size: [
                this.canvas.clientWidth * window.devicePixelRatio,
                this.canvas.clientHeight * window.devicePixelRatio,
            ],
            format: 'depth24plus',
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
        });
        let bufferDataLength = 4 * 4 * 3;
        this.uniformBufferData = new Float32Array(bufferDataLength);
        this.uniformBuffer = this.device.createBuffer({
            label: 'Ovaj buffer?',
            size: bufferDataLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });
    }
    loadVertexData = (vertexData) => {
        this.modelVertexData.push(vertexData);
        let modelBuffer = this.device.createBuffer({
            size: vertexData.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        });
        this.modelVertDataLen += vertexData.byteLength;
        this.modelBuffers.push(modelBuffer);
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
        this.pipelineLayout = this.device.createPipelineLayout({
            bindGroupLayouts: [this.bindGroupLayout],
        });
        this.renderPipeline = this.device.createRenderPipeline({
            label: "Render pipeline",
            layout: this.pipelineLayout,
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
                topology: this.topologyType
            }
        });
        this.bindGroup = this.device.createBindGroup({
            label: 'Bind group for all now',
            layout: this.bindGroupLayout,
            entries: [
                { binding: 0, resource: { buffer: this.uniformBuffer } },
                { binding: 1, resource: { buffer: this.modelBuffers[this.modelBuffers.length - 1] } },
            ]
        });
        return this.modelVertexData.length - 1;
    };
    removeVertexData = (index) => {
        if (this.modelVertexData.length == 0 || this.modelVertexData.length <= index) {
            console.log("Length of vertex data array is 0 (throw error later). skipping...");
            return;
        }
        let len = this.modelVertexData[index].byteLength;
        this.modelVertDataLen -= len;
        this.modelVertexData.splice(index, 1);
        this.modelBuffers.splice(index, 1);
    };
    changeTopology = (type) => {
        this.topologyType = type;
        this.renderPipeline = this.device.createRenderPipeline({
            label: "Render pipeline",
            layout: this.pipelineLayout,
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
                topology: this.topologyType
            }
        });
    };
    writeUniBufferData = (uniformBufferData, time) => {
        uniformBufferData[0] = sclX.valueAsNumber / 100;
        uniformBufferData[1] = sclY.valueAsNumber / 100;
        uniformBufferData[2] = sclZ.valueAsNumber / 100;
        uniformBufferData[3] = fov.valueAsNumber / 10;
        uniformBufferData[4] = corX.valueAsNumber;
        uniformBufferData[5] = corY.valueAsNumber;
        uniformBufferData[6] = corZ.valueAsNumber;
        uniformBufferData[7] = time * 0.001;
        // uniBuffer[8] = mouseCordX
        // uniBuffer[9] = mouseCordY
    };
    rotateMouse(posX, posY) {
        this.uniformBufferData[8] = posY / this.canvas.clientWidth * Math.PI * 2;
        this.uniformBufferData[9] = posX / this.canvas.clientHeight * Math.PI * 2;
    }
    render = (time) => {
        this.writeUniBufferData(this.uniformBufferData, time);
        this.device.queue.writeBuffer(this.uniformBuffer, 0, this.uniformBufferData, 0, 12);
        for (let i = 0; i < this.modelVertexData.length; i++) {
            this.device.queue.writeBuffer(this.modelBuffers[i], 0, this.modelVertexData[i]);
        }
        const commandEncoder = this.device.createCommandEncoder({ label: "Command encoder in renderer" });
        const renderPass = commandEncoder.beginRenderPass({
            label: "Render pass in renderer",
            colorAttachments: [{
                    view: this.context.getCurrentTexture().createView(),
                    clearValue: { r: 0.2, g: 0.2, b: 0.2, a: 1.0 },
                    loadOp: 'clear',
                    storeOp: 'store',
                }],
            depthStencilAttachment: {
                view: this.depthTexture.createView(),
                depthClearValue: 1.0,
                depthLoadOp: 'clear',
                depthStoreOp: 'store',
            }
        });
        renderPass.setPipeline(this.renderPipeline);
        renderPass.setBindGroup(0, this.bindGroup);
        if (this.modelVertDataLen != 0) {
            renderPass.draw(this.modelVertDataLen);
        }
        renderPass.end();
        this.device.queue.submit([commandEncoder.finish()]);
        requestAnimationFrame(this.render);
    };
    start = () => {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("struct Uniforms {\r\n    scale: vec3f,\r\n    fov: f32,\r\n    position: vec3f,\r\n    time: f32,\r\n    mouseCords: vec2f,\r\n};\r\n\r\nstruct Cube {\r\n    @builtin(position) modelVerts: vec4f,\r\n};\r\n\r\n@group(0) @binding(0) var<uniform> uni: Uniforms;\r\n@group(0) @binding(1) var<storage, read> cube: array<Cube>;\r\n\r\n@vertex\r\nfn vert(@builtin(vertex_index) vertIndex: u32) -> Cube {\r\n\r\n    let rotationMatrixY = mat4x4f(\r\n        vec4f(cos(uni.mouseCords.y), 0, sin(uni.mouseCords.y), 0),\r\n        vec4f(0, 1, 0, 0),\r\n        vec4f(-sin(uni.mouseCords.y), 0, cos(uni.mouseCords.y), 0),\r\n        vec4f(0, 0, 0, 1),\r\n    );\r\n\r\n    let rotationMatrixX = mat4x4f(\r\n        vec4f(1, 0, 0, 0),\r\n        vec4f(0, cos(uni.time * 2), -sin(uni.time * 2), 0),\r\n        vec4f(0, sin(uni.time * 2), cos(uni.time * 2), 0),\r\n        vec4f(0, 0, 0, 1),\r\n    );\r\n\r\n    let perspMatrix = mat4x4f(\r\n        vec4f(1 / tan(3.1415 * uni.fov / 4), 0, 0, 0),\r\n        vec4f(0, 1 / tan(3.1415 * uni.fov / 4), 0, 0),\r\n        vec4f(0, 0, -600.0 / 599.99, -1),\r\n        vec4f(0, 0, -6 / 599.99, 0),\r\n    );\r\n\r\n    let scaleMatr = mat4x4f(\r\n        vec4f(uni.scale.x, 0, 0 , 0),\r\n        vec4f(0, uni.scale.y, 0 , 0),\r\n        vec4f(0, 0, uni.scale.z , 0),\r\n        vec4f(0, 0, 0 , 1),\r\n    );\r\n\r\n    let offset = vec4f(uni.position, 0);\r\n\r\n    var output: Cube;\r\n    if (arrayLength(&cube) != 0) {\r\n        output.modelVerts = perspMatrix * (rotationMatrixY * scaleMatr * cube[vertIndex].modelVerts + offset);\r\n    }\r\n    // output.cubeColor = cube[vertIndex].cubeColor;\r\n    return output;\r\n}\r\n\r\n@fragment\r\nfn frag(input: Cube) -> @location(0) vec4f {\r\n    // return input.cubeColor;\r\n    return vec4f(0.7, 0.7, 0.7, 1.0);\r\n}\r\n");

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
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map