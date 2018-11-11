// pe 2012
// Question 1
function compute_e(lst){
    const w = list(1,3,1,3,1,3,1,3,1,3,1,3);
    function h(a, b, ans){
        if(is_empty_list(a) || is_empty_list(b)){
            return ans;
        } else {
            return h(tail(a), tail(b), ans + head(a) * head(b));
        }
    }
    return h(w, lst, 0) % 10;
}
compute_e(list(4,9,2,7,1,8,2,0,9,3,7,5));
function add_e(lst){
    return append(lst, list(compute_e(lst)));
}
equal(add_e(list(4,9,2,7,1,8,2,0,9,3,7,5)),list(4,9,2,7,1,8,2,0,9,3,7,5,1));
const encoding_key =
    [
    list('L','L','L','L','L','L'),
    list('L','L','G','L','G','G'),
    list('L','L','G','G','L','G'),
    list('L','L','G','G','G','L'),
    list('L','G','L','L','G','G'),
    list('L','G','G','L','L','G'),
    list('L','G','G','G','L','L'),
    list('L','G','L','G','L','G'),
    list('L','G','L','G','G','L'),
    list('L','G','G','L','G','L')
    ];
function get_key(n){
    return encoding_key[n];
}
equal(get_key(4), list('L','G','L','L','G','G'));
const encoding_table =
    {
    'L':
    [
        list(0,0,0,1,1,0,1),
        list(0,0,1,1,0,0,1),
        list(0,0,1,0,0,1,1),
        list(0,1,1,1,1,0,1),
        list(0,1,0,0,0,1,1),
        list(0,1,1,0,0,0,1),
        list(0,1,0,1,1,1,1),
        list(0,1,1,1,0,1,1),
        list(0,1,1,0,1,1,1),
        list(0,0,0,1,0,1,1)
    ],
    'G':
    [
        list(0,1,0,0,1,1,1),
        list(0,1,1,0,0,1,1),
        list(0,0,1,1,0,1,1),
        list(0,1,0,0,0,0,1),
        list(0,0,1,1,1,0,1),
        list(0,1,1,1,0,0,1),
        list(0,0,0,0,1,0,1),
        list(0,0,1,0,0,0,1),
        list(0,0,0,1,0,0,1),
        list(0,0,1,0,1,1,1)
    ],

    'R':
    [
        list(1,1,1,0,0,1,0),
        list(1,1,0,0,1,1,0),
        list(1,1,0,1,1,0,0),
        list(1,0,0,0,0,1,0),
        list(1,0,1,1,1,0,0),
        list(1,0,0,1,1,1,0),
        list(1,0,1,0,0,0,0),
        list(1,0,0,0,1,0,0),
        list(1,0,0,1,0,0,0),
        list(1,1,1,0,1,0,0)
    ]
    };
function encode(x, c){
    return encoding_table[c][x];
}
equal(encode(7, 'G'),list(0,0,1,0,0,0,1));
function EAN_13(lst){
    const xs = add_e(lst);
    const k = get_key(head(xs));
    let res = [];
    for(let i = 1; i < 7; i = i + 1){
        const cur = encode(list_ref(xs, i), list_ref(k, i-1));
        res = append(res, cur);
    }
    for(let i = 7; i < 13; i = i + 1){
        const cur = encode(list_ref(xs, i), 'R');
        res = append(res, cur);
    }
    return res;
}
equal(EAN_13(list(4,9,2,7,1,8,2,0,9,3,7,5)),list(0,0,0,1,0,1,1,0,0,1,1,0,1,1,0,1,1,1,0,1,1,0,0,1,1,0,0,1, 0,0,0,1,0,0,1,0,0,1,1,0,1,1,1,1,1,0,0,1,0,1,1,1,0,1,0,0, 1,0,0,0,0,1,0,1,0,0,0,1,0,0,1,0,0,1,1,1,0,1,1,0,0,1,1,0));

// Question 2
function get_index_of_largest(lst, idx, largest, idx_largest){
    if(is_empty_list(lst)){
        return idx_largest;
    } else {
        if(head(lst) > largest){
            return get_index_of_largest(tail(lst), idx+1, head(lst), idx);
        } else {
            return get_index_of_largest(tail(lst), idx+1, largest, idx_largest);
        }
    }
}
function index_of_largest(lst) {
    return get_index_of_largest(lst,0,-Infinity,NaN);
}
index_of_largest(list(42,34,65,22,5,19)) === 2;

function remove_specified_element_from_tail(xs, i){
    const len = length(xs);
    function ref_head(lst, n){
        if(n > i){
            return lst;
        } else {
            return ref_head(tail(lst), n+1);
        }
    }
    if(len < i + 2){
        return NaN;
    } else {
        // return ref_head(xs, 1);
        const t = ref_head(xs, 1);
        const ret = head(tail(t));
        set_tail(t, tail(tail(t)));
        return ret;
    }
}
const example1 = list(1,2,3,4,5,6); 
display(remove_specified_element_from_tail(example1 , 3));
display(example1);
const example2 = list(1,2,3,4,5,6);
display(remove_specified_element_from_tail(example2 , 0));
display(example2);