// Task 4
function single_dial(number) {
    return consecutively(
        list(make_dtmf_tone(
                    get_dtmf_frequencies(number)),
            silence(0.1)));
}
function make_dtmf_tone(frequency_pair) {
    // your solution goes here
    return simultaneously(list(
        sine_sound(head(frequency_pair), 0.5),
        sine_sound(tail(frequency_pair), 0.5)));
}
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
function dial(list_of_digits) {
        // your solution goes here
        function get_list(ls) {
                if(is_empty_list(ls)) {
                    return pair(single_dial(11), 
                        pair(silence(0.1), []));
                } else {
                    return pair(single_dial(head(ls)), 
                           get_list(tail(ls)));
                }
            }
        return consecutively(get_list(list_of_digits));
    }
    
function dial_all(list_of_numbers) {
    // your solution goes here
    if(is_empty_list(list_of_numbers)) {
        return [];
    } else {
        if(is_empty_list(tail(list_of_numbers))) {
            if(equal(head(list_of_numbers), list(1,8,0,0,5,2,1,1,9,8,0))) {
                return [];
                } else {
                    return pair(dial(head(list_of_numbers)),[]);
                }
        } else {
            if(equal(head(list_of_numbers), list(1,8,0,0,5,2,1,1,9,8,0))) {
                //display("bbb");
                return dial_all(tail(list_of_numbers));
            } else {
                //display("aaa");
                return consecutively(pair(dial(head(list_of_numbers)),
                    dial_all(tail(list_of_numbers))));
            }
        }
    }
}

//play(dial(list(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15)));
// Test
 play(dial_all(
  list(
      list(1,8,0,0,5,2,1,1,9,8,0),
      list(6,2,3,5,8,5,7,7),
      list(0,0,8,6,1,3,7,7,0,9,5,0,0,6,1))
  ));
