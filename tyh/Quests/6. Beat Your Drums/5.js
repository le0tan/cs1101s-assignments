/* Add any previously defined functions that you find useful below this line */
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


function simplify_rhythm(rhythm) {
    /* your answer here */
    function append_n(h, t, n){
        return n <= 0
                ? h
                : append_n(append(h,t), t, n-1);
    }
    
    if(is_empty_list(rhythm)){
        return [];
    } else {
        if(is_list(rhythm)){
            return append(simplify_rhythm(head(rhythm)),
                          simplify_rhythm(tail(rhythm)));
        } else {
            if(is_pair(rhythm)){
                const h = simplify_rhythm(head(rhythm));
                return append_n(h, h, tail(rhythm) - 1);    
            } else {
                return list(rhythm);
            }
        }
    }
}
/* Add any previously defined functions that you find useful above this line */

function percussions(duration, list_of_sounds, rhythm) {
    // your answer here
    const my_mute = mute("C4", 2);
    const l_o_s = pair(my_mute, list_of_sounds);
    const r = simplify_rhythm(rhythm);
    
    function decode(n){
        function decode_helper(num, ans, twos){
            if(num <= 0){
                return ans;
            } else {
                return decode_helper(math_trunc(num / 2), 
                                    (num % 2 === 0) 
                                        ? ans 
                                        : append(ans, list(twos)),
                                    twos + 1);
            }
        }
        return decode_helper(n, [], 1);
    }

    function h(ans, lst, start){
        if(is_empty_list(lst)){
            return ans;
        } else {
            const sounds = map(x => list_ref(l_o_s, x), decode(head(lst)));
            const simu = simultaneously(sounds);
            const addi = consecutively(list(silence(start), simu));
            return h(simultaneously(list(ans, addi)), tail(lst), start + duration);
        }
    }
    
    return h(silence(0), r, 0);
}

// test

const my_snare_drum = snare_drum(70, 2);
const my_bass_drum = bass_drum(80, 2);
const my_bell = bell(72, 2);
play(percussions(0.5, list(my_snare_drum, my_bass_drum, my_bell), list(1,2,1,4,3,5,6)));
