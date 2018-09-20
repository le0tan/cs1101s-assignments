const numbers = list(5, 2, 3, 1, 4);

function graderVer2(arr) {
    // x is the value
    // y is the the number of elements that are greater than x 
    // and were before x
    // z is the number of elements that are smaller than x 
    // and were after it. 
    function tri(x, y, z) {
        return pair(x, pair(y, z));
    }
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
        // cnt is number of out of order triples
        // res is the new sorted array(each element is tri)
        // x and y are going to be combined
        // len_x is number of elements that have not been added to the new array
        // used_y is number of elements that have been added to the new array
        function helper(cnt, res, x, y, len_x, used_y) {
            if(is_empty_list(x) && is_empty_list(y)) {
                return pair(cnt, res);
            } else if(is_empty_list(x)) {
                const yy = head(y);
                const num_y = head(yy);
                const lf_y = head(tail(yy));
                const rt_y = tail(tail(yy));
                return helper(cnt, append(res, list(tri(num_y,
                                                        lf_y,
                                                        rt_y))), 
                                  x, tail(y), len_x, used_y + 1);
            } else if(is_empty_list(y)) {
                const xx = head(x);
                const num_x = head(xx);
                const lf_x = head(tail(xx));
                const rt_x = tail(tail(xx));
                return helper(cnt + lf_x * used_y, 
                                  append(res, list(tri(num_x, 
                                                       lf_x,
                                                       rt_x + used_y))), 
                                  tail(x), y, len_x - 1, used_y);
            } else {
                const xx = head(x);
                const yy = head(y);
                const num_x = head(xx);
                const num_y = head(yy);
                const lf_x = head(tail(xx));
                const rt_x = tail(tail(xx));
                const lf_y = head(tail(yy));
                const rt_y = tail(tail(yy));
                if(num_x <= num_y) {
                    return helper(cnt + lf_x * used_y, 
                                  append(res, list(tri(num_x, 
                                                       lf_x,
                                                       rt_x + used_y))), 
                                  tail(x), y, len_x - 1, used_y);
                } else {
                    return helper(cnt + len_x * rt_y,
                                  append(res, list(tri(num_y,
                                                       len_x + lf_y,
                                                       rt_y))), 
                                  x, tail(y), len_x, used_y + 1);
                }
            }
        }
        return helper(0, [], x, y, len_x, 0);
    }
    function merge_sort(a, n) {
        if(is_empty_list(a)) {
            return pair(0, list(tri(a, 0, 0)));
        } else if(is_empty_list(tail(a))) {
            return pair(0, list(tri(head(a), 0, 0)));
        } else {
            const hlf = math_floor(n / 2);
            const s = splt(a, hlf, 0, []);
            const x = merge_sort(head(s), hlf);
            const y = merge_sort(tail(s), n - hlf);
            const cur = merge(tail(x), tail(y), hlf);
            return pair(head(cur) + head(x) + head(y), tail(cur));
        }
    }
    return head(merge_sort(arr, length(arr)));
}

// test your program!
graderVer2(numbers); // should return 2
