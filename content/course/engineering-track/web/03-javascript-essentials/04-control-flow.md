# Control Flow

> **Quick Summary:** Control flow determines which code runs and when—using conditions, loops, and branching to make programs respond dynamically.

## What You'll Learn

- Core conditional statements (`if`, `else`, `switch`)
- Using comparison and logical operators to build complex conditions
- Different types of loops for iterating over data
- Handling errors gracefully using `try`/`catch` blocks

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

To compare values, JavaScript provides several operators that evaluate to true or false. It is important to distinguish between loose equality (`==`), which allows for type coercion, and strict equality (`===`), which requires both the value and the type to match. For the most predictable and reliable code, you should always use strict equality (`===` and `!==`). You can also use standard comparison operators such as greater than (`>`), less than (`<`), and their associated inclusive variants.

## Logical Operators

Logical operators allow you to combine multiple conditions into a single expression. You can use the AND (`&&`) operator when both conditions must be true, or the OR (`||`) operator if at least one condition needs to be true. The NOT (`!`) operator is also available to invert a boolean value. Additionally, JavaScript supports short-circuit evaluation, where `&&` returns the first falsy value and `||` returns the first truthy value. For handling potential `null` or `undefined` values, the nullish coalescing operator (`??`) provides a safe way to specify a default.

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

Loops enable you to execute a block of code multiple times, which is essential for iterating over arrays or objects. While the traditional `for` loop is ideal for numeric counting, the `for...of` loop provides a more readable way to iterate over iterable values like arrays. When working with objects, the `for...in` loop allows you to access each key, although using `Object.keys()` or `Object.entries()` is often preferred. You can also use `while` and `do...while` loops to repeat actions based on a specific condition, and leverage `break` or `continue` to control the flow within these structures.

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

In JavaScript, any value used in a conditional statement is automatically converted to a boolean. Falsy values include `false`, `0`, empty strings, `null`, `undefined`, and `NaN`, all of which will evaluate to `false`. Conversely, everything else is considered truthy, including non-zero numbers, non-empty strings, and even empty objects or arrays. Understanding the difference between truthy and falsy values is vital for writing concise and effective condition checks.

## Try It Yourself

### Exercise 1: Grade Calculator

Write a custom function that accepts a numerical score between zero and 100 and returns the corresponding letter grade. Use an `if...else if...else` structure to handle different score ranges from 'A' down to 'F'.

### Exercise 2: FizzBuzz

Implement the classic FizzBuzz challenge by looping from one to 100. Your programme should print "Fizz" for numbers divisible by three, "Buzz" for numbers divisible by five, and "FizzBuzz" for those divisible by both, printing the number itself in all other cases.

### Exercise 3: Safe Property Access

Create a `getNestedValue` function that allows you to safely access properties within deeply nested objects. This function should accept an object and a dot-notated path string, returning the requested value or `undefined` if any part of the path is missing.

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

- To recap, you can use `if`, `else`, and `switch` statements to control program flow based on conditions
- Various loop types (`for`, `while`, `for...of`, `for...in`) provide the tools needed to process iterative data sets
- Always account for potential errors with `try...catch` blocks
- Utilise optional chaining (`?.`) to safely navigate complex objects

## Next Steps

Continue to [Selecting and Reading the DOM](./05-selecting-the-dom.md) →
