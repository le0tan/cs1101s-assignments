// Keep calm and write helper functions!
// ==================== Task 3A ====================

function swap(matrix, k){
    function get_first(r){
        let ans = array_length(r);
        for(let i = 0; i < array_length(r); i = i + 1){
            if(r[i] !== 0){
                ans = i;
                break;
            } else { }
        }
        return ans;
    }
    function copy_array(arr){
        const ans = [];
        for(let i = 0; i < array_length(arr); i = i + 1){
            ans[i] = arr[i];
        }
        return ans;
    }
    // find the row to swap
    const cur_row = matrix[k];
    let first_non_zero_of_k = get_first(cur_row);
    for(let i = k+1; i < array_length(matrix); i = i + 1){
        if(get_first(matrix[i]) < first_non_zero_of_k){
            // swap row k and row i
            const t = copy_array(matrix[k]);
            matrix[k] = copy_array(matrix[i]);
            matrix[i] = t;
            break;
        } else {}
    }
    return matrix;
}


//Task 3A Tests
//Assert test cases run independently. This is fine.
assert("3A_0", () => swap([[0]], 0), 
    [[0]], []);
    
assert("3A_1", () => swap([[-1]], 0), 
    [[-1]], []);

let test_matrix1 = 
    [[0, 2, 1, -8],
    [1, -2, -3, 0],
    [-1, 1, 2, 3]];

assert("3A_2", () => swap(test_matrix1, 0), 
    [[1, -2, -3, 0],
    [0, 2, 1, -8],
    [-1, 1, 2, 3]], []);
    
assert("3A_3", () => swap(test_matrix1, 1),
    [[0, 2, 1, -8],
    [1, -2, -3, 0],
    [-1, 1, 2, 3]], []);
    
assert("3A_4", () => swap(test_matrix1, 2),
    [[0, 2, 1, -8],
    [1, -2, -3, 0],
    [-1, 1, 2, 3]], []);
    
let test_matrix2 = 
    [[0, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]];
    
assert("3A_5", () => swap(test_matrix2, 0),
    [[0, 1, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]], []);
    
assert("3A_6", () => swap(test_matrix2, 2),
    [[0, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]], []);
    
let test_matrix3 = 
    [[0, 0, 0, 1],
    [1, 1, 0, 1],
    [0, 0, 1, 1]];
    
assert("3A_7", () => swap(test_matrix3, 0),
    [[1, 1, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 1, 1]], []);

assert("3A_8", () => swap(swap(test_matrix3, 0), 1),
    [[1, 1, 0, 1],
    [0, 0, 1, 1],
    [0, 0, 0, 1]], []);
    

// ==================== Task 3B ====================

function eliminate(matrix, k){
    function get_first(r){
        let ans = array_length(r);
        for(let i = 0; i < array_length(r); i = i + 1){
            if(r[i] !== 0){
                ans = i;
                break;
            } else { }
        }
        return ans;
    }
    function sub(a, b, n){
        // subtract n * b from a
        const res = [];
        for(let i = 0; i < array_length(a); i = i + 1){
            res[i] = a[i] - n * b[i];
        }
        return res;
    }
    const leftmost = get_first(matrix[k]);
    const x = matrix[k][leftmost];
    for(let i = k+1; i < array_length(matrix); i = i + 1){
        const n = matrix[i][leftmost] / x;
        matrix[i] = sub(matrix[i], matrix[k], n);
    }
    return matrix;
}

//Task 3B Tests
assert("3B_0", () => eliminate([[0]], 0), 
    [[0]], ["swap"]);
    

let test_matrix4 = [[1, -2, -3, 0],
    [0, 2, 1, -8],
    [-1, 1, 2, 3]];

assert("3B_1", () => eliminate(test_matrix4, 0),
    [[1, -2, -3, 0],
    [0, 2, 1, -8],
    [0, -1, -1, 3]], ["swap"]);
    
assert("3B_2", () => eliminate(eliminate(test_matrix4, 0), 1),
    [[1, -2, -3, 0],
    [0, 2, 1, -8],
    [0, 0, -0.5, -1]], ["swap"]);
    
let test_matrix5 = 
    [[1, 0, 1, 1],
    [-1, 0, 1, 1],
    [0, 0, 1, 1]];
    
assert("3B_2", () => eliminate(test_matrix5, 0),
    [[1, 0, 1, 1],
    [0, 0, 2, 2],
    [0, 0, 1, 1]], ["swap"]);
    
assert("3B_3", () => eliminate(eliminate(test_matrix5, 0), 1),
    [[1, 0, 1, 1],
    [0, 0, 2, 2],
    [0, 0, 0, 0]], ["swap"]);

// ==================== Task 3C ====================

function gaussian_elimination(matrix){
    const rows = array_length(matrix);
    const cols = array_length(matrix[0]);
    for(let i = 0; i < rows; i = i + 1){
        for(let j = i; j < rows; j = j + 1){
            swap(matrix, j);
        }
    }
    for(let i = 0; i < rows; i = i + 1){
        eliminate(matrix, i);
    }
    return matrix;
}

//Task 3C Tests
//If the rows are scalar multiples of the solution, its fine.
//The test cases aren't very good: there may be other valid solutions.
//The "correct" way to test is if they have the same RREF 
//and are upper triangular.
assert("3C_0", () => gaussian_elimination([[0]]), [[0]], 
    ["swap", "eliminate"]);

let test_matrix6 = [[0, 2, 1, -8],
    [1, -2, -3, 0],
    [-1, 1, 2, 3]];
    
assert("3C_1", () => gaussian_elimination(test_matrix6), 
    [[1, -2, -3, 0],
    [0, 2, 1, -8],
    [0, 0, -0.5, -1]], ["swap", "eliminate"]);
    
let test_matrix7 = 
    [[1, 0, 1, 1],
    [-1, 0, 1, 1],
    [0, 0, 1, 1]];
    
    
assert("3C_2", () => gaussian_elimination(test_matrix7), 
    [[1, 0, 1, 1],
    [0, 0, 2, 2],
    [0, 0, 0, 0]], ["swap", "eliminate"]);
    
let test_matrix8 = 
    [[1, -2, -6, 12],
    [2, 4, 12, -17],
    [1, -4, -12, 22]];
    
assert("3C_3", () => gaussian_elimination(test_matrix8),
    [[1, -2, -6, 12],
    [0, 8, 24, -41],
    [0, 0, 0, -0.25]], ["swap", "eliminate"]);
    
let test_matrix9 = 
    [[1, 1, 0, 0, 0],
    [1, 0, 0, 1, 4],
    [0, 1, 1, 0, 1],
    [0, 1, 0, 1, 2],
    [0, 0, 1, 1, 10]];
    
assert("3C_4", () => gaussian_elimination(test_matrix9),
    [[1, 1, 0, 0, 0],
    [0, -1, 0, 1, 4],
    [0, 0, 1, 1, 5],
    [0, 0, 0, 2, 6],
    [0, 0, 0, 0, 5]], ["swap", "eliminate"]);