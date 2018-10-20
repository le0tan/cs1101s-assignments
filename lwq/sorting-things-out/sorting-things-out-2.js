// Task 2
function partition(xs, p) {
    // Your answer from Task 1
    // Your answer here
    return pair(
        filter(t => t <= p, xs),
        filter(t => t > p, xs));
}

function quicksort(xs) {
    // Your answer here
    //display(xs);
    if(is_empty_list(xs)) {
        return [];
    } else if(is_empty_list(tail(xs))) {
        return pair(head(xs), []);
    } else {
        const t = partition(tail(xs), head(xs));
        return append(
            quicksort(head(t)), 
            pair(head(xs), 
            quicksort(tail(t))));
    }
}

// Test
const my_list = list(23, 12, 56, 92, -2, 0);
quicksort(my_list);
