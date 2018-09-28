function range(a,b){
    if(a>b){
        return [];
    } else {
        return pair(a, range(a+1,b));
    }
}

function _append(a,b){
    if(is_empty_list(a)){
        return pair(a,b);
    } else {
        return pair(head(a), _append(tail(a),b));
    }
}

function hanoi(n, src, dst, buf){
    if(n === 1){
        return list(src + "->" + dst);
    } else {
        return append(hanoi(n-1, src, buf, dst), append(list(src + "->" + dst), hanoi(n-1, buf, dst, src)));
    }
}

const ref = list(1,2,3,4,5);
function value(n){
    return list_ref(ref, n-1);
}

function count_change(n, d){
    if(n === 0){
        //考点！！！！
        return list([]);
    } else if(d === 0 || n < 0){
        return -1;
    } else {
        const a = count_change(n, d-1);
        const b = count_change(n-value(d), d);
        if(b !== -1){
            const k = map(x => pair(value(d), x), b);
            if(a !== -1){
                return append(a,k);
            } else {
                return k;
            }
        } else {
            if(a !== -1){
                return a;
            } else {
                return -1;
            }
        }
    }
}

function accu_n(op, init, lst){
    if(is_empty_list(head(lst))){
        return [];
    } else {
        const t = map(head, lst);
        return append(list(accumulate(op, init, t)), accu_n(op, init, map(tail, lst)));
    }
}

function transpose(mat){
    return accu_n((x,y)=>pair(x,y), [], mat);
}

function flatten_tree(tree){
    if(is_empty_list(tree)){
        return [];
    } else {
        const h = head(tree);
        const t = tail(tree);
        if(is_list(h)){
            const f = flatten_tree(h);
            //在一个list前面放list要用append
            return append(f, flatten_tree(t));
        } else {
            return append(list(h), flatten_tree(t));
        }
    }
}

function filter_tree(f, tree){
    if(is_empty_list(tree)){
        return [];
    } else {
        const h = head(tree);
        const t = tail(tree);
        if(is_list(h)){
            const res = filter_tree(f, h);
            //这里只能用pair不能用append
            //原因：tree里面head和tail不是融合在一起的
            return pair(res, filter_tree(f, t));
         } else {
             return f(h) ? pair(h, filter_tree(f, t)) : filter_tree(f, t);
         }
    }
}

const tree1 = list( list(1,2, list(3)),4, list(5,6));
equal(filter_tree(x => x % 2 === 1, tree1), list( list(1,list(3)),list(5)));
// filter_tree(x => x % 2 === 1, tree1);
// tree1;