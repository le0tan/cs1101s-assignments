const major_arpeggio_interval = list(4, 3, 5, 4, 3, 5);
const minor_arpeggio_interval = list(4, 2, 6, 4, 2, 6);
function generate_arpeggio(letter_name, list_of_interval) {
    return generate_list_of_note(letter_name, list_of_interval);
}

function arpeggiator_up(arpeggio, duration_each) {
    if(length(arpeggio) <= 4) {
        return list_to_sound(arpeggio, duration_each);
    } else {
        const s1 = head(arpeggio);
        const s2 = head(tail(arpeggio));
        const s3 = head(tail(tail(arpeggio)));
        const s4 = head(tail(tail(tail(arpeggio))));
        const cur = list_to_sound(list(s1,s2,s3,s4), duration_each);
        return consecutively(list(cur, arpeggiator_up(tail(arpeggio), 
                             duration_each)));
    }
}

function generate_list_of_note(letter_name, list_of_interval) {
    const h = letter_name_to_midi_note(letter_name);
    function helper(x, items) {
        if(is_empty_list(items)) {
            return list(x);
        } else {
            return pair(x, helper(x + head(items), tail(items)));
        }
    }
    return helper(h, list_of_interval);   
}

function list_to_sound(list_of_midi_note, duration) {
    if(is_empty_list(list_of_midi_note)) {
        return sourcesound_to_sound(make_sourcesound(t => 0, 0));
    } else {
        const cur = midi_note_to_frequency(head(list_of_midi_note));
        return consecutively(list(sine_sound(cur, duration),
                             list_to_sound(tail(list_of_midi_note),
                                           duration)));
    } 
}

// test
 play(arpeggiator_up(generate_arpeggio("C4", major_arpeggio_interval), 0.1));
