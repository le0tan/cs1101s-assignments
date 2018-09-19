function find(bst, name) {
    // Your answer here
    function stra(ls) {
        if(is_empty_binary_tree(ls)) {
            return false;
        } else {
            if(value_of(ls) === name) {
                return true;
            } else {
                return name < value_of(ls)
                     ? stra(left_subtree_of(ls))
                     : stra(right_subtree_of(ls));
            }
        }
    }
    return stra(bst);
}

// Test
find(cadet_names, "LI ZI YING");
