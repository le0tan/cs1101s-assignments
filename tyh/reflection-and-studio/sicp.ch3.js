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