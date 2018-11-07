function exponential_decay(decay_time) {
    return function(t) {
        /* your answer here */
        const decay_const = math_log(2) / (decay_time / 4);
        return math_exp(-decay_const * t);
    };
}

// test
(exponential_decay(4))(1);
// the result should be 0.5