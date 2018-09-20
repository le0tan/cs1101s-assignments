// Task 2
function make_node(left_tree, number, right_tree) {
    return list(left_tree, number, right_tree);
}
function make_balanced(xs) {
    if(is_empty_list(xs)) {
        return [];
    } else if(!is_pair(xs)) {
        return make_node([],xs,[]);
    } else {
        const n = length(xs);
        const lf = math_floor(n / 2);
        const rt = n - lf - 1;
        return make_node(make_balanced(take(xs, lf)),
                         list_ref(xs, lf),
                         make_balanced(drop(xs, lf + 1)));
    }
}

// Test
(make_balanced(list(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)));
