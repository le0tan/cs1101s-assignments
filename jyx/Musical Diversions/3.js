function exponential_decay(decay_time) {
    return function(t) {
        return math_exp(-4*math_log(2)/decay_time*t);
    };
}

// test
 (exponential_decay(4))(1);
// the result should be 0.5
