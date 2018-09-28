// Task 1
function partition(xs, p) {
    // Your answer here
    return pair(
        filter(t => t <= p, xs),
        filter(t => t > p, xs));
}

// Test
const my_list = list(1, 2, 3, 4, 5, 6);
partition(my_list, 0);

