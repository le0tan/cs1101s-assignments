function binary_search_tree_to_string(bst) {
    // Your answer here
    if(is_empty_binary_tree(bst)){
        return '';
    } else {
        return binary_search_tree_to_string(left_subtree_of(bst))
                + value_of(bst) + '\n'
                + binary_search_tree_to_string(right_subtree_of(bst));
    }
}

// Test
binary_search_tree_to_string(cadet_names);