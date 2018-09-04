// Task 1

function show_points_gosper(level, number_of_points, initial_curve){
    // your solution here!
    function gosper_curve(lvl){
        return (repeated(gosperize, lvl))(initial_curve);
    }
    function show_connected_gosper(lvl){
        return (draw_points_on(number_of_points))
                ((squeeze_rectangular_portion(-0.5, 1.5, -0.5, 1.5))
                  (gosper_curve(level)));
    }
    return show_connected_gosper(level);
}

// testing
show_points_gosper(7, 1000, arc);
show_points_gosper(5, 500, arc);