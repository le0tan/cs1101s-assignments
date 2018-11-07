//1.1
function sum_array(arr){
    const len = array_length(arr);
    let res = 0;
    for(let i = 0; i < len; i = i + 1){
        res = res + arr[i];
    }
    return res;
}

function acc_arr(f, init, arr){
    arr[0] = f(arr[0], init);
    for(let i = 1; i < array_length(arr); i = i + 1){
        arr[i] = f(arr[i], arr[i-1]);
    }
    return arr;
}

function star_py(n){
    let res = "\n";
    for(let i = 1; i <= n; i = i + 1){
        for(let j = 1; j <= i; j = j + 1){
            res = res + '*';
        }
        res = res + '\n';
    }
    display(res);
}

function make_arr(f, row, col){
    let res = [];
    for(let i = 0; i < row; i = i + 1){
        res[i] = [];
        for(let j = 0; j < col; j = j + 1){
            res[i][j] = f(i, j);
        }
    }
    return res;
}

function flip(arr){
    const res = [];
    const rows = array_length(arr);
    const cols = rows === 0 ? 0 : array_length(arr[0]);
    for(let i = 0; i < rows; i = i + 1){
        res[i] = [];
        for(let j = 0; j < cols; j = j + 1){
            res[i][j] = arr[rows-i-1][cols-j-1];
        }
    }
    return res;
}

//1.2
//q1
function qsp(arr){
    const piv = arr[0];
    const len = array_length(arr);
    const res = [piv];
    let left = 1;
    let right = len - 1;
    for(let i = 1; i < len; i = i + 1){
        if(arr[i] < piv){
            res[left] = arr[i];
            left = left + 1;
        } else {
            res[right] = arr[i];
            right = right - 1;
        }
    }
    return res;
}
qsp([6,8,5,7,1,4,9,2]);

//q2
function maxStockPrice(lst) {
    const arr = [];
    function h(lst){
        if(!is_empty_list(lst)){
            arr[array_length(arr)] = head(lst);
            h(tail(lst));
        } else {}
    }
    h(lst);
    //pair(min, max_profit)
    arr[0] = [arr[0], 0];
    for(let i = 1; i < array_length(arr); i = i + 1){
        const cur = arr[i];
        arr[i] = arr[i-1];
        if(arr[i-1][0] > cur){
            arr[i][0] = cur;
        } else {}
        if(cur - arr[i-1][0] > arr[i-1][1]){
            arr[i][1] = cur - arr[i-1][0];
        } else {}
    }
    return arr[array_length(arr)-1][1];
}
maxStockPrice(list(100, 180, 260, 310, 40, 535, 695));

//q3
function all_primes_below_x(x) {
	//your code here
	let res = list();
	let ok = true;
	for(let i = 2; i < x; i = i + 1){
	    ok = true;
	    for(let j = 2; j <= math_sqrt(i); j = j + 1){
	        if(i % j === 0){
	            ok = false;
	            break;
	        } else { }
	    }
	    if(ok){
	        res = append(res, list(i));
	    } else {}
	}
// 	return res;
	
	function h(low, ans){
	    if(low > x){
	        return ans;
	    } else {
	        let ok = true;
	        for(let i = 2; i <= math_sqrt(low); i = i + 1){
	            if(low % i === 0){
	                ok = false;
	                break;
	            } else {}
	        }
	        if(ok){
	            return h(low+1, append(ans, list(low)));
	        } else {
	            return h(low+1, ans);
	        }
	    }
	}
	
	return h(2, []);
}

//q4
function getGreatest(arr){
    const n = array_length(arr);
    if(n < 4){
        error("wrong!");
    } else {
        function getDiag(x, y){
            return arr[x][y] + arr[x+1][y+1] + arr[x+2][y+2] + arr[x+3][y+3];
        }
        let greatest = 0;
        for(let i = 0; i < n-3; i = i + 1){
            for(let j = 0; j < n-3; j = j + 1){
                if(i === 0 && j === 0){
                    greatest = getDiag(i,j);
                } else {
                    const ans = getDiag(i,j);
                    greatest = (ans > greatest ? ans : greatest);
                }
            }
        }
        return greatest;
    }
}

