// your program goes here
function J(t){
    const a = 6;
    if(t <= 0.5) {
        return make_point(1 / 3 + math_cos(math_PI + 2 * math_PI * t) / a,
                          1 / 3 + math_sin(math_PI + 2 * math_PI * t) / a);
    } else {
        if(t <= 0.6) {
            return make_point(3 / a, 5 / a);
        } else {
            if(t <= 0.7) {
                return make_point(1 / a, 5 / a);
            } else {
                return make_point(5 / a, 5 / a);
            }
        }
    }
}
// Test
(draw_connected(1000))(J);
