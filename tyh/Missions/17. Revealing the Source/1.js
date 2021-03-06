let frame_count = 0;

function count_frames_created(program_string) {
    // Your solution here
    frame_count = 0;
    parse_and_evaluate(program_string);
    return frame_count;
}

/*
Evaluator for a sub-language of Source §2

stmt    ::= if (expr) block else block
        |  const name = expr ; 
        |  function name(params) block
        |  expr ; 
        |  stmt stmt
        |  block
block   ::= { stmt }
expr    ::= expr binop expr
        |  unop expr
        |  name
        |  number
        |  expr(expr, expr, ...)
binop   ::= + | - | * | / | % | < | > | <= | >= 
        | === | !== |  && | ||
unop    ::= !
*/

/*
CONSTANTS: NUMBERS, STRINGS, TRUE, FALSE
*/

// constants (numbers, strings, booleans)
// are considered "self_evaluating". This means, they
// represent themselves in the syntax tree
function is_self_evaluating(stmt) {
    return is_number(stmt) ||
        is_string(stmt) ||
        is_boolean(stmt);
}

// all other statements and expressions are
// tagged objects. Their tag tells us what
// kind of statement/expression they are

function is_tagged_object(stmt, the_tag) {
    return is_object(stmt) && stmt.tag === the_tag;
}

/*
THE EMPTY LIST EXPRESSION
*/

// the empty list expression is tagged
// with "empty_list"
function is_empty_list_expression(stmt) {
    return is_tagged_object(stmt, "empty_list");
}

// make a fresh empty list value that is
// different from all other empty list values
function evaluate_empty_list_expression(stmt) {
    return [];
}

/* NAMES */

// Names are tagged with "name".
// In this evaluator, typical names 
// are 
// { "tag": "name", "name": "+" }      
// { "tag": "name", "name": "pair" }  
// { "tag": "name", "name": "my_constant" }  
// { "tag": "name", "name": "my_function" }  
function is_name(stmt) {
    return is_tagged_object(stmt, "name");
}

function name_of_name(stmt) {
    return stmt.name;
}

/* CONSTANT DECLARATIONS*/

// constant declarations are tagged with "constant_declaration"
// and have "name" and "value" properties
function is_constant_declaration(stmt) {
    return is_tagged_object(stmt, "constant_declaration");
}

function constant_declaration_name(stmt) {
    return stmt.name;
}

function constant_declaration_value(stmt) {
    return stmt.value;
}

// evaluation of a constant declaration evaluates
// the right-hand expression and binds the
// name to the resulting value in the
// first (innermost) frame
function evaluate_constant_declaration(stmt, env) {
    define_name(constant_declaration_name(stmt),
        evaluate(constant_declaration_value(stmt), env),
        env);
    return undefined;
}

/* CONDITIONAL STATEMENTS */

// conditional statements are tagged with "conditional_statement"
function is_conditional_statement(stmt) {
    return is_tagged_object(stmt, "conditional_statement");
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
    return !is_true(x);
}

// the meta-circular evaluation of if statements
// evaluates the predicate and then the appropriate
// branch, depending on whether the predicate 
// evaluates to true or not
function evaluate_conditional_statement(stmt, env) {
    if (is_true(evaluate(conditional_statement_predicate(stmt), env))) {
        return evaluate(conditional_statement_consequent(stmt), env);
    } else {
        return evaluate(conditional_statement_alternative(stmt), env);
    }
}

/* FUNCTION DEFINITION EXPRESSIONS */

// function definitions are tagged with "function_definition"
// have a list of "parameters" and a "body" statement
function is_function_definition(stmt) {
    return is_tagged_object(stmt, "function_definition");
}

function function_definition_parameters(stmt) {
    return stmt.parameters;
}

function function_definition_body(stmt) {
    return stmt.body;
}

// function objects keep track of parameters, body
// and environment, in an object tagged as "function_object"
function make_function_object(parameters, body, env) {
    return {
        tag: "function_object",
        parameters: parameters,
        body: body,
        environment: env
    };
}

function is_function_object(value) {
    return is_tagged_object(value, "function_object");
}

function function_object_parameters(function_object) {
    return function_object.parameters;
}

function function_object_body(function_object) {
    return function_object.body;
}

function function_object_environment(function_object) {
    return function_object.environment;
}

