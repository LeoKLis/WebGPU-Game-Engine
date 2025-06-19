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

const gravitySpan = document.getElementById("gravityVal") as HTMLSpanElement;
const frictionSpan = document.getElementById("frictionVal") as HTMLSpanElement;
const angvelSpan = document.getElementById("angvelVal") as HTMLSpanElement;
const rollSpan = document.getElementById("rolldampVal") as HTMLSpanElement;
const jumpforceSpan = document.getElementById("jumpforceVal") as HTMLSpanElement;

let pinned = false;
const sliders = document.getElementById("sliders") as HTMLDivElement;
const pinBtn = document.getElementById("pin") as HTMLDivElement;
pinBtn.addEventListener("click", () => {
    if (pinned) {
        // sliders.style.top = "-220px";
        pinBtn.innerText = "Pin 📌";
        pinned = false;
    } else {
        pinBtn.innerText = "Unpin 📌";
        pinned = true;
    }
    sliders.classList.toggle("pinned");
})

let textureAtlas = new TextureAtlas();
// await textureAtlas.loadImage("./objects/pixil-frame-0.png", 3, 1);
await textureAtlas.loadImage("./objects/2_no_clouds_8k (Medium).jpg", 1, 1);

const canvas = window.document.getElementById("canvas") as HTMLCanvasElement;
const renderer = new Renderer(canvas);
await renderer.initialize(textureAtlas, './objects/skybox/');

const inputHandler = new InputHandler(canvas);

const scene = new Scene();

const camera = new Camera({
    name: "Kamera",
    id: "kameraID",
    position: [0, 7.5, -21],
    rotation: [16, 180, 0],
    cameraType: CameraType.perspective,
    fov: 60,
    near: 0.1,
    far: 300,
});

const sphere = new Sphere({
    name: "Lopta",
    id: "sphereID",
    position: [0, 3, -9],
    rotation: [0, 0, 0],
    radius: 1,
    texture: {
        atlas: textureAtlas,
        indexX: 0,
        indexY: 0,
    },
    velocity: {
        x: 0,
        y: 0,
        z: 0,
    },
});

const cube = new Cube({
    name: "Kocka",
    id: "kockaID",
    position: [0, 0, -11],
    rotation: [0, 0, 0],
    lenght: [10, 0.5, 10],
    color: [0.3, 0.5, 0.8, 1],
});

const cube2 = new Cube({
    name: "Kocka",
    id: "kockaID",
    position: [0, 0, 15],
    rotation: [0, 0, 0],
    lenght: [10, 0.5, 10],
    color: [0.3, 0.5, 0.8, 1],
});

const cube3 = new Cube({
    name: "Kocka",
    id: "kockaID",
    position: [15, -2, 8],
    rotation: [0, 0, 0],
    lenght: [10, 0.5, 15],
    color: [0.3, 0.5, 0.8, 1],
});

const cube4 = new Cube({
    name: "Kocka",
    id: "kockaID",
    position: [0, 7, 27],
    rotation: [-45, 0, 0],
    lenght: [10, 0.5, 20],
    color: [0.3, 0.5, 0.8, 1],
});

const cube5 = new Cube({
    name: "Kocka",
    id: "kockaID",
    position: [0, 14, 41],
    rotation: [0, 0, 0],
    lenght: [20, 0.5, 10],
    color: [0.3, 0.5, 0.8, 1],
});

const cube6 = new Cube({
    name: "Kocka",
    id: "kockaID",
    position: [-17, 9, 41],
    rotation: [0, 0, -20],
    lenght: [10, 0.2, 10],
    color: [0.3, 0.5, 0.8, 1],
});

const cube7 = new Cube({
    name: "Kocka",
    id: "kockaID",
    position: [0, -2, 35],
    rotation: [-15, 0, 0],
    lenght: [10, 0.5, 25],
    color: [0.3, 0.5, 0.8, 1],
});

const cube8 = new Cube({
    name: "Kocka",
    id: "kockaID",
    position: [0, -10, 10],
    rotation: [-8, 0, 0],
    lenght: [2.5, 0.2, 25],
    color: [0.3, 0.5, 0.8, 1],
});

const cube9 = new Cube({
    name: "Kocka",
    id: "kockaID",
    position: [-5, -10, 0],
    rotation: [8, 0, 0],
    lenght: [2.5, 0.2, 10],
    color: [0.3, 0.5, 0.8, 1],
});

const cube10 = new Cube({
    name: "Kocka",
    id: "kockaID",
    position: [-4, -8, -15],
    rotation: [0, 0, 0],
    lenght: [6, 2, 6],
    color: [0.3, 0.5, 0.8, 1],
});

const cube11 = new Cube({
    name: "Kocka",
    id: "kockaID",
    position: [4, -5, -24],
    rotation: [0, 0, 0],
    lenght: [6, 2, 6],
    color: [0.3, 0.5, 0.8, 1],
});

