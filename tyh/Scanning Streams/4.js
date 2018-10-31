//Task 4

function make_substrings(lst) {
    // Your solution here
    function h(xs){
        if(is_empty_list(xs)){
            return stream();
        } else {
            const cur = h(tail(xs));
            const prep = stream_append(stream(''), cur);
            const hd = head(xs);
            const res = stream_map(x=>hd+x, prep);
            return stream_append(res, cur);
        }    
    }
    return pair("", () => h(lst));
}

// make_substrings(list('a','b','c'));
eval_stream(make_substrings(list('a','b','c')),7);