struct Camera {
    matrix: mat4x4f,
}

struct Object {
    matrix: mat4x4f,
    color: vec4f,
    empty: vec4f,
    position: vec4f
}

@group(0) @binding(0) var<uniform> cam: Camera;

// @group(1) @binding(0) var<uniform> objTran: mat4x4f;
// @group(1) @binding(1) var<uniform> color: vec4f;

@vertex
fn vert(
    @location(0) object: Object,
    @builtin(vertex_index) vertIndex: u32
) -> @builtin(position) vec4f {

    let parallGram = array(
        vec4f(0.6, 0, 0, 1),
        vec4f(0, 1, 0, 1),
        vec4f(-1, 0, 0, 1),
        vec4f(1, 0, 0, 1),
        vec4f(0, 1, 0, 1),
        vec4f(1.5, 1, 0, 1),
    );

    var vertPos = cam.matrix * object.matrix * object.position;
    // var vertPos = cam.matrix * position;
    // var vertPos = cam.matrix * parallGram[vertIndex];
    return vertPos; 
}

@fragment
fn frag() -> @location(0) vec4f {
    // return color; 
    return vec4f(0.8, 0.5, 0.2, 1);
}
