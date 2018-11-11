function make_2D_zero_array(rows, cols){
    const res = [];
    for(let i = 0; i < rows; i = i + 1){
        res[i] = [];
        for(let j = 0; j < cols; j = j + 1){
            res[i][j] = 0;
        }
    }
    return res;
}

// make_2D_zero_array(3, 5);
// Returns a 2D array equal to
// [[0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0]].

function num_of_live_neighbours(game, n, r, c){
    const x = [-1,0,1];
    const y = [-1,0,1];
    let ans = 0;
    for(let i = 0; i < 3; i = i + 1){
        for(let j = 0; j < 3; j = j + 1){
            if(!(i === 1 && j === 1) 
                && game[(r+x[i]+n)%n][(c+y[j]+n)%n] === 1){
                ans = ans + 1;
            } else {}
        }
    }
    return ans;
}

// var game1 = [[0, 0, 0, 0],
//              [0, 1, 0, 0],
//              [0, 0, 1, 1],
//              [0, 0, 0, 1]];
// display(num_of_live_neighbours(game1, 4, 2, 2));
// Returns 3.
// display(num_of_live_neighbours(game1, 4, 1, 0));
// Returns 2.
// display(num_of_live_neighbours(game1, 4, 3, 3));
// Returns 2.

function next_generation(game, n){
    // display(num_of_live_neighbours(game,n,1,2));
    const res = [];
    for(let i=0;i<n;i=i+1){
        res[i] = [];
        for(let j=0;j<n;j=j+1){
            const t = num_of_live_neighbours(game,n,i,j);
            if(game[i][j] === 1){
                if(t < 2 || t > 3){
                    res[i][j] = 0;
                } else { 
                    res[i][j]  = 1;
                }
            } else {
                if(t === 3){
                    res[i][j] = 1;
                } else {
                    res[i][j] = 0;
                }
            }
        }
    }
    return res;
}

// var game1 = [[0, 0, 0, 0],
//              [0, 1, 0, 0],
//              [0, 0, 1, 1],
//              [0, 0, 0, 1]];
// next_generation(game1, 4);
// Returns a 2D array equal to
// [[0, 0, 0, 0],
//  [0, 0, 1, 0],
//  [1, 0, 1, 1],
//  [0, 0, 1, 1]].

// var game2 = [[0, 0, 0, 0, 0],
//              [0, 1, 1, 1, 0],
//              [0, 0, 1, 0, 0],
//              [0, 1, 1, 1, 0],
//              [0, 0, 0, 0, 0]];
// next_generation(game2, 5);
// Returns a 2D array equal to
// [[0, 0, 1, 0, 0],
//  [0, 1, 1, 1, 0],
//  [0, 0, 0, 0, 0],
//  [0, 1, 1, 1, 0],
//  [0, 0, 1, 0, 0]].

function make_first_line(words, page_width){
    function helper(n, xs, ans){
        if(is_empty_list(xs)){
            return ans;
        } else if(n <= 0){
            return ans;
        } else {
            const len = head(xs).length;
            if(len > n){
                return ans;
            } else {
                if(head(ans) === ''){
                    return helper(n-len-1, 
                            tail(xs), 
                            pair(head(xs), tail(xs)));
                } else {
                    return helper(n-len-1, 
                        tail(xs), 
                        pair(head(ans)+' '+head(xs), tail(xs)));
                }
            }
        }
    }
    return helper(page_width, words, pair("", []));
}

// const words = list("aa", "bbb", "cccc", "ddd", "ee");
// display(make_first_line(words, 13));
// Returns a result equal to
// pair("aa bbb cccc", list("ddd", "ee")).
// make_first_line(words, 100);
// Returns a result equal to
// pair("aa bbb cccc ddd ee", []).

function make_lines(words, page_width){
    if(is_empty_list(words)){
        return [];
    } else {
        const res = make_first_line(words, page_width);
        // display(res);
        return pair(head(res), make_lines(tail(res), page_width));
    }
}

// var words = list("aa", "bbb", "cccc", "ddd", "ee");
// make_lines(words, 13);
// Returns a result equal to
// list("aa bbb cccc", "ddd ee").
// make_lines(words, 100);
// Returns a result equal to
// list("aa bbb cccc ddd ee").

function make_pages(lines, page_height){
    function take(n, xs){
        return n === 0 ? [] : pair(head(xs), take(n-1, tail(xs)));
    }
    function drop(n, xs){
        return n === 0 ? xs : drop(n-1, tail(xs));
    }
    if(is_empty_list(lines)){
        return [];
    } else {
        const len = length(lines);
        if(len < page_height){
            return list(lines);
        } else {
            return pair(take(page_height, lines), make_pages(drop(page_height, lines), page_height));
        }
    }
}

// var lines = list("aa aaaa aa aaaa aa",
//                  "bbbb bb bbb bbbbb",
//                  "cccc ccccc cccc",
//                  "dddddd dd ddd dd",
//                  "eeee eee eeee eee",
//                  "ff ffff ffff fffff",
//                  "ggggg gg");
// make_pages(lines, 3);

function page_format(words, page_width, page_height){
    return make_pages(make_lines(words, page_width), page_height);
}

// var words = list("aa", "aaaa", "aa", "aaaa", "aa",
//                  "bbbb", "bb", "bbb", "bbbbb",
//                  "cccc", "ccccc", "cccc",
//                  "dddddd", "dd", "ddd", "dd",
//                  "eeee", "eee", "eeee", "eee",
//                  "ff", "ffff", "ffff", "fffff",
//                  "ggggg", "gg");
// page_format(words, 18, 3);

