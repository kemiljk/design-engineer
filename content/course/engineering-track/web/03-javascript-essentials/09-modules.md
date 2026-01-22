---
estimatedTime: 10
---

# Modules

> **Quick Summary:** ES6 modules let you organise code into separate files with explicit imports and exports, making codebases more maintainable and reusable.

## What You'll Learn

- Why es6 modules are vital for modern codebases
- Syntax for named and default exports
- Using re-exports and barrel files to simplify imports
- Best practices for clean, scalable module-based architecture

## Why Modules?

Before the introduction of ES6 modules, JavaScript relied on multiple script tags and global variables, which often led to difficult-to-track dependencies and a polluted global namespace. This older approach was heavily dependent on the exact order in which scripts were loaded and made it challenging to manage large codebases where many different files used the same variable names. Modules solve these issues by providing explicit imports and exports, ensuring that each file has its own scope and that dependencies are clearly defined.

## Named Exports

Export specific values by name:

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

Import by the same name:

```javascript
// main.js
import { add, subtract, PI } from './utils.js';

console.log(add(2, 3));  // 5
console.log(PI);         // 3.14159
```

### Renaming Imports

Use `as` to rename:

```javascript
import { add as sum } from './utils.js';

sum(2, 3);  // 5
```

### Import Everything

Use `* as` to import all exports:

```javascript
import * as utils from './utils.js';

utils.add(2, 3);
utils.PI;
```

## Default Export

Each module can have one default export:

```javascript
// Button.js
export default function Button({ children }) {
  return <button>{children}</button>;
}
```

Import without braces, using any name:

```javascript
// main.js
import Button from './Button.js';
import MyButton from './Button.js';  // Same thing, different name
```

### Combining Default and Named

```javascript
// api.js
export default class API {
  // ...
}

export const BASE_URL = 'https://api.example.com';
export function handleError(err) { /* ... */ }
```

```javascript
// main.js
import API, { BASE_URL, handleError } from './api.js';
```

## Re-exports and Barrel Files

Re-exports allow you to export values from another module without having to import them first, which is particularly useful for creating "barrel files" like `index.js`. By using a barrel file to consolidate multiple exports from a single directory, you can provide a cleaner API for other parts of your application, allowing them to import several components or utilities from a single, unified source rather than from individual files.

### Re-export Everything

```javascript
// Re-export all named exports from a module
export * from './utils.js';
```

## Dynamic Imports

Import modules at runtime:

```javascript
// Load a module conditionally
if (needsChart) {
  const { Chart } = await import('./chart.js');
  new Chart(data);
}

// Code splitting with dynamic imports
button.addEventListener('click', async () => {
  const { openModal } = await import('./modal.js');
  openModal();
});
```

## Module Best Practices

To keep your codebase manageable, it is generally recommended to export only one main component per file and to prefer named exports over default exports, as they are often easier to refactor and track within your IDE. While barrel files are convenient, they should be used sparingly to avoid potential issues with tree-shaking and bundle size. Additionally, you should always strive to avoid circular dependencies, which happen when two modules attempt to import each other, as these can lead to confusing bugs and unexpected results in your application.

## Try It Yourself

### Exercise: Module Refactoring

Take a single JavaScript file that contains multiple constants, API functions, and formatting utilities, and refactor it into a collection of smaller, more focused modules. You should create separate files for your constants, your API logic, and your formatting functions, and then use a barrel file to reunite them all into a single, clean interface.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "js-modules-quiz",
  "type": "multiple-choice",
  "title": "JavaScript Modules",
  "description": "Test your understanding of ES6 modules.",
  "difficulty": "medium",
  "question": "What is the difference between named exports and default exports?",
  "options": [
    {
      "id": "a",
      "text": "Default exports are faster to load",
      "isCorrect": false,
      "explanation": "Performance is the same. The difference is in syntax and usage."
    },
    {
      "id": "b",
      "text": "Named exports require braces on import and can have multiple per file; default exports don't use braces and are limited to one per file",
      "isCorrect": true,
      "explanation": "Correct! Named: `export function foo()` → `import { foo }`. Default: `export default function()` → `import anyName`. Each module can have one default but many named exports."
    },
    {
      "id": "c",
      "text": "Default exports can only be functions",
      "isCorrect": false,
      "explanation": "Default exports can be any value: functions, classes, objects, or primitives."
    },
    {
      "id": "d",
      "text": "Named exports don't work in browsers",
      "isCorrect": false,
      "explanation": "Both named and default exports work in modern browsers with `type=\"module\"`."
    }
  ]
}
-->

## Key Takeaways

- To recap, ES6 modules provide a robust way to manage code dependencies by using explicit `import` and `export` statements
- While default exports are available, named exports are generally preferred for better refactorability and clearer intent
- You can use re-exports to create convenient barrel files that simplify imports

## Next Steps

Continue to [Classes and Modern Syntax](./10-classes-and-modern-syntax.md) →


