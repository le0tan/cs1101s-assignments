/*
1) Yes. For each point drawn at time t, the two funtions both use the original
point with the theta to get the position of the new point at time t.The x and
y are the same at time t in both functions and then it uses the same formula
to calculate the new point. Therefore, both functions return the same curve
for the same input.

2) In the function new_curve, pixel_rotate calls curve(t) twice, while
rotate_around_origin calls curve(t) once. Therefore, if pixel_rotate is
used, when the curve in level l is accessed, calculating the point at 
time t has an order of growth O(2^l) because at each level, it calls 
the lower-level curve twice. However, if rotate_around_origin is used,
calculating the point at time t has an order of growth O(l) because at 
each level, it calls the lower_level curve once.
*/

function dragonize(n, curve) {
    if (n === 0) {
        return curve;
    } else {
        const c = dragonize(n - 1, curve);
        return put_in_standard_position(connect_ends(
                invert((rotate_around_origin(-math_PI / 2))(c)),c));
    }
}

// Test
(draw_connected_squeezed_to_window(1000))(dragonize(200, unit_line));
