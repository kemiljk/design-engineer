# Control Flow

> **Quick Summary:** Control flow determines which code runs and when—using conditions, loops, and branching to make programs respond dynamically.

## What You'll Learn

- Conditional statements (if, else, switch)
- Comparison and logical operators
- Loops (for, while, for...of)
- Error handling with try/catch

## Conditional Statements

### if Statement

```javascript
const age = 18;

if (age >= 18) {
  console.log('You can vote');
}
```

### if...else

```javascript
if (age >= 18) {
  console.log('Adult');
} else {
  console.log('Minor');
}
```

### if...else if...else

```javascript
if (score >= 90) {
  grade = 'A';
} else if (score >= 80) {
  grade = 'B';
} else if (score >= 70) {
  grade = 'C';
} else {
  grade = 'F';
}
```

## Comparison Operators

```javascript
// Equality
5 == '5';   // true (loose equality - type coercion)
5 === '5';  // false (strict equality - no coercion)
5 != '5';   // false
5 !== '5';  // true

// Always use === and !== (strict)

// Comparison
5 > 3;   // true
5 < 3;   // false
5 >= 5;  // true
5 <= 4;  // false
```

## Logical Operators

```javascript
// AND (&&) - both must be true
true && true;   // true
true && false;  // false

// OR (||) - at least one must be true
true || false;  // true
false || false; // false

// NOT (!) - inverts
!true;   // false
!false;  // true

// Combining
if (age >= 18 && hasID) {
  console.log('Can enter');
}

if (isAdmin || isModerator) {
  console.log('Has access');
}
```

### Short-Circuit Evaluation

```javascript
// && returns first falsy or last value
const name = user && user.name;

// || returns first truthy or last value
const displayName = name || 'Anonymous';

// Nullish coalescing (??) - only null/undefined
const count = input ?? 0;  // Only replaces null/undefined, not 0 or ''
```

## Ternary Operator

Inline conditional:

```javascript
const status = age >= 18 ? 'adult' : 'minor';

// Equivalent to:
let status;
if (age >= 18) {
  status = 'adult';
} else {
  status = 'minor';
}
```

Useful in JSX/templates:

```javascript
const message = `You have ${count} ${count === 1 ? 'item' : 'items'}`;
```

## Switch Statement

For multiple specific values:

```javascript
switch (day) {
  case 'Monday':
  case 'Tuesday':
  case 'Wednesday':
  case 'Thursday':
  case 'Friday':
    console.log('Weekday');
    break;
  case 'Saturday':
  case 'Sunday':
    console.log('Weekend');
    break;
  default:
    console.log('Invalid day');
}
```

Don't forget `break` statements!

## Optional Chaining

Safely access nested properties:

```javascript
const city = user?.address?.city;
// Returns undefined if user or address is null/undefined

const firstItem = arr?.[0];
const result = obj?.method?.();
```

## Loops

### for Loop

Traditional counting loop:

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);  // 0, 1, 2, 3, 4
}
```

### for...of Loop

Iterate over iterable values:

```javascript
const colours = ['red', 'green', 'blue'];

for (const colour of colours) {
  console.log(colour);
}

// With index
for (const [index, colour] of colours.entries()) {
  console.log(`${index}: ${colour}`);
}
```

### for...in Loop

Iterate over object keys:

```javascript
const user = { name: 'Alice', age: 30 };

for (const key in user) {
  console.log(`${key}: ${user[key]}`);
}
```

Prefer `Object.keys()` or `Object.entries()` for objects.

### while Loop

```javascript
let count = 0;

while (count < 5) {
  console.log(count);
  count++;
}
```

### do...while Loop

Runs at least once:

```javascript
let count = 0;

do {
  console.log(count);
  count++;
} while (count < 5);
```

### Loop Control

```javascript
// break - exit loop
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i);  // 0, 1, 2, 3, 4
}

// continue - skip iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i);  // 0, 1, 3, 4
}
```

## Error Handling

### try...catch

Handle errors gracefully:

```javascript
try {
  const data = JSON.parse(invalidJson);
} catch (error) {
  console.error('Failed to parse:', error.message);
}
```

### try...catch...finally

```javascript
try {
  const data = fetchData();
} catch (error) {
  handleError(error);
} finally {
  // Always runs
  cleanup();
}
```

### Throwing Errors

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (error) {
  console.error(error.message);
}
```

## Truthy and Falsy

Values in conditions are converted to booleans:

### Falsy Values

These evaluate to `false`:
- `false`
- `0` and `-0`
- `''` (empty string)
- `null`
- `undefined`
- `NaN`

### Truthy Values

Everything else is truthy:
- `true`
- Any non-zero number
- Any non-empty string
- Objects (including empty `{}`)
- Arrays (including empty `[]`)

```javascript
if (userInput) {
  // Runs if userInput is truthy
}

if (!errors.length) {
  // Runs if errors array is empty
}
```

## Try It Yourself

### Exercise 1: Grade Calculator

Write a function that takes a score (0-100) and returns a grade:
- 90+: 'A'
- 80-89: 'B'
- 70-79: 'C'
- 60-69: 'D'
- Below 60: 'F'

### Exercise 2: FizzBuzz

Loop from 1 to 100. For each number:
- Print "Fizz" if divisible by 3
- Print "Buzz" if divisible by 5
- Print "FizzBuzz" if divisible by both
- Otherwise print the number

### Exercise 3: Safe Property Access

Write a function `getNestedValue(obj, path)` that safely accesses nested object properties:

```javascript
const user = { profile: { name: 'Alice' } };
getNestedValue(user, 'profile.name');  // 'Alice'
getNestedValue(user, 'profile.age');   // undefined
getNestedValue(user, 'settings.theme'); // undefined
```

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "js-control-flow-quiz",
  "type": "multiple-choice",
  "title": "Control Flow",
  "description": "Test your understanding of loops and iteration.",
  "difficulty": "medium",
  "question": "Which array method should you use to create a new array with some items removed?",
  "options": [
    {
      "id": "a",
      "text": "array.splice() because it removes items",
      "isCorrect": false,
      "explanation": "splice() modifies the original array. You often want to avoid mutation."
    },
    {
      "id": "b",
      "text": "array.filter() because it returns a new array with items that pass a test",
      "isCorrect": true,
      "explanation": "Correct! filter() returns a new array without modifying the original. It's the immutable way to 'remove' items."
    },
    {
      "id": "c",
      "text": "for loop with delete keyword",
      "isCorrect": false,
      "explanation": "delete leaves 'holes' in arrays and is not recommended."
    },
    {
      "id": "d",
      "text": "array.map() because it transforms arrays",
      "isCorrect": false,
      "explanation": "map() transforms each item but returns the same number of items. It doesn't remove."
    }
  ]
}
-->

## Key Takeaways

- Use `if`/`else` for conditional logic
- Always use strict equality (`===`, `!==`)
- `&&` and `||` for logical operations; `??` for nullish coalescing
- Ternary operator for inline conditions
- `for...of` for arrays, `for...in` for object keys
- `try...catch` handles errors gracefully
- Know truthy/falsy values for condition checks
- Optional chaining (`?.`) safely accesses nested properties

## Next Steps

Continue to [DOM Manipulation](./05-dom-manipulation.md) →
