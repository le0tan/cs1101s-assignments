function stream_append_2(xs, ys){
    if(is_empty_list(xs)){
        return ys();
    } else {
        return pair(head(xs),
                    () => stream_append_2(stream_tail(xs), ys));
    }
}

function stream_up_to(s, n){
    if(n < 0){
        return [];
    } else {
        return pair(head(s), () => stream_up_to(stream_tail(s), n-1));
    }
}

function stream_pairs(str){
    function helper(xs, k){
        if(is_empty_list(xs)){
            return [];
        } else {
            return stream_append_2(stream_map(x => pair(x, head(xs)), stream_up_to(str, k-1)),
                                   () => helper(stream_tail(xs), k+1));
        }
    }    
    return helper(str, 0);
}

function int(n){
    return pair(n, () => int(n+1));
}

const s2 = stream_pairs(int(1));
eval_stream(s2, 100);



function add_streams(s1, s2) {
    return is_empty_list(s1)
                ? s2
                : is_empty_list(s2)
                    ? s1
                    : pair(head(s1) + head(s2),
                        () => add_streams(stream_tail(s1),
                                            stream_tail(s2)));
}
function scale_stream(c, stream) {
    return stream_map(x => c * x, stream);
}
const add_series = add_streams; 
const scale_series = scale_stream;
function negate_series(s) { 
    return scale_series(-1, s);
}
function subtract_series(s1, s2) {
    return add_series(s1, negate_series(s2));
}

function coeffs_to_series(list_of_coeffs) { 
    const zeros = pair(0,() => zeros); 
    function iter(list) {
        return is_empty_list(list) ? zeros
                    : pair(head(list),
                        () => iter(tail(list)));
    }
    return iter(list_of_coeffs); 
}

const non_neg_integers = integers_from(0);

function fun_to_series(fun) {
    return stream_map(fun, non_neg_integers);
}

const alt_ones = pair(1, () => scale_stream(-1, alt_ones));
function h2(k){
    return pair(k, () => h2(-k));
}
const alt_ones_2 = h2(1);
const alt_ones_3 = stream_map(x => math_pow(-1,x), integers_from(0));
const zeros = add_streams(alt_ones, stream_tail(alt_ones));

const s1 = fun_to_series(x => 1);
const s2 = fun_to_series(x => x + 1);

function mul_series(s1, s2) { 
    return pair(head(s1) * head(s2),
                () => add_series(scale_stream(head(s2), stream_tail(s1)), mul_series(s1, stream_tail(s2))));
}
// eval_stream(mul_series(coeffs_to_series(list(1,1,1,1,1)), coeffs_to_series(list(1,2,3,2,1))),8);
eval_stream(mul_series(s1, s2),10);