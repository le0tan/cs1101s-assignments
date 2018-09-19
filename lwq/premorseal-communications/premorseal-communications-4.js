// Task 4
function consecutively(list_of_sounds) {
    /* your answer here */
    function add_ss(s1, s2) {
        const ss1 = sound_to_sourcesound(s1);
        const ss2 = sound_to_sourcesound(s2);
        const d1 = get_duration(ss1);
        const d2 = get_duration(ss2);
        function new_wave() {
            return t => (t < d1) 
                   ? (get_wave(ss1))(t)
                   : (get_wave(ss2))(t - d1);
        }
        return make_sourcesound(new_wave(), d1 + d2);
    }
    if(is_empty_list(list_of_sounds)) {
        return [];
    } else {
        if(is_empty_list(tail(list_of_sounds))) {
            return head(list_of_sounds);
        } else {
            return sourcesound_to_sound(
                add_ss(head(list_of_sounds), 
                consecutively(tail(list_of_sounds))));
        }
    }
}
function silent(d) {
    return sourcesound_to_sound(
        make_sourcesound(t => t * 0, d));
}
function sine_sound(frequency, duration) {
    /* your answer here */
    function sinwave(f) {
        return t => math_sin(2 * math_PI * f * t);
    }
    return sourcesound_to_sound(
        make_sourcesound(sinwave(frequency), duration));
}
// Create dot, dash and pause sounds first
const dot_sound = sine_sound(750, 0.1);
const dash_sound = sine_sound(750, 0.3);
const dot_pause = silent(0.1);
const dash_pause = silent(0.3);

// Create sounds for each letter
const S_sound = consecutively(list(
    dot_sound, dot_pause, dot_sound, dot_pause, dot_sound, dash_pause));
const O_sound = consecutively(list(
    dash_sound, dot_pause, dash_sound, dot_pause, dash_sound, dash_pause));

// Build the signal out of letter sounds and pauses
const distress_signal = consecutively(list(
    S_sound, O_sound, S_sound));

// Play distress signal
play(distress_signal);
