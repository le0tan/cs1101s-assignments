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
    const mem = [];
    const deno = reverse(lst_of_denominations);
    const len = length(deno);
    
    for(let i = 0; i <= amount; i = i + 1){
        mem[i] = -1;
    }
    
    mem[0] = 0;
    
    for(let i = deno; !is_empty_list(i); i = tail(i)){
        const cur = head(i);
        mem[cur] = 1;
    }
    
    for(let i = 0; i <= amount; i = i + 1){
        if(mem[i] !== -1){
            continue;
        } else {
            let smallest = amount + 1;
            for(let j = deno; !is_empty_list(j); j = tail(j)){
                const cur = i - head(j);
                if(cur < 0){
                    continue;
                } else {
                    if(mem[cur] !== -1){
                        if(mem[cur] < smallest){
                            smallest = mem[cur];
                        } else { }
                    } else { }
                }
            }
            if(smallest < amount + 1){
                mem[i] = smallest + 1;
            } else { }
        }
    }
    
    return mem[amount];
}

// memoized_coin_change(list(1), 10);

// This should return 2
// Because (20 + 20) = 40
// memoized_coin_change(list(1, 20, 25, 50), 40);

// This should return 2
// Because (50 + 1) = 51
// memoized_coin_change(list(1, 20, 25, 50), 51);

// This should return 6
// Because (1 + 1 + 20 + 20 + 20 + 25) = 87 
// memoized_coin_change(list(1, 20, 25, 50), 87);