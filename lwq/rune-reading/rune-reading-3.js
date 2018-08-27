function spiral(gradient, n) {
    // your answer here
    return (n === 0) ? blank_bb
                     : stack_frac(
                         gradient, 
                         hook(0.5 * gradient), 
                         quarter_turn_right(spiral(gradient, n - 1)));
}

// copy your hook function from Task 2 here if required
function hook(frac) {
    // your answer here
    return stack(black_bb,quarter_turn_right(stack_frac(frac, black_bb, blank_bb)));
}
// Test
show(spiral(1/5, 20));
