/***************************************
 * Memoized stream
***************************************/
function memo_fun(fun) {
    let already_run = false;
    let result = undefined;

    function mfun() {
        if (!already_run) {
            result = fun();
            already_run = true;
            return result;
        } else {
            return result;
        }
    }
    return mfun;
}

function msgfun(msg, fun) {
    function f() {
        display(msg);
        return fun();
    }
    return f;
}

function m_integers_from(n) {
    return pair(n, 
        memo_fun(
            msgfun("M: " + n, 
                   () => m_integers_from(n + 1))));
}

const m_integers = m_integers_from(1);

//stream_ref(m_integers, 0);
//stream_ref(m_integers, 2);
//stream_ref(m_integers, 5);
//stream_ref(m_integers, 5);

// Usage of the memo_fun function

function fib_gen(a, b){
    return pair(a, memo_fun(() => fib_gen(b, a+b)));
}


/***************************************
 * Memoized search
***************************************/

// the same memoize function...
function memoize(f) {
    const mem = [];
    
    function mf(x) {
        if (mem[x] !== undefined) {
            return mem[x];
        } else {
            const result = f(x);
            mem[x] = result;
            return result;
        }
    }
    
    return mf;
}


//...but observe how it is used here:
// the recursive calls use mtrib,
// and not the original trib function

const mtrib = 
    memoize(n => (n === 0) ? 
        0 : (n === 1) ? 
            1 : (n === 2) ? 
                1 : mtrib(n - 1) + 
                    mtrib(n - 2) + 
                    mtrib(n - 3)
    );

mtrib(100);
