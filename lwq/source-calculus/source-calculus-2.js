// Task 2
function make_oscillating_stream(n) {
    // Your answer here
    function helper1(x) {
        if (x >= n) {
            return pair(n, () => helper2(n - 1));
        } else {
            return pair(x, () => helper1(x + 1));
        }
    }
    function helper2(x) {
        if (x <= 1) {
            return pair(1, () => helper1(x + 1));
        } else {
            return pair(x, () => helper2(x - 1));
        }
    }
    return helper1(1);
}
