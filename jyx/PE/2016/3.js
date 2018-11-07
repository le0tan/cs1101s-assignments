function evaluate_BAE_tree(bae_tree) {
    if(is_list(bae_tree)) {
        const lf = evaluate_BAE_tree(head(bae_tree));
        const op = head(tail(bae_tree));
        const rt = evaluate_BAE_tree(head(tail(tail(bae_tree))));
        return op === "+" ? lf + rt
                    : op === "-" ? lf- rt
                    : op === "*" ? lf * rt
                    : lf / rt;
    } else {
        return bae_tree;
    }
}
function build_BAE_tree(bae_list) {
    function fnd_op(xs, s, p) {
        const cur = head(xs);
        if(s === 0 && (cur === "+" || cur === "-" || cur === "*" ||
                    cur === "/")){
                        const lf = build_BAE_tree(p);
                        const rt = build_BAE_tree(tail(xs));
                        return list(lf, cur, rt);
                    } else {
                        if(cur === "(") {
                            return fnd_op(tail(xs), s + 1, append(p,list(cur)));
                        } else if(cur === ")") {
                            return fnd_op(tail(xs), s - 1, append(p, list(cur)));
                        } else {
                            return fnd_op(tail(xs), s, append(p, list(cur)));
                        }
                    }
    }
    function rm(xs) {
        if(is_empty_list(xs) || is_empty_list(tail(xs))) {
            return [];
        } else {
            return pair(head(xs), rm(tail(xs)));
        }
    }
    if(head(bae_list) === "(") {
        return fnd_op(rm(tail(bae_list)), 0, []);
    } else {
        return head(bae_list);
    }
}
function evaluate_BAE(bae_list) {
    return evaluate_BAE_tree(build_BAE_tree(bae_list));
}
