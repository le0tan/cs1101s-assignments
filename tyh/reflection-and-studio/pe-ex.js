//1.1
function sum_array(arr){
    const len = array_length(arr);
    let res = 0;
    for(let i = 0; i < len; i = i + 1){
        res = res + arr[i];
    }
    return res;
}

function acc_array(arr){
    //idk what this means...
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

function flip_arr(arr){
    //idk what this means...
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
