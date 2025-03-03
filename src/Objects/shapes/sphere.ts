import { vec3, Vec4 } from "wgpu-matrix";
import { IObject } from "../../interfaces/IObject";
import { IShape } from "../../interfaces/IShape";


// export class Sphere implements IObject, IShape {
//     name: string;
//     id: string;
//     position: Float32Array;
//     rotation: Float32Array;
//     scale: Float32Array;

//     color: Vec4;

//     private positions: Float32Array;
//     vertexData: Float32Array;
//     normalsData: Float32Array;
//     indexData: Uint16Array;

//     constructor(name: string, position: [number, number, number], rotation: [number, number, number], scale: [number, number, number], color: [number, number, number, number]){
//         this.name = name;
//         this.position = vec3.create(...position);
//         this.rotation = vec3.create(...rotation);
//         this.scale = vec3.create(...scale);


//         let d = new Date();
//         this.id = d.getTime().toString() + this.name;

//         this.position = new Float32Array([

//         ])
//     }
    
//     move: (x: number, y: number, z: number) => void;
//     rotate: (rotX: number, rotY: number, rotZ: number) => void;

//     private generate_sphere = (n_slices: number, n_stacks: number) => {
//         let verticies: number[] = [];
//         let normals: number[] = [];
//         let uv: number[] = [];
        
//         out.push(...[0, 1, 0]);

//         for (let i = 0; i < n_stacks - 1; i++) {
//             let phi = Math.PI * (i + 1) / n_stacks;
//             for (let j = 0; j < n_slices; j++) {
//                 let theta = 2.0 * Math.PI * j / n_slices;
//                 let x = Math.sin(phi) * Math.cos(theta);
//                 let y = Math.cos(phi);
//                 let z = Math.sin(phi) * Math.sin(theta);
//                 out.push(...[x, y, z]);
//             }
//         }

//         out.push(...[0, -1, 0]);

//         for (let i = 0; i < n_slices; i++) {
//             let i0 = i + 1;
//             let i1 = (i + 1) % n_slices + 1;

//         }
//     }
// }