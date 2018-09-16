// Task 4
function consecutively(list_of_sounds) {
    const end = make_sourcesound(t=>0, 0);
    function helper(lst, res) {
        if(is_empty_list(lst)) {
            return res;
        } else {
            
            const cur = sound_to_sourcesound(head(lst));
            const cur_d = get_duration(cur);
            const cur_w = get_wave(cur);
            const res_w = get_wave(res);
            const res_d = get_duration(res);
            const wave = t => t < res_d
                              ? res_w(t)
                              : cur_w(t - res_d);
            return helper(tail(lst), 
                          make_sourcesound(wave, cur_d + res_d));
        }
    }
    return sourcesound_to_sound(helper(list_of_sounds, end));
}
function sine_sound(frequency, duration) {
    const wave = t => t >= duration 
                      ? 0 
                      : math_sin(2 * math_PI * frequency * t);
    return sourcesound_to_sound(make_sourcesound(wave, duration));
}
function pause(duration) {
    return sourcesound_to_sound(make_sourcesound(t => 0, duration));
}
const f = 750;
// Create dot, dash and pause sounds first
const dot_sound = sine_sound(f, 0.1);
const dash_sound = sine_sound(f, 0.3);
const dot_pause = pause(0.1);
const dash_pause = pause(0.3);

// Create sounds for each letter
const S_sound = consecutively(list(dot_sound, dot_pause, 
                              dot_sound, dot_pause, dot_sound));
const O_sound = consecutively(list(dash_sound, dot_pause, 
                              dash_sound, dot_pause, dash_sound));

// Build the signal out of letter sounds and pauses
const distress_signal = consecutively(list(S_sound, dash_pause, 
                                      O_sound, dash_pause, 
                                      S_sound));

// Play distress signal
play(distress_signal);
