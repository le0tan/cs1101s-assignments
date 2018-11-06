// 1, 2, 3, 1, 2, 3, 1, ...
let step_duration_stream = stream_map(x=>x%3+1, integers_from(1));// Your solution here

// "Hbebuerq", "Kgasnsa", "Hbebuerq", ...
const oscillating_cookie_stream = stream_map(x=>x%2===1?"Hbebuerg":"Kgasnsa", integers_from(1));// Your solution here

function stream_zip(xs, ys) {
    // Your solution here
    return pair(pair(head(xs), head(ys)), ()=>stream_zip(stream_tail(xs),stream_tail(ys)));
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