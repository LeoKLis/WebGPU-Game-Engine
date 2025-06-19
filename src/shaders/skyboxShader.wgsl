// struct Uniforms {
//   viewDirectionProjectionInverse: mat4x4f,
// };
 
// struct VSOutput {
//   @builtin(position) position: vec4f,
//   @location(0) pos: vec4f,
// };
 
// @group(0) @binding(0) var<uniform> uni: Uniforms;
// @group(0) @binding(1) var ourSampler: sampler;
// @group(0) @binding(2) var ourTexture: texture_cube<f32>;
 
// @vertex fn vs(@builtin(vertex_index) vNdx: u32) -> VSOutput {
//   let pos = array(
//     vec2f(-1, 3),
//     vec2f(-1,-1),
//     vec2f( 3,-1),
//   );
//   var vsOut: VSOutput;
//   vsOut.position = vec4f(pos[vNdx], 1, 1);
//   vsOut.pos = vsOut.position;
//   return vsOut;
// }

// @fragment fn fs(vsOut: VSOutput) -> @location(0) vec4f {
//   let t = uni.viewDirectionProjectionInverse * vsOut.pos;
//   return textureSample(ourTexture, ourSampler, normalize(t.xyz / t.w) * vec3f(1, 1, -1));
// }
struct Uniforms {
  viewDirectionProjectionInverse: mat4x4f,
};
struct VSOutput {
  @builtin(position) position: vec4f,
  @location(0) ndc: vec2f, // Normalized Device Coordinates (range -1 to 1)
};
@group(0) @binding(0) var<uniform> uni: Uniforms;
@group(0) @binding(1) var ourSampler: sampler;
@group(0) @binding(2) var ourTexture: texture_cube<f32>;

@vertex fn vs(@builtin(vertex_index) vNdx: u32) -> VSOutput {
  let pos = array(
    vec2f(-1.0,  3.0),
    vec2f(-1.0, -1.0),
    vec2f( 3.0, -1.0),
  );

  let ndc = array(
    vec2f(-1.0,  3.0),
    vec2f(-1.0, -1.0),
    vec2f( 3.0, -1.0),
  );

  var out: VSOutput;
  out.position = vec4f(pos[vNdx], 1.0, 1.0);
  out.ndc = ndc[vNdx];
  return out;
}
@fragment fn fs(vsOut: VSOutput) -> @location(0) vec4f {
  let clip = vec4f(vsOut.ndc.xy, 1.0, 1.0);
  let worldDir = (uni.viewDirectionProjectionInverse * clip).xyz;
  return textureSample(ourTexture, ourSampler, worldDir);
}
