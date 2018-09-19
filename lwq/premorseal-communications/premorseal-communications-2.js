// Task 2
function noise(duration) {
    const wave = t => t >= duration ? 0 : math_random() * 2 - 1;
    return make_sourcesound(wave, duration);
}

function cut_sourcesound(sourcesound, duration) {
    /* your answer here */
    const wave = get_wave(sourcesound);
    return make_sourcesound(wave, duration);
}

// From Task 1
function play_sourcesound(sourcesound) {
    /* your anwser here */
    return play(sourcesound_to_sound(sourcesound));
}

const c = cut_sourcesound(noise(5), 0.5);
play_sourcesound(c);
