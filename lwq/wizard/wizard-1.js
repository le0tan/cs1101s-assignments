const test_curve = function(t) {
    return make_point(t,
        0.5 + (math_sin(4 * (math_PI * t)) / 2));
};
// recommended to use connect_rigidly

function stack(c1, c2) {
    // your program here
    function scale_c(curve) {
    return t => make_point(x_of(curve(2 * t)),
                               0.5 * y_of(curve(2 * t)));
    }
    return scale_c(connect_rigidly(translate(0, 1)(c1),c2));
}

// Test
(draw_points_on(4000))(stack(test_curve, test_curve));
