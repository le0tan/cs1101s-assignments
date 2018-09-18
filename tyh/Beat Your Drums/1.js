function snare_drum(note, duration) {
    /* your answer here */
    function noise(duration){
        const wave = x => math_random();
        const ss = make_sourcesound(wave, duration);
        return sourcesound_to_sound(ss);
    }
    return duration < 0.5
            ? adsr(0.005, duration - 0.005, 0, 0)(noise(duration))
            : adsr(0.005, 0.495, 0, 0)(noise(duration));
}

function bass_drum(note, duration) {
    /* your answer here */
    const add = (x,y) => (t => (x(t) + y(t)));
    const op = duration < 0.5
            ? adsr(0.005, duration - 0.005, 0, 0)
            : adsr(0.005, 0.495, 0, 0);
    
    const freq = list(67, 71, 73, 79, 83, 89, 91);
    const sine_lst = map(x => sine_sound(x, duration), freq);
    const sound = simultaneously(sine_lst);
    return op(sound);
}

function mute(note, duration) {
    /* your answer here */
    const wave = x => 0;
    const ss = make_sourcesound(wave, duration);
    return sourcesound_to_sound(ss);
}

// play(snare_drum(72, 2));
// play(bass_drum(60, 2));
play(consecutively(list(snare_drum(72, 2), mute(0, 1), bass_drum(60, 2))));