// evluating a function definition expression
// results in a function object. Note that the
// current environment is stored as the function
// object's environment
function evaluate_function_definition(stmt, env) {
    return make_function_object(
        function_definition_parameters(stmt),
        function_definition_body(stmt),
        env);
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
function evaluate_boolean_operation(stmt, env) {
    if (operator(stmt) === "&&") {
        if (is_true(evaluate(first_operand(
                    operands(stmt)),
                env))) {
            return evaluate(
                first_operand(
                    rest_operands(operands(stmt))),
                env);
        } else {
            return false;
        }
    } else {
        if (is_true(evaluate(first_operand(
                    operands(stmt)),
                env))) {
            return true;
        } else {
            return evaluate(
                first_operand(
                    rest_operands(operands(stmt))),
                env);
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
// An exception to this rule is when a return
// statement is encountered. In that case, the
// remaining statements are ignored and the 
// return value is the value of the sequence.
function evaluate_sequence(stmts, env) {
    if (is_last_statement(stmts)) {
        return evaluate(first_statement(stmts), env);
    } else {
        const first_stmt_value =
            evaluate(first_statement(stmts), env);
        if (is_return_value(first_stmt_value)) {
            return first_stmt_value;
        } else {
            return evaluate_sequence(
                rest_statements(stmts), env);
        }
    }
}

/* FUNCTION APPLICATION */

// The core of our evaluator is formed by the
// implementation of function applications.
// Applications are tagged with "application"
// and have "operator" and "operands"
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

// builtin functions are tagges with "builtin"      
// and come with a Source function "implementation"
function is_builtin_function(fun) {
    return is_tagged_object(fun, "builtin");
}

function builtin_implementation(fun) {
    return fun.implementation;
}

function make_builtin_function(impl) {
    return {
        tag: "builtin",
        implementation: impl
    };
}

/* APPLY */

// apply_in_underlying_javascript allows us
// to make use of JavaScript's builtin functions
// in order to access operators such as addition
function apply_builtin_function(fun, argument_list) {
    return apply_in_underlying_javascript(
        builtin_implementation(fun),
        argument_list);
}

// function application needs to distinguish between
// builtin functions (which are evaluated using the
// underlying JavaScript), and compound functions.
// An application of the latter needs to evaluate the
// body of the function object with respect to an 
// environment that results from extending the function
// object's environment by a binding of the function
// parameters to the arguments
function apply(fun, args) {
    if (is_builtin_function(fun)) {
        return apply_builtin_function(fun, args);
    } else if (is_function_object(fun)) {
        const result =
            evaluate(function_object_body(fun),
                extend_environment(
                    function_object_parameters(fun),
                    args,
                    function_object_environment(fun)));
        if (is_return_value(result)) {
            return return_value_content(result);
        } else {
            return undefined;
        }
    } else {
        error("Unknown function type in apply: " + fun);
    }
}

/* RETURN STATEMENTS */

// Functions return the value that results from
// evaluating their expression
function is_return_statement(stmt) {
    return is_tagged_object(stmt, "return_statement");
}

function return_statement_expression(stmt) {
    return stmt.expression;
}

// since return statements can occur anywhere in the
// body, we need to identify them during the evaluation
// process
function make_return_value(content) {
    return {
        tag: "return_value",
        content: content
    };
}

function is_return_value(value) {
    return is_tagged_object(value, "return_value");
}

function return_value_content(value) {
    return value.content;
}

function evaluate_return_statement(stmt, env) {
    return make_return_value(
        evaluate(return_statement_expression(stmt),
            env));
}

/* BLOCKS */

// blocks are tagged with "block"
function is_block(stmt) {
    return is_tagged_object(stmt, "block");
}

function block_body(stmt) {
    return stmt.body;
}

// the meta-circular evaluation of blocks simply
// evaluates the body of the block with respect to
// the current environment extended by an empty frame
function evaluate_block(stmt, env) {
    return evaluate(block_body(stmt),
        extend_environment([], [], env));
}

/*
ENVIRONMENTS
*/

// Frames are objects. Each property
// represents a binding of a name
// (represented by a string) to a value.
const an_empty_frame = {};

function make_frame(names, values) {
    let frame = {};
    while (!is_empty_list(names) && !is_empty_list(values)) {
        frame[head(names)] = head(values);
        names = tail(names);
        values = tail(values);
    }
    return frame;
}

function add_binding_to_frame(name, value, frame) {
    frame[name] = value; // object field assignment
    return undefined;
}

function has_binding_in_frame(name, frame) {
    return frame[name] !== undefined;
}

// The first frame in an environment is the
// "innermost" frame. The tail operation
// takes you to the "enclosing" environment
function first_frame(env) {
    return head(env);
}

// define_name makes a binding to the first
// (innermost) frame of the given environment
function define_name(name, value, env) {
    const frame = first_frame(env);
    return add_binding_to_frame(name, value, frame);
}

function enclosing_environment(env) {
    return tail(env);
}

function enclose_by(frame, env) {
    return pair(frame, env);
}

function is_empty_environment(env) {
    return is_empty_list(env);
}

// name lookup proceeds from the innermost
// frame and continues to look in enclosing
// environments until the name is found
function lookup_name_value(name, env) {
    function env_loop(env) {
        if (is_empty_environment(env)) {
            error("Unbound name: " + name);
        } else if (has_binding_in_frame(name, first_frame(env))) {
            return first_frame(env)[name];
        } else {
            return env_loop(enclosing_environment(env));
        }
    }
    return env_loop(env);
}

// applying a compound function to parameters will
// lead to the creation of a new environment, with
// respect to which the body of the function needs
// to be evaluated.
function extend_environment(names, vals, base_env) {
    if (length(names) === length(vals)) {
        frame_count = frame_count + 1;      //add one to count when new frame is created
        return enclose_by(make_frame(names, vals), base_env);
    } else if (length(names) < length(names)) {
        error("Too many arguments supplied: " + names + vals);
    } else {
        error("Too few arguments supplied: " + names + vals);
    }
}

/* EVALUATE */

// list_of_values evaluates a given list of expressions
// with respect to an environment
function list_of_values(exps, env) {
    if (no_operands(exps)) {
        return [];
    } else {
        return pair(evaluate(first_operand(exps), env),
            list_of_values(rest_operands(exps), env));
    }
}

// The workhorse of our evaluator is the evaluate function.
// It dispatches on the kind of statement at hand, and
// invokes the appropriate implementations of their
// evaluation process, as described above, always using
// a current environment
function evaluate(stmt, env) {
    if (is_self_evaluating(stmt)) {
        return stmt;
    } else if (is_empty_list_expression(stmt)) {
        return evaluate_empty_list_expression(stmt);
    } else if (is_name(stmt)) {
        return lookup_name_value(name_of_name(stmt), env);
    } else if (is_constant_declaration(stmt)) {
        return evaluate_constant_declaration(stmt, env);
    } else if (is_conditional_statement(stmt)) {
        return evaluate_conditional_statement(stmt, env);
    } else if (is_boolean_operation(stmt)) {
        return evaluate_boolean_operation(stmt, env);
    } else if (is_function_definition(stmt)) {
        return evaluate_function_definition(stmt, env);
    } else if (is_sequence(stmt)) {
        return evaluate_sequence(stmt, env);
    } else if (is_application(stmt)) {
        return apply(evaluate(operator(stmt), env),
            list_of_values(operands(stmt), env));
    } else if (is_return_statement(stmt)) {
        return evaluate_return_statement(stmt, env);
    } else if (is_block(stmt)) {
        return evaluate_block(stmt, env);
    } else {
        error("Unknown expression type in evaluate: " +
            stringify(stmt));
    }
}

// at the toplevel (outside of functions), return statements
// are not allowed. The function evaluate_toplevel detects
// return values and displays an error in when it encounters one.
function evaluate_toplevel(stmt, env) {
    const value = evaluate(stmt, env);
    if (is_return_value(value)) {
        error("return not allowed outside of function definitions");
    } else {
        return value;
    }
}

/* THE GLOBAL ENVIRONMENT */

function make_empty_frame() {
    return {};
}

const the_empty_environment = [];

// the global environment has bindings for all
// builtin functions, including the operators
const builtin_functions = list(
    pair("pair", pair),
    pair("head", head),
    pair("tail", tail),
    pair("list", list),
    pair("is_empty_list", is_empty_list),
    pair("display", display),
    pair("error", error),
    pair("+", (x, y) => x + y),
    pair("-", (x, y) => x - y),
    pair("*", (x, y) => x * y),
    pair("/", (x, y) => x / y),
    pair("%", (x, y) => x % y),
    pair("===", (x, y) => x === y),
    pair("!==", (x, y) => x !== y),
    pair("<", (x, y) => x < y),
    pair("<=", (x, y) => x <= y),
    pair(">", (x, y) => x > y),
    pair(">=", (x, y) => x >= y),
    pair("!", x => !x)
);

// the global environment also has bindings for all
// builtin non-function values, such as undefined and 
// math_PI
const builtin_values = list(
    pair("undefined", undefined),
    pair("math_PI", math_PI)
);

// setup_global_environment makes an environment that has
// one single frame, and adds a binding of all names
// listed as builtin_functions and builtin_values. 
// The values of builtin functions are "builtin" 
// objects, see line 295 how such functions are applied
function setup_global_environment() {
    const initial_env = enclose_by(make_empty_frame(),
        the_empty_environment);
    for_each(x => define_name(head(x),
            make_builtin_function(tail(x)),
            initial_env),
        builtin_functions);
    for_each(x => define_name(head(x),
            tail(x),
            initial_env),
        builtin_values);
    return initial_env;
}

const the_global_environment = setup_global_environment();

// parse_and_evaluate
function parse_and_evaluate(str) {
    return evaluate_toplevel(parse(str),
        the_global_environment);
}