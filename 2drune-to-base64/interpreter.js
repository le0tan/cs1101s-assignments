"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants = require("./constants");
const interop_1 = require("./interop");
const errors = require("./interpreter-errors");
const types_1 = require("./types");
const node_1 = require("./utils/node");
const rttc = require("./utils/rttc");
class ReturnValue {
    constructor(value) {
        this.value = value;
    }
}
class BreakValue {
}
class ContinueValue {
}
class TailCallReturnValue {
    constructor(callee, args, node) {
        this.callee = callee;
        this.args = args;
        this.node = node;
    }
}
const createFrame = (closure, args, callExpression) => {
    const frame = {
        name: closure.name,
        parent: closure.frame,
        environment: {}
    };
    if (callExpression) {
        frame.callExpression = Object.assign({}, callExpression, { arguments: args.map(a => node_1.createNode(a)) });
    }
    closure.node.params.forEach((param, index) => {
        const ident = param;
        frame.environment[ident.name] = args[index];
    });
    return frame;
};
const createBlockFrame = (context, vars, args) => {
    const frame = {
        name: 'ifStatementBlock',
        parent: currentFrame(context),
        environment: {},
        thisContext: context
    };
    return frame;
};
const handleError = (context, error) => {
    context.errors.push(error);
    if (error.severity === types_1.ErrorSeverity.ERROR) {
        const globalFrame = context.runtime.frames[context.runtime.frames.length - 1];
        context.runtime.frames = [globalFrame];
        throw error;
    }
    else {
        return context;
    }
};
function defineVariable(context, name, value) {
    const frame = context.runtime.frames[0];
    if (frame.environment.hasOwnProperty(name)) {
        handleError(context, new errors.VariableRedeclaration(context.runtime.nodes[0], name));
    }
    frame.environment[name] = value;
    return frame;
}
function* visit(context, node) {
    context.runtime.nodes.unshift(node);
    yield context;
}
function* leave(context) {
    context.runtime.nodes.shift();
    yield context;
}
const currentFrame = (context) => context.runtime.frames[0];
const replaceFrame = (context, frame) => (context.runtime.frames[0] = frame);
const popFrame = (context) => context.runtime.frames.shift();
const pushFrame = (context, frame) => context.runtime.frames.unshift(frame);
const getVariable = (context, name) => {
    let frame = context.runtime.frames[0];
    while (frame) {
        if (frame.environment.hasOwnProperty(name)) {
            return frame.environment[name];
        }
        else {
            frame = frame.parent;
        }
    }
    handleError(context, new errors.UndefinedVariable(name, context.runtime.nodes[0]));
};
const setVariable = (context, name, value) => {
    let frame = context.runtime.frames[0];
    while (frame) {
        if (frame.environment.hasOwnProperty(name)) {
            frame.environment[name] = value;
            return;
        }
        else {
            frame = frame.parent;
        }
    }
    handleError(context, new errors.UndefinedVariable(name, context.runtime.nodes[0]));
};
const checkNumberOfArguments = (context, callee, args, exp) => {
    if (callee.node.params.length !== args.length) {
        const error = new errors.InvalidNumberOfArguments(exp, callee.node.params.length, args.length);
        handleError(context, error);
    }
};
function* getArgs(context, call) {
    const args = [];
    for (const arg of call.arguments) {
        args.push(yield* evaluate(arg, context));
    }
    return args;
}
/**
 * WARNING: Do not use object literal shorthands, e.g.
 *   {
 *     *Literal(node: es.Literal, ...) {...},
 *     *ThisExpression(node: es.ThisExpression, ..._ {...},
 *     ...
 *   }
 * They do not minify well, raising uncaught syntax errors in production.
 * See: https://github.com/webpack/webpack/issues/7566
 */
