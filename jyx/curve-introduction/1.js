// Part 1
// Number -> Curve

// Part 2
function vertical_line(pt, length) {
    return t => make_point(x_of(pt), y_of(pt) + length * t);
}

// Part 3
// (Point, Number) -> Curve

// Part 4
(draw_connected(200))(vertical_line(make_point(0.5,0.25),0.5));
