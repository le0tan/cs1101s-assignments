function play_matrix(distance, list_of_sounds) {
    function helper(d, c) {
        function playc() {
            function iter(r) {
                if(r === 16) {
                
                } else if(list_ref(list_ref(get_matrix(), r), c)) {
                    play_concurrently(list_ref(list_of_sounds, r));
                    iter(r + 1);
                } else {
                    iter(r + 1);
                }
            }
            iter(0);
        }
       
        set_timeout(playc, d);
        helper(d+distance * 1000, (c + 1) % 16);
        
    }
    helper(0, 0);
}

function stop_matrix() {
    clear_all_timeout();
}

function pentatonic_scale(note, number_of_notes) {
    const ps = list(2, 4 - 2, 7 - 4, 9 - 7, 3);
    function helper(res, i, x) {
        if(i === number_of_notes) {
            return res;
        } else if(i === 0) {
            return helper(append(res,list(x)), i + 1, x);
        } else {
            const cur = x + list_ref(ps, (i - 1) % 5);
            return helper(append(res,list(cur)), i + 1, cur);
        }
    }
    return helper([], 0, note);
}

 const scales = pentatonic_scale(60, 16);
   const sounds = map(function (n) { return piano(n, 1); }, scales);
   play_matrix(0.5, sounds); 
