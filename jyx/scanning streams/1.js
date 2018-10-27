//Task 1

function stream_starts_with(stream_1, stream_2) {
    if(is_empty_list(stream_2)) {
        return true;
    } else if(is_empty_list(stream_1)) {
        return false;
    } else {
        const h1 = head(stream_1);
        const h2 = head(stream_2);
        if(h1 === h2) {
            return stream_starts_with(stream_tail(stream_1),
                                      stream_tail(stream_2));
        } else {
            return false;
        }
    }
}

