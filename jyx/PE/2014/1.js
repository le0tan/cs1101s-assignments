function weighted_sum(digits, weights) {
    if(is_empty_list(digits)) {
        return 0;
    } else {
        return head(digits) * head(weights) + weighted_sum(tail(digits), tail(weights));
    }
}
function discard_element(xs, pos) {
    if(is_empty_list(xs)) {
        return [];
    } else if(pos === 0) {
        return tail(xs);
    } else {
        return pair(head(xs), discard_element(tail(xs), pos - 1));
    }
}
function id_to_matric(id) {
    const xs = tail(id);
    const wu = list(0,1,3,1,2,7);
    const wa = list(1,1,1,1,1,1,1);
    const cd = list("Y","X","W","U","R","N","M","L","J","H","E","A","B");
    if(head(id) === "u") {
        const num = discard_element(xs, 2);
        const c = list_ref(cd, weighted_sum(num,wu) % 13);
        return pair("U", append(num, list(c)));
    } else {
        const num = xs;
        const c = list_ref(cd, weighted_sum(num, wa) % 13);
        return pair("A", append(num, list(c)));
    }
}
