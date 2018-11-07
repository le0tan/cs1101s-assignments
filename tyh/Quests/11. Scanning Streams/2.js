//Task 2

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

stream_contains(stream(2,1,2,3,4), stream(1,2,3,4));
// stream_starts_with(stream(1,2,3,4),stream(1,2,3,4));