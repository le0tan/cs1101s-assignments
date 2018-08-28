function improved_foo(n) {
    // your answer here
    function improved_foo_i(n, sum) {
        return (n === 1) ? sum + 1
                         : improved_foo_i(n - 1, sum + (n + 1) * n / 2);
    }
    return improved_foo_i(n, 0);
}

