// Task 1

function show_points_gosper(level, number_of_points, initial_curve){
    const c = (repeated(gosperize,level))(initial_curve);
    return (draw_points_on(number_of_points))((squeeze_rectangular_portion(-0.5, 1.5, -0.5, 1.5))(c));
}

// testing
show_points_gosper(7, 1000, arc);
show_points_gosper(5, 500, arc);

