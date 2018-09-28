function _map(f, xs){
    return accumulate((a,b) => pair(f(a), b), [], xs);
}

function rm(xs){
    return is_empty_list(xs) ? []
                             : pair(head(xs), rm(filter(t => t !== head(xs), tail(xs))));
}

function rm_(xs){
    const op = (a,b) => pair(a, filter(t => t !== a, b));
    return accumulate(op, [], xs);
}

function ma(x, l){
    if(is_pair(l)){
        const cur = head(l);
        const use = map(t => pair(cur, t), ma(x - cur, tail(l)));
        const not_use = ma(x, tail(l));
        return append(use, not_use);
    } else {
        if(x === 0){
            return list([]);
        } else {
            return [];
        }
    }
}

function accumulate_n(op, init, seqs) {
    return is_empty_list(head(seqs))
                            ? []
                            : pair(accumulate(op, init, map(x => head(x), seqs)), 
                            accumulate_n(op, init, map(t => tail(t), seqs)));
}

// const s = list(list(1,2,3),list(4,5,6),list(7,8,9),list(10,11,12));
// accumulate_n((x, y) => x + y, 0, s);

function accumulate_tree(op, init, tree){
    const ops = (a,b) => is_list(a) ? op(accumulate_tree(op, init, a), b) : op(a,b);
    return accumulate(ops, init, tree);
}

// accumulate_tree((a,b)=>a+b, 0, list(1, 2, list(3, 4), list(5, list(6, 7))));

function subsets(xs){
    if(is_empty_list(xs)){
        return list([]);
    } else {
        const hd = head(xs);
        const use = map(t => pair(hd, t), subsets(tail(xs)));
        const no_use = subsets(tail(xs));
        return append(use, no_use);
    }
}

// subsets(list(1,2,3,4));

function perm(xs){
    if(is_empty_list(xs)){
        return list([]);
    } else if(is_empty_list(tail(xs))){
        return list(list(head(xs)));
    } else {
        const hd = head(xs);
        const nxt = perm(tail(xs));
        const t1 = map(t => pair(hd, t), nxt);
        const t2 = map(t => append(t, list(hd)), nxt);
        return append(t1, t2);
    }
}

//perm(list(1,2,3));