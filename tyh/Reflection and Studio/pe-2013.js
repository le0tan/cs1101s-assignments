// Question 2
function is_odd(x){
    return x % 2 === 1;
}
// is_odd(17); // returns true 
// is_odd(18); // returns false
function all_false(lst){
    function h(xs){
        if(is_empty_list(xs)){
            return true;
        } else {
            return (!(head(xs))) && h(tail(xs));
        }
    }
    // if(is_empty_list(lst)){
    //     return true;   // this is not defined clearly
    // } else {
    //     return h(lst);
    // }
    return h(lst);
}
// all_false(list(false,true,false,false)); //returns false
// all_false(list(false,false,false,false)); // returns true
// all_false(list());// returns false
function element_wise_and(xs,ys){
    if(is_empty_list(xs) || is_empty_list(ys)){
        return [];
    } else {
        return pair(head(xs) && head(ys), element_wise_and(tail(xs), tail(ys)));
    }
}
// element_wise_and(list(true, false, true, true, false), list(true, true, false, true, true));
function decrement(xs){
    function find(lst){
        if(is_empty_list(lst)){
            return false;
        } else {
            return head(lst) && (is_empty_list(tail(lst)) ? true : all_false(tail(lst)));
        }
    }
    if(is_empty_list(xs)){
        return [];
    } else if(all_false(xs)){
        return map(t => !t, xs);
    } else if(find(xs)){
        return map(t => !t, xs);
    } else {
        return pair(head(xs), decrement(tail(xs)));
    }
}
// decrement(list(true,false,true,false,false));
// // should return the same list as
// // list(true,false,false,true,true)
// decrement(list(true,false,true,false,true));
// // should return the same list as
// // list(true,false,true,false,false);
// decrement(list(false,false,false,false,false));
// // should return the same list as
// // list(true, true, true, true, true);
function count_true(xs){
    if(all_false(xs)){
        return 0;
    } else {
        return 1 + count_true(element_wise_and(xs,decrement(xs)));
    }
}
// count_true(list(true,false,true,false,false));
// count_true(list(false,true,false,true,true));
// count_true(list());

function compute_parity(xs){
    return is_odd(count_true(xs));
}
// const my_bits = list(true,false,false,true,true,false,true); 
// compute_parity(my_bits); // returns false
// const your_bits = list(true,true,false,true,true,false,true); 
// compute_parity(your_bits); // returns true

function check_parity(xs,p){
    return p === compute_parity(xs);
}

// const my_bits = list(true,false,false,true,true,false,true); 
// check_parity(my_bits,false); // returns true
// const your_bits = list(true,true,false,true,true,false,true); 
// check_parity(your_bits,false); // returns false

// Question 3
function encode(xs){
    return accumulate(append, [], map(t => list(t,t,t), xs));
}
// equal(encode(list(true,false,true)),list(true,true,true,false,false,false,true,true,true));
// returns the same list as
// list(true,true,true,false,false,false,true,true,true);
function decode(xs){
    function get3(x){
        return pair(list(head(x), head(tail(x)), head(tail(tail(x)))),
                tail(tail(tail(x))));
    }
    function h(x){
        let count_true = 0;
        function hh(y){
            if(is_empty_list(y)){
            } else {
                if(head(y)){
                    count_true = count_true + 1;
                } else { }
                hh(tail(y));
            }
        }
        hh(x);
        return count_true > 1;
    }
    if(is_empty_list(xs)){
        return [];
    } else {
        const t = get3(xs);
        const cur = head(t);
        const nxt = tail(t);
        return pair(h(cur), decode(nxt));
    }
}
// decode(encode(list(true,false,true)));
// // returns the original list // list(true,false,true)
// decode(list(true,true,false,false,true,false));

// Question 4
function stream_tail(s) { 
    // your program goes here
    if(is_function(tail(s))){
        set_tail(s, tail(s)());
        return tail(s);
    } else {
        return tail(s);
    }
}
function stream_map(f, xs) { // as in stream library
    if (is_empty_list(xs)) { 
        return [];
    } else {
        return pair(f(head(xs)),
                function() {
                    return stream_map(f, stream_tail(xs));});
    }
}
function stream_ref(xs,n) { // as in stream library
    if (n === 0) { 
        return head(xs);
    } else {
        return stream_ref(stream_tail(xs),n - 1);
    }
}
var s = pair(1,() => pair(2, () => pair(3, () => pair(4, []))));
var s2 = stream_map(function(x) { display(x); return x + 1; },s);
var v = stream_ref(s2,2); // alert shows 1,2,3
var w = stream_ref(s2,3); // alert shows only 4 