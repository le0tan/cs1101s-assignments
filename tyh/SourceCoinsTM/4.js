// Your code will be tested against 8 private test cases
// You will get 1 mark for each test passed.
/* 
   Bounds:
   lst is sorted in ascending order.
   lst is at most length 30.
   numbers in lst are non-negative numbers at most 500.
*/
function memoized_coin_change(lst_of_denominations, amount){
    // Your solution here
    const mem = [];
    const mem2 = [];
    const deno = reverse(lst_of_denominations);
    const len = length(deno);
    
    for(let i = 0; i <= amount; i = i + 1){
        mem[i] = -1;
        mem2[i] = -1;
    }
    
    mem[0] = 0; mem2[0] = 0;
    
    for(let i = deno; !is_empty_list(i); i = tail(i)){
        const cur = head(i);
        mem[cur] = 1;
        mem2[cur] = 1;
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
    
    for(let i = 0; i <= amount; i = i + 1){
        if(mem2[i] !== -1){
            continue;
        } else {
            for(let j = deno; !is_empty_list(j); j = tail(j)){
                const co = head(j);
                if(co < i){
                    const a = math_floor(i / co);
                    const b = mem2[i - a * co];
                    
                    if(b !== -1){
                        mem2[i] = a + b;
                    } else { }
                    break;
                } else { }
            }
        }
    }
    
    let flag = true;
    
    for(let i = 0; i <= amount; i = i + 1){
        if(mem[i] !== mem2[i]){
            flag = false;
            break;
        } else { }
    }
    
    return flag;
}

// Function that takes a list of denominations and returns if the
// greedy algorithm can be used to generate the correct number of
// coins, given any target amount of money.
function greedy_is_possible(lst) {
    const deno = reverse(lst);
    const amount = head(deno)+head(tail(deno));
    const mem = [];
    const mem2 = [];
    const len = length(deno);
    
    for(let i = 0; i <= amount; i = i + 1){
        mem[i] = -1;
        mem2[i] = -1;
    }
    
    mem[0] = 0; mem2[0] = 0;
    
    for(let i = deno; !is_empty_list(i); i = tail(i)){
        const cur = head(i);
        mem[cur] = 1;
        mem2[cur] = 1;
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
    
    for(let i = 0; i <= amount; i = i + 1){
        if(mem2[i] !== -1){
            continue;
        } else {
            for(let j = deno; !is_empty_list(j); j = tail(j)){
                const co = head(j);
                if(co < i){
                    const a = math_floor(i / co);
                    const b = mem2[i - a * co];
                    
                    if(b !== -1){
                        mem2[i] = a + b;
                    } else { }
                    break;
                } else { }
            }
        }
    }
    
    let flag = true;
    
    for(let i = 0; i <= amount; i = i + 1){
        if(mem[i] !== mem2[i]){
            flag = false;
            break;
        } else { }
    }
    
    return flag;
}

// test your program!
greedy_is_possible(list(1, 5, 10, 20, 50)); // true
// greedy_is_possible(list(1, 20, 25, 50)); // false.