function stacking_adsr(waveform, base_frequency, duration, list_of_envelope) {
    function mp(f, items) {
        if(is_empty_list(items)) {
            return [];
        } else {
            const cur = head(list_of_envelope);
            return pair((cur)(waveform(f, duration)), mp(f+base_frequency, 
                                                        tail(items)));
        }
    }
    return simultaneously(mp(base_frequency, list_of_envelope));
}

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

/* const sample_bell = stacking_adsr(square_sound, 500, 2,
                                   list(adsr(0, 1.2, 0, 0),
                                        adsr(0, 1.3236, 0, 0),
                                        adsr(0, 1.5236, 0, 0),
                                        adsr(0, 1.8142, 0, 0)));*/

 const sample_trombone = stacking_adsr(square_sound, 250, 2,
                                    list(adsr(0.4, 0, 1, 0.2),
                                         adsr(0.6472, 1.2, 0, 0)));

/* const sample_piano = stacking_adsr(triangle_sound, 250, 2,
                                    list(adsr(0, 1.03, 0, 0),
                                         adsr(0, 0.64, 0, 0),
                                         adsr(0, 0.4, 0, 0)));*/

 /*const sample_violin = stacking_adsr(sawtooth_sound, 500, 2,
                                    list(adsr(0.7, 0, 1, 0.3),
                                         adsr(0.7, 0, 1, 0.3),
                                         adsr(0.9, 0, 1, 0.3),
                                         adsr(0.9, 0, 1, 0.3)));*/

 /*const sample_cello = stacking_adsr(square_sound, 80, 2,
                                 list(adsr(0.1, 0, 1, 0.2),
                                      adsr(0.1, 0, 1, 0.3),
                                      adsr(0, 0, 0.2, 0.3)));*/
 play(sample_trombone);
