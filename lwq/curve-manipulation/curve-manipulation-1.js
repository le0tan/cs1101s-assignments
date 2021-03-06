function reflect_through_y_axis(curve) {
    // your program here
    return t => make_point(-x_of(curve(t)), y_of(curve(t)));
}
function s_generator(pt) {
    // return function
    function f(t) {
        if(t < 0.5){
            return make_point(
                x_of(pt) + math_cos(2 * 3 / 4 * 2 * math_PI * t),
                y_of(pt) + math_sin(2 * 3 / 4 * 2 * math_PI * t));
        } else {
            return make_point(
                x_of(pt) - math_cos(math_PI + 2 * 3 / 4 * 2 * math_PI * (-1 * t)),
                y_of(pt) - 2 - math_sin(math_PI + 2 * 3 / 4 * 2 * math_PI * (-1 * t)));
    }}
    return f;
}
//test
const my_s = s_generator(make_point(0,0));
draw_connected_squeezed_to_window(200)(reflect_through_y_axis(my_s));

