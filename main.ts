import { Camera, CameraType } from "./src/Objects/camera";
import { ControllerDevice, InputHandler } from "./src/inputHandler";
import { Renderer } from "./src/renderer";
import { Scene } from "./src/scene";
import { Cube } from "./src/Objects/shapes/cube";
import { Light } from "./src/Objects/light";
import { Sphere } from "./src/Objects/shapes/sphere";
import { checkCollision } from "./src/collision";
import { TextureAtlas } from "./src/textureAtlas";
import { mat4, vec3 } from "wgpu-matrix";
import { Vector } from "./src/Objects/vector";

let textureAtlas = new TextureAtlas();
// await textureAtlas.loadImage("./objects/pixil-frame-0.png", 3, 1);
await textureAtlas.loadImage("./objects/2_no_clouds_8k (Medium).jpg", 1, 1);

const canvas = window.document.getElementById("canvas") as HTMLCanvasElement;
const renderer = new Renderer(canvas);
await renderer.initialize(textureAtlas);

const inputHandler = new InputHandler(canvas);

const scene = new Scene();

const camera = new Camera({
    name: "Kamera",
    id: "kameraID",
    position: [0, 5, -10],
    rotation: [5, 180, 0],
    cameraType: CameraType.perspective,
});

// await textureAtlas.loadImage("./objects/dice_unwrap_reference.png", 1, 1);

const cube = new Cube({
    name: "Kocka",
    id: "kockaID",
    position: [0, -1.5, 0],
    rotation: [0, 0, 0],
    lenght: [5, 1, 100],
    texture: {
        atlas: textureAtlas,
        indexX: 0,
        indexY: 0,
    }
});

// const cube = new Cube({
//     name: "Kocka",
//     id: "kockaID",
//     position: [0, 0, -2],
//     rotation: [20, 0, 0],
//     lenght: [10, 0.5, 10],
// });

// const cube2 = new Cube({
//     name: "Kocka",
//     id: "kockaID",
//     position: [0, 0, 4],
//     rotation: [-35, 0, 0],
//     lenght: [10, 0.5, 10],
// });

// const cube3 = new Cube({
//     name: "Kocka",
//     id: "kockaID",
//     position: [0, 5, 4],
//     rotation: [20, 0, 0],
//     lenght: [10, 0.5, 5],
// });

// const cube4 = new Cube({
//     name: "Kocka",
//     id: "kockaID",
//     position: [0, 4, -2],
//     rotation: [-50, 0, 0],
//     lenght: [10, 0.5, 5],
// });

const sphere = new Sphere({
    name: "Lopta",
    id: "sphereID",
    position: [0, 3, 0],
    rotation: [0, 0, 0],
    radius: 1,
    texture: {
        atlas: textureAtlas,
        indexX: 0,
        indexY: 0,
    },
});

const light = new Light({
    name: "Svijetlo",
    id: "svijetloID",
    position: [0, 0, 0],
    rotation: [-0.4, -0.8, -1],
});

const vectorX = new Vector({color: [1, 0, 0]});
const vectorY = new Vector({color: [0, 1, 0]});
const vectorZ = new Vector({color: [0, 0, 1]});

scene.setCamera(camera);
scene.setLight(light);
scene.addShapes(cube, /* cube2, cube3, cube4,  */sphere);
scene.vectors.push(vectorX, vectorY, vectorZ);

sphere.attach(camera);

let gravity = -0.00001;
let sphereVelocity = vec3.create(0, 0, 0.005);
let sphereAngularVelocity = vec3.create(0, 0, 0);
let restitutionCoef = 0.8;
let frictionCoef = 0.5;
let sphereMass = 50;

let fixedDeltaTime = 1000 / 60;
let lastTime = 0;
let render = (time: number) => {
    let deltaTime = time - lastTime;
    lastTime = time;
    let grounded = false;

    scene.shapes.forEach((obj) => {
        if (obj instanceof Cube) {
            let collision = checkCollision(sphere, obj);
            if (collision !== undefined) {
                grounded = true;

                // Normal of collision
                let normal = sphere.getNormal(collision.res[0], collision.res[1], collision.res[2]);
                normal = vec3.negate(normal);
                // console.log(normal);

                // Calculate restitution 
                let reposVector = vec3.scale(normal, collision.ratio * sphere.getRadius());
                sphere.globalMove(reposVector[0], reposVector[1], reposVector[2]);
                const vnDot = vec3.dot(sphereVelocity, normal);
                let scaledNormal = vec3.scale(normal, (1 + restitutionCoef) * vnDot);
                sphereVelocity = vec3.subtract(sphereVelocity, scaledNormal);

                // Calculate friction
                let movementVec = new Float32Array(sphereVelocity);
                let sideCrossVec = vec3.cross(normal, movementVec);
                let directionVec = vec3.cross(sideCrossVec, normal);
                let upVec = new Float32Array([0, 1, 0]);
                let normalForce = vec3.dot(normal, upVec)
                let frictionVec = vec3.negate(vec3.normalize(directionVec));
                frictionVec = vec3.scale(frictionVec, frictionCoef * sphereMass * gravity * normalForce);
                sphereVelocity = vec3.subtract(sphereVelocity, frictionVec);
                let sss = vec3.create(frictionVec[2], frictionVec[1], frictionVec[0])
                sss = vec3.mulScalar(sss, 500);
                sphereAngularVelocity[0] = sss[0];
                sphereAngularVelocity[1] = sss[1];
                sphereAngularVelocity[2] = sss[2];
            }
        }
    });

    // Calculate air resistance
    // let dragDirection = vec3.negate(vec3.normalize(sphereSpeed));
    // let absSpeed = vec3.len(sphereSpeed);
    // let dragForce = vec3.scale(dragDirection, 0.1 * absSpeed * absSpeed * sphere.getRadius() * sphere.getRadius() * Math.PI * 0.47);
    // sphereSpeed = vec3.subtract(sphereSpeed, dragForce);

    // Calculate gravity
    sphereVelocity[1] += gravity * fixedDeltaTime;

    inputHandler.control(sphere, 0.001, 0.1, fixedDeltaTime, ControllerDevice.keyboard);
    if (inputHandler.control(sphere, 0.001, 0.1, fixedDeltaTime, ControllerDevice.mouse)) {
        renderer.render(scene);
        requestAnimationFrame(render);
        return;
    }

    sphere.globalMove(sphereVelocity[0] * fixedDeltaTime, sphereVelocity[1] * fixedDeltaTime, sphereVelocity[2] * fixedDeltaTime);
    sphere.globalRotate(sphereAngularVelocity[0] * fixedDeltaTime, sphereAngularVelocity[1] * fixedDeltaTime, sphereAngularVelocity[2] * fixedDeltaTime);
    // console.log(sphereAngularVelocity);

    vectorX.setPosition(sphere.position);
    vectorX.setVector(mat4.getAxis(sphere.getRotationMatrix(), 0) as Float32Array);
    vectorY.setPosition(sphere.position);
    vectorY.setVector(mat4.getAxis(sphere.getRotationMatrix(), 1) as Float32Array);
    vectorZ.setPosition(sphere.position);
    vectorZ.setVector(mat4.getAxis(sphere.getRotationMatrix(), 2) as Float32Array);

    renderer.render(scene);
    requestAnimationFrame(render);
    // console.log("FPS: %f", 1 / deltaTime * 1000);
}
requestAnimationFrame(render);