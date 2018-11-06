parse_and_evaluate("let x = 2;\
function f(y) {\
    x = 3;\
    display(y); \
    return y;\
}\
let z = f(x);\
x = 4;\
display(z);");

parse_and_evaluate("let x = 2; let y=x + 1; x=3; y;"); 
parse_and_evaluate("let x = 2;let y = x * x;x = 3;y;");
parse_and_evaluate("let x = 2;let y = 5;let z = 10;\
let temp1 = x * y;\
let temp2 = temp1 + z;\
display(temp1); \
display(temp2); \
x = 3;\
y = 6;\
z = 9;\
display(temp1); \
display(temp2);");

parse_and_evaluate("\
let x = 1;let y=2;\
function f(a, b) {\
    display(a);\
    let x = 3;\
    display(a);\
    y = 4;\
    display(b);\
}\
f(x,y);");
// 1 1 4
parse_and_evaluate("\
let x=1;let y=2;\
function f(x) {return x+10;}\
let z=pair(f(x),y);\
display(z);\
x=2;\
display(z);");
//[11, 2]
//[12, 2]

parse_and_evaluate("\
let x = 1;const y = x => x + 2;\
x=3;\
y(x);");
//5
parse_and_evaluate("\
let x = 1;let a = 1;\
let y = p => p + a;\
let z = y(x);\
display(z);\
x = 10;\
y = p => p * x;\
z;");
//2 100

parse_and_evaluate("\
let a = 10;\
let x=(p=>p+a)(10);\
display(x);\
a=20;\
display(x);");
// 20 30
parse_and_evaluate("\
    let y = 10;let x = 10;\
    function f(x){\
        if(y>x) {y=x;return x;}\
        else {return x+1;}\
    }\
    y=x+10;\
    display(f(y));\
    display(y);\
    y=x;");
//21 20 10
parse_and_evaluate("\
    x=list(1,2,3);\
    y=pair(10,x);\
    x=list(2,3);\
    y;");
//[10, [2, [3, []]]]
