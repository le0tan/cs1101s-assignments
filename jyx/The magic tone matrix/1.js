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

// test
 const sample = pentatonic_scale(60, 10);

play(consecutively(map(function (note) {
   return trombone(note, 0.5);
}, sample)));
