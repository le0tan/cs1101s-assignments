function Tan_YuanHong_curve_contest() {
    const to_polar = x => x * 12 * math_PI;
    function polar_to_cardi(theta, r){
        return make_point(r * math_cos(theta), r * math_sin(theta));}
    function r(theta){
        return math_pow(math_E, math_sin(theta))
               - 2 * math_cos(4 * theta)
               + math_pow(math_sin((2 * theta - math_PI) / 24), 5);}
    const curve = t => polar_to_cardi(to_polar(t), r(to_polar(t)));
    return (draw_connected_full_view(2000))(curve);
}

// Tan_YuanHong_curve_contest();