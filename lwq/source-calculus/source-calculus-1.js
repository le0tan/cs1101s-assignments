//Task 1
function make_step_stream(n) {
    // Your answer here
    function helper(x) {
        if (x >= n) {
            return pair(x, () => make_step_stream(n));
        } else {
            return pair(x, () => helper(x + 1));
        }
    }
    return helper(1);
}

//Tests
// const stream_123 = make_step_stream(3);
// eval_stream(stream_123, 10);