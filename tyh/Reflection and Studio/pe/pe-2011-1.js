// Q1
function average_of_less_than(n, list){
    const t = filter(x => x < n, list);
    const len = length(t);
    function sum(lst){
        if(is_empty_list(lst)){
            return 0;
        } else {
            return head(lst) + sum(tail(lst));
        }
    }
    if(len === 0){
        return 0;
    } else {
        return sum(t) / len;
    }
}

average_of_less_than(2, list(1,1,4,2)); //returns 1 
average_of_less_than(5, list(10, 10, 40, 30)); //returns 0 
average_of_less_than(5, list(1, 2, 3, 4, 5, 6, 7)); //returns 2.5 
average_of_less_than(5, list(1, 5, 2, 6, 3, 7, 4)); //returns 2.5

// Q2
function make_fib_queue(){
    // make each element an object {value: x, rem: n}
    return {queue: [], count: 0};
}

function push(obj, n){
    function fib(n){
        const mem = [1, 1];
        function h(k){
            if(mem[k] !== undefined){
                return mem[k];
            } else {
                mem[k] = h(k-1) + h(k-2);
                return mem[k];
            }
        }
        return h(n);
    }
    // obj.queue[array_length(obj.queue)] = {value: n, rem: fib(obj.count)};
    const elem = {value: n, rem: fib(obj.count)};
    obj.queue[array_length(obj.queue)] = elem;
    // display(stringify(elem));
    // display(stringify({value: n, rem: fib(obj.count)}));
    obj.count = obj.count + 1;
}

function pop(obj){
    // display(stringify(obj.queue[0]rem));
    let ok = undefined;
    for(let i = 0; i < array_length(obj.queue); i = i + 1){
        if(obj.queue[i].rem > 0){
            obj.queue[i].rem = obj.queue[i].rem - 1;
            ok = obj.queue[i].value;
            break;
        } else {
            
        }
    }
    if(ok !== undefined){
        return ok;
    } else {
        error('Wrong!');
    }
}

const q = make_fib_queue();
push(q, 5);
push(q, 4);
push(q, 10);
push(q, 23);
push(q, 1);
pop(q); // returns 5
pop(q); // returns 4    
pop(q); // returns 10
pop(q); // returns 10
pop(q); // returns 23
pop(q); // returns 23
pop(q); // returns 23
pop(q); // returns 1
pop(q); // returns 1
pop(q); // returns 1
pop(q); // returns 1
pop(q); // returns 1
pop(q); // error message