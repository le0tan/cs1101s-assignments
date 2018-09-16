// your program here
function snow() {
    function koch(sublevel) {
        if(sublevel === 0) {
            return unit_line;
        } else {
            const curve = koch(sublevel - 1);
            return connect_ends(
                connect_ends(
                    curve,
                    rotate_around_origin( math_PI / 3)(curve)),
                connect_ends(
                    rotate_around_origin(-math_PI / 3)(curve),
                    curve));
        }
    }
    const cur1 = koch(5);
    const cur2 = (rotate_around_origin(math_PI * 4 / 3))(cur1);
    const cur3 = (rotate_around_origin(math_PI * 4 / 3))(cur2);
    return connect_ends(
        connect_ends(cur1,cur2),
        cur3);
}
const snowflake = snow();
// Test
(draw_connected_full_view_proportional(10000))(snowflake);