exports.evaluators = {
    /** Simple Values */
    Literal: function* (node, context) {
        return node.value;
    },
    ThisExpression: function* (node, context) {
        return context.runtime.frames[0].thisContext;
    },
    ArrayExpression: function* (node, context) {
        const res = [];
        for (const n of node.elements) {
            res.push(yield* evaluate(n, context));
        }
        return res;
    },
    FunctionExpression: function* (node, context) {
        return new types_1.Closure(node, currentFrame(context), context);
    },
    ArrowFunctionExpression: function* (node, context) {
        return new types_1.ArrowClosure(node, currentFrame(context), context);
    },
    Identifier: function* (node, context) {
        return getVariable(context, node.name);
    },
    CallExpression: function* (node, context) {
        const callee = yield* evaluate(node.callee, context);
        const args = yield* getArgs(context, node);
        let thisContext;
        if (node.callee.type === 'MemberExpression') {
            thisContext = yield* evaluate(node.callee.object, context);
        }
        const result = yield* apply(context, callee, args, node, thisContext);
        return result;
    },
    NewExpression: function* (node, context) {
        const callee = yield* evaluate(node.callee, context);
        const args = [];
        for (const arg of node.arguments) {
            args.push(yield* evaluate(arg, context));
        }
        const obj = {};
        if (callee instanceof types_1.Closure) {
            obj.__proto__ = callee.fun.prototype;
            callee.fun.apply(obj, args);
        }
        else {
            obj.__proto__ = callee.prototype;
            callee.apply(obj, args);
        }
        return obj;
    },
    UnaryExpression: function* (node, context) {
        const value = yield* evaluate(node.argument, context);
        const error = rttc.checkUnaryExpression(context, node.operator, value);
        if (error) {
            handleError(context, error);
            return undefined;
        }
        if (node.operator === '!') {
            return !value;
        }
        else if (node.operator === '-') {
            return -value;
        }
        else {
            return +value;
        }
    },
    BinaryExpression: function* (node, context) {
        const left = yield* evaluate(node.left, context);
        const right = yield* evaluate(node.right, context);
        const error = rttc.checkBinaryExpression(context, node.operator, left, right);
        if (error) {
            handleError(context, error);
            return undefined;
        }
        let result;
        switch (node.operator) {
            case '+':
                result = left + right;
                break;
            case '-':
                result = left - right;
                break;
            case '*':
                result = left * right;
                break;
            case '/':
                result = left / right;
                break;
            case '%':
                result = left % right;
                break;
            case '===':
                result = left === right;
                break;
            case '!==':
                result = left !== right;
                break;
            case '<=':
                result = left <= right;
                break;
            case '<':
                result = left < right;
                break;
            case '>':
                result = left > right;
                break;
            case '>=':
                result = left >= right;
                break;
            default:
                result = undefined;
        }
        return result;
    },
    ConditionalExpression: function* (node, context) {
        return yield* this.IfStatement(node, context);
    },
    LogicalExpression: function* (node, context) {
        const left = yield* evaluate(node.left, context);
        let error = rttc.checkLogicalExpression(context, left, true);
        if (error) {
            handleError(context, error);
            return undefined;
        }
        else if ((node.operator === '&&' && left) || (node.operator === '||' && !left)) {
            // only evaluate right if required (lazy); but when we do, check typeof right
            const right = yield* evaluate(node.right, context);
            error = rttc.checkLogicalExpression(context, left, right);
            if (error) {
                handleError(context, error);
                return undefined;
            }
            else {
                return right;
            }
        }
        else {
            return left;
        }
    },
    VariableDeclaration: function* (node, context) {
        const declaration = node.declarations[0];
        const id = declaration.id;
        const value = yield* evaluate(declaration.init, context);
        defineVariable(context, id.name, value);
        return undefined;
    },
    ContinueStatement: function* (node, context) {
        return new ContinueValue();
    },
    BreakStatement: function* (node, context) {
        return new BreakValue();
    },
    ForStatement: function* (node, context) {
        if (node.init) {
            yield* evaluate(node.init, context);
        }
        let test = node.test ? yield* evaluate(node.test, context) : true;
        let value;
        while (test) {
            value = yield* evaluate(node.body, context);
            if (value instanceof ContinueValue) {
                value = undefined;
            }
            if (value instanceof BreakValue) {
                value = undefined;
                break;
            }
            if (value instanceof ReturnValue) {
                break;
            }
            if (node.update) {
                yield* evaluate(node.update, context);
            }
            test = node.test ? yield* evaluate(node.test, context) : true;
        }
        if (value instanceof BreakValue) {
            return undefined;
        }
        return value;
    },
    MemberExpression: function* (node, context) {
        let obj = yield* evaluate(node.object, context);
        if (obj instanceof types_1.Closure) {
            obj = obj.fun;
        }
        if (node.computed) {
            const prop = yield* evaluate(node.property, context);
            return obj[prop];
        }
        else {
            const name = node.property.name;
            if (name === 'prototype') {
                return obj.prototype;
            }
            else {
                return obj[name];
            }
        }
    },
    AssignmentExpression: function* (node, context) {
        if (node.left.type === 'MemberExpression') {
            const left = node.left;
            const obj = yield* evaluate(left.object, context);
            let prop;
            if (left.computed) {
                prop = yield* evaluate(left.property, context);
            }
            else {
                prop = left.property.name;
            }
            const val = yield* evaluate(node.right, context);
            obj[prop] = val;
            return val;
        }
        const id = node.left;
        // Make sure it exist
        const value = yield* evaluate(node.right, context);
        setVariable(context, id.name, value);
        return value;
    },
    FunctionDeclaration: function* (node, context) {
        const id = node.id;
        // tslint:disable-next-line:no-any
        const closure = new types_1.Closure(node, currentFrame(context), context);
        defineVariable(context, id.name, closure);
        return undefined;
    },
    *IfStatement(node, context) {
        const test = yield* evaluate(node.test, context);
        const error = rttc.checkIfStatement(context, test);
        if (error) {
            handleError(context, error);
            return undefined;
        }
        // Create a new frame (block scoping)
        const frame = createBlockFrame(context, [], []);
        pushFrame(context, frame);
        if (test) {
            const result = yield* evaluate(node.consequent, context);
            popFrame(context);
            return result;
        }
        else if (node.alternate) {
            const result = yield* evaluate(node.alternate, context);
            popFrame(context);
            return result;
        }
        else {
            return undefined;
        }
    },
    ExpressionStatement: function* (node, context) {
        return yield* evaluate(node.expression, context);
    },
    *ReturnStatement(node, context) {
        if (node.argument) {
            if (node.argument.type === 'CallExpression') {
                const callee = yield* evaluate(node.argument.callee, context);
                const args = yield* getArgs(context, node.argument);
                return new TailCallReturnValue(callee, args, node.argument);
            }
            else {
                return new ReturnValue(yield* evaluate(node.argument, context));
            }
        }
        else {
            return new ReturnValue(undefined);
        }
    },
    WhileStatement: function* (node, context) {
        let value; // tslint:disable-line
        let test;
        while (
        // tslint:disable-next-line
        (test = yield* evaluate(node.test, context)) &&
            !(value instanceof ReturnValue) &&
            !(value instanceof BreakValue) &&
            !(value instanceof TailCallReturnValue)) {
            value = yield* evaluate(node.body, context);
        }
        if (value instanceof BreakValue) {
            return undefined;
        }
        return value;
    },
    ObjectExpression: function* (node, context) {
        const obj = {};
        for (const prop of node.properties) {
            let key;
            if (prop.key.type === 'Identifier') {
                key = prop.key.name;
            }
            else {
                key = yield* evaluate(prop.key, context);
            }
            obj[key] = yield* evaluate(prop.value, context);
        }
        return obj;
    },
    BlockStatement: function* (node, context) {
        let result;
        for (const statement of node.body) {
            result = yield* evaluate(statement, context);
            if (result instanceof ReturnValue ||
                result instanceof BreakValue ||
                result instanceof ContinueValue) {
                break;
            }
        }
        return result;
    },
    Program: function* (node, context) {
        let result;
        for (const statement of node.body) {
            result = yield* evaluate(statement, context);
            if (result instanceof ReturnValue) {
                break;
            }
        }
        return result;
    }
};
function* evaluate(node, context) {
    yield* visit(context, node);
    const result = yield* exports.evaluators[node.type](node, context);
    yield* leave(context);
    return result;
}
exports.evaluate = evaluate;
function* apply(context, fun, args, node, thisContext) {
    let result;
    let total = 0;
    while (!(result instanceof ReturnValue)) {
        if (fun instanceof types_1.Closure) {
            checkNumberOfArguments(context, fun, args, node);
            const frame = createFrame(fun, args, node);
            frame.thisContext = thisContext;
            if (result instanceof TailCallReturnValue) {
                replaceFrame(context, frame);
            }
            else {
                pushFrame(context, frame);
                total++;
            }
            result = yield* evaluate(fun.node.body, context);
            if (result instanceof TailCallReturnValue) {
                fun = result.callee;
                node = result.node;
                args = result.args;
            }
            else if (!(result instanceof ReturnValue)) {
                // No Return Value, set it as undefined
                result = new ReturnValue(undefined);
            }
        }
        else if (fun instanceof types_1.ArrowClosure) {
            checkNumberOfArguments(context, fun, args, node);
            const frame = createFrame(fun, args, node);
            frame.thisContext = thisContext;
            if (result instanceof TailCallReturnValue) {
                replaceFrame(context, frame);
            }
            else {
                pushFrame(context, frame);
                total++;
            }
            result = new ReturnValue(yield* evaluate(fun.node.body, context));
        }
        else if (typeof fun === 'function') {
            try {
                const as = args.map(a => interop_1.toJS(a, context));
                result = fun.apply(thisContext, as);
                break;
            }
            catch (e) {
                // Recover from exception
                const globalFrame = context.runtime.frames[context.runtime.frames.length - 1];
                context.runtime.frames = [globalFrame];
                const loc = node ? node.loc : constants.UNKNOWN_LOCATION;
                handleError(context, new errors.ExceptionError(e, loc));
                result = undefined;
            }
        }
        else {
            handleError(context, new errors.CallingNonFunctionValue(fun, node));
            result = undefined;
            break;
        }
    }
    // Unwraps return value and release stack frame
    if (result instanceof ReturnValue) {
        result = result.value;
    }
    for (let i = 1; i <= total; i++) {
        popFrame(context);
    }
    return result;
}
exports.apply = apply;
//# sourceMappingURL=interpreter.js.map


//////////////////
// WEBPACK FOOTER
// ./node_modules/js-slang/dist/interpreter.js
// module id = 417
// module chunks = 0