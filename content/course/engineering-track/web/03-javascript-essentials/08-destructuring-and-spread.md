---
estimatedTime: 10
---

# Destructuring and Spread

> **Quick Summary:** Destructuring extracts values from arrays and objects into variables. Spread and rest operators provide powerful ways to work with collections.

## What You'll Learn

- Techniques for array and object destructuring
- Applying destructuring within function parameters
- Using the spread operator to combine and copy collections
- Leveraging rest parameters to collect multiple values

## Destructuring

Extract values from arrays and objects into variables.

### Array Destructuring

Array destructuring provides a concise syntax for assigning elements from an array into individual variables. While the traditional approach requires accessing each element by its index, destructuring allows you to map values to variable names in a single line, making your code significantly more readable and expressive.

// Skip values
const [, , third] = colours;

// Default values
const [a, b, c = 'default'] = ['x', 'y'];

// Rest
const [head, ...tail] = colours;
// head = 'red', tail = ['green', 'blue']
```

### Object Destructuring

In a similar fashion, object destructuring allows you to extract properties from an object directly into variables that match the property names. This replaces the traditional method of repetitive property access and provides a much cleaner way to work with complex data structures like user profiles or configuration objects.

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

One of the most practical applications of the spread operator is merging user-provided options with a set of default configuration values. By spreading your defaults first and then the user options, you can ensure that all required properties have a value while allowing specific ones to be easily overridden.

## Try It Yourself

### Exercise 1: Destructuring Practice

Working with a sample API response object, practise using destructuring to extract specific pieces of information such as the name of the first user, the complete list of users, and the overall status code of the response.

### Exercise 2: Spread and Merge

Create a `mergeObjects` function that can accept any number of objects as arguments. Your function should return a single merged object where properties from later objects correctly override those from earlier ones, demonstrating your mastery of the spread operator.

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

- you should use default values to handle potentially undefined data gracefully
- you should use default values to handle potentially undefined data gracefully
- The spread operator provides a powerful way to expand collections for copying or merging

## Next Steps

Continue to [Modules](./09-modules.md) →


