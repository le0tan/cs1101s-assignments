function is_prefix_of(sub, seq) {
    if(is_empty_list(sub)) {
        return true;
    } else if(is_empty_list(seq)) {
        return false;
    } else if(head(sub) === head(seq)) {
        return is_prefix_of(tail(sub), tail(seq));
    } else {
        return false;
    }
}
function tail_n_times(xs, n) {
    if(n === 0) {
        return xs;
    } else {
        return tail_n_times(tail(xs), n - 1);
    }
}
function sublist_replace(new_sub, old_sub, seq) {
    function helper(seq, res) {
        if(is_empty_list(seq)) {
            return res;
        } else if(is_prefix_of(old_sub, seq)) {
            return helper(tail_n_times(seq, length(old_sub)),
                            append(res, new_sub));
        } else {
            return helper(tail(seq), append(res, list(head(seq))));
        }
    }
    return helper(seq, []);
}
