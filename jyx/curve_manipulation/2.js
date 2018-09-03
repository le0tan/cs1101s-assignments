// recommended to use connect_rigidly

function connect_ends(curve1, curve2) {
    const tx = x_of(curve1(1)) - x_of(curve2(0));
    const ty = y_of(curve1(1)) - y_of(curve2(0));
    return connect_rigidly(curve1, translate(tx, ty)(curve2));
}