const cube12 = new Cube({
    name: "Kocka",
    id: "kockaID",
    position: [14, -1, -15],
    rotation: [0, 0, 0],
    lenght: [6, 1, 6],
    color: [0.3, 0.5, 0.8, 1],
});

const light = new Light({
    name: "Svijetlo",
    id: "svijetloID",
    position: [0, 0, 0],
    rotation: [0.3, -0.7, 0.2],
});

scene.setCamera(camera);
scene.setLight(light);
scene.addShapes(cube, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9, cube10, cube11, cube12, sphere);

sphere.attach(camera);

// let gravity = -10;
let gravity = -parseFloat((document.getElementById("gravity") as HTMLInputElement).value) - 1;
let restitutionCoef = 0.3;
let frictionCoef = parseFloat((document.getElementById("friction") as HTMLInputElement).value) / 30;
let angularVelocity = parseFloat((document.getElementById("angvel") as HTMLInputElement).value) * 100;
let rollingDamping = parseFloat((document.getElementById("rolldamp") as HTMLInputElement).value) / 40 + 0.75;
let jumpForce = parseFloat((document.getElementById("jumpforce") as HTMLInputElement).value);

const REST_VELOCITY_THRESHOLD = 0.005;

let fixedDeltaTime = 1 / 60; // seconds
let lastTime = 0;
let grounded = false;
let render = (time: number) => {
    updateCoefficients();
    updateSpans();

    let deltaTime = (time - lastTime) / 1000; // seconds
    lastTime = time;

    inputHandler.control(sphere, grounded, 1, angularVelocity, jumpForce, fixedDeltaTime, ControllerDevice.keyboard);
    grounded = false;

    scene.shapes.forEach((obj) => {
        if (obj instanceof Cube) {
            let collision = checkCollision(sphere, obj);
            if (collision !== undefined) {
                obj.color.set([0, 0.8, 0.2]);
                // Normal of collision
                let ballCollisionNormal = sphere.getNormal(collision.res[0], collision.res[1], collision.res[2]);
                let cubeCollisionNormal = vec3.negate(ballCollisionNormal);

                if (cubeCollisionNormal[1] > 0) {
                    grounded = true;
                }

                // Calculate velocity based on angular velocity
                let contactOffset = vec3.scale(ballCollisionNormal, -sphere.getRadius() * 100);
                let rollingVelocity = vec3.cross(contactOffset, sphere.angularVelocity);
                sphere.velocity = vec3.lerp(sphere.velocity, rollingVelocity, frictionCoef);
                sphere.angularVelocity = vec3.scale(sphere.angularVelocity, rollingDamping);

                // Reposition the sphere to resolve penetration
                let reposVector = vec3.scale(cubeCollisionNormal, collision.ratio * sphere.getRadius());
                sphere.globalMove(reposVector[0], reposVector[1], reposVector[2]);

                // Calculate the velocity along the normal
                const vnDot = vec3.dot(sphere.velocity, cubeCollisionNormal);

                // Decide how bouncy to be based on impact speed
                let currentRestitution = restitutionCoef;
                if (Math.abs(vnDot) < REST_VELOCITY_THRESHOLD) {
                    currentRestitution = 0; // If speed is low, kill the bounce entirely
                }
                // Calculate and apply the restitution impulse
                if (vnDot < 0) { // Only apply restitution if velocities are directed towards each other
                    let scaledNormal = vec3.scale(cubeCollisionNormal, (1 + currentRestitution) * vnDot);
                    sphere.velocity = vec3.subtract(sphere.velocity, scaledNormal);
                }

            }
        }
    });

    // Calculate gravity
    sphere.addForce(0, gravity * deltaTime, 0);

    sphere.globalMove(sphere.velocity[0] * fixedDeltaTime, sphere.velocity[1] * fixedDeltaTime, sphere.velocity[2] * fixedDeltaTime);
    sphere.globalRotate(-sphere.angularVelocity[0] * sphere.getRadius() * 100, 0, -sphere.angularVelocity[2] * sphere.getRadius() * 100);

    renderer.render(scene);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);

function updateCoefficients() {
    gravity = -parseFloat((document.getElementById("gravity") as HTMLInputElement).value) - 1;
    frictionCoef = parseFloat((document.getElementById("friction") as HTMLInputElement).value) / 40;
    angularVelocity = parseFloat((document.getElementById("angvel") as HTMLInputElement).value) * 100;
    rollingDamping = parseFloat((document.getElementById("rolldamp") as HTMLInputElement).value) / 40 + 0.75;
    jumpForce = parseFloat((document.getElementById("jumpforce") as HTMLInputElement).value) * 100;
}

function updateSpans() {
    gravitySpan.textContent = gravity.toString();
    frictionSpan.textContent = frictionCoef.toFixed(3);
    angvelSpan.textContent = angularVelocity.toString();
    rollSpan.textContent = rollingDamping.toFixed(3);
    jumpforceSpan.textContent = jumpForce.toString();
}