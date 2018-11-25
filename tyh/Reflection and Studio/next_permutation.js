function set_reverse(xs){
    function find_last(ys){
        if(is_empty_list(ys)){
            return ys;
        } else if(is_empty_list(tail(ys))){
            return ys;
        } else {
            return find_last(tail(ys));
        }
    }
    if(is_empty_list(xs)){
        return xs;
    } else if(is_empty_list(tail(xs))){
        return xs;
    } else {
        const t = set_reverse(tail(xs));
        const a = head(xs);
        set_tail(xs, []);
        set_tail(find_last(t), xs);
        return t;
    }
}

// const a = list(1,2,3);
// const b = set_reverse(a);
// a;
// b;

function set_map(f, xs){
    if(is_empty_list(xs)){
        return xs;
    } else {
        set_head(xs, f(head(xs)));
        set_map(f, tail(xs));
    }
}

function set_remove(x, xs){
    function h(xs){
        if(is_empty_list(xs)){
            return xs;
        } else {
            if(head(xs) !== x){
                return xs;
            } else {
                return h(tail(xs));
            }
        }
    }
    // display(xs);
    if(is_empty_list(xs)){
        return xs;
    } else {
        if(head(xs) === x){
            // display('a');
            const t = h(xs);
            // display(t);
            if(is_empty_list(t)){
                set_head(xs, []);
                return xs;
            } else {
            set_head(xs, head(t));
            set_tail(xs, set_remove(x, tail(t)));
            return xs;
            }
        } else {
            set_remove(x, tail(xs));
            return xs;
        }
    }
}

// const a = list(1,2,3);
// set_remove(3,a);

// function set_accumulate(f, init, xs){
    
// }

// function sieve(xs){
//     return pair(head(xs), () => stream_filter(t => t % head(xs) !== 0, sieve(stream_tail(xs))));
// }

// const a = sieve(integers_from(2));
// eval_stream(a, 10);

// function partial_sums(xs){
//     return pair(head(xs), () => stream_map(t=>t+head(xs), partial_sums(stream_tail(xs))));
// }

// eval_stream(partial_sums(integers_from(1)), 10);

function memo(f){
    let mem = [];
    function h(n){
        if(mem[n] === undefined){
            mem[n] = f(n);
        } else {}
        return mem[n];
    }
    return h;
}

const mfib = function (n){
    let mem = [];
    mem[0] = 0; mem[1] = 1;
    function h(n){
        if(mem[n] === undefined){
            mem[n] = h(n-1) + h(n-2);
        } else {}
        return mem[n];
    }
    return h(n);
};

// mfib(20);

// const b = n => pair(n, () => pair(b(n+1), () => b(n*2)));
// const x = b(1);
// stream_tail(x);

function accu_n(op, init, seqs){
    return is_empty_list(head(seqs))
        ? []
        : pair(accumulate(op, init, map(x=>head(x),seqs)), accu_n(op, init, map(x=>tail(x),seqs)));
}

const s = list(list(1, 2, 3), list(4, 5, 6), list(7, 8, 9), list(10, 11, 12));
// accu_n((x, y) => x + y, 0, s);
function accu_tree(op, init, tree){
    return is_empty_list(tree)
            ? init
            : is_list(tree)
                ? op(accu_tree(op, init, head(tree)), accu_tree(op, init, tail(tree)))
                : op(tree, init);
}
// const plus = (a,b) => a+b;
// accu_tree(plus, 0, list(1, 2, list(3, 4), list(5, list(6, 7))));

function perm(xs){
    function ins(a, ys){
        function helper(left, right, res){
            if(is_empty_list(right)){
                return pair(append(left, list(a)), res);
            } else {
                return helper(append(left, list(head(right))), tail(right), pair(append(left, append(list(a), right)), res));
            }
        }
        return helper([], ys, []);
    }
    return is_empty_list(xs)
        ? list([])
        : accumulate(append, [], map(x=>ins(head(xs), x), perm(tail(xs))));
}

// perm(list(1,2,3));
function ins_sort(arr){
    function swap(a, b){
        const t = arr[a];
        arr[a] = arr[b];
        arr[b] = t;
    }
    const len = array_length(arr);
    for(let i = 0; i < len; i = i + 1){
        for(let j = i-1; j >= 0; j = j - 1){
            if(arr[j] <= arr[j+1]){
                break;
            } else {
                swap(j, j+1);
            }
        }
        // display(arr);
    }
    return arr;
}


function next_perm(arr){
    ins_sort(arr);
    const len = array_length(arr);
    function swap(a, b){
        const t = arr[a];
        arr[a] = arr[b];
        arr[b] = t;
    }
    function rev(a, b){
        for(let i = a; i <= math_floor((a+b)/2); i = i + 1){
            swap(i, a+b-i);
        }
    }
    function h(){
        let h = undefined;
        let l = undefined;
        for(let i = len-2; i >= 0; i = i - 1){
            if(arr[i]<arr[i+1]){
                h = i;
                break;
            } else {}
        }
        if(h !== undefined){
            for(let i = len-1; i > h; i = i - 1){
                if(arr[i] > arr[h]){
                    l = i;
                    break;
                } else {}
            }
            if(l !== undefined){
                swap(h,l);
                rev(h+1, len-1);
                return arr;
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }
    return h;
}

const np = next_perm([3,2,1]);