// paste your snare_drum, bass_drum and mute from task 1 here
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

function mute(note, duration) {
    /* your answer here */
    const wave = x => 0;
    const ss = make_sourcesound(wave, duration);
    return sourcesound_to_sound(ss);
}

function simple_percussions(distance, list_of_sounds, rhythm) {
    /* your answer here */
    const my_mute = mute("C4", 2);
    const l_o_s = pair(my_mute, list_of_sounds);
    const r = simplify_rhythm(rhythm);
    
    function h(ans, lst, start){
        if(is_empty_list(lst)){
            return ans;
        } else {
            const addi = consecutively(list(silence(start), 
                            list_ref(l_o_s, head(lst))));
            return h(simultaneously(list(ans, addi)), tail(lst), start + distance);
        }
    }
    
    return h(silence(0), r, 0);
    
    /* Another approach
    function add_to_wave(tar, addi, start, duration){
        return t => (t >= start && t <= start + duration)
                        ? tar(t) + addi(t - start)
                        : tar(t);
    }
    // ans is a wave
    function helper(ans, lst, start, end){
        if(is_empty_list(lst)){
            return pair(end, ans);
        } else {
            const cur_sound = list_ref(l_o_s, head(lst));
            const cur_ss = sound_to_sourcesound(cur_sound);
            const cur_wave = get_wave(cur_ss);
            const cur_drt = get_duration(cur_ss);
            return helper(add_to_wave(ans, cur_wave, start, cur_drt),
                          tail(lst),
                          start + distance,
                          start + cur_drt);
        }
    }
    const res = helper(x=>0, r, 0, 0);
    const len = head(res);
    const wave = tail(res);
    return sourcesound_to_sound(make_sourcesound(wave, len));
    */
}


// test

const my_snare_drum = snare_drum(70, 2);
const my_bass_drum = bass_drum(80, 2);
const my_bell = bell(72, 2);
play(simple_percussions(0.5, list(my_snare_drum, my_bass_drum, my_bell), list(1,2,1,0,3,1,0)));
