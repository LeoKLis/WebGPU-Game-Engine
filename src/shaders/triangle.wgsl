
@vertex
fn vert(@builtin(vertex_index) vertIndex: u32) -> @builtin(position) vec4f {
    let pos = array(
        vec2f(0.0, 0.5),
        vec2f(-0.5, -0.5),
        vec2f(0.5, -0.5),
    );

    return vec4f(pos[vertIndex], 0.0, 1.0);
}

@fragment
fn frag() -> @location(0) vec4f {
    return vec4f(1.0, 0.0, 0.0, 1.0);
}
