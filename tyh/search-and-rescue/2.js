function find(bst, name) {
    // Your answer here
    if(is_empty_binary_tree(bst)){
        return false;
    } else {
        if(value_of(bst) === name){
            return true;
        } else {
            return value_of(bst) > name
                    ? find(left_subtree_of(bst), name)
                    : find(right_subtree_of(bst), name);
        }
    }
}

// Test
find(cadet_names, "YAP SHI HAO");
//is_empty_binary_tree, left_subtree_of, value_of and right_subtree_of