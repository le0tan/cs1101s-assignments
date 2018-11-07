function make_first_line(words,page_width) {
    function helper(str, words, len) {
        if(is_empty_list(words)){
            return pair(str,[]);
        } else {
            const cur =head(words);
            if(len + 1 + cur.length <= page_width) {
                return helper(str+" "+cur, tail(words), len + 1 + cur.length);
            } else {
                return pair(str, words);
            }
        }
    }
    if(is_empty_list(words)) {
        return pair("",[]);
    } else {
        return helper(head(words),tail(words),head(words).length);
    }
}
function make_lines(words, page_width) {
    function helper(words, res) {
        if(is_empty_list(words)) {
            return res;
        } else {
            const p = make_first_line(words, page_width);
            return helper(tail(p), append(res, list(head(p))));
        }
    }
    return helper(words, []);
}
function tail_n_times(xs, n) {
    if(n === 0) {
        return xs;
    } else {
        return tail_n_times(tail(xs), n - 1);
    }
}

function copy_list_n_times(xs, n) {
    if(n === 0) {
        return [];
    } else {
        return pair(head(xs), copy_list_n_times(tail(xs),n - 1));
    }
}

function make_pages(lines, page_height) {
    if(length(lines) <= page_height) {
        return lines;
    } else {
        return pair(copy_list_n_times(lines, page_height),
                    make_pages(tail_n_times(lines, page_height),
                                    page_height));
    }
}

function page_format(words, page_width, page_height) {
    return make_pages(make_lines(words, page_width),page_height);
}
