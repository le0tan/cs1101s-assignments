// recommended to use connect_rigidly

function connect_ends(curve1, curve2) {
    // your program here
    const p1 = curve1(1);
    const p2 = curve2(0);
    const x_diff = x_of(p1) - x_of(p2);
    const y_diff = y_of(p1) - y_of(p2);
    return connect_rigidly(curve1, translate(x_diff, y_diff)(curve2));
}