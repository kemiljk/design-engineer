# Variables and Types

> **Quick Summary:** Variables store data; types define what kind of data. Understanding both is fundamental to JavaScript.

## What You'll Learn

- Declaring variables with `const`, `let`, and `var`
- JavaScript's data types
- Working with strings, numbers, booleans, arrays, and objects
- Type checking and conversion

## Declaring Variables

<!-- illustration: js-data-types -->

### const (Constants)

Use `const` for values that won't be reassigned:

```javascript
const name = 'Design Engineer';
const pi = 3.14159;
const isActive = true;

name = 'Developer'; // Error! Can't reassign const
```

`const` is your default choice.

### let (Variables)

Use `let` for values that will change:

```javascript
let count = 0;
count = 1; // OK
count = count + 1; // OK

let score;  // Declared but undefined
score = 100;
```

### var (Avoid)

The old way. Has quirky scoping behavior:

```javascript
var oldStyle = 'avoid this';
```

Prefer `const` and `let` in modern JavaScript.

### Naming Conventions

```javascript
const firstName = 'John';        // camelCase for most variables
const MAX_SIZE = 100;            // UPPER_SNAKE_CASE for constants
const UserComponent = () => {};  // PascalCase for components/classes
```

## Primitive Types

### String

Text data:

```javascript
const single = 'Hello';
const double = "World";
const template = `Hello, ${name}!`;  // Template literal

// Common string methods
'hello'.toUpperCase();     // "HELLO"
'hello'.length;            // 5
'hello'.includes('ell');   // true
'hello'.split('');         // ["h", "e", "l", "l", "o"]
```

### Number

All numbers (integers and decimals):

```javascript
const integer = 42;
const decimal = 3.14;
const negative = -10;

// Math operations
10 + 5;   // 15
10 - 5;   // 5
10 * 5;   // 50
10 / 5;   // 2
10 % 3;   // 1 (remainder)
10 ** 2;  // 100 (power)

// Common methods
Math.round(3.7);    // 4
Math.floor(3.7);    // 3
Math.ceil(3.2);     // 4
Math.random();      // 0-1 random
Math.max(1, 5, 3);  // 5
```

### Boolean

True or false:

```javascript
const isVisible = true;
const isDisabled = false;

// Boolean operations
!true;         // false (NOT)
true && false; // false (AND)
true || false; // true (OR)
```

### Undefined and Null

```javascript
let noValue;          // undefined - no value assigned
const empty = null;   // null - intentionally empty
```

### Symbol and BigInt

Less common:

```javascript
const sym = Symbol('id');
const big = 9007199254740991n;  // BigInt for huge numbers
```

## Arrays

Ordered lists of values:

```javascript
const colors = ['red', 'green', 'blue'];

// Access by index (0-based)
colors[0];  // "red"
colors[2];  // "blue"

// Array methods
colors.length;           // 3
colors.push('yellow');   // Add to end
colors.pop();            // Remove from end
colors.includes('red');  // true
colors.indexOf('green'); // 1

// Iteration
colors.forEach(color => console.log(color));
colors.map(color => color.toUpperCase());
colors.filter(color => color.length > 3);
```

### Destructuring Arrays

```javascript
const [first, second, ...rest] = colors;
// first = "red", second = "green", rest = ["blue"]
```

## Objects

Collections of key-value pairs:

```javascript
const user = {
  name: 'Alice',
  age: 30,
  isAdmin: false
};

// Access properties
user.name;        // "Alice"
user['age'];      // 30

// Modify
user.age = 31;
user.email = 'alice@example.com';  // Add new property

// Check if property exists
'name' in user;   // true
```

### Destructuring Objects

```javascript
const { name, age } = user;
// name = "Alice", age = 30

// With renaming
const { name: userName } = user;
// userName = "Alice"

// With default
const { role = 'user' } = user;
// role = "user" (default, since not in object)
```

### Object Methods

```javascript
Object.keys(user);    // ["name", "age", "isAdmin"]
Object.values(user);  // ["Alice", 30, false]
Object.entries(user); // [["name", "Alice"], ["age", 30], ...]
```

## Type Checking

### typeof Operator

```javascript
typeof 'hello';    // "string"
typeof 42;         // "number"
typeof true;       // "boolean"
typeof undefined;  // "undefined"
typeof null;       // "object" (historical bug)
typeof [];         // "object"
typeof {};         // "object"
```

### Array.isArray()

```javascript
Array.isArray([1, 2, 3]);  // true
Array.isArray('hello');    // false
```

## Type Conversion

### To String

```javascript
String(123);        // "123"
(123).toString();   // "123"
`${123}`;           // "123"
```

### To Number

```javascript
Number('123');      // 123
Number('hello');    // NaN (Not a Number)
parseInt('123px');  // 123
parseFloat('3.14'); // 3.14
```

### To Boolean

```javascript
Boolean(1);         // true
Boolean(0);         // false
Boolean('');        // false
Boolean('hello');   // true
Boolean(null);      // false
Boolean(undefined); // false

// Falsy values: 0, '', null, undefined, NaN, false
// Everything else is truthy
```

## Template Literals

Modern string formatting:

```javascript
const name = 'World';
const greeting = `Hello, ${name}!`;

// Multi-line
const html = `
  <div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
  </div>
`;

// Expressions
const result = `Total: ${price * quantity}`;
```

## Spread Operator

Copy and combine arrays/objects:

```javascript
// Arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

// Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };  // { a: 1, b: 2, c: 3 }

// Copy (not reference)
const copy = [...arr1];
const objCopy = { ...obj1 };
```

## Try It Yourself

### Exercise 1: User Object

Create a user object with:
- name (string)
- age (number)
- hobbies (array of strings)
- address (nested object with city and country)

Access and log various properties.

### Exercise 2: Array Operations

Given `const numbers = [1, 2, 3, 4, 5]`:
1. Add 6 to the end
2. Create a new array with each number doubled
3. Filter to only even numbers
4. Find the sum of all numbers

### Exercise 3: Template Literals

Create a function that takes user data and returns an HTML string for a profile card using template literals.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "js-variables-quiz",
  "type": "multiple-choice",
  "title": "Variables and Types",
  "description": "Test your understanding of JavaScript variables.",
  "difficulty": "medium",
  "question": "Why should you prefer 'const' over 'let' when declaring variables?",
  "options": [
    {
      "id": "a",
      "text": "const is faster for the browser to process",
      "isCorrect": false,
      "explanation": "Performance difference is negligible. This is about code quality."
    },
    {
      "id": "b",
      "text": "const signals intent (this value won't be reassigned), making code easier to understand",
      "isCorrect": true,
      "explanation": "Correct! Using const when you won't reassign communicates your intent, prevents accidental reassignment, and makes code more predictable."
    },
    {
      "id": "c",
      "text": "const values can never change in any way",
      "isCorrect": false,
      "explanation": "const prevents reassignment, but object properties and array contents can still be modified."
    },
    {
      "id": "d",
      "text": "let is deprecated and shouldn't be used",
      "isCorrect": false,
      "explanation": "let is still valid and useful when you need to reassign a variable."
    }
  ]
}
-->

## Key Takeaways

- Use `const` by default, `let` when reassignment is needed
- Primitive types: string, number, boolean, undefined, null
- Arrays are ordered lists; objects are key-value collections
- Destructuring extracts values from arrays/objects
- Template literals enable string interpolation
- Spread operator (`...`) copies and combines

## Next Steps

Continue to [Functions](./03-functions.md) →
