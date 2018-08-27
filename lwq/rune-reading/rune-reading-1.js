function fractal(pic, n) {
    // your answer here
    return (n === 1) ? pic
                     : beside(pic, stack(fractal(pic, n-1),fractal(pic, n-1)));
}

// Test
show(fractal(make_cross(rcross_bb), 7));
