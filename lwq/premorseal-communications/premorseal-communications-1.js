// Task 1
function noise(duration) {
    const wave = t => t >= duration ? 0 : math_random() * 2 - 1;
    return make_sourcesound(wave, duration);
}

function play_sourcesound(sourcesound) {
    /* your anwser here */
    return play(sourcesound_to_sound(sourcesound));
}

play_sourcesound(noise(1));
