# Functions

> **Quick Summary:** Functions are reusable blocks of code. They're fundamental to organising and structuring JavaScript programs.

## What You'll Learn

- Differences between function declarations and expressions
- Modern arrow function syntax
- Effectively using parameters and return values
- Critical concepts of scope and closures

## Why Functions?

Functions allow you to write code once and use it many times, which helps you break complex problems into smaller, more manageable pieces. By abstracting away implementation details, you can create programs that are both clearer and more readable while ensuring that your code remains easy to maintain as it grows.

## Function Declarations

The traditional way:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

greet('World');  // "Hello, World!"
```

### Components

A typical function declaration consists of the `function` keyword followed by a unique name and any necessary parameters enclosed in parentheses. The body of the function contains the code to be executed, and an optional return statement allows you to send a specific value back to the caller.

## Function Expressions

Assign a function to a variable:

```javascript
const greet = function(name) {
  return `Hello, ${name}!`;
};

greet('World');  // "Hello, World!"
```

## Arrow Functions

Modern, concise syntax:

```javascript
const greet = (name) => {
  return `Hello, ${name}!`;
};

// Shorter: implicit return for single expressions
const greet = (name) => `Hello, ${name}!`;

// Single parameter: parentheses optional
const greet = name => `Hello, ${name}!`;

// No parameters: need empty parentheses
const sayHi = () => 'Hi!';
```

Arrow functions are preferred in modern JavaScript, especially for callbacks.

## Parameters

### Default Parameters

```javascript
function greet(name = 'World') {
  return `Hello, ${name}!`;
}

greet();        // "Hello, World!"
greet('Alice'); // "Hello, Alice!"
```

### Rest Parameters

Collect remaining arguments:

```javascript
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3);     // 6
sum(1, 2, 3, 4);  // 10
```

### Destructuring Parameters

```javascript
function createUser({ name, age, email }) {
  return { name, age, email, id: Date.now() };
}

createUser({ name: 'Alice', age: 30, email: 'alice@example.com' });
```

## Return Values

Every function in JavaScript can return a value, ranging from simple primitive types like numbers to more complex objects. You can use early return statements to exit a function immediately if certain conditions are met, such as returning `null` when a division by zero is attempted. If a function does not include a return statement, it will automatically return `undefined` by default.

## Scope

Variables have different visibility depending on where they're declared.

### Block Scope

`const` and `let` are block-scoped:

```javascript
function example() {
  if (true) {
    const x = 10;
    let y = 20;
    // x and y exist here
  }
  // x and y don't exist here
}
```

### Function Scope

Variables inside a function aren't accessible outside:

```javascript
function outer() {
  const secret = 'hidden';
  // secret exists here
}

// secret doesn't exist here
```

### Lexical Scope

Inner functions can access outer function variables:

```javascript
function outer() {
  const name = 'Alice';
  
  function inner() {
    console.log(name);  // Can access 'name'
  }
  
  inner();
}
```

## Closures

A closure is a function that "remembers" its lexical scope:

```javascript
function createCounter() {
  let count = 0;
  
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
counter();  // 1
counter();  // 2
counter();  // 3
```

The inner function "closes over" the `count` variable.

### Practical Closure Example

```javascript
function createLogger(prefix) {
  return function(message) {
    console.log(`[${prefix}] ${message}`);
  };
}

const infoLog = createLogger('INFO');
const errorLog = createLogger('ERROR');

infoLog('User logged in');   // [INFO] User logged in
errorLog('Connection lost'); // [ERROR] Connection lost
```

## Higher-Order Functions

Functions that take or return functions:

### Functions as Arguments

```javascript
function doTwice(fn) {
  fn();
  fn();
}

doTwice(() => console.log('Hello'));
// Hello
// Hello
```

### Array Methods

Many array methods take functions:

```javascript
const numbers = [1, 2, 3, 4, 5];

// map: transform each element
numbers.map(n => n * 2);  // [2, 4, 6, 8, 10]

// filter: keep matching elements
numbers.filter(n => n > 2);  // [3, 4, 5]

// find: get first match
numbers.find(n => n > 2);  // 3

// reduce: accumulate to single value
numbers.reduce((sum, n) => sum + n, 0);  // 15

// forEach: iterate without return
numbers.forEach(n => console.log(n));

// some: true if any match
numbers.some(n => n > 4);  // true

// every: true if all match
numbers.every(n => n > 0);  // true
```

## Callback Functions

Functions passed to other functions:

```javascript
function fetchData(callback) {
  // Simulate async operation
  setTimeout(() => {
    const data = { name: 'Alice' };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log(data.name);  // "Alice" (after 1 second)
});
```

## Immediately Invoked Function Expressions (IIFE)

Functions that run immediately:

```javascript
(function() {
  const private = 'hidden';
  console.log('Running immediately');
})();

// Arrow function version
(() => {
  console.log('Also runs immediately');
})();
```

## Try It Yourself

### Exercise 1: Calculator Functions

Practise creating reusable functions for basic mathematical operations, including addition, subtraction, multiplication, and division. Ensure that your division function correctly handles scenarios where the divisor is zero to prevent errors in your application.

### Exercise 2: Array Processing

Using an array of user objects that includes names and ages, apply various array methods to extract a list of names, filter for users above a certain age, and calculate the total age of the entire group. You should also attempt to identify the youngest user within the collection.

### Exercise 3: Closure Practice

Develop a `createMultiplier` function that accepts a factor and returns a new function. This returned function should take a single argument and multiply it by the original factor, allowing you to easily create specialised functions like `double` or `triple`.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "js-functions-quiz",
  "type": "multiple-choice",
  "title": "Functions in JavaScript",
  "description": "Test your understanding of arrow functions.",
  "difficulty": "medium",
  "question": "When should you use a traditional function instead of an arrow function?",
  "options": [
    {
      "id": "a",
      "text": "Arrow functions are always preferred in modern JavaScript",
      "isCorrect": false,
      "explanation": "There are cases where traditional functions are necessary."
    },
    {
      "id": "b",
      "text": "When you need the function's own 'this' context (like object methods)",
      "isCorrect": true,
      "explanation": "Correct! Arrow functions don't have their own 'this'. They inherit from the enclosing scope. For object methods that need 'this' to refer to the object, use traditional functions."
    },
    {
      "id": "c",
      "text": "When the function needs to return a value",
      "isCorrect": false,
      "explanation": "Arrow functions can return values just fine."
    },
    {
      "id": "d",
      "text": "When you have more than one parameter",
      "isCorrect": false,
      "explanation": "Arrow functions handle any number of parameters."
    }
  ]
}
-->

## Key Takeaways

To recap, functions are a fundamental building block in JavaScript, and you can define them using either the traditional `function` keyword or the concise arrow function syntax. Understanding how to manage function parameters—including defaults and rest syntax—is essential for building flexible programs. Additionally, mastering scope and closures will allow you to manage variable visibility effectively, while leveraging higher-order functions like `map` and `filter` will enable you to process complex data sets with ease.

## Next Steps

Continue to [Control Flow](./04-control-flow.md) →
