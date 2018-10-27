// Task 4
function interleave(stream1, stream2) {
    // Your answer here
    if(!is_empty_list(stream1)){
        return pair(head(stream1), () => interleave(stream2, stream_tail(stream1)));    
    } else {
        return stream2;
    }
}

// // stream_constant(k) generates an infinite stream of k
// function stream_constant(k) {
//     return pair(k, function() {
//       return stream_constant(k);
//     });
// }

// // add_streams sums up two given infinite stream
// function add_streams(s1, s2) {
//     return pair( head(s1) + head(s2), function() {
//         return add_streams( stream_tail(s1), stream_tail(s2));
//     });
// }

// const odd_stream = pair(1, function(){
//     return add_streams(stream_constant(2), odd_stream);
// });
// const even_stream = pair(2, function(){
//     return add_streams(stream_constant(2), even_stream);
// });

// const integers = interleave(odd_stream, even_stream);
// eval_stream(integers, 10);
// // Output should be the same as list(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

// const finite_test = interleave(list_to_stream(list("a","b","c")), stream_constant(1));
// eval_stream(finite_test, 10);
// // Output should be the same as list("a", 1, "b", 1, "c", 1, 1, 1, 1, 1)