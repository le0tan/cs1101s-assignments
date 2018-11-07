/* Describe your solution here

Essentially, find the number of subsequences of length 3 such that the 3 elements are strictly decreasing.

Hint:
You will get 1 mark for any correct solution.
You will get 2 marks if it is a O(n**2) correct solution.
You will get 4 marks if it is a O(n log n) correct solution.

We consider x - the count of numbers that are greater than m 
but appeared before m, and y - the count of numbers that are 
smaller than m but appeared after m. The count of reversed 
riples are the sum of x*y of every element in the list. In 
the merging process, we denote the left list J, right list 
K, final list res. And we record the numbers used out of K up 
until this merge call as used_K. When we pick a j number from 
J instead of one from K, we know that all numbers that are 
added to the res before j are smaller than j but are 
initially put after j. So we know there are used_K numbers 
that are smaller than j but are put after j. When we pick a 
number k from K instead of from J. We know that the entire 
J is bigger than k but are put before k. Thus, length(K) is 
the count of numbers that are greater than k but appeared before k.

Except for length(K), we're simply recording extra numbers
in the process of merge sort. To get rid of O(n) length (K),
we pass its length as an argument and -1 whenever we pull out
a number from K.

(P.S. In Javascript or most languages that treat array as an
object, I suppose length(k) is an O(1) query?)

We initialize the value of x and y for every m as zero in 
the merge_sort function. And add x*y to cnt every time we 
ensure of pair (x,y). And cnt would be our final result.
*/

//define a data structure
//(m, x, y)
//where m is the number, x is the count of numbers that
//are greater than m and are placed before m
//y is the count of numbers that are smaller than m
//and are placed after m

function dat(m, x, y){
    return pair(m, pair(x, y));
}

function getm(d){
    return head(d);
}

function getx(d){
    return head(tail(d));
}

function gety(d){
    return tail(tail(d));
}

//From merge_sort()
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

function merge(x, y){
    function h(cnt, res, J, K, used_K, len_J){
        if(is_empty_list(J) && is_empty_list(K)){
            return pair(cnt, res);
        } else {
            if(is_empty_list(J)){
                const hK = head(K);
                const k = getm(hK);
                const kx = getx(hK);
                const ky = gety(hK);
                return h(cnt, 
                         append(res, list(dat(k,kx,ky))), 
                         J, 
                         tail(K), 
                         used_K + 1,
                         len_J);
                // return pair(cnt, K);
            } else if(is_empty_list(K)){
                const hJ = head(J);
                const j = getm(hJ);
                const jx = getx(hJ);
                const jy = gety(hJ);
                return h(cnt + jx * used_K,
                         append(res, list(dat(j, jx, jy + used_K))),
                         tail(J),
                         K,
                         used_K,
                         len_J - 1);
            } else {
                const hJ = head(J);
                const j = getm(hJ);
                const jx = getx(hJ);
                const jy = gety(hJ);
                const hK = head(K);
                const k = getm(hK);
                const kx = getx(hK);
                const ky = gety(hK);
                if(j <= k){
                    return h(cnt + jx * used_K,
                             append(res, list(dat(j, jx, jy + used_K))),
                             tail(J),
                             K,
                             used_K,
                             len_J - 1);
                } else {
                    return h(cnt + length(J) * ky,
                             append(res, list(dat(k, kx + len_J, ky))),
                             J,
                             tail(K),
                             used_K + 1,
                             len_J);
                }
            }
        }
    }
    return h(0, [], x, y, 0, length(x));
}

function merge_sort(xs){
    if(is_empty_list(xs)){
        return pair(0, list(dat(xs, 0, 0)));
    } else{
        if(is_empty_list(tail(xs))){
            return pair(0, list(dat(head(xs), 0, 0)));
        } else{
            const mid = middle(length(xs));
            const a = merge_sort(take(xs, mid));
            const b = merge_sort(drop(xs, mid));
            const c = merge(tail(a), tail(b));
            return pair(head(a) + head(b) + head(c), tail(c));
        }
    }
}

function get_sorted(xs){
    return map(x => head(x), tail(merge_sort(xs)));
}

function graderVer2(xs){
    return head(merge_sort(xs));
}

const numbers = list(5, 2, 3, 1, 4);
graderVer2(numbers);
// get_sorted(numbers);