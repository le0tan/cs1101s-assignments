function hook(frac) {
    // your answer here
    return stack(black_bb,quarter_turn_right(stack_frac(frac, black_bb, blank_bb)));
}

// Test
show(hook(1/5));
