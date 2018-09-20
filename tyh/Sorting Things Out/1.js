// Task 1
function partition(xs, p) {
    // Your answer here
    return pair(filter(x=>x<=p,xs), filter(x=>x>p,xs));
}

// Test
const my_list = list(5,6,1,7,9,2);
partition(my_list, 6);