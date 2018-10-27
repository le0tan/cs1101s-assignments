//Task 4

function make_substrings(lst) {
    // Your solution here
    // display(lst);
    if(is_empty_list(lst)){
        return stream();
    } else {
        const cur = make_substrings(tail(lst));
        const prep = stream_append(stream(''), cur);
        const h = head(lst);
        const res = stream_map(x=>h+x, prep);
        return stream_append(res, cur);
    }
}

// make_substrings(list('a','b','c'));
eval_stream(make_substrings(list('a','b','c')),7);