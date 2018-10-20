// Your code will be tested against 8 private test cases
// You will get 1 mark for each test passed.
/* 
   Bounds:
   lst is sorted in ascending order.
   lst is at most length 30.
   numbers in lst are non-negative numbers at most 500.
*/

// Function that takes a list of denominations and returns if the
// greedy algorithm can be used to generate the correct number of
// coins, given any target amount of money.
function greedy_is_possible(lst) {
    
  // your solution here
    let f = [];
    let g = [];
    let d = [];
    const n = length(lst);
    for(let i = 0; i < n; i = i + 1) {
        d[i] = head(lst);
        lst = tail(lst);
    }
    if(n <= 1) {
        return true;
    } else {}
    let amount = d[n - 1] + d[n - 2]; 
    for(let i = 0; i <= amount; i = i + 1) {
        f[i] = -1;
        g[i] = -1;
    }
    f[0] = 0;
    g[0] = 0;
    let ok = true;
    for(let i = 1; i <= amount; i = i + 1) {
        let min = -1; 
        for(let j = 0; j < n; j = j + 1) {
            if(i >= d[j] && f[i - d[j]] !== -1 
                && (f[i - d[j]] < min || min === -1)) {
                min = f[i - d[j]];
            } else {}
        }
        if(min > -1) {
            f[i] = min + 1;
        } else{}
        for(let j = n - 1;j >= 0; j = j - 1) {
            if(i >= d[j]) {
                if(g[i - d[j]] === -1) {
                    g[i] = -1;
                } else {
                    g[i] = g[i - d[j]] + 1;
                }
                break;
            } else{}
        }
        if(f[i] !== g[i]) {
            ok = false;
            break;
        } else{}
    }
    return ok;
}

// test your program!
 greedy_is_possible(list(1, 5, 10, 20, 50)); // true
 greedy_is_possible(list(1, 20, 25, 50)); // false.
