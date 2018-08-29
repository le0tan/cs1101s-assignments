function spiral(gradient, n) {
    return n === 0
           ? blank_bb
           : stack_frac(gradient, 
                        hook(gradient / 2),
                        quarter_turn_right(spiral(gradient, n - 1)));

}

function hook(frac) {
    return stack(black_bb, 
                 quarter_turn_right(stack_frac(frac, black_bb, blank_bb)));
}

// Test
show(spiral(1 / 5, 20));

