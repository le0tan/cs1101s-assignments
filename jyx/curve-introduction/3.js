function s_generator(pt) {
    return t => t <= 0.5
                ? make_point(math_sin(0.5 * math_PI - 3 * math_PI * t) + x_of(pt),
                             math_cos(0.5 * math_PI - 3 * math_PI * t) + y_of(pt) + 1)
                : make_point(math_sin(3 * math_PI * (t - 0.5)) + x_of(pt),
                             math_cos(3 * math_PI * (t - 0.5)) + y_of(pt) - 1);
}

// Test
(draw_connected_squeezed_to_window(200))(s_generator(make_point(0.5, 0.25)));
