// Task 1

// Function type: Number -> pair_of_numbers
// where input is between 0 - 15 inclusive
function get_dtmf_frequencies(number) {
    // your solution goes here
    // const row = list(697, 770, 852, 941);
    // const col = list(1209, 1336, 1477, 1633);
    // return (number >= 1 && number <= 9)
    //         ? pair(list_ref(col, (number - 1) % 3),
    //               list_ref(row, math_trunc((number - 0.1) / 3)))
    //         : (number >= "A" && number <= "D")
    //             ? pair(list_ref(col, 3), list_ref(row, number - "A"))
    //             : number === "*"
    //                 ? pair(list_ref(col, 0), list_ref(row, 3))
    //                 : number === "#"
    //                     ? pair(list_ref(col, 2), list_ref(row, 3))
    //                     : pair(list_ref(col, 1), list_ref(row, 3));
    const dtmf = list(
                    pair(941, 1336),
                    pair(697, 1209),
                    pair(697, 1336),
                    pair(697, 1477),
                    pair(770, 1209),
                    pair(770, 1336),
                    pair(770, 1477),
                    pair(852, 1209),
                    pair(852, 1336),
                    pair(852, 1477),
                    pair(941, 1209),
                    pair(941, 1477),
                    pair(697, 1633),
                    pair(770, 1633),
                    pair(852, 1633),
                    pair(941, 1633));
    return list_ref(dtmf, number);
}