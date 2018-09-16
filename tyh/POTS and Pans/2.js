// Task 2
function make_dtmf_tone(frequency_pair) {
    // your solution goes here
    const sound1 = sine_sound(head(frequency_pair), 0.5);
    const sound2 = sine_sound(tail(frequency_pair), 0.5);
    return simultaneously(list(sound1, sound2));
}

play(make_dtmf_tone(pair(440,660)));