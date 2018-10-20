const test_curve =
    t => make_point(t, 0.5 + (math_sin(4 * (math_PI * t)) / 2));

function stack_frac(frac, c1, c2) {
    // your program here
    function scale_c(frac, curve) {
    return t => make_point(x_of(curve(2 * t)),
                               frac * y_of(curve(2 * t)));
    }
    return connect_rigidly(translate(0,1 - frac)(scale_c(frac,c1)),scale_c(1 - frac, c2));
}

// Test
(draw_points_on(6000))(stack_frac(1/5,
                                  test_curve,
                                  stack_frac(3/4,
                                             test_curve,
                                             test_curve)));
