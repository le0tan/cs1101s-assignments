function all_different(nums) {
    if(is_empty_list(nums)) {
        return true;
    } else {
        if(!is_empty_list(member(head(nums), tail(nums)))) {
            return false;
        } else {
            return all_different(tail(nums));
        }
    }
}
function is_valid_toto_set(nums, n, min, max) {
    return all_different(nums) && length(nums) === n &&
            accumulate((x, y) => y && x<=max && x>=min, true, nums);
}
function num_of_matches(numsA, numsB) {
    const a = filter(x => !is_empty_list(member(x, numsB)), numsA);
    return length(a);
}
function check_winning_group(bet_nums, draw_nums, extra_num) {
    const m = num_of_matches(bet_nums, draw_nums);
    const f = !is_empty_list(member(extra_num, bet_nums));
    const n = length(bet_nums);
    if(m === n) {
        return 1;
    } else if(m === n-1) {
        if(f) {
            return 2;
        } else {
            return 3;
        }
    } else if(m === n-2) {
        if(f) {
            return 4;
        } else {
            return 5;
        }
    } else {
        return 0;
    }
}
