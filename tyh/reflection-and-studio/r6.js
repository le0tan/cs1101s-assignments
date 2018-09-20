// const s = list(list(1, 2, 3), list(4, 5, 6), list(7, 8, 9), list(10, 11, 12));

function accumulate_n(f, i, lst){
    if(is_empty_list(head(lst))){
        return [];
    } else {
        const lt = map(x => head(x), lst);
        const rem = map(x => tail(x), lst);
        return append(list(accumulate(f, i, lt)), accumulate_n(f, i, rem));
    }
}

function _accumulate_n(op, init, seqs) {
    return is_empty_list(head(seqs))
            ? []
            : pair(accumulate(op, init, map(x => head(x), seqs)), 
                   _accumulate_n(op, init, map(x => tail(x), seqs)));
}

// _accumulate_n((x, y) => x + y, 0, s);

function accumulate_tree(op, initial, seq) {
    return accumulate(((x,y) => op(is_list(x) ? accumulate_tree(op, initial, x) : x,
                                   y)),
                      initial,
                      seq);
}
// the second item cannot be accumulate_tree(y) because y is is RESULT of oping the rest of the list.

// accumulate_tree((x, y) => x + y, 0,
//                 list(1, 2, list(3, 4), list(5, list(6, 7))));

// half, rounded downwards
function middle(n) {
    // Reflection work
    return math_round(n / 2);
}

// put the first n elements of xs into a list
function take(xs, n) {
    // Reflection work
    if(n === 0){
        return [];
    } else {
        return pair(head(xs), take(tail(xs), n-1));
    }
}

// drop the first n elements from the list and return the rest
function drop(xs, n) {
    // Reflection work
    if(n === 0){
        return xs;
    } else {
        return drop(tail(xs), n-1);
    }
}

// merge two sorted lists into one sorted list
function merge(xs, ys) {
    if (is_empty_list(xs)) { 
        return ys;
    } else if (is_empty_list(ys)) { 
        return xs;
    } else {
        const x = head(xs);
        const y = head(ys);
        return (x < y) 
            ? pair(x, merge(tail(xs), ys))
            : pair(y, merge(xs, tail(ys)));
    }
}

// a list with more than one element is sorted
// by splitting it into two lists of (almost) equal
// length, sorting the halves and then merging them
// together
function merge_sort(xs) {
    if (is_empty_list(xs) || is_empty_list(tail(xs))) {
        return xs;
    } else {
        const mid = middle(length(xs));  
        return merge(merge_sort(take(xs, mid)), 
                     merge_sort(drop(xs, mid)));
    }
}

function _map(f, xs){
    const op = (x,y) => append(list(f(x)),y);
    return accumulate(op,[],xs);
}

function remove_duplicates(lst){
    if(is_empty_list(lst)){
        return [];
    } else {
        const hd = head(lst);
        const neq = (x => x !== hd);
        const cleaned_tail = filter(neq, tail(lst));
        return pair(head(lst), remove_duplicates(cleaned_tail));
    }
}

function _remove_duplicates(lst){
    const op = (x,y) => pair(x, filter(t => t !== x, y));
    return accumulate(op, [], lst);
}

function makeup_amount(x,l) {
    return is_pair(l)
            ? append(map(x => pair(head(l), x), makeup_amount(x - head(l), tail(l))),
                     makeup_amount(x, tail(l)))
            : x === 0
                ? list([])
                : [];
}

function subsets(lst){
    if(is_empty_list(lst)){
        return list([]);
    } else {
        const rem = subsets(tail(lst));
        return list(rem, map(x => pair(head(lst), x), rem));
    }
}

subsets(list(1,2,3));