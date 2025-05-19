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

@group(0) @binding(0) var<uniform> camera: Camera;
@group(0) @binding(1) var<uniform> light: Light;

@group(1) @binding(0) var<uniform> objectTransform: mat4x4f;
@group(1) @binding(1) var linSampler: sampler;
@group(1) @binding(2) var tex: texture_2d<f32>;
// @group(1) @binding(3) var<uniform> textureElements: vec2f;

@vertex
fn vert(
    @location(0) position: vec4f,
    @location(1) normal: vec3f,
    @location(2) texcoord: vec2f,
) -> VertexOutput {
    var vsOut: VertexOutput;
    vsOut.position = camera.matrix * objectTransform * position;
    vsOut.normal = (objectTransform * vec4f(normal, 0)).xyz;
    vsOut.texcoord = texcoord;
    return vsOut;
}


@fragment
fn frag(vsOut: VertexOutput) -> @location(0) vec4f {
    let normal = normalize(vsOut.normal);
    let texcolor = textureSample(tex, linSampler, vsOut.texcoord);
    let lgh = max(dot(normal, -light.direction), 0.25);
    let finalcolor = texcolor.rgb * lgh;
    return vec4f(finalcolor, texcolor.a);
}