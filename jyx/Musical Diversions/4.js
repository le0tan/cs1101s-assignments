function adsr(attack_time, decay_time, sustain_level, release_time) {
    return function(sound) {
        const st = get_duration(sound_to_sourcesound(sound));
        const sw = get_wave(sound_to_sourcesound(sound));
        const sustain_time = st - attack_time - decay_time - release_time;
        const wave = t => t <= attack_time
                    ? 1 / attack_time * t *sw(t)
                    : t <= attack_time + decay_time
                      ? (exponential_decay(decay_time)(t - attack_time)
                        * (1 - sustain_level) + sustain_level) * sw(t)
                      : t <= attack_time + decay_time + sustain_time
                        ? sustain_level * sw(t)
                        : t <= st
                          ? exponential_decay(release_time)(
                                                t - attack_time - decay_time
                                                - sustain_time)
                            * sustain_level * sw(t)
                          : 0;
        
        return sourcesound_to_sound(make_sourcesound(wave, st));             
    };
}

function exponential_decay(decay_time) {
    return function(t) {
        return math_exp(-4*math_log(2)/decay_time*t);
    };
}

//const sample1 = (adsr(0, 0.2, 0.1, 0.5))(sine_sound(800, 1));
//const sample2 = (adsr(0.4, 0, 1, 0.8))(sine_sound(400, 2));
//const sample3 = (adsr(0.01, 0.5, 0.5, 0.5))(sine_sound(400, 2));
const sample4 = (adsr(0.6, 0.2, 0, 0))(sine_sound(800, 1));

 play(sample4);
