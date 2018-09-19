// Task 3
function dial(list_of_digits) {
    // your solution goes here
    function get_dtmf_frequencies(number) {
    // your solution goes here
        const sound_list = list(
            pair(941, 1336),
            pair(697, 1209),
            pair(697, 1336),
            pair(697, 1477),
            pair(770, 1209),
            pair(770, 1336),
            pair(770, 1477),
            pair(852, 1209),
            pair(852, 1336),
            pair(852, 1477),
            pair(941, 1209),
            pair(941, 1477),
            pair(697, 1633),
            pair(770, 1633),
            pair(852, 1633),
            pair(941, 1633));
        function find(n, ls) {
            if(n === 0) {
                return head(ls);
            } else {
                return find(n - 1, tail(ls));
            }
        }
        return find(number, sound_list);
    }
    function make_dtmf_tone(frequency_pair) {
    // your solution goes here
    return simultaneously(list(
        sine_sound(head(frequency_pair), 0.5),
        sine_sound(tail(frequency_pair), 0.5)));
    }
    function single_dial(number) {
        return consecutively(
            list(make_dtmf_tone(
                        get_dtmf_frequencies(number)),
                silence(0.1)));
    }
    function get_list(ls) {
            if(is_empty_list(ls)) {
                return [];
            } else {
                return pair(single_dial(head(ls)), 
                       get_list(tail(ls)));
            }
        }
    return consecutively(get_list(list_of_digits));
}

// Test
play(dial(list(6,2,3,5,8,5,7,7)));
//dial(list(6,2,3,5,8,5,7,7));
//list(6,2,3,5,8,5,7,7);
//get_list(list_of_digits);
