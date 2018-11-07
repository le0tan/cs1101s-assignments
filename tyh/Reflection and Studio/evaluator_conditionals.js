/*
Evaluator for Calculator language with booleans, conditionals,
                                    and expression sequences

This is an evaluator for a language that can carry
out simple arithmetic calculations, boolean operations and 
provides for sequences of expressions.

The covered Source §1 sublanguage is:

stmt  ::= if (expr) { stmt } else { stmt }
       |  expr ; 
       |  stmt stmt
expr  ::= expr binop expr
       |  unop expr
       |  number
binop ::= + | - | * | / | % | < | > | <= | >= | === | !==
          |  && | ||
unop  ::= !

The usual operator precedences apply, and parentheses
can be used freely.

Note that the evaluator is a bit more complex
than necessary, to be consistent with the more
powerful evaluators that will follow.
*/

/*
CONSTANTS: NUMBERS, TRUE, FALSE
*/

// constants (numbers, booleans)
// are considered "self_evaluating". This means, they
// represent themselves in the syntax tree
function is_self_evaluating(stmt) {
    return is_number(stmt) ||
           is_boolean(stmt);
}

// all other statements and expressions are
// tagged objects. Their tag tells us what
// kind of statement/expression they are
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
// and
// { "tag": "name", "name": "pair" }
function is_name(stmt) {
    return is_tagged_object(stmt,"name");
}

function name_of_name(stmt) {
    return stmt.name;
}

/* OPERATOR APPLICATION */

// The core of our evaluator is formed by the
// implementation of operator applications.
// Applications are tagged with "application"
// and have "operator" and "operands"

function is_application(stmt) {
    return is_tagged_object(stmt,"application");
}
// they have an operator
function operator(stmt) {
    return stmt.operator;
}
// ...and a list of operands
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
    return is_tagged_object(fun, "builtin");
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
       return apply_builtin_function(fun, args);
    } else {
        error("Unknown function type in apply: ", fun);
    }
}
    
/* LAZY BOOLEAN OPERATOR APPLICATION */

// thankfully our parser distinguishes the applications
// of lazy boolean operators using the special tag
// "boolean_operation"
function is_boolean_operation(stmt) {
    return is_tagged_object(stmt, "boolean_operation");
}

// evaluation of laziness avoids evaluation of
// the right-hand side, if the evaluation of the
// left-hand side already determines the result
function evaluate_boolean_operation(stmt) {
    display(stringify(stmt));
    if (operator(stmt) === "&&") {  
        if (is_true(evaluate(first_operand(
                                operands(stmt))))) {
            return evaluate(
                      first_operand(
                         rest_operands(operands(stmt))));
        } else {
            return false;
        } 
    } else {
        if (is_true(evaluate(first_operand(
                                operands(stmt))))) {
            return true;
        } else {
            return evaluate(
                      first_operand(
                         rest_operands(operands(stmt))));
        }        
    }
}

/* SEQUENCES */

// sequences of statements are just represented
// by lists of statements by the parser. Thus
// there is no need for tagged objects here.
function is_sequence(stmt) {
    return is_list(stmt);
}
function is_last_statement(stmts) {
    return is_empty_list(tail(stmts));
}
function first_statement(stmts) {
    return head(stmts);
}
function rest_statements(stmts) {
    return tail(stmts);
}

// to evaluate a sequence, we need to evaluate
// its statements one after the other, and return
// the value of the last statement. 
function evaluate_sequence(stmts) {
    if (is_last_statement(stmts)) {
        return evaluate(first_statement(stmts));
    } else {
        const first_stmt_value = 
            evaluate(first_statement(stmts));
        return evaluate_sequence(
                   rest_statements(stmts));
    }
}

/* CONDITIONAL STATEMENTS */

