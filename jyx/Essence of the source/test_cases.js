/*
parse_and_evaluate("\
const a = list(1,2);\
const b = list(3,4);\
display(a+b);\
display(1+1);");
/*
parse_and_evaluate("\
function multiply_by_ten(x) {\
    return x * 10;\
}\
display(multiply_by_ten > list(1, 2, 3));\
math_abs > list(5, -10, 15, 20, -25);");
*/


/*
parse_and_evaluate("function g(a1, a2, a3, a4, a5, a6) {\
    return a1 + a2 + a3 + a4 + a5 + a6;\
}\
const g1 = g(1, 2);\
const g2 = g1(3, 4, 5);\
g2(6);");
*/
/*
parse_and_evaluate("function f(x, y) {\
    return math_pow(x, y);\
}\
const f1 = f(5);\
f1(3);");
*/

/*
parse_and_evaluate("function f1(a, b, c, d) {\
    return a * b + c * d;\
}\
const f2 = f1(3, 5);\
const f3 = f2(2);\
f3(8);");
*/
/*
parse_and_evaluate("\
function list_call(f, params) {\
    function helper(g, params_left) {\
        if (is_empty_list(params_left)) {return g;}\
        else {return helper(g(head(params_left)), tail(params_left));}\
    }\
    if(is_empty_list(params)){\
        return f() ;\
    }else {return helper(f, params);}\
}\
function f(a, b, c, d) {\
    return a * b + c * d;\
}\
function f2(a, b, c, d) {\
    return a+b+c+d;\
}\
display(list_call(f, list(3, 5, 2, 8)));\
display(list_call(f2, list(1, 2, 3, 4)));\
function f3(){\
    return 0;\
}\
display(list_call(f3,list()));");
*/
