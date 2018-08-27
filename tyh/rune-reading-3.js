function spiral(gradient, n) {
    // your answer here
    return n === 0 ? blank_bb
                  : stack_frac(gradient,hook(gradient / 2),
                  quarter_turn_right(spiral(gradient, n - 1)));
}

// copy your hook function from Task 2 here if required
function beside_frac(pic1, pic2, n){
    return quarter_turn_right(
        stack_frac(
        1 - n,
        quarter_turn_left(pic2),
        quarter_turn_left(pic1)));
}

function hook(frac) {
    return stack(black_bb,
    beside_frac(blank_bb, black_bb, 1 - frac));
}

// Test
show(spiral(1 / 5, 20));