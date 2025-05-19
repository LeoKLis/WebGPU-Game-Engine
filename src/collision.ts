import { mat4, vec3 } from "wgpu-matrix";
import { Cube } from "./Objects/shapes/cube";
import { Sphere } from "./Objects/shapes/sphere";


export function checkCollision(sphere: Sphere, cube: Cube) {
    
    // Pretvorba sfere u lokalni koordinatni sustav kocke
    const localSpherePosition = vec3.subtract(sphere.position, cube.position);
    const inverseRotationMatrix = mat4.transpose(cube.getRotationMatrix());
    const spherePosLocal = vec3.transformMat4(localSpherePosition, inverseRotationMatrix);

    // Najbliza tocka sudara
    const closestX = Math.max(-cube.getLength()[0] / 2, Math.min(spherePosLocal[0], cube.getLength()[0] / 2));
    const closestY = Math.max(-cube.getLength()[1] / 2, Math.min(spherePosLocal[1], cube.getLength()[1] / 2));
    const closestZ = Math.max(-cube.getLength()[2] / 2, Math.min(spherePosLocal[2], cube.getLength()[2] / 2));

    // Udaljenost najblize tocke i sfere
    const dx = spherePosLocal[0] - closestX;
    const dy = spherePosLocal[1] - closestY;
    const dz = spherePosLocal[2] - closestZ;
    const distanceSquared = dx * dx + dy * dy + dz * dz;

    // Ako je udaljenost manja od radijusa, onda je sudar
    if (distanceSquared <= sphere.getRadius() * sphere.getRadius()) {
        let res = new Float32Array([closestX, closestY, closestZ]);
        let outMat = mat4.multiply(cube.getPositionMatrix(), cube.getRotationMatrix());
        res = vec3.transformMat4(res, outMat);
        return {
            res: res,
            ratio: (sphere.getRadius() - Math.sqrt(distanceSquared)) / sphere.getRadius(),
        }
    } 
    return undefined;
}