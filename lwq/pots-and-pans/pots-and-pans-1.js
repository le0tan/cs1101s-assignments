// Task 1

// Function type: Number -> pair_of_numbers
// where input is between 0 - 15 inclusive
function get_dtmf_frequencies(number) {
    // your solution goes here
    const sound_list = list(
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
    function find(n, ls) {
        if(n === 0) {
            return head(ls);
        } else {
            return find(n - 1, tail(ls));
        }
    }
    return find(number, sound_list);
}
