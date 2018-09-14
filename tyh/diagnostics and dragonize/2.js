function dragonize(n, curve) {
    // your answer here
    if(n === 0){
        return curve;
    } else {
        const ct = dragonize(n - 1,curve);
        return put_in_standard_position(
                connect_ends(
                    invert(rotate_around_origin(-math_PI / 2)(ct)),
                    ct));
    }
}

// Test
(draw_connected_squeezed_to_window(1000))(dragonize(100, unit_line));