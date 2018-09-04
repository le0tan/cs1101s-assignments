function your_param_gosper(level, angle_at) {
    return level === 0
        ? unit_line
        : (your_param_gosperize(angle_at(level)))
	    (your_param_gosper(level - 1, angle_at));
}

function your_param_gosperize(theta){
    return curve => put_in_standard_position(
                     // your solution here
        connect_ends((rotate_around_origin(theta))(curve),
                     (rotate_around_origin(-theta))(curve)));
}

function timing(f) {
    const start = runtime();
    const result = f();
    const end = runtime();
    display("runtime (ms): " + (end - start));
    return result;
}

// Task 3

/*
your tests and results here
*/

function fib(n) {
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}


const lvl = 250;
timing( () => gosper_curve(lvl));
timing( () => param_gosper(lvl, level => math_PI / 4));
timing( () => your_param_gosper(lvl, level => math_PI / 4));

/**
 * (Unit: ms)
 * Func     g_c     p_g     y_p_g
 * Take 1:  0,      16,     2701
 * Take 2:  1,      10,     2818
 * Take 3:  0,      9,      2660
 * Take 4:  0,      7,      2723
 * Take 5:  0,      8,      2882
 * Take 6:  1,      5,      2589
 * Avg:     0.3,    9.2,    2728.8
 * 
 * 
 * Key difference:
 * They have different gosperize functions,
 * and since param_gosperize introduces trignometry functions,
 * it takes some more time.
 * In your_param_gosperize, put_in_standard_position is
 * quite complicated and takes much more time.
 * 
 * Other than their gosperize sub-functions, these gosper functions
 * share similar orders of growth.
 **/