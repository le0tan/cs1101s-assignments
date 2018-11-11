function is_nucleobase(str){
    if(str === 'A' || str === 'C' || str === 'G' || str === 'T'){
        return true;
    } else {
        return false;
    }
}

function is_dna_strand(ls){
    function helper(xs){
        if(is_empty_list(xs)){
            return true;
        } else {
            return is_nucleobase(head(xs)) && helper(tail(xs));
        }
    }
    if(is_empty_list(ls)){
        return false;
    } else {
        return helper(ls);
    }
}

is_dna_strand(list("A", "G", "A")); // true 
is_dna_strand(list("A", "B", "B", "A")); // false 
is_dna_strand(list("T", "G", "C")); // true 
is_dna_strand(list("T", "G", "Otto")); // false

function combine(lst){
    return accumulate(append, [], lst);
}


combine(list(list("A", "G", "A"),
             list("G", "C", "T", "A"), list("C")));
// returns list("A", "G", "A", "G", "C", "T", "A", "C")
combine(list(list("G"), list("T"),
             list("C", "A", "A", "A"), list("G")));
// returns list("G", "T", "C", "A", "A", "A", "G")

function oxoguanine_repair(lst){
    return map(t => t === '8' ? 'G' : t, lst);
}

oxoguanine_repair(
           list("A", "8", "A", "8", "C", "T", "A", "C"));
// returns list("A", "G", "A", "G", "C", "T", "A", "C")

function find_gene_start(lst){
    const atg = list('A','T','G');
    function helper(start, xs){
        if(is_empty_list(start)){
            return list(xs);
        } else if(is_empty_list(xs)){
            return [];
        } else {
            if(head(start) === head(xs)){
                return helper(tail(start), tail(xs));
            } else {
                return helper(atg, tail(xs));
            }
        }
    }
    return helper(atg, lst);
}

find_gene_start(list("A", "C", "A", "T", "G", "T", "A", "C"));
// returns list(list("T", "A", "C"))
find_gene_start(list("A", "T", "A", "G", "T", "A", "T", "G")); 
// returns list([])
find_gene_start(list("A", "T", "A", "G", "T", "A", "C", "G"));
// returns []

function find_gene_end(lst){
    function take(xs){
        return list(head(xs), head(tail(xs)), head(tail(tail(xs))));
    }
    function take_n(xs, n){
        if(n === 0){
            return [];
        } else {
            return pair(head(xs),take_n(tail(xs), n-1));
        }
    }
    function judge(xs){
        if(is_empty_list(xs)){
            return false;
        } else if(is_empty_list(tail(xs))){
            return false;
        } else if(is_empty_list(tail(tail(xs)))){
            return false;
        } else {
            const tag = list('T','A','G');
            const taa = list('T','A','A');
            const tga = list('T','G','A');
            const t = take(xs);
            if(equal(t, tag) || equal(t, taa) || equal(t, tga)){
                return tail(tail(xs));
            } else {
                return false;
            }
        }
    }
    let cnt = 0;
    function helper(xs){
        if(is_empty_list(xs)){
            return cnt;
        } else {
            const t = judge(xs);
            if(t !== false){
                return cnt;
            } else {
                cnt = cnt + 1;
                return helper(tail(xs));
            }
        }
    }
    helper(lst);
    if(cnt === length(lst)){
        return [];
    } else {
        return list(take_n(lst, cnt));
    }
}

// find_gene_end(list("A", "T", "A", "C", "T", "A", "G", "A", "T", "A", "A"));
// find_gene_end(list("T", "G", "A", "A", "T", "A", "C"));
// find_gene_end(list("A", "T", "A", "C", "C", "A", "G","A", "T"));

function all_genes(lst){
    if(is_empty_list(lst)){
        return [];
    } else {
        const t = find_gene_start(lst);
        if(is_empty_list(t)){
            return [];
        } else {
            return pair(head(find_gene_end(head(t))), all_genes(tail(head(t))));
        }
    }
}

all_genes(list("T", "A", "T", "G", "C", "A", "T", "A", "A", "G", "T", "A", "G", "A",
"T", "G", "A", "T", "G", "A", "T"));

function all_different(nums){
    if(is_empty_list(nums)){
        return true;
    } else {
        const t = map(x => x === head(nums), tail(nums));
        const g = filter(x => x === true, t);
        if(is_empty_list(g)){
            return all_different(tail(nums));
        } else {
            return false;
        }
    }
}

all_different(list(23));
all_different(list(2, 5, 1, 6, 7, 4, 3));
all_different(list(2, 6, 1, 7, 6, 4, 3));

