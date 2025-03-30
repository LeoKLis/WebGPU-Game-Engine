import { mat4, vec3 } from "wgpu-matrix";
import { Cube } from "./Objects/shapes/cube";
import { Sphere } from "./Objects/shapes/sphere";


export function checkCollision(sphere: Sphere, cube: Cube) {
    const localSpherePosition = vec3.subtract(sphere.position, cube.position);
    const inverseRotationMatrix = mat4.transpose(cube.getRotationMatrix());
    const spherePosLocal = vec3.transformMat4(localSpherePosition, inverseRotationMatrix);

    const closestX = Math.max(-cube.size[0] / 2, Math.min(spherePosLocal[0], cube.size[0] / 2));
    const closestY = Math.max(-cube.size[1] / 2, Math.min(spherePosLocal[1], cube.size[1] / 2));
    const closestZ = Math.max(-cube.size[2] / 2, Math.min(spherePosLocal[2], cube.size[2] / 2));

    const dx = spherePosLocal[0] - closestX;
    const dy = spherePosLocal[1] - closestY;
    const dz = spherePosLocal[2] - closestZ;
    const distanceSquared = dx * dx + dy * dy + dz * dz;

    return distanceSquared <= sphere.getRadius() * sphere.getRadius();
}