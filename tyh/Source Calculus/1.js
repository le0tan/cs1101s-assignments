//Task 1
function make_step_stream(n) {
    // Your answer here
    function helper(k){
        if(k>n){
            return helper(1);
        } else {
            return pair(k, () => helper(k+1));
        }
    }
    return helper(1);
}

//Tests
const stream_123 = make_step_stream(3);
eval_stream(stream_123, 10);