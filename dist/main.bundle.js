/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

class Renderer {
    device;
    canvas;
    context;
    renderPipeline;
    constructor(canvas) {
        this.canvas = canvas;
    }
    async init() {
        const adapter = await navigator.gpu.requestAdapter();
        this.device = await adapter.requestDevice();
        this.context = this.canvas.getContext('webgpu');
        this.context.configure({
            device: this.device,
            format: navigator.gpu.getPreferredCanvasFormat()
        });
        this.createPipeline();
        this.render();
    }
    createPipeline() {
        const renderPipelineDescriptor = {
            label: "Render pipeline",
            layout: "auto",
            vertex: {
                module: this.device.createShaderModule({ code: _shaders_triangle_wgsl__WEBPACK_IMPORTED_MODULE_0__["default"] })
            },
            fragment: {
                module: this.device.createShaderModule({ code: _shaders_triangle_wgsl__WEBPACK_IMPORTED_MODULE_0__["default"] }),
                targets: [{ format: navigator.gpu.getPreferredCanvasFormat() }]
            }
        };
        this.renderPipeline = this.device.createRenderPipeline(renderPipelineDescriptor);
    }
    render(bindGroups) {
        const commandEncoder = this.device?.createCommandEncoder({ label: "Command encoder in renderer" });
        const renderPassDescriptor = {
            label: "Render pass in renderer",
            colorAttachments: [
                {
                    view: this.context.getCurrentTexture().createView(),
                    clearValue: { r: 0.2, g: 0.2, b: 0.2, a: 1.0 },
                    loadOp: 'load',
                    storeOp: 'store'
                }
            ]
        };
        const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor);
        renderPass.setPipeline(this.renderPipeline);
        if (bindGroups !== undefined) {
            bindGroups?.forEach((bg, idx) => {
                renderPass.setBindGroup(idx, bg);
            });
        }
        renderPass.draw(3);
        renderPass.end();
        this.device.queue.submit([commandEncoder.finish()]);
    }
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\r\n@vertex\r\nfn vert(@builtin(vertex_index) vertIndex: u32) -> @builtin(position) vec4f {\r\n    let pos = array(\r\n        vec2f(0.0, 0.5),\r\n        vec2f(-0.5, -0.5),\r\n        vec2f(0.5, -0.5),\r\n    );\r\n\r\n    return vec4f(pos[vertIndex], 0.0, 1.0);\r\n}\r\n\r\n@fragment\r\nfn frag() -> @location(0) vec4f {\r\n    return vec4f(1.0, 0.0, 0.0, 1.0);\r\n}\r\n");

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

const canvas = document.getElementById("canvas");
const renderer = new _renderer__WEBPACK_IMPORTED_MODULE_0__.Renderer(canvas);
renderer.init();
function createCircleVerts({ radius = 1, numSubdivs = 120, innerRadius = 0, startAngle = 0, endAngle = Math.PI * 2, } = {}) {
    const numVerticies = numSubdivs * 2 * 3;
    const vertexData = new Float32Array(numVerticies * (2 + 4)); // 2 za x i y koordinate, 4 za boje
    let offset = 0;
    const addVertex = (x, y, color) => {
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
        var col = { red: ((Math.sin(i / numSubdivs * Math.PI)) / 2) + 0.33, green: ((Math.sin(i / numSubdivs * Math.PI)) / 2) + 0.33, blue: ((Math.sin(i / numSubdivs * Math.PI)) / 2) + 0.33, alpha: 1 };
        addVertex(c1 * radius, s1 * radius, col);
        addVertex(c2 * radius, s2 * radius, col);
        addVertex(c1 * innerRadius, s1 * innerRadius, col);
        addVertex(c1 * innerRadius, s1 * innerRadius, col);
        addVertex(c2 * radius, s2 * radius, col);
        addVertex(c2 * innerRadius, s2 * innerRadius, col);
    }
    return { vertexData, numVerticies };
}

})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map