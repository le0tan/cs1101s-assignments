// Task 2
function make_oscillating_stream(n) {
  // Your answer here
    function helper(x, d) {
        if(x > n) {
            return helper(x - 2, -1);
        } else if(d === -1 && x < 2) {
            return helper(1, 1);
        } else {
            return pair(x, () => helper(x + d, d));
        }
    }
    return helper(1, 1);
}
const osc_stream_123 = make_oscillating_stream(3);
eval_stream(osc_stream_123, 20);
