struct Camera {
    matrix: mat4x4f,
};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) normal: vec3f,
};

// Bind group for world
@group(0) @binding(0) var<uniform> cam: Camera;
@group(0) @binding(1) var<uniform> light: array<vec3f, 3>;

// Bind group for objects
@group(1) @binding(0) var<uniform> objTran: mat4x4f;
@group(1) @binding(1) var<uniform> color: vec4f;

@vertex
fn vert(
    @location(0) position: vec4f,
    @location(1) normal: vec3f,
    @builtin(vertex_index) vertIndex: u32
) -> VertexOutput {
    var vsOut: VertexOutput;
    vsOut.position = cam.matrix * objTran * position;
    vsOut.normal = (objTran * vec4f(normal, 0)).xyz;
    return vsOut;
}

@fragment
fn frag(vsOut: VertexOutput) -> @location(0) vec4f {
    let normal = normalize(vsOut.normal);
    var lgh: f32;
    for (var i = 0; i < 3; i++) {
        let dp = dot(normal, -light[i]);
        if (dp > 0) {
            lgh += dot(normal, -light[i]); // Num between 0..1
        }
    }
    if (lgh < 0.2) { // Adjust min shadow
        lgh = 0.2;
    }
    let col = color.rgb * lgh; // Multiply only color (not alpha)
    return vec4f(col, color.a);
    // return color; 
    // return vec4f(0.8, 0.5, 0.2, 1);
}
