// your program here
function connected_koch(lvl){
    function helper(l){
        if(l === 0){
            return unit_line;
        } else {
            const tc = helper(l - 1);
            const centre = connect_ends(
                            rotate_around_origin(math_PI * 1/3)(tc),
                            rotate_around_origin(-math_PI * 1/3)(tc));
            return put_in_standard_position(
                connect_ends(
                    tc,
                    connect_ends(
                        centre, tc)));
        }
    }
    return helper(lvl);
}

const k5 = connected_koch(5);
const op = (a => (connect_ends(
                        rotate_around_origin(math_PI * 2/3)(a), 
                        k5)));
const snowflake = repeated(op, 2)(k5);


// Test
(draw_connected_full_view_proportional(10000))(snowflake);