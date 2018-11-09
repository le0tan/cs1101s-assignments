// ==================== Task 1A ====================
function fizzbuzz(n) {
    
    function helper(x, ans){
        if(x > n){
            return ans;
        } else {
            if(x % 3 === 0 && x % 5 !== 0){
                return helper(x+1, append(ans, list("Fizz")));
            } else if(x % 5 === 0 && x % 3 !== 0){
                return helper(x+1, append(ans, list("Buzz")));
            } else if(x % 5 === 0 && x % 3 === 0){
                return helper(x+1, append(ans, list("FizzBuzz")));
            } else {
                return helper(x+1, append(ans, list(x)));
            }
        }
    }

    return helper(1, []);
}

//Task 1A Tests
assert("1A", () => fizzbuzz(15), list(1, 2, "Fizz", 4, "Buzz",
    "Fizz", 7, 8, "Fizz", "Buzz",
    11, "Fizz", 13, 14, "FizzBuzz"), []);


// ==================== Task 1B ====================
function fizzbuzzer(n, ls){
    
    function helper(x, ans){
        if(x > n){
            return ans;
        } else {
            let res = x;
            let flag = false;
            let chk = ls;
            while(!is_empty_list(chk)){
                const cur = head(chk);
                if(x % head(cur) === 0){
                    if(flag){
                        res = res + tail(cur);
                    } else {
                        flag = true;
                        res = tail(cur);
                    }
                } else {}
                chk = tail(chk);
            }
            return helper(x+1, append(ans, list(res)));
        }
    }

    return helper(1, []);
}

//Task 1B Tests
let fizzbuzz_alt = n => fizzbuzzer(n, list(pair(3, "Fizz"), pair(5, "Buzz")));
assert("1B_1", () => fizzbuzz_alt(15), list(1, 2, "Fizz", 4, "Buzz",
    "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"), 
    ["fizzbuzz"]);


assert("1B_2", () => fizzbuzzer(6, list(pair(1, "a"), pair(2, "ha"), pair(3, "haha"))), 
    list("a", "aha", "ahaha", "aha", "a", "ahahaha"), ["fizzbuzz"]);

//More comprehensible version of above
assert("1B_3", () => fizzbuzzer(6, list(pair(1, "a"), pair(2, "b"), pair(3, "c"))), 
    list("a", "ab", "ac", "ab", "a", "abc"), ["fizzbuzz"]);