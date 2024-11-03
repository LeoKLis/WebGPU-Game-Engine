struct Uniforms {
    scale: vec3f,
    fov: f32,
    position: vec3f,
    time: f32,
};

struct Cube {
    @builtin(position) cubeVerts: vec4f,
    // @location(0) cubeColor: vec4f
};

@group(0) @binding(0) var<uniform> uni: Uniforms;
@group(0) @binding(1) var<storage, read> cube: array<Cube>;

@vertex
fn vert(@builtin(vertex_index) vertIndex: u32) -> Cube {

    let rotationMatrixY = mat4x4f(
        vec4f(cos(uni.time), 0, sin(uni.time), 0),
        vec4f(0, 1, 0, 0),
        vec4f(-sin(uni.time), 0, cos(uni.time), 0),
        vec4f(0, 0, 0, 1),
    );

    let rotationMatrixX = mat4x4f(
        vec4f(1, 0, 0, 0),
        vec4f(0, cos(uni.time * 2), -sin(uni.time * 2), 0),
        vec4f(0, sin(uni.time * 2), cos(uni.time * 2), 0),
        vec4f(0, 0, 0, 1),
    );

    let perspMatrix = mat4x4f(
        vec4f(1 / tan(3.1415 * uni.fov / 4), 0, 0, 0),
        vec4f(0, 1 / tan(3.1415 * uni.fov / 4), 0, 0),
        vec4f(0, 0, -600.0 / 599.99, -1),
        vec4f(0, 0, -6 / 599.99, 0),
    );

    let scaleMatr = mat4x4f(
        vec4f(uni.scale.x, 0, 0 , 0),
        vec4f(0, uni.scale.y, 0 , 0),
        vec4f(0, 0, uni.scale.z , 0),
        vec4f(0, 0, 0 , 1),
    );

    let offset = vec4f(uni.position, 0);

    var output: Cube;
    output.cubeVerts = perspMatrix * (rotationMatrixY * scaleMatr * cube[vertIndex].cubeVerts + offset);
    // output.cubeColor = cube[vertIndex].cubeColor;
    return output;
}

@fragment
fn frag(input: Cube) -> @location(0) vec4f {
    // return input.cubeColor;
    return vec4f(0.7, 0.7, 0.7, 1.0);
}
