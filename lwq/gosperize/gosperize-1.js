// Task 1
function show_points_gosper(level, number_of_points, initial_curve){
    // your solution here!
    function connect_ends(curve1, curve2) {
        return connect_rigidly(
            curve1,translate(x_of(curve1(1))-x_of(curve2(0)),
                             y_of(curve1(1))-y_of(curve2(0)))(curve2));
    }
    function gosperize_p(curve) {
        const scaled_curve = (scale(math_sqrt(2) / 2)) (curve);
        return connect_ends(
        (rotate_around_origin(math_PI / 4))(scaled_curve),
            (rotate_around_origin(-math_PI / 4))(scaled_curve));
    }
    function show_points_gosper_p(level, curve) {
        if(level === 0) {
        return curve;
        } else {
        return gosperize(
                show_points_gosper_p(level - 1, curve));
        }
    }
    return (draw_points_squeezed_to_window(number_of_points))(
        show_points_gosper_p(level,initial_curve));
}

// testing
show_points_gosper(7, 1000, arc);
show_points_gosper(5, 500, arc);
