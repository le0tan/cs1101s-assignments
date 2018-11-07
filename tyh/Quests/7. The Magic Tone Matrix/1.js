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

// test
const sample = pentatonic_scale(60, 10);
play(consecutively(map(function (note) {
  return trombone(note, 0.5);
}, sample)));