function is_nucleobase(s) {
    return s === "A" || s === "T" || s === "G" || s === "C";
}
//is_nucleobase("A");
function is_dna_strand(xs) {
    if(is_empty_list(xs)) {
        return true;
    } else {
        const cur = head(xs);
        return is_nucleobase(cur) && is_dna_strand(tail(xs));
    }
}
function combine(xs) {
    return accumulate(append, [], xs);
}
function oxoguanine_repair(xs) {
    return map(x => x === "8" ? "G" : x, xs);
}
function find_gene_start(xs) {
    if(is_empty_list(xs) || is_empty_list(tail(xs)) || is_empty_list(tail(tail(xs)))) {
        return [];
    } else {
        const a = head(xs);
        const t = head(tail(xs));
        const g = head(tail(tail(xs)));
        if(a === "A" && t === "T" && g === "G") {
            return list(tail(tail(tail(xs))));
        } else {
            return find_gene_start(tail(xs));
        }
    }
}
function find_gene_end(xs) {
    function helper(xs, res) {
        if(is_empty_list(xs) || is_empty_list(tail(xs)) || is_empty_list(tail(tail(xs)))) {
            return [];
        } else {
            const a = head(xs);
            const b = head(tail(xs));
            const c = head(tail(tail(xs)));
            if((a === "T" && b === "A" && c === "G")
                || (a === "T" && b === "A" && c === "A")
                || (a === "T" && b === "G" && c === "A")) {
                return reverse(res);
            } else {
                return helper(tail(xs), pair(a,res));
            }
        }
    }
    return helper(xs, []);
}
function all_genes(xs) {
    function helper(xs, res) {
        const nxt = find_gene_start(xs);
        if(is_empty_list(nxt)) {
            return reverse(res);
        } else {
            const g = find_gene_end(head(nxt));
            if(is_empty_list(g)) {
                return reverse(res);
            } else {
                return helper(head(nxt),pair(g, res));
            }
        }
    }
    return helper(xs, []);
}

