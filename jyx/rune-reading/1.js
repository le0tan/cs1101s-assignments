function fractal(pic, n) {
    return n === 1
           ? pic
           : beside(pic, fractal(stack(pic, pic), n - 1));
}

// Test
show(fractal(make_cross(rcross_bb), 7));
