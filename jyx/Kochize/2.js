// your program here
function koch_curve(level) {
    if (level === 0) {
        return unit_line;
    } else {
        const c = koch_curve(level - 1);
        const lf = connect_ends(c, (rotate_around_origin(math_PI / 3))(c));
        const rt = (rotate_around_origin(-math_PI / 3))(lf);
        return put_in_standard_position(connect_ends(lf, rt));
    }
}


const e1 = koch_curve(5);
const e2 = (rotate_around_origin(-2 * math_PI / 3))(e1);
const e3 = (rotate_around_origin(2 * math_PI / 3))(e1);
const snowflake = connect_ends(connect_ends(e1, e2), e3);

// Test
(draw_connected_full_view_proportional(10000))(snowflake);
