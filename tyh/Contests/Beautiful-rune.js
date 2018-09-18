// My contest entry
function two_d_contest_Tan_Yuanhong() {
    const tar = scale_independent(0.8,1,blue(heart_bb));
    const trans = pic => scale_independent(1.2,2.25,rotate(0.1*math_PI,pic));
    const op = (n,pic) => (n === 1 ? trans(pic)
                                   : stack(trans(op(n-1,pic)),pic));
    return scale(0.008,op(100,tar));
}

// testing:
// show(two_d_contest_Tan_Yuanhong());