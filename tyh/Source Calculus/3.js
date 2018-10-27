// Task 3
function make_flexible_step_stream(lst) {
    // Your answer here
    function h(xs){
        if(is_empty_list(xs)){
            return h(lst);
        } else {
            return pair(head(xs), () => h(tail(xs)));
        }
    }
    if(is_empty_list(lst)){
        return [];
    } else {
        return h(lst);
    }
}

function make_flexible_oscillating_stream(lst) {
    // Your answer here
    function h1(xs){
        if(is_empty_list(xs)){
            return h2(tail(reverse(tail(lst))));
        } else {
            return pair(head(xs), () => h1(tail(xs)));
        }
    }
    function h2(xs){
        if(is_empty_list(xs)) {
            return h1(lst);
        } else {
            return pair(head(xs), () => h2(tail(xs)));
        }
    }
    return h1(lst);
}

// const flex_357_step_stream = make_flexible_step_stream(list(3,5,7));
// eval_stream(flex_357_step_stream, 10);

// const flex_3579_osc_stream = make_flexible_oscillating_stream(list(3,5,7,9));
// eval_stream(flex_3579_osc_stream, 10);