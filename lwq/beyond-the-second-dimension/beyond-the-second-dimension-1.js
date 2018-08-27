function steps(r1, r2, r3, r4){
    // your answer here
    return overlay(overlay(translate(-0.5, -0.5, scale(0.5, r4)),
                           translate(-0.5,  0.5, scale(0.5, r3))), 
                   overlay(translate( 0.5,  0.5, scale(0.5, r2)),
                           translate( 0.5, -0.5, scale(0.5, r1))));
}

// Test
show(steps(rcross_bb, sail_bb, corner_bb, nova_bb));
