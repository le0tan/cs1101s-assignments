// your program here
function show_connected_koch(lvl, pts){
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
    return draw_connected(pts)(helper(lvl));
}

// Test
show_connected_koch(5, 4000);

//--------Another version--------
//(the Playground does not have rotate_around_origin??!!)
// function rotate_o(angle, curve){
//     function h(t){
//         const tx = x_of(curve(t));
//         const ty = y_of(curve(t));
//         const theta = math_atan(ty/tx)+angle;
//         const sq_sum = math_sqrt(tx*tx+ty*ty);
//         return make_point(sq_sum*math_cos(theta),
//                           sq_sum*math_sin(theta));
//     }
//     return h;
// }

// function rotate_s(angle, curve){
//     const ox = x_of(curve(0));
//     const oy = y_of(curve(0));
//     return translate(ox,oy)(rotate_o(angle,translate(-ox,-oy)(curve)));
// }

// function rotate_e(angle, curve){
//     const ox = x_of(curve(1));
//     const oy = y_of(curve(1));
//     return translate(ox,oy)(rotate_o(math_PI-angle,translate(-ox,-oy)(curve)));
// }

// function show_connected_koch(lvl, pts){
//     function helper(l){
//         if(l === 0){
//             return unit_line;
//         } else {
//             const tc = helper(l-1);
//             const centre = connect_ends(
//                                 rotate_s(
//                                     math_PI*1/3,
//                                     translate(1/3,0)(scale(1/3)(tc))),
//                                 rotate_e(
//                                     math_PI*1/3,
//                                     scale(1/3)(tc)));
//             return connect_rigidly(
//                     scale(1/3)(tc),
//                     connect_rigidly(
//                         centre,
//                         translate(2/3,0)(scale(1/3)(tc))));
//         }
//     }
//     return draw_connected(pts)(helper(lvl));
// }