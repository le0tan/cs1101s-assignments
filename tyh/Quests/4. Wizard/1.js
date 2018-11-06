const test_curve = function(t) {
    return make_point(t, 0.5 + (math_sin(4 * (math_PI * t)) / 2));
};

function stack(c1, c2) {
    return t => t <= 0.5
                ? make_point(x_of(c1(t * 2)),
                             y_of(c1(t * 2)) / 2 + 0.5)
                : make_point(x_of(c2(t * 2 - 1)), 
                             y_of(c2(t * 2 - 1)) / 2);
}

// Test
(draw_points_on(4000))(stack(test_curve, test_curve));