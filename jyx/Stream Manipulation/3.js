// 1, 2, 3, 1, 2, 3, 1, ...
function duration(x) {
    return pair(x, () => duration(x % 3 + 1));
}
let step_duration_stream = duration(1);// Your solution here

// "Hbebuerq", "Kgasnsa", "Hbebuerq", ...
const a = [];
a[0] = "Hbebuerq";
a[1] = "Kgasnsa";
function cookie(x) {
    return pair(a[x], () => cookie((x + 1) % 2));
}
const oscillating_cookie_stream = cookie(0);// Your solution here

function stream_zip(xs, ys) {
    // Your solution here
    if(is_empty_list(xs) || is_empty_list(ys)) {
        return [];
    } else {
        return pair(pair(head(xs), head(ys)), 
                    () => stream_zip(stream_tail(xs), stream_tail(ys)));
    }
}


// START OF BLOCK
// DO NOT EDIT THIS BLOCK
// [1, "Hbebuerq"], [2, "Kgasnsa"], [3, "Hbebuerq"], [1, "Kgasnsa"], ...
let simple_cookie_stream = stream_zip(step_duration_stream, oscillating_cookie_stream);
let handle = [];

function update_cookie_stream() {
    const current_pair = head(simple_cookie_stream);
    const current_duration = head(current_pair);
    const current_cookie = tail(current_pair);
    display("Have a " + current_cookie + " cookie!");
    handle = setTimeout(function() {
        simple_cookie_stream = stream_tail(simple_cookie_stream);
        update_cookie_stream();
    }, current_duration * 1000);
}

function endScottieBot() {
    clearTimeout(handle);
}
// END OF BLOCK

// For testing
 update_cookie_stream();

// End bot
// endScottieBot();
