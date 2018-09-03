function reflect_through_y_axis(curve) {
    return t => make_point(-x_of(curve(t)), y_of(curve(t)));
}

