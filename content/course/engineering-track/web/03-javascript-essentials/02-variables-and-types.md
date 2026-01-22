# Variables and Types

> **Quick Summary:** Variables store data; types define what kind of data. Understanding both is fundamental to JavaScript.

## What You'll Learn

- Different ways to declare variables (`const`, `let`, `var`)
- JavaScript's core data types
- Working effectively with strings, numbers, booleans, arrays, and objects
- Essential techniques for type checking and conversion

## Declaring Variables

<!-- illustration: js-data-types -->

## Declaring Variables

In modern JavaScript, you have two primary ways to declare variables: `const` and `let`. You should use `const` as your default choice for any values that will not be reassigned, as this makes your code more predictable and prevents accidental changes. If you know a value will need to be updated later—such as a counter or a toggled state—use `let`. While you may still encounter the older `var` keyword in legacy code, it is generally best avoided due to its quirky scoping behaviours.

### Naming Conventions

```javascript
const firstName = 'John';        // camelCase for most variables
const MAX_SIZE = 100;            // UPPER_SNAKE_CASE for constants
const UserComponent = () => {};  // PascalCase for components/classes
```

## Primitive Types

JavaScript features several primitive data types that form the building blocks of your code. Strings are used for text data and can be defined using single quotes, double quotes, or backticks for template literals. Numbers cover both integers and decimals and allow for standard mathematical operations. Booleans represent simple true or false values, which are essential for logic and control flow. Additionally, you will encounter `undefined` for variables that have been declared but not assigned a value, and `null` for values that are intentionally empty.

## Arrays

Arrays are ordered lists of values that allow you to store multiple items in a single variable. You can access individual elements by their zero-based index and use a wide variety of built-in methods to add or remove items, check for the presence of specific values, and iterate over the entire collection to transform or filter your data.

### Destructuring Arrays

```javascript
const [first, second, ...rest] = colours;
// first = "red", second = "green", rest = ["blue"]
```

## Objects

Objects are collections of key-value pairs, making them ideal for representing more complex data structures like a user profile or a product's details. You can access properties using either dot notation or bracket notation, and it is easy to modify existing values or add entirely new properties to an object after it has been created.

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

To determine the type of a value at runtime, you can use the `typeof` operator, which returns a string indicating whether a value is a string, number, boolean, or object. While `typeof` is generally reliable, keep in mind that it treats both arrays and `null` as objects; in these cases, you should use more specific methods like `Array.isArray()` to correctly identify your arrays.

## Type Conversion

JavaScript allows you to convert values between types when necessary. You can use the `String()` and `Number()` functions to explicitly change a value’s type, or rely on `parseInt()` and `parseFloat()` for more nuanced number conversion from strings. When converting to booleans, remember that values like `0`, empty strings, `null`, and `undefined` are considered "falsy", while almost everything else is treated as "truthy".

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

Create a comprehensive user object that includes their name, age, a list of hobbies, and a nested address object. Once created, practise accessing and logging these different properties to ensure you understand how to navigate nested data structures.

### Exercise 2: Array Operations

Working with an array of numbers from one to five, try adding a new number to the end, creating a separate array where each value is doubled, and filtering the list to include only the even numbers. You should also attempt to find the total sum of all numbers in the array.

### Exercise 3: Template Literals

Develop a function that accepts user data and uses a template literal to return a formatted HTML string, which could be used to display a profile card on a webpage.

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

To recap, you should use `const` for variable declarations by default and only switch to `let` when you specifically need to reassign a value. JavaScript includes several primitive types like strings and booleans, alongside more complex structures such as arrays and objects for managing collections of data. You can use destructuring and template literals to work more efficiently with these values, and the spread operator provides a clean way to copy or combine your data structures.

## Next Steps

Continue to [Functions](./03-functions.md) →
