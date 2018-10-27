// Task 4
function interleave(stream1, stream2) {
  // Your answer here
    if(is_empty_list(stream1)) {
        return stream2;
    } else if(is_empty_list(stream2)) {
        return stream1;
    } else {
        return pair(head(stream1), 
                    () => interleave(stream2, stream_tail(stream1)));
    }
}

