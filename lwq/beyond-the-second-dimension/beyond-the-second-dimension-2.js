function cone(n, rune){
    // your answer here
    return (n === 1) ? rune
                     : overlay_frac(1 - 1 / n, scale(1 - 1 / n, cone(n - 1, rune)), rune);
}

// Test
show(cone(4, circle_bb));
