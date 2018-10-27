//Task 1

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

stream_starts_with(stream(1,2,3),stream(1,2));