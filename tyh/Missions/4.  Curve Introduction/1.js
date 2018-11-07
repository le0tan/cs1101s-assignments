// Part 1
// Number -> Curve

// Part 2
function vertical_line(pt, length) {
    const x = x_of(pt);
    const y = y_of(pt);
    return t => (t >= y && t <= y + length) ? make_point(x,t)
                                            : make_point(x,y);
}

// Part 3
// (Point, Number) -> Curve

// Part 4
// your answer here

(draw_connected(100))(vertical_line(make_point(0.5, 0.25), 0.5));