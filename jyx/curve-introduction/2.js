function three_quarters(pt) {
    return t => make_point(math_sin(0.5 * math_PI - 1.5 * math_PI * t) + x_of(pt),
                           math_cos(0.5 * math_PI - 1.5 * math_PI * t) + y_of(pt));
}

// Test
(draw_connected_squeezed_to_window(200))(three_quarters(make_point(0.5, 0.25)));

