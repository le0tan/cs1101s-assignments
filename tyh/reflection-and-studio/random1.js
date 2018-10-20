function bs(xs, x){
    const len = array_length(xs);
    let l = 0;
    let r = len -1;
    let m = l;
    let ans = -1;
    while(l <= r){
        m = math_floor((l+r)/2);
        if(xs[m] === x){
            ans = m;
            break;
        } else if(xs[m] > x){
            r = m - 1;
        } else {
            l = m + 1;
        }
    }
    return ans;
}

bs([1,2,3],2);

function swap(arr, a, b){
    const t = arr[a];
    arr[a] = arr[b];
    arr[b] = t;
}

function ss(xs){
    const len = array_length(xs);
    for(let i = 0; i <= len - 2; i = i + 1){
        let smallest = i;
        for(let j = i + 1; j < len; j = j + 1){
            if(xs[j] < xs[smallest]){
                smallest = j;
            } else {}
        }
        swap(xs, i, smallest);
    }
    return xs;
}

function inss(xs){
    const len = array_length(xs);
    for(let i = len - 2; i >= 0; i = i - 1){
        const t = xs[i];
        for(let j = i + 1; j < len; j = j + 1){
            if(xs[j] < t){
                swap(xs, j, j - 1);
            } else{}
        }
    }
    return xs;
}

function inss2(xs){
    const len = array_length(xs);
    for(let i = 1; i < len; i = i + 1){
        const cur = xs[i];
        let j = 0;
        for(j = i - 1; j >= 0; j = j - 1){
            if(xs[j] > cur){
                xs[j + 1] = xs[j];
            } else {
                break;
            }
        }
        xs[j + 1] = cur;
    }
    return xs;
}

function f(x){
    if(x === -1){
        return (t => t + 1)(1);
    } else {
        return undefined;
    }
}

function g(x){
    if(x === -1){
        const k = 1;
        return (t => t + 1)(k);
    } else {
        return undefined;
    }
}

function k(x){
    if((x => x)(x) === 1){
        const a = 1;
        return a;
    } else {}
}

// k(1);
inss2([1,3,2]);