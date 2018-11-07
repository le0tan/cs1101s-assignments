function list_to_inf_stream(xs){
    function helper(cur){
        if(is_empty_list(cur)){
            return helper(xs);
        } else {
            return pair(head(cur), () => helper(tail(cur)));
        }
    }
    if(is_empty_list(xs)){
        return [];
    } else {
        return helper(xs);
    }
}

function partial_sums(s){
    function helper(m, xs){
        if(is_empty_list(xs)){
            return [];
        } else {
            return pair(m, () => helper(m+head(xs), stream_tail(xs)));
        }
    }
    return helper(0, s);
}


function pi(sign, m){
    return pair(1/(sign*m), () => pi(-sign, m+2));
}