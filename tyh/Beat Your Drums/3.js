function simplify_rhythm(rhythm) {
    /* your answer here */
    function append_n(h, t, n){
        return n <= 0
                ? h
                : append_n(append(h,t), t, n-1);
    }
    
    if(is_empty_list(rhythm)){
        return [];
    } else {
        if(is_list(rhythm)){
            return append(simplify_rhythm(head(rhythm)),
                          simplify_rhythm(tail(rhythm)));
        } else {
            if(is_pair(rhythm)){
                const h = simplify_rhythm(head(rhythm));
                return append_n(h, h, tail(rhythm) - 1);    
            } else {
                return list(rhythm);
            }
        }
    }
}

// test

const my_rhythm = pair(
    list(
        pair(list(1,2,0,1), 2)
        , list(1,3,0,1,3,1,0,3))
    , 3);
display('[' + simplify_rhythm(my_rhythm) + ']');