function steps(r1, r2, r3, r4){
    const p1 = mosaic(r1, blank_bb, blank_bb, blank_bb);
    const p2 = mosaic(blank_bb, r2, blank_bb, blank_bb);
    const p3 = mosaic(blank_bb, blank_bb, r3, blank_bb);
    const p4 = mosaic(blank_bb, blank_bb, blank_bb, r4);
    return overlay(overlay(p4, p3), overlay(p2, p1));
}

function mosaic(p1, p2, p3, p4) {
    return stack(beside(p4, p1), beside(p3, p2));
}

// Test
show(steps(rcross_bb, sail_bb, corner_bb, nova_bb));