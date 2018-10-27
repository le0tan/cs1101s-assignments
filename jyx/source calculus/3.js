// Task 3
function make_flexible_step_stream(lst) {
 // Your answer here
    function helper(xs) {
        if(is_empty_list(xs)) {
            return helper(lst);
        } else {
            return pair(head(xs), () => helper(tail(xs)));
        }
    }
    if(is_empty_list(lst)) {
        return [];
    } else {
        return helper(lst);
    }
}

function make_flexible_oscillating_stream(lst) {
  // Your answer here
    let r = lst;
    function helper(xs, d) {
        if(is_empty_list(xs)) {
            if(d > 0) {
                return helper(r, -1);
            } else {
                return helper(lst, 1);
            }
        } else {
            return pair(head(xs), () => helper(tail(xs), d));
        }
    }
    if(is_empty_list(lst)) {
        return [];
    } else {
        r = tail(r);
        if(!is_empty_list(r)) {
            r = reverse(r);
            r = tail(r);
        } else{}
    }
    return helper(lst, 1);
}

