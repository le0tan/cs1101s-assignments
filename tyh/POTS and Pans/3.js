// Task 3
function get_dtmf_frequencies(number) {
    const dtmf = list(
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
    return list_ref(dtmf, number);
}

function make_dtmf_tone(frequency_pair) {
    // your solution goes here
    const sound1 = sine_sound(head(frequency_pair), 0.5);
    const sound2 = sine_sound(tail(frequency_pair), 0.5);
    return simultaneously(list(sound1, sound2));
}

function dial(list_of_digits) {
    // your solution goes here
    if(is_empty_list(list_of_digits)){
        return silence(0);
    } else {
        return consecutively(list(
            make_dtmf_tone(get_dtmf_frequencies(head(list_of_digits))),
            silence(0.1),
            dial(tail(list_of_digits))));
    }
}

// Test
play(dial(list(6,2,3,5,8,5,7,7)));