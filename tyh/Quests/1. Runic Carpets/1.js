require('../../rune-library');
const wgr = require('../../webGLrune')

function beside_frac(pic1, pic2, n){
    return quarter_turn_right(
        stack_frac(
        1-n,
        quarter_turn_left(pic2),
        quarter_turn_left(pic1)));
}

function besiden(n, rune){
    return quarter_turn_left(
        stackn(n,quarter_turn_right(rune)));
}

function persian(rune, count) {
    //1/count; (1-2/count)/2
    //1/(count-1)
    //1/count
    return stack_frac(1-1/count,
                      stack_frac(1/(count-1),
                                 besiden(count,rune),
                                 beside(
                                 beside_frac(stackn(count - 2,rune),
                                             stack(quarter_turn_right(rune),
                                                   rune),
                                             2 / count),
                                 beside_frac(stack(quarter_turn_right(
                                                   quarter_turn_right(rune)),
                                                   quarter_turn_left(rune)),
                                             stackn(count - 2,rune),
                                             1 - 2 / count))),
                      besiden(count,rune));
}

module.exports = {
    f: function(a,b){
            return persian(a,b);
        }
}

console.log(wgr.show(persian(heart_bb, 9)));

// Test
// show(persian(nova_bb, 9));

// console.log(__are_pictures_equal(nova_bb,heart_bb));