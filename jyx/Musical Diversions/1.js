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

const major_scale_interval = list(2, 2, 1, 2, 2, 2, 1, -1, -2, -2, -2, -1, -2, -2);
const c_major_scale = generate_list_of_note("C4", major_scale_interval);

display(c_major_scale);

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

const c_major_scale_sound = list_to_sound(c_major_scale, 0.4);
play(c_major_scale_sound);

const harmonic_minor_scale_interval = list(2, 1, 2, 2, 1, 3, 1, -1, -3, -1, -2, -2, -1, -2);

const melodic_minor_scale_interval = list(2, 1, 2, 2, 2, 2, 1, -2, -2, -1, -2, -2, -1, -2);


const c_harmonic_minor_scale = generate_list_of_note("C4",
                                                harmonic_minor_scale_interval);
const c_harmonic_minor_scale_sound = list_to_sound(c_harmonic_minor_scale, 0.4);
play(c_harmonic_minor_scale_sound);

const c_melodic_minor_scale = generate_list_of_note("C4",
                                                melodic_minor_scale_interval);
const c_melodic_minor_scale_sound = list_to_sound(c_melodic_minor_scale, 0.4); 
play(c_melodic_minor_scale_sound);
