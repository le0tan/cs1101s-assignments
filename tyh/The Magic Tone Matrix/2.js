function pentatonic_scale(note, number_of_notes) {
    /* your answer here */
    const gap = list(2,2,3,2,3);
    function helper(ans, pos, last, num){
        if(num <= 0){
            return ans;
        } else {
            const cur = last + list_ref(gap, pos);
            return helper(append(ans, list(cur)),
                          (pos + 1) % 5,
                          cur,
                          num - 1);
        }
    }
    return helper(list(note), 0, note, number_of_notes - 1);
}

function play_matrix(distance, list_of_sounds) {
    /* your answer here */
    function is_filled(my_row, my_col){
        return list_ref(list_ref(get_matrix(), my_row), my_col);
    }
    const st = enum_list(0,15);
    
    function helper_(row){
        const to_be_played = filter(x => is_filled(x, row), st);
        // display(to_be_played);
        const sounds = map(x => list_ref(list_of_sounds, x), to_be_played);
        play_concurrently(simultaneously(sounds));
        function g(){
            // display('ko');
            return helper_((row+1)%16);
        }
        return set_timeout(g,distance*1000);
    }
    return helper_(0);
}

function stop_matrix() {
    /* your answer here */
    return clear_all_timeout();
}

const scales = pentatonic_scale(60, 16);
const sounds = map(function (n) { return piano(n, 1); }, scales);
play_matrix(0.5, sounds);