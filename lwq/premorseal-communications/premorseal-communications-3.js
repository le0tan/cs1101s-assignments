// Task 3
function sine_sound(frequency, duration) {
    /* your answer here */
    function sinwave(f) {
        return t => math_sin(2 * math_PI * f * t);
    }
    return sourcesound_to_sound(
        make_sourcesound(sinwave(frequency), duration));
}

//play(sine_sound(500, 1));
