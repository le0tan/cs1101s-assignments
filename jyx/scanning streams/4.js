//Task 4

function make_substrings(lst) {
  // Your solution here
    function helper(lst){
        if(is_empty_list(lst)) {
            return [];
        } else {
            const cur = head(lst);
            const t = helper(tail(lst));
            return pair(cur, () => stream_append(stream_map(x=>cur+x,t),
                                                 t));
        }
    }
    return pair("", () => helper(lst));
}


