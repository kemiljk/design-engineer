# Modern JavaScript

> **Quick Summary:** ES6 and beyond brought powerful features that make JavaScript more expressive and maintainable. These features are essential for modern development.

## What You'll Learn

- Destructuring assignment
- Spread and rest operators
- Modules (import/export)
- Classes
- Other useful ES6+ features

## Destructuring

Extract values from arrays and objects into variables.

### Array Destructuring

```javascript
const colors = ['red', 'green', 'blue'];

// Traditional
const first = colors[0];
const second = colors[1];

// Destructuring
const [first, second, third] = colors;

// Skip values
const [, , third] = colors;

// Default values
const [a, b, c = 'default'] = ['x', 'y'];

// Rest
const [head, ...tail] = colors;
// head = 'red', tail = ['green', 'blue']
```

### Object Destructuring

```javascript
const user = { name: 'Alice', age: 30, email: 'alice@example.com' };

// Traditional
const name = user.name;

// Destructuring
const { name, age } = user;

// Rename variables
const { name: userName, age: userAge } = user;

// Default values
const { name, role = 'user' } = user;

// Nested
const { address: { city } } = { address: { city: 'NYC' } };
```

### Function Parameters

```javascript
// Object destructuring in parameters
function createUser({ name, age, email }) {
  return { id: Date.now(), name, age, email };
}

// With defaults
function greet({ name = 'Guest', greeting = 'Hello' } = {}) {
  return `${greeting}, ${name}!`;
}
```

## Spread Operator

Expand iterables (arrays, objects) into individual elements.

### Arrays

```javascript
// Combine arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];  // [1, 2, 3, 4, 5, 6]

// Copy array
const copy = [...arr1];

// Function arguments
const numbers = [1, 2, 3];
Math.max(...numbers);  // 3

// Add to existing array
const withMore = [...arr1, 4, 5];
```

### Objects

```javascript
// Combine objects
const defaults = { theme: 'light', lang: 'en' };
const userPrefs = { theme: 'dark' };
const settings = { ...defaults, ...userPrefs };
// { theme: 'dark', lang: 'en' }

// Copy object
const copy = { ...original };

// Add/override properties
const updated = { ...user, age: 31 };
```

## Rest Parameters

Collect remaining elements.

### In Functions

```javascript
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3, 4);  // 10

// With other parameters
function log(level, ...messages) {
  messages.forEach(msg => console.log(`[${level}]`, msg));
}
```

### In Destructuring

```javascript
const [first, ...rest] = [1, 2, 3, 4];
// first = 1, rest = [2, 3, 4]

const { name, ...otherProps } = user;
// name = 'Alice', otherProps = { age: 30, email: '...' }
```

## Modules

Organize code into separate files.

### Named Exports

```javascript
// utils.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

```javascript
// main.js
import { add, subtract, PI } from './utils.js';
import { add as sum } from './utils.js';  // Rename
import * as utils from './utils.js';       // Import all
```

### Default Export

```javascript
// Button.js
export default function Button({ children }) {
  return <button>{children}</button>;
}
```

```javascript
// main.js
import Button from './Button.js';  // Name it anything
import MyButton from './Button.js';
```

### Re-exports

```javascript
// components/index.js
export { Button } from './Button.js';
export { Card } from './Card.js';
export { default as Modal } from './Modal.js';
```

## Classes

Object-oriented programming in JavaScript.

### Basic Class

```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  greet() {
    return `Hello, ${this.name}!`;
  }
  
  static createGuest() {
    return new User('Guest', 'guest@example.com');
  }
}

const user = new User('Alice', 'alice@example.com');
user.greet();  // "Hello, Alice!"
User.createGuest();  // Static method
```

### Inheritance

```javascript
class Admin extends User {
  constructor(name, email, permissions) {
    super(name, email);  // Call parent constructor
    this.permissions = permissions;
  }
  
  greet() {
    return `${super.greet()} You're an admin.`;
  }
}
```

### Getters and Setters

```javascript
class Circle {
  constructor(radius) {
    this._radius = radius;
  }
  
  get radius() {
    return this._radius;
  }
  
  set radius(value) {
    if (value < 0) throw new Error('Radius must be positive');
    this._radius = value;
  }
  
  get area() {
    return Math.PI * this._radius ** 2;
  }
}

const circle = new Circle(5);
circle.area;     // 78.54...
circle.radius = 10;
```

### Private Fields

```javascript
class Counter {
  #count = 0;  // Private field
  
  increment() {
    this.#count++;
  }
  
  get value() {
    return this.#count;
  }
}
```

## Other Useful Features

### Optional Chaining

```javascript
const city = user?.address?.city;
const first = arr?.[0];
const result = obj?.method?.();
```

### Nullish Coalescing

```javascript
const value = input ?? 'default';
// Only uses default for null/undefined, not '' or 0
```

### Object Shorthand

```javascript
const name = 'Alice';
const age = 30;

