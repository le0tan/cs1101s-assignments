var searchMatrix = function(matrix, target) {
    const rows = matrix.length;
    if(rows === 0){
        return false;
    } else {
        const cols = matrix[0].length;
        let ok = false;
        let i = 0;
        let j = cols-1;
        while(i < rows && j >= 0){
            if(matrix[i][j] === target){
                ok = true;
                break;
            } else if(matrix[i][j] > target){
                j = j - 1;
            } else {
                i = i + 1;
            }
        }
        return ok;
    }
};