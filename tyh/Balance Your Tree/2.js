// Task 2
function make_node(left_tree, number, right_tree) {
    // Put your answer here
    return list(left_tree, number, right_tree);
}

function mid(n){
    return math_floor((n+1) / 2);
}

function make_balanced(xs) {
    // Put your answer here
    if(is_empty_list(xs)){
        return [];
    } else if(is_empty_list(tail(xs))){
        return head(xs);
    } else {
        const len = length(xs);
        const hf = mid(len);
        const cur = list_ref(xs, hf-1);
        const lf = take(xs, hf-1);
        const rt = drop(xs, hf);
        return make_node(make_balanced(lf), 
                         cur, 
                         make_balanced(rt));
    }
}

// Test
// draw_list(make_balanced(list(1,2,3,4,5,6,7,8,9,10)));
make_balanced(list(1,2,3,4,5,6,7,8,9,10));