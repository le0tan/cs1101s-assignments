// Task 2

function your_param_gosper(level, angle_at) {
    return level === 0
        ? unit_line
        : (your_param_gosperize(angle_at(level)))
	    (your_param_gosper(level - 1, angle_at));
}

function your_param_gosperize(theta){
    return curve => put_in_standard_position(
                     // your solution here
        connect_ends(curve, rotate_around_origin(-theta * 2)(curve)));
}

// testing
(draw_connected(200))(your_param_gosper(10, n => math_PI / (n + 2)));
(draw_connected(200))(your_param_gosper(5, n => math_PI / 4 / math_pow(1.3, n)));
