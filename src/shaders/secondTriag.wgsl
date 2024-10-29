struct VertexShaderOutput {
            @builtin(position) position: vec4<f32>,
            @location(0) color: vec4<f32>
        };

@vertex
fn vert(@builtin(vertex_index) VertexIndex: u32) -> VertexShaderOutput {
    var pos = array(
        vec2f(0.1, 0.6),
        vec2f(-0.4, -0.8),
        vec2f(0.2, -0.7)
    );

    var color = array<vec4f, 3>(
        vec4f(1, 0, 1, 1),
        vec4f(0, 0, 1, 1),
        vec4f(0, 1, 1, 1)
    );

    var vsOutput: VertexShaderOutput;
    vsOutput.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOutput.color = color[VertexIndex];
    return vsOutput;
}

@fragment
fn frag(@builtin(position) position: vec4f, @location(0) color: vec4f) -> @location(0) vec4f {
            // let red = vec4f(1, 0, 0, 1);
    let cyan = vec4f(0, 0.8, 0.8, 1);

    let grid = vec2u(position.xy) / 16;
    let stripes = (grid.x + grid.y) % 2 == 0;

    return select(color, color + cyan, stripes);
}