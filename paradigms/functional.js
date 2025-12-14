/**
 * Functional Programming - JavaScript
 * 
 * Programming paradigm emphasizing pure functions, immutability, and higher-order functions.
 */

// Pure functions - no side effects, same input = same output
const add = (a, b) => a + b;

const multiply = (a, b) => a * b;

// Higher-order functions - functions that take or return functions
const map = (arr, fn) => arr.map(fn);

const filter = (arr, predicate) => arr.filter(predicate);

const reduce = (arr, fn, initial) => arr.reduce(fn, initial);

// Function composition
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);

const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

// Currying - transforming a function with multiple arguments into a sequence of functions
const curry = (fn) => {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...nextArgs) {
                return curried.apply(this, args.concat(nextArgs));
            };
        }
    };
};

// Immutability - creating new objects instead of mutating
const addItem = (list, item) => [...list, item];

const updateItem = (list, index, newItem) => [
    ...list.slice(0, index),
    newItem,
    ...list.slice(index + 1)
];

const removeItem = (list, index) => [
    ...list.slice(0, index),
    ...list.slice(index + 1)
];

// Recursive functions
const factorial = (n) => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
};

const fibonacci = (n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
};

// Memoization for optimization
const memoize = (fn) => {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
};

const memoizedFibonacci = memoize(fibonacci);

// Closures
const createCounter = () => {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
};

// Example usage
console.log('=== Functional Programming ===\n');

// Pure functions
console.log('Pure functions:');
console.log(`add(5, 3) = ${add(5, 3)}`);
console.log(`multiply(4, 7) = ${multiply(4, 7)}`);

// Higher-order functions
console.log('\nHigher-order functions:');
const numbers = [1, 2, 3, 4, 5];
console.log('Original:', numbers);
console.log('Mapped (x2):', map(numbers, x => x * 2));
console.log('Filtered (even):', filter(numbers, x => x % 2 === 0));
console.log('Reduced (sum):', reduce(numbers, (acc, x) => acc + x, 0));

// Function composition
console.log('\nFunction composition:');
const double = x => x * 2;
const addOne = x => x + 1;
const square = x => x * x;

const composed = compose(square, addOne, double);
const piped = pipe(double, addOne, square);
console.log(`compose(square, addOne, double)(3) = ${composed(3)}`);
console.log(`pipe(double, addOne, square)(3) = ${piped(3)}`);

// Currying
console.log('\nCurrying:');
const curriedAdd = curry((a, b, c) => a + b + c);
console.log(`curriedAdd(1)(2)(3) = ${curriedAdd(1)(2)(3)}`);
console.log(`curriedAdd(1, 2)(3) = ${curriedAdd(1, 2)(3)}`);

// Immutability
console.log('\nImmutability:');
const originalList = [1, 2, 3];
const newList = addItem(originalList, 4);
console.log('Original:', originalList);
console.log('New list:', newList);
console.log('Original unchanged:', originalList);

// Recursion
console.log('\nRecursion:');
console.log(`factorial(5) = ${factorial(5)}`);
console.log(`fibonacci(7) = ${fibonacci(7)}`);
console.log(`memoizedFibonacci(40) = ${memoizedFibonacci(40)}`);

// Closures
console.log('\nClosures:');
const counter = createCounter();
counter.increment();
counter.increment();
console.log('Counter:', counter.getCount());

module.exports = {
    add, multiply, map, filter, reduce,
    compose, pipe, curry,
    addItem, updateItem, removeItem,
    factorial, fibonacci, memoize, memoizedFibonacci,
    createCounter
};

