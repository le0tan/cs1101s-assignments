function stream_starts_with(stream_1, stream_2) {
    if(is_empty_list(stream_2)){
        return true;
    } else if(is_empty_list(stream_1)){
        return false;
    } else {
        if(head(stream_1) === head(stream_2)){
            return stream_starts_with(stream_tail(stream_1), stream_tail(stream_2));
        } else {
            return false;
        }
    }
}

function stream_contains(stream, sub_stream) {
    // Your answer here
    if(is_empty_list(sub_stream)){
        return true;
    } else if(is_empty_list(stream)){
        return false;
    } else if(!stream_starts_with(stream, sub_stream)){
        return stream_contains(stream_tail(stream), sub_stream);
    } else {
        return true;
    }
}

function make_park_miller(n) {
    // Your solution here
    function h(last, k){
        if(k > n){
            return [];
        } else {
            const res = (10*last) % 17;
            return pair(last, () => h(res, k+1));
        }
    }
    return h(10, 0);
}
// display(eval_stream(make_park_miller(50),50));
stream_contains(make_park_miller(50), list_to_stream(list(4, 6, 9, 5)));