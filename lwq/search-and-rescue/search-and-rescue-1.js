function binary_search_tree_to_string(bst) {
    // Your answer here
    function stra(ls) {
        if(is_empty_binary_tree(ls)) {
            return "";
        } else {
            return stra(left_subtree_of(ls))
                + value_of(ls) 
                + '\n'
                + stra(right_subtree_of(ls));
        }
    }
    return (stra(bst));
}

// Test
binary_search_tree_to_string(cadet_names);
