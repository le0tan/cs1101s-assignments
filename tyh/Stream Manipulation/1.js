function is_even(n) {
    return n % 2 === 0;
}

function stream_take(xs, n) {
    // Your solution here
    if(n === 0){
        return [];
    } else {
        return pair(head(xs), () => stream_take(stream_tail(xs), n-1));
    }
}

function stream_drop(xs, n) {
    // Your solution here
    if(n === 0){
        return xs;
    } else {
        return stream_drop(stream_tail(xs), n-1);
    }
}

const bounded_input = enum_stream(0, 10000);
const even_results = stream_filter(is_even, bounded_input);
const first_ten = stream_take(even_results, 10);
const next_ten = stream_take(stream_drop(even_results, 10), 10);

// For testing

display(eval_stream(first_ten, 10));
display(eval_stream(next_ten, 10));