// Returns a result equal to
// list(list("aa aaaa aa aaaa aa",
//       "bbbb bb bbb bbbbb",
//       "cccc ccccc cccc"),
//  list("dddddd dd ddd dd",
//       "eeee eee eeee eee",
//       "ff ffff ffff fffff"),
//  list("ggggg gg")
// );

function is_prefix_of(sub, seq) {
    if(is_empty_list(sub)){
        return true;
    } else if(is_empty_list(seq)){
        return false;
    } else if(head(sub) === head(seq)){
        return is_prefix_of(tail(sub), tail(seq));
    } else {
        return false;
    }
}

display(is_prefix_of(list("a", "b", "c"),
             list("a", "b", "c", "d", "e")));
// Returns true.
display(is_prefix_of(list("b", "c"),
             list("a", "b", "c", "d", "e")));
// Returns false.
display(is_prefix_of(list("a", "b", "c"),
             list("a", "b", "c")));
// Returns true.
display(is_prefix_of(list("a", "b", "c"),
             list("a", "b")));
// Returns false.
display(is_prefix_of(list(), list("a", "b", "c")));
// Returns true.
display(is_prefix_of(list(), list()));
// Returns true.

function sublist_replace(new_sub, old_sub, seq){
    function tail_n_times(n, xs){
        if(n === 0){
            return xs;
        } else {
            return tail_n_times(n-1, tail(xs));
        }
    }
    // display(tail_n_times(2, list(1,2,3)));
    const len = length(old_sub);
    if(is_empty_list(seq)){
        return [];
    } else{
        if(is_prefix_of(old_sub, seq)){
            return append(new_sub, sublist_replace(new_sub, old_sub, tail_n_times(len, seq)));
        } else {
            return pair(head(seq), sublist_replace(new_sub, old_sub, tail(seq)));
        }
    }
}

sublist_replace(list("x"), list("a", "b", "a"),
                list("a", "b", "a", "b", "a", "b", "a"));
// Returns a result equal to
// list("x", "b", "x").

sublist_replace(list("x", "y", "z"), list("a", "b"),
                list("a", "b", "c", "d", "e", "a", "b"));
// Returns a result equal to
// list("x", "y", "z", "c", "d", "e", "x", "y", "z").

sublist_replace(list("x", "y"), list("p", "q", "r"),
                list("a", "b", "a", "b", "a", "b", "a"));
// Returns a result equal to
// list("a", "b", "a", "b", "a", "b", "a").

function is_subseq_at(sub, seq, start_pos){
    let cnt = 0;
    let flag = false;
    for(let i = start_pos; i < seq.length; i = i + 1){
        if(cnt === sub.length){
            break;
        } else if(sub[cnt] !== seq[i]){
            flag = true;
            break;
        } else {
            if(i+1<seq.length){cnt = cnt + 1;} else {}
        }
    }
    
    if(flag || cnt < sub.length-1){
        return false;
    } else {
        // display(cnt);
        return true;
    }
}

// is_subseq_at(["a", "b", "c"],
//              ["a", "b", "c", "d", "e"], 0);
// // Returns true.
// is_subseq_at(["b", "c"],
//              ["a", "b", "c", "d", "e"], 1);
// // Returns true.
// is_subseq_at(["a", "b", "c"],
//              ["a", "a", "a", "b", "c"], 2);
// // Returns true.
// is_subseq_at(["a", "b", "c"],
//              ["a", "b", "c", "a", "b", "c"], 4);
// // Returns false.
// is_subseq_at(["a", "b", "c"],
//              ["a", "a", "b", "b", "c"], 1);
// // Returns false.
// is_subseq_at([],
//              ["a", "b", "c"], 1);
// // Returns true.

function copy_array(arr){
    const res = [];
    for(let i = 0; i < arr.length; i = i + 1){
        res[i] = arr[i];
    }
    return res;
}

function subarray_replace(new_sub, old_sub, seq){
    const res = copy_array(seq);
    const len = new_sub.length;
    let i = 0;
    for(i = 0; i < seq.length; i = i + 1){
        if(is_subseq_at(old_sub, res, i)){
            display(old_sub);
            display(res);
            display(i);
            for(let j = 0; j < len; j = j + 1){
                seq[i+j] = new_sub[j];
            }
            i = i + len;
        } else {
            seq[i] = res[i];
        }
    }
    return seq;
}

// var seq = ["a", "b", "a", "b", "a", "b", "a"]; 
// subarray_replace(["x", "y", "z"], ["a", "b", "a"], seq);
// seq;
// // Equal to the array
//      // ["x", "y", "z", "b", "x", "y", "z"].

// var seq = ["a", "b", "a", "b", "a", "b", "a"]; subarray_replace(["x", "y", "a"], ["a", "b", "a"], seq); seq; // Equal to the array
//      // ["x", "y", "a", "b", "x", "y", "a"].


// var seq = ["a", "b"];
// subarray_replace(["x", "y"], ["a", "b"], seq); seq; // Equal to the array
//      // ["x", "y"].

var seq = ["a", "b", "a", "b", "a", "b", "a"]; subarray_replace(["x", "y"], ["a", "a"], seq); seq; // Equal to the array
     // ["a", "b", "a", "b", "a", "b", "a"].

// is_subseq_at(["a", "a"],["a", "b", "a", "b", "a", "b", "a"],6);