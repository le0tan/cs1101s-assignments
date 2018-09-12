// Part 1
/*
list(
    list(
        list(
            list(
                list(
                    list(
                        list([], "hello", []),
                        "hellu", [])
                        , "hellv", [])
                        , "hellw", [])
                        , "hellx", [])
                        , "helly", [])
                        , "hellz", []);
*/

// Part 2
/*
list(
    list(
        list([],'a',[]),
        'b',
        list([],'c',[])
        ),
    'd',
    list(
        list([],'e',[]),
        'f',
        list([],'g',[])
        )
    );
*/

// Part 3
// Theta(log(n))

//Validation code

const p1 = list(
    list(
        list(
            list(
                list(
                    list(
                        list([], "hello", []),
                        "hellu", [])
                        , "hellv", [])
                        , "hellw", [])
                        , "hellx", [])
                        , "helly", [])
                        , "hellz", []);
                        
const p2 = list(
    list(
        list([],'a',[]),
        'b',
        list([],'c',[])
        ),
    'd',
    list(
        list([],'e',[]),
        'f',
        list([],'g',[])
        )
    );

function find(bst, name) {
    // Your answer here
    if(is_empty_binary_tree(bst)){
        return false;
    } else {
        display('1');
        if(value_of(bst) === name){
            return true;
        } else {
            display('1');
            return value_of(bst) > name
                    ? find(left_subtree_of(bst), name)
                    : find(right_subtree_of(bst), name);
        }
    }
}

// find(p1,"hello"); //This should print 14 '1's

// find(p2, "z"); //This should print 6 '1's