function add(a, b) {
    return a + b;
}

function stream_sequence(op, initial, xs) {
    // Your solution here
    const cur = op(initial, head(xs));
    return pair(cur, () => stream_sequence(op, cur, stream_tail(xs)));
}

const integers = integers_from(1);
const even_integers = stream_map(x=>2*x, integers);// Your solution here
const squared_even_integers = stream_map(x=>x*x, even_integers);// Your solution here
const sum_square = stream_sequence(add, 0, squared_even_integers);

// For testing

display(eval_stream(sum_square, 10));
