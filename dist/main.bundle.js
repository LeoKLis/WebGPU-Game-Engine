/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_Objects_camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Objects/camera */ "./src/Objects/camera.ts");
/* harmony import */ var _src_inputHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/inputHandler */ "./src/inputHandler.ts");
/* harmony import */ var _src_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/renderer */ "./src/renderer.ts");
/* harmony import */ var _src_scene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/scene */ "./src/scene.ts");
/* harmony import */ var _src_Objects_shapes_cube__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/Objects/shapes/cube */ "./src/Objects/shapes/cube.ts");
/* harmony import */ var _src_Objects_light__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/Objects/light */ "./src/Objects/light.ts");
/* harmony import */ var _src_Objects_shapes_sphere__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/Objects/shapes/sphere */ "./src/Objects/shapes/sphere.ts");
/* harmony import */ var _src_collision__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/collision */ "./src/collision.ts");








const canvas = window.document.getElementById("canvas");
const renderer = new _src_renderer__WEBPACK_IMPORTED_MODULE_2__.Renderer(canvas);
await renderer.initialize();
const inputHandler = new _src_inputHandler__WEBPACK_IMPORTED_MODULE_1__.InputHandler(canvas, 0.3, 0.002);
const scene = new _src_scene__WEBPACK_IMPORTED_MODULE_3__.Scene();
const camera = new _src_Objects_camera__WEBPACK_IMPORTED_MODULE_0__.Camera({
    name: "Kamera",
    id: "kameraID",
    position: [0, 0, -5],
    rotation: [0, 0.1, 0],
    size: [1, 1, 1],
    cameraType: _src_Objects_camera__WEBPACK_IMPORTED_MODULE_0__.CameraType.perspective,
    active: true
});
const cube = new _src_Objects_shapes_cube__WEBPACK_IMPORTED_MODULE_4__.Cube({
    name: "Kocka",
    id: "kockaID",
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    size: [2, 1, 1],
    color: [0.8, 0.5, 0.2, 1],
});
const sphere = new _src_Objects_shapes_sphere__WEBPACK_IMPORTED_MODULE_6__.Sphere({
    name: "Lopta",
    id: "sphereID",
    position: [1, 1.5, 0],
    rotation: [0, 0, 0],
    radius: 1,
    color: [0.4, 0.9, 0.3, 1],
});
const light = new _src_Objects_light__WEBPACK_IMPORTED_MODULE_5__.Light({
    name: "Svijetlo",
    id: "svijetloID",
    position: [0, 0, 0],
    rotation: [-0.4, -0.8, -1],
    size: [1, 1, 1]
});
scene.addObjects(camera, cube, light, sphere);
let lastTime = 0;
let render = (time) => {
    let deltaTime = time - lastTime;
    lastTime = time;
    inputHandler.defaultInputControls(camera, deltaTime);
    // sphere.localMove(0, 0, 0.0006);
    cube.localRotate(0.0001, 0.0001, 0);
    console.log((0,_src_collision__WEBPACK_IMPORTED_MODULE_7__.checkCollision)(sphere, cube));
    renderer.render(scene, time);
    requestAnimationFrame(render);
};
requestAnimationFrame(render);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./src/Objects/camera.ts":
/*!*******************************!*\
  !*** ./src/Objects/camera.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Camera: () => (/* binding */ Camera),
/* harmony export */   CameraType: () => (/* binding */ CameraType)
/* harmony export */ });
/* harmony import */ var wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wgpu-matrix */ "./node_modules/wgpu-matrix/dist/3.x/wgpu-matrix.module.js");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object */ "./src/Objects/object.ts");


var CameraType;
(function (CameraType) {
    CameraType[CameraType["perspective"] = 0] = "perspective";
})(CameraType || (CameraType = {}));
class Camera extends _object__WEBPACK_IMPORTED_MODULE_0__.Object {
    type;
    fov;
    near;
    far;
    aspectRatio;
    active;
    projectionMatrix;
    constructor(cameraDescriptor) {
        super(cameraDescriptor);
        const canvas = document.getElementById("canvas");
        this.aspectRatio = canvas.width / canvas.height;
        this.type = cameraDescriptor.cameraType;
        this.fov = Math.PI / 3;
        this.near = 0.1;
        this.far = 100;
        this.projectionMatrix = wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.mat4.perspective(this.fov, this.aspectRatio, this.near, this.far);
        this.active = cameraDescriptor.active;
    }
    update() {
        let mdl = wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.mat4.multiply(wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.mat4.inverse(this.rotationMatrix), this.positionMatrix);
        return wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.mat4.multiply(this.projectionMatrix, wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.mat4.scale(mdl, this.size));
    }
}


/***/ }),

/***/ "./src/Objects/light.ts":
/*!******************************!*\
  !*** ./src/Objects/light.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Light: () => (/* binding */ Light)
/* harmony export */ });
/* harmony import */ var wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wgpu-matrix */ "./node_modules/wgpu-matrix/dist/3.x/wgpu-matrix.module.js");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object */ "./src/Objects/object.ts");


class Light extends _object__WEBPACK_IMPORTED_MODULE_0__.Object {
    constructor(lightDescriptor) {
        super(lightDescriptor);
    }
    localRotate = (degX, degY, degZ) => {
        wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.vec3.rotateX(this.rotation, wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.vec3.zero(), degX * 180 / Math.PI, this.rotation);
        wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.vec3.rotateY(this.rotation, wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.vec3.zero(), degX * 180 / Math.PI, this.rotation);
        wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.vec3.rotateZ(this.rotation, wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.vec3.zero(), degX * 180 / Math.PI, this.rotation);
    };
    getData = () => {
        return {
            orientation: this.rotation,
        };
    };
}
;


/***/ }),

/***/ "./src/Objects/object.ts":
/*!*******************************!*\
  !*** ./src/Objects/object.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Object: () => (/* binding */ Object)
/* harmony export */ });
/* harmony import */ var wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wgpu-matrix */ "./node_modules/wgpu-matrix/dist/3.x/wgpu-matrix.module.js");

class Object {
    name;
    id;
    position;
    rotation;
    size;
    positionMatrix;
    rotationMatrix;
    scaleMatrix;
    right;
    up;
    back;
    yaw;
    pitch;
    roll;
    constructor(objectDescriptor) {
        this.name = objectDescriptor.name;
        this.id = objectDescriptor.id;
        this.rotation = wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create(...objectDescriptor.rotation);
        if (objectDescriptor.size !== undefined)
            this.size = wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create(...objectDescriptor.size);
        else
            this.size = wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create(1, 1, 1);
        this.positionMatrix = wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.translate(wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.identity(), objectDescriptor.position);
        this.position = new Float32Array(this.positionMatrix.buffer, 4 * 12, 3);
        this.scaleMatrix = wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.scale(wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.identity(), this.size);
        this.rotationMatrix = wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.rotateX(wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.identity(), this.rotation[0]);
        wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.rotateY(this.rotationMatrix, this.rotation[1], this.rotationMatrix);
        wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.rotateZ(this.rotationMatrix, this.rotation[2], this.rotationMatrix);
        this.right = new Float32Array(this.rotationMatrix.buffer, 4 * 0, 3);
        this.up = new Float32Array(this.rotationMatrix.buffer, 4 * 4, 3);
        this.back = new Float32Array(this.rotationMatrix.buffer, 4 * 8, 3);
        this.yaw = Math.atan2(this.back[0], this.back[2]);
        this.pitch = -Math.asin(this.back[1]);
        this.roll = Math.atan2(-this.up[0], this.right[0]);
    }
    globalMove(x, y, z) {
        wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.translate(this.positionMatrix, [x, y, z], this.positionMatrix);
    }
    globalRotate(x, y, z) {
        wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.rotateX(this.rotationMatrix, x * 180 / Math.PI, this.rotationMatrix);
        wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.rotateY(this.rotationMatrix, y * 180 / Math.PI, this.rotationMatrix);
        wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.rotateZ(this.rotationMatrix, z * 180 / Math.PI, this.rotationMatrix);
    }
    localMove(x, y, z) {
        let relativeDirection = wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create(0, 0, 0);
        relativeDirection = wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.addScaled(relativeDirection, this.right, x);
        relativeDirection = wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.addScaled(relativeDirection, this.up, y);
        relativeDirection = wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.addScaled(relativeDirection, this.back, z);
        wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.translate(this.positionMatrix, relativeDirection, this.positionMatrix);
    }
    localRotate(x, y, z) {
        this.yaw += y * 180 / Math.PI;
        this.pitch += x * 180 / Math.PI;
        this.roll += z * 180 / Math.PI;
        const rotY = wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.rotationY(this.yaw);
        const rotX = wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.rotationX(this.pitch);
        const rotZ = wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.rotationZ(this.roll);
        wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.multiply(rotY, rotX, this.rotationMatrix);
        wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.multiply(this.rotationMatrix, rotZ, this.rotationMatrix);
    }
    scale(x, y, z) {
        wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.scale(this.scaleMatrix, [x, y, z], this.scaleMatrix);
    }
    getRotationMatrix() {
        return this.rotationMatrix;
    }
    hashCode() {
        return this.name.split('').reduce((hash, char) => {
            return char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash;
        }, 0);
    }
}


/***/ }),

/***/ "./src/Objects/shapes/cube.ts":
/*!************************************!*\
  !*** ./src/Objects/shapes/cube.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cube: () => (/* binding */ Cube)
/* harmony export */ });
/* harmony import */ var wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wgpu-matrix */ "./node_modules/wgpu-matrix/dist/3.x/wgpu-matrix.module.js");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../object */ "./src/Objects/object.ts");


class Cube extends _object__WEBPACK_IMPORTED_MODULE_0__.Object {
    color;
    vertices;
    constructor(cubeDescriptor) {
        super(cubeDescriptor);
        this.color = wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.vec4.create(...cubeDescriptor.color);
        this.vertices = this.initVertices();
    }
    getData() {
        let outMat = wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.mat4.multiply(wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.mat4.multiply(this.positionMatrix, this.rotationMatrix), this.scaleMatrix);
        return {
            vertexData: this.vertices,
            numVerticies: 36,
            objectMatrix: outMat,
            color: this.color.buffer,
        };
    }
    initVertices() {
        let vertices = new Float32Array([
            -0.5, 0.5, 0.5, // front face
            -0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, -0.5, // right f
            0.5, 0.5, 0.5,
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, -0.5, // back f
            0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,
            -0.5, -0.5, -0.5,
            -0.5, 0.5, 0.5, // left f
            -0.5, 0.5, -0.5,
            -0.5, -0.5, 0.5,
            -0.5, -0.5, -0.5,
            0.5, -0.5, 0.5, // bottom f
            -0.5, -0.5, 0.5,
            0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,
            -0.5, 0.5, 0.5, // top f
            0.5, 0.5, 0.5,
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5
        ]);
        let normalsData = new Float32Array([
            0, 0, 1, // Front
            1, 0, 0, // Right
            0, 0, -1, // Back
            -1, 0, 0, // Left
            0, -1, 0, // Bottom
            0, 1, 0 // Top
        ]);
        let indexData = new Uint16Array([
            0, 1, 2, 2, 1, 3, // front
            4, 5, 6, 6, 5, 7, // right
            8, 9, 10, 10, 9, 11, // back
            12, 13, 14, 14, 13, 15, // left
            16, 17, 18, 18, 17, 19, // bottom
            20, 21, 22, 22, 21, 23, // top
        ]);
        let out = new Float32Array(indexData.length * 6);
        for (let i = 0; i < indexData.length; i++) {
            const positionIdx = indexData[i] * 3;
            const position = vertices.slice(positionIdx, positionIdx + 3);
            out.set(position, i * 6);
            const quadIdx = (i / 6 | 0) * 3;
            const normal = normalsData.slice(quadIdx, quadIdx + 3);
            out.set(normal, i * 6 + 3);
        }
        return out;
    }
}


/***/ }),

/***/ "./src/Objects/shapes/model.ts":
/*!*************************************!*\
  !*** ./src/Objects/shapes/model.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Model: () => (/* binding */ Model)
/* harmony export */ });
/* harmony import */ var wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wgpu-matrix */ "./node_modules/wgpu-matrix/dist/3.x/wgpu-matrix.module.js");
/* harmony import */ var _loaders_gl_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @loaders.gl/core */ "./node_modules/@loaders.gl/core/dist/lib/api/parse.js");
/* harmony import */ var _loaders_gl_obj__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @loaders.gl/obj */ "./node_modules/@loaders.gl/obj/dist/index.js");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../object */ "./src/Objects/object.ts");




class Model extends _object__WEBPACK_IMPORTED_MODULE_0__.Object {
    color;
    // private positions!: Float32Array;
    vertexData;
    normalsData;
    indexData;
    vertexNormals;
    constructor(modelDescriptor) {
        super(modelDescriptor);
        this.color = wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.vec4.create(...modelDescriptor.color);
    }
    loadDataFromFile = async (url) => {
        const data = await (0,_loaders_gl_core__WEBPACK_IMPORTED_MODULE_2__.parse)(fetch(`../../${url}`), _loaders_gl_obj__WEBPACK_IMPORTED_MODULE_3__.OBJLoader);
        const dataPosition = data.attributes['POSITION'].value;
        if (data.attributes['NORMAL'] === undefined) {
            this.vertexData = new Float32Array(dataPosition.length * 6);
            for (let i = 0; i < dataPosition.length; i++) {
                const position = dataPosition.slice(i * 3, i * 3 + 3);
                this.vertexData.set(position, i * 6);
                this.vertexData.set([1, 1, 1], i * 6 + 3);
            }
        }
        else {
            const dataNormal = data.attributes['NORMAL'].value;
            this.vertexData = new Float32Array(dataPosition.length * 6);
            for (let i = 0; i < dataPosition.length; i++) {
                const position = dataPosition.slice(i * 3, i * 3 + 3);
                this.vertexData.set(position, i * 6);
                const normal = dataNormal.slice(i * 3, i * 3 + 3);
                this.vertexData.set(normal, i * 6 + 3);
            }
        }
    };
    getData = () => {
        if (this.vertexData === undefined) {
            return undefined;
        }
        return {
            vertexData: this.vertexData,
            numVerticies: this.vertexData.length / 6,
            objectMatrix: this.positionMatrix,
            color: this.color.buffer,
        };
    };
}


/***/ }),

/***/ "./src/Objects/shapes/sphere.ts":
/*!**************************************!*\
  !*** ./src/Objects/shapes/sphere.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sphere: () => (/* binding */ Sphere)
/* harmony export */ });
/* harmony import */ var wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wgpu-matrix */ "./node_modules/wgpu-matrix/dist/3.x/wgpu-matrix.module.js");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../object */ "./src/Objects/object.ts");


class Sphere extends _object__WEBPACK_IMPORTED_MODULE_0__.Object {
    color;
    radius;
    vertices;
    constructor(sphereDescriptor) {
        super(sphereDescriptor);
        this.color = wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.vec4.create(...sphereDescriptor.color);
        this.radius = sphereDescriptor.radius;
        this.size[0] = this.radius;
        this.size[1] = this.radius;
        this.size[2] = this.radius;
        this.vertices = this.initVertices(this.radius, 20, 20);
    }
    getData() {
        let outMat = wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.mat4.multiply(wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.mat4.multiply(this.positionMatrix, this.rotationMatrix), this.scaleMatrix);
        return {
            vertexData: this.vertices,
            numVerticies: this.vertices.length / 6,
            objectMatrix: outMat,
            color: this.color.buffer,
        };
    }
    setRadius(radius) {
        this.size[0] = radius;
        this.size[1] = radius;
        this.size[2] = radius;
        wgpu_matrix__WEBPACK_IMPORTED_MODULE_1__.mat4.scaling([radius, radius, radius], this.scaleMatrix);
    }
    getRadius() {
        return this.size[0];
    }
    initVertices(radius, latSegments, lonSegments) {
        const data = [];
        const vertexMap = []; // Stores raw vertices
        // Step 1: Generate unique vertices and normals
        for (let lat = 0; lat <= latSegments; lat++) {
            const theta = (lat * Math.PI) / latSegments; // Latitude angle (0 to π)
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);
            for (let lon = 0; lon <= lonSegments; lon++) {
                const phi = (lon * 2 * Math.PI) / lonSegments; // Longitude angle (0 to 2π)
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);
                // Compute vertex position
                const x = cosPhi * sinTheta;
                const y = cosTheta;
                const z = sinPhi * sinTheta;
                // Store as an array entry
                vertexMap.push([radius * x, radius * y, radius * z, x, y, z]); // Position + Normal
            }
        }
        // Step 2: Generate triangle data, duplicating vertices
        for (let lat = 0; lat < latSegments; lat++) {
            for (let lon = 0; lon < lonSegments; lon++) {
                const i0 = lat * (lonSegments + 1) + lon;
                const i1 = i0 + 1;
                const i2 = i0 + (lonSegments + 1);
                const i3 = i2 + 1;
                // First triangle (i0, i2, i1)
                data.push(...vertexMap[i0], ...vertexMap[i2], ...vertexMap[i1]);
                // Second triangle (i1, i2, i3)
                data.push(...vertexMap[i1], ...vertexMap[i2], ...vertexMap[i3]);
            }
        }
        return new Float32Array(data);
    }
}


/***/ }),

/***/ "./src/collision.ts":
/*!**************************!*\
  !*** ./src/collision.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkCollision: () => (/* binding */ checkCollision)
/* harmony export */ });
/* harmony import */ var wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wgpu-matrix */ "./node_modules/wgpu-matrix/dist/3.x/wgpu-matrix.module.js");

function checkCollision(sphere, cube) {
    const localSpherePosition = wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.subtract(sphere.position, cube.position);
    const inverseRotationMatrix = wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.transpose(cube.getRotationMatrix());
    const spherePosLocal = wgpu_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.transformMat4(localSpherePosition, inverseRotationMatrix);
    const closestX = Math.max(-cube.size[0] / 2, Math.min(spherePosLocal[0], cube.size[0] / 2));
    const closestY = Math.max(-cube.size[1] / 2, Math.min(spherePosLocal[1], cube.size[1] / 2));
    const closestZ = Math.max(-cube.size[2] / 2, Math.min(spherePosLocal[2], cube.size[2] / 2));
    const dx = spherePosLocal[0] - closestX;
    const dy = spherePosLocal[1] - closestY;
    const dz = spherePosLocal[2] - closestZ;
    const distanceSquared = dx * dx + dy * dy + dz * dz;
    return distanceSquared <= sphere.getRadius() * sphere.getRadius();
}


/***/ }),

/***/ "./src/inputHandler.ts":
/*!*****************************!*\
  !*** ./src/inputHandler.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputHandler: () => (/* binding */ InputHandler)
/* harmony export */ });
class InputHandler {
    canvas;
    keysPressed;
    mouseDeltaX;
    mouseDeltaY;
    mouseScrollDelta;
    moveSpeed;
    rotateSpeed;
    leftMouseDown;
    middleMouseDown;
    rightMouseDown;
    constructor(canvas, moveSpeed, rotateSpeed) {
        this.canvas = canvas;
        this.keysPressed = new Map();
        this.mouseDeltaX = 0;
        this.mouseDeltaY = 0;
        this.mouseScrollDelta = 0;
        this.moveSpeed = moveSpeed / 1000;
        this.rotateSpeed = rotateSpeed / 1000;
        this.leftMouseDown = false;
        this.middleMouseDown = false;
        this.rightMouseDown = false;
        this.listen();
    }
    listen = () => {
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
        window.addEventListener("keydown", (e) => this.keysPressed.set(e.key, true));
        window.addEventListener("keyup", (e) => this.keysPressed.set(e.key, false));
        this.canvas.style.touchAction = 'pinch-zoom';
        this.canvas.addEventListener('mousedown', (e) => {
            switch (e.button) {
                case 0:
                    this.leftMouseDown = true;
                    break;
                case 1:
                    this.middleMouseDown = true;
                    break;
                case 2:
                    this.rightMouseDown = true;
                    break;
            }
        });
        this.canvas.addEventListener('mouseup', (e) => {
            switch (e.button) {
                case 0:
                    this.leftMouseDown = false;
                case 1:
                    this.middleMouseDown = false;
                case 2:
                    this.rightMouseDown = false;
            }
        });
        this.canvas.addEventListener('pointermove', (e) => {
            if (this.leftMouseDown || this.middleMouseDown || this.rightMouseDown) {
                this.mouseDeltaX += e.movementX;
                this.mouseDeltaY += e.movementY;
            }
        });
        this.canvas.addEventListener('wheel', (e) => {
            this.mouseScrollDelta += e.deltaY;
        });
    };
    getKeysPressed = () => {
        return this.keysPressed;
    };
    getMouseMovement = () => {
        let output = [this.mouseDeltaX, this.mouseDeltaY, this.mouseScrollDelta];
        this.mouseDeltaX = 0;
        this.mouseDeltaY = 0;
        this.mouseScrollDelta = 0;
        return output;
    };
    defaultInputControls = (object, deltaTime) => {
        let keyPressed = this.getKeysPressed();
        keyPressed.forEach((val, key) => {
            if (!val)
                return;
            switch (key) {
                case 'a':
                    // object.move(this.moveSpeed * deltaTime, 0, 0);
                    break;
                case 'd':
                    // object.move(-this.moveSpeed * deltaTime, 0, 0);
                    break;
                case 'w':
                    // object.move(0, 0, this.moveSpeed * deltaTime);
                    break;
                case 's':
                    // object.move(0, 0, -this.moveSpeed * deltaTime);
                    break;
            }
        });
        let mouseMove = this.getMouseMovement();
        if (this.leftMouseDown) {
            object.localMove(mouseMove[0] * deltaTime * this.moveSpeed, mouseMove[1] * deltaTime * -this.moveSpeed, 0);
        }
        else if (this.rightMouseDown) {
            object.localRotate(mouseMove[1] * deltaTime * this.rotateSpeed, mouseMove[0] * deltaTime * this.rotateSpeed, 0);
        }
        else if (this.middleMouseDown) {
            object.localRotate(0, 0, mouseMove[0] * deltaTime * this.rotateSpeed);
        }
        object.localMove(0, 0, mouseMove[2] * deltaTime * -this.moveSpeed);
    };
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
/* harmony import */ var _Objects_camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Objects/camera */ "./src/Objects/camera.ts");
/* harmony import */ var _shaders_shaderMain_wgsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaders/shaderMain.wgsl */ "./src/shaders/shaderMain.wgsl");
/* harmony import */ var _Objects_shapes_cube__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Objects/shapes/cube */ "./src/Objects/shapes/cube.ts");
/* harmony import */ var _Objects_light__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Objects/light */ "./src/Objects/light.ts");
/* harmony import */ var _Objects_shapes_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Objects/shapes/model */ "./src/Objects/shapes/model.ts");
/* harmony import */ var _Objects_shapes_sphere__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Objects/shapes/sphere */ "./src/Objects/shapes/sphere.ts");






class Renderer {
    canvas;
    device;
    context;
    presentationFormat;
    renderPipeline;
    renderPassDescriptor;
    multisamlpeTexture;
    renderTarget;
    renderTargetView;
    cameraBindGroup;
    objectBindGroup;
    cameraBuffer;
    lightBuffer;
    objTransformationBuffer;
    colorBuffer;
    isMultisampled = true;
    objectMap;
    constructor(canvas) {
        this.canvas = canvas;
        this.objectMap = new Map();
    }
    async initialize() {
        if (navigator.gpu === undefined) {
            console.log("This browser/device doesn't support WebGPU...");
            return;
        }
        // Get device
        let adapter = await navigator.gpu.requestAdapter();
        this.device = await adapter.requestDevice();
        if (this.device === undefined) {
            console.log("Couldn't load device (not supported)");
            return;
        }
        // Configure context
        this.context = this.canvas.getContext('webgpu');
        this.presentationFormat = navigator.gpu.getPreferredCanvasFormat();
        this.context.configure({
            device: this.device,
            format: navigator.gpu.getPreferredCanvasFormat(),
            alphaMode: 'premultiplied'
        });
        this.canvas.width = this.canvas.clientWidth * window.devicePixelRatio;
        this.canvas.height = this.canvas.clientHeight * window.devicePixelRatio;
        // ========== Create bind group layouts ==========
        const cameraBindGroupLayoutDescriptor = {
            label: 'Camera bind group layout desc',
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: {
                        type: "uniform",
                        hasDynamicOffset: false,
                    },
                },
                {
                    binding: 1,
                    visibility: GPUShaderStage.FRAGMENT,
                    buffer: {
                        type: "uniform",
                        hasDynamicOffset: false,
                    },
                },
            ]
        };
        const cameraBindGroupLayout = this.device.createBindGroupLayout(cameraBindGroupLayoutDescriptor);
        const objectBindGroupLayoutDescriptor = {
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: {
                        type: 'uniform',
                        hasDynamicOffset: true,
                    }
                },
                {
                    binding: 1,
                    visibility: GPUShaderStage.FRAGMENT,
                    buffer: {
                        type: 'uniform',
                        hasDynamicOffset: true,
                    }
                },
            ]
        };
        const objectBindGroupLayout = this.device.createBindGroupLayout(objectBindGroupLayoutDescriptor);
        // ========== Create render pipeline ==========
        const shaderModule = this.device.createShaderModule({ code: _shaders_shaderMain_wgsl__WEBPACK_IMPORTED_MODULE_1__["default"] });
        const renderPipelineDescriptor = {
            label: 'Default render pipeline',
            layout: this.device.createPipelineLayout({ bindGroupLayouts: [cameraBindGroupLayout, objectBindGroupLayout] }),
            vertex: {
                module: shaderModule,
                buffers: [
                    {
                        arrayStride: (3 + 3) * 4, // 3 vertex coords & 3 normals coords
                        attributes: [
                            { shaderLocation: 0, offset: 0, format: 'float32x3' },
                            { shaderLocation: 1, offset: 3 * 4, format: 'float32x3' },
                        ]
                    }
                ]
            },
            fragment: {
                module: shaderModule,
                targets: [{ format: this.presentationFormat }]
            },
            depthStencil: {
                format: 'depth24plus',
                depthWriteEnabled: true,
                depthCompare: 'less',
            },
            multisample: {
                count: this.isMultisampled ? 4 : 1,
            },
        };
        this.renderPipeline = this.device.createRenderPipeline(renderPipelineDescriptor);
        // ========== Camera Bind Group ==========
        this.cameraBuffer = this.device.createBuffer({
            size: 4 * 4 * 4, // 4 x 4 float32 matrix
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });
        this.lightBuffer = this.device.createBuffer({
            label: 'Meduspremnik za svjetlo',
            size: 3 * 4 * 4,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });
        this.cameraBindGroup = this.device.createBindGroup({
            layout: this.renderPipeline.getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: this.cameraBuffer,
                        offset: 0,
                        size: 16 * 4,
                    }
                },
                {
                    binding: 1,
                    resource: {
                        buffer: this.lightBuffer,
                        offset: 0,
                        size: 12 * 4,
                    }
                },
            ],
        });
        // ========== Object Bind Group ==========
        this.objTransformationBuffer = this.device.createBuffer({
            size: 4 * 16 * 1024,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        });
        this.colorBuffer = this.device.createBuffer({
            size: 4 * 4 * 1024,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        });
        this.objectBindGroup = this.device.createBindGroup({
            layout: this.renderPipeline.getBindGroupLayout(1),
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: this.objTransformationBuffer,
                        offset: 0,
                        size: 4 * 16,
                    }
                },
                {
                    binding: 1,
                    resource: {
                        buffer: this.colorBuffer,
                        offset: 0,
                        size: 4 * 4,
                    }
                },
            ],
        });
        // Prepare depth texture
        const depthTexture = this.device.createTexture({
            size: [this.context.getCurrentTexture().width, this.context.getCurrentTexture().height],
            format: 'depth24plus',
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
            sampleCount: this.isMultisampled ? 4 : 1
        });
        // Initialize and set render pass descriptor
        // this.renderPassDescriptor = setRenderPassDescriptor([0.2, 0.2, 0.2, 1], 'clear', 'store', depthTexture);
        this.renderPassDescriptor = {
            // @ts-ignore
            colorAttachments: [{
                    clearValue: [0.2, 0.2, 0.2, 1],
                    loadOp: 'clear',
                    storeOp: 'store',
                }
            ],
            depthStencilAttachment: {
                view: depthTexture.createView(),
                depthClearValue: 1.0,
                depthLoadOp: 'clear',
                depthStoreOp: 'discard',
            }
        };
    }
    render = (scene, time) => {
        const canvasTexture = this.context.getCurrentTexture();
        if (!this.multisamlpeTexture ||
            this.multisamlpeTexture.width !== canvasTexture.width ||
            this.multisamlpeTexture.height !== canvasTexture.height) {
            if (this.multisamlpeTexture) {
                this.multisamlpeTexture.destroy();
            }
            this.multisamlpeTexture = this.device.createTexture({
                format: canvasTexture.format,
                usage: GPUTextureUsage.RENDER_ATTACHMENT,
                size: [canvasTexture.width, canvasTexture.height],
                sampleCount: 4,
            });
        }
        const encoder = this.device.createCommandEncoder({ label: 'Default encoder' });
        // for (let el of this.renderPassDescriptor.colorAttachments) {
        //     el!.view = this.multisamlpeTexture.createView();
        //     el!.resolveTarget = canvasTexture.createView();
        // }
        this.renderPassDescriptor.colorAttachments[0].view = this.multisamlpeTexture.createView();
        this.renderPassDescriptor.colorAttachments[0].resolveTarget = canvasTexture.createView();
        const renderPass = encoder.beginRenderPass(this.renderPassDescriptor);
        renderPass.setPipeline(this.renderPipeline);
        renderPass.setBindGroup(0, this.cameraBindGroup);
        let objectCount = 0;
        let lightCount = 0;
        let lightArr = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        scene.objects.forEach((el) => {
            if (el instanceof _Objects_camera__WEBPACK_IMPORTED_MODULE_0__.Camera && el.active) {
                this.device.queue.writeBuffer(this.cameraBuffer, 0, el.update(), 0, 16);
            }
            if (el instanceof _Objects_shapes_cube__WEBPACK_IMPORTED_MODULE_2__.Cube || el instanceof _Objects_shapes_sphere__WEBPACK_IMPORTED_MODULE_5__.Sphere) {
                let objVerts = el.getData();
                let val = this.objectMap.get(el.id);
                if (val === undefined) {
                    console.log(`Create map entry for ${el.name}!`);
                    let objBuffer = this.device.createBuffer({
                        label: el.name,
                        size: objVerts.vertexData.byteLength,
                        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
                        mappedAtCreation: true,
                    });
                    let buffer = objBuffer.getMappedRange();
                    let view = new Float32Array(buffer);
                    view.set(objVerts.vertexData);
                    objBuffer.unmap();
                    val = objBuffer;
                    this.objectMap.set(el.id, val);
                }
                this.device.queue.writeBuffer(this.objTransformationBuffer, objectCount * 256, objVerts.objectMatrix);
                this.device.queue.writeBuffer(this.colorBuffer, objectCount * 256, objVerts.color);
                renderPass.setVertexBuffer(0, val);
                renderPass.setBindGroup(1, this.objectBindGroup, [objectCount * 256, objectCount * 256]);
                renderPass.draw(objVerts.numVerticies);
                objectCount += 1;
            }
            if (el instanceof _Objects_shapes_model__WEBPACK_IMPORTED_MODULE_4__.Model) {
                let objVerts = el.getData();
                if (objVerts === undefined) {
                    return;
                }
                let val = this.objectMap.get(el.id);
                if (val === undefined) {
                    console.log(`Create map entry for ${el.name}`);
                    let objBuffer = this.device.createBuffer({
                        label: el.name,
                        size: 20352384,
                        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
                        mappedAtCreation: true,
                    });
                    let buffer = objBuffer.getMappedRange();
                    let view = new Float32Array(buffer);
                    view.set(objVerts.vertexData);
                    objBuffer.unmap();
                    val = objBuffer;
                    this.objectMap.set(el.id, val);
                }
                this.device.queue.writeBuffer(this.objTransformationBuffer, objectCount * 256, objVerts.objectMatrix);
                this.device.queue.writeBuffer(this.colorBuffer, objectCount * 256, objVerts.color);
                renderPass.setVertexBuffer(0, val);
                renderPass.setBindGroup(1, this.objectBindGroup, [objectCount * 256, objectCount * 256]);
                renderPass.draw(objVerts.numVerticies);
                objectCount += 1;
            }
            if (el instanceof _Objects_light__WEBPACK_IMPORTED_MODULE_3__.Light) {
                let lightData = el.getData();
                lightArr.set(lightData.orientation, lightCount * 4);
                this.device.queue.writeBuffer(this.lightBuffer, 0, lightArr);
                lightCount += 1;
            }
        });
        renderPass.draw(6);
        renderPass.end();
        const commandBuffer = encoder.finish();
        this.device.queue.submit([commandBuffer]);
    };
}
;


/***/ }),

/***/ "./src/scene.ts":
/*!**********************!*\
  !*** ./src/scene.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Scene: () => (/* binding */ Scene)
/* harmony export */ });
class Scene {
    objects;
    objectLookup;
    constructor() {
        this.objects = new Array();
        this.objectLookup = new Map();
    }
    addObjects(...objects) {
        for (let object of objects) {
            if (this.objectLookup.has(object.hashCode()))
                continue;
            this.objects.push(object);
            this.objectLookup.set(object.hashCode(), object);
        }
    }
    removeObjects(...objects) {
        for (let object of objects) {
            if (!this.objectLookup.has(object.hashCode()))
                continue;
            this.objectLookup.delete(object.hashCode());
            this.objects = this.objects.splice(this.objects.indexOf(object));
        }
    }
}


/***/ }),

/***/ "./src/shaders/shaderMain.wgsl":
/*!*************************************!*\
  !*** ./src/shaders/shaderMain.wgsl ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("struct Camera {\r\n    matrix: mat4x4f,\r\n};\r\n\r\nstruct VertexOutput {\r\n    @builtin(position) position: vec4f,\r\n    @location(0) normal: vec3f,\r\n};\r\n\r\n// Bind group for world\r\n@group(0) @binding(0) var<uniform> camera: Camera;\r\n@group(0) @binding(1) var<uniform> light: array<vec3f, 3>;\r\n\r\n// Bind group for objects\r\n@group(1) @binding(0) var<uniform> objTran: mat4x4f;\r\n@group(1) @binding(1) var<uniform> color: vec4f;\r\n\r\n@vertex\r\nfn vert(\r\n    @location(0) position: vec4f,\r\n    @location(1) normal: vec3f,\r\n    @builtin(vertex_index) vertIndex: u32\r\n) -> VertexOutput {\r\n    var vsOut: VertexOutput;\r\n    vsOut.position = camera.matrix * objTran * position;\r\n    vsOut.normal = (objTran * vec4f(normal, 0)).xyz;\r\n    return vsOut;\r\n}\r\n\r\n@fragment\r\nfn frag(vsOut: VertexOutput) -> @location(0) vec4f {\r\n    let normal = normalize(vsOut.normal);\r\n    var lgh: f32;\r\n    for (var i = 0; i < 3; i++) {\r\n        let dp = dot(normal, -light[i]);\r\n        if dp > 0 {\r\n            lgh += dot(normal, -light[i]); // Num between 0..1\r\n        }\r\n    }\r\n    if lgh < 0.2 { // Adjust min shadow\r\n        lgh = 0.2;\r\n    }\r\n    let col = color.rgb * lgh; // Multiply only color (not alpha)\r\n    return vec4f(col, color.a);\r\n    // return color; \r\n    // return vec4f(0.8, 0.5, 0.2, 1);\r\n}\r\n");

/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-array-buffer-iterator.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-array-buffer-iterator.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeArrayBufferIterator: () => (/* binding */ makeArrayBufferIterator)
/* harmony export */ });
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
const DEFAULT_CHUNK_SIZE = 256 * 1024;
/**
 * Returns an iterator that breaks a big ArrayBuffer into chunks and yields them one-by-one
 * @param blob ArrayBuffer to iterate over
 * @param options
 * @param options.chunkSize
 */
function* makeArrayBufferIterator(arrayBuffer, options = {}) {
    const { chunkSize = DEFAULT_CHUNK_SIZE } = options;
    let byteOffset = 0;
    while (byteOffset < arrayBuffer.byteLength) {
        // Create a chunk of the right size
        const chunkByteLength = Math.min(arrayBuffer.byteLength - byteOffset, chunkSize);
        const chunk = new ArrayBuffer(chunkByteLength);
        // Copy data from the big chunk
        const sourceArray = new Uint8Array(arrayBuffer, byteOffset, chunkByteLength);
        const chunkArray = new Uint8Array(chunk);
        chunkArray.set(sourceArray);
        // yield the chunk
        byteOffset += chunkByteLength;
        yield chunk;
    }
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-blob-iterator.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-blob-iterator.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeBlobIterator: () => (/* binding */ makeBlobIterator)
/* harmony export */ });
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
const DEFAULT_CHUNK_SIZE = 1024 * 1024; // 1MB — biggest value that keeps UI responsive
/**
 * Returns an iterator that breaks a big Blob into chunks and yields them one-by-one
 * @param blob Blob or File object
 * @param options
 * @param options.chunkSize
 */
async function* makeBlobIterator(blob, options) {
    const chunkSize = options?.chunkSize || DEFAULT_CHUNK_SIZE;
    let offset = 0;
    while (offset < blob.size) {
        const end = offset + chunkSize;
        const chunk = await blob.slice(offset, end).arrayBuffer();
        offset = end;
        yield chunk;
    }
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-iterator.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-iterator.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeIterator: () => (/* binding */ makeIterator)
/* harmony export */ });
/* harmony import */ var _make_string_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./make-string-iterator.js */ "./node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-string-iterator.js");
/* harmony import */ var _make_array_buffer_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./make-array-buffer-iterator.js */ "./node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-array-buffer-iterator.js");
/* harmony import */ var _make_blob_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./make-blob-iterator.js */ "./node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-blob-iterator.js");
/* harmony import */ var _make_stream_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./make-stream-iterator.js */ "./node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-stream-iterator.js");
/* harmony import */ var _javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../javascript-utils/is-type.js */ "./node_modules/@loaders.gl/core/dist/javascript-utils/is-type.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors





/**
 * Returns an iterator that breaks its input into chunks and yields them one-by-one.
 * @param data
 * @param options
 * @returns
 * This function can e.g. be used to enable data sources that can only be read atomically
 * (such as `Blob` and `File` via `FileReader`) to still be parsed in batches.
 */
function makeIterator(data, options) {
    if (typeof data === 'string') {
        // Note: Converts string chunks to binary
        return (0,_make_string_iterator_js__WEBPACK_IMPORTED_MODULE_0__.makeStringIterator)(data, options);
    }
    if (data instanceof ArrayBuffer) {
        return (0,_make_array_buffer_iterator_js__WEBPACK_IMPORTED_MODULE_1__.makeArrayBufferIterator)(data, options);
    }
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_2__.isBlob)(data)) {
        return (0,_make_blob_iterator_js__WEBPACK_IMPORTED_MODULE_3__.makeBlobIterator)(data, options);
    }
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_2__.isReadableStream)(data)) {
        return (0,_make_stream_iterator_js__WEBPACK_IMPORTED_MODULE_4__.makeStreamIterator)(data, options);
    }
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_2__.isResponse)(data)) {
        const response = data;
        return (0,_make_stream_iterator_js__WEBPACK_IMPORTED_MODULE_4__.makeStreamIterator)(response.body, options);
    }
    throw new Error('makeIterator');
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-stream-iterator.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-stream-iterator.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeStreamIterator: () => (/* binding */ makeStreamIterator)
/* harmony export */ });
/* harmony import */ var _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @loaders.gl/loader-utils */ "./node_modules/@loaders.gl/loader-utils/dist/lib/env-utils/globals.js");
/* harmony import */ var _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @loaders.gl/loader-utils */ "./node_modules/@loaders.gl/loader-utils/dist/lib/binary-utils/memory-conversion-utils.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

/**
 * Returns an async iterable that reads from a stream (works in both Node.js and browsers)
 * @param stream stream to iterator over
 */
function makeStreamIterator(stream, options) {
    return _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_0__.isBrowser
        ? makeBrowserStreamIterator(stream, options)
        : makeNodeStreamIterator(stream, options);
}
/**
 * Returns an async iterable that reads from a DOM (browser) stream
 * @param stream stream to iterate from
 * @see https://jakearchibald.com/2017/async-iterators-and-generators/#making-streams-iterate
 */
async function* makeBrowserStreamIterator(stream, options) {
    // WhatWG: stream is supposed to have a `getIterator` method
    // if (typeof stream.getIterator === 'function') {
    //   return stream.getIterator();
    // }
    // if (typeof stream[Symbol.asyncIterator] === 'function') {
    //   return makeToArrayBufferIterator(stream);
    // }
    // In the browser, we first need to get a lock on the stream
    const reader = stream.getReader();
    let nextBatchPromise;
    try {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const currentBatchPromise = nextBatchPromise || reader.read();
            // Issue a read for an additional batch, while we await the next batch
            // Idea is to make fetching happen in parallel with processing / parsing
            if (options?._streamReadAhead) {
                nextBatchPromise = reader.read();
            }
            // Read from the stream
            // value is a Uint8Array
            const { done, value } = await currentBatchPromise;
            // Exit if we're done
            if (done) {
                return;
            }
            // Else yield the chunk
            yield (0,_loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_1__.toArrayBuffer)(value);
        }
    }
    catch (error) {
        // TODO - examples makes it look like this should always be called,
        // but that generates exceptions so only call it if we do not reach the end
        reader.releaseLock();
    }
}
/**
 * Returns an async iterable that reads from a DOM (browser) stream
 * @param stream stream to iterate from
 * @note Requires Node.js >= 10
 */
async function* makeNodeStreamIterator(stream, options) {
    // Hacky test for node version to ensure we don't call bad polyfills
    // NODE 10+: stream is an asyncIterator
    for await (const chunk of stream) {
        yield (0,_loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_1__.toArrayBuffer)(chunk); // Coerce each chunk to ArrayBuffer
    }
}
/* TODO - remove NODE < 10
 * @see https://github.com/bustle/streaming-iterables, MIT license
 *
  if (typeof stream[Symbol.asyncIterator] === 'function') {
    return;
  }

  // TODO - check if is this ever used in Node 10+?
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const data = stream.read();
    if (data !== null) {
      yield toArrayBuffer(data);
      // eslint-disable-next-line no-continue
      continue;
    }
    if (stream._readableState?.ended) {
      return;
    }
    await onceReadable(stream);
  }

async function onceReadable(stream: Readable): Promise<any> {
  return new Promise((resolve) => {
    stream.once('readable', resolve);
  });
}
  */


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-string-iterator.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-string-iterator.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeStringIterator: () => (/* binding */ makeStringIterator)
/* harmony export */ });
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
const DEFAULT_CHUNK_SIZE = 256 * 1024;
/**
 * Returns an iterator that breaks a big string into chunks and yields them one-by-one as ArrayBuffers
 * @param blob string to iterate over
 * @param options
 * @param options.chunkSize
 */
function* makeStringIterator(string, options) {
    const chunkSize = options?.chunkSize || DEFAULT_CHUNK_SIZE;
    let offset = 0;
    const textEncoder = new TextEncoder();
    while (offset < string.length) {
        // Create a chunk of the right size
        const chunkLength = Math.min(string.length - offset, chunkSize);
        const chunk = string.slice(offset, offset + chunkLength);
        offset += chunkLength;
        // yield an ArrayBuffer chunk
        yield textEncoder.encode(chunk);
    }
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/javascript-utils/is-type.js":
/*!************************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/javascript-utils/is-type.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAsyncIterable: () => (/* binding */ isAsyncIterable),
/* harmony export */   isBlob: () => (/* binding */ isBlob),
/* harmony export */   isBuffer: () => (/* binding */ isBuffer),
/* harmony export */   isFile: () => (/* binding */ isFile),
/* harmony export */   isIterable: () => (/* binding */ isIterable),
/* harmony export */   isIterator: () => (/* binding */ isIterator),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isPromise: () => (/* binding */ isPromise),
/* harmony export */   isPureObject: () => (/* binding */ isPureObject),
/* harmony export */   isReadableDOMStream: () => (/* binding */ isReadableDOMStream),
/* harmony export */   isReadableNodeStream: () => (/* binding */ isReadableNodeStream),
/* harmony export */   isReadableStream: () => (/* binding */ isReadableStream),
/* harmony export */   isResponse: () => (/* binding */ isResponse),
/* harmony export */   isWritableDOMStream: () => (/* binding */ isWritableDOMStream),
/* harmony export */   isWritableNodeStream: () => (/* binding */ isWritableNodeStream),
/* harmony export */   isWritableStream: () => (/* binding */ isWritableStream)
/* harmony export */ });
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
const isBoolean = (x) => typeof x === 'boolean';
const isFunction = (x) => typeof x === 'function';
const isObject = (x) => x !== null && typeof x === 'object';
const isPureObject = (x) => isObject(x) && x.constructor === {}.constructor;
const isPromise = (x) => isObject(x) && isFunction(x.then);
const isIterable = (x) => Boolean(x) && typeof x[Symbol.iterator] === 'function';
const isAsyncIterable = (x) => x && typeof x[Symbol.asyncIterator] === 'function';
const isIterator = (x) => x && isFunction(x.next);
const isResponse = (x) => (typeof Response !== 'undefined' && x instanceof Response) ||
    (x && x.arrayBuffer && x.text && x.json);
const isFile = (x) => typeof File !== 'undefined' && x instanceof File;
const isBlob = (x) => typeof Blob !== 'undefined' && x instanceof Blob;
/** Check for Node.js `Buffer` without triggering bundler to include buffer polyfill */
const isBuffer = (x) => x && typeof x === 'object' && x.isBuffer;
const isWritableDOMStream = (x) => isObject(x) && isFunction(x.abort) && isFunction(x.getWriter);
const isReadableDOMStream = (x) => (typeof ReadableStream !== 'undefined' && x instanceof ReadableStream) ||
    (isObject(x) && isFunction(x.tee) && isFunction(x.cancel) && isFunction(x.getReader));
// Not implemented in Firefox: && isFunction(x.pipeTo)
const isWritableNodeStream = (x) => isObject(x) && isFunction(x.end) && isFunction(x.write) && isBoolean(x.writable);
const isReadableNodeStream = (x) => isObject(x) && isFunction(x.read) && isFunction(x.pipe) && isBoolean(x.readable);
const isReadableStream = (x) => isReadableDOMStream(x) || isReadableNodeStream(x);
const isWritableStream = (x) => isWritableDOMStream(x) || isWritableNodeStream(x);


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/lib/api/parse.js":
/*!*************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/lib/api/parse.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parse: () => (/* binding */ parse)
/* harmony export */ });
/* harmony import */ var _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @loaders.gl/loader-utils */ "./node_modules/@loaders.gl/loader-utils/dist/lib/option-utils/merge-loader-options.js");
/* harmony import */ var _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @loaders.gl/loader-utils */ "./node_modules/@loaders.gl/loader-utils/dist/lib/worker-loader-utils/parse-with-worker.js");
/* harmony import */ var _loaders_gl_worker_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @loaders.gl/worker-utils */ "./node_modules/@loaders.gl/worker-utils/dist/lib/worker-api/validate-worker-version.js");
/* harmony import */ var _loaders_gl_worker_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @loaders.gl/worker-utils */ "./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/assert.js");
/* harmony import */ var _loader_utils_normalize_loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../loader-utils/normalize-loader.js */ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/normalize-loader.js");
/* harmony import */ var _javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../javascript-utils/is-type.js */ "./node_modules/@loaders.gl/core/dist/javascript-utils/is-type.js");
/* harmony import */ var _loader_utils_option_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../loader-utils/option-utils.js */ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/option-utils.js");
/* harmony import */ var _loader_utils_get_data_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../loader-utils/get-data.js */ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/get-data.js");
/* harmony import */ var _loader_utils_loader_context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../loader-utils/loader-context.js */ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/loader-context.js");
/* harmony import */ var _utils_resource_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/resource-utils.js */ "./node_modules/@loaders.gl/core/dist/lib/utils/resource-utils.js");
/* harmony import */ var _select_loader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./select-loader.js */ "./node_modules/@loaders.gl/core/dist/lib/api/select-loader.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors









/**
 * Parses `data` using a specified loader
 * @param data
 * @param loaders
 * @param options
 * @param context
 */
// implementation signature
async function parse(data, loaders, options, context) {
    // Signature: parse(data, options, context | url)
    // Uses registered loaders
    if (loaders && !Array.isArray(loaders) && !(0,_loader_utils_normalize_loader_js__WEBPACK_IMPORTED_MODULE_0__.isLoaderObject)(loaders)) {
        context = undefined; // context not supported in short signature
        options = loaders;
        loaders = undefined;
    }
    data = await data; // Resolve any promise
    options = options || {}; // Could be invalid...
    // Extract a url for auto detection
    const url = (0,_utils_resource_utils_js__WEBPACK_IMPORTED_MODULE_1__.getResourceUrl)(data);
    // Chooses a loader (and normalizes it)
    // Also use any loaders in the context, new loaders take priority
    const typedLoaders = loaders;
    const candidateLoaders = (0,_loader_utils_loader_context_js__WEBPACK_IMPORTED_MODULE_2__.getLoadersFromContext)(typedLoaders, context);
    // todo hacky type cast
    const loader = await (0,_select_loader_js__WEBPACK_IMPORTED_MODULE_3__.selectLoader)(data, candidateLoaders, options);
    // Note: if no loader was found, if so just return null
    if (!loader) {
        return null;
    }
    // Normalize options
    // @ts-expect-error
    options = (0,_loader_utils_option_utils_js__WEBPACK_IMPORTED_MODULE_4__.normalizeOptions)(options, loader, candidateLoaders, url); // Could be invalid...
    // Get a context (if already present, will be unchanged)
    context = (0,_loader_utils_loader_context_js__WEBPACK_IMPORTED_MODULE_2__.getLoaderContext)(
    // @ts-expect-error
    { url, _parse: parse, loaders: candidateLoaders }, options, context || null);
    return await parseWithLoader(loader, data, options, context);
}
// TODO: support progress and abort
// TODO - should accept loader.parseAsyncIterator and concatenate.
async function parseWithLoader(loader, data, options, context) {
    (0,_loaders_gl_worker_utils__WEBPACK_IMPORTED_MODULE_5__.validateWorkerVersion)(loader);
    options = (0,_loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_6__.mergeLoaderOptions)(loader.options, options);
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_7__.isResponse)(data)) {
        // Serialize to support passing the response to web worker
        const response = data;
        const { ok, redirected, status, statusText, type, url } = response;
        const headers = Object.fromEntries(response.headers.entries());
        // @ts-expect-error TODO - fix this
        context.response = { headers, ok, redirected, status, statusText, type, url };
    }
    data = await (0,_loader_utils_get_data_js__WEBPACK_IMPORTED_MODULE_8__.getArrayBufferOrStringFromData)(data, loader, options);
    const loaderWithParser = loader;
    // First check for synchronous text parser, wrap results in promises
    if (loaderWithParser.parseTextSync && typeof data === 'string') {
        return loaderWithParser.parseTextSync(data, options, context);
    }
    // If we have a workerUrl and the loader can parse the given options efficiently in a worker
    if ((0,_loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_9__.canParseWithWorker)(loader, options)) {
        return await (0,_loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_9__.parseWithWorker)(loader, data, options, context, parse);
    }
    // Check for asynchronous parser
    if (loaderWithParser.parseText && typeof data === 'string') {
        return await loaderWithParser.parseText(data, options, context);
    }
    if (loaderWithParser.parse) {
        return await loaderWithParser.parse(data, options, context);
    }
    // This should not happen, all sync loaders should also offer `parse` function
    (0,_loaders_gl_worker_utils__WEBPACK_IMPORTED_MODULE_10__.assert)(!loaderWithParser.parseSync);
    // TBD - If asynchronous parser not available, return null
    throw new Error(`${loader.id} loader - no parser found and worker is disabled`);
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/lib/api/register-loaders.js":
/*!************************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/lib/api/register-loaders.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _unregisterLoaders: () => (/* binding */ _unregisterLoaders),
/* harmony export */   getRegisteredLoaders: () => (/* binding */ getRegisteredLoaders),
/* harmony export */   registerLoaders: () => (/* binding */ registerLoaders)
/* harmony export */ });
/* harmony import */ var _loader_utils_normalize_loader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../loader-utils/normalize-loader.js */ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/normalize-loader.js");
/* harmony import */ var _loader_utils_option_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../loader-utils/option-utils.js */ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/option-utils.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors


/**
 * Store global registered loaders on the global object to increase chances of cross loaders-version interoperability
 * This use case is not reliable but can help when testing new versions of loaders.gl with existing frameworks
 */
const getGlobalLoaderRegistry = () => {
    const state = (0,_loader_utils_option_utils_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalLoaderState)();
    state.loaderRegistry = state.loaderRegistry || [];
    return state.loaderRegistry;
};
/**
 * Register a list of global loaders
 * @note Registration erases loader type information.
 * @deprecated It is recommended that applications manage loader registration. This function will likely be remove in loaders.gl v5
 */
function registerLoaders(loaders) {
    const loaderRegistry = getGlobalLoaderRegistry();
    loaders = Array.isArray(loaders) ? loaders : [loaders];
    for (const loader of loaders) {
        const normalizedLoader = (0,_loader_utils_normalize_loader_js__WEBPACK_IMPORTED_MODULE_1__.normalizeLoader)(loader);
        if (!loaderRegistry.find((registeredLoader) => normalizedLoader === registeredLoader)) {
            // add to the beginning of the loaderRegistry, so the last registeredLoader get picked
            loaderRegistry.unshift(normalizedLoader);
        }
    }
}
/**
 * @deprecated It is recommended that applications manage loader registration. This function will likely be remove in loaders.gl v5
 */
function getRegisteredLoaders() {
    return getGlobalLoaderRegistry();
}
/** @deprecated For testing only  */
function _unregisterLoaders() {
    const state = (0,_loader_utils_option_utils_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalLoaderState)();
    state.loaderRegistry = [];
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/lib/api/select-loader.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/lib/api/select-loader.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   selectLoader: () => (/* binding */ selectLoader),
/* harmony export */   selectLoaderSync: () => (/* binding */ selectLoaderSync)
/* harmony export */ });
/* harmony import */ var _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @loaders.gl/loader-utils */ "./node_modules/@loaders.gl/loader-utils/dist/lib/log-utils/log.js");
/* harmony import */ var _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @loaders.gl/loader-utils */ "./node_modules/@loaders.gl/loader-utils/dist/lib/path-utils/path.js");
/* harmony import */ var _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @loaders.gl/loader-utils */ "./node_modules/@loaders.gl/loader-utils/dist/lib/binary-utils/array-buffer-utils.js");
/* harmony import */ var _loader_utils_normalize_loader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../loader-utils/normalize-loader.js */ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/normalize-loader.js");
/* harmony import */ var _utils_resource_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/resource-utils.js */ "./node_modules/@loaders.gl/core/dist/lib/utils/resource-utils.js");
/* harmony import */ var _utils_mime_type_utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/mime-type-utils.js */ "./node_modules/@loaders.gl/core/dist/lib/utils/mime-type-utils.js");
/* harmony import */ var _register_loaders_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./register-loaders.js */ "./node_modules/@loaders.gl/core/dist/lib/api/register-loaders.js");
/* harmony import */ var _javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../javascript-utils/is-type.js */ "./node_modules/@loaders.gl/core/dist/javascript-utils/is-type.js");
/* harmony import */ var _utils_url_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/url-utils.js */ "./node_modules/@loaders.gl/core/dist/lib/utils/url-utils.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors







const EXT_PATTERN = /\.([^.]+)$/;
// TODO - Need a variant that peeks at streams for parseInBatches
// TODO - Detect multiple matching loaders? Use heuristics to grade matches?
// TODO - Allow apps to pass context to disambiguate between multiple matches (e.g. multiple .json formats)?
/**
 * Find a loader that matches file extension and/or initial file content
 * Search the loaders array argument for a loader that matches url extension or initial data
 * Returns: a normalized loader
 * @param data data to assist
 * @param loaders
 * @param options
 * @param context used internally, applications should not provide this parameter
 */
async function selectLoader(data, loaders = [], options, context) {
    if (!validHTTPResponse(data)) {
        return null;
    }
    // First make a sync attempt, disabling exceptions
    let loader = selectLoaderSync(data, loaders, { ...options, nothrow: true }, context);
    if (loader) {
        return loader;
    }
    // For Blobs and Files, try to asynchronously read a small initial slice and test again with that
    // to see if we can detect by initial content
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isBlob)(data)) {
        data = await data.slice(0, 10).arrayBuffer();
        loader = selectLoaderSync(data, loaders, options, context);
    }
    // no loader available
    if (!loader && !options?.nothrow) {
        throw new Error(getNoValidLoaderMessage(data));
    }
    return loader;
}
/**
 * Find a loader that matches file extension and/or initial file content
 * Search the loaders array argument for a loader that matches url extension or initial data
 * Returns: a normalized loader
 * @param data data to assist
 * @param loaders
 * @param options
 * @param context used internally, applications should not provide this parameter
 */
function selectLoaderSync(data, loaders = [], options, context) {
    if (!validHTTPResponse(data)) {
        return null;
    }
    // eslint-disable-next-line complexity
    // if only a single loader was provided (not as array), force its use
    // TODO - Should this behavior be kept and documented?
    if (loaders && !Array.isArray(loaders)) {
        // TODO - remove support for legacy loaders
        return (0,_loader_utils_normalize_loader_js__WEBPACK_IMPORTED_MODULE_1__.normalizeLoader)(loaders);
    }
    // Build list of candidate loaders that will be searched in order for a match
    let candidateLoaders = [];
    // First search supplied loaders
    if (loaders) {
        candidateLoaders = candidateLoaders.concat(loaders);
    }
    // Then fall back to registered loaders
    if (!options?.ignoreRegisteredLoaders) {
        candidateLoaders.push(...(0,_register_loaders_js__WEBPACK_IMPORTED_MODULE_2__.getRegisteredLoaders)());
    }
    // TODO - remove support for legacy loaders
    normalizeLoaders(candidateLoaders);
    const loader = selectLoaderInternal(data, candidateLoaders, options, context);
    // no loader available
    if (!loader && !options?.nothrow) {
        throw new Error(getNoValidLoaderMessage(data));
    }
    return loader;
}
/** Implements loaders selection logic */
// eslint-disable-next-line complexity
function selectLoaderInternal(data, loaders, options, context) {
    const url = (0,_utils_resource_utils_js__WEBPACK_IMPORTED_MODULE_3__.getResourceUrl)(data);
    const type = (0,_utils_resource_utils_js__WEBPACK_IMPORTED_MODULE_3__.getResourceMIMEType)(data);
    const testUrl = (0,_utils_url_utils_js__WEBPACK_IMPORTED_MODULE_4__.stripQueryString)(url) || context?.url;
    let loader = null;
    let reason = '';
    // if options.mimeType is supplied, it takes precedence
    if (options?.mimeType) {
        loader = findLoaderByMIMEType(loaders, options?.mimeType);
        reason = `match forced by supplied MIME type ${options?.mimeType}`;
    }
    // Look up loader by url
    loader = loader || findLoaderByUrl(loaders, testUrl);
    reason = reason || (loader ? `matched url ${testUrl}` : '');
    // Look up loader by mime type
    loader = loader || findLoaderByMIMEType(loaders, type);
    reason = reason || (loader ? `matched MIME type ${type}` : '');
    // Look for loader via initial bytes (Note: not always accessible (e.g. Response, stream, async iterator)
    // @ts-ignore Blob | Response
    loader = loader || findLoaderByInitialBytes(loaders, data);
    // @ts-ignore Blob | Response
    reason = reason || (loader ? `matched initial data ${getFirstCharacters(data)}` : '');
    // Look up loader by fallback mime type
    if (options?.fallbackMimeType) {
        loader = loader || findLoaderByMIMEType(loaders, options?.fallbackMimeType);
        reason = reason || (loader ? `matched fallback MIME type ${type}` : '');
    }
    if (reason) {
        _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_5__.log.log(1, `selectLoader selected ${loader?.name}: ${reason}.`);
    }
    return loader;
}
/** Check HTTP Response */
function validHTTPResponse(data) {
    // HANDLE HTTP status
    if (data instanceof Response) {
        // 204 - NO CONTENT. This handles cases where e.g. a tile server responds with 204 for a missing tile
        if (data.status === 204) {
            return false;
        }
    }
    return true;
}
/** Generate a helpful message to help explain why loader selection failed. */
function getNoValidLoaderMessage(data) {
    const url = (0,_utils_resource_utils_js__WEBPACK_IMPORTED_MODULE_3__.getResourceUrl)(data);
    const type = (0,_utils_resource_utils_js__WEBPACK_IMPORTED_MODULE_3__.getResourceMIMEType)(data);
    let message = 'No valid loader found (';
    message += url ? `${_loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_6__.filename(url)}, ` : 'no url provided, ';
    message += `MIME type: ${type ? `"${type}"` : 'not provided'}, `;
    // First characters are only accessible when called on data (string or arrayBuffer).
    // @ts-ignore Blob | Response
    const firstCharacters = data ? getFirstCharacters(data) : '';
    message += firstCharacters ? ` first bytes: "${firstCharacters}"` : 'first bytes: not available';
    message += ')';
    return message;
}
function normalizeLoaders(loaders) {
    for (const loader of loaders) {
        (0,_loader_utils_normalize_loader_js__WEBPACK_IMPORTED_MODULE_1__.normalizeLoader)(loader);
    }
}
// TODO - Would be nice to support http://example.com/file.glb?parameter=1
// E.g: x = new URL('http://example.com/file.glb?load=1'; x.pathname
function findLoaderByUrl(loaders, url) {
    // Get extension
    const match = url && EXT_PATTERN.exec(url);
    const extension = match && match[1];
    return extension ? findLoaderByExtension(loaders, extension) : null;
}
function findLoaderByExtension(loaders, extension) {
    extension = extension.toLowerCase();
    for (const loader of loaders) {
        for (const loaderExtension of loader.extensions) {
            if (loaderExtension.toLowerCase() === extension) {
                return loader;
            }
        }
    }
    return null;
}
function findLoaderByMIMEType(loaders, mimeType) {
    for (const loader of loaders) {
        if (loader.mimeTypes?.some((mimeType1) => (0,_utils_mime_type_utils_js__WEBPACK_IMPORTED_MODULE_7__.compareMIMETypes)(mimeType, mimeType1))) {
            return loader;
        }
        // Support referring to loaders using the "unregistered tree"
        // https://en.wikipedia.org/wiki/Media_type#Unregistered_tree
        if ((0,_utils_mime_type_utils_js__WEBPACK_IMPORTED_MODULE_7__.compareMIMETypes)(mimeType, `application/x.${loader.id}`)) {
            return loader;
        }
    }
    return null;
}
function findLoaderByInitialBytes(loaders, data) {
    if (!data) {
        return null;
    }
    for (const loader of loaders) {
        if (typeof data === 'string') {
            if (testDataAgainstText(data, loader)) {
                return loader;
            }
        }
        else if (ArrayBuffer.isView(data)) {
            // Typed Arrays can have offsets into underlying buffer
            if (testDataAgainstBinary(data.buffer, data.byteOffset, loader)) {
                return loader;
            }
        }
        else if (data instanceof ArrayBuffer) {
            const byteOffset = 0;
            if (testDataAgainstBinary(data, byteOffset, loader)) {
                return loader;
            }
        }
        // TODO Handle streaming case (requires creating a new AsyncIterator)
    }
    return null;
}
function testDataAgainstText(data, loader) {
    if (loader.testText) {
        return loader.testText(data);
    }
    const tests = Array.isArray(loader.tests) ? loader.tests : [loader.tests];
    return tests.some((test) => data.startsWith(test));
}
function testDataAgainstBinary(data, byteOffset, loader) {
    const tests = Array.isArray(loader.tests) ? loader.tests : [loader.tests];
    return tests.some((test) => testBinary(data, byteOffset, loader, test));
}
function testBinary(data, byteOffset, loader, test) {
    if (test instanceof ArrayBuffer) {
        return (0,_loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_8__.compareArrayBuffers)(test, data, test.byteLength);
    }
    switch (typeof test) {
        case 'function':
            return test(data);
        case 'string':
            // Magic bytes check: If `test` is a string, check if binary data starts with that strings
            const magic = getMagicString(data, byteOffset, test.length);
            return test === magic;
        default:
            return false;
    }
}
function getFirstCharacters(data, length = 5) {
    if (typeof data === 'string') {
        return data.slice(0, length);
    }
    else if (ArrayBuffer.isView(data)) {
        // Typed Arrays can have offsets into underlying buffer
        return getMagicString(data.buffer, data.byteOffset, length);
    }
    else if (data instanceof ArrayBuffer) {
        const byteOffset = 0;
        return getMagicString(data, byteOffset, length);
    }
    return '';
}
function getMagicString(arrayBuffer, byteOffset, length) {
    if (arrayBuffer.byteLength < byteOffset + length) {
        return '';
    }
    const dataView = new DataView(arrayBuffer);
    let magic = '';
    for (let i = 0; i < length; i++) {
        magic += String.fromCharCode(dataView.getUint8(byteOffset + i));
    }
    return magic;
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/lib/fetch/fetch-error.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/lib/fetch/fetch-error.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FetchError: () => (/* binding */ FetchError)
/* harmony export */ });
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
class FetchError extends Error {
    constructor(message, info) {
        super(message);
        this.reason = info.reason;
        this.url = info.url;
        this.response = info.response;
    }
    /** A best effort reason for why the fetch failed */
    reason;
    /** The URL that failed to load. Empty string if not available. */
    url;
    /** The Response object, if any. */
    response;
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/lib/fetch/fetch-file.js":
/*!********************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/lib/fetch/fetch-file.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchFile: () => (/* binding */ fetchFile),
/* harmony export */   isDataURL: () => (/* binding */ isDataURL),
/* harmony export */   isNodePath: () => (/* binding */ isNodePath),
/* harmony export */   isRequestURL: () => (/* binding */ isRequestURL)
/* harmony export */ });
/* harmony import */ var _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @loaders.gl/loader-utils */ "./node_modules/@loaders.gl/loader-utils/dist/lib/path-utils/file-aliases.js");
/* harmony import */ var _utils_response_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/response-utils.js */ "./node_modules/@loaders.gl/core/dist/lib/utils/response-utils.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors


// import {FetchError} from './fetch-error';
function isNodePath(url) {
    return !isRequestURL(url) && !isDataURL(url);
}
function isRequestURL(url) {
    return url.startsWith('http:') || url.startsWith('https:');
}
function isDataURL(url) {
    return url.startsWith('data:');
}
/**
 * fetch API compatible function
 * - Supports fetching from Node.js local file system paths
 * - Respects pathPrefix and file aliases
 */
async function fetchFile(urlOrData, fetchOptions) {
    if (typeof urlOrData === 'string') {
        const url = (0,_loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_0__.resolvePath)(urlOrData);
        // Support fetching from local file system
        if (isNodePath(url)) {
            if (globalThis.loaders?.fetchNode) {
                return globalThis.loaders?.fetchNode(url, fetchOptions);
            }
            // throw new Error(
            //   'fetchFile: globalThis.loaders.fetchNode not defined. Install @loaders.gl/polyfills'
            // );
        }
        // Call global fetch
        return await fetch(url, fetchOptions);
    }
    // TODO - should we still call fetch on non-URL inputs?
    return await (0,_utils_response_utils_js__WEBPACK_IMPORTED_MODULE_1__.makeResponse)(urlOrData);
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/get-data.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/lib/loader-utils/get-data.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getArrayBufferOrStringFromData: () => (/* binding */ getArrayBufferOrStringFromData),
/* harmony export */   getArrayBufferOrStringFromDataSync: () => (/* binding */ getArrayBufferOrStringFromDataSync),
/* harmony export */   getAsyncIterableFromData: () => (/* binding */ getAsyncIterableFromData),
/* harmony export */   getReadableStream: () => (/* binding */ getReadableStream)
/* harmony export */ });
/* harmony import */ var _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @loaders.gl/loader-utils */ "./node_modules/@loaders.gl/loader-utils/dist/lib/iterators/async-iteration.js");
/* harmony import */ var _javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../javascript-utils/is-type.js */ "./node_modules/@loaders.gl/core/dist/javascript-utils/is-type.js");
/* harmony import */ var _iterators_make_iterator_make_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../iterators/make-iterator/make-iterator.js */ "./node_modules/@loaders.gl/core/dist/iterators/make-iterator/make-iterator.js");
/* harmony import */ var _utils_response_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/response-utils.js */ "./node_modules/@loaders.gl/core/dist/lib/utils/response-utils.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors




const ERR_DATA = 'Cannot convert supplied data type';
// eslint-disable-next-line complexity
function getArrayBufferOrStringFromDataSync(data, loader, options) {
    if (loader.text && typeof data === 'string') {
        return data;
    }
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isBuffer)(data)) {
        // @ts-ignore
        data = data.buffer;
    }
    if (data instanceof ArrayBuffer) {
        const arrayBuffer = data;
        if (loader.text && !loader.binary) {
            const textDecoder = new TextDecoder('utf8');
            return textDecoder.decode(arrayBuffer);
        }
        return arrayBuffer;
    }
    // We may need to handle offsets
    if (ArrayBuffer.isView(data)) {
        // TextDecoder is invoked on typed arrays and will handle offsets
        if (loader.text && !loader.binary) {
            const textDecoder = new TextDecoder('utf8');
            return textDecoder.decode(data);
        }
        let arrayBuffer = data.buffer;
        // Since we are returning the underlying arrayBuffer, we must create a new copy
        // if this typed array / Buffer is a partial view into the ArryayBuffer
        // TODO - this is a potentially unnecessary copy
        const byteLength = data.byteLength || data.length;
        if (data.byteOffset !== 0 || byteLength !== arrayBuffer.byteLength) {
            // console.warn(`loaders.gl copying arraybuffer of length ${byteLength}`);
            arrayBuffer = arrayBuffer.slice(data.byteOffset, data.byteOffset + byteLength);
        }
        return arrayBuffer;
    }
    throw new Error(ERR_DATA);
}
// Convert async iterator to a promise
async function getArrayBufferOrStringFromData(data, loader, options) {
    const isArrayBuffer = data instanceof ArrayBuffer || ArrayBuffer.isView(data);
    if (typeof data === 'string' || isArrayBuffer) {
        return getArrayBufferOrStringFromDataSync(data, loader, options);
    }
    // Blobs and files are FileReader compatible
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isBlob)(data)) {
        data = await (0,_utils_response_utils_js__WEBPACK_IMPORTED_MODULE_1__.makeResponse)(data);
    }
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isResponse)(data)) {
        const response = data;
        await (0,_utils_response_utils_js__WEBPACK_IMPORTED_MODULE_1__.checkResponse)(response);
        return loader.binary ? await response.arrayBuffer() : await response.text();
    }
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isReadableStream)(data)) {
        // @ts-expect-error TS2559 options type
        data = (0,_iterators_make_iterator_make_iterator_js__WEBPACK_IMPORTED_MODULE_2__.makeIterator)(data, options);
    }
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isIterable)(data) || (0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isAsyncIterable)(data)) {
        // Assume arrayBuffer iterator - attempt to concatenate
        return (0,_loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_3__.concatenateArrayBuffersAsync)(data);
    }
    throw new Error(ERR_DATA);
}
async function getAsyncIterableFromData(data, options) {
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isIterator)(data)) {
        return data;
    }
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isResponse)(data)) {
        const response = data;
        // Note Since this function is not async, we currently can't load error message, just status
        await (0,_utils_response_utils_js__WEBPACK_IMPORTED_MODULE_1__.checkResponse)(response);
        // TODO - bug in polyfill, body can be a Promise under Node.js
        // eslint-disable-next-line @typescript-eslint/await-thenable
        const body = await response.body;
        // TODO - body can be null?
        return (0,_iterators_make_iterator_make_iterator_js__WEBPACK_IMPORTED_MODULE_2__.makeIterator)(body, options);
    }
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isBlob)(data) || (0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isReadableStream)(data)) {
        return (0,_iterators_make_iterator_make_iterator_js__WEBPACK_IMPORTED_MODULE_2__.makeIterator)(data, options);
    }
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isAsyncIterable)(data)) {
        return data;
    }
    return getIterableFromData(data);
}
async function getReadableStream(data) {
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isReadableStream)(data)) {
        return data;
    }
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isResponse)(data)) {
        // @ts-ignore
        return data.body;
    }
    const response = await (0,_utils_response_utils_js__WEBPACK_IMPORTED_MODULE_1__.makeResponse)(data);
    // @ts-ignore
    return response.body;
}
// HELPERS
function getIterableFromData(data) {
    // generate an iterator that emits a single chunk
    if (ArrayBuffer.isView(data)) {
        return (function* oneChunk() {
            yield data.buffer;
        })();
    }
    if (data instanceof ArrayBuffer) {
        return (function* oneChunk() {
            yield data;
        })();
    }
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isIterator)(data)) {
        return data;
    }
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isIterable)(data)) {
        return data[Symbol.iterator]();
    }
    throw new Error(ERR_DATA);
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/get-fetch-function.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/lib/loader-utils/get-fetch-function.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFetchFunction: () => (/* binding */ getFetchFunction)
/* harmony export */ });
/* harmony import */ var _javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../javascript-utils/is-type.js */ "./node_modules/@loaders.gl/core/dist/javascript-utils/is-type.js");
/* harmony import */ var _fetch_fetch_file_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../fetch/fetch-file.js */ "./node_modules/@loaders.gl/core/dist/lib/fetch/fetch-file.js");
/* harmony import */ var _option_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./option-utils.js */ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/option-utils.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors



/**
 * Gets the current fetch function from options and context
 * @param options
 * @param context
 */
function getFetchFunction(options, context) {
    const globalOptions = (0,_option_utils_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalLoaderOptions)();
    const loaderOptions = options || globalOptions;
    // options.fetch can be a function
    if (typeof loaderOptions.fetch === 'function') {
        return loaderOptions.fetch;
    }
    // options.fetch can be an options object
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_1__.isObject)(loaderOptions.fetch)) {
        return (url) => (0,_fetch_fetch_file_js__WEBPACK_IMPORTED_MODULE_2__.fetchFile)(url, loaderOptions.fetch);
    }
    // else refer to context (from parent loader) if available
    if (context?.fetch) {
        return context?.fetch;
    }
    // else return the default fetch function
    return _fetch_fetch_file_js__WEBPACK_IMPORTED_MODULE_2__.fetchFile;
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/loader-context.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/lib/loader-utils/loader-context.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLoaderContext: () => (/* binding */ getLoaderContext),
/* harmony export */   getLoadersFromContext: () => (/* binding */ getLoadersFromContext)
/* harmony export */ });
/* harmony import */ var _get_fetch_function_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-fetch-function.js */ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/get-fetch-function.js");
/* harmony import */ var _utils_url_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/url-utils.js */ "./node_modules/@loaders.gl/core/dist/lib/utils/url-utils.js");
/* harmony import */ var _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @loaders.gl/loader-utils */ "./node_modules/@loaders.gl/loader-utils/dist/lib/path-utils/path.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors



/**
 * "sub" loaders invoked by other loaders get a "context" injected on `this`
 * The context will inject core methods like `parse` and contain information
 * about loaders and options passed in to the top-level `parse` call.
 *
 * @param context
 * @param options
 * @param previousContext
 */
function getLoaderContext(context, options, parentContext) {
    // For recursive calls, we already have a context
    // TODO - add any additional loaders to context?
    if (parentContext) {
        return parentContext;
    }
    const newContext = {
        fetch: (0,_get_fetch_function_js__WEBPACK_IMPORTED_MODULE_0__.getFetchFunction)(options, context),
        ...context
    };
    // Parse URLs so that subloaders can easily generate correct strings
    if (newContext.url) {
        const baseUrl = (0,_utils_url_utils_js__WEBPACK_IMPORTED_MODULE_1__.stripQueryString)(newContext.url);
        newContext.baseUrl = baseUrl;
        newContext.queryString = (0,_utils_url_utils_js__WEBPACK_IMPORTED_MODULE_1__.extractQueryString)(newContext.url);
        newContext.filename = _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_2__.filename(baseUrl);
        newContext.baseUrl = _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_2__.dirname(baseUrl);
    }
    // Recursive loading does not use single loader
    if (!Array.isArray(newContext.loaders)) {
        newContext.loaders = null;
    }
    return newContext;
}
// eslint-disable-next-line complexity
function getLoadersFromContext(loaders, context) {
    // A single loader (non-array) indicates no selection desired. Force select.
    if (loaders && !Array.isArray(loaders)) {
        return loaders;
    }
    // Create a merged list
    let candidateLoaders;
    if (loaders) {
        candidateLoaders = Array.isArray(loaders) ? loaders : [loaders];
    }
    if (context && context.loaders) {
        const contextLoaders = Array.isArray(context.loaders) ? context.loaders : [context.loaders];
        candidateLoaders = candidateLoaders ? [...candidateLoaders, ...contextLoaders] : contextLoaders;
    }
    // If no loaders, return null to look in globally registered loaders
    return candidateLoaders && candidateLoaders.length ? candidateLoaders : undefined;
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/loggers.js":
/*!************************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/lib/loader-utils/loggers.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConsoleLog: () => (/* binding */ ConsoleLog),
/* harmony export */   NullLog: () => (/* binding */ NullLog),
/* harmony export */   probeLog: () => (/* binding */ probeLog)
/* harmony export */ });
/* harmony import */ var _probe_gl_log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @probe.gl/log */ "./node_modules/@probe.gl/log/dist/log.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// probe.gl Log compatible loggers

const probeLog = new _probe_gl_log__WEBPACK_IMPORTED_MODULE_0__.Log({ id: 'loaders.gl' });
// Logs nothing
class NullLog {
    log() {
        return () => { };
    }
    info() {
        return () => { };
    }
    warn() {
        return () => { };
    }
    error() {
        return () => { };
    }
}
// Logs to console
class ConsoleLog {
    console;
    constructor() {
        this.console = console; // eslint-disable-line
    }
    log(...args) {
        return this.console.log.bind(this.console, ...args);
    }
    info(...args) {
        return this.console.info.bind(this.console, ...args);
    }
    warn(...args) {
        return this.console.warn.bind(this.console, ...args);
    }
    error(...args) {
        return this.console.error.bind(this.console, ...args);
    }
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/normalize-loader.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/lib/loader-utils/normalize-loader.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isLoaderObject: () => (/* binding */ isLoaderObject),
/* harmony export */   normalizeLoader: () => (/* binding */ normalizeLoader)
/* harmony export */ });
/* harmony import */ var _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @loaders.gl/loader-utils */ "./node_modules/@loaders.gl/loader-utils/dist/lib/env-utils/assert.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

function isLoaderObject(loader) {
    if (!loader) {
        return false;
    }
    if (Array.isArray(loader)) {
        loader = loader[0];
    }
    const hasExtensions = Array.isArray(loader?.extensions);
    /* Now handled by types and worker loaders do not have these
    let hasParser =
      loader.parseTextSync ||
      loader.parseSync ||
      loader.parse ||
      loader.parseStream || // TODO Remove, Replace with parseInBatches
      loader.parseInBatches;
    */
    return hasExtensions;
}
function normalizeLoader(loader) {
    // This error is fairly easy to trigger by mixing up import statements etc
    // So we make an exception and add a developer error message for this case
    // To help new users from getting stuck here
    (0,_loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_0__.assert)(loader, 'null loader');
    (0,_loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_0__.assert)(isLoaderObject(loader), 'invalid loader');
    // NORMALIZE [LOADER, OPTIONS] => LOADER
    // If [loader, options], create a new loaders object with options merged in
    let options;
    if (Array.isArray(loader)) {
        options = loader[1];
        loader = loader[0];
        loader = {
            ...loader,
            options: { ...loader.options, ...options }
        };
    }
    // NORMALIZE text and binary flags
    // Ensure at least one of text/binary flags are properly set
    // @ts-expect-error
    if (loader?.parseTextSync || loader?.parseText) {
        loader.text = true;
    }
    if (!loader.text) {
        loader.binary = true;
    }
    return loader;
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/option-defaults.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/lib/loader-utils/option-defaults.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_LOADER_OPTIONS: () => (/* binding */ DEFAULT_LOADER_OPTIONS),
/* harmony export */   REMOVED_LOADER_OPTIONS: () => (/* binding */ REMOVED_LOADER_OPTIONS)
/* harmony export */ });
/* harmony import */ var _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @loaders.gl/loader-utils */ "./node_modules/@loaders.gl/loader-utils/dist/lib/env-utils/globals.js");
/* harmony import */ var _loggers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loggers.js */ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/loggers.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors


const DEFAULT_LOADER_OPTIONS = {
    // baseUri
    fetch: null,
    mimeType: undefined,
    nothrow: false,
    log: new _loggers_js__WEBPACK_IMPORTED_MODULE_0__.ConsoleLog(), // A probe.gl compatible (`log.log()()` syntax) that just logs to console
    useLocalLibraries: false,
    CDN: 'https://unpkg.com/@loaders.gl',
    worker: true, // By default, use worker if provided by loader.
    maxConcurrency: 3, // How many worker instances should be created for each loader.
    maxMobileConcurrency: 1, // How many worker instances should be created for each loader on mobile devices.
    reuseWorkers: _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_1__.isBrowser, // By default reuse workers in browser (Node.js refuses to terminate if browsers are running)
    _nodeWorkers: false, // By default do not support node workers
    _workerType: '', // 'test' to use locally generated workers
    limit: 0,
    _limitMB: 0,
    batchSize: 'auto',
    batchDebounceMs: 0,
    metadata: false, // TODO - currently only implemented for parseInBatches, adds initial metadata batch,
    transforms: []
};
const REMOVED_LOADER_OPTIONS = {
    throws: 'nothrow',
    dataType: '(no longer used)',
    uri: 'baseUri',
    // Warn if fetch options are used on top-level
    method: 'fetch.method',
    headers: 'fetch.headers',
    body: 'fetch.body',
    mode: 'fetch.mode',
    credentials: 'fetch.credentials',
    cache: 'fetch.cache',
    redirect: 'fetch.redirect',
    referrer: 'fetch.referrer',
    referrerPolicy: 'fetch.referrerPolicy',
    integrity: 'fetch.integrity',
    keepalive: 'fetch.keepalive',
    signal: 'fetch.signal'
};


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/option-utils.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/lib/loader-utils/option-utils.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getGlobalLoaderOptions: () => (/* binding */ getGlobalLoaderOptions),
/* harmony export */   getGlobalLoaderState: () => (/* binding */ getGlobalLoaderState),
/* harmony export */   normalizeOptions: () => (/* binding */ normalizeOptions),
/* harmony export */   setGlobalOptions: () => (/* binding */ setGlobalOptions)
/* harmony export */ });
/* harmony import */ var _loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @loaders.gl/loader-utils */ "./node_modules/@loaders.gl/loader-utils/dist/lib/module-utils/js-module-utils.js");
/* harmony import */ var _javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../javascript-utils/is-type.js */ "./node_modules/@loaders.gl/core/dist/javascript-utils/is-type.js");
/* harmony import */ var _loggers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loggers.js */ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/loggers.js");
/* harmony import */ var _option_defaults_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./option-defaults.js */ "./node_modules/@loaders.gl/core/dist/lib/loader-utils/option-defaults.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors




/**
 * Helper for safely accessing global loaders.gl variables
 * Wraps initialization of global variable in function to defeat overly aggressive tree-shakers
 */
function getGlobalLoaderState() {
    // @ts-ignore
    globalThis.loaders = globalThis.loaders || {};
    // @ts-ignore
    const { loaders } = globalThis;
    // Add _state object to keep separate from modules added to globalThis.loaders
    if (!loaders._state) {
        loaders._state = {};
    }
    return loaders._state;
}
/**
 * Store global loader options on the global object to increase chances of cross loaders-version interoperability
 * NOTE: This use case is not reliable but can help when testing new versions of loaders.gl with existing frameworks
 * @returns global loader options merged with default loader options
 */
function getGlobalLoaderOptions() {
    const state = getGlobalLoaderState();
    // Ensure all default loader options from this library are mentioned
    state.globalOptions = state.globalOptions || { ..._option_defaults_js__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_LOADER_OPTIONS };
    return state.globalOptions;
}
/**
 * Set global loader options
 * @param options
 */
function setGlobalOptions(options) {
    const state = getGlobalLoaderState();
    const globalOptions = getGlobalLoaderOptions();
    // @ts-expect-error First param looks incorrect
    state.globalOptions = normalizeOptionsInternal(globalOptions, options);
    // Make sure any new modules are registered
    (0,_loaders_gl_loader_utils__WEBPACK_IMPORTED_MODULE_1__.registerJSModules)(options.modules);
}
/**
 * Merges options with global opts and loader defaults, also injects baseUri
 * @param options
 * @param loader
 * @param loaders
 * @param url
 */
function normalizeOptions(options, loader, loaders, url) {
    loaders = loaders || [];
    loaders = Array.isArray(loaders) ? loaders : [loaders];
    validateOptions(options, loaders);
    return normalizeOptionsInternal(loader, options, url);
}
// VALIDATE OPTIONS
/**
 * Warn for unsupported options
 * @param options
 * @param loaders
 */
function validateOptions(options, loaders) {
    // Check top level options
    validateOptionsObject(options, null, _option_defaults_js__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_LOADER_OPTIONS, _option_defaults_js__WEBPACK_IMPORTED_MODULE_0__.REMOVED_LOADER_OPTIONS, loaders);
    for (const loader of loaders) {
        // Get the scoped, loader specific options from the user supplied options
        const idOptions = ((options && options[loader.id]) || {});
        // Get scoped, loader specific default and deprecated options from the selected loader
        const loaderOptions = (loader.options && loader.options[loader.id]) || {};
        const deprecatedOptions = (loader.deprecatedOptions && loader.deprecatedOptions[loader.id]) || {};
        // Validate loader specific options
        // @ts-ignore
        validateOptionsObject(idOptions, loader.id, loaderOptions, deprecatedOptions, loaders);
    }
}
// eslint-disable-next-line max-params, complexity
function validateOptionsObject(options, id, defaultOptions, deprecatedOptions, loaders) {
    const loaderName = id || 'Top level';
    const prefix = id ? `${id}.` : '';
    for (const key in options) {
        // If top level option value is an object it could options for a loader, so ignore
        const isSubOptions = !id && (0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_2__.isObject)(options[key]);
        const isBaseUriOption = key === 'baseUri' && !id;
        const isWorkerUrlOption = key === 'workerUrl' && id;
        // <loader>.workerUrl requires special handling as it is now auto-generated and no longer specified as a default option.
        if (!(key in defaultOptions) && !isBaseUriOption && !isWorkerUrlOption) {
            // Issue deprecation warnings
            if (key in deprecatedOptions) {
                _loggers_js__WEBPACK_IMPORTED_MODULE_3__.probeLog.warn(`${loaderName} loader option \'${prefix}${key}\' no longer supported, use \'${deprecatedOptions[key]}\'`)();
            }
            else if (!isSubOptions) {
                const suggestion = findSimilarOption(key, loaders);
                _loggers_js__WEBPACK_IMPORTED_MODULE_3__.probeLog.warn(`${loaderName} loader option \'${prefix}${key}\' not recognized. ${suggestion}`)();
            }
        }
    }
}
function findSimilarOption(optionKey, loaders) {
    const lowerCaseOptionKey = optionKey.toLowerCase();
    let bestSuggestion = '';
    for (const loader of loaders) {
        for (const key in loader.options) {
            if (optionKey === key) {
                return `Did you mean \'${loader.id}.${key}\'?`;
            }
            const lowerCaseKey = key.toLowerCase();
            const isPartialMatch = lowerCaseOptionKey.startsWith(lowerCaseKey) || lowerCaseKey.startsWith(lowerCaseOptionKey);
            if (isPartialMatch) {
                bestSuggestion = bestSuggestion || `Did you mean \'${loader.id}.${key}\'?`;
            }
        }
    }
    return bestSuggestion;
}
function normalizeOptionsInternal(loader, options, url) {
    const loaderDefaultOptions = loader.options || {};
    const mergedOptions = { ...loaderDefaultOptions };
    addUrlOptions(mergedOptions, url);
    // LOGGING: options.log can be set to `null` to defeat logging
    if (mergedOptions.log === null) {
        mergedOptions.log = new _loggers_js__WEBPACK_IMPORTED_MODULE_3__.NullLog();
    }
    mergeNestedFields(mergedOptions, getGlobalLoaderOptions());
    mergeNestedFields(mergedOptions, options);
    return mergedOptions;
}
// Merge nested options objects
function mergeNestedFields(mergedOptions, options) {
    for (const key in options) {
        // Check for nested options
        // object in options => either no key in defaultOptions or object in defaultOptions
        if (key in options) {
            const value = options[key];
            if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_2__.isPureObject)(value) && (0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_2__.isPureObject)(mergedOptions[key])) {
                mergedOptions[key] = {
                    ...mergedOptions[key],
                    ...options[key]
                };
            }
            else {
                mergedOptions[key] = options[key];
            }
        }
        // else: No need to merge nested opts, and the initial merge already copied over the nested options
    }
}
/**
 * Harvest information from the url
 * @deprecated This is mainly there to support a hack in the GLTFLoader
 * TODO - baseUri should be a directory, i.e. remove file component from baseUri
 * TODO - extract extension?
 * TODO - extract query parameters?
 * TODO - should these be injected on context instead of options?
 */
function addUrlOptions(options, url) {
    if (url && !('baseUri' in options)) {
        options.baseUri = url;
    }
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/lib/utils/mime-type-utils.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/lib/utils/mime-type-utils.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compareMIMETypes: () => (/* binding */ compareMIMETypes),
/* harmony export */   parseMIMEType: () => (/* binding */ parseMIMEType),
/* harmony export */   parseMIMETypeFromURL: () => (/* binding */ parseMIMETypeFromURL)
/* harmony export */ });
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// TODO - build/integrate proper MIME type parsing
// https://mimesniff.spec.whatwg.org/
const DATA_URL_PATTERN = /^data:([-\w.]+\/[-\w.+]+)(;|,)/;
const MIME_TYPE_PATTERN = /^([-\w.]+\/[-\w.+]+)/;
/**
 * Compare two MIME types, case insensitively etc.
 * @param mimeType1
 * @param mimeType2
 * @returns true if the MIME types are equivalent
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#structure_of_a_mime_type
 */
function compareMIMETypes(mimeType1, mimeType2) {
    if (mimeType1.toLowerCase() === mimeType2.toLowerCase()) {
        return true;
    }
    return false;
}
/**
 * Remove extra data like `charset` from MIME types
 * @param mimeString
 * @returns A clean MIME type, or an empty string
 *
 * @todo - handle more advanced MIMETYpes, multiple types
 * @todo - extract charset etc
 */
function parseMIMEType(mimeString) {
    // If resource is a data url, extract any embedded mime type
    const matches = MIME_TYPE_PATTERN.exec(mimeString);
    if (matches) {
        return matches[1];
    }
    return mimeString;
}
/**
 * Extract MIME type from data URL
 *
 * @param mimeString
 * @returns A clean MIME type, or an empty string
 *
 * @todo - handle more advanced MIMETYpes, multiple types
 * @todo - extract charset etc
 */
function parseMIMETypeFromURL(url) {
    // If resource is a data URL, extract any embedded mime type
    const matches = DATA_URL_PATTERN.exec(url);
    if (matches) {
        return matches[1];
    }
    return '';
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/lib/utils/resource-utils.js":
/*!************************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/lib/utils/resource-utils.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResourceContentLength: () => (/* binding */ getResourceContentLength),
/* harmony export */   getResourceMIMEType: () => (/* binding */ getResourceMIMEType),
/* harmony export */   getResourceUrl: () => (/* binding */ getResourceUrl)
/* harmony export */ });
/* harmony import */ var _javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../javascript-utils/is-type.js */ "./node_modules/@loaders.gl/core/dist/javascript-utils/is-type.js");
/* harmony import */ var _mime_type_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mime-type-utils.js */ "./node_modules/@loaders.gl/core/dist/lib/utils/mime-type-utils.js");
/* harmony import */ var _url_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url-utils.js */ "./node_modules/@loaders.gl/core/dist/lib/utils/url-utils.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors



/**
 * Returns the URL associated with this resource.
 * The returned value may include a query string and need further processing.
 * If it cannot determine url, the corresponding value will be an empty string
 *
 * @todo string parameters are assumed to be URLs
 */
function getResourceUrl(resource) {
    // If resource is a `Response`, it contains the information directly as a field
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isResponse)(resource)) {
        const response = resource;
        return response.url;
    }
    // If the resource is a Blob or a File (subclass of Blob)
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isBlob)(resource)) {
        const blob = resource;
        // File objects have a "name" property. Blob objects don't have any
        // url (name) information
        return blob.name || '';
    }
    if (typeof resource === 'string') {
        return resource;
    }
    // Unknown
    return '';
}
/**
 * Returns the URL associated with this resource.
 * The returned value may include a query string and need further processing.
 * If it cannot determine url, the corresponding value will be an empty string
 *
 * @todo string parameters are assumed to be URLs
 */
function getResourceMIMEType(resource) {
    // If resource is a response, it contains the information directly
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isResponse)(resource)) {
        const response = resource;
        const contentTypeHeader = response.headers.get('content-type') || '';
        const noQueryUrl = (0,_url_utils_js__WEBPACK_IMPORTED_MODULE_1__.stripQueryString)(response.url);
        return (0,_mime_type_utils_js__WEBPACK_IMPORTED_MODULE_2__.parseMIMEType)(contentTypeHeader) || (0,_mime_type_utils_js__WEBPACK_IMPORTED_MODULE_2__.parseMIMETypeFromURL)(noQueryUrl);
    }
    // If the resource is a Blob or a File (subclass of Blob)
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isBlob)(resource)) {
        const blob = resource;
        return blob.type || '';
    }
    if (typeof resource === 'string') {
        return (0,_mime_type_utils_js__WEBPACK_IMPORTED_MODULE_2__.parseMIMETypeFromURL)(resource);
    }
    // Unknown
    return '';
}
/**
  * Returns (approximate) content length for a resource if it can be determined.
  * Returns -1 if content length cannot be determined.
  * @param resource

  * @note string parameters are NOT assumed to be URLs
  */
function getResourceContentLength(resource) {
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isResponse)(resource)) {
        const response = resource;
        return response.headers['content-length'] || -1;
    }
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isBlob)(resource)) {
        const blob = resource;
        return blob.size;
    }
    if (typeof resource === 'string') {
        // TODO - handle data URL?
        return resource.length;
    }
    if (resource instanceof ArrayBuffer) {
        return resource.byteLength;
    }
    if (ArrayBuffer.isView(resource)) {
        return resource.byteLength;
    }
    return -1;
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/lib/utils/response-utils.js":
/*!************************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/lib/utils/response-utils.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkResponse: () => (/* binding */ checkResponse),
/* harmony export */   checkResponseSync: () => (/* binding */ checkResponseSync),
/* harmony export */   makeResponse: () => (/* binding */ makeResponse)
/* harmony export */ });
/* harmony import */ var _javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../javascript-utils/is-type.js */ "./node_modules/@loaders.gl/core/dist/javascript-utils/is-type.js");
/* harmony import */ var _fetch_fetch_error_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../fetch/fetch-error.js */ "./node_modules/@loaders.gl/core/dist/lib/fetch/fetch-error.js");
/* harmony import */ var _resource_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resource-utils.js */ "./node_modules/@loaders.gl/core/dist/lib/utils/resource-utils.js");
/* harmony import */ var _url_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./url-utils.js */ "./node_modules/@loaders.gl/core/dist/lib/utils/url-utils.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors




/**
 * Returns a Response object
 * Adds content-length header when possible
 *
 * @param resource
 */
async function makeResponse(resource) {
    if ((0,_javascript_utils_is_type_js__WEBPACK_IMPORTED_MODULE_0__.isResponse)(resource)) {
        return resource;
    }
    // Add content-length header if possible
    const headers = {};
    const contentLength = (0,_resource_utils_js__WEBPACK_IMPORTED_MODULE_1__.getResourceContentLength)(resource);
    if (contentLength >= 0) {
        headers['content-length'] = String(contentLength);
    }
    // `new Response(File)` does not preserve content-type and URL
    // so we add them here
    const url = (0,_resource_utils_js__WEBPACK_IMPORTED_MODULE_1__.getResourceUrl)(resource);
    const type = (0,_resource_utils_js__WEBPACK_IMPORTED_MODULE_1__.getResourceMIMEType)(resource);
    if (type) {
        headers['content-type'] = type;
    }
    // Add a custom header with initial bytes if available
    const initialDataUrl = await getInitialDataUrl(resource);
    if (initialDataUrl) {
        headers['x-first-bytes'] = initialDataUrl;
    }
    // TODO - is this the best way of handling strings?
    // Maybe package as data URL instead?
    if (typeof resource === 'string') {
        // Convert to ArrayBuffer to avoid Response treating it as a URL
        resource = new TextEncoder().encode(resource);
    }
    // Attempt to create a Response from the resource, adding headers and setting url
    const response = new Response(resource, { headers });
    // We can't control `Response.url` via constructor, use a property override to record URL.
    Object.defineProperty(response, 'url', { value: url });
    return response;
}
/**
 * Checks response status (async) and throws a helpful error message if status is not OK.
 * @param response
 */
async function checkResponse(response) {
    if (!response.ok) {
        const error = await getResponseError(response);
        throw error;
    }
}
/**
 * Checks response status (sync) and throws a helpful error message if status is not OK.
 * @param response
 */
function checkResponseSync(response) {
    if (!response.ok) {
        let message = `${response.status} ${response.statusText}`;
        message = message.length > 60 ? `${message.slice(0, 60)}...` : message;
        throw new Error(message);
    }
}
// HELPERS
async function getResponseError(response) {
    const shortUrl = (0,_url_utils_js__WEBPACK_IMPORTED_MODULE_2__.shortenUrlForDisplay)(response.url);
    let message = `Failed to fetch resource (${response.status}) ${response.statusText}: ${shortUrl}`;
    message = message.length > 100 ? `${message.slice(0, 100)}...` : message;
    const info = {
        reason: response.statusText,
        url: response.url,
        response
    };
    // See if we got an error message in the body
    try {
        const contentType = response.headers.get('Content-Type');
        info.reason =
            !response.bodyUsed && contentType?.includes('application/json')
                ? await response.json()
                : await response.text();
    }
    catch (error) {
        // eslint forbids return in a finally statement, so we just catch here
    }
    return new _fetch_fetch_error_js__WEBPACK_IMPORTED_MODULE_3__.FetchError(message, info);
}
async function getInitialDataUrl(resource) {
    const INITIAL_DATA_LENGTH = 5;
    if (typeof resource === 'string') {
        return `data:,${resource.slice(0, INITIAL_DATA_LENGTH)}`;
    }
    if (resource instanceof Blob) {
        const blobSlice = resource.slice(0, 5);
        return await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event?.target?.result);
            reader.readAsDataURL(blobSlice);
        });
    }
    if (resource instanceof ArrayBuffer) {
        const slice = resource.slice(0, INITIAL_DATA_LENGTH);
        const base64 = arrayBufferToBase64(slice);
        return `data:base64,${base64}`;
    }
    return null;
}
// https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}


/***/ }),

/***/ "./node_modules/@loaders.gl/core/dist/lib/utils/url-utils.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@loaders.gl/core/dist/lib/utils/url-utils.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractQueryString: () => (/* binding */ extractQueryString),
/* harmony export */   shortenUrlForDisplay: () => (/* binding */ shortenUrlForDisplay),
/* harmony export */   stripQueryString: () => (/* binding */ stripQueryString)
/* harmony export */ });
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
const QUERY_STRING_PATTERN = /\?.*/;
function extractQueryString(url) {
    const matches = url.match(QUERY_STRING_PATTERN);
    return matches && matches[0];
}
function stripQueryString(url) {
    return url.replace(QUERY_STRING_PATTERN, '');
}
function shortenUrlForDisplay(url) {
    if (url.length < 50) {
        return url;
    }
    const urlEnd = url.slice(url.length - 15);
    const urlStart = url.substr(0, 32);
    return `${urlStart}...${urlEnd}`;
}


/***/ }),

/***/ "./node_modules/@loaders.gl/loader-utils/dist/lib/binary-utils/array-buffer-utils.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@loaders.gl/loader-utils/dist/lib/binary-utils/array-buffer-utils.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compareArrayBuffers: () => (/* binding */ compareArrayBuffers),
/* harmony export */   concatenateArrayBuffers: () => (/* binding */ concatenateArrayBuffers),
/* harmony export */   concatenateArrayBuffersFromArray: () => (/* binding */ concatenateArrayBuffersFromArray),
/* harmony export */   concatenateTypedArrays: () => (/* binding */ concatenateTypedArrays),
/* harmony export */   sliceArrayBuffer: () => (/* binding */ sliceArrayBuffer)
/* harmony export */ });
/**
 * compare two binary arrays for equality
 * @param a
 * @param b
 * @param byteLength
 */
function compareArrayBuffers(arrayBuffer1, arrayBuffer2, byteLength) {
    byteLength = byteLength || arrayBuffer1.byteLength;
    if (arrayBuffer1.byteLength < byteLength || arrayBuffer2.byteLength < byteLength) {
        return false;
    }
    const array1 = new Uint8Array(arrayBuffer1);
    const array2 = new Uint8Array(arrayBuffer2);
    for (let i = 0; i < array1.length; ++i) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Concatenate a sequence of ArrayBuffers from arguments
 * @return A concatenated ArrayBuffer
 */
function concatenateArrayBuffers(...sources) {
    return concatenateArrayBuffersFromArray(sources);
}
/**
 * Concatenate a sequence of ArrayBuffers from array
 * @return A concatenated ArrayBuffer
 */
function concatenateArrayBuffersFromArray(sources) {
    // Make sure all inputs are wrapped in typed arrays
    const sourceArrays = sources.map((source2) => source2 instanceof ArrayBuffer ? new Uint8Array(source2) : source2);
    // Get length of all inputs
    const byteLength = sourceArrays.reduce((length, typedArray) => length + typedArray.byteLength, 0);
    // Allocate array with space for all inputs
    const result = new Uint8Array(byteLength);
    // Copy the subarrays
    let offset = 0;
    for (const sourceArray of sourceArrays) {
        result.set(sourceArray, offset);
        offset += sourceArray.byteLength;
    }
    // We work with ArrayBuffers, discard the typed array wrapper
    return result.buffer;
}
/**
 * Concatenate arbitrary count of typed arrays
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
 * @param - list of arrays. All arrays should be the same type
 * @return A concatenated TypedArray
 */
function concatenateTypedArrays(...typedArrays) {
    // @ts-ignore
    const arrays = typedArrays;
    // @ts-ignore
    const TypedArrayConstructor = (arrays && arrays.length > 1 && arrays[0].constructor) || null;
    if (!TypedArrayConstructor) {
        throw new Error('"concatenateTypedArrays" - incorrect quantity of arguments or arguments have incompatible data types');
    }
    const sumLength = arrays.reduce((acc, value) => acc + value.length, 0);
    // @ts-ignore typescript does not like dynamic constructors
    const result = new TypedArrayConstructor(sumLength);
    let offset = 0;
    for (const array of arrays) {
        result.set(array, offset);
        offset += array.length;
    }
    return result;
}
/**
 * Copy a view of an ArrayBuffer into new ArrayBuffer with byteOffset = 0
 * @param arrayBuffer
 * @param byteOffset
 * @param byteLength
 */
function sliceArrayBuffer(arrayBuffer, byteOffset, byteLength) {
    const subArray = byteLength !== undefined
        ? new Uint8Array(arrayBuffer).subarray(byteOffset, byteOffset + byteLength)
        : new Uint8Array(arrayBuffer).subarray(byteOffset);
    const arrayCopy = new Uint8Array(subArray);
    return arrayCopy.buffer;
}


/***/ }),

/***/ "./node_modules/@loaders.gl/loader-utils/dist/lib/binary-utils/memory-conversion-utils.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@loaders.gl/loader-utils/dist/lib/binary-utils/memory-conversion-utils.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBuffer: () => (/* binding */ isBuffer),
/* harmony export */   toArrayBuffer: () => (/* binding */ toArrayBuffer),
/* harmony export */   toBuffer: () => (/* binding */ toBuffer)
/* harmony export */ });
/* harmony import */ var _node_buffer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node/buffer.js */ "./node_modules/@loaders.gl/loader-utils/dist/lib/node/buffer.browser.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

/**
 * Check for Node.js `Buffer` (without triggering bundler to include Buffer polyfill on browser)
 */
function isBuffer(value) {
    return value && typeof value === 'object' && value.isBuffer;
}
/**
 * Converts to Node.js `Buffer` (without triggering bundler to include Buffer polyfill on browser)
 * @todo better data type
 */
function toBuffer(data) {
    return _node_buffer_js__WEBPACK_IMPORTED_MODULE_0__.toBuffer ? _node_buffer_js__WEBPACK_IMPORTED_MODULE_0__.toBuffer(data) : data;
}
/**
 * Convert an object to an array buffer
 */
function toArrayBuffer(data) {
    // Note: Should be called first, Buffers can trigger other detections below
    if (isBuffer(data)) {
        return _node_buffer_js__WEBPACK_IMPORTED_MODULE_0__.toArrayBuffer(data);
    }
    if (data instanceof ArrayBuffer) {
        return data;
    }
    // Careful - Node Buffers look like Uint8Arrays (keep after isBuffer)
    if (ArrayBuffer.isView(data)) {
        if (data.byteOffset === 0 && data.byteLength === data.buffer.byteLength) {
            return data.buffer;
        }
        return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    }
    if (typeof data === 'string') {
        const text = data;
        const uint8Array = new TextEncoder().encode(text);
        return uint8Array.buffer;
    }
    // HACK to support Blob polyfill
    if (data && typeof data === 'object' && data._toArrayBuffer) {
        return data._toArrayBuffer();
    }
    throw new Error('toArrayBuffer');
}


/***/ }),

/***/ "./node_modules/@loaders.gl/loader-utils/dist/lib/env-utils/assert.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@loaders.gl/loader-utils/dist/lib/env-utils/assert.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assert: () => (/* binding */ assert)
/* harmony export */ });
/**
 * Throws an `Error` with the optional `message` if `condition` is falsy
 * @note Replacement for the external assert method to reduce bundle size
 */
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'loader assertion failed.');
    }
}


/***/ }),

/***/ "./node_modules/@loaders.gl/loader-utils/dist/lib/env-utils/globals.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@loaders.gl/loader-utils/dist/lib/env-utils/globals.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   document: () => (/* binding */ document_),
/* harmony export */   global: () => (/* binding */ global_),
/* harmony export */   isBrowser: () => (/* binding */ isBrowser),
/* harmony export */   isWorker: () => (/* binding */ isWorker),
/* harmony export */   nodeVersion: () => (/* binding */ nodeVersion),
/* harmony export */   self: () => (/* binding */ self_),
/* harmony export */   window: () => (/* binding */ window_)
/* harmony export */ });
// Purpose: include this in your module to avoid
// dependencies on micro modules like 'global' and 'is-browser';
/* eslint-disable no-restricted-globals */
const globals = {
    self: typeof self !== 'undefined' && self,
    window: typeof window !== 'undefined' && window,
    global: typeof global !== 'undefined' && global,
    document: typeof document !== 'undefined' && document
};
const self_ = globals.self || globals.window || globals.global || {};
const window_ = globals.window || globals.self || globals.global || {};
const global_ = globals.global || globals.self || globals.window || {};
const document_ = globals.document || {};

/** true if running in a browser */
const isBrowser = 
// @ts-ignore process does not exist on browser
Boolean(typeof process !== 'object' || String(process) !== '[object process]' || process.browser);
/** true if running in a worker thread */
const isWorker = typeof importScripts === 'function';
// Extract node major version
const matches = typeof process !== 'undefined' && process.version && /v([0-9]*)/.exec(process.version);
/** Major Node version (as a number) */
const nodeVersion = (matches && parseFloat(matches[1])) || 0;


/***/ }),

/***/ "./node_modules/@loaders.gl/loader-utils/dist/lib/iterators/async-iteration.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@loaders.gl/loader-utils/dist/lib/iterators/async-iteration.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   concatenateArrayBuffersAsync: () => (/* binding */ concatenateArrayBuffersAsync),
/* harmony export */   concatenateStringsAsync: () => (/* binding */ concatenateStringsAsync),
/* harmony export */   forEach: () => (/* binding */ forEach)
/* harmony export */ });
/* harmony import */ var _binary_utils_array_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../binary-utils/array-buffer-utils.js */ "./node_modules/@loaders.gl/loader-utils/dist/lib/binary-utils/array-buffer-utils.js");

// GENERAL UTILITIES
/**
 * Iterate over async iterator, without resetting iterator if end is not reached
 * - forEach intentionally does not reset iterator if exiting loop prematurely
 *   so that iteration can continue in a second loop
 * - It is recommended to use a standard for-await as last loop to ensure
 *   iterator gets properly reset
 *
 * TODO - optimize using sync iteration if argument is an Iterable?
 *
 * @param iterator
 * @param visitor
 */
async function forEach(iterator, visitor) {
    // eslint-disable-next-line
    while (true) {
        const { done, value } = await iterator.next();
        if (done) {
            iterator.return();
            return;
        }
        const cancel = visitor(value);
        if (cancel) {
            return;
        }
    }
}
// Breaking big data into iterable chunks, concatenating iterable chunks into big data objects
/**
 * Concatenates all data chunks yielded by an (async) iterator
 * This function can e.g. be used to enable atomic parsers to work on (async) iterator inputs
 */
async function concatenateArrayBuffersAsync(asyncIterator) {
    const arrayBuffers = [];
    for await (const chunk of asyncIterator) {
        arrayBuffers.push(chunk);
    }
    return (0,_binary_utils_array_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__.concatenateArrayBuffers)(...arrayBuffers);
}
async function concatenateStringsAsync(asyncIterator) {
    const strings = [];
    for await (const chunk of asyncIterator) {
        strings.push(chunk);
    }
    return strings.join('');
}


/***/ }),

/***/ "./node_modules/@loaders.gl/loader-utils/dist/lib/log-utils/log.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@loaders.gl/loader-utils/dist/lib/log-utils/log.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VERSION: () => (/* binding */ VERSION),
/* harmony export */   log: () => (/* binding */ log)
/* harmony export */ });
/* harmony import */ var _probe_gl_log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @probe.gl/log */ "./node_modules/@probe.gl/log/dist/log.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

// Version constant cannot be imported, it needs to correspond to the build version of **this** module.
// __VERSION__ is injected by babel-plugin-version-inline
// @ts-ignore TS2304: Cannot find name '__VERSION__'.
const VERSION =  true ? "4.3.2" : 0;
const version = VERSION[0] >= '0' && VERSION[0] <= '9' ? `v${VERSION}` : '';
// Make sure we set the global variable
function createLog() {
    const log = new _probe_gl_log__WEBPACK_IMPORTED_MODULE_0__.Log({ id: 'loaders.gl' });
    globalThis.loaders = globalThis.loaders || {};
    globalThis.loaders.log = log;
    globalThis.loaders.version = version;
    globalThis.probe = globalThis.probe || {};
    globalThis.probe.loaders = log;
    return log;
}
const log = createLog();


/***/ }),

/***/ "./node_modules/@loaders.gl/loader-utils/dist/lib/module-utils/js-module-utils.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@loaders.gl/loader-utils/dist/lib/module-utils/js-module-utils.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkJSModule: () => (/* binding */ checkJSModule),
/* harmony export */   getJSModule: () => (/* binding */ getJSModule),
/* harmony export */   getJSModuleOrNull: () => (/* binding */ getJSModuleOrNull),
/* harmony export */   registerJSModules: () => (/* binding */ registerJSModules)
/* harmony export */ });
/* harmony import */ var _log_utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../log-utils/log.js */ "./node_modules/@loaders.gl/loader-utils/dist/lib/log-utils/log.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

/**
 * Register application-imported modules
 * These modules are typically to big to bundle, or may have issues on some bundlers/environments
 */
function registerJSModules(modules) {
    globalThis.loaders ||= {};
    globalThis.loaders.modules ||= {};
    Object.assign(globalThis.loaders.modules, modules);
}
/**
 * Get a pre-registered application-imported module, warn if not present
 */
function checkJSModule(name, caller) {
    const module = globalThis.loaders?.modules?.[name];
    if (!module) {
        _log_utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.warn(`${caller}: ${name} library not installed`)();
    }
}
/**
 * Get a pre-registered application-imported module, throw if not present
 */
function getJSModule(name, caller) {
    const module = globalThis.loaders?.modules?.[name];
    if (!module) {
        throw new Error(`${caller}: ${name} library not installed`);
    }
    return module;
}
/**
 * Get a pre-registered application-imported module, return null if not present
 */
function getJSModuleOrNull(name) {
    const module = globalThis.loaders?.modules?.[name];
    return module || null;
}


/***/ }),

/***/ "./node_modules/@loaders.gl/loader-utils/dist/lib/node/buffer.browser.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@loaders.gl/loader-utils/dist/lib/node/buffer.browser.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toArrayBuffer: () => (/* binding */ toArrayBuffer),
/* harmony export */   toBuffer: () => (/* binding */ toBuffer)
/* harmony export */ });
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// Isolates Buffer references to ensure they are only bundled under Node.js (avoids big webpack polyfill)
// this file is selected by the package.json "browser" field).
/**
 * Convert Buffer to ArrayBuffer
 * Converts Node.js `Buffer` to `ArrayBuffer` (without triggering bundler to include Buffer polyfill on browser)
 * @todo better data type
 */
function toArrayBuffer(buffer) {
    return buffer;
}
/**
 * Convert (copy) ArrayBuffer to Buffer
 */
function toBuffer(binaryData) {
    throw new Error('Buffer not supported in browser');
}


/***/ }),

/***/ "./node_modules/@loaders.gl/loader-utils/dist/lib/option-utils/merge-loader-options.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@loaders.gl/loader-utils/dist/lib/option-utils/merge-loader-options.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeLoaderOptions: () => (/* binding */ mergeLoaderOptions)
/* harmony export */ });
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
/**
 *
 * @param baseOptions Can be undefined, in which case a fresh options object will be minted
 * @param newOptions
 * @returns
 */
function mergeLoaderOptions(baseOptions, newOptions) {
    return mergeOptionsRecursively(baseOptions || {}, newOptions);
}
function mergeOptionsRecursively(baseOptions, newOptions, level = 0) {
    // Sanity check (jest test runner overwrites the console object which can lead to infinite recursion)
    if (level > 3) {
        return newOptions;
    }
    const options = { ...baseOptions };
    for (const [key, newValue] of Object.entries(newOptions)) {
        if (newValue && typeof newValue === 'object' && !Array.isArray(newValue)) {
            options[key] = mergeOptionsRecursively(options[key] || {}, newOptions[key], level + 1);
            // Object.assign(options[key] as object, newOptions[key]);
        }
        else {
            options[key] = newOptions[key];
        }
    }
    return options;
}


/***/ }),

/***/ "./node_modules/@loaders.gl/loader-utils/dist/lib/path-utils/file-aliases.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@loaders.gl/loader-utils/dist/lib/path-utils/file-aliases.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addAliases: () => (/* binding */ addAliases),
/* harmony export */   getPathPrefix: () => (/* binding */ getPathPrefix),
/* harmony export */   resolvePath: () => (/* binding */ resolvePath),
/* harmony export */   setPathPrefix: () => (/* binding */ setPathPrefix)
/* harmony export */ });
// Simple file alias mechanisms for tests.
let pathPrefix = '';
const fileAliases = {};
/*
 * Set a relative path prefix
 */
function setPathPrefix(prefix) {
    pathPrefix = prefix;
}
/*
 * Get the relative path prefix
 */
function getPathPrefix() {
    return pathPrefix;
}
/**
 *
 * @param aliases
 *
 * Note: addAliases are an experimental export, they are only for testing of loaders.gl loaders
 * not intended as a generic aliasing mechanism
 */
function addAliases(aliases) {
    Object.assign(fileAliases, aliases);
}
/**
 * Resolves aliases and adds path-prefix to paths
 */
function resolvePath(filename) {
    for (const alias in fileAliases) {
        if (filename.startsWith(alias)) {
            const replacement = fileAliases[alias];
            filename = filename.replace(alias, replacement);
        }
    }
    if (!filename.startsWith('http://') && !filename.startsWith('https://')) {
        filename = `${pathPrefix}${filename}`;
    }
    return filename;
}


/***/ }),

/***/ "./node_modules/@loaders.gl/loader-utils/dist/lib/path-utils/get-cwd.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@loaders.gl/loader-utils/dist/lib/path-utils/get-cwd.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCWD: () => (/* binding */ getCWD)
/* harmony export */ });
// loaders.gl MIT license
function getCWD() {
    if (typeof process !== 'undefined' && typeof process.cwd !== 'undefined') {
        return process.cwd();
    }
    const pathname = window.location?.pathname;
    return pathname?.slice(0, pathname.lastIndexOf('/') + 1) || '';
}


/***/ }),

/***/ "./node_modules/@loaders.gl/loader-utils/dist/lib/path-utils/path.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@loaders.gl/loader-utils/dist/lib/path-utils/path.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dirname: () => (/* binding */ dirname),
/* harmony export */   filename: () => (/* binding */ filename),
/* harmony export */   join: () => (/* binding */ join),
/* harmony export */   resolve: () => (/* binding */ resolve)
/* harmony export */ });
/* harmony import */ var _get_cwd_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-cwd.js */ "./node_modules/@loaders.gl/loader-utils/dist/lib/path-utils/get-cwd.js");
// Beginning of a minimal implementation of the Node.js path API, that doesn't pull in big polyfills.

/**
 * Replacement for Node.js path.filename
 * @param url
 */
function filename(url) {
    const slashIndex = url ? url.lastIndexOf('/') : -1;
    return slashIndex >= 0 ? url.substr(slashIndex + 1) : '';
}
/**
 * Replacement for Node.js path.dirname
 * @param url
 */
function dirname(url) {
    const slashIndex = url ? url.lastIndexOf('/') : -1;
    return slashIndex >= 0 ? url.substr(0, slashIndex) : '';
}
/**
 * Replacement for Node.js path.join
 * @param parts
 */
function join(...parts) {
    const separator = '/';
    parts = parts.map((part, index) => {
        if (index) {
            part = part.replace(new RegExp(`^${separator}`), '');
        }
        if (index !== parts.length - 1) {
            part = part.replace(new RegExp(`${separator}$`), '');
        }
        return part;
    });
    return parts.join(separator);
}
/* eslint-disable no-continue */
/**
 * https://nodejs.org/api/path.html#path_path_resolve_paths
 * @param paths A sequence of paths or path segments.
 * @return resolved path
 * Forked from BTOdell/path-resolve under MIT license
 * @see https://github.com/BTOdell/path-resolve/blob/master/LICENSE
 */
function resolve(...components) {
    const paths = [];
    for (let _i = 0; _i < components.length; _i++) {
        paths[_i] = components[_i];
    }
    let resolvedPath = '';
    let resolvedAbsolute = false;
    let cwd;
    for (let i = paths.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        let path;
        if (i >= 0) {
            path = paths[i];
        }
        else {
            if (cwd === undefined) {
                cwd = (0,_get_cwd_js__WEBPACK_IMPORTED_MODULE_0__.getCWD)();
            }
            path = cwd;
        }
        // Skip empty entries
        if (path.length === 0) {
            continue;
        }
        resolvedPath = `${path}/${resolvedPath}`;
        resolvedAbsolute = path.charCodeAt(0) === SLASH;
    }
    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)
    // Normalize the path (removes leading slash)
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
    if (resolvedAbsolute) {
        return `/${resolvedPath}`;
    }
    else if (resolvedPath.length > 0) {
        return resolvedPath;
    }
    return '.';
}
const SLASH = 47;
const DOT = 46;
/**
 * Resolves . and .. elements in a path with directory names
 * Forked from BTOdell/path-resolve under MIT license
 * @see https://github.com/BTOdell/path-resolve/blob/master/LICENSE
 */
/* eslint-disable max-depth */
// eslint-disable-next-line complexity, max-statements
function normalizeStringPosix(path, allowAboveRoot) {
    let res = '';
    let lastSlash = -1;
    let dots = 0;
    let code;
    let isAboveRoot = false;
    for (let i = 0; i <= path.length; ++i) {
        if (i < path.length) {
            code = path.charCodeAt(i);
        }
        else if (code === SLASH) {
            break;
        }
        else {
            code = SLASH;
        }
        if (code === SLASH) {
            if (lastSlash === i - 1 || dots === 1) {
                // NOOP
            }
            else if (lastSlash !== i - 1 && dots === 2) {
                if (res.length < 2 ||
                    !isAboveRoot ||
                    res.charCodeAt(res.length - 1) !== DOT ||
                    res.charCodeAt(res.length - 2) !== DOT) {
                    if (res.length > 2) {
                        const start = res.length - 1;
                        let j = start;
                        for (; j >= 0; --j) {
                            if (res.charCodeAt(j) === SLASH) {
                                break;
                            }
                        }
                        if (j !== start) {
                            res = j === -1 ? '' : res.slice(0, j);
                            lastSlash = i;
                            dots = 0;
                            isAboveRoot = false;
                            continue;
                        }
                    }
                    else if (res.length === 2 || res.length === 1) {
                        res = '';
                        lastSlash = i;
                        dots = 0;
                        isAboveRoot = false;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    if (res.length > 0) {
                        res += '/..';
                    }
                    else {
                        res = '..';
                    }
                    isAboveRoot = true;
                }
            }
            else {
                const slice = path.slice(lastSlash + 1, i);
                if (res.length > 0) {
                    res += `/${slice}`;
                }
                else {
                    res = slice;
                }
                isAboveRoot = false;
            }
            lastSlash = i;
            dots = 0;
        }
        else if (code === DOT && dots !== -1) {
            ++dots;
        }
        else {
            dots = -1;
        }
    }
    return res;
}


/***/ }),

/***/ "./node_modules/@loaders.gl/loader-utils/dist/lib/worker-loader-utils/parse-with-worker.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@loaders.gl/loader-utils/dist/lib/worker-loader-utils/parse-with-worker.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canParseWithWorker: () => (/* binding */ canParseWithWorker),
/* harmony export */   parseWithWorker: () => (/* binding */ parseWithWorker)
/* harmony export */ });
/* harmony import */ var _loaders_gl_worker_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @loaders.gl/worker-utils */ "./node_modules/@loaders.gl/worker-utils/dist/lib/worker-farm/worker-farm.js");
/* harmony import */ var _loaders_gl_worker_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @loaders.gl/worker-utils */ "./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/globals.js");
/* harmony import */ var _loaders_gl_worker_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @loaders.gl/worker-utils */ "./node_modules/@loaders.gl/worker-utils/dist/lib/worker-api/get-worker-url.js");

/**
 * Determines if a loader can parse with worker
 * @param loader
 * @param options
 */
function canParseWithWorker(loader, options) {
    if (!_loaders_gl_worker_utils__WEBPACK_IMPORTED_MODULE_0__["default"].isSupported()) {
        return false;
    }
    // Node workers are still experimental
    if (!_loaders_gl_worker_utils__WEBPACK_IMPORTED_MODULE_1__.isBrowser && !options?._nodeWorkers) {
        return false;
    }
    return loader.worker && options?.worker;
}
/**
 * this function expects that the worker function sends certain messages,
 * this can be automated if the worker is wrapper by a call to createLoaderWorker in @loaders.gl/loader-utils.
 */
async function parseWithWorker(loader, data, options, context, parseOnMainThread) {
    const name = loader.id; // TODO
    const url = (0,_loaders_gl_worker_utils__WEBPACK_IMPORTED_MODULE_2__.getWorkerURL)(loader, options);
    const workerFarm = _loaders_gl_worker_utils__WEBPACK_IMPORTED_MODULE_0__["default"].getWorkerFarm(options);
    const workerPool = workerFarm.getWorkerPool({ name, url });
    // options.log object contains functions which cannot be transferred
    // context.fetch & context.parse functions cannot be transferred
    // TODO - decide how to handle logging on workers
    options = JSON.parse(JSON.stringify(options));
    context = JSON.parse(JSON.stringify(context || {}));
    const job = await workerPool.startJob('process-on-worker', 
    // @ts-expect-error
    onMessage.bind(null, parseOnMainThread) // eslint-disable-line @typescript-eslint/no-misused-promises
    );
    job.postMessage('process', {
        // @ts-ignore
        input: data,
        options,
        context
    });
    const result = await job.result;
    // TODO - what is going on here?
    return await result.result;
}
/**
 * Handle worker's responses to the main thread
 * @param job
 * @param type
 * @param payload
 */
async function onMessage(parseOnMainThread, job, type, payload) {
    switch (type) {
        case 'done':
            job.done(payload);
            break;
        case 'error':
            job.error(new Error(payload.error));
            break;
        case 'process':
            // Worker is asking for main thread to parseO
            const { id, input, options } = payload;
            try {
                const result = await parseOnMainThread(input, options);
                job.postMessage('done', { id, result });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'unknown error';
                job.postMessage('error', { id, error: message });
            }
            break;
        default:
            // eslint-disable-next-line
            console.warn(`parse-with-worker unknown message ${type}`);
    }
}


/***/ }),

/***/ "./node_modules/@loaders.gl/obj/dist/index.js":
/*!****************************************************!*\
  !*** ./node_modules/@loaders.gl/obj/dist/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MTLLoader: () => (/* binding */ MTLLoader),
/* harmony export */   OBJLoader: () => (/* binding */ OBJLoader),
/* harmony export */   OBJWorkerLoader: () => (/* reexport safe */ _obj_loader_js__WEBPACK_IMPORTED_MODULE_0__.OBJLoader)
/* harmony export */ });
/* harmony import */ var _lib_parse_obj_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/parse-obj.js */ "./node_modules/@loaders.gl/obj/dist/lib/parse-obj.js");
/* harmony import */ var _obj_loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./obj-loader.js */ "./node_modules/@loaders.gl/obj/dist/obj-loader.js");
/* harmony import */ var _lib_parse_mtl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/parse-mtl.js */ "./node_modules/@loaders.gl/obj/dist/lib/parse-mtl.js");
/* harmony import */ var _mtl_loader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mtl-loader.js */ "./node_modules/@loaders.gl/obj/dist/mtl-loader.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright vis.gl contributors





/**
 * Loader for the OBJ geometry format
 */
const OBJLoader = {
    ..._obj_loader_js__WEBPACK_IMPORTED_MODULE_0__.OBJLoader,
    parse: async (arrayBuffer, options) => (0,_lib_parse_obj_js__WEBPACK_IMPORTED_MODULE_1__.parseOBJ)(new TextDecoder().decode(arrayBuffer), options),
    parseTextSync: (text, options) => (0,_lib_parse_obj_js__WEBPACK_IMPORTED_MODULE_1__.parseOBJ)(text, options)
};
// MTLLoader
/**
 * Loader for the MTL material format
 */
const MTLLoader = {
    ..._mtl_loader_js__WEBPACK_IMPORTED_MODULE_2__.MTLLoader,
    parse: async (arrayBuffer, options) => (0,_lib_parse_mtl_js__WEBPACK_IMPORTED_MODULE_3__.parseMTL)(new TextDecoder().decode(arrayBuffer), options?.mtl),
    parseTextSync: (text, options) => (0,_lib_parse_mtl_js__WEBPACK_IMPORTED_MODULE_3__.parseMTL)(text, options?.mtl)
};


/***/ }),

/***/ "./node_modules/@loaders.gl/obj/dist/lib/get-obj-schema.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@loaders.gl/obj/dist/lib/get-obj-schema.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getOBJSchema: () => (/* binding */ getOBJSchema)
/* harmony export */ });
/* harmony import */ var _loaders_gl_schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @loaders.gl/schema */ "./node_modules/@loaders.gl/schema/dist/lib/table/simple-table/data-type.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

/** Get Mesh Schema */
function getOBJSchema(attributes, metadata = {}) {
    const stringMetadata = {};
    for (const key in metadata) {
        if (key !== 'value') {
            stringMetadata[key] = JSON.stringify(metadata[key]);
        }
    }
    const fields = [];
    for (const attributeName in attributes) {
        const attribute = attributes[attributeName];
        const field = getFieldFromAttribute(attributeName, attribute);
        fields.push(field);
    }
    return { fields, metadata: stringMetadata };
}
/** Get a Field describing the column from an OBJ attribute */
function getFieldFromAttribute(name, attribute) {
    const metadata = {};
    for (const key in attribute) {
        if (key !== 'value') {
            metadata[key] = JSON.stringify(attribute[key]);
        }
    }
    let { type } = (0,_loaders_gl_schema__WEBPACK_IMPORTED_MODULE_0__.getDataTypeFromArray)(attribute.value);
    const isSingleValue = attribute.size === 1 || attribute.size === undefined;
    if (!isSingleValue) {
        type = { type: 'fixed-size-list', listSize: attribute.size, children: [{ name: 'values', type }] };
    }
    return { name, type, nullable: false, metadata };
}


/***/ }),

/***/ "./node_modules/@loaders.gl/obj/dist/lib/parse-mtl.js":
/*!************************************************************!*\
  !*** ./node_modules/@loaders.gl/obj/dist/lib/parse-mtl.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseMTL: () => (/* binding */ parseMTL)
/* harmony export */ });
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// Forked from THREE.js under MIT license
// https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/MTLLoader.js
const DELIMITER_PATTERN = /\s+/;
/**
 * Parses a MTL file.
 * Parses a Wavefront .mtl file specifying materials
 * http://paulbourke.net/dataformats/mtl/
 * https://www.loc.gov/preservation/digital/formats/fdd/fdd000508.shtml
 *
 * @param  text - Content of MTL file
 */
// eslint-disable-next-line complexity
function parseMTL(text, options) {
    // const materialsInfo: Record<string, MTLMaterial> = {};
    const materials = [];
    let currentMaterial = { name: 'placeholder' };
    const lines = text.split('\n');
    for (let line of lines) {
        line = line.trim();
        if (line.length === 0 || line.charAt(0) === '#') {
            // Blank line or comment ignore
            continue; // eslint-disable-line no-continue
        }
        const pos = line.indexOf(' ');
        let key = pos >= 0 ? line.substring(0, pos) : line;
        key = key.toLowerCase();
        let value = pos >= 0 ? line.substring(pos + 1) : '';
        value = value.trim();
        switch (key) {
            case 'newmtl':
                // New material
                currentMaterial = { name: value };
                // insert into map
                materials.push(currentMaterial);
                break;
            case 'ka': // Ka
                currentMaterial.ambientColor = parseColor(value);
                break;
            case 'kd':
                // Kd: Diffuse color (color under white light) using RGB values
                currentMaterial.diffuseColor = parseColor(value);
                break;
            case 'map_kd':
                // Diffuse texture map
                currentMaterial.diffuseTextureUrl = value;
                //         setMapForType('map', value);
                break;
            case 'ks':
                // Specular color (color when light is reflected from shiny surface) using RGB values
                currentMaterial.specularColor = parseColor(value);
                break;
            case 'map_ks':
                // Specular map
                currentMaterial.specularTextureUrl = value;
                // setMapForType('specularMap', value);
                break;
            case 'ke':
                // Emissive using RGB values
                currentMaterial.emissiveColor = parseColor(value);
                break;
            case 'map_ke':
                // Emissive map
                currentMaterial.emissiveTextureUrl = value;
                // setMapForType('emissiveMap', value);
                break;
            case 'ns':
                // Ns is material specular exponent (defines the focus of the specular highlight)
                // A high exponent results in a tight, concentrated highlight. Ns values normally range from 0 to 1000.
                currentMaterial.shininess = parseFloat(value);
                break;
            case 'map_ns':
                // Ns is material specular exponent
                // TODO?
                // currentMaterial.shininessMap = parseFloat(value);
                break;
            case 'ni':
                currentMaterial.refraction = parseFloat(value);
                break;
            case 'illum':
                currentMaterial.illumination = parseFloat(value);
                break;
            default:
                // log unknown message?
                break;
            /*
            case 'norm':
              setMapForType('normalMap', value);
              break;
      
            case 'map_bump':
            case 'bump':
              // Bump texture map
              setMapForType('bumpMap', value);
              break;
      
            case 'd':
              n = parseFloat(value);
              if (n < 1) {
                params.opacity = n;
                params.transparent = true;
              }
              break;
      
            case 'map_d':
              // Alpha map
              setMapForType('alphaMap', value);
              params.transparent = true;
              break;
      
            case 'tr':
              n = parseFloat(value);
              if (this.options && this.options.invertTrProperty) n = 1 - n;
              if (n > 0) {
                params.opacity = 1 - n;
                params.transparent = true;
              }
            */
        }
    }
    return materials;
}
function parseColor(value, options) {
    const rgb = value.split(DELIMITER_PATTERN, 3);
    const color = [
        parseFloat(rgb[0]),
        parseFloat(rgb[1]),
        parseFloat(rgb[2])
    ];
    // TODO auto detect big values?
    // if (this.options && this.options.normalizeRGB) {
    //   value = [ value[ 0 ] / 255, value[ 1 ] / 255, value[ 2 ] / 255 ];
    // }
    // if (this.options && this.options.ignoreZeroRGBs) {
    //   if (value[ 0 ] === 0 && value[ 1 ] === 0 && value[ 2 ] === 0) {
    //     // ignore
    //     save = false;
    //   }
    // }
    return color;
}
/* TODO parse url options
function parseTexture(value, matParams) {
  const texParams = {
    scale: new Vector2(1, 1),
    offset: new Vector2(0, 0)
  };

  const items = value.split(/\s+/);
  let pos;

  pos = items.indexOf('-bm');
  if (pos >= 0) {
    matParams.bumpScale = parseFloat(items[ pos + 1 ]);
    items.splice(pos, 2);
  }

  pos = items.indexOf('-s');
  if (pos >= 0) {
    texParams.scale.set(parseFloat(items[ pos + 1 ]), parseFloat(items[ pos + 2 ]));
    items.splice(pos, 4); // we expect 3 parameters here!

  }

  pos = items.indexOf('-o');

  if (pos >= 0) {
    texParams.offset.set(parseFloat(items[ pos + 1 ]), parseFloat(items[ pos + 2 ]));
    items.splice(pos, 4); // we expect 3 parameters here!
  }

  texParams.url = items.join(' ').trim();
  return texParams;
}

 *function resolveURL(baseUrl, url) {
 * baseUrl?: string;
    // Absolute URL
    if (/^https?:\/\//i.test(url)) return url;
    return baseUrl + url;
  }

  function setMapForType(mapType, value) {
    if (params[ mapType ]) return; // Keep the first encountered texture

    const texParams = scope.getTextureParams(value, params);
    const map = scope.loadTexture(resolveURL(scope.baseUrl, texParams.url));

    map.repeat.copy(texParams.scale);
    map.offset.copy(texParams.offset);

    map.wrapS = scope.wrap;
    map.wrapT = scope.wrap;

    params[ mapType ] = map;
  }
*/


/***/ }),

/***/ "./node_modules/@loaders.gl/obj/dist/lib/parse-obj-meshes.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@loaders.gl/obj/dist/lib/parse-obj-meshes.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseOBJMeshes: () => (/* binding */ parseOBJMeshes)
/* harmony export */ });
// OBJ Loader, adapted from THREE.js (MIT license)
//
// Attributions per original THREE.js source file:
//
// @author mrdoob / http://mrdoob.com/
// @ts-nocheck
// o object_name | g group_name
const OBJECT_RE = /^[og]\s*(.+)?/;
// mtllib file_reference
const MATERIAL_RE = /^mtllib /;
// usemtl material_name
const MATERIAL_USE_RE = /^usemtl /;
class MeshMaterial {
    constructor({ index, name = '', mtllib, smooth, groupStart }) {
        this.index = index;
        this.name = name;
        this.mtllib = mtllib;
        this.smooth = smooth;
        this.groupStart = groupStart;
        this.groupEnd = -1;
        this.groupCount = -1;
        this.inherited = false;
    }
    clone(index = this.index) {
        return new MeshMaterial({
            index,
            name: this.name,
            mtllib: this.mtllib,
            smooth: this.smooth,
            groupStart: 0
        });
    }
}
class MeshObject {
    constructor(name = '') {
        this.name = name;
        this.geometry = {
            vertices: [],
            normals: [],
            colors: [],
            uvs: []
        };
        this.materials = [];
        this.smooth = true;
        this.fromDeclaration = null;
    }
    startMaterial(name, libraries) {
        const previous = this._finalize(false);
        // New usemtl declaration overwrites an inherited material, except if faces were declared
        // after the material, then it must be preserved for proper MultiMaterial continuation.
        if (previous && (previous.inherited || previous.groupCount <= 0)) {
            this.materials.splice(previous.index, 1);
        }
        const material = new MeshMaterial({
            index: this.materials.length,
            name,
            mtllib: Array.isArray(libraries) && libraries.length > 0 ? libraries[libraries.length - 1] : '',
            smooth: previous !== undefined ? previous.smooth : this.smooth,
            groupStart: previous !== undefined ? previous.groupEnd : 0
        });
        this.materials.push(material);
        return material;
    }
    currentMaterial() {
        if (this.materials.length > 0) {
            return this.materials[this.materials.length - 1];
        }
        return undefined;
    }
    _finalize(end) {
        const lastMultiMaterial = this.currentMaterial();
        if (lastMultiMaterial && lastMultiMaterial.groupEnd === -1) {
            lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
            lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
            lastMultiMaterial.inherited = false;
        }
        // Ignore objects tail materials if no face declarations followed them before a new o/g started.
        if (end && this.materials.length > 1) {
            for (let mi = this.materials.length - 1; mi >= 0; mi--) {
                if (this.materials[mi].groupCount <= 0) {
                    this.materials.splice(mi, 1);
                }
            }
        }
        // Guarantee at least one empty material, this makes the creation later more straight forward.
        if (end && this.materials.length === 0) {
            this.materials.push({
                name: '',
                smooth: this.smooth
            });
        }
        return lastMultiMaterial;
    }
}
class ParserState {
    constructor() {
        this.objects = [];
        this.object = null;
        this.vertices = [];
        this.normals = [];
        this.colors = [];
        this.uvs = [];
        this.materialLibraries = [];
        this.startObject('', false);
    }
    startObject(name, fromDeclaration = true) {
        // If the current object (initial from reset) is not from a g/o declaration in the parsed
        // file. We need to use it for the first parsed g/o to keep things in sync.
        if (this.object && !this.object.fromDeclaration) {
            this.object.name = name;
            this.object.fromDeclaration = fromDeclaration;
            return;
        }
        const previousMaterial = this.object && typeof this.object.currentMaterial === 'function'
            ? this.object.currentMaterial()
            : undefined;
        if (this.object && typeof this.object._finalize === 'function') {
            this.object._finalize(true);
        }
        this.object = new MeshObject(name);
        this.object.fromDeclaration = fromDeclaration;
        // Inherit previous objects material.
        // Spec tells us that a declared material must be set to all objects until a new material is declared.
        // If a usemtl declaration is encountered while this new object is being parsed, it will
        // overwrite the inherited material. Exception being that there was already face declarations
        // to the inherited material, then it will be preserved for proper MultiMaterial continuation.
        if (previousMaterial && previousMaterial.name && typeof previousMaterial.clone === 'function') {
            const declared = previousMaterial.clone(0);
            declared.inherited = true;
            this.object.materials.push(declared);
        }
        this.objects.push(this.object);
    }
    finalize() {
        if (this.object && typeof this.object._finalize === 'function') {
            this.object._finalize(true);
        }
    }
    parseVertexIndex(value, len) {
        const index = parseInt(value);
        return (index >= 0 ? index - 1 : index + len / 3) * 3;
    }
    parseNormalIndex(value, len) {
        const index = parseInt(value);
        return (index >= 0 ? index - 1 : index + len / 3) * 3;
    }
    parseUVIndex(value, len) {
        const index = parseInt(value);
        return (index >= 0 ? index - 1 : index + len / 2) * 2;
    }
    addVertex(a, b, c) {
        const src = this.vertices;
        const dst = this.object.geometry.vertices;
        dst.push(src[a + 0], src[a + 1], src[a + 2]);
        dst.push(src[b + 0], src[b + 1], src[b + 2]);
        dst.push(src[c + 0], src[c + 1], src[c + 2]);
    }
    addVertexPoint(a) {
        const src = this.vertices;
        const dst = this.object.geometry.vertices;
        dst.push(src[a + 0], src[a + 1], src[a + 2]);
    }
    addVertexLine(a) {
        const src = this.vertices;
        const dst = this.object.geometry.vertices;
        dst.push(src[a + 0], src[a + 1], src[a + 2]);
    }
    addNormal(a, b, c) {
        const src = this.normals;
        const dst = this.object.geometry.normals;
        dst.push(src[a + 0], src[a + 1], src[a + 2]);
        dst.push(src[b + 0], src[b + 1], src[b + 2]);
        dst.push(src[c + 0], src[c + 1], src[c + 2]);
    }
    addColor(a, b, c) {
        const src = this.colors;
        const dst = this.object.geometry.colors;
        dst.push(src[a + 0], src[a + 1], src[a + 2]);
        dst.push(src[b + 0], src[b + 1], src[b + 2]);
        dst.push(src[c + 0], src[c + 1], src[c + 2]);
    }
    addUV(a, b, c) {
        const src = this.uvs;
        const dst = this.object.geometry.uvs;
        dst.push(src[a + 0], src[a + 1]);
        dst.push(src[b + 0], src[b + 1]);
        dst.push(src[c + 0], src[c + 1]);
    }
    addUVLine(a) {
        const src = this.uvs;
        const dst = this.object.geometry.uvs;
        dst.push(src[a + 0], src[a + 1]);
    }
    // eslint-disable-next-line max-params
    addFace(a, b, c, ua, ub, uc, na, nb, nc) {
        const vLen = this.vertices.length;
        let ia = this.parseVertexIndex(a, vLen);
        let ib = this.parseVertexIndex(b, vLen);
        let ic = this.parseVertexIndex(c, vLen);
        this.addVertex(ia, ib, ic);
        if (ua !== undefined && ua !== '') {
            const uvLen = this.uvs.length;
            ia = this.parseUVIndex(ua, uvLen);
            ib = this.parseUVIndex(ub, uvLen);
            ic = this.parseUVIndex(uc, uvLen);
            this.addUV(ia, ib, ic);
        }
        if (na !== undefined && na !== '') {
            // Normals are many times the same. If so, skip function call and parseInt.
            const nLen = this.normals.length;
            ia = this.parseNormalIndex(na, nLen);
            ib = na === nb ? ia : this.parseNormalIndex(nb, nLen);
            ic = na === nc ? ia : this.parseNormalIndex(nc, nLen);
            this.addNormal(ia, ib, ic);
        }
        if (this.colors.length > 0) {
            this.addColor(ia, ib, ic);
        }
    }
    addPointGeometry(vertices) {
        this.object.geometry.type = 'Points';
        const vLen = this.vertices.length;
        for (const vertex of vertices) {
            this.addVertexPoint(this.parseVertexIndex(vertex, vLen));
        }
    }
    addLineGeometry(vertices, uvs) {
        this.object.geometry.type = 'Line';
        const vLen = this.vertices.length;
        const uvLen = this.uvs.length;
        for (const vertex of vertices) {
            this.addVertexLine(this.parseVertexIndex(vertex, vLen));
        }
        for (const uv of uvs) {
            this.addUVLine(this.parseUVIndex(uv, uvLen));
        }
    }
}
// eslint-disable-next-line max-statements, complexity
function parseOBJMeshes(text) {
    const state = new ParserState();
    if (text.indexOf('\r\n') !== -1) {
        // This is faster than String.split with regex that splits on both
        text = text.replace(/\r\n/g, '\n');
    }
    if (text.indexOf('\\\n') !== -1) {
        // join lines separated by a line continuation character (\)
        text = text.replace(/\\\n/g, '');
    }
    const lines = text.split('\n');
    let line = '';
    let lineFirstChar = '';
    let lineLength = 0;
    let result = [];
    // Faster to just trim left side of the line. Use if available.
    const trimLeft = typeof ''.trimLeft === 'function';
    /* eslint-disable no-continue, max-depth */
    for (let i = 0, l = lines.length; i < l; i++) {
        line = lines[i];
        line = trimLeft ? line.trimLeft() : line.trim();
        lineLength = line.length;
        if (lineLength === 0)
            continue;
        lineFirstChar = line.charAt(0);
        // @todo invoke passed in handler if any
        if (lineFirstChar === '#')
            continue;
        if (lineFirstChar === 'v') {
            const data = line.split(/\s+/);
            switch (data[0]) {
                case 'v':
                    state.vertices.push(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));
                    if (data.length >= 7) {
                        state.colors.push(parseFloat(data[4]), parseFloat(data[5]), parseFloat(data[6]));
                    }
                    break;
                case 'vn':
                    state.normals.push(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));
                    break;
                case 'vt':
                    state.uvs.push(parseFloat(data[1]), parseFloat(data[2]));
                    break;
                default:
            }
        }
        else if (lineFirstChar === 'f') {
            const lineData = line.substr(1).trim();
            const vertexData = lineData.split(/\s+/);
            const faceVertices = [];
            // Parse the face vertex data into an easy to work with format
            for (let j = 0, jl = vertexData.length; j < jl; j++) {
                const vertex = vertexData[j];
                if (vertex.length > 0) {
                    const vertexParts = vertex.split('/');
                    faceVertices.push(vertexParts);
                }
            }
            // Draw an edge between the first vertex and all subsequent vertices to form an n-gon
            const v1 = faceVertices[0];
            for (let j = 1, jl = faceVertices.length - 1; j < jl; j++) {
                const v2 = faceVertices[j];
                const v3 = faceVertices[j + 1];
                state.addFace(v1[0], v2[0], v3[0], v1[1], v2[1], v3[1], v1[2], v2[2], v3[2]);
            }
        }
        else if (lineFirstChar === 'l') {
            const lineParts = line.substring(1).trim().split(' ');
            let lineVertices;
            const lineUVs = [];
            if (line.indexOf('/') === -1) {
                lineVertices = lineParts;
            }
            else {
                lineVertices = [];
                for (let li = 0, llen = lineParts.length; li < llen; li++) {
                    const parts = lineParts[li].split('/');
                    if (parts[0] !== '')
                        lineVertices.push(parts[0]);
                    if (parts[1] !== '')
                        lineUVs.push(parts[1]);
                }
            }
            state.addLineGeometry(lineVertices, lineUVs);
        }
        else if (lineFirstChar === 'p') {
            const lineData = line.substr(1).trim();
            const pointData = lineData.split(' ');
            state.addPointGeometry(pointData);
        }
        else if ((result = OBJECT_RE.exec(line)) !== null) {
            // o object_name
            // or
            // g group_name
            // WORKAROUND: https://bugs.chromium.org/p/v8/issues/detail?id=2869
            // var name = result[ 0 ].substr( 1 ).trim();
            const name = (' ' + result[0].substr(1).trim()).substr(1); // eslint-disable-line
            state.startObject(name);
        }
        else if (MATERIAL_USE_RE.test(line)) {
            // material
            state.object.startMaterial(line.substring(7).trim(), state.materialLibraries);
        }
        else if (MATERIAL_RE.test(line)) {
            // mtl file
            state.materialLibraries.push(line.substring(7).trim());
        }
        else if (lineFirstChar === 's') {
            result = line.split(' ');
            // smooth shading
            // @todo Handle files that have varying smooth values for a set of faces inside one geometry,
            // but does not define a usemtl for each face set.
            // This should be detected and a dummy material created (later MultiMaterial and geometry groups).
            // This requires some care to not create extra material on each smooth value for "normal" obj files.
            // where explicit usemtl defines geometry groups.
            // Example asset: examples/models/obj/cerberus/Cerberus.obj
            /*
             * http://paulbourke.net/dataformats/obj/
             * or
             * http://www.cs.utah.edu/~boulos/cs3505/obj_spec.pdf
             *
             * From chapter "Grouping" Syntax explanation "s group_number":
             * "group_number is the smoothing group number. To turn off smoothing groups, use a value of 0 or off.
             * Polygonal elements use group numbers to put elements in different smoothing groups. For free-form
             * surfaces, smoothing groups are either turned on or off; there is no difference between values greater
             * than 0."
             */
            if (result.length > 1) {
                const value = result[1].trim().toLowerCase();
                state.object.smooth = value !== '0' && value !== 'off';
            }
            else {
                // ZBrush can produce "s" lines #11707
                state.object.smooth = true;
            }
            const material = state.object.currentMaterial();
            if (material)
                material.smooth = state.object.smooth;
        }
        else {
            // Handle null terminated files without exception
            if (line === '\0')
                continue;
            throw new Error(`Unexpected line: "${line}"`);
        }
    }
    state.finalize();
    const meshes = [];
    const materials = [];
    for (const object of state.objects) {
        const { geometry } = object;
        // Skip o/g line declarations that did not follow with any faces
        if (geometry.vertices.length === 0)
            continue;
        const mesh = {
            header: {
                vertexCount: geometry.vertices.length / 3
            },
            attributes: {}
        };
        switch (geometry.type) {
            case 'Points':
                mesh.mode = 0; // GL.POINTS
                break;
            case 'Line':
                mesh.mode = 1; // GL.LINES
                break;
            default:
                mesh.mode = 4; // GL.TRIANGLES
                break;
        }
        mesh.attributes.POSITION = { value: new Float32Array(geometry.vertices), size: 3 };
        if (geometry.normals.length > 0) {
            mesh.attributes.NORMAL = { value: new Float32Array(geometry.normals), size: 3 };
        }
        if (geometry.colors.length > 0) {
            mesh.attributes.COLOR_0 = { value: new Float32Array(geometry.colors), size: 3 };
        }
        if (geometry.uvs.length > 0) {
            mesh.attributes.TEXCOORD_0 = { value: new Float32Array(geometry.uvs), size: 2 };
        }
        // Create materials
        mesh.materials = [];
        for (const sourceMaterial of object.materials) {
            // TODO - support full spec
            const _material = {
                name: sourceMaterial.name,
                flatShading: !sourceMaterial.smooth
            };
            mesh.materials.push(_material);
            materials.push(_material);
        }
        mesh.name = object.name;
        meshes.push(mesh);
    }
    return { meshes, materials };
}


/***/ }),

/***/ "./node_modules/@loaders.gl/obj/dist/lib/parse-obj.js":
/*!************************************************************!*\
  !*** ./node_modules/@loaders.gl/obj/dist/lib/parse-obj.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseOBJ: () => (/* binding */ parseOBJ)
/* harmony export */ });
/* harmony import */ var _loaders_gl_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @loaders.gl/schema */ "./node_modules/@loaders.gl/schema/dist/lib/mesh/mesh-utils.js");
/* harmony import */ var _parse_obj_meshes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse-obj-meshes.js */ "./node_modules/@loaders.gl/obj/dist/lib/parse-obj-meshes.js");
/* harmony import */ var _get_obj_schema_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-obj-schema.js */ "./node_modules/@loaders.gl/obj/dist/lib/get-obj-schema.js");



function parseOBJ(text, options) {
    const { meshes } = (0,_parse_obj_meshes_js__WEBPACK_IMPORTED_MODULE_0__.parseOBJMeshes)(text);
    // @ts-expect-error
    const vertexCount = meshes.reduce((s, mesh) => s + mesh.header.vertexCount, 0);
    // TODO - render objects separately
    const attributes = mergeAttributes(meshes, vertexCount);
    const header = {
        vertexCount,
        // @ts-ignore Need to export Attributes type
        boundingBox: (0,_loaders_gl_schema__WEBPACK_IMPORTED_MODULE_1__.getMeshBoundingBox)(attributes)
    };
    const schema = (0,_get_obj_schema_js__WEBPACK_IMPORTED_MODULE_2__.getOBJSchema)(attributes, {
        mode: 4,
        boundingBox: header.boundingBox
    });
    return {
        // Data return by this loader implementation
        loaderData: {
            header: {}
        },
        // Normalised data
        schema,
        header,
        mode: 4, // TRIANGLES
        topology: 'point-list',
        attributes
    };
}
// eslint-disable-next-line max-statements
function mergeAttributes(meshes, vertexCount) {
    const positions = new Float32Array(vertexCount * 3);
    let normals;
    let colors;
    let uvs;
    let i = 0;
    for (const mesh of meshes) {
        const { POSITION, NORMAL, COLOR_0, TEXCOORD_0 } = mesh.attributes;
        positions.set(POSITION.value, i * 3);
        if (NORMAL) {
            normals = normals || new Float32Array(vertexCount * 3);
            normals.set(NORMAL.value, i * 3);
        }
        if (COLOR_0) {
            colors = colors || new Float32Array(vertexCount * 3);
            colors.set(COLOR_0.value, i * 3);
        }
        if (TEXCOORD_0) {
            uvs = uvs || new Float32Array(vertexCount * 2);
            uvs.set(TEXCOORD_0.value, i * 2);
        }
        i += POSITION.value.length / 3;
    }
    const attributes = {};
    attributes.POSITION = { value: positions, size: 3 };
    if (normals) {
        attributes.NORMAL = { value: normals, size: 3 };
    }
    if (colors) {
        attributes.COLOR_0 = { value: colors, size: 3 };
    }
    if (uvs) {
        attributes.TEXCOORD_0 = { value: uvs, size: 2 };
    }
    return attributes;
}


/***/ }),

/***/ "./node_modules/@loaders.gl/obj/dist/mtl-loader.js":
/*!*********************************************************!*\
  !*** ./node_modules/@loaders.gl/obj/dist/mtl-loader.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MTLLoader: () => (/* binding */ MTLLoader)
/* harmony export */ });
// __VERSION__ is injected by babel-plugin-version-inline
// @ts-ignore TS2304: Cannot find name '__VERSION__'.
const VERSION =  true ? "4.3.2" : 0;
/**
 * Loader for the MTL material format
 * Parses a Wavefront .mtl file specifying materials
 */
const MTLLoader = {
    dataType: null,
    batchType: null,
    name: 'MTL',
    id: 'mtl',
    module: 'mtl',
    version: VERSION,
    worker: true,
    extensions: ['mtl'],
    mimeTypes: ['text/plain'],
    testText: (text) => text.includes('newmtl'),
    options: {
        mtl: {}
    }
};


/***/ }),

/***/ "./node_modules/@loaders.gl/obj/dist/obj-loader.js":
/*!*********************************************************!*\
  !*** ./node_modules/@loaders.gl/obj/dist/obj-loader.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJLoader: () => (/* binding */ OBJLoader)
/* harmony export */ });
// __VERSION__ is injected by babel-plugin-version-inline
// @ts-ignore TS2304: Cannot find name '__VERSION__'.
const VERSION =  true ? "4.3.2" : 0;
/**
 * Worker loader for the OBJ geometry format
 */
const OBJLoader = {
    dataType: null,
    batchType: null,
    name: 'OBJ',
    id: 'obj',
    module: 'obj',
    version: VERSION,
    worker: true,
    extensions: ['obj'],
    mimeTypes: ['text/plain'],
    testText: testOBJFile,
    options: {
        obj: {}
    }
};
function testOBJFile(text) {
    // TODO - There could be comment line first
    return text[0] === 'v';
}


/***/ }),

/***/ "./node_modules/@loaders.gl/schema/dist/lib/mesh/mesh-utils.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@loaders.gl/schema/dist/lib/mesh/mesh-utils.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getMeshBoundingBox: () => (/* binding */ getMeshBoundingBox),
/* harmony export */   getMeshSize: () => (/* binding */ getMeshSize)
/* harmony export */ });
/**
 * Get number of vertices in mesh
 * @param attributes
 */
function getMeshSize(attributes) {
    let size = 0;
    for (const attributeName in attributes) {
        const attribute = attributes[attributeName];
        if (ArrayBuffer.isView(attribute)) {
            // @ts-ignore DataView doesn't have BYTES_PER_ELEMENT
            size += attribute.byteLength * attribute.BYTES_PER_ELEMENT;
        }
    }
    return size;
}
/**
 * Get the (axis aligned) bounding box of a mesh
 * @param attributes
 * @returns array of two vectors representing the axis aligned bounding box
 */
// eslint-disable-next-line complexity
function getMeshBoundingBox(attributes) {
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    const positions = attributes.POSITION ? attributes.POSITION.value : [];
    const len = positions && positions.length;
    for (let i = 0; i < len; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        minX = x < minX ? x : minX;
        minY = y < minY ? y : minY;
        minZ = z < minZ ? z : minZ;
        maxX = x > maxX ? x : maxX;
        maxY = y > maxY ? y : maxY;
        maxZ = z > maxZ ? z : maxZ;
    }
    return [
        [minX, minY, minZ],
        [maxX, maxY, maxZ]
    ];
}


/***/ }),

/***/ "./node_modules/@loaders.gl/schema/dist/lib/table/simple-table/data-type.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@loaders.gl/schema/dist/lib/table/simple-table/data-type.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getArrayTypeFromDataType: () => (/* binding */ getArrayTypeFromDataType),
/* harmony export */   getDataTypeFromArray: () => (/* binding */ getDataTypeFromArray),
/* harmony export */   getDataTypeFromTypedArray: () => (/* binding */ getDataTypeFromTypedArray),
/* harmony export */   getDataTypeFromValue: () => (/* binding */ getDataTypeFromValue)
/* harmony export */ });
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
/** Deduce column types from values */
function getDataTypeFromValue(value, defaultNumberType = 'float32') {
    if (value instanceof Date) {
        return 'date-millisecond';
    }
    if (value instanceof Number) {
        return defaultNumberType;
    }
    if (typeof value === 'string') {
        return 'utf8';
    }
    if (value === null || value === 'undefined') {
        return 'null';
    }
    return 'null';
}
/**
 * Deduces a simple data type "descriptor from a typed array instance
 */
function getDataTypeFromArray(array) {
    let type = getDataTypeFromTypedArray(array);
    if (type !== 'null') {
        return { type, nullable: false };
    }
    if (array.length > 0) {
        type = getDataTypeFromValue(array[0]);
        return { type, nullable: true };
    }
    return { type: 'null', nullable: true };
}
/**
 * Deduces a simple data type "descriptor from a typed array instance
 */
function getDataTypeFromTypedArray(array) {
    switch (array.constructor) {
        case Int8Array:
            return 'int8';
        case Uint8Array:
        case Uint8ClampedArray:
            return 'uint8';
        case Int16Array:
            return 'int16';
        case Uint16Array:
            return 'uint16';
        case Int32Array:
            return 'int32';
        case Uint32Array:
            return 'uint32';
        case Float32Array:
            return 'float32';
        case Float64Array:
            return 'float64';
        default:
            return 'null';
    }
}
function getArrayTypeFromDataType(type, nullable) {
    if (!nullable) {
        switch (type) {
            case 'int8':
                return Int8Array;
            case 'uint8':
                return Uint8Array;
            case 'int16':
                return Int16Array;
            case 'uint16':
                return Uint16Array;
            case 'int32':
                return Int32Array;
            case 'uint32':
                return Uint32Array;
            case 'float32':
                return Float32Array;
            case 'float64':
                return Float64Array;
            default:
                break;
        }
    }
    // if (typeof BigInt64Array !== 'undefined') {
    //   TYPED_ARRAY_TO_TYPE.BigInt64Array = new Int64();
    //   TYPED_ARRAY_TO_TYPE.BigUint64Array = new Uint64();
    // }
    return Array;
}


/***/ }),

/***/ "./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/assert.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/assert.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assert: () => (/* binding */ assert)
/* harmony export */ });
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// Replacement for the external assert method to reduce bundle size
// Note: We don't use the second "message" argument in calling code,
// so no need to support it here
/** Throws an `Error` with the optional `message` if `condition` is falsy */
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'loaders.gl assertion failed.');
    }
}


/***/ }),

/***/ "./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/globals.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/globals.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   document: () => (/* binding */ document_),
/* harmony export */   global: () => (/* binding */ global_),
/* harmony export */   isBrowser: () => (/* binding */ isBrowser),
/* harmony export */   isMobile: () => (/* binding */ isMobile),
/* harmony export */   isWorker: () => (/* binding */ isWorker),
/* harmony export */   nodeVersion: () => (/* binding */ nodeVersion),
/* harmony export */   self: () => (/* binding */ self_),
/* harmony export */   window: () => (/* binding */ window_)
/* harmony export */ });
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// Purpose: include this in your module to avoids adding dependencies on
// micro modules like 'global' and 'is-browser';
/* eslint-disable no-restricted-globals */
const globals = {
    self: typeof self !== 'undefined' && self,
    window: typeof window !== 'undefined' && window,
    global: typeof global !== 'undefined' && global,
    document: typeof document !== 'undefined' && document
};
const self_ = globals.self || globals.window || globals.global || {};
const window_ = globals.window || globals.self || globals.global || {};
const global_ = globals.global || globals.self || globals.window || {};
const document_ = globals.document || {};

/** true if running in the browser, false if running in Node.js */
const isBrowser = 
// @ts-ignore process.browser
typeof process !== 'object' || String(process) !== '[object process]' || process.browser;
/** true if running on a worker thread */
const isWorker = typeof importScripts === 'function';
/** true if running on a mobile device */
const isMobile = typeof window !== 'undefined' && typeof window.orientation !== 'undefined';
// Extract node major version
const matches = typeof process !== 'undefined' && process.version && /v([0-9]*)/.exec(process.version);
/** Version of Node.js if running under Node, otherwise 0 */
const nodeVersion = (matches && parseFloat(matches[1])) || 0;


/***/ }),

/***/ "./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/version.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/version.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NPM_TAG: () => (/* binding */ NPM_TAG),
/* harmony export */   VERSION: () => (/* binding */ VERSION)
/* harmony export */ });
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// Version constant cannot be imported, it needs to correspond to the build version of **this** module.
/**
 * TODO - unpkg.com doesn't seem to have a `latest` specifier for alpha releases...
 * 'beta' on beta branch, 'latest' on prod branch
 */
const NPM_TAG = 'latest';
function getVersion() {
    if (!globalThis._loadersgl_?.version) {
        globalThis._loadersgl_ = globalThis._loadersgl_ || {};
        // __VERSION__ is injected by babel-plugin-version-inline
        if (false) {}
        else {
            globalThis._loadersgl_.version = "4.3.2";
        }
    }
    return globalThis._loadersgl_.version;
}
const VERSION = getVersion();


/***/ }),

/***/ "./node_modules/@loaders.gl/worker-utils/dist/lib/node/worker_threads-browser.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@loaders.gl/worker-utils/dist/lib/node/worker_threads-browser.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeWorker: () => (/* binding */ NodeWorker),
/* harmony export */   parentPort: () => (/* binding */ parentPort)
/* harmony export */ });
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
/** Browser polyfill for Node.js built-in `worker_threads` module.
 * These fills are non-functional, and just intended to ensure that
 * `import 'worker_threads` doesn't break browser builds.
 * The replacement is done in package.json browser field
 */
class NodeWorker {
    terminate() { }
}
const parentPort = null;


/***/ }),

/***/ "./node_modules/@loaders.gl/worker-utils/dist/lib/worker-api/get-worker-url.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@loaders.gl/worker-utils/dist/lib/worker-api/get-worker-url.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getWorkerName: () => (/* binding */ getWorkerName),
/* harmony export */   getWorkerURL: () => (/* binding */ getWorkerURL)
/* harmony export */ });
/* harmony import */ var _env_utils_assert_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../env-utils/assert.js */ "./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/assert.js");
/* harmony import */ var _env_utils_globals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../env-utils/globals.js */ "./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/globals.js");
/* harmony import */ var _env_utils_version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../env-utils/version.js */ "./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/version.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors



/**
 * Gets worker object's name (for debugging in Chrome thread inspector window)
 */
function getWorkerName(worker) {
    const warning = worker.version !== _env_utils_version_js__WEBPACK_IMPORTED_MODULE_0__.VERSION ? ` (worker-utils@${_env_utils_version_js__WEBPACK_IMPORTED_MODULE_0__.VERSION})` : '';
    return `${worker.name}@${worker.version}${warning}`;
}
/**
 * Generate a worker URL based on worker object and options
 * @returns A URL to one of the following:
 * - a published worker on unpkg CDN
 * - a local test worker
 * - a URL provided by the user in options
 */
function getWorkerURL(worker, options = {}) {
    const workerOptions = options[worker.id] || {};
    const workerFile = _env_utils_globals_js__WEBPACK_IMPORTED_MODULE_1__.isBrowser ? `${worker.id}-worker.js` : `${worker.id}-worker-node.js`;
    let url = workerOptions.workerUrl;
    // HACK: Allow for non-nested workerUrl for the CompressionWorker.
    // For the compression worker, workerOptions is currently not nested correctly. For most loaders,
    // you'd have options within an object, i.e. `{mvt: {coordinates: ...}}` but the CompressionWorker
    // puts options at the top level, not within a `compression` key (its `id`). For this reason, the
    // above `workerOptions` will always be a string (i.e. `'gzip'`) for the CompressionWorker. To not
    // break backwards compatibility, we allow the CompressionWorker to have options at the top level.
    if (!url && worker.id === 'compression') {
        url = options.workerUrl;
    }
    // If URL is test, generate local loaders.gl url
    // @ts-ignore _workerType
    if (options._workerType === 'test') {
        if (_env_utils_globals_js__WEBPACK_IMPORTED_MODULE_1__.isBrowser) {
            url = `modules/${worker.module}/dist/${workerFile}`;
        }
        else {
            // In the test environment the ts-node loader requires TypeScript code
            url = `modules/${worker.module}/src/workers/${worker.id}-worker-node.ts`;
        }
    }
    // If url override is not provided, generate a URL to published version on npm CDN unpkg.com
    if (!url) {
        // GENERATE
        let version = worker.version;
        // On master we need to load npm alpha releases published with the `beta` tag
        if (version === 'latest') {
            // throw new Error('latest worker version specified');
            version = _env_utils_version_js__WEBPACK_IMPORTED_MODULE_0__.NPM_TAG;
        }
        const versionTag = version ? `@${version}` : '';
        url = `https://unpkg.com/@loaders.gl/${worker.module}${versionTag}/dist/${workerFile}`;
    }
    (0,_env_utils_assert_js__WEBPACK_IMPORTED_MODULE_2__.assert)(url);
    // Allow user to override location
    return url;
}


/***/ }),

/***/ "./node_modules/@loaders.gl/worker-utils/dist/lib/worker-api/validate-worker-version.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@loaders.gl/worker-utils/dist/lib/worker-api/validate-worker-version.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validateWorkerVersion: () => (/* binding */ validateWorkerVersion)
/* harmony export */ });
/* harmony import */ var _env_utils_assert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../env-utils/assert.js */ "./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/assert.js");
/* harmony import */ var _env_utils_version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../env-utils/version.js */ "./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/version.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors


/**
 * Check if worker is compatible with this library version
 * @param worker
 * @param libVersion
 * @returns `true` if the two versions are compatible
 */
function validateWorkerVersion(worker, coreVersion = _env_utils_version_js__WEBPACK_IMPORTED_MODULE_0__.VERSION) {
    (0,_env_utils_assert_js__WEBPACK_IMPORTED_MODULE_1__.assert)(worker, 'no worker provided');
    const workerVersion = worker.version;
    if (!coreVersion || !workerVersion) {
        return false;
    }
    // TODO enable when fix the __version__ injection
    // const coreVersions = parseVersion(coreVersion);
    // const workerVersions = parseVersion(workerVersion);
    // assert(
    //   coreVersion.major === workerVersion.major && coreVersion.minor <= workerVersion.minor,
    //   `worker: ${worker.name} is not compatible. ${coreVersion.major}.${
    //     coreVersion.minor
    //   }+ is required.`
    // );
    return true;
}
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function parseVersion(version) {
    const parts = version.split('.').map(Number);
    return { major: parts[0], minor: parts[1] };
}


/***/ }),

/***/ "./node_modules/@loaders.gl/worker-utils/dist/lib/worker-farm/worker-farm.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@loaders.gl/worker-utils/dist/lib/worker-farm/worker-farm.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WorkerFarm)
/* harmony export */ });
/* harmony import */ var _worker_pool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./worker-pool.js */ "./node_modules/@loaders.gl/worker-utils/dist/lib/worker-farm/worker-pool.js");
/* harmony import */ var _worker_thread_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./worker-thread.js */ "./node_modules/@loaders.gl/worker-utils/dist/lib/worker-farm/worker-thread.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors


const DEFAULT_PROPS = {
    maxConcurrency: 3,
    maxMobileConcurrency: 1,
    reuseWorkers: true,
    onDebug: () => { }
};
/**
 * Process multiple jobs with a "farm" of different workers in worker pools.
 */
class WorkerFarm {
    props;
    workerPools = new Map();
    // singleton
    static _workerFarm;
    /** Checks if workers are supported on this platform */
    static isSupported() {
        return _worker_thread_js__WEBPACK_IMPORTED_MODULE_0__["default"].isSupported();
    }
    /** Get the singleton instance of the global worker farm */
    static getWorkerFarm(props = {}) {
        WorkerFarm._workerFarm = WorkerFarm._workerFarm || new WorkerFarm({});
        WorkerFarm._workerFarm.setProps(props);
        return WorkerFarm._workerFarm;
    }
    /** get global instance with WorkerFarm.getWorkerFarm() */
    constructor(props) {
        this.props = { ...DEFAULT_PROPS };
        this.setProps(props);
        /** @type Map<string, WorkerPool>} */
        this.workerPools = new Map();
    }
    /**
     * Terminate all workers in the farm
     * @note Can free up significant memory
     */
    destroy() {
        for (const workerPool of this.workerPools.values()) {
            workerPool.destroy();
        }
        this.workerPools = new Map();
    }
    /**
     * Set props used when initializing worker pools
     * @param props
     */
    setProps(props) {
        this.props = { ...this.props, ...props };
        // Update worker pool props
        for (const workerPool of this.workerPools.values()) {
            workerPool.setProps(this._getWorkerPoolProps());
        }
    }
    /**
     * Returns a worker pool for the specified worker
     * @param options - only used first time for a specific worker name
     * @param options.name - the name of the worker - used to identify worker pool
     * @param options.url -
     * @param options.source -
     * @example
     *   const job = WorkerFarm.getWorkerFarm().getWorkerPool({name, url}).startJob(...);
     */
    getWorkerPool(options) {
        const { name, source, url } = options;
        let workerPool = this.workerPools.get(name);
        if (!workerPool) {
            workerPool = new _worker_pool_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
                name,
                source,
                url
            });
            workerPool.setProps(this._getWorkerPoolProps());
            this.workerPools.set(name, workerPool);
        }
        return workerPool;
    }
    _getWorkerPoolProps() {
        return {
            maxConcurrency: this.props.maxConcurrency,
            maxMobileConcurrency: this.props.maxMobileConcurrency,
            reuseWorkers: this.props.reuseWorkers,
            onDebug: this.props.onDebug
        };
    }
}


/***/ }),

/***/ "./node_modules/@loaders.gl/worker-utils/dist/lib/worker-farm/worker-job.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@loaders.gl/worker-utils/dist/lib/worker-farm/worker-job.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WorkerJob)
/* harmony export */ });
/* harmony import */ var _env_utils_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../env-utils/assert.js */ "./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/assert.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

/**
 * Represents one Job handled by a WorkerPool or WorkerFarm
 */
class WorkerJob {
    name;
    workerThread;
    isRunning = true;
    /** Promise that resolves when Job is done */
    result;
    _resolve = () => { };
    _reject = () => { };
    constructor(jobName, workerThread) {
        this.name = jobName;
        this.workerThread = workerThread;
        this.result = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }
    /**
     * Send a message to the job's worker thread
     * @param data any data structure, ideally consisting mostly of transferrable objects
     */
    postMessage(type, payload) {
        this.workerThread.postMessage({
            source: 'loaders.gl', // Lets worker ignore unrelated messages
            type,
            payload
        });
    }
    /**
     * Call to resolve the `result` Promise with the supplied value
     */
    done(value) {
        (0,_env_utils_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert)(this.isRunning);
        this.isRunning = false;
        this._resolve(value);
    }
    /**
     * Call to reject the `result` Promise with the supplied error
     */
    error(error) {
        (0,_env_utils_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert)(this.isRunning);
        this.isRunning = false;
        this._reject(error);
    }
}


/***/ }),

/***/ "./node_modules/@loaders.gl/worker-utils/dist/lib/worker-farm/worker-pool.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@loaders.gl/worker-utils/dist/lib/worker-farm/worker-pool.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WorkerPool)
/* harmony export */ });
/* harmony import */ var _env_utils_globals_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../env-utils/globals.js */ "./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/globals.js");
/* harmony import */ var _worker_thread_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./worker-thread.js */ "./node_modules/@loaders.gl/worker-utils/dist/lib/worker-farm/worker-thread.js");
/* harmony import */ var _worker_job_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./worker-job.js */ "./node_modules/@loaders.gl/worker-utils/dist/lib/worker-farm/worker-job.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors



/**
 * Process multiple data messages with small pool of identical workers
 */
class WorkerPool {
    name = 'unnamed';
    source; // | Function;
    url;
    maxConcurrency = 1;
    maxMobileConcurrency = 1;
    onDebug = () => { };
    reuseWorkers = true;
    props = {};
    jobQueue = [];
    idleQueue = [];
    count = 0;
    isDestroyed = false;
    /** Checks if workers are supported on this platform */
    static isSupported() {
        return _worker_thread_js__WEBPACK_IMPORTED_MODULE_0__["default"].isSupported();
    }
    /**
     * @param processor - worker function
     * @param maxConcurrency - max count of workers
     */
    constructor(props) {
        this.source = props.source;
        this.url = props.url;
        this.setProps(props);
    }
    /**
     * Terminates all workers in the pool
     * @note Can free up significant memory
     */
    destroy() {
        // Destroy idle workers, active Workers will be destroyed on completion
        this.idleQueue.forEach((worker) => worker.destroy());
        this.isDestroyed = true;
    }
    setProps(props) {
        this.props = { ...this.props, ...props };
        if (props.name !== undefined) {
            this.name = props.name;
        }
        if (props.maxConcurrency !== undefined) {
            this.maxConcurrency = props.maxConcurrency;
        }
        if (props.maxMobileConcurrency !== undefined) {
            this.maxMobileConcurrency = props.maxMobileConcurrency;
        }
        if (props.reuseWorkers !== undefined) {
            this.reuseWorkers = props.reuseWorkers;
        }
        if (props.onDebug !== undefined) {
            this.onDebug = props.onDebug;
        }
    }
    async startJob(name, onMessage = (job, type, data) => job.done(data), onError = (job, error) => job.error(error)) {
        // Promise resolves when thread starts working on this job
        const startPromise = new Promise((onStart) => {
            // Promise resolves when thread completes or fails working on this job
            this.jobQueue.push({ name, onMessage, onError, onStart });
            return this;
        });
        this._startQueuedJob(); // eslint-disable-line @typescript-eslint/no-floating-promises
        return await startPromise;
    }
    // PRIVATE
    /**
     * Starts first queued job if worker is available or can be created
     * Called when job is started and whenever a worker returns to the idleQueue
     */
    async _startQueuedJob() {
        if (!this.jobQueue.length) {
            return;
        }
        const workerThread = this._getAvailableWorker();
        if (!workerThread) {
            return;
        }
        // We have a worker, dequeue and start the job
        const queuedJob = this.jobQueue.shift();
        if (queuedJob) {
            // Emit a debug event
            // @ts-ignore
            this.onDebug({
                message: 'Starting job',
                name: queuedJob.name,
                workerThread,
                backlog: this.jobQueue.length
            });
            // Create a worker job to let the app access thread and manage job completion
            const job = new _worker_job_js__WEBPACK_IMPORTED_MODULE_1__["default"](queuedJob.name, workerThread);
            // Set the worker thread's message handlers
            workerThread.onMessage = (data) => queuedJob.onMessage(job, data.type, data.payload);
            workerThread.onError = (error) => queuedJob.onError(job, error);
            // Resolve the start promise so that the app can start sending messages to worker
            queuedJob.onStart(job);
            // Wait for the app to signal that the job is complete, then return worker to queue
            try {
                await job.result;
            }
            catch (error) {
                // eslint-disable-next-line no-console
                console.error(`Worker exception: ${error}`);
            }
            finally {
                this.returnWorkerToQueue(workerThread);
            }
        }
    }
    /**
     * Returns a worker to the idle queue
     * Destroys the worker if
     *  - pool is destroyed
     *  - if this pool doesn't reuse workers
     *  - if maxConcurrency has been lowered
     * @param worker
     */
    returnWorkerToQueue(worker) {
        const shouldDestroyWorker = 
        // Workers on Node.js prevent the process from exiting.
        // Until we figure out how to close them before exit, we always destroy them
        !_env_utils_globals_js__WEBPACK_IMPORTED_MODULE_2__.isBrowser ||
            // If the pool is destroyed, there is no reason to keep the worker around
            this.isDestroyed ||
            // If the app has disabled worker reuse, any completed workers should be destroyed
            !this.reuseWorkers ||
            // If concurrency has been lowered, this worker might be surplus to requirements
            this.count > this._getMaxConcurrency();
        if (shouldDestroyWorker) {
            worker.destroy();
            this.count--;
        }
        else {
            this.idleQueue.push(worker);
        }
        if (!this.isDestroyed) {
            this._startQueuedJob(); // eslint-disable-line @typescript-eslint/no-floating-promises
        }
    }
    /**
     * Returns idle worker or creates new worker if maxConcurrency has not been reached
     */
    _getAvailableWorker() {
        // If a worker has completed and returned to the queue, it can be used
        if (this.idleQueue.length > 0) {
            return this.idleQueue.shift() || null;
        }
        // Create fresh worker if we haven't yet created the max amount of worker threads for this worker source
        if (this.count < this._getMaxConcurrency()) {
            this.count++;
            const name = `${this.name.toLowerCase()} (#${this.count} of ${this.maxConcurrency})`;
            return new _worker_thread_js__WEBPACK_IMPORTED_MODULE_0__["default"]({ name, source: this.source, url: this.url });
        }
        // No worker available, have to wait
        return null;
    }
    _getMaxConcurrency() {
        return _env_utils_globals_js__WEBPACK_IMPORTED_MODULE_2__.isMobile ? this.maxMobileConcurrency : this.maxConcurrency;
    }
}


/***/ }),

/***/ "./node_modules/@loaders.gl/worker-utils/dist/lib/worker-farm/worker-thread.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@loaders.gl/worker-utils/dist/lib/worker-farm/worker-thread.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WorkerThread)
/* harmony export */ });
/* harmony import */ var _node_worker_threads_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node/worker_threads.js */ "./node_modules/@loaders.gl/worker-utils/dist/lib/node/worker_threads-browser.js");
/* harmony import */ var _env_utils_globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../env-utils/globals.js */ "./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/globals.js");
/* harmony import */ var _env_utils_assert_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../env-utils/assert.js */ "./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/assert.js");
/* harmony import */ var _worker_utils_get_loadable_worker_url_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../worker-utils/get-loadable-worker-url.js */ "./node_modules/@loaders.gl/worker-utils/dist/lib/worker-utils/get-loadable-worker-url.js");
/* harmony import */ var _worker_utils_get_transfer_list_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../worker-utils/get-transfer-list.js */ "./node_modules/@loaders.gl/worker-utils/dist/lib/worker-utils/get-transfer-list.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors





const NOOP = () => { };
/**
 * Represents one worker thread
 */
class WorkerThread {
    name;
    source;
    url;
    terminated = false;
    worker;
    onMessage;
    onError;
    _loadableURL = '';
    /** Checks if workers are supported on this platform */
    static isSupported() {
        return ((typeof Worker !== 'undefined' && _env_utils_globals_js__WEBPACK_IMPORTED_MODULE_0__.isBrowser) ||
            (typeof _node_worker_threads_js__WEBPACK_IMPORTED_MODULE_1__.NodeWorker !== 'undefined' && !_env_utils_globals_js__WEBPACK_IMPORTED_MODULE_0__.isBrowser));
    }
    constructor(props) {
        const { name, source, url } = props;
        (0,_env_utils_assert_js__WEBPACK_IMPORTED_MODULE_2__.assert)(source || url); // Either source or url must be defined
        this.name = name;
        this.source = source;
        this.url = url;
        this.onMessage = NOOP;
        this.onError = (error) => console.log(error); // eslint-disable-line
        this.worker = _env_utils_globals_js__WEBPACK_IMPORTED_MODULE_0__.isBrowser ? this._createBrowserWorker() : this._createNodeWorker();
    }
    /**
     * Terminate this worker thread
     * @note Can free up significant memory
     */
    destroy() {
        this.onMessage = NOOP;
        this.onError = NOOP;
        this.worker.terminate(); // eslint-disable-line @typescript-eslint/no-floating-promises
        this.terminated = true;
    }
    get isRunning() {
        return Boolean(this.onMessage);
    }
    /**
     * Send a message to this worker thread
     * @param data any data structure, ideally consisting mostly of transferrable objects
     * @param transferList If not supplied, calculated automatically by traversing data
     */
    postMessage(data, transferList) {
        transferList = transferList || (0,_worker_utils_get_transfer_list_js__WEBPACK_IMPORTED_MODULE_3__.getTransferList)(data);
        // @ts-ignore
        this.worker.postMessage(data, transferList);
    }
    // PRIVATE
    /**
     * Generate a standard Error from an ErrorEvent
     * @param event
     */
    _getErrorFromErrorEvent(event) {
        // Note Error object does not have the expected fields if loading failed completely
        // https://developer.mozilla.org/en-US/docs/Web/API/Worker#Event_handlers
        // https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent
        let message = 'Failed to load ';
        message += `worker ${this.name} from ${this.url}. `;
        if (event.message) {
            message += `${event.message} in `;
        }
        // const hasFilename = event.filename && !event.filename.startsWith('blob:');
        // message += hasFilename ? event.filename : this.source.slice(0, 100);
        if (event.lineno) {
            message += `:${event.lineno}:${event.colno}`;
        }
        return new Error(message);
    }
    /**
     * Creates a worker thread on the browser
     */
    _createBrowserWorker() {
        this._loadableURL = (0,_worker_utils_get_loadable_worker_url_js__WEBPACK_IMPORTED_MODULE_4__.getLoadableWorkerURL)({ source: this.source, url: this.url });
        const worker = new Worker(this._loadableURL, { name: this.name });
        worker.onmessage = (event) => {
            if (!event.data) {
                this.onError(new Error('No data received'));
            }
            else {
                this.onMessage(event.data);
            }
        };
        // This callback represents an uncaught exception in the worker thread
        worker.onerror = (error) => {
            this.onError(this._getErrorFromErrorEvent(error));
            this.terminated = true;
        };
        // TODO - not clear when this would be called, for now just log in case it happens
        worker.onmessageerror = (event) => console.error(event); // eslint-disable-line
        return worker;
    }
    /**
     * Creates a worker thread in node.js
     * @todo https://nodejs.org/api/async_hooks.html#async-resource-worker-pool
     */
    _createNodeWorker() {
        let worker;
        if (this.url) {
            // Make sure relative URLs start with './'
            const absolute = this.url.includes(':/') || this.url.startsWith('/');
            const url = absolute ? this.url : `./${this.url}`;
            // console.log('Starting work from', url);
            worker = new _node_worker_threads_js__WEBPACK_IMPORTED_MODULE_1__.NodeWorker(url, { eval: false });
        }
        else if (this.source) {
            worker = new _node_worker_threads_js__WEBPACK_IMPORTED_MODULE_1__.NodeWorker(this.source, { eval: true });
        }
        else {
            throw new Error('no worker');
        }
        worker.on('message', (data) => {
            // console.error('message', data);
            this.onMessage(data);
        });
        worker.on('error', (error) => {
            // console.error('error', error);
            this.onError(error);
        });
        worker.on('exit', (code) => {
            // console.error('exit', code);
        });
        return worker;
    }
}


/***/ }),

/***/ "./node_modules/@loaders.gl/worker-utils/dist/lib/worker-utils/get-loadable-worker-url.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@loaders.gl/worker-utils/dist/lib/worker-utils/get-loadable-worker-url.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLoadableWorkerURL: () => (/* binding */ getLoadableWorkerURL)
/* harmony export */ });
/* harmony import */ var _env_utils_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../env-utils/assert.js */ "./node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/assert.js");
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

const workerURLCache = new Map();
/**
 * Creates a loadable URL from worker source or URL
 * that can be used to create `Worker` instances.
 * Due to CORS issues it may be necessary to wrap a URL in a small importScripts
 * @param props
 * @param props.source Worker source
 * @param props.url Worker URL
 * @returns loadable url
 */
function getLoadableWorkerURL(props) {
    (0,_env_utils_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert)((props.source && !props.url) || (!props.source && props.url)); // Either source or url must be defined
    let workerURL = workerURLCache.get(props.source || props.url);
    if (!workerURL) {
        // Differentiate worker urls from worker source code
        if (props.url) {
            workerURL = getLoadableWorkerURLFromURL(props.url);
            workerURLCache.set(props.url, workerURL);
        }
        if (props.source) {
            workerURL = getLoadableWorkerURLFromSource(props.source);
            workerURLCache.set(props.source, workerURL);
        }
    }
    (0,_env_utils_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert)(workerURL);
    return workerURL;
}
/**
 * Build a loadable worker URL from worker URL
 * @param url
 * @returns loadable URL
 */
function getLoadableWorkerURLFromURL(url) {
    // A local script url, we can use it to initialize a Worker directly
    if (!url.startsWith('http')) {
        return url;
    }
    // A remote script, we need to use `importScripts` to load from different origin
    const workerSource = buildScriptSource(url);
    return getLoadableWorkerURLFromSource(workerSource);
}
/**
 * Build a loadable worker URL from worker source
 * @param workerSource
 * @returns loadable url
 */
function getLoadableWorkerURLFromSource(workerSource) {
    const blob = new Blob([workerSource], { type: 'application/javascript' });
    return URL.createObjectURL(blob);
}
/**
 * Per spec, worker cannot be initialized with a script from a different origin
 * However a local worker script can still import scripts from other origins,
 * so we simply build a wrapper script.
 *
 * @param workerUrl
 * @returns source
 */
function buildScriptSource(workerUrl) {
    return `\
try {
  importScripts('${workerUrl}');
} catch (error) {
  console.error(error);
  throw error;
}`;
}


/***/ }),

/***/ "./node_modules/@loaders.gl/worker-utils/dist/lib/worker-utils/get-transfer-list.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@loaders.gl/worker-utils/dist/lib/worker-utils/get-transfer-list.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTransferList: () => (/* binding */ getTransferList),
/* harmony export */   getTransferListForWriter: () => (/* binding */ getTransferListForWriter)
/* harmony export */ });
// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// NOTE - there is a copy of this function is both in core and loader-utils
// core does not need all the utils in loader-utils, just this one.
/**
 * Returns an array of Transferrable objects that can be used with postMessage
 * https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage
 * @param object data to be sent via postMessage
 * @param recursive - not for application use
 * @param transfers - not for application use
 * @returns a transfer list that can be passed to postMessage
 */
function getTransferList(object, recursive = true, transfers) {
    // Make sure that items in the transfer list is unique
    const transfersSet = transfers || new Set();
    if (!object) {
        // ignore
    }
    else if (isTransferable(object)) {
        transfersSet.add(object);
    }
    else if (isTransferable(object.buffer)) {
        // Typed array
        transfersSet.add(object.buffer);
    }
    else if (ArrayBuffer.isView(object)) {
        // object is a TypeArray viewing into a SharedArrayBuffer (not transferable)
        // Do not iterate through the content in this case
    }
    else if (recursive && typeof object === 'object') {
        for (const key in object) {
            // Avoid perf hit - only go one level deep
            getTransferList(object[key], recursive, transfersSet);
        }
    }
    // If transfers is defined, is internal recursive call
    // Otherwise it's called by the user
    return transfers === undefined ? Array.from(transfersSet) : [];
}
// https://developer.mozilla.org/en-US/docs/Web/API/Transferable
function isTransferable(object) {
    if (!object) {
        return false;
    }
    if (object instanceof ArrayBuffer) {
        return true;
    }
    if (typeof MessagePort !== 'undefined' && object instanceof MessagePort) {
        return true;
    }
    if (typeof ImageBitmap !== 'undefined' && object instanceof ImageBitmap) {
        return true;
    }
    // @ts-ignore
    if (typeof OffscreenCanvas !== 'undefined' && object instanceof OffscreenCanvas) {
        return true;
    }
    return false;
}
/**
 * Recursively drop non serializable values like functions and regexps.
 * @param object
 */
function getTransferListForWriter(object) {
    if (object === null) {
        return {};
    }
    const clone = Object.assign({}, object);
    Object.keys(clone).forEach((key) => {
        // Typed Arrays and Arrays are passed with no change
        if (typeof object[key] === 'object' &&
            !ArrayBuffer.isView(object[key]) &&
            !(object[key] instanceof Array)) {
            clone[key] = getTransferListForWriter(object[key]);
        }
        else if (typeof clone[key] === 'function' || clone[key] instanceof RegExp) {
            clone[key] = {};
        }
        else {
            clone[key] = object[key];
        }
    });
    return clone;
}


/***/ }),

/***/ "./node_modules/@probe.gl/env/dist/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@probe.gl/env/dist/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VERSION: () => (/* binding */ VERSION),
/* harmony export */   assert: () => (/* reexport safe */ _utils_assert_js__WEBPACK_IMPORTED_MODULE_4__.assert),
/* harmony export */   console: () => (/* reexport safe */ _lib_globals_js__WEBPACK_IMPORTED_MODULE_0__.console),
/* harmony export */   document: () => (/* reexport safe */ _lib_globals_js__WEBPACK_IMPORTED_MODULE_0__.document),
/* harmony export */   getBrowser: () => (/* reexport safe */ _lib_get_browser_js__WEBPACK_IMPORTED_MODULE_2__.getBrowser),
/* harmony export */   global: () => (/* reexport safe */ _lib_globals_js__WEBPACK_IMPORTED_MODULE_0__.global),
/* harmony export */   isBrowser: () => (/* reexport safe */ _lib_is_browser_js__WEBPACK_IMPORTED_MODULE_1__.isBrowser),
/* harmony export */   isElectron: () => (/* reexport safe */ _lib_is_electron_js__WEBPACK_IMPORTED_MODULE_3__.isElectron),
/* harmony export */   isMobile: () => (/* reexport safe */ _lib_get_browser_js__WEBPACK_IMPORTED_MODULE_2__.isMobile),
/* harmony export */   process: () => (/* reexport safe */ _lib_globals_js__WEBPACK_IMPORTED_MODULE_0__.process),
/* harmony export */   self: () => (/* reexport safe */ _lib_globals_js__WEBPACK_IMPORTED_MODULE_0__.self),
/* harmony export */   window: () => (/* reexport safe */ _lib_globals_js__WEBPACK_IMPORTED_MODULE_0__.window)
/* harmony export */ });
/* harmony import */ var _lib_globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/globals.js */ "./node_modules/@probe.gl/env/dist/lib/globals.js");
/* harmony import */ var _lib_is_browser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/is-browser.js */ "./node_modules/@probe.gl/env/dist/lib/is-browser.js");
/* harmony import */ var _lib_get_browser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/get-browser.js */ "./node_modules/@probe.gl/env/dist/lib/get-browser.js");
/* harmony import */ var _lib_is_electron_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/is-electron.js */ "./node_modules/@probe.gl/env/dist/lib/is-electron.js");
/* harmony import */ var _utils_assert_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/assert.js */ "./node_modules/@probe.gl/env/dist/utils/assert.js");
// Extract injected version from package.json (injected by babel plugin)
// @ts-expect-error
const VERSION =  true ? "4.0.7" : 0;
// ENVIRONMENT




// ENVIRONMENT'S ASSERT IS 5-15KB, SO WE PROVIDE OUR OWN

// TODO - wish we could just export a constant
// export const isBrowser = checkIfBrowser();


/***/ }),

/***/ "./node_modules/@probe.gl/env/dist/lib/get-browser.js":
/*!************************************************************!*\
  !*** ./node_modules/@probe.gl/env/dist/lib/get-browser.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBrowser: () => (/* binding */ getBrowser),
/* harmony export */   isMobile: () => (/* binding */ isMobile)
/* harmony export */ });
/* harmony import */ var _is_browser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-browser.js */ "./node_modules/@probe.gl/env/dist/lib/is-browser.js");
/* harmony import */ var _is_electron_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is-electron.js */ "./node_modules/@probe.gl/env/dist/lib/is-electron.js");
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./globals.js */ "./node_modules/@probe.gl/env/dist/lib/globals.js");
// Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// This function is needed in initialization stages,
// make sure it can be imported in isolation



function isMobile() {
    return typeof globalThis.orientation !== 'undefined';
}
// Simple browser detection
// `mockUserAgent` parameter allows user agent to be overridden for testing
/* eslint-disable complexity */
function getBrowser(mockUserAgent) {
    if (!mockUserAgent && !(0,_is_browser_js__WEBPACK_IMPORTED_MODULE_0__.isBrowser)()) {
        return 'Node';
    }
    if ((0,_is_electron_js__WEBPACK_IMPORTED_MODULE_1__.isElectron)(mockUserAgent)) {
        return 'Electron';
    }
    const userAgent = mockUserAgent || _globals_js__WEBPACK_IMPORTED_MODULE_2__.navigator.userAgent || '';
    // NOTE: Order of tests matter, as many agents list Chrome etc.
    if (userAgent.indexOf('Edge') > -1) {
        return 'Edge';
    }
    if (globalThis.chrome) {
        return 'Chrome';
    }
    if (globalThis.safari) {
        return 'Safari';
    }
    if (globalThis.mozInnerScreenX) {
        return 'Firefox';
    }
    return 'Unknown';
}


/***/ }),

/***/ "./node_modules/@probe.gl/env/dist/lib/globals.js":
/*!********************************************************!*\
  !*** ./node_modules/@probe.gl/env/dist/lib/globals.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   console: () => (/* binding */ console_),
/* harmony export */   document: () => (/* binding */ document_),
/* harmony export */   global: () => (/* binding */ global_),
/* harmony export */   navigator: () => (/* binding */ navigator_),
/* harmony export */   process: () => (/* binding */ process_),
/* harmony export */   self: () => (/* binding */ global_),
/* harmony export */   window: () => (/* binding */ window_)
/* harmony export */ });
// Do not name these variables the same as the global objects - will break bundling
const global_ = globalThis;
const window_ = globalThis;
const document_ = globalThis.document || {};
const process_ = globalThis.process || {};
const console_ = globalThis.console;
const navigator_ = globalThis.navigator || {};



/***/ }),

/***/ "./node_modules/@probe.gl/env/dist/lib/is-browser.js":
/*!***********************************************************!*\
  !*** ./node_modules/@probe.gl/env/dist/lib/is-browser.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBrowser: () => (/* binding */ isBrowser)
/* harmony export */ });
/* harmony import */ var _is_electron_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-electron.js */ "./node_modules/@probe.gl/env/dist/lib/is-electron.js");
// This function is needed in initialization stages,
// make sure it can be imported in isolation

/** Check if in browser by duck-typing Node context */
function isBrowser() {
    const isNode = 
    // @ts-expect-error
    typeof process === 'object' && String(process) === '[object process]' && !process?.browser;
    return !isNode || (0,_is_electron_js__WEBPACK_IMPORTED_MODULE_0__.isElectron)();
}


/***/ }),

/***/ "./node_modules/@probe.gl/env/dist/lib/is-electron.js":
/*!************************************************************!*\
  !*** ./node_modules/@probe.gl/env/dist/lib/is-electron.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isElectron: () => (/* binding */ isElectron)
/* harmony export */ });
// based on https://github.com/cheton/is-electron
// https://github.com/electron/electron/issues/2288
/* eslint-disable complexity */
function isElectron(mockUserAgent) {
    // Renderer process
    // @ts-expect-error
    if (typeof window !== 'undefined' && window.process?.type === 'renderer') {
        return true;
    }
    // Main process
    // eslint-disable-next-line
    if (typeof process !== 'undefined' && Boolean(process.versions?.['electron'])) {
        return true;
    }
    // Detect the user agent when the `nodeIntegration` option is set to true
    const realUserAgent = typeof navigator !== 'undefined' && navigator.userAgent;
    const userAgent = mockUserAgent || realUserAgent;
    return Boolean(userAgent && userAgent.indexOf('Electron') >= 0);
}


/***/ }),

/***/ "./node_modules/@probe.gl/env/dist/utils/assert.js":
/*!*********************************************************!*\
  !*** ./node_modules/@probe.gl/env/dist/utils/assert.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assert: () => (/* binding */ assert)
/* harmony export */ });
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}


/***/ }),

/***/ "./node_modules/@probe.gl/log/dist/log.js":
/*!************************************************!*\
  !*** ./node_modules/@probe.gl/log/dist/log.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Log: () => (/* binding */ Log),
/* harmony export */   normalizeArguments: () => (/* binding */ normalizeArguments)
/* harmony export */ });
/* harmony import */ var _probe_gl_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @probe.gl/env */ "./node_modules/@probe.gl/env/dist/lib/is-browser.js");
/* harmony import */ var _probe_gl_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @probe.gl/env */ "./node_modules/@probe.gl/env/dist/index.js");
/* harmony import */ var _utils_local_storage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/local-storage.js */ "./node_modules/@probe.gl/log/dist/utils/local-storage.js");
/* harmony import */ var _utils_formatters_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/formatters.js */ "./node_modules/@probe.gl/log/dist/utils/formatters.js");
/* harmony import */ var _utils_color_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/color.js */ "./node_modules/@probe.gl/log/dist/utils/color.js");
/* harmony import */ var _utils_autobind_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/autobind.js */ "./node_modules/@probe.gl/log/dist/utils/autobind.js");
/* harmony import */ var _utils_assert_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/assert.js */ "./node_modules/@probe.gl/log/dist/utils/assert.js");
/* harmony import */ var _utils_hi_res_timestamp_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/hi-res-timestamp.js */ "./node_modules/@probe.gl/log/dist/utils/hi-res-timestamp.js");
// probe.gl, MIT license
/* eslint-disable no-console */







// Instrumentation in other packages may override console methods, so preserve them here
const originalConsole = {
    debug: (0,_probe_gl_env__WEBPACK_IMPORTED_MODULE_0__.isBrowser)() ? console.debug || console.log : console.log,
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
};
const DEFAULT_LOG_CONFIGURATION = {
    enabled: true,
    level: 0
};
function noop() { } // eslint-disable-line @typescript-eslint/no-empty-function
const cache = {};
const ONCE = { once: true };
/** A console wrapper */
class Log {
    constructor({ id } = { id: '' }) {
        this.VERSION = _probe_gl_env__WEBPACK_IMPORTED_MODULE_1__.VERSION;
        this._startTs = (0,_utils_hi_res_timestamp_js__WEBPACK_IMPORTED_MODULE_2__.getHiResTimestamp)();
        this._deltaTs = (0,_utils_hi_res_timestamp_js__WEBPACK_IMPORTED_MODULE_2__.getHiResTimestamp)();
        this.userData = {};
        // TODO - fix support from throttling groups
        this.LOG_THROTTLE_TIMEOUT = 0; // Time before throttled messages are logged again
        this.id = id;
        this.userData = {};
        this._storage = new _utils_local_storage_js__WEBPACK_IMPORTED_MODULE_3__.LocalStorage(`__probe-${this.id}__`, DEFAULT_LOG_CONFIGURATION);
        this.timeStamp(`${this.id} started`);
        (0,_utils_autobind_js__WEBPACK_IMPORTED_MODULE_4__.autobind)(this);
        Object.seal(this);
    }
    set level(newLevel) {
        this.setLevel(newLevel);
    }
    get level() {
        return this.getLevel();
    }
    isEnabled() {
        return this._storage.config.enabled;
    }
    getLevel() {
        return this._storage.config.level;
    }
    /** @return milliseconds, with fractions */
    getTotal() {
        return Number(((0,_utils_hi_res_timestamp_js__WEBPACK_IMPORTED_MODULE_2__.getHiResTimestamp)() - this._startTs).toPrecision(10));
    }
    /** @return milliseconds, with fractions */
    getDelta() {
        return Number(((0,_utils_hi_res_timestamp_js__WEBPACK_IMPORTED_MODULE_2__.getHiResTimestamp)() - this._deltaTs).toPrecision(10));
    }
    /** @deprecated use logLevel */
    set priority(newPriority) {
        this.level = newPriority;
    }
    /** @deprecated use logLevel */
    get priority() {
        return this.level;
    }
    /** @deprecated use logLevel */
    getPriority() {
        return this.level;
    }
    // Configure
    enable(enabled = true) {
        this._storage.setConfiguration({ enabled });
        return this;
    }
    setLevel(level) {
        this._storage.setConfiguration({ level });
        return this;
    }
    /** return the current status of the setting */
    get(setting) {
        return this._storage.config[setting];
    }
    // update the status of the setting
    set(setting, value) {
        this._storage.setConfiguration({ [setting]: value });
    }
    /** Logs the current settings as a table */
    settings() {
        if (console.table) {
            console.table(this._storage.config);
        }
        else {
            console.log(this._storage.config);
        }
    }
    // Unconditional logging
    assert(condition, message) {
        if (!condition) {
            throw new Error(message || 'Assertion failed');
        }
    }
    warn(message) {
        return this._getLogFunction(0, message, originalConsole.warn, arguments, ONCE);
    }
    error(message) {
        return this._getLogFunction(0, message, originalConsole.error, arguments);
    }
    /** Print a deprecation warning */
    deprecated(oldUsage, newUsage) {
        return this.warn(`\`${oldUsage}\` is deprecated and will be removed \
in a later version. Use \`${newUsage}\` instead`);
    }
    /** Print a removal warning */
    removed(oldUsage, newUsage) {
        return this.error(`\`${oldUsage}\` has been removed. Use \`${newUsage}\` instead`);
    }
    probe(logLevel, message) {
        return this._getLogFunction(logLevel, message, originalConsole.log, arguments, {
            time: true,
            once: true
        });
    }
    log(logLevel, message) {
        return this._getLogFunction(logLevel, message, originalConsole.debug, arguments);
    }
    info(logLevel, message) {
        return this._getLogFunction(logLevel, message, console.info, arguments);
    }
    once(logLevel, message) {
        return this._getLogFunction(logLevel, message, originalConsole.debug || originalConsole.info, arguments, ONCE);
    }
    /** Logs an object as a table */
    table(logLevel, table, columns) {
        if (table) {
            return this._getLogFunction(logLevel, table, console.table || noop, (columns && [columns]), {
                tag: getTableHeader(table)
            });
        }
        return noop;
    }
    time(logLevel, message) {
        return this._getLogFunction(logLevel, message, console.time ? console.time : console.info);
    }
    timeEnd(logLevel, message) {
        return this._getLogFunction(logLevel, message, console.timeEnd ? console.timeEnd : console.info);
    }
    timeStamp(logLevel, message) {
        return this._getLogFunction(logLevel, message, console.timeStamp || noop);
    }
    group(logLevel, message, opts = { collapsed: false }) {
        const options = normalizeArguments({ logLevel, message, opts });
        const { collapsed } = opts;
        // @ts-expect-error
        options.method = (collapsed ? console.groupCollapsed : console.group) || console.info;
        return this._getLogFunction(options);
    }
    groupCollapsed(logLevel, message, opts = {}) {
        return this.group(logLevel, message, Object.assign({}, opts, { collapsed: true }));
    }
    groupEnd(logLevel) {
        return this._getLogFunction(logLevel, '', console.groupEnd || noop);
    }
    // EXPERIMENTAL
    withGroup(logLevel, message, func) {
        this.group(logLevel, message)();
        try {
            func();
        }
        finally {
            this.groupEnd(logLevel)();
        }
    }
    trace() {
        if (console.trace) {
            console.trace();
        }
    }
    // PRIVATE METHODS
    /** Deduces log level from a variety of arguments */
    _shouldLog(logLevel) {
        return this.isEnabled() && this.getLevel() >= normalizeLogLevel(logLevel);
    }
    _getLogFunction(logLevel, message, method, args, opts) {
        if (this._shouldLog(logLevel)) {
            // normalized opts + timings
            opts = normalizeArguments({ logLevel, message, args, opts });
            method = method || opts.method;
            (0,_utils_assert_js__WEBPACK_IMPORTED_MODULE_5__["default"])(method);
            opts.total = this.getTotal();
            opts.delta = this.getDelta();
            // reset delta timer
            this._deltaTs = (0,_utils_hi_res_timestamp_js__WEBPACK_IMPORTED_MODULE_2__.getHiResTimestamp)();
            const tag = opts.tag || opts.message;
            if (opts.once && tag) {
                if (!cache[tag]) {
                    cache[tag] = (0,_utils_hi_res_timestamp_js__WEBPACK_IMPORTED_MODULE_2__.getHiResTimestamp)();
                }
                else {
                    return noop;
                }
            }
            // TODO - Make throttling work with groups
            // if (opts.nothrottle || !throttle(tag, this.LOG_THROTTLE_TIMEOUT)) {
            //   return noop;
            // }
            message = decorateMessage(this.id, opts.message, opts);
            // Bind console function so that it can be called after being returned
            return method.bind(console, message, ...opts.args);
        }
        return noop;
    }
}
Log.VERSION = _probe_gl_env__WEBPACK_IMPORTED_MODULE_1__.VERSION;
/**
 * Get logLevel from first argument:
 * - log(logLevel, message, args) => logLevel
 * - log(message, args) => 0
 * - log({logLevel, ...}, message, args) => logLevel
 * - log({logLevel, message, args}) => logLevel
 */
function normalizeLogLevel(logLevel) {
    if (!logLevel) {
        return 0;
    }
    let resolvedLevel;
    switch (typeof logLevel) {
        case 'number':
            resolvedLevel = logLevel;
            break;
        case 'object':
            // Backward compatibility
            // TODO - deprecate `priority`
            // @ts-expect-error
            resolvedLevel = logLevel.logLevel || logLevel.priority || 0;
            break;
        default:
            return 0;
    }
    // 'log level must be a number'
    (0,_utils_assert_js__WEBPACK_IMPORTED_MODULE_5__["default"])(Number.isFinite(resolvedLevel) && resolvedLevel >= 0);
    return resolvedLevel;
}
/**
 * "Normalizes" the various argument patterns into an object with known types
 * - log(logLevel, message, args) => {logLevel, message, args}
 * - log(message, args) => {logLevel: 0, message, args}
 * - log({logLevel, ...}, message, args) => {logLevel, message, args}
 * - log({logLevel, message, args}) => {logLevel, message, args}
 */
function normalizeArguments(opts) {
    const { logLevel, message } = opts;
    opts.logLevel = normalizeLogLevel(logLevel);
    // We use `arguments` instead of rest parameters (...args) because IE
    // does not support the syntax. Rest parameters is transpiled to code with
    // perf impact. Doing it here instead avoids constructing args when logging is
    // disabled.
    // TODO - remove when/if IE support is dropped
    const args = opts.args ? Array.from(opts.args) : [];
    // args should only contain arguments that appear after `message`
    // eslint-disable-next-line no-empty
    while (args.length && args.shift() !== message) { }
    switch (typeof logLevel) {
        case 'string':
        case 'function':
            if (message !== undefined) {
                args.unshift(message);
            }
            opts.message = logLevel;
            break;
        case 'object':
            Object.assign(opts, logLevel);
            break;
        default:
    }
    // Resolve functions into strings by calling them
    if (typeof opts.message === 'function') {
        opts.message = opts.message();
    }
    const messageType = typeof opts.message;
    // 'log message must be a string' or object
    (0,_utils_assert_js__WEBPACK_IMPORTED_MODULE_5__["default"])(messageType === 'string' || messageType === 'object');
    // original opts + normalized opts + opts arg + fixed up message
    return Object.assign(opts, { args }, opts.opts);
}
function decorateMessage(id, message, opts) {
    if (typeof message === 'string') {
        const time = opts.time ? (0,_utils_formatters_js__WEBPACK_IMPORTED_MODULE_6__.leftPad)((0,_utils_formatters_js__WEBPACK_IMPORTED_MODULE_6__.formatTime)(opts.total)) : '';
        message = opts.time ? `${id}: ${time}  ${message}` : `${id}: ${message}`;
        message = (0,_utils_color_js__WEBPACK_IMPORTED_MODULE_7__.addColor)(message, opts.color, opts.background);
    }
    return message;
}
function getTableHeader(table) {
    for (const key in table) {
        for (const title in table[key]) {
            return title || 'untitled';
        }
    }
    return 'empty';
}


/***/ }),

/***/ "./node_modules/@probe.gl/log/dist/utils/assert.js":
/*!*********************************************************!*\
  !*** ./node_modules/@probe.gl/log/dist/utils/assert.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ assert)
/* harmony export */ });
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}


/***/ }),

/***/ "./node_modules/@probe.gl/log/dist/utils/autobind.js":
/*!***********************************************************!*\
  !*** ./node_modules/@probe.gl/log/dist/utils/autobind.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   autobind: () => (/* binding */ autobind)
/* harmony export */ });
// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
/**
 * Binds the "this" argument of all functions on a class instance to the instance
 * @param obj - class instance (typically a react component)
 */
function autobind(obj, predefined = ['constructor']) {
    const proto = Object.getPrototypeOf(obj);
    const propNames = Object.getOwnPropertyNames(proto);
    const object = obj;
    for (const key of propNames) {
        const value = object[key];
        if (typeof value === 'function') {
            if (!predefined.find(name => key === name)) {
                object[key] = value.bind(obj);
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/@probe.gl/log/dist/utils/color.js":
/*!********************************************************!*\
  !*** ./node_modules/@probe.gl/log/dist/utils/color.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COLOR: () => (/* binding */ COLOR),
/* harmony export */   addColor: () => (/* binding */ addColor)
/* harmony export */ });
/* harmony import */ var _probe_gl_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @probe.gl/env */ "./node_modules/@probe.gl/env/dist/lib/is-browser.js");

var COLOR;
(function (COLOR) {
    COLOR[COLOR["BLACK"] = 30] = "BLACK";
    COLOR[COLOR["RED"] = 31] = "RED";
    COLOR[COLOR["GREEN"] = 32] = "GREEN";
    COLOR[COLOR["YELLOW"] = 33] = "YELLOW";
    COLOR[COLOR["BLUE"] = 34] = "BLUE";
    COLOR[COLOR["MAGENTA"] = 35] = "MAGENTA";
    COLOR[COLOR["CYAN"] = 36] = "CYAN";
    COLOR[COLOR["WHITE"] = 37] = "WHITE";
    COLOR[COLOR["BRIGHT_BLACK"] = 90] = "BRIGHT_BLACK";
    COLOR[COLOR["BRIGHT_RED"] = 91] = "BRIGHT_RED";
    COLOR[COLOR["BRIGHT_GREEN"] = 92] = "BRIGHT_GREEN";
    COLOR[COLOR["BRIGHT_YELLOW"] = 93] = "BRIGHT_YELLOW";
    COLOR[COLOR["BRIGHT_BLUE"] = 94] = "BRIGHT_BLUE";
    COLOR[COLOR["BRIGHT_MAGENTA"] = 95] = "BRIGHT_MAGENTA";
    COLOR[COLOR["BRIGHT_CYAN"] = 96] = "BRIGHT_CYAN";
    COLOR[COLOR["BRIGHT_WHITE"] = 97] = "BRIGHT_WHITE";
})(COLOR || (COLOR = {}));
const BACKGROUND_INCREMENT = 10;
function getColor(color) {
    if (typeof color !== 'string') {
        return color;
    }
    color = color.toUpperCase();
    return COLOR[color] || COLOR.WHITE;
}
function addColor(string, color, background) {
    if (!_probe_gl_env__WEBPACK_IMPORTED_MODULE_0__.isBrowser && typeof string === 'string') {
        if (color) {
            const colorCode = getColor(color);
            string = `\u001b[${colorCode}m${string}\u001b[39m`;
        }
        if (background) {
            // background colors values are +10
            const colorCode = getColor(background);
            string = `\u001b[${colorCode + BACKGROUND_INCREMENT}m${string}\u001b[49m`;
        }
    }
    return string;
}


/***/ }),

/***/ "./node_modules/@probe.gl/log/dist/utils/formatters.js":
/*!*************************************************************!*\
  !*** ./node_modules/@probe.gl/log/dist/utils/formatters.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatTime: () => (/* binding */ formatTime),
/* harmony export */   formatValue: () => (/* binding */ formatValue),
/* harmony export */   leftPad: () => (/* binding */ leftPad),
/* harmony export */   rightPad: () => (/* binding */ rightPad)
/* harmony export */ });
// probe.gl, MIT license
/**
 * Format time
 */
function formatTime(ms) {
    let formatted;
    if (ms < 10) {
        formatted = `${ms.toFixed(2)}ms`;
    }
    else if (ms < 100) {
        formatted = `${ms.toFixed(1)}ms`;
    }
    else if (ms < 1000) {
        formatted = `${ms.toFixed(0)}ms`;
    }
    else {
        formatted = `${(ms / 1000).toFixed(2)}s`;
    }
    return formatted;
}
function leftPad(string, length = 8) {
    const padLength = Math.max(length - string.length, 0);
    return `${' '.repeat(padLength)}${string}`;
}
function rightPad(string, length = 8) {
    const padLength = Math.max(length - string.length, 0);
    return `${string}${' '.repeat(padLength)}`;
}
function formatValue(v, options = {}) {
    const EPSILON = 1e-16;
    const { isInteger = false } = options;
    if (Array.isArray(v) || ArrayBuffer.isView(v)) {
        return formatArrayValue(v, options);
    }
    if (!Number.isFinite(v)) {
        return String(v);
    }
    // @ts-expect-error
    if (Math.abs(v) < EPSILON) {
        return isInteger ? '0' : '0.';
    }
    if (isInteger) {
        // @ts-expect-error
        return v.toFixed(0);
    }
    // @ts-expect-error
    if (Math.abs(v) > 100 && Math.abs(v) < 10000) {
        // @ts-expect-error
        return v.toFixed(0);
    }
    // @ts-expect-error
    const string = v.toPrecision(2);
    const decimal = string.indexOf('.0');
    return decimal === string.length - 2 ? string.slice(0, -1) : string;
}
/** Helper to formatValue */
function formatArrayValue(v, options) {
    const { maxElts = 16, size = 1 } = options;
    let string = '[';
    for (let i = 0; i < v.length && i < maxElts; ++i) {
        if (i > 0) {
            string += `,${i % size === 0 ? ' ' : ''}`;
        }
        string += formatValue(v[i], options);
    }
    const terminator = v.length > maxElts ? '...' : ']';
    return `${string}${terminator}`;
}


/***/ }),

/***/ "./node_modules/@probe.gl/log/dist/utils/hi-res-timestamp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@probe.gl/log/dist/utils/hi-res-timestamp.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHiResTimestamp: () => (/* binding */ getHiResTimestamp)
/* harmony export */ });
/* harmony import */ var _probe_gl_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @probe.gl/env */ "./node_modules/@probe.gl/env/dist/lib/is-browser.js");
/* harmony import */ var _probe_gl_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @probe.gl/env */ "./node_modules/@probe.gl/env/dist/lib/globals.js");
// probe.gl, MIT license

/** Get best timer available. */
function getHiResTimestamp() {
    let timestamp;
    if ((0,_probe_gl_env__WEBPACK_IMPORTED_MODULE_0__.isBrowser)() && _probe_gl_env__WEBPACK_IMPORTED_MODULE_1__.window.performance) {
        timestamp = _probe_gl_env__WEBPACK_IMPORTED_MODULE_1__.window?.performance?.now?.();
    }
    else if ("hrtime" in _probe_gl_env__WEBPACK_IMPORTED_MODULE_1__.process) {
        // @ts-ignore
        const timeParts = _probe_gl_env__WEBPACK_IMPORTED_MODULE_1__.process?.hrtime?.();
        timestamp = timeParts[0] * 1000 + timeParts[1] / 1e6;
    }
    else {
        timestamp = Date.now();
    }
    return timestamp;
}


/***/ }),

/***/ "./node_modules/@probe.gl/log/dist/utils/local-storage.js":
/*!****************************************************************!*\
  !*** ./node_modules/@probe.gl/log/dist/utils/local-storage.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalStorage: () => (/* binding */ LocalStorage)
/* harmony export */ });
// probe.gl, MIT license
function getStorage(type) {
    try {
        const storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return storage;
    }
    catch (e) {
        return null;
    }
}
// Store keys in local storage via simple interface
class LocalStorage {
    constructor(id, defaultConfig, type = 'sessionStorage') {
        this.storage = getStorage(type);
        this.id = id;
        this.config = defaultConfig;
        this._loadConfiguration();
    }
    getConfiguration() {
        return this.config;
    }
    setConfiguration(configuration) {
        Object.assign(this.config, configuration);
        if (this.storage) {
            const serialized = JSON.stringify(this.config);
            this.storage.setItem(this.id, serialized);
        }
    }
    // Get config from persistent store, if available
    _loadConfiguration() {
        let configuration = {};
        if (this.storage) {
            const serializedConfiguration = this.storage.getItem(this.id);
            configuration = serializedConfiguration ? JSON.parse(serializedConfiguration) : {};
        }
        Object.assign(this.config, configuration);
        return this;
    }
}


/***/ }),

/***/ "./node_modules/wgpu-matrix/dist/3.x/wgpu-matrix.module.js":
/*!*****************************************************************!*\
  !*** ./node_modules/wgpu-matrix/dist/3.x/wgpu-matrix.module.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mat3: () => (/* binding */ mat3),
/* harmony export */   mat3d: () => (/* binding */ mat3d),
/* harmony export */   mat3n: () => (/* binding */ mat3n),
/* harmony export */   mat4: () => (/* binding */ mat4),
/* harmony export */   mat4d: () => (/* binding */ mat4d),
/* harmony export */   mat4n: () => (/* binding */ mat4n),
/* harmony export */   quat: () => (/* binding */ quat),
/* harmony export */   quatd: () => (/* binding */ quatd),
/* harmony export */   quatn: () => (/* binding */ quatn),
/* harmony export */   utils: () => (/* binding */ utils),
/* harmony export */   vec2: () => (/* binding */ vec2),
/* harmony export */   vec2d: () => (/* binding */ vec2d),
/* harmony export */   vec2n: () => (/* binding */ vec2n),
/* harmony export */   vec3: () => (/* binding */ vec3),
/* harmony export */   vec3d: () => (/* binding */ vec3d),
/* harmony export */   vec3n: () => (/* binding */ vec3n),
/* harmony export */   vec4: () => (/* binding */ vec4),
/* harmony export */   vec4d: () => (/* binding */ vec4d),
/* harmony export */   vec4n: () => (/* binding */ vec4n)
/* harmony export */ });
/* wgpu-matrix@3.3.0, license MIT */
function wrapConstructor(OriginalConstructor, modifier) {
    return class extends OriginalConstructor {
        constructor(...args) {
            super(...args);
            modifier(this);
        }
    }; // Type assertion is necessary here
}
const ZeroArray = wrapConstructor((Array), a => a.fill(0));

/*
 * Copyright 2022 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
let EPSILON = 0.000001;
/**
 * Set the value for EPSILON for various checks
 * @param v - Value to use for EPSILON.
 * @returns previous value of EPSILON;
 */
function setEpsilon(v) {
    const old = EPSILON;
    EPSILON = v;
    return old;
}
/**
 * Convert degrees to radians
 * @param degrees - Angle in degrees
 * @returns angle converted to radians
 */
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
/**
 * Convert radians to degrees
 * @param radians - Angle in radians
 * @returns angle converted to degrees
 */
function radToDeg(radians) {
    return radians * 180 / Math.PI;
}
/**
 * Lerps between a and b via t
 * @param a - starting value
 * @param b - ending value
 * @param t - value where 0 = a and 1 = b
 * @returns a + (b - a) * t
 */
function lerp(a, b, t) {
    return a + (b - a) * t;
}
/**
 * Compute the opposite of lerp. Given a and b and a value between
 * a and b returns a value between 0 and 1. 0 if a, 1 if b.
 * Note: no clamping is done.
 * @param a - start value
 * @param b - end value
 * @param v - value between a and b
 * @returns (v - a) / (b - a)
 */
function inverseLerp(a, b, v) {
    const d = b - a;
    return (Math.abs(b - a) < EPSILON)
        ? a
        : (v - a) / d;
}
/**
 * Compute the euclidean modulo
 *
 * ```
 * // table for n / 3
 * -5, -4, -3, -2, -1,  0,  1,  2,  3,  4,  5   <- n
 * ------------------------------------
 * -2  -1  -0  -2  -1   0,  1,  2,  0,  1,  2   <- n % 3
 *  1   2   0   1   2   0,  1,  2,  0,  1,  2   <- euclideanModule(n, 3)
 * ```
 *
 * @param n - dividend
 * @param m - divisor
 * @returns the euclidean modulo of n / m
 */
function euclideanModulo(n, m) {
    return ((n % m) + m) % m;
}

var utils = {
    __proto__: null,
    get EPSILON () { return EPSILON; },
    degToRad: degToRad,
    euclideanModulo: euclideanModulo,
    inverseLerp: inverseLerp,
    lerp: lerp,
    radToDeg: radToDeg,
    setEpsilon: setEpsilon
};

/*
 * Copyright 2022 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
/**
 * Generates am typed API for Vec3
 */
function getAPIImpl$5(Ctor) {
    /**
     * Creates a Vec2; may be called with x, y, z to set initial values.
     *
     * Note: Since passing in a raw JavaScript array
     * is valid in all circumstances, if you want to
     * force a JavaScript array into a Vec2's specified type
     * it would be faster to use
     *
     * ```
     * const v = vec2.clone(someJSArray);
     * ```
     *
     * @param x - Initial x value.
     * @param y - Initial y value.
     * @returns the created vector
     */
    function create(x = 0, y = 0) {
        const newDst = new Ctor(2);
        if (x !== undefined) {
            newDst[0] = x;
            if (y !== undefined) {
                newDst[1] = y;
            }
        }
        return newDst;
    }
    /**
     * Creates a Vec2; may be called with x, y, z to set initial values. (same as create)
     * @param x - Initial x value.
     * @param y - Initial y value.
     * @returns the created vector
     */
    const fromValues = create;
    /**
     * Sets the values of a Vec2
     * Also see {@link vec2.create} and {@link vec2.copy}
     *
     * @param x first value
     * @param y second value
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector with its elements set.
     */
    function set(x, y, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = x;
        newDst[1] = y;
        return newDst;
    }
    /**
     * Applies Math.ceil to each element of vector
     * @param v - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the ceil of each element of v.
     */
    function ceil(v, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = Math.ceil(v[0]);
        newDst[1] = Math.ceil(v[1]);
        return newDst;
    }
    /**
     * Applies Math.floor to each element of vector
     * @param v - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the floor of each element of v.
     */
    function floor(v, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = Math.floor(v[0]);
        newDst[1] = Math.floor(v[1]);
        return newDst;
    }
    /**
     * Applies Math.round to each element of vector
     * @param v - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the round of each element of v.
     */
    function round(v, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = Math.round(v[0]);
        newDst[1] = Math.round(v[1]);
        return newDst;
    }
    /**
     * Clamp each element of vector between min and max
     * @param v - Operand vector.
     * @param max - Min value, default 0
     * @param min - Max value, default 1
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that the clamped value of each element of v.
     */
    function clamp(v, min = 0, max = 1, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = Math.min(max, Math.max(min, v[0]));
        newDst[1] = Math.min(max, Math.max(min, v[1]));
        return newDst;
    }
    /**
     * Adds two vectors; assumes a and b have the same dimension.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the sum of a and b.
     */
    function add(a, b, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = a[0] + b[0];
        newDst[1] = a[1] + b[1];
        return newDst;
    }
    /**
     * Adds two vectors, scaling the 2nd; assumes a and b have the same dimension.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param scale - Amount to scale b
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the sum of a + b * scale.
     */
    function addScaled(a, b, scale, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = a[0] + b[0] * scale;
        newDst[1] = a[1] + b[1] * scale;
        return newDst;
    }
    /**
     * Returns the angle in radians between two vectors.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @returns The angle in radians between the 2 vectors.
     */
    function angle(a, b) {
        const ax = a[0];
        const ay = a[1];
        const bx = b[0];
        const by = b[1];
        const mag1 = Math.sqrt(ax * ax + ay * ay);
        const mag2 = Math.sqrt(bx * bx + by * by);
        const mag = mag1 * mag2;
        const cosine = mag && dot(a, b) / mag;
        return Math.acos(cosine);
    }
    /**
     * Subtracts two vectors.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the difference of a and b.
     */
    function subtract(a, b, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = a[0] - b[0];
        newDst[1] = a[1] - b[1];
        return newDst;
    }
    /**
     * Subtracts two vectors.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the difference of a and b.
     */
    const sub = subtract;
    /**
     * Check if 2 vectors are approximately equal
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @returns true if vectors are approximately equal
     */
    function equalsApproximately(a, b) {
        return Math.abs(a[0] - b[0]) < EPSILON &&
            Math.abs(a[1] - b[1]) < EPSILON;
    }
    /**
     * Check if 2 vectors are exactly equal
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @returns true if vectors are exactly equal
     */
    function equals(a, b) {
        return a[0] === b[0] && a[1] === b[1];
    }
    /**
     * Performs linear interpolation on two vectors.
     * Given vectors a and b and interpolation coefficient t, returns
     * a + t * (b - a).
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param t - Interpolation coefficient.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The linear interpolated result.
     */
    function lerp(a, b, t, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = a[0] + t * (b[0] - a[0]);
        newDst[1] = a[1] + t * (b[1] - a[1]);
        return newDst;
    }
    /**
     * Performs linear interpolation on two vectors.
     * Given vectors a and b and interpolation coefficient vector t, returns
     * a + t * (b - a).
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param t - Interpolation coefficients vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns the linear interpolated result.
     */
    function lerpV(a, b, t, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = a[0] + t[0] * (b[0] - a[0]);
        newDst[1] = a[1] + t[1] * (b[1] - a[1]);
        return newDst;
    }
    /**
     * Return max values of two vectors.
     * Given vectors a and b returns
     * [max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2])].
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The max components vector.
     */
    function max(a, b, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = Math.max(a[0], b[0]);
        newDst[1] = Math.max(a[1], b[1]);
        return newDst;
    }
    /**
     * Return min values of two vectors.
     * Given vectors a and b returns
     * [min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2])].
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The min components vector.
     */
    function min(a, b, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = Math.min(a[0], b[0]);
        newDst[1] = Math.min(a[1], b[1]);
        return newDst;
    }
    /**
     * Multiplies a vector by a scalar.
     * @param v - The vector.
     * @param k - The scalar.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The scaled vector.
     */
    function mulScalar(v, k, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = v[0] * k;
        newDst[1] = v[1] * k;
        return newDst;
    }
    /**
     * Multiplies a vector by a scalar. (same as mulScalar)
     * @param v - The vector.
     * @param k - The scalar.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The scaled vector.
     */
    const scale = mulScalar;
    /**
     * Divides a vector by a scalar.
     * @param v - The vector.
     * @param k - The scalar.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The scaled vector.
     */
    function divScalar(v, k, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = v[0] / k;
        newDst[1] = v[1] / k;
        return newDst;
    }
    /**
     * Inverse a vector.
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The inverted vector.
     */
    function inverse(v, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = 1 / v[0];
        newDst[1] = 1 / v[1];
        return newDst;
    }
    /**
     * Invert a vector. (same as inverse)
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The inverted vector.
     */
    const invert = inverse;
    /**
     * Computes the cross product of two vectors; assumes both vectors have
     * three entries.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The vector of a cross b.
     */
    function cross(a, b, dst) {
        const newDst = (dst ?? new Ctor(3));
        const z = a[0] * b[1] - a[1] * b[0];
        newDst[0] = 0;
        newDst[1] = 0;
        newDst[2] = z;
        return newDst;
    }
    /**
     * Computes the dot product of two vectors; assumes both vectors have
     * three entries.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @returns dot product
     */
    function dot(a, b) {
        return a[0] * b[0] + a[1] * b[1];
    }
    /**
     * Computes the length of vector
     * @param v - vector.
     * @returns length of vector.
     */
    function length(v) {
        const v0 = v[0];
        const v1 = v[1];
        return Math.sqrt(v0 * v0 + v1 * v1);
    }
    /**
     * Computes the length of vector (same as length)
     * @param v - vector.
     * @returns length of vector.
     */
    const len = length;
    /**
     * Computes the square of the length of vector
     * @param v - vector.
     * @returns square of the length of vector.
     */
    function lengthSq(v) {
        const v0 = v[0];
        const v1 = v[1];
        return v0 * v0 + v1 * v1;
    }
    /**
     * Computes the square of the length of vector (same as lengthSq)
     * @param v - vector.
     * @returns square of the length of vector.
     */
    const lenSq = lengthSq;
    /**
     * Computes the distance between 2 points
     * @param a - vector.
     * @param b - vector.
     * @returns distance between a and b
     */
    function distance(a, b) {
        const dx = a[0] - b[0];
        const dy = a[1] - b[1];
        return Math.sqrt(dx * dx + dy * dy);
    }
    /**
     * Computes the distance between 2 points (same as distance)
     * @param a - vector.
     * @param b - vector.
     * @returns distance between a and b
     */
    const dist = distance;
    /**
     * Computes the square of the distance between 2 points
     * @param a - vector.
     * @param b - vector.
     * @returns square of the distance between a and b
     */
    function distanceSq(a, b) {
        const dx = a[0] - b[0];
        const dy = a[1] - b[1];
        return dx * dx + dy * dy;
    }
    /**
     * Computes the square of the distance between 2 points (same as distanceSq)
     * @param a - vector.
     * @param b - vector.
     * @returns square of the distance between a and b
     */
    const distSq = distanceSq;
    /**
     * Divides a vector by its Euclidean length and returns the quotient.
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The normalized vector.
     */
    function normalize(v, dst) {
        const newDst = (dst ?? new Ctor(2));
        const v0 = v[0];
        const v1 = v[1];
        const len = Math.sqrt(v0 * v0 + v1 * v1);
        if (len > 0.00001) {
            newDst[0] = v0 / len;
            newDst[1] = v1 / len;
        }
        else {
            newDst[0] = 0;
            newDst[1] = 0;
        }
        return newDst;
    }
    /**
     * Negates a vector.
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns -v.
     */
    function negate(v, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = -v[0];
        newDst[1] = -v[1];
        return newDst;
    }
    /**
     * Copies a vector. (same as {@link vec2.clone})
     * Also see {@link vec2.create} and {@link vec2.set}
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A copy of v.
     */
    function copy(v, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = v[0];
        newDst[1] = v[1];
        return newDst;
    }
    /**
     * Clones a vector. (same as {@link vec2.copy})
     * Also see {@link vec2.create} and {@link vec2.set}
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A copy of v.
     */
    const clone = copy;
    /**
     * Multiplies a vector by another vector (component-wise); assumes a and
     * b have the same length.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The vector of products of entries of a and b.
     */
    function multiply(a, b, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = a[0] * b[0];
        newDst[1] = a[1] * b[1];
        return newDst;
    }
    /**
     * Multiplies a vector by another vector (component-wise); assumes a and
     * b have the same length. (same as mul)
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The vector of products of entries of a and b.
     */
    const mul = multiply;
    /**
     * Divides a vector by another vector (component-wise); assumes a and
     * b have the same length.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The vector of quotients of entries of a and b.
     */
    function divide(a, b, dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = a[0] / b[0];
        newDst[1] = a[1] / b[1];
        return newDst;
    }
    /**
     * Divides a vector by another vector (component-wise); assumes a and
     * b have the same length. (same as divide)
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The vector of quotients of entries of a and b.
     */
    const div = divide;
    /**
     * Creates a random unit vector * scale
     * @param scale - Default 1
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The random vector.
     */
    function random(scale = 1, dst) {
        const newDst = (dst ?? new Ctor(2));
        const angle = Math.random() * 2 * Math.PI;
        newDst[0] = Math.cos(angle) * scale;
        newDst[1] = Math.sin(angle) * scale;
        return newDst;
    }
    /**
     * Zero's a vector
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The zeroed vector.
     */
    function zero(dst) {
        const newDst = (dst ?? new Ctor(2));
        newDst[0] = 0;
        newDst[1] = 0;
        return newDst;
    }
    /**
     * transform Vec2 by 4x4 matrix
     * @param v - the vector
     * @param m - The matrix.
     * @param dst - optional Vec2 to store result. If not passed a new one is created.
     * @returns the transformed vector
     */
    function transformMat4(v, m, dst) {
        const newDst = (dst ?? new Ctor(2));
        const x = v[0];
        const y = v[1];
        newDst[0] = x * m[0] + y * m[4] + m[12];
        newDst[1] = x * m[1] + y * m[5] + m[13];
        return newDst;
    }
    /**
     * Transforms vec4 by 3x3 matrix
     *
     * @param v - the vector
     * @param m - The matrix.
     * @param dst - optional Vec2 to store result. If not passed a new one is created.
     * @returns the transformed vector
     */
    function transformMat3(v, m, dst) {
        const newDst = (dst ?? new Ctor(2));
        const x = v[0];
        const y = v[1];
        newDst[0] = m[0] * x + m[4] * y + m[8];
        newDst[1] = m[1] * x + m[5] * y + m[9];
        return newDst;
    }
    /**
     * Rotate a 2D vector
     *
     * @param a The vec2 point to rotate
     * @param b The origin of the rotation
     * @param rad The angle of rotation in radians
     * @returns the rotated vector
     */
    function rotate(a, b, rad, dst) {
        const newDst = (dst ?? new Ctor(2));
        // Translate point to the origin
        const p0 = a[0] - b[0];
        const p1 = a[1] - b[1];
        const sinC = Math.sin(rad);
        const cosC = Math.cos(rad);
        //perform rotation and translate to correct position
        newDst[0] = p0 * cosC - p1 * sinC + b[0];
        newDst[1] = p0 * sinC + p1 * cosC + b[1];
        return newDst;
    }
    /**
     * Treat a 2D vector as a direction and set it's length
     *
     * @param a The vec2 to lengthen
     * @param len The length of the resulting vector
     * @returns The lengthened vector
     */
    function setLength(a, len, dst) {
        const newDst = (dst ?? new Ctor(2));
        normalize(a, newDst);
        return mulScalar(newDst, len, newDst);
    }
    /**
     * Ensure a vector is not longer than a max length
     *
     * @param a The vec2 to limit
     * @param maxLen The longest length of the resulting vector
     * @returns The vector, shortened to maxLen if it's too long
     */
    function truncate(a, maxLen, dst) {
        const newDst = (dst ?? new Ctor(2));
        if (length(a) > maxLen) {
            return setLength(a, maxLen, newDst);
        }
        return copy(a, newDst);
    }
    /**
     * Return the vector exactly between 2 endpoint vectors
     *
     * @param a Endpoint 1
     * @param b Endpoint 2
     * @returns The vector exactly residing between endpoints 1 and 2
     */
    function midpoint(a, b, dst) {
        const newDst = (dst ?? new Ctor(2));
        return lerp(a, b, 0.5, newDst);
    }
    return {
        create,
        fromValues,
        set,
        ceil,
        floor,
        round,
        clamp,
        add,
        addScaled,
        angle,
        subtract,
        sub,
        equalsApproximately,
        equals,
        lerp,
        lerpV,
        max,
        min,
        mulScalar,
        scale,
        divScalar,
        inverse,
        invert,
        cross,
        dot,
        length,
        len,
        lengthSq,
        lenSq,
        distance,
        dist,
        distanceSq,
        distSq,
        normalize,
        negate,
        copy,
        clone,
        multiply,
        mul,
        divide,
        div,
        random,
        zero,
        transformMat4,
        transformMat3,
        rotate,
        setLength,
        truncate,
        midpoint,
    };
}
const cache$5 = new Map();
function getAPI$5(Ctor) {
    let api = cache$5.get(Ctor);
    if (!api) {
        api = getAPIImpl$5(Ctor);
        cache$5.set(Ctor, api);
    }
    return api;
}

/*
 * Copyright 2022 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
/**
 * Generates am typed API for Vec3
 * */
function getAPIImpl$4(Ctor) {
    /**
     * Creates a vec3; may be called with x, y, z to set initial values.
     * @param x - Initial x value.
     * @param y - Initial y value.
     * @param z - Initial z value.
     * @returns the created vector
     */
    function create(x, y, z) {
        const newDst = new Ctor(3);
        if (x !== undefined) {
            newDst[0] = x;
            if (y !== undefined) {
                newDst[1] = y;
                if (z !== undefined) {
                    newDst[2] = z;
                }
            }
        }
        return newDst;
    }
    /**
     * Creates a vec3; may be called with x, y, z to set initial values. (same as create)
     * @param x - Initial x value.
     * @param y - Initial y value.
     * @param z - Initial z value.
     * @returns the created vector
     */
    const fromValues = create;
    /**
     * Sets the values of a Vec3
     * Also see {@link vec3.create} and {@link vec3.copy}
     *
     * @param x first value
     * @param y second value
     * @param z third value
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector with its elements set.
     */
    function set(x, y, z, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = x;
        newDst[1] = y;
        newDst[2] = z;
        return newDst;
    }
    /**
     * Applies Math.ceil to each element of vector
     * @param v - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the ceil of each element of v.
     */
    function ceil(v, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = Math.ceil(v[0]);
        newDst[1] = Math.ceil(v[1]);
        newDst[2] = Math.ceil(v[2]);
        return newDst;
    }
    /**
     * Applies Math.floor to each element of vector
     * @param v - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the floor of each element of v.
     */
    function floor(v, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = Math.floor(v[0]);
        newDst[1] = Math.floor(v[1]);
        newDst[2] = Math.floor(v[2]);
        return newDst;
    }
    /**
     * Applies Math.round to each element of vector
     * @param v - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the round of each element of v.
     */
    function round(v, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = Math.round(v[0]);
        newDst[1] = Math.round(v[1]);
        newDst[2] = Math.round(v[2]);
        return newDst;
    }
    /**
     * Clamp each element of vector between min and max
     * @param v - Operand vector.
     * @param max - Min value, default 0
     * @param min - Max value, default 1
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that the clamped value of each element of v.
     */
    function clamp(v, min = 0, max = 1, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = Math.min(max, Math.max(min, v[0]));
        newDst[1] = Math.min(max, Math.max(min, v[1]));
        newDst[2] = Math.min(max, Math.max(min, v[2]));
        return newDst;
    }
    /**
     * Adds two vectors; assumes a and b have the same dimension.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the sum of a and b.
     */
    function add(a, b, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = a[0] + b[0];
        newDst[1] = a[1] + b[1];
        newDst[2] = a[2] + b[2];
        return newDst;
    }
    /**
     * Adds two vectors, scaling the 2nd; assumes a and b have the same dimension.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param scale - Amount to scale b
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the sum of a + b * scale.
     */
    function addScaled(a, b, scale, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = a[0] + b[0] * scale;
        newDst[1] = a[1] + b[1] * scale;
        newDst[2] = a[2] + b[2] * scale;
        return newDst;
    }
    /**
     * Returns the angle in radians between two vectors.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @returns The angle in radians between the 2 vectors.
     */
    function angle(a, b) {
        const ax = a[0];
        const ay = a[1];
        const az = a[2];
        const bx = b[0];
        const by = b[1];
        const bz = b[2];
        const mag1 = Math.sqrt(ax * ax + ay * ay + az * az);
        const mag2 = Math.sqrt(bx * bx + by * by + bz * bz);
        const mag = mag1 * mag2;
        const cosine = mag && dot(a, b) / mag;
        return Math.acos(cosine);
    }
    /**
     * Subtracts two vectors.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the difference of a and b.
     */
    function subtract(a, b, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = a[0] - b[0];
        newDst[1] = a[1] - b[1];
        newDst[2] = a[2] - b[2];
        return newDst;
    }
    /**
     * Subtracts two vectors.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the difference of a and b.
     */
    const sub = subtract;
    /**
     * Check if 2 vectors are approximately equal
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @returns true if vectors are approximately equal
     */
    function equalsApproximately(a, b) {
        return Math.abs(a[0] - b[0]) < EPSILON &&
            Math.abs(a[1] - b[1]) < EPSILON &&
            Math.abs(a[2] - b[2]) < EPSILON;
    }
    /**
     * Check if 2 vectors are exactly equal
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @returns true if vectors are exactly equal
     */
    function equals(a, b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    }
    /**
     * Performs linear interpolation on two vectors.
     * Given vectors a and b and interpolation coefficient t, returns
     * a + t * (b - a).
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param t - Interpolation coefficient.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The linear interpolated result.
     */
    function lerp(a, b, t, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = a[0] + t * (b[0] - a[0]);
        newDst[1] = a[1] + t * (b[1] - a[1]);
        newDst[2] = a[2] + t * (b[2] - a[2]);
        return newDst;
    }
    /**
     * Performs linear interpolation on two vectors.
     * Given vectors a and b and interpolation coefficient vector t, returns
     * a + t * (b - a).
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param t - Interpolation coefficients vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns the linear interpolated result.
     */
    function lerpV(a, b, t, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = a[0] + t[0] * (b[0] - a[0]);
        newDst[1] = a[1] + t[1] * (b[1] - a[1]);
        newDst[2] = a[2] + t[2] * (b[2] - a[2]);
        return newDst;
    }
    /**
     * Return max values of two vectors.
     * Given vectors a and b returns
     * [max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2])].
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The max components vector.
     */
    function max(a, b, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = Math.max(a[0], b[0]);
        newDst[1] = Math.max(a[1], b[1]);
        newDst[2] = Math.max(a[2], b[2]);
        return newDst;
    }
    /**
     * Return min values of two vectors.
     * Given vectors a and b returns
     * [min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2])].
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The min components vector.
     */
    function min(a, b, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = Math.min(a[0], b[0]);
        newDst[1] = Math.min(a[1], b[1]);
        newDst[2] = Math.min(a[2], b[2]);
        return newDst;
    }
    /**
     * Multiplies a vector by a scalar.
     * @param v - The vector.
     * @param k - The scalar.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The scaled vector.
     */
    function mulScalar(v, k, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = v[0] * k;
        newDst[1] = v[1] * k;
        newDst[2] = v[2] * k;
        return newDst;
    }
    /**
     * Multiplies a vector by a scalar. (same as mulScalar)
     * @param v - The vector.
     * @param k - The scalar.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The scaled vector.
     */
    const scale = mulScalar;
    /**
     * Divides a vector by a scalar.
     * @param v - The vector.
     * @param k - The scalar.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The scaled vector.
     */
    function divScalar(v, k, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = v[0] / k;
        newDst[1] = v[1] / k;
        newDst[2] = v[2] / k;
        return newDst;
    }
    /**
     * Inverse a vector.
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The inverted vector.
     */
    function inverse(v, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = 1 / v[0];
        newDst[1] = 1 / v[1];
        newDst[2] = 1 / v[2];
        return newDst;
    }
    /**
     * Invert a vector. (same as inverse)
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The inverted vector.
     */
    const invert = inverse;
    /**
     * Computes the cross product of two vectors; assumes both vectors have
     * three entries.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The vector of a cross b.
     */
    function cross(a, b, dst) {
        const newDst = (dst ?? new Ctor(3));
        const t1 = a[2] * b[0] - a[0] * b[2];
        const t2 = a[0] * b[1] - a[1] * b[0];
        newDst[0] = a[1] * b[2] - a[2] * b[1];
        newDst[1] = t1;
        newDst[2] = t2;
        return newDst;
    }
    /**
     * Computes the dot product of two vectors; assumes both vectors have
     * three entries.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @returns dot product
     */
    function dot(a, b) {
        return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]);
    }
    /**
     * Computes the length of vector
     * @param v - vector.
     * @returns length of vector.
     */
    function length(v) {
        const v0 = v[0];
        const v1 = v[1];
        const v2 = v[2];
        return Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
    }
    /**
     * Computes the length of vector (same as length)
     * @param v - vector.
     * @returns length of vector.
     */
    const len = length;
    /**
     * Computes the square of the length of vector
     * @param v - vector.
     * @returns square of the length of vector.
     */
    function lengthSq(v) {
        const v0 = v[0];
        const v1 = v[1];
        const v2 = v[2];
        return v0 * v0 + v1 * v1 + v2 * v2;
    }
    /**
     * Computes the square of the length of vector (same as lengthSq)
     * @param v - vector.
     * @returns square of the length of vector.
     */
    const lenSq = lengthSq;
    /**
     * Computes the distance between 2 points
     * @param a - vector.
     * @param b - vector.
     * @returns distance between a and b
     */
    function distance(a, b) {
        const dx = a[0] - b[0];
        const dy = a[1] - b[1];
        const dz = a[2] - b[2];
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    /**
     * Computes the distance between 2 points (same as distance)
     * @param a - vector.
     * @param b - vector.
     * @returns distance between a and b
     */
    const dist = distance;
    /**
     * Computes the square of the distance between 2 points
     * @param a - vector.
     * @param b - vector.
     * @returns square of the distance between a and b
     */
    function distanceSq(a, b) {
        const dx = a[0] - b[0];
        const dy = a[1] - b[1];
        const dz = a[2] - b[2];
        return dx * dx + dy * dy + dz * dz;
    }
    /**
     * Computes the square of the distance between 2 points (same as distanceSq)
     * @param a - vector.
     * @param b - vector.
     * @returns square of the distance between a and b
     */
    const distSq = distanceSq;
    /**
     * Divides a vector by its Euclidean length and returns the quotient.
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The normalized vector.
     */
    function normalize(v, dst) {
        const newDst = (dst ?? new Ctor(3));
        const v0 = v[0];
        const v1 = v[1];
        const v2 = v[2];
        const len = Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
        if (len > 0.00001) {
            newDst[0] = v0 / len;
            newDst[1] = v1 / len;
            newDst[2] = v2 / len;
        }
        else {
            newDst[0] = 0;
            newDst[1] = 0;
            newDst[2] = 0;
        }
        return newDst;
    }
    /**
     * Negates a vector.
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns -v.
     */
    function negate(v, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = -v[0];
        newDst[1] = -v[1];
        newDst[2] = -v[2];
        return newDst;
    }
    /**
     * Copies a vector. (same as {@link vec3.clone})
     * Also see {@link vec3.create} and {@link vec3.set}
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A copy of v.
     */
    function copy(v, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = v[0];
        newDst[1] = v[1];
        newDst[2] = v[2];
        return newDst;
    }
    /**
     * Clones a vector. (same as {@link vec3.copy})
     * Also see {@link vec3.create} and {@link vec3.set}
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A copy of v.
     */
    const clone = copy;
    /**
     * Multiplies a vector by another vector (component-wise); assumes a and
     * b have the same length.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The vector of products of entries of a and b.
     */
    function multiply(a, b, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = a[0] * b[0];
        newDst[1] = a[1] * b[1];
        newDst[2] = a[2] * b[2];
        return newDst;
    }
    /**
     * Multiplies a vector by another vector (component-wise); assumes a and
     * b have the same length. (same as mul)
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The vector of products of entries of a and b.
     */
    const mul = multiply;
    /**
     * Divides a vector by another vector (component-wise); assumes a and
     * b have the same length.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The vector of quotients of entries of a and b.
     */
    function divide(a, b, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = a[0] / b[0];
        newDst[1] = a[1] / b[1];
        newDst[2] = a[2] / b[2];
        return newDst;
    }
    /**
     * Divides a vector by another vector (component-wise); assumes a and
     * b have the same length. (same as divide)
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The vector of quotients of entries of a and b.
     */
    const div = divide;
    /**
     * Creates a random vector
     * @param scale - Default 1
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The random vector.
     */
    function random(scale = 1, dst) {
        const newDst = (dst ?? new Ctor(3));
        const angle = Math.random() * 2 * Math.PI;
        const z = Math.random() * 2 - 1;
        const zScale = Math.sqrt(1 - z * z) * scale;
        newDst[0] = Math.cos(angle) * zScale;
        newDst[1] = Math.sin(angle) * zScale;
        newDst[2] = z * scale;
        return newDst;
    }
    /**
     * Zero's a vector
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The zeroed vector.
     */
    function zero(dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = 0;
        newDst[1] = 0;
        newDst[2] = 0;
        return newDst;
    }
    /**
     * transform vec3 by 4x4 matrix
     * @param v - the vector
     * @param m - The matrix.
     * @param dst - optional vec3 to store result. If not passed a new one is created.
     * @returns the transformed vector
     */
    function transformMat4(v, m, dst) {
        const newDst = (dst ?? new Ctor(3));
        const x = v[0];
        const y = v[1];
        const z = v[2];
        const w = (m[3] * x + m[7] * y + m[11] * z + m[15]) || 1;
        newDst[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
        newDst[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
        newDst[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
        return newDst;
    }
    /**
     * Transform vec3 by upper 3x3 matrix inside 4x4 matrix.
     * @param v - The direction.
     * @param m - The matrix.
     * @param dst - optional vec3 to store result. If not passed a new one is created.
     * @returns The transformed vector.
     */
    function transformMat4Upper3x3(v, m, dst) {
        const newDst = (dst ?? new Ctor(3));
        const v0 = v[0];
        const v1 = v[1];
        const v2 = v[2];
        newDst[0] = v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0];
        newDst[1] = v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1];
        newDst[2] = v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2];
        return newDst;
    }
    /**
     * Transforms vec3 by 3x3 matrix
     *
     * @param v - the vector
     * @param m - The matrix.
     * @param dst - optional vec3 to store result. If not passed a new one is created.
     * @returns the transformed vector
     */
    function transformMat3(v, m, dst) {
        const newDst = (dst ?? new Ctor(3));
        const x = v[0];
        const y = v[1];
        const z = v[2];
        newDst[0] = x * m[0] + y * m[4] + z * m[8];
        newDst[1] = x * m[1] + y * m[5] + z * m[9];
        newDst[2] = x * m[2] + y * m[6] + z * m[10];
        return newDst;
    }
    /**
     * Transforms vec3 by Quaternion
     * @param v - the vector to transform
     * @param q - the quaternion to transform by
     * @param dst - optional vec3 to store result. If not passed a new one is created.
     * @returns the transformed
     */
    function transformQuat(v, q, dst) {
        const newDst = (dst ?? new Ctor(3));
        const qx = q[0];
        const qy = q[1];
        const qz = q[2];
        const w2 = q[3] * 2;
        const x = v[0];
        const y = v[1];
        const z = v[2];
        const uvX = qy * z - qz * y;
        const uvY = qz * x - qx * z;
        const uvZ = qx * y - qy * x;
        newDst[0] = x + uvX * w2 + (qy * uvZ - qz * uvY) * 2;
        newDst[1] = y + uvY * w2 + (qz * uvX - qx * uvZ) * 2;
        newDst[2] = z + uvZ * w2 + (qx * uvY - qy * uvX) * 2;
        return newDst;
    }
    /**
     * Returns the translation component of a 4-by-4 matrix as a vector with 3
     * entries.
     * @param m - The matrix.
     * @param dst - vector to hold result. If not passed a new one is created.
     * @returns The translation component of m.
     */
    function getTranslation(m, dst) {
        const newDst = (dst ?? new Ctor(3));
        newDst[0] = m[12];
        newDst[1] = m[13];
        newDst[2] = m[14];
        return newDst;
    }
    /**
     * Returns an axis of a 4x4 matrix as a vector with 3 entries
     * @param m - The matrix.
     * @param axis - The axis 0 = x, 1 = y, 2 = z;
     * @returns The axis component of m.
     */
    function getAxis(m, axis, dst) {
        const newDst = (dst ?? new Ctor(3));
        const off = axis * 4;
        newDst[0] = m[off + 0];
        newDst[1] = m[off + 1];
        newDst[2] = m[off + 2];
        return newDst;
    }
    /**
     * Returns the scaling component of the matrix
     * @param m - The Matrix
     * @param dst - The vector to set. If not passed a new one is created.
     */
    function getScaling(m, dst) {
        const newDst = (dst ?? new Ctor(3));
        const xx = m[0];
        const xy = m[1];
        const xz = m[2];
        const yx = m[4];
        const yy = m[5];
        const yz = m[6];
        const zx = m[8];
        const zy = m[9];
        const zz = m[10];
        newDst[0] = Math.sqrt(xx * xx + xy * xy + xz * xz);
        newDst[1] = Math.sqrt(yx * yx + yy * yy + yz * yz);
        newDst[2] = Math.sqrt(zx * zx + zy * zy + zz * zz);
        return newDst;
    }
    /**
     * Rotate a 3D vector around the x-axis
     *
     * @param {ReadonlyVec3} a The vec3 point to rotate
     * @param {ReadonlyVec3} b The origin of the rotation
     * @param {Number} rad The angle of rotation in radians
     * @param dst - The vector to set. If not passed a new one is created.
     * @returns the rotated vector
     */
    function rotateX(a, b, rad, dst) {
        const newDst = (dst ?? new Ctor(3));
        const p = [];
        const r = [];
        //Translate point to the origin
        p[0] = a[0] - b[0];
        p[1] = a[1] - b[1];
        p[2] = a[2] - b[2];
        //perform rotation
        r[0] = p[0];
        r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
        r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
        //translate to correct position
        newDst[0] = r[0] + b[0];
        newDst[1] = r[1] + b[1];
        newDst[2] = r[2] + b[2];
        return newDst;
    }
    /**
     * Rotate a 3D vector around the y-axis
     *
     * @param {ReadonlyVec3} a The vec3 point to rotate
     * @param {ReadonlyVec3} b The origin of the rotation
     * @param {Number} rad The angle of rotation in radians
     * @param dst - The vector to set. If not passed a new one is created.
     * @returns the rotated vector
     */
    function rotateY(a, b, rad, dst) {
        const newDst = (dst ?? new Ctor(3));
        const p = [];
        const r = [];
        // translate point to the origin
        p[0] = a[0] - b[0];
        p[1] = a[1] - b[1];
        p[2] = a[2] - b[2];
        // perform rotation
        r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
        r[1] = p[1];
        r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
        // translate to correct position
        newDst[0] = r[0] + b[0];
        newDst[1] = r[1] + b[1];
        newDst[2] = r[2] + b[2];
        return newDst;
    }
    /**
     * Rotate a 3D vector around the z-axis
     *
     * @param {ReadonlyVec3} a The vec3 point to rotate
     * @param {ReadonlyVec3} b The origin of the rotation
     * @param {Number} rad The angle of rotation in radians
     * @param dst - The vector to set. If not passed a new one is created.
     * @returns {vec3} out
     */
    function rotateZ(a, b, rad, dst) {
        const newDst = (dst ?? new Ctor(3));
        const p = [];
        const r = [];
        // translate point to the origin
        p[0] = a[0] - b[0];
        p[1] = a[1] - b[1];
        p[2] = a[2] - b[2];
        // perform rotation
        r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
        r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
        r[2] = p[2];
        // translate to correct position
        newDst[0] = r[0] + b[0];
        newDst[1] = r[1] + b[1];
        newDst[2] = r[2] + b[2];
        return newDst;
    }
    /**
     * Treat a 3D vector as a direction and set it's length
     *
     * @param a The vec3 to lengthen
     * @param len The length of the resulting vector
     * @returns The lengthened vector
     */
    function setLength(a, len, dst) {
        const newDst = (dst ?? new Ctor(3));
        normalize(a, newDst);
        return mulScalar(newDst, len, newDst);
    }
    /**
     * Ensure a vector is not longer than a max length
     *
     * @param a The vec3 to limit
     * @param maxLen The longest length of the resulting vector
     * @returns The vector, shortened to maxLen if it's too long
     */
    function truncate(a, maxLen, dst) {
        const newDst = (dst ?? new Ctor(3));
        if (length(a) > maxLen) {
            return setLength(a, maxLen, newDst);
        }
        return copy(a, newDst);
    }
    /**
     * Return the vector exactly between 2 endpoint vectors
     *
     * @param a Endpoint 1
     * @param b Endpoint 2
     * @returns The vector exactly residing between endpoints 1 and 2
     */
    function midpoint(a, b, dst) {
        const newDst = (dst ?? new Ctor(3));
        return lerp(a, b, 0.5, newDst);
    }
    return {
        create,
        fromValues,
        set,
        ceil,
        floor,
        round,
        clamp,
        add,
        addScaled,
        angle,
        subtract,
        sub,
        equalsApproximately,
        equals,
        lerp,
        lerpV,
        max,
        min,
        mulScalar,
        scale,
        divScalar,
        inverse,
        invert,
        cross,
        dot,
        length,
        len,
        lengthSq,
        lenSq,
        distance,
        dist,
        distanceSq,
        distSq,
        normalize,
        negate,
        copy,
        clone,
        multiply,
        mul,
        divide,
        div,
        random,
        zero,
        transformMat4,
        transformMat4Upper3x3,
        transformMat3,
        transformQuat,
        getTranslation,
        getAxis,
        getScaling,
        rotateX,
        rotateY,
        rotateZ,
        setLength,
        truncate,
        midpoint,
    };
}
const cache$4 = new Map();
function getAPI$4(Ctor) {
    let api = cache$4.get(Ctor);
    if (!api) {
        api = getAPIImpl$4(Ctor);
        cache$4.set(Ctor, api);
    }
    return api;
}

/*
 * Copyright 2022 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
/**
 * Generates a typed API for Mat3
 * */
function getAPIImpl$3(Ctor) {
    const vec2 = getAPI$5(Ctor);
    const vec3 = getAPI$4(Ctor);
    /**
     * Create a Mat3 from values
     *
     * Note: Since passing in a raw JavaScript array
     * is valid in all circumstances, if you want to
     * force a JavaScript array into a Mat3's specified type
     * it would be faster to use
     *
     * ```
     * const m = mat3.clone(someJSArray);
     * ```
     *
     * @param v0 - value for element 0
     * @param v1 - value for element 1
     * @param v2 - value for element 2
     * @param v3 - value for element 3
     * @param v4 - value for element 4
     * @param v5 - value for element 5
     * @param v6 - value for element 6
     * @param v7 - value for element 7
     * @param v8 - value for element 8
     * @returns matrix created from values.
     */
    function create(v0, v1, v2, v3, v4, v5, v6, v7, v8) {
        const newDst = new Ctor(12);
        // to make the array homogenous
        newDst[3] = 0;
        newDst[7] = 0;
        newDst[11] = 0;
        if (v0 !== undefined) {
            newDst[0] = v0;
            if (v1 !== undefined) {
                newDst[1] = v1;
                if (v2 !== undefined) {
                    newDst[2] = v2;
                    if (v3 !== undefined) {
                        newDst[4] = v3;
                        if (v4 !== undefined) {
                            newDst[5] = v4;
                            if (v5 !== undefined) {
                                newDst[6] = v5;
                                if (v6 !== undefined) {
                                    newDst[8] = v6;
                                    if (v7 !== undefined) {
                                        newDst[9] = v7;
                                        if (v8 !== undefined) {
                                            newDst[10] = v8;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return newDst;
    }
    /**
     * Sets the values of a Mat3
     * Also see {@link mat3.create} and {@link mat3.copy}
     *
     * @param v0 - value for element 0
     * @param v1 - value for element 1
     * @param v2 - value for element 2
     * @param v3 - value for element 3
     * @param v4 - value for element 4
     * @param v5 - value for element 5
     * @param v6 - value for element 6
     * @param v7 - value for element 7
     * @param v8 - value for element 8
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns Mat3 set from values.
     */
    function set(v0, v1, v2, v3, v4, v5, v6, v7, v8, dst) {
        const newDst = (dst ?? new Ctor(12));
        newDst[0] = v0;
        newDst[1] = v1;
        newDst[2] = v2;
        newDst[3] = 0;
        newDst[4] = v3;
        newDst[5] = v4;
        newDst[6] = v5;
        newDst[7] = 0;
        newDst[8] = v6;
        newDst[9] = v7;
        newDst[10] = v8;
        newDst[11] = 0;
        return newDst;
    }
    /**
     * Creates a Mat3 from the upper left 3x3 part of a Mat4
     * @param m4 - source matrix
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns Mat3 made from m4
     */
    function fromMat4(m4, dst) {
        const newDst = (dst ?? new Ctor(12));
        newDst[0] = m4[0];
        newDst[1] = m4[1];
        newDst[2] = m4[2];
        newDst[3] = 0;
        newDst[4] = m4[4];
        newDst[5] = m4[5];
        newDst[6] = m4[6];
        newDst[7] = 0;
        newDst[8] = m4[8];
        newDst[9] = m4[9];
        newDst[10] = m4[10];
        newDst[11] = 0;
        return newDst;
    }
    /**
     * Creates a Mat3 rotation matrix from a quaternion
     * @param q - quaternion to create matrix from
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns Mat3 made from q
     */
    function fromQuat(q, dst) {
        const newDst = (dst ?? new Ctor(12));
        const x = q[0];
        const y = q[1];
        const z = q[2];
        const w = q[3];
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const yx = y * x2;
        const yy = y * y2;
        const zx = z * x2;
        const zy = z * y2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        newDst[0] = 1 - yy - zz;
        newDst[1] = yx + wz;
        newDst[2] = zx - wy;
        newDst[3] = 0;
        newDst[4] = yx - wz;
        newDst[5] = 1 - xx - zz;
        newDst[6] = zy + wx;
        newDst[7] = 0;
        newDst[8] = zx + wy;
        newDst[9] = zy - wx;
        newDst[10] = 1 - xx - yy;
        newDst[11] = 0;
        return newDst;
    }
    /**
     * Negates a matrix.
     * @param m - The matrix.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns -m.
     */
    function negate(m, dst) {
        const newDst = (dst ?? new Ctor(12));
        newDst[0] = -m[0];
        newDst[1] = -m[1];
        newDst[2] = -m[2];
        newDst[4] = -m[4];
        newDst[5] = -m[5];
        newDst[6] = -m[6];
        newDst[8] = -m[8];
        newDst[9] = -m[9];
        newDst[10] = -m[10];
        return newDst;
    }
    /**
     * Copies a matrix. (same as {@link mat3.clone})
     * Also see {@link mat3.create} and {@link mat3.set}
     * @param m - The matrix.
     * @param dst - The matrix. If not passed a new one is created.
     * @returns A copy of m.
     */
    function copy(m, dst) {
        const newDst = (dst ?? new Ctor(12));
        newDst[0] = m[0];
        newDst[1] = m[1];
        newDst[2] = m[2];
        newDst[4] = m[4];
        newDst[5] = m[5];
        newDst[6] = m[6];
        newDst[8] = m[8];
        newDst[9] = m[9];
        newDst[10] = m[10];
        return newDst;
    }
    /**
     * Copies a matrix (same as {@link mat3.copy})
     * Also see {@link mat3.create} and {@link mat3.set}
     * @param m - The matrix.
     * @param dst - The matrix. If not passed a new one is created.
     * @returns A copy of m.
     */
    const clone = copy;
    /**
     * Check if 2 matrices are approximately equal
     * @param a Operand matrix.
     * @param b Operand matrix.
     * @returns true if matrices are approximately equal
     */
    function equalsApproximately(a, b) {
        return Math.abs(a[0] - b[0]) < EPSILON &&
            Math.abs(a[1] - b[1]) < EPSILON &&
            Math.abs(a[2] - b[2]) < EPSILON &&
            Math.abs(a[4] - b[4]) < EPSILON &&
            Math.abs(a[5] - b[5]) < EPSILON &&
            Math.abs(a[6] - b[6]) < EPSILON &&
            Math.abs(a[8] - b[8]) < EPSILON &&
            Math.abs(a[9] - b[9]) < EPSILON &&
            Math.abs(a[10] - b[10]) < EPSILON;
    }
    /**
     * Check if 2 matrices are exactly equal
     * @param a Operand matrix.
     * @param b Operand matrix.
     * @returns true if matrices are exactly equal
     */
    function equals(a, b) {
        return a[0] === b[0] &&
            a[1] === b[1] &&
            a[2] === b[2] &&
            a[4] === b[4] &&
            a[5] === b[5] &&
            a[6] === b[6] &&
            a[8] === b[8] &&
            a[9] === b[9] &&
            a[10] === b[10];
    }
    /**
     * Creates a 3-by-3 identity matrix.
     *
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns A 3-by-3 identity matrix.
     */
    function identity(dst) {
        const newDst = (dst ?? new Ctor(12));
        newDst[0] = 1;
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[4] = 0;
        newDst[5] = 1;
        newDst[6] = 0;
        newDst[8] = 0;
        newDst[9] = 0;
        newDst[10] = 1;
        return newDst;
    }
    /**
     * Takes the transpose of a matrix.
     * @param m - The matrix.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The transpose of m.
     */
    function transpose(m, dst) {
        const newDst = (dst ?? new Ctor(12));
        if (newDst === m) {
            let t;
            // 0 1 2
            // 4 5 6
            // 8 9 10
            t = m[1];
            m[1] = m[4];
            m[4] = t;
            t = m[2];
            m[2] = m[8];
            m[8] = t;
            t = m[6];
            m[6] = m[9];
            m[9] = t;
            return newDst;
        }
        const m00 = m[0 * 4 + 0];
        const m01 = m[0 * 4 + 1];
        const m02 = m[0 * 4 + 2];
        const m10 = m[1 * 4 + 0];
        const m11 = m[1 * 4 + 1];
        const m12 = m[1 * 4 + 2];
        const m20 = m[2 * 4 + 0];
        const m21 = m[2 * 4 + 1];
        const m22 = m[2 * 4 + 2];
        newDst[0] = m00;
        newDst[1] = m10;
        newDst[2] = m20;
        newDst[4] = m01;
        newDst[5] = m11;
        newDst[6] = m21;
        newDst[8] = m02;
        newDst[9] = m12;
        newDst[10] = m22;
        return newDst;
    }
    /**
     * Computes the inverse of a 3-by-3 matrix.
     * @param m - The matrix.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The inverse of m.
     */
    function inverse(m, dst) {
        const newDst = (dst ?? new Ctor(12));
        const m00 = m[0 * 4 + 0];
        const m01 = m[0 * 4 + 1];
        const m02 = m[0 * 4 + 2];
        const m10 = m[1 * 4 + 0];
        const m11 = m[1 * 4 + 1];
        const m12 = m[1 * 4 + 2];
        const m20 = m[2 * 4 + 0];
        const m21 = m[2 * 4 + 1];
        const m22 = m[2 * 4 + 2];
        const b01 = m22 * m11 - m12 * m21;
        const b11 = -m22 * m10 + m12 * m20;
        const b21 = m21 * m10 - m11 * m20;
        const invDet = 1 / (m00 * b01 + m01 * b11 + m02 * b21);
        newDst[0] = b01 * invDet;
        newDst[1] = (-m22 * m01 + m02 * m21) * invDet;
        newDst[2] = (m12 * m01 - m02 * m11) * invDet;
        newDst[4] = b11 * invDet;
        newDst[5] = (m22 * m00 - m02 * m20) * invDet;
        newDst[6] = (-m12 * m00 + m02 * m10) * invDet;
        newDst[8] = b21 * invDet;
        newDst[9] = (-m21 * m00 + m01 * m20) * invDet;
        newDst[10] = (m11 * m00 - m01 * m10) * invDet;
        return newDst;
    }
    /**
     * Compute the determinant of a matrix
     * @param m - the matrix
     * @returns the determinant
     */
    function determinant(m) {
        const m00 = m[0 * 4 + 0];
        const m01 = m[0 * 4 + 1];
        const m02 = m[0 * 4 + 2];
        const m10 = m[1 * 4 + 0];
        const m11 = m[1 * 4 + 1];
        const m12 = m[1 * 4 + 2];
        const m20 = m[2 * 4 + 0];
        const m21 = m[2 * 4 + 1];
        const m22 = m[2 * 4 + 2];
        return m00 * (m11 * m22 - m21 * m12) -
            m10 * (m01 * m22 - m21 * m02) +
            m20 * (m01 * m12 - m11 * m02);
    }
    /**
     * Computes the inverse of a 3-by-3 matrix. (same as inverse)
     * @param m - The matrix.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The inverse of m.
     */
    const invert = inverse;
    /**
     * Multiplies two 3-by-3 matrices with a on the left and b on the right
     * @param a - The matrix on the left.
     * @param b - The matrix on the right.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The matrix product of a and b.
     */
    function multiply(a, b, dst) {
        const newDst = (dst ?? new Ctor(12));
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a10 = a[4 + 0];
        const a11 = a[4 + 1];
        const a12 = a[4 + 2];
        const a20 = a[8 + 0];
        const a21 = a[8 + 1];
        const a22 = a[8 + 2];
        const b00 = b[0];
        const b01 = b[1];
        const b02 = b[2];
        const b10 = b[4 + 0];
        const b11 = b[4 + 1];
        const b12 = b[4 + 2];
        const b20 = b[8 + 0];
        const b21 = b[8 + 1];
        const b22 = b[8 + 2];
        newDst[0] = a00 * b00 + a10 * b01 + a20 * b02;
        newDst[1] = a01 * b00 + a11 * b01 + a21 * b02;
        newDst[2] = a02 * b00 + a12 * b01 + a22 * b02;
        newDst[4] = a00 * b10 + a10 * b11 + a20 * b12;
        newDst[5] = a01 * b10 + a11 * b11 + a21 * b12;
        newDst[6] = a02 * b10 + a12 * b11 + a22 * b12;
        newDst[8] = a00 * b20 + a10 * b21 + a20 * b22;
        newDst[9] = a01 * b20 + a11 * b21 + a21 * b22;
        newDst[10] = a02 * b20 + a12 * b21 + a22 * b22;
        return newDst;
    }
    /**
     * Multiplies two 3-by-3 matrices with a on the left and b on the right (same as multiply)
     * @param a - The matrix on the left.
     * @param b - The matrix on the right.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The matrix product of a and b.
     */
    const mul = multiply;
    /**
     * Sets the translation component of a 3-by-3 matrix to the given
     * vector.
     * @param a - The matrix.
     * @param v - The vector.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The matrix with translation set.
     */
    function setTranslation(a, v, dst) {
        const newDst = (dst ?? identity());
        if (a !== newDst) {
            newDst[0] = a[0];
            newDst[1] = a[1];
            newDst[2] = a[2];
            newDst[4] = a[4];
            newDst[5] = a[5];
            newDst[6] = a[6];
        }
        newDst[8] = v[0];
        newDst[9] = v[1];
        newDst[10] = 1;
        return newDst;
    }
    /**
     * Returns the translation component of a 3-by-3 matrix as a vector with 3
     * entries.
     * @param m - The matrix.
     * @param dst - vector to hold result. If not passed a new one is created.
     * @returns The translation component of m.
     */
    function getTranslation(m, dst) {
        const newDst = (dst ?? vec2.create());
        newDst[0] = m[8];
        newDst[1] = m[9];
        return newDst;
    }
    /**
     * Returns an axis of a 3x3 matrix as a vector with 2 entries
     * @param m - The matrix.
     * @param axis - The axis 0 = x, 1 = y,
     * @returns The axis component of m.
     */
    function getAxis(m, axis, dst) {
        const newDst = (dst ?? vec2.create());
        const off = axis * 4;
        newDst[0] = m[off + 0];
        newDst[1] = m[off + 1];
        return newDst;
    }
    /**
     * Sets an axis of a 3x3 matrix as a vector with 2 entries
     * @param m - The matrix.
     * @param v - the axis vector
     * @param axis - The axis  0 = x, 1 = y;
     * @param dst - The matrix to set. If not passed a new one is created.
     * @returns The matrix with axis set.
     */
    function setAxis(m, v, axis, dst) {
        const newDst = (dst === m ? m : copy(m, dst));
        const off = axis * 4;
        newDst[off + 0] = v[0];
        newDst[off + 1] = v[1];
        return newDst;
    }
    /**
     * Returns the "2d" scaling component of the matrix
     * @param m - The Matrix
     * @param dst - The vector to set. If not passed a new one is created.
     */
    function getScaling(m, dst) {
        const newDst = (dst ?? vec2.create());
        const xx = m[0];
        const xy = m[1];
        const yx = m[4];
        const yy = m[5];
        newDst[0] = Math.sqrt(xx * xx + xy * xy);
        newDst[1] = Math.sqrt(yx * yx + yy * yy);
        return newDst;
    }
    /**
     * Returns the "3d" scaling component of the matrix
     * @param m - The Matrix
     * @param dst - The vector to set. If not passed a new one is created.
     */
    function get3DScaling(m, dst) {
        const newDst = (dst ?? vec3.create());
        const xx = m[0];
        const xy = m[1];
        const xz = m[2];
        const yx = m[4];
        const yy = m[5];
        const yz = m[6];
        const zx = m[8];
        const zy = m[9];
        const zz = m[10];
        newDst[0] = Math.sqrt(xx * xx + xy * xy + xz * xz);
        newDst[1] = Math.sqrt(yx * yx + yy * yy + yz * yz);
        newDst[2] = Math.sqrt(zx * zx + zy * zy + zz * zz);
        return newDst;
    }
    /**
     * Creates a 3-by-3 matrix which translates by the given vector v.
     * @param v - The vector by which to translate.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The translation matrix.
     */
    function translation(v, dst) {
        const newDst = (dst ?? new Ctor(12));
        newDst[0] = 1;
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[4] = 0;
        newDst[5] = 1;
        newDst[6] = 0;
        newDst[8] = v[0];
        newDst[9] = v[1];
        newDst[10] = 1;
        return newDst;
    }
    /**
     * Translates the given 3-by-3 matrix by the given vector v.
     * @param m - The matrix.
     * @param v - The vector by which to translate.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The translated matrix.
     */
    function translate(m, v, dst) {
        const newDst = (dst ?? new Ctor(12));
        const v0 = v[0];
        const v1 = v[1];
        const m00 = m[0];
        const m01 = m[1];
        const m02 = m[2];
        const m10 = m[1 * 4 + 0];
        const m11 = m[1 * 4 + 1];
        const m12 = m[1 * 4 + 2];
        const m20 = m[2 * 4 + 0];
        const m21 = m[2 * 4 + 1];
        const m22 = m[2 * 4 + 2];
        if (m !== newDst) {
            newDst[0] = m00;
            newDst[1] = m01;
            newDst[2] = m02;
            newDst[4] = m10;
            newDst[5] = m11;
            newDst[6] = m12;
        }
        newDst[8] = m00 * v0 + m10 * v1 + m20;
        newDst[9] = m01 * v0 + m11 * v1 + m21;
        newDst[10] = m02 * v0 + m12 * v1 + m22;
        return newDst;
    }
    /**
     * Creates a 3-by-3 matrix which rotates  by the given angle.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The rotation matrix.
     */
    function rotation(angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(12));
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        newDst[0] = c;
        newDst[1] = s;
        newDst[2] = 0;
        newDst[4] = -s;
        newDst[5] = c;
        newDst[6] = 0;
        newDst[8] = 0;
        newDst[9] = 0;
        newDst[10] = 1;
        return newDst;
    }
    /**
     * Rotates the given 3-by-3 matrix  by the given angle.
     * @param m - The matrix.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The rotated matrix.
     */
    function rotate(m, angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(12));
        const m00 = m[0 * 4 + 0];
        const m01 = m[0 * 4 + 1];
        const m02 = m[0 * 4 + 2];
        const m10 = m[1 * 4 + 0];
        const m11 = m[1 * 4 + 1];
        const m12 = m[1 * 4 + 2];
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        newDst[0] = c * m00 + s * m10;
        newDst[1] = c * m01 + s * m11;
        newDst[2] = c * m02 + s * m12;
        newDst[4] = c * m10 - s * m00;
        newDst[5] = c * m11 - s * m01;
        newDst[6] = c * m12 - s * m02;
        if (m !== newDst) {
            newDst[8] = m[8];
            newDst[9] = m[9];
            newDst[10] = m[10];
        }
        return newDst;
    }
    /**
     * Creates a 3-by-3 matrix which rotates around the x-axis by the given angle.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The rotation matrix.
     */
    function rotationX(angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(12));
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        newDst[0] = 1;
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[4] = 0;
        newDst[5] = c;
        newDst[6] = s;
        newDst[8] = 0;
        newDst[9] = -s;
        newDst[10] = c;
        return newDst;
    }
    /**
     * Rotates the given 3-by-3 matrix around the x-axis by the given
     * angle.
     * @param m - The matrix.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The rotated matrix.
     */
    function rotateX(m, angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(12));
        const m10 = m[4];
        const m11 = m[5];
        const m12 = m[6];
        const m20 = m[8];
        const m21 = m[9];
        const m22 = m[10];
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        newDst[4] = c * m10 + s * m20;
        newDst[5] = c * m11 + s * m21;
        newDst[6] = c * m12 + s * m22;
        newDst[8] = c * m20 - s * m10;
        newDst[9] = c * m21 - s * m11;
        newDst[10] = c * m22 - s * m12;
        if (m !== newDst) {
            newDst[0] = m[0];
            newDst[1] = m[1];
            newDst[2] = m[2];
        }
        return newDst;
    }
    /**
     * Creates a 3-by-3 matrix which rotates around the y-axis by the given angle.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The rotation matrix.
     */
    function rotationY(angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(12));
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        newDst[0] = c;
        newDst[1] = 0;
        newDst[2] = -s;
        newDst[4] = 0;
        newDst[5] = 1;
        newDst[6] = 0;
        newDst[8] = s;
        newDst[9] = 0;
        newDst[10] = c;
        return newDst;
    }
    /**
     * Rotates the given 3-by-3 matrix around the y-axis by the given
     * angle.
     * @param m - The matrix.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The rotated matrix.
     */
    function rotateY(m, angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(12));
        const m00 = m[0 * 4 + 0];
        const m01 = m[0 * 4 + 1];
        const m02 = m[0 * 4 + 2];
        const m20 = m[2 * 4 + 0];
        const m21 = m[2 * 4 + 1];
        const m22 = m[2 * 4 + 2];
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        newDst[0] = c * m00 - s * m20;
        newDst[1] = c * m01 - s * m21;
        newDst[2] = c * m02 - s * m22;
        newDst[8] = c * m20 + s * m00;
        newDst[9] = c * m21 + s * m01;
        newDst[10] = c * m22 + s * m02;
        if (m !== newDst) {
            newDst[4] = m[4];
            newDst[5] = m[5];
            newDst[6] = m[6];
        }
        return newDst;
    }
    /**
     * Creates a 3-by-3 matrix which rotates around the z-axis by the given angle.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The rotation matrix.
     */
    const rotationZ = rotation;
    /**
     * Rotates the given 3-by-3 matrix around the z-axis by the given
     * angle.
     * @param m - The matrix.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The rotated matrix.
     */
    const rotateZ = rotate;
    /**
     * Creates a 3-by-3 matrix which scales in each dimension by an amount given by
     * the corresponding entry in the given vector; assumes the vector has two
     * entries.
     * @param v - A vector of
     *     2 entries specifying the factor by which to scale in each dimension.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The scaling matrix.
     */
    function scaling(v, dst) {
        const newDst = (dst ?? new Ctor(12));
        newDst[0] = v[0];
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[4] = 0;
        newDst[5] = v[1];
        newDst[6] = 0;
        newDst[8] = 0;
        newDst[9] = 0;
        newDst[10] = 1;
        return newDst;
    }
    /**
     * Scales the given 3-by-3 matrix in each dimension by an amount
     * given by the corresponding entry in the given vector; assumes the vector has
     * two entries.
     * @param m - The matrix to be modified.
     * @param v - A vector of 2 entries specifying the
     *     factor by which to scale in each dimension.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The scaled matrix.
     */
    function scale(m, v, dst) {
        const newDst = (dst ?? new Ctor(12));
        const v0 = v[0];
        const v1 = v[1];
        newDst[0] = v0 * m[0 * 4 + 0];
        newDst[1] = v0 * m[0 * 4 + 1];
        newDst[2] = v0 * m[0 * 4 + 2];
        newDst[4] = v1 * m[1 * 4 + 0];
        newDst[5] = v1 * m[1 * 4 + 1];
        newDst[6] = v1 * m[1 * 4 + 2];
        if (m !== newDst) {
            newDst[8] = m[8];
            newDst[9] = m[9];
            newDst[10] = m[10];
        }
        return newDst;
    }
    /**
     * Creates a 3-by-3 matrix which scales in each dimension by an amount given by
     * the corresponding entry in the given vector; assumes the vector has three
     * entries.
     * @param v - A vector of
     *     3 entries specifying the factor by which to scale in each dimension.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The scaling matrix.
     */
    function scaling3D(v, dst) {
        const newDst = (dst ?? new Ctor(12));
        newDst[0] = v[0];
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[4] = 0;
        newDst[5] = v[1];
        newDst[6] = 0;
        newDst[8] = 0;
        newDst[9] = 0;
        newDst[10] = v[2];
        return newDst;
    }
    /**
     * Scales the given 3-by-3 matrix in each dimension by an amount
     * given by the corresponding entry in the given vector; assumes the vector has
     * three entries.
     * @param m - The matrix to be modified.
     * @param v - A vector of 3 entries specifying the
     *     factor by which to scale in each dimension.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The scaled matrix.
     */
    function scale3D(m, v, dst) {
        const newDst = (dst ?? new Ctor(12));
        const v0 = v[0];
        const v1 = v[1];
        const v2 = v[2];
        newDst[0] = v0 * m[0 * 4 + 0];
        newDst[1] = v0 * m[0 * 4 + 1];
        newDst[2] = v0 * m[0 * 4 + 2];
        newDst[4] = v1 * m[1 * 4 + 0];
        newDst[5] = v1 * m[1 * 4 + 1];
        newDst[6] = v1 * m[1 * 4 + 2];
        newDst[8] = v2 * m[2 * 4 + 0];
        newDst[9] = v2 * m[2 * 4 + 1];
        newDst[10] = v2 * m[2 * 4 + 2];
        return newDst;
    }
    /**
     * Creates a 3-by-3 matrix which scales uniformly in the X and Y dimensions
     * @param s - Amount to scale
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The scaling matrix.
     */
    function uniformScaling(s, dst) {
        const newDst = (dst ?? new Ctor(12));
        newDst[0] = s;
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[4] = 0;
        newDst[5] = s;
        newDst[6] = 0;
        newDst[8] = 0;
        newDst[9] = 0;
        newDst[10] = 1;
        return newDst;
    }
    /**
     * Scales the given 3-by-3 matrix in the X and Y dimension by an amount
     * given.
     * @param m - The matrix to be modified.
     * @param s - Amount to scale.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The scaled matrix.
     */
    function uniformScale(m, s, dst) {
        const newDst = (dst ?? new Ctor(12));
        newDst[0] = s * m[0 * 4 + 0];
        newDst[1] = s * m[0 * 4 + 1];
        newDst[2] = s * m[0 * 4 + 2];
        newDst[4] = s * m[1 * 4 + 0];
        newDst[5] = s * m[1 * 4 + 1];
        newDst[6] = s * m[1 * 4 + 2];
        if (m !== newDst) {
            newDst[8] = m[8];
            newDst[9] = m[9];
            newDst[10] = m[10];
        }
        return newDst;
    }
    /**
     * Creates a 3-by-3 matrix which scales uniformly in each dimension
     * @param s - Amount to scale
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The scaling matrix.
     */
    function uniformScaling3D(s, dst) {
        const newDst = (dst ?? new Ctor(12));
        newDst[0] = s;
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[4] = 0;
        newDst[5] = s;
        newDst[6] = 0;
        newDst[8] = 0;
        newDst[9] = 0;
        newDst[10] = s;
        return newDst;
    }
    /**
     * Scales the given 3-by-3 matrix in each dimension by an amount
     * given.
     * @param m - The matrix to be modified.
     * @param s - Amount to scale.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The scaled matrix.
     */
    function uniformScale3D(m, s, dst) {
        const newDst = (dst ?? new Ctor(12));
        newDst[0] = s * m[0 * 4 + 0];
        newDst[1] = s * m[0 * 4 + 1];
        newDst[2] = s * m[0 * 4 + 2];
        newDst[4] = s * m[1 * 4 + 0];
        newDst[5] = s * m[1 * 4 + 1];
        newDst[6] = s * m[1 * 4 + 2];
        newDst[8] = s * m[2 * 4 + 0];
        newDst[9] = s * m[2 * 4 + 1];
        newDst[10] = s * m[2 * 4 + 2];
        return newDst;
    }
    return {
        clone,
        create,
        set,
        fromMat4,
        fromQuat,
        negate,
        copy,
        equalsApproximately,
        equals,
        identity,
        transpose,
        inverse,
        invert,
        determinant,
        mul,
        multiply,
        setTranslation,
        getTranslation,
        getAxis,
        setAxis,
        getScaling,
        get3DScaling,
        translation,
        translate,
        rotation,
        rotate,
        rotationX,
        rotateX,
        rotationY,
        rotateY,
        rotationZ,
        rotateZ,
        scaling,
        scale,
        uniformScaling,
        uniformScale,
        scaling3D,
        scale3D,
        uniformScaling3D,
        uniformScale3D,
    };
}
const cache$3 = new Map();
function getAPI$3(Ctor) {
    let api = cache$3.get(Ctor);
    if (!api) {
        api = getAPIImpl$3(Ctor);
        cache$3.set(Ctor, api);
    }
    return api;
}

/**
 * Generates a typed API for Mat4
 * */
function getAPIImpl$2(Ctor) {
    const vec3 = getAPI$4(Ctor);
    /**
     * 4x4 Matrix math math functions.
     *
     * Almost all functions take an optional `newDst` argument. If it is not passed in the
     * functions will create a new matrix. In other words you can do this
     *
     *     const mat = mat4.translation([1, 2, 3]);  // Creates a new translation matrix
     *
     * or
     *
     *     const mat = mat4.create();
     *     mat4.translation([1, 2, 3], mat);  // Puts translation matrix in mat.
     *
     * The first style is often easier but depending on where it's used it generates garbage where
     * as there is almost never allocation with the second style.
     *
     * It is always save to pass any matrix as the destination. So for example
     *
     *     const mat = mat4.identity();
     *     const trans = mat4.translation([1, 2, 3]);
     *     mat4.multiply(mat, trans, mat);  // Multiplies mat * trans and puts result in mat.
     *
     */
    /**
     * Create a Mat4 from values
     *
     * Note: Since passing in a raw JavaScript array
     * is valid in all circumstances, if you want to
     * force a JavaScript array into a Mat4's specified type
     * it would be faster to use
     *
     * ```
     * const m = mat4.clone(someJSArray);
     * ```
     *
     * @param v0 - value for element 0
     * @param v1 - value for element 1
     * @param v2 - value for element 2
     * @param v3 - value for element 3
     * @param v4 - value for element 4
     * @param v5 - value for element 5
     * @param v6 - value for element 6
     * @param v7 - value for element 7
     * @param v8 - value for element 8
     * @param v9 - value for element 9
     * @param v10 - value for element 10
     * @param v11 - value for element 11
     * @param v12 - value for element 12
     * @param v13 - value for element 13
     * @param v14 - value for element 14
     * @param v15 - value for element 15
     * @returns created from values.
     */
    function create(v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15) {
        const newDst = new Ctor(16);
        if (v0 !== undefined) {
            newDst[0] = v0;
            if (v1 !== undefined) {
                newDst[1] = v1;
                if (v2 !== undefined) {
                    newDst[2] = v2;
                    if (v3 !== undefined) {
                        newDst[3] = v3;
                        if (v4 !== undefined) {
                            newDst[4] = v4;
                            if (v5 !== undefined) {
                                newDst[5] = v5;
                                if (v6 !== undefined) {
                                    newDst[6] = v6;
                                    if (v7 !== undefined) {
                                        newDst[7] = v7;
                                        if (v8 !== undefined) {
                                            newDst[8] = v8;
                                            if (v9 !== undefined) {
                                                newDst[9] = v9;
                                                if (v10 !== undefined) {
                                                    newDst[10] = v10;
                                                    if (v11 !== undefined) {
                                                        newDst[11] = v11;
                                                        if (v12 !== undefined) {
                                                            newDst[12] = v12;
                                                            if (v13 !== undefined) {
                                                                newDst[13] = v13;
                                                                if (v14 !== undefined) {
                                                                    newDst[14] = v14;
                                                                    if (v15 !== undefined) {
                                                                        newDst[15] = v15;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return newDst;
    }
    /**
     * Sets the values of a Mat4
     * Also see {@link mat4.create} and {@link mat4.copy}
     *
     * @param v0 - value for element 0
     * @param v1 - value for element 1
     * @param v2 - value for element 2
     * @param v3 - value for element 3
     * @param v4 - value for element 4
     * @param v5 - value for element 5
     * @param v6 - value for element 6
     * @param v7 - value for element 7
     * @param v8 - value for element 8
     * @param v9 - value for element 9
     * @param v10 - value for element 10
     * @param v11 - value for element 11
     * @param v12 - value for element 12
     * @param v13 - value for element 13
     * @param v14 - value for element 14
     * @param v15 - value for element 15
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns Mat4 created from values.
     */
    function set(v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15, dst) {
        const newDst = (dst ?? new Ctor(16));
        newDst[0] = v0;
        newDst[1] = v1;
        newDst[2] = v2;
        newDst[3] = v3;
        newDst[4] = v4;
        newDst[5] = v5;
        newDst[6] = v6;
        newDst[7] = v7;
        newDst[8] = v8;
        newDst[9] = v9;
        newDst[10] = v10;
        newDst[11] = v11;
        newDst[12] = v12;
        newDst[13] = v13;
        newDst[14] = v14;
        newDst[15] = v15;
        return newDst;
    }
    /**
     * Creates a Mat4 from a Mat3
     * @param m3 - source matrix
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns Mat4 made from m3
     */
    function fromMat3(m3, dst) {
        const newDst = (dst ?? new Ctor(16));
        newDst[0] = m3[0];
        newDst[1] = m3[1];
        newDst[2] = m3[2];
        newDst[3] = 0;
        newDst[4] = m3[4];
        newDst[5] = m3[5];
        newDst[6] = m3[6];
        newDst[7] = 0;
        newDst[8] = m3[8];
        newDst[9] = m3[9];
        newDst[10] = m3[10];
        newDst[11] = 0;
        newDst[12] = 0;
        newDst[13] = 0;
        newDst[14] = 0;
        newDst[15] = 1;
        return newDst;
    }
    /**
     * Creates a Mat4 rotation matrix from a quaternion
     * @param q - quaternion to create matrix from
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns Mat4 made from q
     */
    function fromQuat(q, dst) {
        const newDst = (dst ?? new Ctor(16));
        const x = q[0];
        const y = q[1];
        const z = q[2];
        const w = q[3];
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const yx = y * x2;
        const yy = y * y2;
        const zx = z * x2;
        const zy = z * y2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        newDst[0] = 1 - yy - zz;
        newDst[1] = yx + wz;
        newDst[2] = zx - wy;
        newDst[3] = 0;
        newDst[4] = yx - wz;
        newDst[5] = 1 - xx - zz;
        newDst[6] = zy + wx;
        newDst[7] = 0;
        newDst[8] = zx + wy;
        newDst[9] = zy - wx;
        newDst[10] = 1 - xx - yy;
        newDst[11] = 0;
        newDst[12] = 0;
        newDst[13] = 0;
        newDst[14] = 0;
        newDst[15] = 1;
        return newDst;
    }
    /**
     * Negates a matrix.
     * @param m - The matrix.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns -m.
     */
    function negate(m, dst) {
        const newDst = (dst ?? new Ctor(16));
        newDst[0] = -m[0];
        newDst[1] = -m[1];
        newDst[2] = -m[2];
        newDst[3] = -m[3];
        newDst[4] = -m[4];
        newDst[5] = -m[5];
        newDst[6] = -m[6];
        newDst[7] = -m[7];
        newDst[8] = -m[8];
        newDst[9] = -m[9];
        newDst[10] = -m[10];
        newDst[11] = -m[11];
        newDst[12] = -m[12];
        newDst[13] = -m[13];
        newDst[14] = -m[14];
        newDst[15] = -m[15];
        return newDst;
    }
    /**
     * Copies a matrix. (same as {@link mat4.clone})
     * Also see {@link mat4.create} and {@link mat4.set}
     * @param m - The matrix.
     * @param dst - The matrix. If not passed a new one is created.
     * @returns A copy of m.
     */
    function copy(m, dst) {
        const newDst = (dst ?? new Ctor(16));
        newDst[0] = m[0];
        newDst[1] = m[1];
        newDst[2] = m[2];
        newDst[3] = m[3];
        newDst[4] = m[4];
        newDst[5] = m[5];
        newDst[6] = m[6];
        newDst[7] = m[7];
        newDst[8] = m[8];
        newDst[9] = m[9];
        newDst[10] = m[10];
        newDst[11] = m[11];
        newDst[12] = m[12];
        newDst[13] = m[13];
        newDst[14] = m[14];
        newDst[15] = m[15];
        return newDst;
    }
    /**
     * Copies a matrix (same as {@link mat4.copy})
     * Also see {@link mat4.create} and {@link mat4.set}
     * @param m - The matrix.
     * @param dst - The matrix. If not passed a new one is created.
     * @returns A copy of m.
     */
    const clone = copy;
    /**
     * Check if 2 matrices are approximately equal
     * @param a - Operand matrix.
     * @param b - Operand matrix.
     * @returns true if matrices are approximately equal
     */
    function equalsApproximately(a, b) {
        return Math.abs(a[0] - b[0]) < EPSILON &&
            Math.abs(a[1] - b[1]) < EPSILON &&
            Math.abs(a[2] - b[2]) < EPSILON &&
            Math.abs(a[3] - b[3]) < EPSILON &&
            Math.abs(a[4] - b[4]) < EPSILON &&
            Math.abs(a[5] - b[5]) < EPSILON &&
            Math.abs(a[6] - b[6]) < EPSILON &&
            Math.abs(a[7] - b[7]) < EPSILON &&
            Math.abs(a[8] - b[8]) < EPSILON &&
            Math.abs(a[9] - b[9]) < EPSILON &&
            Math.abs(a[10] - b[10]) < EPSILON &&
            Math.abs(a[11] - b[11]) < EPSILON &&
            Math.abs(a[12] - b[12]) < EPSILON &&
            Math.abs(a[13] - b[13]) < EPSILON &&
            Math.abs(a[14] - b[14]) < EPSILON &&
            Math.abs(a[15] - b[15]) < EPSILON;
    }
    /**
     * Check if 2 matrices are exactly equal
     * @param a - Operand matrix.
     * @param b - Operand matrix.
     * @returns true if matrices are exactly equal
     */
    function equals(a, b) {
        return a[0] === b[0] &&
            a[1] === b[1] &&
            a[2] === b[2] &&
            a[3] === b[3] &&
            a[4] === b[4] &&
            a[5] === b[5] &&
            a[6] === b[6] &&
            a[7] === b[7] &&
            a[8] === b[8] &&
            a[9] === b[9] &&
            a[10] === b[10] &&
            a[11] === b[11] &&
            a[12] === b[12] &&
            a[13] === b[13] &&
            a[14] === b[14] &&
            a[15] === b[15];
    }
    /**
     * Creates a 4-by-4 identity matrix.
     *
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns A 4-by-4 identity matrix.
     */
    function identity(dst) {
        const newDst = (dst ?? new Ctor(16));
        newDst[0] = 1;
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[3] = 0;
        newDst[4] = 0;
        newDst[5] = 1;
        newDst[6] = 0;
        newDst[7] = 0;
        newDst[8] = 0;
        newDst[9] = 0;
        newDst[10] = 1;
        newDst[11] = 0;
        newDst[12] = 0;
        newDst[13] = 0;
        newDst[14] = 0;
        newDst[15] = 1;
        return newDst;
    }
    /**
     * Takes the transpose of a matrix.
     * @param m - The matrix.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The transpose of m.
     */
    function transpose(m, dst) {
        const newDst = (dst ?? new Ctor(16));
        if (newDst === m) {
            let t;
            t = m[1];
            m[1] = m[4];
            m[4] = t;
            t = m[2];
            m[2] = m[8];
            m[8] = t;
            t = m[3];
            m[3] = m[12];
            m[12] = t;
            t = m[6];
            m[6] = m[9];
            m[9] = t;
            t = m[7];
            m[7] = m[13];
            m[13] = t;
            t = m[11];
            m[11] = m[14];
            m[14] = t;
            return newDst;
        }
        const m00 = m[0 * 4 + 0];
        const m01 = m[0 * 4 + 1];
        const m02 = m[0 * 4 + 2];
        const m03 = m[0 * 4 + 3];
        const m10 = m[1 * 4 + 0];
        const m11 = m[1 * 4 + 1];
        const m12 = m[1 * 4 + 2];
        const m13 = m[1 * 4 + 3];
        const m20 = m[2 * 4 + 0];
        const m21 = m[2 * 4 + 1];
        const m22 = m[2 * 4 + 2];
        const m23 = m[2 * 4 + 3];
        const m30 = m[3 * 4 + 0];
        const m31 = m[3 * 4 + 1];
        const m32 = m[3 * 4 + 2];
        const m33 = m[3 * 4 + 3];
        newDst[0] = m00;
        newDst[1] = m10;
        newDst[2] = m20;
        newDst[3] = m30;
        newDst[4] = m01;
        newDst[5] = m11;
        newDst[6] = m21;
        newDst[7] = m31;
        newDst[8] = m02;
        newDst[9] = m12;
        newDst[10] = m22;
        newDst[11] = m32;
        newDst[12] = m03;
        newDst[13] = m13;
        newDst[14] = m23;
        newDst[15] = m33;
        return newDst;
    }
    /**
     * Computes the inverse of a 4-by-4 matrix.
     * @param m - The matrix.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The inverse of m.
     */
    function inverse(m, dst) {
        const newDst = (dst ?? new Ctor(16));
        const m00 = m[0 * 4 + 0];
        const m01 = m[0 * 4 + 1];
        const m02 = m[0 * 4 + 2];
        const m03 = m[0 * 4 + 3];
        const m10 = m[1 * 4 + 0];
        const m11 = m[1 * 4 + 1];
        const m12 = m[1 * 4 + 2];
        const m13 = m[1 * 4 + 3];
        const m20 = m[2 * 4 + 0];
        const m21 = m[2 * 4 + 1];
        const m22 = m[2 * 4 + 2];
        const m23 = m[2 * 4 + 3];
        const m30 = m[3 * 4 + 0];
        const m31 = m[3 * 4 + 1];
        const m32 = m[3 * 4 + 2];
        const m33 = m[3 * 4 + 3];
        const tmp0 = m22 * m33;
        const tmp1 = m32 * m23;
        const tmp2 = m12 * m33;
        const tmp3 = m32 * m13;
        const tmp4 = m12 * m23;
        const tmp5 = m22 * m13;
        const tmp6 = m02 * m33;
        const tmp7 = m32 * m03;
        const tmp8 = m02 * m23;
        const tmp9 = m22 * m03;
        const tmp10 = m02 * m13;
        const tmp11 = m12 * m03;
        const tmp12 = m20 * m31;
        const tmp13 = m30 * m21;
        const tmp14 = m10 * m31;
        const tmp15 = m30 * m11;
        const tmp16 = m10 * m21;
        const tmp17 = m20 * m11;
        const tmp18 = m00 * m31;
        const tmp19 = m30 * m01;
        const tmp20 = m00 * m21;
        const tmp21 = m20 * m01;
        const tmp22 = m00 * m11;
        const tmp23 = m10 * m01;
        const t0 = (tmp0 * m11 + tmp3 * m21 + tmp4 * m31) -
            (tmp1 * m11 + tmp2 * m21 + tmp5 * m31);
        const t1 = (tmp1 * m01 + tmp6 * m21 + tmp9 * m31) -
            (tmp0 * m01 + tmp7 * m21 + tmp8 * m31);
        const t2 = (tmp2 * m01 + tmp7 * m11 + tmp10 * m31) -
            (tmp3 * m01 + tmp6 * m11 + tmp11 * m31);
        const t3 = (tmp5 * m01 + tmp8 * m11 + tmp11 * m21) -
            (tmp4 * m01 + tmp9 * m11 + tmp10 * m21);
        const d = 1 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
        newDst[0] = d * t0;
        newDst[1] = d * t1;
        newDst[2] = d * t2;
        newDst[3] = d * t3;
        newDst[4] = d * ((tmp1 * m10 + tmp2 * m20 + tmp5 * m30) -
            (tmp0 * m10 + tmp3 * m20 + tmp4 * m30));
        newDst[5] = d * ((tmp0 * m00 + tmp7 * m20 + tmp8 * m30) -
            (tmp1 * m00 + tmp6 * m20 + tmp9 * m30));
        newDst[6] = d * ((tmp3 * m00 + tmp6 * m10 + tmp11 * m30) -
            (tmp2 * m00 + tmp7 * m10 + tmp10 * m30));
        newDst[7] = d * ((tmp4 * m00 + tmp9 * m10 + tmp10 * m20) -
            (tmp5 * m00 + tmp8 * m10 + tmp11 * m20));
        newDst[8] = d * ((tmp12 * m13 + tmp15 * m23 + tmp16 * m33) -
            (tmp13 * m13 + tmp14 * m23 + tmp17 * m33));
        newDst[9] = d * ((tmp13 * m03 + tmp18 * m23 + tmp21 * m33) -
            (tmp12 * m03 + tmp19 * m23 + tmp20 * m33));
        newDst[10] = d * ((tmp14 * m03 + tmp19 * m13 + tmp22 * m33) -
            (tmp15 * m03 + tmp18 * m13 + tmp23 * m33));
        newDst[11] = d * ((tmp17 * m03 + tmp20 * m13 + tmp23 * m23) -
            (tmp16 * m03 + tmp21 * m13 + tmp22 * m23));
        newDst[12] = d * ((tmp14 * m22 + tmp17 * m32 + tmp13 * m12) -
            (tmp16 * m32 + tmp12 * m12 + tmp15 * m22));
        newDst[13] = d * ((tmp20 * m32 + tmp12 * m02 + tmp19 * m22) -
            (tmp18 * m22 + tmp21 * m32 + tmp13 * m02));
        newDst[14] = d * ((tmp18 * m12 + tmp23 * m32 + tmp15 * m02) -
            (tmp22 * m32 + tmp14 * m02 + tmp19 * m12));
        newDst[15] = d * ((tmp22 * m22 + tmp16 * m02 + tmp21 * m12) -
            (tmp20 * m12 + tmp23 * m22 + tmp17 * m02));
        return newDst;
    }
    /**
     * Compute the determinant of a matrix
     * @param m - the matrix
     * @returns the determinant
     */
    function determinant(m) {
        const m00 = m[0 * 4 + 0];
        const m01 = m[0 * 4 + 1];
        const m02 = m[0 * 4 + 2];
        const m03 = m[0 * 4 + 3];
        const m10 = m[1 * 4 + 0];
        const m11 = m[1 * 4 + 1];
        const m12 = m[1 * 4 + 2];
        const m13 = m[1 * 4 + 3];
        const m20 = m[2 * 4 + 0];
        const m21 = m[2 * 4 + 1];
        const m22 = m[2 * 4 + 2];
        const m23 = m[2 * 4 + 3];
        const m30 = m[3 * 4 + 0];
        const m31 = m[3 * 4 + 1];
        const m32 = m[3 * 4 + 2];
        const m33 = m[3 * 4 + 3];
        const tmp0 = m22 * m33;
        const tmp1 = m32 * m23;
        const tmp2 = m12 * m33;
        const tmp3 = m32 * m13;
        const tmp4 = m12 * m23;
        const tmp5 = m22 * m13;
        const tmp6 = m02 * m33;
        const tmp7 = m32 * m03;
        const tmp8 = m02 * m23;
        const tmp9 = m22 * m03;
        const tmp10 = m02 * m13;
        const tmp11 = m12 * m03;
        const t0 = (tmp0 * m11 + tmp3 * m21 + tmp4 * m31) -
            (tmp1 * m11 + tmp2 * m21 + tmp5 * m31);
        const t1 = (tmp1 * m01 + tmp6 * m21 + tmp9 * m31) -
            (tmp0 * m01 + tmp7 * m21 + tmp8 * m31);
        const t2 = (tmp2 * m01 + tmp7 * m11 + tmp10 * m31) -
            (tmp3 * m01 + tmp6 * m11 + tmp11 * m31);
        const t3 = (tmp5 * m01 + tmp8 * m11 + tmp11 * m21) -
            (tmp4 * m01 + tmp9 * m11 + tmp10 * m21);
        return m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3;
    }
    /**
     * Computes the inverse of a 4-by-4 matrix. (same as inverse)
     * @param m - The matrix.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The inverse of m.
     */
    const invert = inverse;
    /**
     * Multiplies two 4-by-4 matrices with a on the left and b on the right
     * @param a - The matrix on the left.
     * @param b - The matrix on the right.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The matrix product of a and b.
     */
    function multiply(a, b, dst) {
        const newDst = (dst ?? new Ctor(16));
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a03 = a[3];
        const a10 = a[4 + 0];
        const a11 = a[4 + 1];
        const a12 = a[4 + 2];
        const a13 = a[4 + 3];
        const a20 = a[8 + 0];
        const a21 = a[8 + 1];
        const a22 = a[8 + 2];
        const a23 = a[8 + 3];
        const a30 = a[12 + 0];
        const a31 = a[12 + 1];
        const a32 = a[12 + 2];
        const a33 = a[12 + 3];
        const b00 = b[0];
        const b01 = b[1];
        const b02 = b[2];
        const b03 = b[3];
        const b10 = b[4 + 0];
        const b11 = b[4 + 1];
        const b12 = b[4 + 2];
        const b13 = b[4 + 3];
        const b20 = b[8 + 0];
        const b21 = b[8 + 1];
        const b22 = b[8 + 2];
        const b23 = b[8 + 3];
        const b30 = b[12 + 0];
        const b31 = b[12 + 1];
        const b32 = b[12 + 2];
        const b33 = b[12 + 3];
        newDst[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
        newDst[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
        newDst[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
        newDst[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
        newDst[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
        newDst[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
        newDst[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
        newDst[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
        newDst[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
        newDst[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
        newDst[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
        newDst[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
        newDst[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
        newDst[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
        newDst[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
        newDst[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;
        return newDst;
    }
    /**
     * Multiplies two 4-by-4 matrices with a on the left and b on the right (same as multiply)
     * @param a - The matrix on the left.
     * @param b - The matrix on the right.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The matrix product of a and b.
     */
    const mul = multiply;
    /**
     * Sets the translation component of a 4-by-4 matrix to the given
     * vector.
     * @param a - The matrix.
     * @param v - The vector.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The matrix with translation set.
     */
    function setTranslation(a, v, dst) {
        const newDst = (dst ?? identity());
        if (a !== newDst) {
            newDst[0] = a[0];
            newDst[1] = a[1];
            newDst[2] = a[2];
            newDst[3] = a[3];
            newDst[4] = a[4];
            newDst[5] = a[5];
            newDst[6] = a[6];
            newDst[7] = a[7];
            newDst[8] = a[8];
            newDst[9] = a[9];
            newDst[10] = a[10];
            newDst[11] = a[11];
        }
        newDst[12] = v[0];
        newDst[13] = v[1];
        newDst[14] = v[2];
        newDst[15] = 1;
        return newDst;
    }
    ///**
    // * Returns the translation component of a 4-by-4 matrix as a vector with 3
    // * entries.
    // * @param m - The matrix.
    // * @param dst - vector to hold result. If not passed a new one is created.
    // * @returns The translation component of m.
    // */
    function getTranslation(m, dst) {
        const newDst = (dst ?? vec3.create());
        newDst[0] = m[12];
        newDst[1] = m[13];
        newDst[2] = m[14];
        return newDst;
    }
    /**
     * Returns an axis of a 4x4 matrix as a vector with 3 entries
     * @param m - The matrix.
     * @param axis - The axis 0 = x, 1 = y, 2 = z;
     * @returns The axis component of m.
     */
    function getAxis(m, axis, dst) {
        const newDst = (dst ?? vec3.create());
        const off = axis * 4;
        newDst[0] = m[off + 0];
        newDst[1] = m[off + 1];
        newDst[2] = m[off + 2];
        return newDst;
    }
    /**
     * Sets an axis of a 4x4 matrix as a vector with 3 entries
     * @param m - The matrix.
     * @param v - the axis vector
     * @param axis - The axis  0 = x, 1 = y, 2 = z;
     * @param dst - The matrix to set. If not passed a new one is created.
     * @returns The matrix with axis set.
     */
    function setAxis(m, v, axis, dst) {
        const newDst = (dst === m) ? dst : copy(m, dst);
        const off = axis * 4;
        newDst[off + 0] = v[0];
        newDst[off + 1] = v[1];
        newDst[off + 2] = v[2];
        return newDst;
    }
    /**
     * Returns the "3d" scaling component of the matrix
     * @param m - The Matrix
     * @param dst - The vector to set. If not passed a new one is created.
     */
    function getScaling(m, dst) {
        const newDst = (dst ?? vec3.create());
        const xx = m[0];
        const xy = m[1];
        const xz = m[2];
        const yx = m[4];
        const yy = m[5];
        const yz = m[6];
        const zx = m[8];
        const zy = m[9];
        const zz = m[10];
        newDst[0] = Math.sqrt(xx * xx + xy * xy + xz * xz);
        newDst[1] = Math.sqrt(yx * yx + yy * yy + yz * yz);
        newDst[2] = Math.sqrt(zx * zx + zy * zy + zz * zz);
        return newDst;
    }
    /**
     * Computes a 4-by-4 perspective transformation matrix given the angular height
     * of the frustum, the aspect ratio, and the near and far clipping planes.  The
     * arguments define a frustum extending in the negative z direction.  The given
     * angle is the vertical angle of the frustum, and the horizontal angle is
     * determined to produce the given aspect ratio.  The arguments near and far are
     * the distances to the near and far clipping planes.  Note that near and far
     * are not z coordinates, but rather they are distances along the negative
     * z-axis.  The matrix generated sends the viewing frustum to the unit box.
     * We assume a unit box extending from -1 to 1 in the x and y dimensions and
     * from 0 to 1 in the z dimension.
     *
     * Note: If you pass `Infinity` for zFar then it will produce a projection matrix
     * returns -Infinity for Z when transforming coordinates with Z <= 0 and +Infinity for Z
     * otherwise.
     *
     * @param fieldOfViewYInRadians - The camera angle from top to bottom (in radians).
     * @param aspect - The aspect ratio width / height.
     * @param zNear - The depth (negative z coordinate)
     *     of the near clipping plane.
     * @param zFar - The depth (negative z coordinate)
     *     of the far clipping plane.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The perspective matrix.
     */
    function perspective(fieldOfViewYInRadians, aspect, zNear, zFar, dst) {
        const newDst = (dst ?? new Ctor(16));
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
        newDst[0] = f / aspect;
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[3] = 0;
        newDst[4] = 0;
        newDst[5] = f;
        newDst[6] = 0;
        newDst[7] = 0;
        newDst[8] = 0;
        newDst[9] = 0;
        newDst[11] = -1;
        newDst[12] = 0;
        newDst[13] = 0;
        newDst[15] = 0;
        if (Number.isFinite(zFar)) {
            const rangeInv = 1 / (zNear - zFar);
            newDst[10] = zFar * rangeInv;
            newDst[14] = zFar * zNear * rangeInv;
        }
        else {
            newDst[10] = -1;
            newDst[14] = -zNear;
        }
        return newDst;
    }
    /**
     * Computes a 4-by-4 reverse-z perspective transformation matrix given the angular height
     * of the frustum, the aspect ratio, and the near and far clipping planes.  The
     * arguments define a frustum extending in the negative z direction.  The given
     * angle is the vertical angle of the frustum, and the horizontal angle is
     * determined to produce the given aspect ratio.  The arguments near and far are
     * the distances to the near and far clipping planes.  Note that near and far
     * are not z coordinates, but rather they are distances along the negative
     * z-axis.  The matrix generated sends the viewing frustum to the unit box.
     * We assume a unit box extending from -1 to 1 in the x and y dimensions and
     * from 1 (at -zNear) to 0 (at -zFar) in the z dimension.
     *
     * @param fieldOfViewYInRadians - The camera angle from top to bottom (in radians).
     * @param aspect - The aspect ratio width / height.
     * @param zNear - The depth (negative z coordinate)
     *     of the near clipping plane.
     * @param zFar - The depth (negative z coordinate)
     *     of the far clipping plane. (default = Infinity)
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The perspective matrix.
     */ function perspectiveReverseZ(fieldOfViewYInRadians, aspect, zNear, zFar = Infinity, dst) {
        const newDst = (dst ?? new Ctor(16));
        const f = 1 / Math.tan(fieldOfViewYInRadians * 0.5);
        newDst[0] = f / aspect;
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[3] = 0;
        newDst[4] = 0;
        newDst[5] = f;
        newDst[6] = 0;
        newDst[7] = 0;
        newDst[8] = 0;
        newDst[9] = 0;
        newDst[11] = -1;
        newDst[12] = 0;
        newDst[13] = 0;
        newDst[15] = 0;
        if (zFar === Infinity) {
            newDst[10] = 0;
            newDst[14] = zNear;
        }
        else {
            const rangeInv = 1 / (zFar - zNear);
            newDst[10] = zNear * rangeInv;
            newDst[14] = zFar * zNear * rangeInv;
        }
        return newDst;
    }
    /**
     * Computes a 4-by-4 orthogonal transformation matrix that transforms from
     * the given the left, right, bottom, and top dimensions to -1 +1 in x, and y
     * and 0 to +1 in z.
     * @param left - Left side of the near clipping plane viewport.
     * @param right - Right side of the near clipping plane viewport.
     * @param bottom - Bottom of the near clipping plane viewport.
     * @param top - Top of the near clipping plane viewport.
     * @param near - The depth (negative z coordinate)
     *     of the near clipping plane.
     * @param far - The depth (negative z coordinate)
     *     of the far clipping plane.
     * @param dst - Output matrix. If not passed a new one is created.
     * @returns The orthographic projection matrix.
     */
    function ortho(left, right, bottom, top, near, far, dst) {
        const newDst = (dst ?? new Ctor(16));
        newDst[0] = 2 / (right - left);
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[3] = 0;
        newDst[4] = 0;
        newDst[5] = 2 / (top - bottom);
        newDst[6] = 0;
        newDst[7] = 0;
        newDst[8] = 0;
        newDst[9] = 0;
        newDst[10] = 1 / (near - far);
        newDst[11] = 0;
        newDst[12] = (right + left) / (left - right);
        newDst[13] = (top + bottom) / (bottom - top);
        newDst[14] = near / (near - far);
        newDst[15] = 1;
        return newDst;
    }
    /**
     * Computes a 4-by-4 perspective transformation matrix given the left, right,
     * top, bottom, near and far clipping planes. The arguments define a frustum
     * extending in the negative z direction. The arguments near and far are the
     * distances to the near and far clipping planes. Note that near and far are not
     * z coordinates, but rather they are distances along the negative z-axis. The
     * matrix generated sends the viewing frustum to the unit box. We assume a unit
     * box extending from -1 to 1 in the x and y dimensions and from 0 to 1 in the z
     * dimension.
     * @param left - The x coordinate of the left plane of the box.
     * @param right - The x coordinate of the right plane of the box.
     * @param bottom - The y coordinate of the bottom plane of the box.
     * @param top - The y coordinate of the right plane of the box.
     * @param near - The negative z coordinate of the near plane of the box.
     * @param far - The negative z coordinate of the far plane of the box.
     * @param dst - Output matrix. If not passed a new one is created.
     * @returns The perspective projection matrix.
     */
    function frustum(left, right, bottom, top, near, far, dst) {
        const newDst = (dst ?? new Ctor(16));
        const dx = (right - left);
        const dy = (top - bottom);
        const dz = (near - far);
        newDst[0] = 2 * near / dx;
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[3] = 0;
        newDst[4] = 0;
        newDst[5] = 2 * near / dy;
        newDst[6] = 0;
        newDst[7] = 0;
        newDst[8] = (left + right) / dx;
        newDst[9] = (top + bottom) / dy;
        newDst[10] = far / dz;
        newDst[11] = -1;
        newDst[12] = 0;
        newDst[13] = 0;
        newDst[14] = near * far / dz;
        newDst[15] = 0;
        return newDst;
    }
    /**
     * Computes a 4-by-4 reverse-z perspective transformation matrix given the left, right,
     * top, bottom, near and far clipping planes. The arguments define a frustum
     * extending in the negative z direction. The arguments near and far are the
     * distances to the near and far clipping planes. Note that near and far are not
     * z coordinates, but rather they are distances along the negative z-axis. The
     * matrix generated sends the viewing frustum to the unit box. We assume a unit
     * box extending from -1 to 1 in the x and y dimensions and from 1 (-near) to 0 (-far) in the z
     * dimension.
     * @param left - The x coordinate of the left plane of the box.
     * @param right - The x coordinate of the right plane of the box.
     * @param bottom - The y coordinate of the bottom plane of the box.
     * @param top - The y coordinate of the right plane of the box.
     * @param near - The negative z coordinate of the near plane of the box.
     * @param far - The negative z coordinate of the far plane of the box.
     * @param dst - Output matrix. If not passed a new one is created.
     * @returns The perspective projection matrix.
     */
    function frustumReverseZ(left, right, bottom, top, near, far = Infinity, dst) {
        const newDst = (dst ?? new Ctor(16));
        const dx = (right - left);
        const dy = (top - bottom);
        newDst[0] = 2 * near / dx;
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[3] = 0;
        newDst[4] = 0;
        newDst[5] = 2 * near / dy;
        newDst[6] = 0;
        newDst[7] = 0;
        newDst[8] = (left + right) / dx;
        newDst[9] = (top + bottom) / dy;
        newDst[11] = -1;
        newDst[12] = 0;
        newDst[13] = 0;
        newDst[15] = 0;
        if (far === Infinity) {
            newDst[10] = 0;
            newDst[14] = near;
        }
        else {
            const rangeInv = 1 / (far - near);
            newDst[10] = near * rangeInv;
            newDst[14] = far * near * rangeInv;
        }
        return newDst;
    }
    const xAxis = vec3.create();
    const yAxis = vec3.create();
    const zAxis = vec3.create();
    /**
     * Computes a 4-by-4 aim transformation.
     *
     * This is a matrix which positions an object aiming down positive Z.
     * toward the target.
     *
     * Note: this is **NOT** the inverse of lookAt as lookAt looks at negative Z.
     *
     * @param position - The position of the object.
     * @param target - The position meant to be aimed at.
     * @param up - A vector pointing up.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The aim matrix.
     */
    function aim(position, target, up, dst) {
        const newDst = (dst ?? new Ctor(16));
        vec3.normalize(vec3.subtract(target, position, zAxis), zAxis);
        vec3.normalize(vec3.cross(up, zAxis, xAxis), xAxis);
        vec3.normalize(vec3.cross(zAxis, xAxis, yAxis), yAxis);
        newDst[0] = xAxis[0];
        newDst[1] = xAxis[1];
        newDst[2] = xAxis[2];
        newDst[3] = 0;
        newDst[4] = yAxis[0];
        newDst[5] = yAxis[1];
        newDst[6] = yAxis[2];
        newDst[7] = 0;
        newDst[8] = zAxis[0];
        newDst[9] = zAxis[1];
        newDst[10] = zAxis[2];
        newDst[11] = 0;
        newDst[12] = position[0];
        newDst[13] = position[1];
        newDst[14] = position[2];
        newDst[15] = 1;
        return newDst;
    }
    /**
     * Computes a 4-by-4 camera aim transformation.
     *
     * This is a matrix which positions an object aiming down negative Z.
     * toward the target.
     *
     * Note: this is the inverse of `lookAt`
     *
     * @param eye - The position of the object.
     * @param target - The position meant to be aimed at.
     * @param up - A vector pointing up.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The aim matrix.
     */
    function cameraAim(eye, target, up, dst) {
        const newDst = (dst ?? new Ctor(16));
        vec3.normalize(vec3.subtract(eye, target, zAxis), zAxis);
        vec3.normalize(vec3.cross(up, zAxis, xAxis), xAxis);
        vec3.normalize(vec3.cross(zAxis, xAxis, yAxis), yAxis);
        newDst[0] = xAxis[0];
        newDst[1] = xAxis[1];
        newDst[2] = xAxis[2];
        newDst[3] = 0;
        newDst[4] = yAxis[0];
        newDst[5] = yAxis[1];
        newDst[6] = yAxis[2];
        newDst[7] = 0;
        newDst[8] = zAxis[0];
        newDst[9] = zAxis[1];
        newDst[10] = zAxis[2];
        newDst[11] = 0;
        newDst[12] = eye[0];
        newDst[13] = eye[1];
        newDst[14] = eye[2];
        newDst[15] = 1;
        return newDst;
    }
    /**
     * Computes a 4-by-4 view transformation.
     *
     * This is a view matrix which transforms all other objects
     * to be in the space of the view defined by the parameters.
     *
     * @param eye - The position of the object.
     * @param target - The position meant to be aimed at.
     * @param up - A vector pointing up.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The look-at matrix.
     */
    function lookAt(eye, target, up, dst) {
        const newDst = (dst ?? new Ctor(16));
        vec3.normalize(vec3.subtract(eye, target, zAxis), zAxis);
        vec3.normalize(vec3.cross(up, zAxis, xAxis), xAxis);
        vec3.normalize(vec3.cross(zAxis, xAxis, yAxis), yAxis);
        newDst[0] = xAxis[0];
        newDst[1] = yAxis[0];
        newDst[2] = zAxis[0];
        newDst[3] = 0;
        newDst[4] = xAxis[1];
        newDst[5] = yAxis[1];
        newDst[6] = zAxis[1];
        newDst[7] = 0;
        newDst[8] = xAxis[2];
        newDst[9] = yAxis[2];
        newDst[10] = zAxis[2];
        newDst[11] = 0;
        newDst[12] = -(xAxis[0] * eye[0] + xAxis[1] * eye[1] + xAxis[2] * eye[2]);
        newDst[13] = -(yAxis[0] * eye[0] + yAxis[1] * eye[1] + yAxis[2] * eye[2]);
        newDst[14] = -(zAxis[0] * eye[0] + zAxis[1] * eye[1] + zAxis[2] * eye[2]);
        newDst[15] = 1;
        return newDst;
    }
    /**
     * Creates a 4-by-4 matrix which translates by the given vector v.
     * @param v - The vector by
     *     which to translate.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The translation matrix.
     */
    function translation(v, dst) {
        const newDst = (dst ?? new Ctor(16));
        newDst[0] = 1;
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[3] = 0;
        newDst[4] = 0;
        newDst[5] = 1;
        newDst[6] = 0;
        newDst[7] = 0;
        newDst[8] = 0;
        newDst[9] = 0;
        newDst[10] = 1;
        newDst[11] = 0;
        newDst[12] = v[0];
        newDst[13] = v[1];
        newDst[14] = v[2];
        newDst[15] = 1;
        return newDst;
    }
    /**
     * Translates the given 4-by-4 matrix by the given vector v.
     * @param m - The matrix.
     * @param v - The vector by
     *     which to translate.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The translated matrix.
     */
    function translate(m, v, dst) {
        const newDst = (dst ?? new Ctor(16));
        const v0 = v[0];
        const v1 = v[1];
        const v2 = v[2];
        const m00 = m[0];
        const m01 = m[1];
        const m02 = m[2];
        const m03 = m[3];
        const m10 = m[1 * 4 + 0];
        const m11 = m[1 * 4 + 1];
        const m12 = m[1 * 4 + 2];
        const m13 = m[1 * 4 + 3];
        const m20 = m[2 * 4 + 0];
        const m21 = m[2 * 4 + 1];
        const m22 = m[2 * 4 + 2];
        const m23 = m[2 * 4 + 3];
        const m30 = m[3 * 4 + 0];
        const m31 = m[3 * 4 + 1];
        const m32 = m[3 * 4 + 2];
        const m33 = m[3 * 4 + 3];
        if (m !== newDst) {
            newDst[0] = m00;
            newDst[1] = m01;
            newDst[2] = m02;
            newDst[3] = m03;
            newDst[4] = m10;
            newDst[5] = m11;
            newDst[6] = m12;
            newDst[7] = m13;
            newDst[8] = m20;
            newDst[9] = m21;
            newDst[10] = m22;
            newDst[11] = m23;
        }
        newDst[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
        newDst[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
        newDst[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
        newDst[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;
        return newDst;
    }
    /**
     * Creates a 4-by-4 matrix which rotates around the x-axis by the given angle.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The rotation matrix.
     */
    function rotationX(angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(16));
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        newDst[0] = 1;
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[3] = 0;
        newDst[4] = 0;
        newDst[5] = c;
        newDst[6] = s;
        newDst[7] = 0;
        newDst[8] = 0;
        newDst[9] = -s;
        newDst[10] = c;
        newDst[11] = 0;
        newDst[12] = 0;
        newDst[13] = 0;
        newDst[14] = 0;
        newDst[15] = 1;
        return newDst;
    }
    /**
     * Rotates the given 4-by-4 matrix around the x-axis by the given
     * angle.
     * @param m - The matrix.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The rotated matrix.
     */
    function rotateX(m, angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(16));
        const m10 = m[4];
        const m11 = m[5];
        const m12 = m[6];
        const m13 = m[7];
        const m20 = m[8];
        const m21 = m[9];
        const m22 = m[10];
        const m23 = m[11];
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        newDst[4] = c * m10 + s * m20;
        newDst[5] = c * m11 + s * m21;
        newDst[6] = c * m12 + s * m22;
        newDst[7] = c * m13 + s * m23;
        newDst[8] = c * m20 - s * m10;
        newDst[9] = c * m21 - s * m11;
        newDst[10] = c * m22 - s * m12;
        newDst[11] = c * m23 - s * m13;
        if (m !== newDst) {
            newDst[0] = m[0];
            newDst[1] = m[1];
            newDst[2] = m[2];
            newDst[3] = m[3];
            newDst[12] = m[12];
            newDst[13] = m[13];
            newDst[14] = m[14];
            newDst[15] = m[15];
        }
        return newDst;
    }
    /**
     * Creates a 4-by-4 matrix which rotates around the y-axis by the given angle.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The rotation matrix.
     */
    function rotationY(angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(16));
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        newDst[0] = c;
        newDst[1] = 0;
        newDst[2] = -s;
        newDst[3] = 0;
        newDst[4] = 0;
        newDst[5] = 1;
        newDst[6] = 0;
        newDst[7] = 0;
        newDst[8] = s;
        newDst[9] = 0;
        newDst[10] = c;
        newDst[11] = 0;
        newDst[12] = 0;
        newDst[13] = 0;
        newDst[14] = 0;
        newDst[15] = 1;
        return newDst;
    }
    /**
     * Rotates the given 4-by-4 matrix around the y-axis by the given
     * angle.
     * @param m - The matrix.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The rotated matrix.
     */
    function rotateY(m, angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(16));
        const m00 = m[0 * 4 + 0];
        const m01 = m[0 * 4 + 1];
        const m02 = m[0 * 4 + 2];
        const m03 = m[0 * 4 + 3];
        const m20 = m[2 * 4 + 0];
        const m21 = m[2 * 4 + 1];
        const m22 = m[2 * 4 + 2];
        const m23 = m[2 * 4 + 3];
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        newDst[0] = c * m00 - s * m20;
        newDst[1] = c * m01 - s * m21;
        newDst[2] = c * m02 - s * m22;
        newDst[3] = c * m03 - s * m23;
        newDst[8] = c * m20 + s * m00;
        newDst[9] = c * m21 + s * m01;
        newDst[10] = c * m22 + s * m02;
        newDst[11] = c * m23 + s * m03;
        if (m !== newDst) {
            newDst[4] = m[4];
            newDst[5] = m[5];
            newDst[6] = m[6];
            newDst[7] = m[7];
            newDst[12] = m[12];
            newDst[13] = m[13];
            newDst[14] = m[14];
            newDst[15] = m[15];
        }
        return newDst;
    }
    /**
     * Creates a 4-by-4 matrix which rotates around the z-axis by the given angle.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The rotation matrix.
     */
    function rotationZ(angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(16));
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        newDst[0] = c;
        newDst[1] = s;
        newDst[2] = 0;
        newDst[3] = 0;
        newDst[4] = -s;
        newDst[5] = c;
        newDst[6] = 0;
        newDst[7] = 0;
        newDst[8] = 0;
        newDst[9] = 0;
        newDst[10] = 1;
        newDst[11] = 0;
        newDst[12] = 0;
        newDst[13] = 0;
        newDst[14] = 0;
        newDst[15] = 1;
        return newDst;
    }
    /**
     * Rotates the given 4-by-4 matrix around the z-axis by the given
     * angle.
     * @param m - The matrix.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The rotated matrix.
     */
    function rotateZ(m, angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(16));
        const m00 = m[0 * 4 + 0];
        const m01 = m[0 * 4 + 1];
        const m02 = m[0 * 4 + 2];
        const m03 = m[0 * 4 + 3];
        const m10 = m[1 * 4 + 0];
        const m11 = m[1 * 4 + 1];
        const m12 = m[1 * 4 + 2];
        const m13 = m[1 * 4 + 3];
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        newDst[0] = c * m00 + s * m10;
        newDst[1] = c * m01 + s * m11;
        newDst[2] = c * m02 + s * m12;
        newDst[3] = c * m03 + s * m13;
        newDst[4] = c * m10 - s * m00;
        newDst[5] = c * m11 - s * m01;
        newDst[6] = c * m12 - s * m02;
        newDst[7] = c * m13 - s * m03;
        if (m !== newDst) {
            newDst[8] = m[8];
            newDst[9] = m[9];
            newDst[10] = m[10];
            newDst[11] = m[11];
            newDst[12] = m[12];
            newDst[13] = m[13];
            newDst[14] = m[14];
            newDst[15] = m[15];
        }
        return newDst;
    }
    /**
     * Creates a 4-by-4 matrix which rotates around the given axis by the given
     * angle.
     * @param axis - The axis
     *     about which to rotate.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns A matrix which rotates angle radians
     *     around the axis.
     */
    function axisRotation(axis, angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(16));
        let x = axis[0];
        let y = axis[1];
        let z = axis[2];
        const n = Math.sqrt(x * x + y * y + z * z);
        x /= n;
        y /= n;
        z /= n;
        const xx = x * x;
        const yy = y * y;
        const zz = z * z;
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        const oneMinusCosine = 1 - c;
        newDst[0] = xx + (1 - xx) * c;
        newDst[1] = x * y * oneMinusCosine + z * s;
        newDst[2] = x * z * oneMinusCosine - y * s;
        newDst[3] = 0;
        newDst[4] = x * y * oneMinusCosine - z * s;
        newDst[5] = yy + (1 - yy) * c;
        newDst[6] = y * z * oneMinusCosine + x * s;
        newDst[7] = 0;
        newDst[8] = x * z * oneMinusCosine + y * s;
        newDst[9] = y * z * oneMinusCosine - x * s;
        newDst[10] = zz + (1 - zz) * c;
        newDst[11] = 0;
        newDst[12] = 0;
        newDst[13] = 0;
        newDst[14] = 0;
        newDst[15] = 1;
        return newDst;
    }
    /**
     * Creates a 4-by-4 matrix which rotates around the given axis by the given
     * angle. (same as axisRotation)
     * @param axis - The axis
     *     about which to rotate.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns A matrix which rotates angle radians
     *     around the axis.
     */
    const rotation = axisRotation;
    /**
     * Rotates the given 4-by-4 matrix around the given axis by the
     * given angle.
     * @param m - The matrix.
     * @param axis - The axis
     *     about which to rotate.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The rotated matrix.
     */
    function axisRotate(m, axis, angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(16));
        let x = axis[0];
        let y = axis[1];
        let z = axis[2];
        const n = Math.sqrt(x * x + y * y + z * z);
        x /= n;
        y /= n;
        z /= n;
        const xx = x * x;
        const yy = y * y;
        const zz = z * z;
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        const oneMinusCosine = 1 - c;
        const r00 = xx + (1 - xx) * c;
        const r01 = x * y * oneMinusCosine + z * s;
        const r02 = x * z * oneMinusCosine - y * s;
        const r10 = x * y * oneMinusCosine - z * s;
        const r11 = yy + (1 - yy) * c;
        const r12 = y * z * oneMinusCosine + x * s;
        const r20 = x * z * oneMinusCosine + y * s;
        const r21 = y * z * oneMinusCosine - x * s;
        const r22 = zz + (1 - zz) * c;
        const m00 = m[0];
        const m01 = m[1];
        const m02 = m[2];
        const m03 = m[3];
        const m10 = m[4];
        const m11 = m[5];
        const m12 = m[6];
        const m13 = m[7];
        const m20 = m[8];
        const m21 = m[9];
        const m22 = m[10];
        const m23 = m[11];
        newDst[0] = r00 * m00 + r01 * m10 + r02 * m20;
        newDst[1] = r00 * m01 + r01 * m11 + r02 * m21;
        newDst[2] = r00 * m02 + r01 * m12 + r02 * m22;
        newDst[3] = r00 * m03 + r01 * m13 + r02 * m23;
        newDst[4] = r10 * m00 + r11 * m10 + r12 * m20;
        newDst[5] = r10 * m01 + r11 * m11 + r12 * m21;
        newDst[6] = r10 * m02 + r11 * m12 + r12 * m22;
        newDst[7] = r10 * m03 + r11 * m13 + r12 * m23;
        newDst[8] = r20 * m00 + r21 * m10 + r22 * m20;
        newDst[9] = r20 * m01 + r21 * m11 + r22 * m21;
        newDst[10] = r20 * m02 + r21 * m12 + r22 * m22;
        newDst[11] = r20 * m03 + r21 * m13 + r22 * m23;
        if (m !== newDst) {
            newDst[12] = m[12];
            newDst[13] = m[13];
            newDst[14] = m[14];
            newDst[15] = m[15];
        }
        return newDst;
    }
    /**
     * Rotates the given 4-by-4 matrix around the given axis by the
     * given angle. (same as rotate)
     * @param m - The matrix.
     * @param axis - The axis
     *     about which to rotate.
     * @param angleInRadians - The angle by which to rotate (in radians).
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The rotated matrix.
     */
    const rotate = axisRotate;
    /**
     * Creates a 4-by-4 matrix which scales in each dimension by an amount given by
     * the corresponding entry in the given vector; assumes the vector has three
     * entries.
     * @param v - A vector of
     *     three entries specifying the factor by which to scale in each dimension.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The scaling matrix.
     */
    function scaling(v, dst) {
        const newDst = (dst ?? new Ctor(16));
        newDst[0] = v[0];
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[3] = 0;
        newDst[4] = 0;
        newDst[5] = v[1];
        newDst[6] = 0;
        newDst[7] = 0;
        newDst[8] = 0;
        newDst[9] = 0;
        newDst[10] = v[2];
        newDst[11] = 0;
        newDst[12] = 0;
        newDst[13] = 0;
        newDst[14] = 0;
        newDst[15] = 1;
        return newDst;
    }
    /**
     * Scales the given 4-by-4 matrix in each dimension by an amount
     * given by the corresponding entry in the given vector; assumes the vector has
     * three entries.
     * @param m - The matrix to be modified.
     * @param v - A vector of three entries specifying the
     *     factor by which to scale in each dimension.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The scaled matrix.
     */
    function scale(m, v, dst) {
        const newDst = (dst ?? new Ctor(16));
        const v0 = v[0];
        const v1 = v[1];
        const v2 = v[2];
        newDst[0] = v0 * m[0 * 4 + 0];
        newDst[1] = v0 * m[0 * 4 + 1];
        newDst[2] = v0 * m[0 * 4 + 2];
        newDst[3] = v0 * m[0 * 4 + 3];
        newDst[4] = v1 * m[1 * 4 + 0];
        newDst[5] = v1 * m[1 * 4 + 1];
        newDst[6] = v1 * m[1 * 4 + 2];
        newDst[7] = v1 * m[1 * 4 + 3];
        newDst[8] = v2 * m[2 * 4 + 0];
        newDst[9] = v2 * m[2 * 4 + 1];
        newDst[10] = v2 * m[2 * 4 + 2];
        newDst[11] = v2 * m[2 * 4 + 3];
        if (m !== newDst) {
            newDst[12] = m[12];
            newDst[13] = m[13];
            newDst[14] = m[14];
            newDst[15] = m[15];
        }
        return newDst;
    }
    /**
     * Creates a 4-by-4 matrix which scales a uniform amount in each dimension.
     * @param s - the amount to scale
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The scaling matrix.
     */
    function uniformScaling(s, dst) {
        const newDst = (dst ?? new Ctor(16));
        newDst[0] = s;
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[3] = 0;
        newDst[4] = 0;
        newDst[5] = s;
        newDst[6] = 0;
        newDst[7] = 0;
        newDst[8] = 0;
        newDst[9] = 0;
        newDst[10] = s;
        newDst[11] = 0;
        newDst[12] = 0;
        newDst[13] = 0;
        newDst[14] = 0;
        newDst[15] = 1;
        return newDst;
    }
    /**
     * Scales the given 4-by-4 matrix in each dimension by a uniform scale.
     * @param m - The matrix to be modified.
     * @param s - The amount to scale.
     * @param dst - matrix to hold result. If not passed a new one is created.
     * @returns The scaled matrix.
     */
    function uniformScale(m, s, dst) {
        const newDst = (dst ?? new Ctor(16));
        newDst[0] = s * m[0 * 4 + 0];
        newDst[1] = s * m[0 * 4 + 1];
        newDst[2] = s * m[0 * 4 + 2];
        newDst[3] = s * m[0 * 4 + 3];
        newDst[4] = s * m[1 * 4 + 0];
        newDst[5] = s * m[1 * 4 + 1];
        newDst[6] = s * m[1 * 4 + 2];
        newDst[7] = s * m[1 * 4 + 3];
        newDst[8] = s * m[2 * 4 + 0];
        newDst[9] = s * m[2 * 4 + 1];
        newDst[10] = s * m[2 * 4 + 2];
        newDst[11] = s * m[2 * 4 + 3];
        if (m !== newDst) {
            newDst[12] = m[12];
            newDst[13] = m[13];
            newDst[14] = m[14];
            newDst[15] = m[15];
        }
        return newDst;
    }
    return {
        create,
        set,
        fromMat3,
        fromQuat,
        negate,
        copy,
        clone,
        equalsApproximately,
        equals,
        identity,
        transpose,
        inverse,
        determinant,
        invert,
        multiply,
        mul,
        setTranslation,
        getTranslation,
        getAxis,
        setAxis,
        getScaling,
        perspective,
        perspectiveReverseZ,
        ortho,
        frustum,
        frustumReverseZ,
        aim,
        cameraAim,
        lookAt,
        translation,
        translate,
        rotationX,
        rotateX,
        rotationY,
        rotateY,
        rotationZ,
        rotateZ,
        axisRotation,
        rotation,
        axisRotate,
        rotate,
        scaling,
        scale,
        uniformScaling,
        uniformScale,
    };
}
const cache$2 = new Map();
function getAPI$2(Ctor) {
    let api = cache$2.get(Ctor);
    if (!api) {
        api = getAPIImpl$2(Ctor);
        cache$2.set(Ctor, api);
    }
    return api;
}

/*
 * Copyright 2022 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
/**
 * Generates am typed API for Qud
 * */
function getAPIImpl$1(Ctor) {
    const vec3 = getAPI$4(Ctor);
    /**
     * Creates a quat4; may be called with x, y, z to set initial values.
     * @param x - Initial x value.
     * @param y - Initial y value.
     * @param z - Initial z value.
     * @param w - Initial w value.
     * @returns the created vector
     */
    function create(x, y, z, w) {
        const newDst = new Ctor(4);
        if (x !== undefined) {
            newDst[0] = x;
            if (y !== undefined) {
                newDst[1] = y;
                if (z !== undefined) {
                    newDst[2] = z;
                    if (w !== undefined) {
                        newDst[3] = w;
                    }
                }
            }
        }
        return newDst;
    }
    /**
     * Creates a Quat; may be called with x, y, z to set initial values. (same as create)
     * @param x - Initial x value.
     * @param y - Initial y value.
     * @param z - Initial z value.
     * @param z - Initial w value.
     * @returns the created vector
     */
    const fromValues = create;
    /**
     * Sets the values of a Quat
     * Also see {@link quat.create} and {@link quat.copy}
     *
     * @param x first value
     * @param y second value
     * @param z third value
     * @param w fourth value
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector with its elements set.
     */
    function set(x, y, z, w, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = x;
        newDst[1] = y;
        newDst[2] = z;
        newDst[3] = w;
        return newDst;
    }
    /**
     * Sets a quaternion from the given angle and  axis,
     * then returns it.
     *
     * @param axis - the axis to rotate around
     * @param angleInRadians - the angle
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns The quaternion that represents the given axis and angle
     **/
    function fromAxisAngle(axis, angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(4));
        const halfAngle = angleInRadians * 0.5;
        const s = Math.sin(halfAngle);
        newDst[0] = s * axis[0];
        newDst[1] = s * axis[1];
        newDst[2] = s * axis[2];
        newDst[3] = Math.cos(halfAngle);
        return newDst;
    }
    /**
     * Gets the rotation axis and angle
     * @param q - quaternion to compute from
     * @param dst - Vec3 to hold result. If not passed in a new one is created.
     * @return angle and axis
     */
    function toAxisAngle(q, dst) {
        const newDst = (dst ?? vec3.create(3));
        const angle = Math.acos(q[3]) * 2;
        const s = Math.sin(angle * 0.5);
        if (s > EPSILON) {
            newDst[0] = q[0] / s;
            newDst[1] = q[1] / s;
            newDst[2] = q[2] / s;
        }
        else {
            newDst[0] = 1;
            newDst[1] = 0;
            newDst[2] = 0;
        }
        return { angle, axis: newDst };
    }
    /**
     * Returns the angle in degrees between two rotations a and b.
     * @param a - quaternion a
     * @param b - quaternion b
     * @return angle in radians between the two quaternions
     */
    function angle(a, b) {
        const d = dot(a, b);
        return Math.acos(2 * d * d - 1);
    }
    /**
     * Multiplies two quaternions
     *
     * @param a - the first quaternion
     * @param b - the second quaternion
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns A quaternion that is the result of a * b
     */
    function multiply(a, b, dst) {
        const newDst = (dst ?? new Ctor(4));
        const ax = a[0];
        const ay = a[1];
        const az = a[2];
        const aw = a[3];
        const bx = b[0];
        const by = b[1];
        const bz = b[2];
        const bw = b[3];
        newDst[0] = ax * bw + aw * bx + ay * bz - az * by;
        newDst[1] = ay * bw + aw * by + az * bx - ax * bz;
        newDst[2] = az * bw + aw * bz + ax * by - ay * bx;
        newDst[3] = aw * bw - ax * bx - ay * by - az * bz;
        return newDst;
    }
    /**
     * Multiplies two quaternions
     *
     * @param a - the first quaternion
     * @param b - the second quaternion
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns A quaternion that is the result of a * b
     */
    const mul = multiply;
    /**
     * Rotates the given quaternion around the X axis by the given angle.
     * @param q - quaternion to rotate
     * @param angleInRadians - The angle by which to rotate
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns A quaternion that is the result of a * b
     */
    function rotateX(q, angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(4));
        const halfAngle = angleInRadians * 0.5;
        const qx = q[0];
        const qy = q[1];
        const qz = q[2];
        const qw = q[3];
        const bx = Math.sin(halfAngle);
        const bw = Math.cos(halfAngle);
        newDst[0] = qx * bw + qw * bx;
        newDst[1] = qy * bw + qz * bx;
        newDst[2] = qz * bw - qy * bx;
        newDst[3] = qw * bw - qx * bx;
        return newDst;
    }
    /**
     * Rotates the given quaternion around the Y axis by the given angle.
     * @param q - quaternion to rotate
     * @param angleInRadians - The angle by which to rotate
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns A quaternion that is the result of a * b
     */
    function rotateY(q, angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(4));
        const halfAngle = angleInRadians * 0.5;
        const qx = q[0];
        const qy = q[1];
        const qz = q[2];
        const qw = q[3];
        const by = Math.sin(halfAngle);
        const bw = Math.cos(halfAngle);
        newDst[0] = qx * bw - qz * by;
        newDst[1] = qy * bw + qw * by;
        newDst[2] = qz * bw + qx * by;
        newDst[3] = qw * bw - qy * by;
        return newDst;
    }
    /**
     * Rotates the given quaternion around the Z axis by the given angle.
     * @param q - quaternion to rotate
     * @param angleInRadians - The angle by which to rotate
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns A quaternion that is the result of a * b
     */
    function rotateZ(q, angleInRadians, dst) {
        const newDst = (dst ?? new Ctor(4));
        const halfAngle = angleInRadians * 0.5;
        const qx = q[0];
        const qy = q[1];
        const qz = q[2];
        const qw = q[3];
        const bz = Math.sin(halfAngle);
        const bw = Math.cos(halfAngle);
        newDst[0] = qx * bw + qy * bz;
        newDst[1] = qy * bw - qx * bz;
        newDst[2] = qz * bw + qw * bz;
        newDst[3] = qw * bw - qz * bz;
        return newDst;
    }
    /**
     * Spherically linear interpolate between two quaternions
     *
     * @param a - starting value
     * @param b - ending value
     * @param t - value where 0 = a and 1 = b
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns A quaternion that is the result of a * b
     */
    function slerp(a, b, t, dst) {
        const newDst = (dst ?? new Ctor(4));
        const ax = a[0];
        const ay = a[1];
        const az = a[2];
        const aw = a[3];
        let bx = b[0];
        let by = b[1];
        let bz = b[2];
        let bw = b[3];
        let cosOmega = ax * bx + ay * by + az * bz + aw * bw;
        if (cosOmega < 0) {
            cosOmega = -cosOmega;
            bx = -bx;
            by = -by;
            bz = -bz;
            bw = -bw;
        }
        let scale0;
        let scale1;
        if (1.0 - cosOmega > EPSILON) {
            const omega = Math.acos(cosOmega);
            const sinOmega = Math.sin(omega);
            scale0 = Math.sin((1 - t) * omega) / sinOmega;
            scale1 = Math.sin(t * omega) / sinOmega;
        }
        else {
            scale0 = 1.0 - t;
            scale1 = t;
        }
        newDst[0] = scale0 * ax + scale1 * bx;
        newDst[1] = scale0 * ay + scale1 * by;
        newDst[2] = scale0 * az + scale1 * bz;
        newDst[3] = scale0 * aw + scale1 * bw;
        return newDst;
    }
    /**
     * Compute the inverse of a quaternion
     *
     * @param q - quaternion to compute the inverse of
     * @returns A quaternion that is the result of a * b
     */
    function inverse(q, dst) {
        const newDst = (dst ?? new Ctor(4));
        const a0 = q[0];
        const a1 = q[1];
        const a2 = q[2];
        const a3 = q[3];
        const dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
        const invDot = dot ? 1 / dot : 0;
        newDst[0] = -a0 * invDot;
        newDst[1] = -a1 * invDot;
        newDst[2] = -a2 * invDot;
        newDst[3] = a3 * invDot;
        return newDst;
    }
    /**
     * Compute the conjugate of a quaternion
     * For quaternions with a magnitude of 1 (a unit quaternion)
     * this returns the same as the inverse but is faster to calculate.
     *
     * @param q - quaternion to compute the conjugate of.
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns The conjugate of q
     */
    function conjugate(q, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = -q[0];
        newDst[1] = -q[1];
        newDst[2] = -q[2];
        newDst[3] = q[3];
        return newDst;
    }
    /**
     * Creates a quaternion from the given rotation matrix.
     *
     * The created quaternion is not normalized.
     *
     * @param m - rotation matrix
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns the result
     */
    function fromMat(m, dst) {
        const newDst = (dst ?? new Ctor(4));
        /*
        0 1 2
        3 4 5
        6 7 8
      
        0 1 2
        4 5 6
        8 9 10
         */
        // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
        // article "Quaternion Calculus and Fast Animation".
        const trace = m[0] + m[5] + m[10];
        if (trace > 0.0) {
            // |w| > 1/2, may as well choose w > 1/2
            const root = Math.sqrt(trace + 1); // 2w
            newDst[3] = 0.5 * root;
            const invRoot = 0.5 / root; // 1/(4w)
            newDst[0] = (m[6] - m[9]) * invRoot;
            newDst[1] = (m[8] - m[2]) * invRoot;
            newDst[2] = (m[1] - m[4]) * invRoot;
        }
        else {
            // |w| <= 1/2
            let i = 0;
            if (m[5] > m[0]) {
                i = 1;
            }
            if (m[10] > m[i * 4 + i]) {
                i = 2;
            }
            const j = (i + 1) % 3;
            const k = (i + 2) % 3;
            const root = Math.sqrt(m[i * 4 + i] - m[j * 4 + j] - m[k * 4 + k] + 1.0);
            newDst[i] = 0.5 * root;
            const invRoot = 0.5 / root;
            newDst[3] = (m[j * 4 + k] - m[k * 4 + j]) * invRoot;
            newDst[j] = (m[j * 4 + i] + m[i * 4 + j]) * invRoot;
            newDst[k] = (m[k * 4 + i] + m[i * 4 + k]) * invRoot;
        }
        return newDst;
    }
    /**
     * Creates a quaternion from the given euler angle x, y, z using the provided intrinsic order for the conversion.
     *
     * @param xAngleInRadians - angle to rotate around X axis in radians.
     * @param yAngleInRadians - angle to rotate around Y axis in radians.
     * @param zAngleInRadians - angle to rotate around Z axis in radians.
     * @param order - order to apply euler angles
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns A quaternion representing the same rotation as the euler angles applied in the given order
     */
    function fromEuler(xAngleInRadians, yAngleInRadians, zAngleInRadians, order, dst) {
        const newDst = (dst ?? new Ctor(4));
        const xHalfAngle = xAngleInRadians * 0.5;
        const yHalfAngle = yAngleInRadians * 0.5;
        const zHalfAngle = zAngleInRadians * 0.5;
        const sx = Math.sin(xHalfAngle);
        const cx = Math.cos(xHalfAngle);
        const sy = Math.sin(yHalfAngle);
        const cy = Math.cos(yHalfAngle);
        const sz = Math.sin(zHalfAngle);
        const cz = Math.cos(zHalfAngle);
        switch (order) {
            case 'xyz':
                newDst[0] = sx * cy * cz + cx * sy * sz;
                newDst[1] = cx * sy * cz - sx * cy * sz;
                newDst[2] = cx * cy * sz + sx * sy * cz;
                newDst[3] = cx * cy * cz - sx * sy * sz;
                break;
            case 'xzy':
                newDst[0] = sx * cy * cz - cx * sy * sz;
                newDst[1] = cx * sy * cz - sx * cy * sz;
                newDst[2] = cx * cy * sz + sx * sy * cz;
                newDst[3] = cx * cy * cz + sx * sy * sz;
                break;
            case 'yxz':
                newDst[0] = sx * cy * cz + cx * sy * sz;
                newDst[1] = cx * sy * cz - sx * cy * sz;
                newDst[2] = cx * cy * sz - sx * sy * cz;
                newDst[3] = cx * cy * cz + sx * sy * sz;
                break;
            case 'yzx':
                newDst[0] = sx * cy * cz + cx * sy * sz;
                newDst[1] = cx * sy * cz + sx * cy * sz;
                newDst[2] = cx * cy * sz - sx * sy * cz;
                newDst[3] = cx * cy * cz - sx * sy * sz;
                break;
            case 'zxy':
                newDst[0] = sx * cy * cz - cx * sy * sz;
                newDst[1] = cx * sy * cz + sx * cy * sz;
                newDst[2] = cx * cy * sz + sx * sy * cz;
                newDst[3] = cx * cy * cz - sx * sy * sz;
                break;
            case 'zyx':
                newDst[0] = sx * cy * cz - cx * sy * sz;
                newDst[1] = cx * sy * cz + sx * cy * sz;
                newDst[2] = cx * cy * sz - sx * sy * cz;
                newDst[3] = cx * cy * cz + sx * sy * sz;
                break;
            default:
                throw new Error(`Unknown rotation order: ${order}`);
        }
        return newDst;
    }
    /**
     * Copies a quaternion. (same as {@link quat.clone})
     * Also see {@link quat.create} and {@link quat.set}
     * @param q - The quaternion.
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns A quaternion that is a copy of q
     */
    function copy(q, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = q[0];
        newDst[1] = q[1];
        newDst[2] = q[2];
        newDst[3] = q[3];
        return newDst;
    }
    /**
     * Clones a quaternion. (same as {@link quat.copy})
     * Also see {@link quat.create} and {@link quat.set}
     * @param q - The quaternion.
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns A copy of q.
     */
    const clone = copy;
    /**
     * Adds two quaternions; assumes a and b have the same dimension.
     * @param a - Operand quaternion.
     * @param b - Operand quaternion.
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns A quaternion that is the sum of a and b.
     */
    function add(a, b, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = a[0] + b[0];
        newDst[1] = a[1] + b[1];
        newDst[2] = a[2] + b[2];
        newDst[3] = a[3] + b[3];
        return newDst;
    }
    /**
     * Subtracts two quaternions.
     * @param a - Operand quaternion.
     * @param b - Operand quaternion.
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns A quaternion that is the difference of a and b.
     */
    function subtract(a, b, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = a[0] - b[0];
        newDst[1] = a[1] - b[1];
        newDst[2] = a[2] - b[2];
        newDst[3] = a[3] - b[3];
        return newDst;
    }
    /**
     * Subtracts two quaternions.
     * @param a - Operand quaternion.
     * @param b - Operand quaternion.
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns A quaternion that is the difference of a and b.
     */
    const sub = subtract;
    /**
     * Multiplies a quaternion by a scalar.
     * @param v - The quaternion.
     * @param k - The scalar.
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns The scaled quaternion.
     */
    function mulScalar(v, k, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = v[0] * k;
        newDst[1] = v[1] * k;
        newDst[2] = v[2] * k;
        newDst[3] = v[3] * k;
        return newDst;
    }
    /**
     * Multiplies a quaternion by a scalar. (same as mulScalar)
     * @param v - The quaternion.
     * @param k - The scalar.
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns The scaled quaternion.
     */
    const scale = mulScalar;
    /**
     * Divides a vector by a scalar.
     * @param v - The vector.
     * @param k - The scalar.
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns The scaled quaternion.
     */
    function divScalar(v, k, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = v[0] / k;
        newDst[1] = v[1] / k;
        newDst[2] = v[2] / k;
        newDst[3] = v[3] / k;
        return newDst;
    }
    /**
     * Computes the dot product of two quaternions
     * @param a - Operand quaternion.
     * @param b - Operand quaternion.
     * @returns dot product
     */
    function dot(a, b) {
        return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]) + (a[3] * b[3]);
    }
    /**
     * Performs linear interpolation on two quaternions.
     * Given quaternions a and b and interpolation coefficient t, returns
     * a + t * (b - a).
     * @param a - Operand quaternion.
     * @param b - Operand quaternion.
     * @param t - Interpolation coefficient.
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns The linear interpolated result.
     */
    function lerp(a, b, t, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = a[0] + t * (b[0] - a[0]);
        newDst[1] = a[1] + t * (b[1] - a[1]);
        newDst[2] = a[2] + t * (b[2] - a[2]);
        newDst[3] = a[3] + t * (b[3] - a[3]);
        return newDst;
    }
    /**
     * Computes the length of quaternion
     * @param v - quaternion.
     * @returns length of quaternion.
     */
    function length(v) {
        const v0 = v[0];
        const v1 = v[1];
        const v2 = v[2];
        const v3 = v[3];
        return Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2 + v3 * v3);
    }
    /**
     * Computes the length of quaternion (same as length)
     * @param v - quaternion.
     * @returns length of quaternion.
     */
    const len = length;
    /**
     * Computes the square of the length of quaternion
     * @param v - quaternion.
     * @returns square of the length of quaternion.
     */
    function lengthSq(v) {
        const v0 = v[0];
        const v1 = v[1];
        const v2 = v[2];
        const v3 = v[3];
        return v0 * v0 + v1 * v1 + v2 * v2 + v3 * v3;
    }
    /**
     * Computes the square of the length of quaternion (same as lengthSq)
     * @param v - quaternion.
     * @returns square of the length of quaternion.
     */
    const lenSq = lengthSq;
    /**
     * Divides a quaternion by its Euclidean length and returns the quotient.
     * @param v - The quaternion.
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns The normalized quaternion.
     */
    function normalize(v, dst) {
        const newDst = (dst ?? new Ctor(4));
        const v0 = v[0];
        const v1 = v[1];
        const v2 = v[2];
        const v3 = v[3];
        const len = Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2 + v3 * v3);
        if (len > 0.00001) {
            newDst[0] = v0 / len;
            newDst[1] = v1 / len;
            newDst[2] = v2 / len;
            newDst[3] = v3 / len;
        }
        else {
            newDst[0] = 0;
            newDst[1] = 0;
            newDst[2] = 0;
            newDst[3] = 1;
        }
        return newDst;
    }
    /**
     * Check if 2 quaternions are approximately equal
     * @param a - Operand quaternion.
     * @param b - Operand quaternion.
     * @returns true if quaternions are approximately equal
     */
    function equalsApproximately(a, b) {
        return Math.abs(a[0] - b[0]) < EPSILON &&
            Math.abs(a[1] - b[1]) < EPSILON &&
            Math.abs(a[2] - b[2]) < EPSILON &&
            Math.abs(a[3] - b[3]) < EPSILON;
    }
    /**
     * Check if 2 quaternions are exactly equal
     * @param a - Operand quaternion.
     * @param b - Operand quaternion.
     * @returns true if quaternions are exactly equal
     */
    function equals(a, b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }
    /**
     * Creates an identity quaternion
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns an identity quaternion
     */
    function identity(dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = 0;
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[3] = 1;
        return newDst;
    }
    const tempVec3 = vec3.create();
    const xUnitVec3 = vec3.create();
    const yUnitVec3 = vec3.create();
    /**
     * Computes a quaternion to represent the shortest rotation from one vector to another.
     *
     * @param aUnit - the start vector
     * @param bUnit - the end vector
     * @param dst - quaternion to hold result. If not passed in a new one is created.
     * @returns the result
     */
    function rotationTo(aUnit, bUnit, dst) {
        const newDst = (dst ?? new Ctor(4));
        const dot = vec3.dot(aUnit, bUnit);
        if (dot < -0.999999) {
            vec3.cross(xUnitVec3, aUnit, tempVec3);
            if (vec3.len(tempVec3) < 0.000001) {
                vec3.cross(yUnitVec3, aUnit, tempVec3);
            }
            vec3.normalize(tempVec3, tempVec3);
            fromAxisAngle(tempVec3, Math.PI, newDst);
            return newDst;
        }
        else if (dot > 0.999999) {
            newDst[0] = 0;
            newDst[1] = 0;
            newDst[2] = 0;
            newDst[3] = 1;
            return newDst;
        }
        else {
            vec3.cross(aUnit, bUnit, tempVec3);
            newDst[0] = tempVec3[0];
            newDst[1] = tempVec3[1];
            newDst[2] = tempVec3[2];
            newDst[3] = 1 + dot;
            return normalize(newDst, newDst);
        }
    }
    const tempQuat1 = new Ctor(4);
    const tempQuat2 = new Ctor(4);
    /**
     * Performs a spherical linear interpolation with two control points
     *
     * @param a - the first quaternion
     * @param b - the second quaternion
     * @param c - the third quaternion
     * @param d - the fourth quaternion
     * @param t - Interpolation coefficient 0 to 1
     * @returns result
     */
    function sqlerp(a, b, c, d, t, dst) {
        const newDst = (dst ?? new Ctor(4));
        slerp(a, d, t, tempQuat1);
        slerp(b, c, t, tempQuat2);
        slerp(tempQuat1, tempQuat2, 2 * t * (1 - t), newDst);
        return newDst;
    }
    return {
        create,
        fromValues,
        set,
        fromAxisAngle,
        toAxisAngle,
        angle,
        multiply,
        mul,
        rotateX,
        rotateY,
        rotateZ,
        slerp,
        inverse,
        conjugate,
        fromMat,
        fromEuler,
        copy,
        clone,
        add,
        subtract,
        sub,
        mulScalar,
        scale,
        divScalar,
        dot,
        lerp,
        length,
        len,
        lengthSq,
        lenSq,
        normalize,
        equalsApproximately,
        equals,
        identity,
        rotationTo,
        sqlerp,
    };
}
const cache$1 = new Map();
/**
 *
 * Quat4 math functions.
 *
 * Almost all functions take an optional `newDst` argument. If it is not passed in the
 * functions will create a new `Quat4`. In other words you can do this
 *
 *     const v = quat4.cross(v1, v2);  // Creates a new Quat4 with the cross product of v1 x v2.
 *
 * or
 *
 *     const v = quat4.create();
 *     quat4.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always safe to pass any vector as the destination. So for example
 *
 *     quat4.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1
 *
 */
function getAPI$1(Ctor) {
    let api = cache$1.get(Ctor);
    if (!api) {
        api = getAPIImpl$1(Ctor);
        cache$1.set(Ctor, api);
    }
    return api;
}

/*
 * Copyright 2022 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
/**
 * Generates am typed API for Vec4
 * */
function getAPIImpl(Ctor) {
    /**
     * Creates a vec4; may be called with x, y, z to set initial values.
     * @param x - Initial x value.
     * @param y - Initial y value.
     * @param z - Initial z value.
     * @param w - Initial w value.
     * @returns the created vector
     */
    function create(x, y, z, w) {
        const newDst = new Ctor(4);
        if (x !== undefined) {
            newDst[0] = x;
            if (y !== undefined) {
                newDst[1] = y;
                if (z !== undefined) {
                    newDst[2] = z;
                    if (w !== undefined) {
                        newDst[3] = w;
                    }
                }
            }
        }
        return newDst;
    }
    /**
     * Creates a vec4; may be called with x, y, z to set initial values. (same as create)
     * @param x - Initial x value.
     * @param y - Initial y value.
     * @param z - Initial z value.
     * @param z - Initial w value.
     * @returns the created vector
     */
    const fromValues = create;
    /**
     * Sets the values of a Vec4
     * Also see {@link vec4.create} and {@link vec4.copy}
     *
     * @param x first value
     * @param y second value
     * @param z third value
     * @param w fourth value
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector with its elements set.
     */
    function set(x, y, z, w, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = x;
        newDst[1] = y;
        newDst[2] = z;
        newDst[3] = w;
        return newDst;
    }
    /**
     * Applies Math.ceil to each element of vector
     * @param v - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the ceil of each element of v.
     */
    function ceil(v, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = Math.ceil(v[0]);
        newDst[1] = Math.ceil(v[1]);
        newDst[2] = Math.ceil(v[2]);
        newDst[3] = Math.ceil(v[3]);
        return newDst;
    }
    /**
     * Applies Math.floor to each element of vector
     * @param v - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the floor of each element of v.
     */
    function floor(v, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = Math.floor(v[0]);
        newDst[1] = Math.floor(v[1]);
        newDst[2] = Math.floor(v[2]);
        newDst[3] = Math.floor(v[3]);
        return newDst;
    }
    /**
     * Applies Math.round to each element of vector
     * @param v - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the round of each element of v.
     */
    function round(v, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = Math.round(v[0]);
        newDst[1] = Math.round(v[1]);
        newDst[2] = Math.round(v[2]);
        newDst[3] = Math.round(v[3]);
        return newDst;
    }
    /**
     * Clamp each element of vector between min and max
     * @param v - Operand vector.
     * @param max - Min value, default 0
     * @param min - Max value, default 1
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that the clamped value of each element of v.
     */
    function clamp(v, min = 0, max = 1, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = Math.min(max, Math.max(min, v[0]));
        newDst[1] = Math.min(max, Math.max(min, v[1]));
        newDst[2] = Math.min(max, Math.max(min, v[2]));
        newDst[3] = Math.min(max, Math.max(min, v[3]));
        return newDst;
    }
    /**
     * Adds two vectors; assumes a and b have the same dimension.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the sum of a and b.
     */
    function add(a, b, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = a[0] + b[0];
        newDst[1] = a[1] + b[1];
        newDst[2] = a[2] + b[2];
        newDst[3] = a[3] + b[3];
        return newDst;
    }
    /**
     * Adds two vectors, scaling the 2nd; assumes a and b have the same dimension.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param scale - Amount to scale b
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the sum of a + b * scale.
     */
    function addScaled(a, b, scale, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = a[0] + b[0] * scale;
        newDst[1] = a[1] + b[1] * scale;
        newDst[2] = a[2] + b[2] * scale;
        newDst[3] = a[3] + b[3] * scale;
        return newDst;
    }
    /**
     * Subtracts two vectors.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the difference of a and b.
     */
    function subtract(a, b, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = a[0] - b[0];
        newDst[1] = a[1] - b[1];
        newDst[2] = a[2] - b[2];
        newDst[3] = a[3] - b[3];
        return newDst;
    }
    /**
     * Subtracts two vectors.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A vector that is the difference of a and b.
     */
    const sub = subtract;
    /**
     * Check if 2 vectors are approximately equal
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @returns true if vectors are approximately equal
     */
    function equalsApproximately(a, b) {
        return Math.abs(a[0] - b[0]) < EPSILON &&
            Math.abs(a[1] - b[1]) < EPSILON &&
            Math.abs(a[2] - b[2]) < EPSILON &&
            Math.abs(a[3] - b[3]) < EPSILON;
    }
    /**
     * Check if 2 vectors are exactly equal
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @returns true if vectors are exactly equal
     */
    function equals(a, b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }
    /**
     * Performs linear interpolation on two vectors.
     * Given vectors a and b and interpolation coefficient t, returns
     * a + t * (b - a).
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param t - Interpolation coefficient.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The linear interpolated result.
     */
    function lerp(a, b, t, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = a[0] + t * (b[0] - a[0]);
        newDst[1] = a[1] + t * (b[1] - a[1]);
        newDst[2] = a[2] + t * (b[2] - a[2]);
        newDst[3] = a[3] + t * (b[3] - a[3]);
        return newDst;
    }
    /**
     * Performs linear interpolation on two vectors.
     * Given vectors a and b and interpolation coefficient vector t, returns
     * a + t * (b - a).
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param t - Interpolation coefficients vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns the linear interpolated result.
     */
    function lerpV(a, b, t, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = a[0] + t[0] * (b[0] - a[0]);
        newDst[1] = a[1] + t[1] * (b[1] - a[1]);
        newDst[2] = a[2] + t[2] * (b[2] - a[2]);
        newDst[3] = a[3] + t[3] * (b[3] - a[3]);
        return newDst;
    }
    /**
     * Return max values of two vectors.
     * Given vectors a and b returns
     * [max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2])].
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The max components vector.
     */
    function max(a, b, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = Math.max(a[0], b[0]);
        newDst[1] = Math.max(a[1], b[1]);
        newDst[2] = Math.max(a[2], b[2]);
        newDst[3] = Math.max(a[3], b[3]);
        return newDst;
    }
    /**
     * Return min values of two vectors.
     * Given vectors a and b returns
     * [min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2])].
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The min components vector.
     */
    function min(a, b, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = Math.min(a[0], b[0]);
        newDst[1] = Math.min(a[1], b[1]);
        newDst[2] = Math.min(a[2], b[2]);
        newDst[3] = Math.min(a[3], b[3]);
        return newDst;
    }
    /**
     * Multiplies a vector by a scalar.
     * @param v - The vector.
     * @param k - The scalar.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The scaled vector.
     */
    function mulScalar(v, k, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = v[0] * k;
        newDst[1] = v[1] * k;
        newDst[2] = v[2] * k;
        newDst[3] = v[3] * k;
        return newDst;
    }
    /**
     * Multiplies a vector by a scalar. (same as mulScalar)
     * @param v - The vector.
     * @param k - The scalar.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The scaled vector.
     */
    const scale = mulScalar;
    /**
     * Divides a vector by a scalar.
     * @param v - The vector.
     * @param k - The scalar.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The scaled vector.
     */
    function divScalar(v, k, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = v[0] / k;
        newDst[1] = v[1] / k;
        newDst[2] = v[2] / k;
        newDst[3] = v[3] / k;
        return newDst;
    }
    /**
     * Inverse a vector.
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The inverted vector.
     */
    function inverse(v, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = 1 / v[0];
        newDst[1] = 1 / v[1];
        newDst[2] = 1 / v[2];
        newDst[3] = 1 / v[3];
        return newDst;
    }
    /**
     * Invert a vector. (same as inverse)
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The inverted vector.
     */
    const invert = inverse;
    /**
     * Computes the dot product of two vectors
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @returns dot product
     */
    function dot(a, b) {
        return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]) + (a[3] * b[3]);
    }
    /**
     * Computes the length of vector
     * @param v - vector.
     * @returns length of vector.
     */
    function length(v) {
        const v0 = v[0];
        const v1 = v[1];
        const v2 = v[2];
        const v3 = v[3];
        return Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2 + v3 * v3);
    }
    /**
     * Computes the length of vector (same as length)
     * @param v - vector.
     * @returns length of vector.
     */
    const len = length;
    /**
     * Computes the square of the length of vector
     * @param v - vector.
     * @returns square of the length of vector.
     */
    function lengthSq(v) {
        const v0 = v[0];
        const v1 = v[1];
        const v2 = v[2];
        const v3 = v[3];
        return v0 * v0 + v1 * v1 + v2 * v2 + v3 * v3;
    }
    /**
     * Computes the square of the length of vector (same as lengthSq)
     * @param v - vector.
     * @returns square of the length of vector.
     */
    const lenSq = lengthSq;
    /**
     * Computes the distance between 2 points
     * @param a - vector.
     * @param b - vector.
     * @returns distance between a and b
     */
    function distance(a, b) {
        const dx = a[0] - b[0];
        const dy = a[1] - b[1];
        const dz = a[2] - b[2];
        const dw = a[3] - b[3];
        return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
    }
    /**
     * Computes the distance between 2 points (same as distance)
     * @param a - vector.
     * @param b - vector.
     * @returns distance between a and b
     */
    const dist = distance;
    /**
     * Computes the square of the distance between 2 points
     * @param a - vector.
     * @param b - vector.
     * @returns square of the distance between a and b
     */
    function distanceSq(a, b) {
        const dx = a[0] - b[0];
        const dy = a[1] - b[1];
        const dz = a[2] - b[2];
        const dw = a[3] - b[3];
        return dx * dx + dy * dy + dz * dz + dw * dw;
    }
    /**
     * Computes the square of the distance between 2 points (same as distanceSq)
     * @param a - vector.
     * @param b - vector.
     * @returns square of the distance between a and b
     */
    const distSq = distanceSq;
    /**
     * Divides a vector by its Euclidean length and returns the quotient.
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The normalized vector.
     */
    function normalize(v, dst) {
        const newDst = (dst ?? new Ctor(4));
        const v0 = v[0];
        const v1 = v[1];
        const v2 = v[2];
        const v3 = v[3];
        const len = Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2 + v3 * v3);
        if (len > 0.00001) {
            newDst[0] = v0 / len;
            newDst[1] = v1 / len;
            newDst[2] = v2 / len;
            newDst[3] = v3 / len;
        }
        else {
            newDst[0] = 0;
            newDst[1] = 0;
            newDst[2] = 0;
            newDst[3] = 0;
        }
        return newDst;
    }
    /**
     * Negates a vector.
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns -v.
     */
    function negate(v, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = -v[0];
        newDst[1] = -v[1];
        newDst[2] = -v[2];
        newDst[3] = -v[3];
        return newDst;
    }
    /**
     * Copies a vector. (same as {@link vec4.clone})
     * Also see {@link vec4.create} and {@link vec4.set}
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A copy of v.
     */
    function copy(v, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = v[0];
        newDst[1] = v[1];
        newDst[2] = v[2];
        newDst[3] = v[3];
        return newDst;
    }
    /**
     * Clones a vector. (same as {@link vec4.copy})
     * Also see {@link vec4.create} and {@link vec4.set}
     * @param v - The vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns A copy of v.
     */
    const clone = copy;
    /**
     * Multiplies a vector by another vector (component-wise); assumes a and
     * b have the same length.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The vector of products of entries of a and b.
     */
    function multiply(a, b, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = a[0] * b[0];
        newDst[1] = a[1] * b[1];
        newDst[2] = a[2] * b[2];
        newDst[3] = a[3] * b[3];
        return newDst;
    }
    /**
     * Multiplies a vector by another vector (component-wise); assumes a and
     * b have the same length. (same as mul)
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The vector of products of entries of a and b.
     */
    const mul = multiply;
    /**
     * Divides a vector by another vector (component-wise); assumes a and
     * b have the same length.
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The vector of quotients of entries of a and b.
     */
    function divide(a, b, dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = a[0] / b[0];
        newDst[1] = a[1] / b[1];
        newDst[2] = a[2] / b[2];
        newDst[3] = a[3] / b[3];
        return newDst;
    }
    /**
     * Divides a vector by another vector (component-wise); assumes a and
     * b have the same length. (same as divide)
     * @param a - Operand vector.
     * @param b - Operand vector.
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The vector of quotients of entries of a and b.
     */
    const div = divide;
    /**
     * Zero's a vector
     * @param dst - vector to hold result. If not passed in a new one is created.
     * @returns The zeroed vector.
     */
    function zero(dst) {
        const newDst = (dst ?? new Ctor(4));
        newDst[0] = 0;
        newDst[1] = 0;
        newDst[2] = 0;
        newDst[3] = 0;
        return newDst;
    }
    /**
     * transform vec4 by 4x4 matrix
     * @param v - the vector
     * @param m - The matrix.
     * @param dst - optional vec4 to store result. If not passed a new one is created.
     * @returns the transformed vector
     */
    function transformMat4(v, m, dst) {
        const newDst = (dst ?? new Ctor(4));
        const x = v[0];
        const y = v[1];
        const z = v[2];
        const w = v[3];
        newDst[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
        newDst[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
        newDst[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
        newDst[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
        return newDst;
    }
    /**
     * Treat a 4D vector as a direction and set it's length
     *
     * @param a The vec4 to lengthen
     * @param len The length of the resulting vector
     * @returns The lengthened vector
     */
    function setLength(a, len, dst) {
        const newDst = (dst ?? new Ctor(4));
        normalize(a, newDst);
        return mulScalar(newDst, len, newDst);
    }
    /**
     * Ensure a vector is not longer than a max length
     *
     * @param a The vec4 to limit
     * @param maxLen The longest length of the resulting vector
     * @returns The vector, shortened to maxLen if it's too long
     */
    function truncate(a, maxLen, dst) {
        const newDst = (dst ?? new Ctor(4));
        if (length(a) > maxLen) {
            return setLength(a, maxLen, newDst);
        }
        return copy(a, newDst);
    }
    /**
     * Return the vector exactly between 2 endpoint vectors
     *
     * @param a Endpoint 1
     * @param b Endpoint 2
     * @returns The vector exactly residing between endpoints 1 and 2
     */
    function midpoint(a, b, dst) {
        const newDst = (dst ?? new Ctor(4));
        return lerp(a, b, 0.5, newDst);
    }
    return {
        create,
        fromValues,
        set,
        ceil,
        floor,
        round,
        clamp,
        add,
        addScaled,
        subtract,
        sub,
        equalsApproximately,
        equals,
        lerp,
        lerpV,
        max,
        min,
        mulScalar,
        scale,
        divScalar,
        inverse,
        invert,
        dot,
        length,
        len,
        lengthSq,
        lenSq,
        distance,
        dist,
        distanceSq,
        distSq,
        normalize,
        negate,
        copy,
        clone,
        multiply,
        mul,
        divide,
        div,
        zero,
        transformMat4,
        setLength,
        truncate,
        midpoint,
    };
}
const cache = new Map();
/**
 *
 * Vec4 math functions.
 *
 * Almost all functions take an optional `newDst` argument. If it is not passed in the
 * functions will create a new `Vec4`. In other words you can do this
 *
 *     const v = vec4.cross(v1, v2);  // Creates a new Vec4 with the cross product of v1 x v2.
 *
 * or
 *
 *     const v = vec4.create();
 *     vec4.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always safe to pass any vector as the destination. So for example
 *
 *     vec4.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1
 *
 */
function getAPI(Ctor) {
    let api = cache.get(Ctor);
    if (!api) {
        api = getAPIImpl(Ctor);
        cache.set(Ctor, api);
    }
    return api;
}

/**
 * Some docs
 * @namespace wgpu-matrix
 */
/**
 * Generate wgpu-matrix API for type
 */
function wgpuMatrixAPI(Mat3Ctor, Mat4Ctor, QuatCtor, Vec2Ctor, Vec3Ctor, Vec4Ctor) {
    return {
        /** @namespace mat3 */
        mat3: getAPI$3(Mat3Ctor),
        /** @namespace mat4 */
        mat4: getAPI$2(Mat4Ctor),
        /** @namespace quat */
        quat: getAPI$1(QuatCtor),
        /** @namespace vec2 */
        vec2: getAPI$5(Vec2Ctor),
        /** @namespace vec3 */
        vec3: getAPI$4(Vec3Ctor),
        /** @namespace vec4 */
        vec4: getAPI(Vec4Ctor),
    };
}
const { 
/**
 * 3x3 Matrix functions that default to returning `Float32Array`
 * @namespace
 */
mat3, 
/**
 * 4x4 Matrix functions that default to returning `Float32Array`
 * @namespace
 */
mat4, 
/**
 * Quaternion functions that default to returning `Float32Array`
 * @namespace
 */
quat, 
/**
 * Vec2 functions that default to returning `Float32Array`
 * @namespace
 */
vec2, 
/**
 * Vec3 functions that default to returning `Float32Array`
 * @namespace
 */
vec3, 
/**
 * Vec3 functions that default to returning `Float32Array`
 * @namespace
 */
vec4, } = wgpuMatrixAPI(Float32Array, Float32Array, Float32Array, Float32Array, Float32Array, Float32Array);
const { 
/**
 * 3x3 Matrix functions that default to returning `Float64Array`
 * @namespace
 */
mat3: mat3d, 
/**
 * 4x4 Matrix functions that default to returning `Float64Array`
 * @namespace
 */
mat4: mat4d, 
/**
 * Quaternion functions that default to returning `Float64Array`
 * @namespace
 */
quat: quatd, 
/**
 * Vec2 functions that default to returning `Float64Array`
 * @namespace
 */
vec2: vec2d, 
/**
 * Vec3 functions that default to returning `Float64Array`
 * @namespace
 */
vec3: vec3d, 
/**
 * Vec3 functions that default to returning `Float64Array`
 * @namespace
 */
vec4: vec4d, } = wgpuMatrixAPI(Float64Array, Float64Array, Float64Array, Float64Array, Float64Array, Float64Array);
const { 
/**
 * 3x3 Matrix functions that default to returning `number[]`
 * @namespace
 */
mat3: mat3n, 
/**
 * 4x4 Matrix functions that default to returning `number[]`
 * @namespace
 */
mat4: mat4n, 
/**
 * Quaternion functions that default to returning `number[]`
 * @namespace
 */
quat: quatn, 
/**
 * Vec2 functions that default to returning `number[]`
 * @namespace
 */
vec2: vec2n, 
/**
 * Vec3 functions that default to returning `number[]`
 * @namespace
 */
vec3: vec3n, 
/**
 * Vec3 functions that default to returning `number[]`
 * @namespace
 */
vec4: vec4n, } = wgpuMatrixAPI(ZeroArray, Array, Array, Array, Array, Array);


//# sourceMappingURL=wgpu-matrix.module.js.map


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
/******/ 	var __webpack_exports__ = __webpack_require__("./main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map