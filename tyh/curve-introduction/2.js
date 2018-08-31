function three_quarters(pt) {
    const x = x_of(pt);
    const y = y_of(pt);
    return t => (t <= 3 / 4)
                ? make_point(math_cos(2 * math_PI * t) + x,
                             math_sin(2 * math_PI * t) + y)
                : make_point(x, y - 1);
}

// Test
(draw_connected_squeezed_to_window(200))(three_quarters(make_point(0.5, 0.25)));