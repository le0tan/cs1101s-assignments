// Task 3
function sine_sound(frequency, duration) {
    /* your answer here */
    const wave = t => t >= duration 
                      ? 0 
                      : math_sin(2 * math_PI * frequency * t);
    return sourcesound_to_sound(make_sourcesound(wave, duration));
}

play(sine_sound(500, 1));
