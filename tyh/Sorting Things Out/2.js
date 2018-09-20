// Task 2
function partition(xs, p) {
    // Your answer here
    return pair(filter(x=>x<=p,xs), filter(x=>x>p,xs));
}

function quicksort(xs) {
    // Your answer here
    if(is_empty_list(xs)){
        return [];
    } else if(is_empty_list(tail(xs))){
        return xs;
    } else {
        const p = partition(tail(xs), head(xs));
        const h = quicksort(head(p));
        const t = quicksort(tail(p));
        return append(h,pair(head(xs), t));
    }
    
}

// Test
const my_list = list(23, 12, 56, 92, -2, 0);
quicksort(my_list);