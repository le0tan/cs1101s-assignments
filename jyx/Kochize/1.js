// your program here
function koch_curve(level) {
    if (level === 0) {
        return unit_line;
    } else {
        const c = koch_curve(level - 1);
        const lf = connect_ends(c, (rotate_around_origin(math_PI / 3))(c));
        const rt = (rotate_around_origin(-math_PI / 3))(lf);
        return put_in_standard_position(connect_ends(lf, rt));
    }
}

function show_connected_koch(level, number_of_points) {
    return (draw_connected(number_of_points))(koch_curve(level));
}
// Test
show_connected_koch(5, 4000);
