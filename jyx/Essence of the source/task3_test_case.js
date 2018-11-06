parse_and_evaluate("\
function filter(pred, xs){\
    if(is_empty_list(xs)){return [];}\
    else if(pred(head(xs))) {return pair(head(xs),filter(pred,tail(xs)));}\
    else {return filter(pred,tail(xs));}\
}\
function map(f, xs){\
    if(is_empty_list(xs)){return [];}\
    else{return pair(f(head(xs)),map(f,tail(xs)));}\
}\
function accumulate(f, init,xs){\
    if(is_empty_list(xs)){return init;}\
    else {return f(head(xs),accumulate(f,init,tail(xs)));}\
}\
function append(x,y){\
    if(is_empty_list(x)){return y;}\
    else {return pair(head(x),append(tail(x),y));}\
}\
const even_filter = filter(x => x % 2 === 0);\
display(even_filter(list(1, 2, 3, 4)));\
const list_squarer = map(x => x * x);\
display(list_squarer(list(1, 2, 3)));\
const list_flattener = accumulate(append, []);\
display(list_flattener(list(list(1, 2), list(3), list(4, 5))));");
