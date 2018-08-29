function persian(rune, count) {
    const row = quarter_turn_right(stackn(count, quarter_turn_left(rune)));
    const col = stackn(count - 2, rune);
    const cen = quarter_turn_left(stack_frac(1 / count,
                                              quarter_turn_right(col),
                                              stack_frac((count - 2)/(count - 1),
                                                         make_cross(rune),
                                                         quarter_turn_right(col)
                                                        )));
    
    return stack_frac(1 / count, row, stack_frac((count - 2)/(count - 1), cen, row));
}

// Test
show(persian(make_cross(rcross_bb), 9));

