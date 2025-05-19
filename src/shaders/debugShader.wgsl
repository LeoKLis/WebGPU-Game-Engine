struct Camera {
    matrix: mat4x4f,
};

struct VertexOutput {
    @builtin(position) position: vec4f,
};

@group(0) @binding(0) var<uniform> camera: Camera;
@group(0) @binding(1) var<uniform> color: vec3f;

@vertex
fn vert(
    @location(0) position: vec4f,
) -> VertexOutput {
    var vsOut: VertexOutput;
    vsOut.position = camera.matrix * position;
    return vsOut;
}

@fragment
fn frag() -> @location(0) vec4f {
    return vec4f(color.rgb, 1);
}
