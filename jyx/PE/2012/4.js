var my_a = [[1, 13, 27, 45, 67], [3, 19, 46, 47, 71], [15,20, 47, 81, 82], [31,32, 50, 85, 90], [55,66, 77, 88, 99] ];
function catch_me(x, a){
    const n = array_length(a);
    let i = 0; let j = 0;
    const fnd = false;
    while(j<n){
        if(a[i][j] === x){
            fnd=true;break;
        } else if(a[i][j] > x){
            break;
        } else {
            j=j+1;
        }
    }
    if(fnd) {
        return true;
    } else{
        j=j-1;i=i+1;
    }
    while(i<n && j<n && i>=0 && j>=0) {
        if(a[i][j] === x) {
            fnd = true;
            break;
        } else if(x < a[i][j]) {
            j = j - 1;
        } else {
            i = i + 1;
        }
    }
    return fnd;
}

