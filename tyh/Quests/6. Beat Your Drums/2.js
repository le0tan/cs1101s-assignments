// paste your snare_drum from task 1 here
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

function combine_instruments(list_of_instrument) {
    // your answer here
    // function ensemble(list_of_sound, duration){
    //     const add = (f,g) => (t => f(t) + g(t));
    //     //helper returns a wave thet ensembles all the sound
    //     function helper(lst, ans){
    //         if(is_empty_list(lst)){
    //             //this is not necessary, just in case helper
    //             //receives an [] at the very beginning
    //             return ans;
    //         } else {
    //             if(!is_pair(lst)){
    //                 const ss = sound_to_sourcesound(lst);
    //                 const wv = get_wave(ss);
    //                 return add(ans, wv);
    //             } else {
    //                 const ss = sound_to_sourcesound(head(lst));
    //                 const wv = get_wave(ss);
    //                 return helper(tail(lst), add(ans, wv));
    //             }
    //         }
    //     }
    //     const wave = helper(list_of_sound, x => 0);
    //     const ss = make_sourcesound(wave, duration);
    //     return sourcesound_to_sound(ss);
    // }
    // return (note, duration) => ensemble(
    //                             map(x => (x)(note, duration), 
    //                             list_of_instrument), duration);
    return (note, duration) => simultaneously(
        map(x => (x)(note, duration), list_of_instrument));
}

// test

const snare_drum_and_bell = combine_instruments(list(snare_drum, bell));
play(snare_drum_and_bell(500, 1));