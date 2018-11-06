// Task 1
function sort(b) {
    // Your answer here
    const len = array_length(b);
    for(let i = len - 2; i >= 0; i = i - 1){
        for(let j = 0; j <= i; j = j + 1){
            if(b[j] > b[j + 1]){
                swap(j, j+1, b);
            } else { }
        }
    }
}

// Do not modify this function
function swap(left_index, right_index, array) {
    let tmp = array[left_index];
    array[left_index] = array[right_index];
    array[right_index] = tmp;
}

// Comment the following out for testing

let test_1 = [1, 2, 3, 4, 5];
display("Unsorted: " + test_1);
sort(test_1);
display("Sorted: " + test_1);

let test_2 = [9, 8, 7, 6, 5];
display("Unsorted: " + test_2);
sort(test_2);
display("Sorted: " + test_2);

let test_3 = ["Pixel", "Scottie", "Hartin Menz", "Ershk", "Beat"];
display("Unsorted: " + test_3);
sort(test_3);
display("Sorted: " + test_3);