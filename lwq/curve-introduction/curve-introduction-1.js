// Part 1
// your answer here Number -> Curve

// Part 2
function vertical_line(pt, length) {
  // your answer here
  return t => make_point(x_of(pt),
                         y_of(pt)+length * t);
}

// Part 3
// your answer here (Point, number) -> (Curve -> Drawing)
// Part 4
// your answer here
draw_connected(200)(vertical_line(make_point(0.5,0.25), 0.5));
