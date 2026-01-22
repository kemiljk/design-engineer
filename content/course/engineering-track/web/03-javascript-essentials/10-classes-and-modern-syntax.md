---
estimatedTime: 12
---

# Classes and Modern Syntax

> **Quick Summary:** ES6 classes provide a cleaner syntax for object-oriented patterns. Combined with optional chaining, nullish coalescing, and modern methods, JavaScript becomes more expressive and robust.

## What You'll Learn

- Syntax and benefits of JavaScript classes (inheritance, getters, setters)
- Using optional chaining for safe property access
- Nullish coalescing to provide reliable default values
- Modern object and array methods for expressive, robust code

## Classes

Classes provide a cleaner syntax for constructor functions and prototypes.

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

Extend classes with `extends`:

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

const admin = new Admin('Alice', 'alice@example.com', ['read', 'write']);
admin.greet();  // "Hello, Alice! You're an admin."
```

### Getters and Setters

Computed properties with validation:

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
circle.area;        // 78.54...
circle.radius = 10; // Uses setter
circle.radius;      // 10 (uses getter)
```

### Private Fields

Truly private with `#`:

```javascript
class Counter {
  #count = 0;  // Private field
  
  increment() {
    this.#count++;
  }
  
  decrement() {
    this.#count--;
  }
  
  get value() {
    return this.#count;
  }
}

const counter = new Counter();
counter.increment();
counter.value;   // 1
counter.#count;  // SyntaxError: Private field
```

## Optional Chaining

Optional chaining allows you to safely access deeply nested object properties without having to manually check that each level of the structure exists. If any part of the chain—whether it is a property, an array element, or even a method call—is `null` or `undefined`, the entire expression will simply return `undefined` instead of throwing a runtime error. This makes your code considerably more robust when dealing with potentially incomplete data from external APIs.

## Nullish Coalescing

The nullish coalescing operator (`??`) provides a safe way to specify default values, particularly when you only want to override `null` or `undefined`. Unlike the traditional OR (`||`) operator, which triggers on any "falsy" value—including zero or an empty string—the nullish coalescing operator allows these valid values to persist, ensuring that your application's logic remains precise and predictable.

```javascript
// Common pattern for optional config
function createButton({ size = 'medium', disabled = false } = {}) {
  const actualSize = size ?? 'medium';
  const actualDisabled = disabled ?? false;
}
```

## Object Shorthand

Cleaner object syntax:

```javascript
const name = 'Alice';
const age = 30;

// Shorthand property names
const user = { name, age };  // { name: 'Alice', age: 30 }

// Shorthand methods
const obj = {
  greet() {  // Instead of greet: function()
    return 'Hello';
  }
};

// Computed property names
const key = 'dynamicKey';
const obj = { [key]: 'value' };  // { dynamicKey: 'value' }
```

## Template Literals

String interpolation and multi-line strings:

```javascript
const name = 'World';
const greeting = `Hello, ${name}!`;

// Multi-line
const html = `
  <div>
    <h1>${title}</h1>
    <p>${description}</p>
  </div>
`;

// Expressions
const price = `Total: £${(quantity * unitPrice).toFixed(2)}`;
```

### Tagged Templates

Process template literals with a function:

```javascript
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => 
    result + str + (values[i] ? `<mark>${values[i]}</mark>` : ''), ''
  );
}

const name = 'Alice';
highlight`Hello ${name}, welcome!`;
// "Hello <mark>Alice</mark>, welcome!"
```

## Modern Array Methods

```javascript
// Array.from - create array from iterable
Array.from('hello');  // ['h', 'e', 'l', 'l', 'o']
Array.from({ length: 5 }, (_, i) => i);  // [0, 1, 2, 3, 4]

// Array.includes - check existence
[1, 2, 3].includes(2);  // true

// Array.find / findIndex - find first match
[1, 2, 3].find(n => n > 1);       // 2
[1, 2, 3].findIndex(n => n > 1);  // 1

// Array.flat - flatten nested arrays
[[1, 2], [3, 4]].flat();  // [1, 2, 3, 4]

// Array.flatMap - map then flatten
[1, 2].flatMap(n => [n, n * 2]);  // [1, 2, 2, 4]

// Array.at - access by index (supports negative)
const arr = [1, 2, 3];
arr.at(-1);  // 3 (last element)
```

## Modern Object Methods

```javascript
// Object.entries - get key-value pairs
Object.entries({ a: 1, b: 2 });  // [['a', 1], ['b', 2]]

// Object.fromEntries - create object from pairs
Object.fromEntries([['a', 1], ['b', 2]]);  // { a: 1, b: 2 }

// Object.keys / values
Object.keys({ a: 1, b: 2 });    // ['a', 'b']
Object.values({ a: 1, b: 2 });  // [1, 2]

// Object.assign - merge objects
Object.assign({}, obj1, obj2);  // Merged (prefer spread)
```

## Try It Yourself

### Exercise: Class Creation

Develop a `TodoList` class that incorporates a private `#items` array to store tasks. You should implement methods for adding new items, removing them by ID, and toggling their completion status. Additionally, provide a getter for the `items` property that returns a safe copy of the current list to prevent accidental modification from outside the class.

### Exercise: Safe Access

Working with a potentially incomplete user profile object, write a script that uses optional chaining and nullish coalescing to retrieve the user's city and the first letter of their postcode. Your code should ensure that sensible default values, such as "Unknown" or `null`, are returned if the requested data is missing from the profile.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "js-classes-quiz",
  "type": "multiple-choice",
  "title": "Classes and Modern Syntax",
  "description": "Test your understanding of modern JavaScript features.",
  "difficulty": "medium",
  "question": "What is the difference between || and ?? for default values?",
  "options": [
    {
      "id": "a",
      "text": "They're identical, ?? is just newer syntax",
      "isCorrect": false,
      "explanation": "They behave differently with falsy values like 0 and empty strings."
    },
    {
      "id": "b",
      "text": "|| triggers on any falsy value; ?? only triggers on null/undefined",
      "isCorrect": true,
      "explanation": "Correct! `0 || 10` returns 10 (0 is falsy), but `0 ?? 10` returns 0 (0 is not null/undefined). Use ?? when 0, '', or false are valid values."
    },
    {
      "id": "c",
      "text": "?? is faster than ||",
      "isCorrect": false,
      "explanation": "Performance is essentially identical. The difference is in which values trigger the fallback."
    },
    {
      "id": "d",
      "text": "|| only works with strings, ?? works with any type",
      "isCorrect": false,
      "explanation": "Both work with any type. The difference is which falsy values trigger the default."
    }
  ]
}
-->

## Key Takeaways

- To recap, JavaScript classes provide a modern
- clean syntax for object-oriented programming, allowing for true encapsulation through private fields
- clean syntax for object-oriented programming, allowing for true encapsulation through private fields
- By combining optional chaining
- nullish coalescing, you can safely navigate complex data structures
- nullish coalescing, you can safely navigate complex data structures
- provide reliable defaults for missing values provide reliable defaults for missing values
- Finally, mastering modern object and array methods will enable you to process data more efficiently
- write code that is both expressive write code that is both expressive and maintainable

## Next Steps

Congratulations! You've completed the JavaScript Essentials module.

You now understand:
- Variables, types, and functions
- Control flow and DOM manipulation
- Events and async data fetching
- Destructuring, spread, and rest
- Modules for code organisation
- Classes and modern syntax

Continue to [React Fundamentals: Introduction to UI Frameworks](../04-react-fundamentals/01-introduction-to-ui-frameworks.md) →


