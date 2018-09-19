// Task 2
function make_dtmf_tone(frequency_pair) {
    // your solution goes here
    return simultaneously(list(
        sine_sound(head(frequency_pair), 0.5),
        sine_sound(tail(frequency_pair), 0.5)));
}

play(make_dtmf_tone(pair(440, 600)));
