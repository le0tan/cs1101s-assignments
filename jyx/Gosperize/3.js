function timing(f) {
    const start = runtime();
    const result = f();
    const end = runtime();
    display("runtime (ms): " + (end - start));
    return result;
}

// Task 3

/*
Case                1       2       3       4       5       average
gosper_curve        1       1       0       0       2       0.8
param_gosper        13      15      13      17      13      14.2
your_param_gosper   3110    3507    2884    2965    3263    3140.4

The key difference is that the 3 functions have different steps of
combining two lower-level curves. The gosper_curve function has a
constant angle of rotation, while the other two need to calculate
the angle at each level. The last two functions use different functions
to combine the curves, which may have different runtime. These steps 
lead to different runtime of the three functions.

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
const l = 300;
timing(() => gosper_curve(l));
timing(() => param_gosper(l, n => math_PI / 4));
timing(() => your_param_gosper(l, n => math_PI / 4));
*/

