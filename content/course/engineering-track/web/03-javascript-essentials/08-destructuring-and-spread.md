---
estimatedTime: 10
---

# Destructuring and Spread

> **Quick Summary:** Destructuring extracts values from arrays and objects into variables. Spread and rest operators provide powerful ways to work with collections.

## What You'll Learn

- Array destructuring
- Object destructuring
- Destructuring in function parameters
- The spread operator for arrays and objects
- Rest parameters for collecting values

## Destructuring

Extract values from arrays and objects into variables.

### Array Destructuring

```javascript
const colours = ['red', 'green', 'blue'];

// Traditional
const first = colours[0];
const second = colours[1];

// Destructuring
const [first, second, third] = colours;

// Skip values
const [, , third] = colours;

// Default values
const [a, b, c = 'default'] = ['x', 'y'];

// Rest
const [head, ...tail] = colours;
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

Destructuring works beautifully in function parameters:

```javascript
// Object destructuring in parameters
function createUser({ name, age, email }) {
  return { id: Date.now(), name, age, email };
}

// With defaults
function greet({ name = 'Guest', greeting = 'Hello' } = {}) {
  return `${greeting}, ${name}!`;
}

// Array destructuring in parameters
function getFirstTwo([first, second]) {
  return { first, second };
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

Collect remaining elements into a single variable.

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

## Common Patterns

### Swapping Variables

```javascript
let a = 1;
let b = 2;
[a, b] = [b, a];
// a = 2, b = 1
```

### Extracting from API Responses

```javascript
const response = await fetch('/api/user');
const { data: { user, permissions } } = await response.json();
```

### Merging with Defaults

```javascript
function createButton(options = {}) {
  const config = {
    size: 'medium',
    variant: 'primary',
    disabled: false,
    ...options
  };
  // config now has all defaults plus any overrides
}
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

### Exercise 2: Spread and Merge

Create a function `mergeObjects` that:
1. Takes any number of objects as arguments
2. Returns a single merged object
3. Later objects override earlier ones

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "js-destructuring-quiz",
  "type": "multiple-choice",
  "title": "Destructuring and Spread",
  "description": "Test your understanding of destructuring and spread operators.",
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

- Destructuring extracts values from arrays (`[a, b]`) and objects (`{ a, b }`)
- Use default values (`{ name = 'Guest' }`) when values might be undefined
- Spread (`...`) expands arrays/objects into individual elements
- Rest (`...`) collects remaining elements into an array
- These features make data manipulation cleaner and more expressive

## Next Steps

Continue to [Modules](./09-modules.md) →


