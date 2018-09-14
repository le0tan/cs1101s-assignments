
function improved_foo(n) {
    function imp_foo(n, sum) {
        return n === 0
               ? sum
               : imp_foo(n - 1, sum + n * (n + 1) / 2);
    }
    return imp_foo(n, 0);
}



improved_foo(20);
