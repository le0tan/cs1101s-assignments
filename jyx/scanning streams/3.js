function make_park_miller(n) {
  // Your solution here
    function helper(x, n) {
        if(n === 0) {
            return [];
        } else {
            return pair(x, () => helper((x * 10) % 17, n - 1));
        }
    }
    return helper(10, n);
}
function stream_starts_with(stream_1, stream_2) {
    // Your answer from previous task
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

function stream_contains(stream, sub_stream) {
  // Your answer here
    function helper(stream) {
        if(is_empty_list(stream)) {
            return false;
        } else if(stream_starts_with(stream, sub_stream)) {
            return true;
        } else {
            return helper(stream_tail(stream));
        }
    }
    if(is_empty_list(sub_stream)) {
        return true;
    } else {
        return helper(stream);
    }
}
stream_contains(make_park_miller(50), list_to_stream(list(4, 6, 9, 5)));
