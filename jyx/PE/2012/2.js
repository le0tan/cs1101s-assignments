function index_of_largest(is) {
    return get_index_of_largest(is, 0, -Infinity, NaN);
}

function get_index_of_largest(is, current_index ,largest_so_far , index_of_largest_so_far){
   if(is_empty_list(is) && current_index === 0) {
       return NaN;
   }else if(is_empty_list(is)){
       return index_of_largest_so_far;
   }else if(head(is) > largest_so_far) {
       return get_index_of_largest(tail(is), current_index + 1, head(is), current_index);
   }else {
       return get_index_of_largest(tail(is), current_index + 1, largest_so_far, index_of_largest_so_far);
   }
}

function remove_specified_element_from_tail(xs, index) {
    function helper(xs, index) {
        if(index === 0) {
            const cur = head(tail(xs));
            set_tail(xs, tail(tail(xs)));
            return cur;
        } else {
            return helper(tail(xs), index - 1);
        }
    }
    if(length(xs) < index + 2) {
        return NaN;
    } else {
        return helper(xs, index);
    }
}

