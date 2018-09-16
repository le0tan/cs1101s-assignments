// your program here
function show_connected_koch(level, number_of_points) {
    function koch(sublevel) {
        if(sublevel === 0) {
            return unit_line;
        } else {
            const curve = koch(sublevel - 1);
            return connect_ends(
                connect_ends(
                    curve,
                    rotate_around_origin( math_PI / 3)(curve)),
                connect_ends(
                    rotate_around_origin(-math_PI / 3)(curve),
                    curve));
        }
    }
    return (draw_connected(number_of_points))(put_in_standard_position(koch(level)));
}
// Test
show_connected_koch(5, 4000);

