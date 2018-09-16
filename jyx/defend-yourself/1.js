const J = t => t < 1 / 3
                ? make_point(5 / 6 - 2 * t, 5 / 6)
                : t < 2 / 3
                  ? make_point(0.5, 5 / 6 - (t - 1 / 3) * 3 * 0.5)
                  : make_point(math_sin(((t - 2 / 3) * 3 + 0.5) * math_PI) * 1 / 6 + 1 / 3,
                               math_cos(((t - 2 / 3) * 3 + 0.5) * math_PI) * 1 / 6 + 1 / 3);


// Test
(draw_connected(1000))(J);
