// Task 4
function silence(dur){
    const wave = x => 0;
    const ss = make_sourcesound(wave, dur);
    return sourcesound_to_sound(ss);
}

function consecutively(list_of_sounds) {
    /* your answer here */
    if(is_empty_list(list_of_sounds)){
        return silence(0);
    } else {
        const cur = sound_to_sourcesound(head(list_of_sounds));
        const next = sound_to_sourcesound(consecutively(tail(list_of_sounds)));
        const dur_cur = get_duration(cur);
        return sourcesound_to_sound(
                make_sourcesound(t => t <= dur_cur
                                        ? (get_wave(cur))(t)
                                        : (get_wave(next))(t - dur_cur),
                                dur_cur + get_duration(next)));
    }
}

function sine_sound(frequency, duration) {
    /* your answer here */
    const wave = x => x <= duration 
                        ? math_sin(2 * math_PI * frequency * x)
                        : 0;
    return sourcesound_to_sound(make_sourcesound(wave, duration));
}

// Create dot, dash and pause sounds first
const dot_sound = sine_sound(750, 0.1);
const dash_sound = sine_sound(750, 0.3);
const dot_pause = silence(0.1);
const dash_pause = silence(0.3);

// Create sounds for each letter
const S_sound = consecutively(
    list(dot_sound,dot_pause,dot_sound,dot_pause,dot_sound));
const O_sound = consecutively(
    list(dash_sound,dot_pause,dash_sound,dot_pause,dash_sound));
// Build the signal out of letter sounds and pauses
const distress_signal = consecutively(
    list(S_sound, dash_pause, O_sound, dash_pause, S_sound));

// Play distress signal
// play(distress_signal);