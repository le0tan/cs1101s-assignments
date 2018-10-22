//3.1
function make_accumulator(x){
    function f(m){
        x = x + m;
        return x;
    }
    return f;
}
//3.2
function make_monitored(f){
    let cnt = 0;
    function g(m){
        if(m === "how many calls?"){
            return cnt;
        } else {
            cnt = cnt + 1;
            return f(m);
        }
    }
    return g;
}
//3.3
function make_account(x, pswd){
    function depo(m){
		x = x + m;
		return x;
    }

	function wd(m){
		if(x >= m){
			x = x - m;
			return x;
        } else {
			return "insufficient balance!";
        }
    }

    function f(p, cmd){
        if(p !== pswd){
            return x => "incorrect password";//!!
        } else {
            if(cmd === "deposit"){
				return depo;
            } else if(cmd === "withdraw"){
				return wd;
            } else {
				return x => "invalid command!";//!!
            }
        }
    }
    return f;
}
//3.4
function make_account(x, pswd){
    let wrong = 0;

    function call_the_cops(){
        display("woo~");
    }

    function depo(m){
		x = x + m;
		return x;
    }

	function wd(m){
		if(x >= m){
			x = x - m;
			return x;
        } else {
			return "insufficient balance!";
        }
    }

    function f(p, cmd){
        if(p !== pswd){
            wrong = wrong + 1;
            if(wrong > 7){
                call_the_cops();
            } else {
                return x => "incorrect password";
            }
        } else {
            wrong = 0;
            if(cmd === "deposit"){
				return depo;
            } else if(cmd === "withdraw"){
				return wd;
            } else {
				return x => "invalid command!";
            }
        }
    }
    return f;
}

//3.18

function cyc(xs){
    function ap(arr, x){
        arr[array_length(arr)] = x;
    }
    
    let vis = [];
    
    function helper(lst){
        if(is_empty_list(lst)){
            return false;
        } else {
            let i = 0;
            let ok = true;
            while(vis[i] !== undefined){
                if(vis[i] === lst){
                    ok = false;
                    break;
                } else {
                    i = i + 1;
                }
            }
            if(ok){
                vis[i] = lst;
                return helper(tail(lst));
            } else {
                return true;
            }
        }
    }
    return helper(xs);
}

const a = pair(1, []);
const b = pair([], a);
set_tail(a, b);

//3.19

function cyc2(xs){
    
    function helper(one, two){
        if(is_empty_list(one) || is_empty_list(two) || is_empty_list(tail(two))){
            return false;
        } else {
            if(one === two){
                return true;
            } else {
                return helper(tail(one), tail(tail(two)));   
            }
        }
    }
    
    if(is_empty_list(xs)){
        return false;
    } else if(is_empty_list(tail(xs))){
        return false;
    } else {
        return helper(tail(xs), tail(tail(xs)));    
    }
}

//3.21

function make_queue(){
    return pair([],[]);
}

function front_ptr(queue){
    return head(queue);
}

function end_ptr(queue){
    return tail(queue);
}

function is_empty_queue(queue){
    return is_empty_list(front_ptr(queue));
}

function set_front(queue, x){
    set_head(queue, x);
}

function set_end(queue, x){
    set_tail(queue, x);
}

function dequeue(queue){
    if(is_empty_queue(queue)){
        return 'aaa';
    } else {
        set_front(queue, tail(front_ptr(queue)));
    }
}

function insert(queue, x){
    const n = pair(x, []);
    if(is_empty_queue(queue)){
        set_front(queue, n);
        set_end(queue, n);
    } else {
        set_tail(end_ptr(queue), n);
        set_end(queue, n);
    }
}

function print_queue(queue){
    display(front_ptr(queue));
}

const a = make_queue();
insert(a, 1);
insert(a, 1);
dequeue(a);
print_queue(a);

//3.22
function make_queue_internal(){
    function front_ptr(...) ...
    function rear_ptr(...) ...
    //definitions of internal functions
    function dispatch(m) ...
    return dispatch;
}

//dequeue