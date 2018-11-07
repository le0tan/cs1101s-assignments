 /** 
  * 1. 0; because when evaluating the function, it would create
  * a new frame where a new x independent of the x in the global
  * environment is created and used within the function.
  * 
  * 2. To change values in a pair/list, we only have set_head and set_tail,
  * which means we can never set a pair/list to an empty list. When evaluating
  * a function, if we pass a pair/list as parameter, it would create
  * a new frame where the parameter identifier points to the original pair/list.
  * We cannot assign a pair/list to this identifier because that would only
  * cause it to point to a new pair/list. We may only use this reference
  * via set_tail/head to alter the original pair/list.
  * 
  * 3. 
  * 
  * 4. reverse the list
  * 
  * 5. 
  * 
  * **/

 let a = 10; 
 function foo(x) {
     let b = 0;
     function goo(x) { 
         let a = 30;
           // Breakpoint #1// (a: 30, b: 1, x: 3)
           // (a: 30, b: 1, x: 2)
         if (x <= 2) { 
             a = a + x;
             b = b + x;
             // Breakpoint #2
             // (a: 32, b: 3, x: 2)
         } else {
             goo(x - 1);
         } 
     }
     // Breakpoint #3
     // (a: 10, b: 0, x: 1)
     a = a + x;
     b = b + x;
     // Breakpoint #4 
     // (a: 11, b: 1, x: 1)
     goo(3);
     // Breakpoint #5
     // (a: 11, b: 3, x: 1)
 }
 // Breakpoint #6
 // (a: 10, b: undefined, x: undefined)
 foo(1);
 // Breakpoint #7
 // (a: 11, b: undefined, x: undefined)

const a = pair(1,2);
//return 3
const x1 = list(1,2,3);
//return 4
const b2 = pair(1,a);
const x2 = pair(b,a);
//return 7
const b3 = pair(a,a);
const x3 = pair(b,b);
//doesn't return
const x4 = list(1,2,3);
set_tail(tail(tail(x4)),x4);

function cp(x){
    if(!is_pair(x)){
        return 0;
    } else if(!is_pair(head(x))){
        //never accessed
        set_head(x, pair("accessed", head(x)));
        return 1 + cp(tail(head(x))) + cp(tail(x));
    } else {
        //may be accessed
        if(head(head(x))==="accessed"){
            //was accessed
            return 0;
        } else {
            set_head(x, pair("accessed", head(x)));
            return 1 + cp(tail(head(x))) + cp(tail(x));
        }
    }
}

function cp2(x){
    let mem = [];
    function helper(xs){
        if(!is_pair(xs)){
            return 0;
        } else {
            let flag = false;
            for(let i = 0; i < array_length(mem); i = i + 1){
                if(mem[i] === xs){
                    flag = true;
                    break;
                } else { }
            }
            if(flag){
                return 0;
            } else {
                const len = array_length(mem);
                mem[len] = xs;
                return 1 + helper(head(xs)) + helper(tail(xs));
            }
        }
    }
    return helper(x);
}