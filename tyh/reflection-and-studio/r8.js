function make_stack() {
    const stack = pair("stack", []);
    return stack;
}

const my_stack = make_stack();

function is_empty(stack) {
    return is_empty_list(tail(stack));
}

function clean(stack){
    set_tail(stack, []);
}

function peek(stack){
    if(is_empty(stack)){
        display("stack underflow");
    } else {
        return head(tail(stack));
    }
}

function push(stack, elem){
    let t = pair(elem, tail(stack));
    set_tail(stack, t);
}

function pop(stack){
    if(is_empty(stack)){
        display("stack underflow");
    } else {
        let t = tail(tail(stack));
        const ans = peek(stack);
        set_tail(stack, t);
        return ans;
    }
}

push(my_stack, 42);
pop(my_stack);
my_stack;