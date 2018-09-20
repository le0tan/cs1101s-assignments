// Task 2
function partition(xs, p) {
    return pair(filter(x => x <= p, xs),
                filter(x => x > p, xs));
}

function quicksort(xs) {
    if(is_empty_list(xs) || is_empty_list(tail(xs))) {
        return xs;
    } else {
        const m = head(xs);
        const p = partition(xs, m);
        const lf = quicksort(tail(head(p)));
        const rt = quicksort(tail(p));
        return append(lf, pair(m, rt));
    }
}

// Test
 const my_list = list(23, 12, 56, 92, -2, 0);
 quicksort(my_list);

//O(n)
//O(n^2) O(n^2)
//const fastest_list = list(6,3,1,2,4,5,9,7,8,10,11);
//c
