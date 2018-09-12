function find(bst, name) {
    if(is_empty_binary_tree(bst)) {
        return false;
    } else {
        const cur = value_of(bst);
        if(name < cur) {
            return find(left_subtree_of(bst), name);
        } else if(name === cur) {
            return true;
        } else {
            return find(right_subtree_of(bst), name);
        }
    }
}

// Test
 find(cadet_names, "ABC");
