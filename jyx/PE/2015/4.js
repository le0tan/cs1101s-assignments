function is_subseq_at(sub, seq, start_pos) {
    let flag = true;
    const n = array_length(seq);
    let i = 0;
    for(let i = 0; i < array_length(sub); i = i + 1) {
        if(start_pos + i > n) {
            flag = false;
            break;
        } else if(sub[i] !== seq[start_pos+i]) {
            flag = false;
            break;
        } else {}
    }
    return flag;
}
function subarray_replace(new_sub, old_sub, seq) {
    const len = array_length(seq);
    const sub_len = array_length(old_sub);
    let i = 0;
    while(i < len) {
        if(is_subseq_at(old_sub, seq, i)) {
            let j = i + sub_len;
            while(i < j) {
                seq[i] = new_sub[i - (j - sub_len)];
                i = i + 1;
            }
        } else {
            i = i + 1;
        }
    }
}
