/*
Evaluator for a calculator language (subset of Source §1)

This is an evaluator for a language that can carry
out simple arithmetic calculations. 

The covered sublanguage of Source §1 is:

statement  ::= expression ;
expression ::= expression binop expression
            |  number
            |  ( expression )
binop      ::= + | - | * | / | %

The usual operator precedences apply, and parentheses
can be used freely.

Note that the evaluator is a bit more complex
than necessary, to be consistent with the more
powerful evaluators that will follow.
*/

/*
CONSTANTS: NUMBERS
*/

// numbers are considered
// "self-evaluating". This means, they
// represent themselves in the syntax tree
function is_self_evaluating(stmt) {
    return is_number(stmt);
}

// all other statements and expressions are
// tagged objects. Their tags tell us what 
// kind of expression they are.
function is_tagged_object(stmt, the_tag) {
    return is_object(stmt) && stmt.tag === the_tag;
}
      
/* NAMES */

// In this evaluator, the operators are referred
// to as "names" in expressions.

// Names are tagged with "name".
// In this evaluator, typical names 
// are 
// { "tag": "name", "name": "+" }
function is_name(stmt) {
    return is_tagged_object(stmt, "name");
}

function name_of_name(stmt) {
    return stmt.name;
}

/* OPERATOR APPLICATION */

// The core of our evaluator is formed by the
// implementation of operator applications.
// Applications are tagged with "application"
// and have an "operator" and "operands"
function is_application(stmt) {
    return is_tagged_object(stmt, "application");
}
function operator(stmt) {
    return stmt.operator;
}
function operands(stmt) {
    return stmt.operands;
}
function no_operands(ops) {
    return is_empty_list(ops);
}
function first_operand(ops) {
    return head(ops);
}
function rest_operands(ops) {
    return tail(ops);
}

/* BUILTIN FUNCTION OBJECTS */

// our builtin operators are represented
// by primimitive function values, which
// are objects tagged with "builtin"  
function is_builtin_function(fun) {
    return is_tagged_object(fun,"builtin");
}
function builtin_implementation(fun) {
    return fun.implementation;
}
function make_builtin_function(impl) {
    return { tag: "builtin",
             implementation: impl };
}

/* APPLY */

// apply_in_underlying_javascript allows us
// to make use of JavaScript's builtin functions
// in order to access operators such as addition
function apply_builtin_function(fun, args) {
    return apply_in_underlying_javascript(
              builtin_implementation(fun), args);     
}

// all functions in this language are builtin
// functions: built-in functions as given in the
// global environment
function apply(fun, args) {
    if (is_builtin_function(fun)) {
        return apply_builtin_function(fun,args);
    } else {
        error("Unknown function type in apply: ",fun);
    }
}
    
// list_of_values evaluates a given
// list of expressions
function list_of_values(exps) {
    if (no_operands(exps)) {
        return [];
    } else {
        return pair(evaluate(first_operand(exps)),
                    list_of_values(rest_operands(exps)));
    }
}

/* ENVIRONMENT */

// we store our builtin functions in a data structure called 
// environment, which is a list of frames.
// 
// In this evaluator, there is only one frame, the global frame, 
// and only one environment, the global environment.

function make_empty_frame() {
    return {};
}

function add_binding_to_frame(name, value, frame) {
   frame[name] = value; // object field assignment
   return undefined;
}

function first_frame(env) {
    return head(env);
}

function define_name(name, value, env) {
    const frame = first_frame(env);
    return add_binding_to_frame(name, value, frame);
}

const builtin_functions = 
    list(pair("+", (x, y) => x + y),
         pair("-", (x, y) => x - y),
         pair("*", (x, y) => x * y),
         pair("/", (x, y) => x / y),
         pair("%", (x, y) => math_pow(x, y))
        );

const the_empty_environment = [];

function enclose_by(frame, env) {
    return pair(frame,env);
}

// We store our builtin functions as objects tagged as "builtin".
// The actual functions are in property "implementation".
// We store the builtin functions in a global environment that 
// consists of one single frame: the global frame, which is 
// initially empty.
function setup_global_environment() {
    const initial_env = enclose_by(make_empty_frame(),
                                   the_empty_environment);
    for_each(x => define_name(head(x),
                              make_builtin_function(tail(x)),
                              initial_env),
             builtin_functions);
    return initial_env;
}
    
const the_global_environment = setup_global_environment();

// with such a simple global environment,
// looking up a name is very easy...
function lookup_name_value(name) {
    return first_frame(the_global_environment)[name];
}

/* EVALUATE */

// The workhorse of our evaluator is the evaluate function.
// It dispatches on the kind of statement at hand, and
// invokes the appropriate implementations of their
// evaluation process, as described above.
function evaluate(stmt) {
    if (is_self_evaluating(stmt)) {
        return stmt;
    } else if (is_name(stmt)) {
        return lookup_name_value(name_of_name(stmt));
    } else if (is_application(stmt)) {
        return apply(evaluate(operator(stmt)),
                    list_of_values(operands(stmt)));
    } else {
         error("Unknown expression type in evaluate: " +
               stringify(stmt));
    }
}

// For single-statement programs, the parse function returns 
// a one-element list. The element is the expression statement, 
// which we pass to evaluate
function parse_and_evaluate(str) {
    const stmt = parse(str);
    if (length(stmt) !== 1) {
        error("The program must consist of a single expression statement. " +
              "Found " + length(stmt) + " statements in: " + str);
    } else {
        return evaluate(head(stmt));
    }
}

/*
example for self-evaluating statement:
is_self_evaluating(12);
evaluate(head(parse("1;")));

peek into the builtin operations:
(head(the_global_environment)["+"].implementation)(3,4);

a typical calculator program:
const my_prog = "1 + 3 * 4;";
const my_parse_tree = parse(my_prog);
stringify(my_parse_tree);
evaluate(head(my_parse_tree));

program examples:
parse_and_evaluate("1;");
parse_and_evaluate("1 + 1;");
parse_and_evaluate("1 + 3 * 4;");
parse_and_evaluate("0 / 0;");
parse_and_evaluate("1.4 / 2.3 + 70.4 * 18.3;");
*/
