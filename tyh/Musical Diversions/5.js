function stacking_adsr(waveform, base_frequency, duration, list_of_envelope) {
    /* your answer here */
    
    function helper(lst, n) {
        if (is_empty_list(lst)) {
            return lst;
        } else {
            return pair(pair(n, head(lst)), helper(tail(lst), n + 1));
        }
    }

    return simultaneously(
        accumulate((x, y) => pair((tail(x))(waveform(base_frequency * head(x), duration)), y)
                    , []
                    , helper(list_of_envelope, 1)));
}

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
                                : sustain_level 
                                    * exponential_decay(release_time)(t-t3);
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

// const sample_bell = stacking_adsr(square_sound, 500, 2,
//                                   list(adsr(0, 1.2, 0, 0),
//                                         adsr(0, 1.3236, 0, 0),
//                                         adsr(0, 1.5236, 0, 0),
//                                         adsr(0, 1.8142, 0, 0)));

// const sample_trombone = stacking_adsr(square_sound, 250, 2,
//                                     list(adsr(0.4, 0, 1, 0.2),
//                                         adsr(0.6472, 1.2, 0, 0)));

const sample_piano = stacking_adsr(triangle_sound, 250, 2,
                                    list(adsr(0, 1.03, 0, 0),
                                        adsr(0, 0.64, 0, 0),
                                        adsr(0, 0.4, 0, 0)));

// const sample_violin = stacking_adsr(sawtooth_sound, 500, 2,
//                                    list(adsr(0.7, 0, 1, 0.3),
//                                         adsr(0.7, 0, 1, 0.3),
//                                         adsr(0.9, 0, 1, 0.3),
//                                         adsr(0.9, 0, 1, 0.3)));

// const sample_cello = stacking_adsr(square_sound, 80, 2,
//                                 list(adsr(0.1, 0, 1, 0.2),
//                                      adsr(0.1, 0, 1, 0.3),
//                                      adsr(0, 0, 0.2, 0.3)));
play(sample_piano);