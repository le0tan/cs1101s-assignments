require('../../rune-library');

function persian(rune, count) {
    return stack_frac(
        1 - 1 / count,
        stack_frac(
            1 / (count - 1),
            quarter_turn_right(
                stackn(
                    count,
                    quarter_turn_left(rune))),
            quarter_turn_right(
                stack_frac(
                    1 - 1 / count,
                    stack_frac(
                        1 / (count - 1),
                        quarter_turn_right(
                            stackn(
                                count - 2,
                                turn_upside_down(rune))),
                                make_cross(rune)),
                    quarter_turn_right(
                        stackn(
                            count - 2,                                    
                            turn_upside_down(rune)))))),
        quarter_turn_right(
            stackn(
                count,
                quarter_turn_left(rune)))
        );
}

module.exports = {
    f: function(a,b){
            return persian(a,b);
        }
}

// Test
// show(persian(make_cross(rcross_bb), 5));