function is_valid_toto_set(nums, n, min, max){
    if(all_different(nums)){
        if(length(nums) === n){
            const t = filter(x => x <= max && x >= min, nums);
            return length(t) === n;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

const nums = list(5, 1, 1, 49);
const n = 4;
const min = 1;
const max = 49;
is_valid_toto_set(nums, n, min, max);

function num_of_matches(numsA, numsB){
    if(is_empty_list(numsA)){
        return 0;
    } else {
        const t = filter(t => t === head(numsA), numsB);
        if(length(t) > 0){
            return 1 + num_of_matches(tail(numsA), numsB);
        } else {
            return num_of_matches(tail(numsA), numsB);
        }
    }
}

// const numsA = list(23, 21, 30, 15, 40); 
// const numsB = list(3, 40, 15, 20 ); 
// num_of_matches(numsA, numsB);

const numsA = list(23, 21);
const numsB = list(5, 4, 7); 
num_of_matches(numsA, numsB);

function check_winning_group(bet_nums, draw_nums, extra_num){
    const matches = num_of_matches(bet_nums, draw_nums);
    const extra = length(filter(t => t === extra_num, bet_nums));
    const n = length(bet_nums);
    if(matches === n){
        return 1;
    } else if(matches === n-1){
        if(extra > 0){
            return 2;
        } else {
            return 3;
        }
    } else if(matches === n-2){
        if(extra > 0){
            return 4;
        } else {
            return 5;
        }
    } else {
        return 0;
    }
}


// const bet_nums = list(40, 30, 1, 49, 23, 15);
// const draw_nums = list(23, 1, 30, 15, 40, 49);
// const extra_num = 27;
// check_winning_group(bet_nums, draw_nums, extra_num); 
// // returns 1

const bet_nums = list(40, 30, 1, 49, 27, 15);
const draw_nums = list(23, 1, 30, 15, 40, 49);
const extra_num = 27;
check_winning_group(bet_nums, draw_nums, extra_num); // returns 2

function evaluate_BAE_tree(bae_tree){
    if(is_list(bae_tree)){
        const left = evaluate_BAE_tree(head(bae_tree));
        const right = evaluate_BAE_tree(head(tail(tail(bae_tree))));
        const op = head(tail(bae_tree));
        if(op === '+'){
            return left + right;
        } else if(op === '-'){
            return left - right;
        } else if(op === '*'){
            return left * right;
        } else {
            return left / right;
        }
    } else {
        return bae_tree;
    }
}

const bae_tree = list( list(2, "+", 5), "*", 100 );
evaluate_BAE_tree(bae_tree); 
// returns 123

function build_BAE_tree(bae_list){
    function is_op(x){
        return x === '+' || x === '-' || x === '*' || x === '/';
    }
    function find(xs, ans){
        if(head(xs) === ')'){
            return pair(tail(xs), ans);
        } else {
            // display(pair(head(xs), ans));
            return find(tail(xs), pair(head(xs), ans));
        }
    }
    // display('build');
    // display(bae_list);
    if(is_number(bae_list)){
        return bae_list;
    } else {
        if(head(bae_list) === '('){
            const t = reverse(tail(bae_list));
            const a = find(t, []);
            const rem = reverse(head(a));
            // display('rem');
            // display(rem);
            // display('t');
            // display(tail(a));
            const left = build_BAE_tree(rem);
            if(is_empty_list(tail(a))){
                return left;
            } else {
                const right = build_BAE_tree(tail(tail(a)));
                return list(left, head(tail(a)), right);
            }
        } else if(is_number(head(bae_list))){
            // display('a');
            if(is_empty_list(tail(bae_list))){
                return head(bae_list);
            } else {
                return list(head(bae_list), head(tail(bae_list)), build_BAE_tree(head(tail(tail(bae_list)))));
            }
        } else {}
    }
}
// const bae_list = list(1,'+',2);
const bae_list = list("(", "(", 2, "+", 5, ")", "*", 100, ")");
display(build_BAE_tree(bae_list));
// display(build_BAE_tree(list(123)));

function evaluate_BAE(bae_list){
    return evaluate_BAE_tree(build_BAE_tree(bae_list));
}

function check_parentheses(paren_list){
    function helper(xs, n){
        if(is_empty_list(xs)){
            return n;
        } else {
            const t = head(xs);
            if(t === '('){
                return helper(tail(xs), n+1);
            } else {
                return helper(tail(xs), n-1);
            }
        }
    }
    return helper(paren_list, 0) === 0;
}

const paren_list = list("(", "(", ")", "(");
check_parentheses(paren_list);