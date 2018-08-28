require('./rune-library');

const mission_name = "runic-carpets";
const number_of_missions = 1;
const testers = ["lwq"];
const reviewee = ["tyh"];
const reviewee_src_path = "./" + reviewee + "/" + mission_name + "/";

var tester_lib;
var reviewer_lib;


const expressions = [["f(nova_bb, 9);", "f(nova_bb, 8);"]];


for (var i = 1; i <= number_of_missions; i++){
    // console.log("eh");
    for (expression of expressions[i-1]){
        // console.log(expressions[i-1]);
        // console.log(reviewee_src_path + i);
        reviewer_lib = require(reviewee_src_path + i);
        // reviewer_lib.f();
        var reviewer_pic = eval("reviewer_lib." + expression);
        // reviewer_lib.eval(expression);
        var tester_pic;
        for(tester of testers){
            tester_lib = require("./" + tester + "/" + mission_name + "/" + i);
            tester_pic = eval("tester_lib." + expression);
        }
        console.log(__are_pictures_equal(reviewer_pic, tester_pic));
        // show(reviewer_pic);
    }
}

// console.log(tester_src_path);