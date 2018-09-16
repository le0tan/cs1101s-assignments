// Task 4
function dial_all(list_of_numbers) {
    const DV = list(1,8,0,0,5,2,1,1,9,8,0);
    const s = make_dtmf_tone(get_dtmf_frequencies(11));
    const end = sourcesound_to_sound(make_sourcesound(t => 0, 0));
    function pred(lst) {
        return !equal(lst, DV);
    }
    function op(x, y) {
        return consecutively(list(x, s, silence(0.1), y));
    }
    return accumulate(op, end, map(dial,
                              filter(pred, list_of_numbers)));
}
function dial(list_of_digits) {
    const init = sourcesound_to_sound(make_sourcesound(t=>0, 0));
    function helper(res, lst) {
        if(is_empty_list(lst)) {
            return res;
        } else {
            const cur = make_dtmf_tone(get_dtmf_frequencies(head(lst)));
            return helper(consecutively(list(res, cur, silence(0.1))), 
                          tail(lst));
        }
    }
    return helper(init, list_of_digits);
}

function get_dtmf_frequencies(number) {
    const lst = list(pair(941, 1336),
                     pair(697, 1209), pair(697, 1336), pair(697, 1477),
                     pair(770, 1209), pair(770, 1336), pair(770, 1477),
                     pair(852, 1209), pair(852, 1336), pair(852, 1477),
                     pair(941, 1209), pair(941, 1477),
                     pair(697, 1633), pair(770, 1633), pair(852, 1633),
                     pair(941, 1633));
    function fnd(x, items) {
        if(x === 0) {
            return head(items);
        } else {
            return fnd(x - 1, tail(items));
        }
    }
    return fnd(number, lst);
}
function make_dtmf_tone(frequency_pair) {
    // your solution goes here
    const s1 = sine_sound(head(frequency_pair), 0.5);
    const s2 = sine_sound(tail(frequency_pair), 0.5);
    return simultaneously(list(s1, s2));
}

// Test
play(dial_all(
     list(
        list(1,8,0,0,5,2,1,1,9,8,0),
        list(6,2,3,5,8,5,7,7),
        list(0,0,8,6,1,3,7,7,0,9,5,0,0,6,1))
  ));
