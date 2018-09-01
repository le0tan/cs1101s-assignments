// your program goes here
function J(t){
    //control the scale and the origin when scale = 1
    const scale = 1/6;
    const x_o = 2;
    const y_o = 2;
    //mapping the points
    function trans(x,y){
        return make_point(scale*(x+x_o),
                          scale*(y+y_o));
    }
    //main body
    if(t<=0.5){
        return trans(math_cos(2*math_PI*(t+0.5)),math_sin(2*math_PI*(t+0.5)));
    } else {
        if(t<=0.6){
            return trans(1,3);
        } else {
            if(t<=0.7){
                return trans(-1,3);
            }
            else {
                return trans(3,3);
            }
        }
    }
}

// Test
(draw_connected(1000))(J);