function gen(x,y){
    let res = "[";
    let cnt = 1;
    for(let i = 0; i < x; i = i + 1){
        res = res + '[';
        for(let j = 0; j < y; j = j + 1){
            if(j !== y-1){
                res = res + cnt + ',';
            } else {
                res = res + cnt;
            }
            cnt = cnt + 1;
        }
        if(i !== x-1){
            res = res + '],';
        } else {
            res = res + ']';
        }
    }
    res = res + ']';
    return res;
}

getGreatest([[ 1, 2, 3, 4, 5],
             [ 6, 7, 8, 9,10],
             [11,12,13,14,15],
             [16,17,18,19,20],
             [21,22,23,24,25]]);

//1.3
//q1
function f(arr){
    //pair[max_with_current, max]
    //max_with_current = max(last_max_with_current + current, current);
    let dp = [];
    for(let i = 0; i < array_length(arr); i = i + 1){
        if(i === 0){
            dp[i] = pair(arr[i], arr[i]);
        } else {
            const with_last = head(dp[i-1]) + arr[i];
            const max_with_cur = with_last > arr[i] ? with_last : arr[i];
            const max = max_with_cur > tail(dp[i-1]) ? max_with_cur : tail(dp[i-1]);
            dp[i] = pair(max_with_cur, max);
        }
    }
    return tail(dp[array_length(arr)-1]);
}

f([1,-1,3,-5,3,9,-6,2,0,3,8,-7]);

//2.1
//q1
function f(g,n,a){
    if(n === 0){
        return a;
    } else {
        return a+accumulate((x,y)=>x+y, 0, map(t=>g(t), f(g,n-1,a)));
    }
}
function ff(g,n,a){
    function h(x, ans, last){
        if(x > n){
            return ans;
        } else {
            const cur = g(last);
            return h(x+1, ans+cur, cur);
        }
    }
    return h(0, 0, a);
}

//q2
function e(a,b){
    if(is_empty_list(a) || is_empty_list(b)){
        return is_empty_list(a) && is_empty_list(b);
    } else if((!is_pair(a))&&(!is_pair(b))){
        return a === b;
    } else {
        return e(head(a), head(b)) && e(tail(a), tail(b));
    }
}
function ee(a,b){
    function h(res){
        //todo
    }
}

//q3
function f(lst){
    function make_list(x, n, res){
        if(n === 0){
            return res;
        } else {
            return make_list(x, n-1, pair(x, res));
        }
    }
    if(is_empty_list(lst)){
        return [];
    } else if(is_list(lst)){
        return pair(f(head(lst)), f(tail(lst)));
    } else {
        return make_list(lst, lst, []);
    }
}

//2.2
//q1
function tail_n_times(xs, n){
    function h(cnt, res){
        if(cnt >= n){
            return res;
        } else {
            return h(cnt+1, tail(res));
        }
    }
    return h(0, xs);
}
function last_n(xs, n){
    const len = length(xs);
    return tail_n_times(xs, len-n);
}

//q2
function two_d_map(f, xs){
    if(is_empty_list(xs)){
        return [];
    } else {
        return pair(map(f, head(xs)), two_d_map(f, tail(xs)));
    }
}

two_d_map(t=>t*2, list(list(1,2,3),
                          list(4,5,6),
                          list(7,8,9))
);

//q3
function snake(xs){
    if(is_empty_list(xs)){
        return [];
    } else {
        return append(head(xs), snake(tail(xs)));
    }
}

snake(list(list(1,2,3), list(4,5,6), list(7,8,9)));

