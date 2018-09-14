// Task 2
function noise(duration) {
    const wave = t => t >= duration ? 0 : math_random() * 2 - 1;
    return make_sourcesound(wave, duration);
}

function cut_sourcesound(sourcesound, duration) {
    /* your answer here */
    return make_sourcesound(get_wave(sourcesound), duration);
}

// From Task 1
function play_sourcesound(sourcesound) {
    /* your anwser here */
    play(sourcesound_to_sound(sourcesound));
    return undefined;
}

const c = cut_sourcesound(noise(5), 0.5);
play_sourcesound(c);