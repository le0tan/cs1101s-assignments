// Task 2
function make_dtmf_tone(frequency_pair) {
    // your solution goes here
    const s1 = sine_sound(head(frequency_pair), 0.5);
    const s2 = sine_sound(tail(frequency_pair), 0.5);
    return simultaneously(list(s1, s2));
}
