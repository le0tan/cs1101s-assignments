function make_step_stream(n) {
    // Your answer here
    function helper(cur) {
        if(cur > n) {
            return helper(1);
        } else {
            return pair(cur, () => helper(cur + 1));
        }
    }
    return helper(1);
}

//Tests
 const stream_123 = make_step_stream(3);
 eval_stream(stream_123, 10);
