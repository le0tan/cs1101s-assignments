// member() function that matches a list
// however, it returns the remaining head also
function is_member_list(xs, ys){
    function is_prefix(xs, ys){
        if(is_empty_list(xs)){
            return true;
        } else if(length(xs) > length(ys)){
            return false;
        } else {
            if(head(xs) === head(ys)){
                return is_prefix(tail(xs), tail(ys));
            } else {
                return false;
            }
        }
    }
    function helper(xs, ys, left){
        if(is_empty_list(xs)){
            return pair(reverse(left), ys);
        } else if(length(xs) > length(ys)){
            return pair(reverse(left), []);
        } else {
            if(is_prefix(xs, ys)){
                return pair(reverse(left), ys);
            } else {
                return helper(xs, tail(ys), pair(head(ys), left));
            }
        }
    }
    return helper(xs, ys, []);
}
is_member_list(list(1,2),list(2,2,1,2,3,4));

// return pair(take(xs, n), drop(xs, n))
function take_drop(xs, n){
    function helper(left, right, n){
        if(n === 0){
            return pair(reverse(left), right);
        } else {
            return helper(pair(head(right), left), tail(right), n-1);
        }
    }
    return helper([], xs, n);
}
take_drop(list(1,2,3),1);

// find the nth head of a list xs
function head_ref(xs, n){
    if(n === 0){
        return xs;
    } else {
        return head_ref(tail(xs), n-1);
    }
}

// set the nth element of a list xs to x
function set_n(xs, n, x){
    set_head(head_ref(xs, n), x);
}

const a = list(1,2,3,4);
set_n(a, 2, 5);
a;

// copy a list xs
function copy_list(xs){
    return map(x => x, xs);
}