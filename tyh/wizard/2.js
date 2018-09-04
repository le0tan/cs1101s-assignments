const test_curve =
    t => make_point(t, 0.5 + (math_sin(4 * (math_PI * t)) / 2));

function stack_frac(frac, c1, c2) {
    // your program here
    return t => t <= 0.5
            ? make_point(x_of(c1(t * 2)),
                         y_of(c1(t * 2)) * frac + 1 - frac)
            : make_point(x_of(c2(t * 2 - 1)), 
                         y_of(c2(t * 2 - 1)) * (1 - frac));
}

// Test
// (draw_points_on(4000))(stack_frac(1/5, test_curve, test_curve));
(draw_points_on(6000))(stack_frac(1/5,
                                  test_curve,
                                  stack_frac(3/4,
                                             test_curve,
                                             test_curve)));