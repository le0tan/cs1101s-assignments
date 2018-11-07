function check_parentheses(xs) {
    function helper(xs, s) {
        if(is_empty_list(xs)) {
            return s === 0;
        } else if(s < 0) {
            return false;
        } else {
            const cur = head(xs);
            if(cur === "(") {
                return helper(tail(xs), s + 1);
            } else {
                return helper(tail(xs), s - 1);
            }
        }
    }
    return helper(xs, 0);
}
