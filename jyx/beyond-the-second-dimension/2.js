function cone(n, rune){
    return n === 1
           ? rune
           : overlay_frac((n - 1) / n, 
                          cone(n - 1, scale((n - 1) / n, rune)), 
                          rune);
}

// Test
show(cone(4, circle_bb));