// Shorthand property names
const user = { name, age };  // { name: 'Alice', age: 30 }

// Shorthand method
const obj = {
  greet() {  // Instead of greet: function()
    return 'Hello';
  }
};

// Computed property names
const key = 'dynamicKey';
const obj = { [key]: 'value' };  // { dynamicKey: 'value' }
```

### Template Literals

```javascript
const name = 'World';
const greeting = `Hello, ${name}!`;

// Multi-line
const html = `
  <div>
    <h1>${title}</h1>
  </div>
`;

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => 
    result + str + (values[i] ? `<mark>${values[i]}</mark>` : ''), ''
  );
}

highlight`Hello ${name}, welcome!`;
```

### Array Methods

```javascript
// Array.from
Array.from('hello');  // ['h', 'e', 'l', 'l', 'o']
Array.from({ length: 5 }, (_, i) => i);  // [0, 1, 2, 3, 4]

// Array.includes
[1, 2, 3].includes(2);  // true

// Array.find / findIndex
[1, 2, 3].find(n => n > 1);      // 2
[1, 2, 3].findIndex(n => n > 1); // 1

// Array.flat
[[1, 2], [3, 4]].flat();  // [1, 2, 3, 4]

// Array.flatMap
[1, 2].flatMap(n => [n, n * 2]);  // [1, 2, 2, 4]
```

### Object Methods

```javascript
// Object.entries / fromEntries
Object.entries({ a: 1, b: 2 });  // [['a', 1], ['b', 2]]
Object.fromEntries([['a', 1]]);  // { a: 1 }

// Object.assign
Object.assign({}, obj1, obj2);  // Merge objects

// Object.keys / values
Object.keys({ a: 1, b: 2 });    // ['a', 'b']
Object.values({ a: 1, b: 2 });  // [1, 2]
```

## Try It Yourself

### Exercise 1: Destructuring Practice

Given this data:
```javascript
const response = {
  data: {
    users: [
      { id: 1, name: 'Alice', role: 'admin' },
      { id: 2, name: 'Bob', role: 'user' }
    ],
    total: 2
  },
  status: 200
};
```

Use destructuring to extract:
1. The first user's name
2. All users
3. The status code

### Exercise 2: Module Refactoring

Split this code into modules:
```javascript
const API_URL = 'https://api.example.com';

function fetchUsers() { /* ... */ }
function fetchPosts() { /* ... */ }

function formatDate(date) { /* ... */ }
function formatCurrency(amount) { /* ... */ }
```

Create: `api.js`, `formatters.js`, and `constants.js`.

### Exercise 3: Class Creation

Create a `TodoList` class with:
- Private `#items` array
- `add(text)` method
- `remove(id)` method  
- `toggle(id)` method
- `items` getter

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "js-modern-quiz",
  "type": "multiple-choice",
  "title": "Modern JavaScript",
  "description": "Test your understanding of modern JS features.",
  "difficulty": "medium",
  "question": "What does the spread operator (...) do when used with an array?",
  "options": [
    {
      "id": "a",
      "text": "It modifies the original array in place",
      "isCorrect": false,
      "explanation": "Spread creates a new array. It doesn't modify the original."
    },
    {
      "id": "b",
      "text": "It creates a shallow copy, spreading each element into a new array or function call",
      "isCorrect": true,
      "explanation": "Correct! Spread 'unpacks' array elements, useful for copying arrays ([...arr]), merging ([...arr1, ...arr2]), or passing arrays as function arguments."
    },
    {
      "id": "c",
      "text": "It creates a deep copy of all nested objects",
      "isCorrect": false,
      "explanation": "Spread only creates a shallow copy—nested objects are still references."
    },
    {
      "id": "d",
      "text": "It converts the array to a string",
      "isCorrect": false,
      "explanation": "Spread unpacks elements, it doesn't stringify."
    }
  ]
}
-->

## Key Takeaways

- Destructuring extracts values from arrays/objects
- Spread (`...`) expands; rest (`...`) collects
- Modules organize code with `import`/`export`
- Classes provide object-oriented patterns
- Optional chaining (`?.`) safely accesses nested properties
- Nullish coalescing (`??`) provides defaults for null/undefined only
- Modern array/object methods make data manipulation easier

## Next Steps

Congratulations! You've completed the JavaScript Essentials module.

You now understand:
- Variables, types, and functions
- Control flow and DOM manipulation
- Events and async data fetching
- Modern JavaScript features

Continue to [Building Components: Component Thinking](../04-building-components/01-component-thinking.md) →
