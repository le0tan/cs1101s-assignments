// My contest entry
function three_d_contest_Tan_Yuanhong() {
    const p = scale(10, green(circle_bb));
    const add_a = math_PI*0.09;
    const add_d = 1.8;
    function place(pic, angle, dist){
        return translate(
            dist * math_cos(angle), dist * math_sin(angle), pic);}
    function op(pic, ans, n, angle, dist){
        return n === 0
                  ? ans
                  : op(pic,overlay_frac(
                                0.008, place(pic, angle, dist), ans),
                       n - 1, angle + add_a, dist + add_d);}
    return scale(0.0026, op(p, p, 200, 0, 0));
}

// hollusion(three_d_contest_Tan_Yuanhong());