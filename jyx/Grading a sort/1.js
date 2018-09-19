const numbers = list(3, 2, 4, 1);

function graderVer1(arr) {
    // split the array into two parts and return a pair which contains
    // the two arrays(lists)
    function splt(a, mid, i, res) { 
        if(i === mid) {
            return pair(res, a);
        } else {
            return splt(tail(a), mid, i + 1, append(res, list(head(a))));
        }
    }
    //merge two sorted array x and y
    function merge(x, y, len_x) {
        // cnt is number of out of order pairs
        // res is the new sorted array
        // x and y are going to be combined
        // len_x is number of elements that have not been added to the new array
        function helper(cnt, res, x, y, len_x) {
            if(is_empty_list(x)) {
                return pair(cnt, append(res, y));
            } else if(is_empty_list(y)) {
                return pair(cnt, append(res, x));
            } else {
                const xx = head(x);
                const yy = head(y);
                if(xx <= yy) {
                    return helper(cnt, append(res, list(xx)), tail(x), y, len_x - 1);
                } else {
                    return helper(cnt + len_x, append(res, list(yy)), x, 
                                                    tail(y), len_x);
                }
            }
        }
        return helper(0, [], x, y, len_x);
    }
    function merge_sort(a, n) {
        if(is_empty_list(a) || is_empty_list(tail(a))) {
            return pair(a, 0);
        } else {
            const hlf = math_floor(n / 2);
            const s = splt(a, hlf, 0, []);
            const x = merge_sort(head(s), hlf);
            const y = merge_sort(tail(s), n - hlf);
            const cur = merge(head(x), head(y), hlf);
            return pair(tail(cur), head(cur) + tail(x) + tail(y));
        }
    }
    return tail(merge_sort(arr, length(arr)));
}

// test your program!
graderVer1(numbers); // should return 4
