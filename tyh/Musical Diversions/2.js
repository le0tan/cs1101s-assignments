const major_arpeggio_interval = list(4, 3, 5, 4, 3, 5);
const minor_arpeggio_interval = list(4, 2, 6, 4, 2, 6);
function generate_arpeggio(letter_name, list_of_interval) {
    return generate_list_of_note(letter_name, list_of_interval);
}

function arpeggiator_up(arpeggio, duration_each) {
    /* your answer here */
    const len = length(arpeggio);
    
    function helper(pos, last, ans){
           if(pos >= len){
               return ans;
           } else {
               const add = append(tail(last), list(list_ref(arpeggio, pos)));
               return helper(pos+1, add, append(ans, add));
           }
    }
    
    if(len < 4){
        //"return it back", it means the list or MIDI notes or
        //the sound of the list
        //if it's the latter, change `return arpeggio`
        //to `return list_to_sound(arpeggio, duration_each)`
        return arpeggio;
    } else {
        const first_four = map(x => list_ref(arpeggio, x), enum_list(0,3));
        // display(helper(4,first_four,first_four));
        return list_to_sound(helper(4,first_four,first_four), duration_each);
    }
}

function generate_list_of_note(letter_name, list_of_interval) {
    /* your answer here */
    function helper(lst, last, ans){
        if(is_empty_list(lst)){
            return ans;
        } else {
            const cur = last + (is_pair(lst) ? head(lst) : lst);
            return helper((is_pair(lst) ? tail(lst) : []), 
                            cur, 
                            append(ans, list(cur)));
        }
    }
    const ln = letter_name_to_midi_note(letter_name);
    return helper(list_of_interval, ln, list(ln));
}

function list_to_sound(list_of_midi_note, duration) {
    /* your answer here */
    const lst_freq = map(midi_note_to_frequency, list_of_midi_note);
    const lst_sine = map(x => sine_sound(x, duration), lst_freq);
    return consecutively(lst_sine);
}

// test
play(arpeggiator_up(generate_arpeggio("C4", major_arpeggio_interval), 0.1));