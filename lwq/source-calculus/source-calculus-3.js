// Task 3
function make_flexible_step_stream(lst) {
    // Your answer here
    function make_step_stream(n) {
        function helper(x) {
            const s = list_ref(lst, x - 1);
            if (x >= n) {
                return pair(s, () => make_step_stream(n));
            } else {
                return pair(s, () => helper(x + 1));
            }
        }
        return helper(1);
    }
    return make_step_stream(length(lst));
}

function make_flexible_oscillating_stream(lst) {
    // Your answer here
    function make_oscillating_stream(n) {
        // Your answer here
        function helper1(x) {
            const s = list_ref(lst, x - 1);
            if (x >= n) {
                return pair(s, () => helper2(n - 1));
            } else {
                return pair(s, () => helper1(x + 1));
            }
        }
        function helper2(x) {
            const s = list_ref(lst, x - 1);
            if (x <= 1) {
                return pair(list_ref(lst, 0), () => helper1(x + 1));
            } else {
                return pair(s, () => helper2(x - 1));
            }
        }
        return helper1(1);
    }
    return make_oscillating_stream(length(lst));
}