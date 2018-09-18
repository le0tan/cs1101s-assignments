function adsr(attack_time, decay_time, sustain_level, release_time) {
    return function(sound) {
        const ss = sound_to_sourcesound(sound);
        const wave = get_wave(ss);
        const drt = get_duration(ss);
        const sustain_time = drt - attack_time - decay_time - release_time;
        const t3 = attack_time + decay_time + sustain_time;
        const adsr_control =  
                t => t <= attack_time
                        ? t / attack_time
                        : t <= attack_time + decay_time
                            ? exponential_decay(decay_time)(t-attack_time)
                                * (1-sustain_level)+sustain_level
                            : t <= attack_time + decay_time + sustain_time
                                ? sustain_level
                                : t <= drt
                                    ? sustain_level * exponential_decay(release_time)(t - t3)
                                    : 0;
        const new_wave = t => wave(t) * adsr_control(t);
        return sourcesound_to_sound(make_sourcesound(new_wave, drt));
    };
}

function exponential_decay(decay_time) {
    return function(t) {
        /* your answer here */
        const decay_const = math_log(2) / (decay_time / 4);
        return math_exp(-decay_const * t);
    };
}

const sample1 = (adsr(0, 0.2, 0.1, 0.5))(sine_sound(800, 1));
const sample2 = (adsr(0.4, 0, 1, 0.8))(sine_sound(400, 2));
const sample3 = (adsr(0.01, 0.5, 0.5, 0.5))(sine_sound(400, 2));
const sample4 = (adsr(0.6, 0.2, 0, 0))(sine_sound(800, 1));

// play(sample3);