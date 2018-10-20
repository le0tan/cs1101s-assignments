// Your code will be tested against 8 private test cases.
// You will get 1 mark for each test passed.
/* 
   Bounds:
   lst_of_denominations is sorted in ascending order
   lst_of_denominations is at most length 10.
   denominations are positive numbers less than 30 each
   amount is less than 1000
*/

// This solution uses a memo table to keep track of the
// smallest number of coins to pay that amount
function memoized_coin_change(lst_of_denominations, amount){
    // Your solution here
    // This solution gives the largest number of coins of the
    // greatest denomination for the amount left.
    let f = [];
    let d = [];
    const n = length(lst_of_denominations);
    for(let i = 0; i <= amount; i = i + 1) {
        f[i] = -1;
    }
    for(let i = 0; i < n; i = i + 1) {
        d[i] = head(lst_of_denominations);
        lst_of_denominations = tail(lst_of_denominations);
    }
    f[0] = 0;
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
    }
    return f[amount];
}

// This should return 2
// Because (20 + 20) = 40
 memoized_coin_change(list(1, 20, 25, 50), 40);

// This should return 2
// Because (50 + 1) = 51
 //memoized_coin_change(list(1, 20, 25, 50), 51);

// This should return 6
// Because (1 + 1 + 20 + 20 + 20 + 25) = 87 
 //memoized_coin_change(list(1, 20, 25, 50), 87);
