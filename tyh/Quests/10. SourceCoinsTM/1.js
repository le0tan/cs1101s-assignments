// Your code will be tested against 7 private test cases.
/* 
   Bounds:
   lst_of_denominations is sorted in ascending order
   lst_of_denominations is at most length 20.
   denominations are positive numbers less than 1000 each
   amount is less than 1 million
*/

// This function takes a list of coin denominations and greedily
// selects the coins, starting from the highest denomination.
function greedy_coin_change(lst_of_denominations, amount){
    // Your solution here
    // This solution gives the largest number of coins of the
    // greatest denomination for the amount left.
    const deno = reverse(lst_of_denominations);
    function helper(xs, am, ans){
        if(is_empty_list(xs)){
            if(am !== 0){
                return -1;
            } else {
                return ans;
            }
        } else if(am === 0){
            return ans;
        } else {
            const coin = head(xs);
            const cnt = math_floor(am / coin);
            const rem = am % coin;
            return helper(tail(xs), rem, ans + cnt);
        }
    }
    return helper(deno, amount, 0);
}

// This should return 6
// Because (25 + 25 + 25) + (10) + (1+1) = 87
// greedy_coin_change(list(1, 5, 10, 25), 87); 

// This should return 5
// Because (19 + 19) + (5 + 5) + (2) = 50
// greedy_coin_change(list(1, 2, 5, 19), 50);