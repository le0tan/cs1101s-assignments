// Task 3
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
 play(dial(list(6,2,3,5,8,5,7,7)));