// conditional statements are tagged with "if"
function is_conditional_statement(stmt) {
    return is_tagged_object(stmt,"conditional_statement");
}
function conditional_statement_predicate(stmt) {
    return stmt.predicate;
}
function conditional_statement_consequent(stmt) {
    return stmt.consequent;
}
function conditional_statement_alternative(stmt) {
    return stmt.alternative;
}
function is_true(x) {
    return x === true;
}
function is_false(x) {
    return ! is_true(x);
}
    
// the meta-circular evaluation of conditional statements
// evaluates the predicate and then the appropriate
// branch, depending on whether the predicate 
// evaluates to true or not
function evaluate_conditional_statement(stmt) {
    if (is_true(evaluate(conditional_statement_predicate(stmt)))) {
        return evaluate(conditional_statement_consequent(stmt));
    } else {
        return evaluate(conditional_statement_alternative(stmt));
    }
}

/* BLOCKS */

// blocks are tagged with "block"
function is_block(stmt) {
    return is_tagged_object(stmt,"block");
}
function block_body(stmt) {
    return stmt.body;
}

// the meta-circular evaluation of blocks simply
// evaluates the body of the block
function evaluate_block(stmt) {
    return evaluate(block_body(stmt));
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
    return add_binding_to_frame(name,value,frame);
}

const builtin_functions = 
  list(pair("+",   (x, y) => x +   y),
       pair("-",   (x, y) => x -   y),
       pair("*",   (x, y) => x *   y),
       pair("/",   (x, y) => x /   y),
       pair("%",   (x, y) => x %   y),
       pair("===", (x, y) => x === y),
       pair("!==", (x, y) => x !== y),
       pair("<",   (x, y) => x <   y),
       pair("<=",  (x, y) => x <=  y),
       pair(">",   (x, y) => x >   y),
       pair(">=",  (x, y) => x >=  y),
       pair("!",    x     =>   !   x)
      );

const the_empty_environment = [];

function enclose_by(frame, env) {
    return pair(frame, env);
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

// with such a simple environment structure,
// looking up a name is very easy...
function lookup_name_value(name) {
    return first_frame(the_global_environment)[name];
}

/* EVALUATE */

// list_of_values evaluates a given list of expressions
function list_of_values(exps) {
    if (no_operands(exps)) {
        return [];
    } else {
        return pair(evaluate(first_operand(exps)),
                    list_of_values(rest_operands(exps)));
    }
}

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
   } else if (is_boolean_operation(stmt)) {
       return evaluate_boolean_operation(stmt);
   } else if (is_sequence(stmt)) {
      return evaluate_sequence(stmt);
   } else if (is_conditional_statement(stmt)) {
      return evaluate_conditional_statement(stmt);
   } else if (is_block(stmt)) {
       return evaluate_block(stmt);
   } else {
       error("Unknown expression type in evaluate: " +
             stringify(stmt));
   }
}

// the parse function returns a a parse tree which
// we pass to evaluate
function parse_and_evaluate(str) {
    return evaluate(parse(str));
}

/*

// example for boolean self-evaluating value
is_self_evaluating(head(parse("true;")); // true
evaluate(head(parse("true;")));

// example for conditional statement
const my_if = head(parse("if (true) { 3; } else { 4; }"));
stringify(my_if);
evaluate_conditional_statement(my_if);

// example for sequence
const my_seq = parse("1 + 2; 3 + 4; 5 + 6;");
stringify(my_seq);
evaluate_sequence(my_seq);

// evaluation examples:
parse_and_evaluate("1;");
parse_and_evaluate("1 + 1;");
parse_and_evaluate("1 + 3 * 4;");
parse_and_evaluate("(1 + 3) * 4;");
parse_and_evaluate("1.4 / 2.3 + 70.4 * 18.3;");

parse_and_evaluate("true;");
parse_and_evaluate("true && false;");
parse_and_evaluate("1 === 1 && true;");
parse_and_evaluate("! (1 === 1);");
parse_and_evaluate("if (! (1 === 1)) { 0; 1; } else { 4; 2; }");

*/


