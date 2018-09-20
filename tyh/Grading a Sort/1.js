/*

Describe your solution here

Using merge sort, we do some counting when the merge happens:
function merge(xs, ys) {
    [implementation hidden]
}
Every time we take out the head of xs and ys and compare them,
if head(ys) is smaller than head(xs), we add length(xs) to the counter.
This is because ys is guarenteed in an ascending order, head(ys) would not
form any out of order pairs with tail(ys). On the other hand, 
in the original list, head(ys) is put after any element in xs, but it
is proven to be smaller than any element in xs, thus it would form
an out of order pair with every element in xs, in total length(xs) of pairs.

Hint:
You will get 1 mark for any correct solution.
You will get 3 marks if it is a O(n**2) correct solution.
You will get 5 marks if it is a O(n log n) correct solution.

*/

function middle(n) {
    return math_round(n / 2);
}

function take(xs, n) {
    if(n === 0){
        return [];
    } else {
        return pair(head(xs), take(tail(xs), n-1));
    }
}

function drop(xs, n) {
    if(n === 0){
        return xs;
    } else {
        return drop(tail(xs), n-1);
    }
}

function get_cnt(p){
    return tail(p);
}

function get_list(p){
    return head(p);
}

function helper(lf, rt, cnt){
    if(is_empty_list(lf)){
        return pair(rt, cnt);
    } else if(is_empty_list(rt)){
        return pair(lf, cnt);
    } else {
        if(head(rt) < head(lf)){
            const res = helper(lf, tail(rt), cnt + length(lf));
            return pair(pair(head(rt), get_list(res)), get_cnt(res));
        } else {
            const res = helper(tail(lf), rt, cnt);
            return pair(pair(head(lf), get_list(res)), get_cnt(res));
        }
    }
}

function merge(xs, ys){
    const ans = helper(xs, ys, 0);
    return ans;
}


function merge_sort(xs) {
    if (is_empty_list(xs) || is_empty_list(tail(xs))) {
        return pair(xs, 0);
    } else {
        const mid = middle(length(xs));
        const a = merge_sort(take(xs, mid));
        const b = merge_sort(drop(xs, mid));
        const c = merge(get_list(a), get_list(b));
        const lst_res = get_list(c);
        const cnt_res = get_cnt(a) + get_cnt(b) + get_cnt(c);
        return pair(lst_res, cnt_res);
    }
}

function graderVer1(arr) {
    return tail(merge_sort(arr));
}

const numbers = list(3, 2, 4, 1);
// test your program!
graderVer1(numbers); // should return 4