// Task 3
function sine_sound(frequency, duration) {
    /* your answer here */
    const wave = x => x <= duration 
                        ? math_sin(2 * math_PI * frequency * x)
                        : 0;
    return sourcesound_to_sound(make_sourcesound(wave, duration));
}

play(sine_sound(500, 1));