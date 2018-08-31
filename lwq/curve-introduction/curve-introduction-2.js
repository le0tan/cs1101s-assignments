function three_quarters(pt) {
    // return a curve
    return t => make_point(math_cos(3 / 4 * 2 * math_PI * t),
                           math_sin(3 / 4 * 2 * math_PI * t));
}

// Test
(draw_connected_squeezed_to_window(200))(three_quarters(make_point(0.5, 0.25)));
