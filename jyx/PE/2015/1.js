function make_2D_zero_array(rows, cols) {
    const a = [];
    for(let i = 0;i < rows; i = i + 1) {
        a[i] = [];
        for(let j = 0; j<cols;j=j+1) {
            a[i][j]=0;
        }
    }
    return a;
}
function num_of_live_neighbours(game, n, r, c) {
    const a = [[1,0], [0,1], [0,-1],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]];
    let cnt =0;
    for(let i =0; i<8;i=i+1) {
        const x = (r + a[i][0] + n)%n;
        const y = (c + a[i][1] + n)%n;
        cnt= cnt+game[x][y];
    }
    return cnt;
}
function next_generation(game,n) {
    const nxt = [];
    for(let i =0;i<n;i=i+1){
        nxt[i]=[];
        for(let j=0;j<n;j=j+1) {
            const num = num_of_live_neighbours(game,n,i,j);
            if(game[i][j] === 1) {
                if(num < 2 || num>3) {
                    nxt[i][j]=0;
                } else {
                    nxt[i][j]=1;
                }
            } else {
                if(num===3){
                    nxt[i][j]=1;
                }else {
                    nxt[i][j]=0;
                }
            }
        }
    }
    return nxt;
}
