// 1.1
const as = pair('a', () => stream_map(x=>x+'a',as));
eval_stream(as, 10);
// 1.2
const f2 = f => stream_map(x => f(x), integers_from(0));
// 1.3
const aas = f => pair(1, () => stream_map(x => f(x), aas(f)));
eval_stream(aas(t => t * 2), 10);
// 1.4
function aaas(str, k){
    function helper(str, n){
        if(n === k){
            return pair(head(str), () => helper(stream_tail(str), 1));
            // return helper(stream_tail(str), 1);
        } else {
            // return pair(head(str), () => helper(stream_tail(str), n+1));
            return helper(stream_tail(str), n+1);
        }
    }
    return helper(str, 1);
}
eval_stream(aaas(stream(3,1,4,1,5,9,2,6,5,1,2,3,4,5),3), 3);
// 1.5
function add_streams(a, b){
    if(is_empty_list(b)){
        return a;
    } else {
        return pair(head(a)+head(b), () => add_streams(stream_tail(a), stream_tail(b)));
    }
}
function total_stream(lst){
    if(is_empty_list(lst)){
        return [];
    } else {
        return add_streams(head(lst), total_stream(tail(lst)));
    }
}
eval_stream(total_stream(list(stream(1,2,3,4), stream(1,2,3,4), stream(1,2,3,4))), 4);
// 2.1
function swapper(str){
    const a = head(str);
    const st = stream_tail(str);
    const b = head(st);
    return pair(b, () => pair(a, () => swapper(stream_tail(st))));
}
eval_stream(swapper(stream(1,2,3,4,5,6,7,8)),4);
// 2.2
function sep(str){
    function helper(str, n){
        if(n === 1){
            return pair(head(str), () => helper(stream_tail(str), 0));
        } else {
            return helper(stream_tail(str), 1);
        }
    }
    return pair(helper(str,1), helper(str,0));
}
const a = sep(stream(1,2,3,4,5,6,7,8,9,10));
const s1 = head(a);
const s2 = tail(a);
display(eval_stream(s2,2));
// 2.3
function splt(str){
    const t = head(str);
    return pair(0.5*t, () => pair(2*t, () => splt(stream_tail(str))));
}
eval_stream(splt(stream(1,2,3)),4);
// 3.1
function genn(){
    function helper(n, k){
        if(k === 0){
            return helper(n+1, n+1);
        } else {
            return pair(n, () => helper(n, k-1));
        }
    }
    return helper(1,1);
}
eval_stream(genn(),10);
// 3.2
function tribs(a, b, c){
    function add_streams(a, b){
        if(is_empty_list(b)){
            return a;
        } else {
            return pair(head(a)+head(b), () => add_streams(stream_tail(a), stream_tail(b)));
        }
    }
    return pair(a, () => pair(b, () => pair(c, () => 
    add_streams(add_streams(tribs(a,b,c), stream_tail(tribs(a,b,c))), stream_tail(stream_tail(tribs(a,b,c)))))));
}
eval_stream(tribs(1,2,5),5);
// 4.1
function selector(a, b){
    if(head(b) <= 1){
        // const t = stream_tail(b);
        // const new_tail = pair(head(t)-1, () => stream_tail(t));
        return pair(head(a), () => selector(stream_tail(a), stream_tail(b)));
    } else {
        return selector(stream_tail(a), pair(head(b)-1, () => stream_tail(b)));
    }
}

const s1 = stream(5, 9, 8, 3, 1, 2, 4, 5, 6, 1, 1);
// 0 [1] 2 3 4 5 6 7
const s2 = stream(3, 1, 2, 1, 2, 1, 1);
// 1 2 3 4 5 6 7
const t1 = selector(s1, s2);
eval_stream(t1, 6);
// 4.2
function stream_pairs(a, b){
    function helper(x, y){
        if(y > x){
            return helper(x+1, 0);
        } else {
            return pair(stream_ref(a, x)+stream_ref(b,y), () => helper(x, y+1));
        }
    }
    return helper(0,0);
}

eval_stream(stream_pairs(stream('a','aa','aaa'), stream('b','bb','bbb')), 3);
// 4.3
function add_streams(a, b){
    return pair(head(a)+head(b), () => add_streams(stream_tail(a), stream_tail(b)));
}

function splt(str){
    const t = head(str);
    return pair(math_floor(t/10), () => pair(t % 10, () => splt(stream_tail(str))));
}

function comb(str){
    if(is_empty_list(str)){
        return [];
    } else {
        display(eval_stream(str, 2));
        const a = head(str);
        const t = stream_tail(str);
        const b = head(t);
        if(b === 0){
            display('a');
            const c = pair(a+1, () => stream_tail(t));
            display(eval_stream(c, 2));
            return comb(c);
        } else {
            display('b');
            return pair(a, () => comb(t));
        }
    }
}

function add_series(a, b){
    const t1 = add_streams(a,b);
    const t2 = splt(t1);
    display(eval_stream(t2, 4));
    const t3 = comb(t2);
    return t3;
}

const s3 = stream(5,1,4);
const s4 = stream(9,8,6);
eval_stream(add_series(s3, s4), 4);