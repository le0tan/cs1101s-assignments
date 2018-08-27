function fractal(pic, n) {
    return n <= 1 ? pic
                   : beside_frac(pic,
                                 stackn(2, fractal(pic, n - 1)),
                                 0.5);
}

function beside_frac(pic1, pic2, n){
    return quarter_turn_right(
        stack_frac(
        1 - n,
        quarter_turn_left(pic2),
        quarter_turn_left(pic1)));
}

// Test
show(fractal(make_cross(rcross_bb), 7));