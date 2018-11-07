function compute_e(xs){
    function helper(xs, w, res) {
        if(is_empty_list(xs)) {
            return res%10;
        } else {
            return helper(tail(xs), tail(w), res + head(w)*head(xs));
        }
    }
    const w = list(1,3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3);
    return helper(xs, w, 0);
}
function add_e(xs) {
    const e = compute_e(xs);
    return reverse(pair(e, reverse(xs)));
}
var encoding_key =
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
function get_key(x) {
    return encoding_key[x];
}

var encoding_table =
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
function encode(x,c) {
    return encoding_table[c][x];
}

function EAN_13(xs) {
    const lst = tail(add_e(xs));
    const k = append(get_key(head(xs)),list("R","R","R","R","R","R"));
    function helper(num, k) {
        return is_empty_list(num)?[]:append(encode(head(num),head(k)),helper(tail(num),tail(k)));
    }
    return helper(lst, k);
 }