//q4
function num_of_matches(a, b){
    function in_list(n, xs){
        if(is_empty_list(xs)){
            return false;
        } else {
            if(head(xs) === n){
                return true;
            } else {
                return in_list(n, tail(xs));
            }
        }
    }
    if(is_empty_list(a)){
        return 0;
    } else {
        if(in_list(head(a), b)){
            return 1 + num_of_matches(tail(a), b);
        } else {
            return num_of_matches(tail(a), b);
        }
    }
}

num_of_matches(list(1,2,3,4),list(1,2,3));

//q5
function all_pairings(n) {
    function _map(f, xs) {
        function h(lst, ans) {
            if (is_empty_list(lst)) {
                return ans;
            } else {
                return h(tail(lst), pair(f(head(lst)), ans));
            }
        }
        return h(reverse(xs), []);
    }

    function list_gen(x, ans) {
        if (x === 0) {
            return ans;
        } else {
            return list_gen(x - 1, pair(x, ans));
        }
    }

    function h(lst) {
        if (is_empty_list(lst)) {
            return list([]);
        } else {
            return accumulate(append,
                [],
                _map(
                    x =>
                    (_map(t => pair(head(x), t), h(tail(x)))),
                    _map(
                        x =>
                        pair(pair(head(lst), x), filter(t => t !== x, tail(lst))),
                        tail(lst))));
        }
    }
    return h(list_gen(n, []));
}

all_pairings(6);

//2.3
//q1
function tail_n_times(xs, n){
    function h(cnt, res){
        if(cnt >= n){
            return res;
        } else {
            return h(cnt+1, tail(res));
        }
    }
    return h(0, xs);
}
function is_prefix_of(xs, ys){
    if(is_empty_list(xs)){
        return true;
    } else {
        if(is_empty_list(ys)){
            return false;
        } else {
            if(head(xs) === head(ys)){
                return is_prefix_of(tail(xs), tail(ys));
            } else {
                return false;
            }
        }
    }
}
function sublist_replace(a, b, c){
    // replace all a with b in c
    const lenA = length(a);
    const lenB = length(b);
    let res = [];
    function h(xs){
        if(is_empty_list(xs)){
            return undefined;
        } else if(is_prefix_of(a, xs)){
            res = append(res, b);
            h(tail_n_times(xs, lenA));
        } else {
            res = append(res, list(head(xs)));
            h(tail(xs));
        }
    }
    h(c);
    return res;
}

//q2
function solvable(xs, n){
    const len = length(xs);
    function h(cur, rem){
        if(cur === len-1){
            return true;
        } else if(rem <= 0){
            return false;
        } else {
            const now = list_ref(xs, cur);
            if(!(cur + now < len||cur - now >= 0)){
                return false;
            } else if(cur + now < len){
                // can walk right
                return h(cur + now, rem-1);
            } else if(cur - now >= 0){
                // can walk left
                return h(cur - now, rem-1);
            } else { }
        }
    }
    return h(0, n);
}
// solvable(list(6,1,3,5,2,2,4,3),3);
// solvable(list(3,5,8,4,2,7,1,6),3);

//q3.1
function ref_head(xs, n){
    if(n === 0){
        return xs;
    } else {
        return ref_head(tail(xs), n-1);
    }
}

function swap(a, b, xs){
    const t = list_ref(xs, a);
    set_head(ref_head(xs, a), list_ref(xs, b));
    set_head(ref_head(xs, b), t);
}

function reorder(lst){
    const len = length(lst);
    for(let i = 0; i < len/2 - 1; i = i + 1){
        for(let j = i; j <= len-2; j = j + 2){
            swap(j, j+1, lst);
        }
    }
    swap(len/2 - 1, len/2, lst);
    return lst;
}

const a = list(1,2,3,4,5,6,7,8);
reorder(a);
//q3.2
function rotate(lst, k){
    if(k === 0){
        return lst;
    } else {
        return rotate(append(tail(lst), list(head(lst))), k-1);
    }
}