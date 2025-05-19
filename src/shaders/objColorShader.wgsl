struct Camera {
    matrix: mat4x4f,
};

struct Light {
    direction: vec3f,
}

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) normal: vec3f,
    @location(1) texcoord: vec2f,
};

// Bind group for world
@group(0) @binding(0) var<uniform> camera: Camera;
@group(0) @binding(1) var<uniform> light: Light;

// Bind group for objects
@group(1) @binding(0) var<uniform> objTran: mat4x4f;
@group(1) @binding(1) var<uniform> color: vec4f;

@vertex
fn vert(
    @location(0) position: vec4f,
    @location(1) normal: vec3f,
    @location(2) texcoord: vec2f,
    @builtin(vertex_index) vertIndex: u32
) -> VertexOutput {
    var vsOut: VertexOutput;
    vsOut.position = camera.matrix * objTran * position;
    vsOut.normal = (objTran * vec4f(normal, 0)).xyz;
    vsOut.texcoord = texcoord;
    return vsOut;
}

@fragment
fn frag(vsOut: VertexOutput) -> @location(0) vec4f {
    let normal = normalize(vsOut.normal);
    let lgh = max(dot(normal, -light.direction), 0.25);
    let col = color.rgb * lgh; // Multiply only color (not alpha)
    // let col = color.rgb; // Multiply only color (not alpha)
    return vec4f(col, color.a);
}
