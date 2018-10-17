/**
 * question2
 */
function memoize(g){
    let mem = [];
    function f(x){
        if(mem[x] !== undefined){
            return mem[x];
        } else {
            mem[x] = g(x);
            return mem[x];
        }
    }
    return f;
}

function fib(x){
    if(x === 0){
        return 0;
    } else if(x === 1){
        return 1;
    } else {
        return mfib(x-1) + mfib(x-2);
    }
}

const mfib = memoize(fib);

function fib_a(n){
    let mem = [];
    mem[0] = 0;
    mem[1] = 1;
    for(let i = 2; i <= n; i = i + 1){
        mem[i] = mem[i - 1] + mem[i - 2];
    }
    return mem[n];
}

function fib_b(n){
    let a = 0;
    let b = 1;
    for(let i = 2; i <= n; i=i+1){
        a = a + b;
        b = a + b;
        a = b - a;
        b = b - a;
    }
    return n === 0 ? a : b;
}

fib_a(1000) === fib_b(1000);


/**
 * question3
 */
// merge sort

function merge_sort(A) {
    merge_sort_helper(A, 0, array_length(A) - 1);
}

function merge_sort_helper(A, low, high) {
    if (low < high) {
        const mid = math_floor((low + high) / 2);
        merge_sort_helper(A, low, mid);
        merge_sort_helper(A, mid + 1, high);
        merge(A, low, mid, high);
    } else {}
}

function merge(A, low, mid, high) {
    const B = [];  // temporary array
    let left = low;
    let right = mid + 1;
    let Bidx = 0;

    while (left <= mid && right <= high) {
        if (A[left] <= A[right]) {
            B[Bidx] = A[left];
            left = left + 1;
        } else {
            B[Bidx] = A[right];
            right = right + 1;
        }
        Bidx = Bidx + 1;
    }

    while (left <= mid) {
        B[Bidx] = A[left];
        Bidx = Bidx + 1;
        left = left + 1;
    }

    while (right <= high) {
        B[Bidx] = A[right];
        Bidx = Bidx + 1;
        right = right + 1;
    }

    for (let k = 0; k < high - low + 1; k = k + 1) {
        A[low + k] = B[k];
    }
}

// linear search

function linear_search(a, v) {
    let len = array_length(a);
    let result = false;
    for (let i = 0; i < len; i = i + 1) {
        if (a[i] === v) { 
            result = true;
        } else {}
    }
    return result;
}

// binary search

function binary_search(a, v) {
    function search(low, high) {
        if (low === high) {
            return a[low] === v;
        } else {
            let mid = math_floor((low + high) / 2);
            return (v === a[mid]) 
                   ||((v < a[mid]) 
                   ? search(low, mid - 1)
                   : search(mid + 1, high));
        }
    }
    return search(0, array_length(a) - 1);
}

// make_search takes an array and
// returns a function that searches
// in that array for a given value

function make_search(A) {
    return x => linear_search(A, x);
}


function make_optimized_search(A) {
    const len = array_length(A);
    let t = [];
    for(let i = 0; i < len; i = i + 1){
        t[i] = A[i];
    }
    merge_sort(t);
    return x => binary_search(t, x);
}

let my_array = [3,41,20,1,5,16,4,0,14,6,17,8,4,0,2]; 
let my_search = make_optimized_search(my_array); 
my_search(2); // returns true