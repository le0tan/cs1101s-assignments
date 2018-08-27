function place_rune(trans1, trans2, factor, rune){
    return translate(trans1, trans2,
                    scale(factor, rune));
}

function steps(r1, r2, r3, r4){
    // your answer here
   return overlay(
              overlay(place_rune(-0.5, -0.5, 0.5, r4),
                       place_rune(-0.5, 0.5, 0.5, r3)),
              overlay(place_rune(0.5, 0.5, 0.5, r2),
                      place_rune(0.5, -0.5, 0.5, r1))); 
}

// Test
show(steps(rcross_bb, sail_bb, corner_bb, nova_bb));
anaglyph(steps(rcross_bb, sail_bb, corner_bb, nova_bb));