function s_generator(pt) {
    const x = x_of(pt);
    const y = y_of(pt);
    function helper(t){
        if(t <= 1/2){
            const term1 = (t * 2 * (3 / 4));
            return make_point(math_cos(2 * math_PI * term1),
                              math_sin(2 * math_PI * term1) + 1);
        } else {
            const term2 = -(t * 2 * (3 / 4));
            return make_point(math_cos(2 * math_PI * term2),
                              math_sin(2 * math_PI * term2) - 1);
        }
    }
    return helper;
}

(draw_connected_squeezed_to_window(200))(s_generator(make_point(0.5, 0.25)));