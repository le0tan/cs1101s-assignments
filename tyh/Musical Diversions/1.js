function generate_list_of_note(letter_name, list_of_interval) {
    /* your answer here */
    function helper(lst, last, ans){
        if(is_empty_list(lst)){
            return ans;
        } else {
            const cur = last + head(lst);
            return helper((tail(lst)), 
                            cur, 
                            append(ans, list(cur)));
        }
    }
    const ln = letter_name_to_midi_note(letter_name);
    return helper(list_of_interval, ln, list(ln));
}

const major_scale_interval = list(2, 2, 1, 2, 2, 2, 1, -1, -2, -2, -2, -1, -2, -2);
const c_major_scale = generate_list_of_note("C4", major_scale_interval);

// display(c_major_scale);

function list_to_sound(list_of_midi_note, duration) {
    /* your answer here */
    const lst_freq = map(midi_note_to_frequency, list_of_midi_note);
    const lst_sine = map(x => sine_sound(x, duration), lst_freq);
    return consecutively(lst_sine);
}

const c_major_scale_sound = list_to_sound(c_major_scale, 0.4);
play(c_major_scale_sound);

const harmonic_minor_scale_interval = list(2, 1, 2, 2, 1, 3, 1, -1, -3, -1, -2, -2, -1, -2);

const melodic_minor_scale_interval = list(2, 1, 2, 2, 2, 2, 1, -2, -2, -1, -2, -2, -1, -2);


const c_harmonic_minor_scale = 
            generate_list_of_note("C4", harmonic_minor_scale_interval);
const c_harmonic_minor_scale_sound = 
            list_to_sound(c_harmonic_minor_scale, 0.4);
// play(c_harmonic_minor_scale_sound);

const c_melodic_minor_scale = 
            generate_list_of_note("C4", melodic_minor_scale_interval);
const c_melodic_minor_scale_sound = 
            list_to_sound(c_melodic_minor_scale, 0.4);
// play(c_melodic_minor_scale_sound);