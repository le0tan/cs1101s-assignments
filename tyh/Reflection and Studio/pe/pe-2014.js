// Question 1
function weighted_sum(digits, weights){
    if(is_empty_list(digits) || is_empty_list(weights)){
        return 0;
    } else {
        return head(digits) * head(weights) + weighted_sum(tail(digits), tail(weights));
    }
}
// display(weighted_sum(list(2, 3), list(5, 4))); // returns 22 
// display(weighted_sum(list(1, 2), list(0, 2))); // returns 4

function discard_element(xs, pos){
    if(is_empty_list(xs)){
        return [];
    } else if(pos === 0){
        return tail(xs);
    } else {
        return pair(head(xs), discard_element(tail(xs), pos-1));
    }
}
// display(discard_element(list(1, 2, 3), 0));
// // returns list(2, 3)
// display(discard_element(list(1, 2, 3), 2));
// // returns list(1, 2)
// display(discard_element(list(1, 2, 3), 3));
// // returns list(1, 2, 3)

function id_to_matric(id){
    const num = tail(id);
    const tab = ['Y','X','W','U','R','N','M','L','J','H','E','A','B'];
    if(head(id) === 'u'){
        const t = discard_element(num, 2);
        const weights = list(0,1,3,1,2,7);
        const chk = weighted_sum(t, weights);
        // display(chk%13);
        // display(t);
        return append(list('U'), append(t, list(tab[chk%13])));
    } else {
        const weights = list(1,1,1,1,1,1,1);
        const chk = weighted_sum(num, weights);
        return append(list('A'), append(num, list(tab[chk%13])));
    }
}

// display(id_to_matric(list("u", 0, 9, 0, 1, 2, 3, 4)));
// returns list("U", 0, 9, 1, 2, 3, 4, "H")
// id_to_matric(list("a", 0, 1, 2, 3, 4, 5, 6));
// returns list("A", 0, 1, 2, 3, 4, 5, 6, "J")

// Question 3
// NOTE: Must not use for-loop or while-loop.
function get_elem(mat, x, y){
    return list_ref(list_ref(mat, x-1), y-1);
}
const m = list(list(1, 2, 3), list(4, 5, 6));
// get_elem(m, 1,2); // return 2
// get_elem(m, 2,1); // return 4

function set_elem(mat, x, y, val){
    function ref_head(xs, n){
        if(n === 0){
            return xs;
        } else {
            return ref_head(tail(xs), n-1);
        }
    }
    const row = list_ref(mat, x-1);
    set_head(ref_head(row, y-1), val);
}
// display(get_elem(m,2,3));
// set_elem(m, 2, 3, 9);
// display(get_elem(m,2,3));

function scale(mat, k){
    return map(t => (map(t => t*k, t)), mat);
}

// display(scale(m, 2));

function transpose(mat){
    const rows = length(mat);
    const cols = length(head(mat));
    const res = [];
    function get_col(x, c){
        return map(t => list_ref(t, c), x);
    }
    function h(n, res){
        if(n === cols){
            return res;
        } else {
            return h(n+1, pair(get_col(mat, n), res));
        }
    }
    return reverse(h(0, []));
}

// transpose(m);

function matmul(matA, matB){
    const rows = length(matA);
    const cols = length(head(matB));
    function get_col(x, c){
        return map(t => list_ref(t, c), x);
    }
    function vecmul(a, b){
        if(is_empty_list(a) || is_empty_list(b)){
            return 0;
        } else {
            return head(a) * head(b) + vecmul(tail(a), tail(b));
        }
    }
    function gen_list(n){
        if(n === 0){
            return list(0);
        } else {
            return append(gen_list(n-1), list(n));
        }
    }
    function calc_row(r){
        const vecA = list_ref(matA, r);
        return map(x => vecmul(vecA, get_col(matB, x)), gen_list(cols-1));
    }
    return map(x => calc_row(x), gen_list(rows-1));
}

const a = list(list(1,2),list(3,4));
matmul(a, a);