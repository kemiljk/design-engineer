---
estimatedTime: 10
---

# Modules

> **Quick Summary:** ES6 modules let you organise code into separate files with explicit imports and exports, making codebases more maintainable and reusable.

## What You'll Learn

- Why modules matter
- Named exports and imports
- Default exports
- Re-exports and barrel files
- Module best practices

## Why Modules?

Before modules, JavaScript relied on script tags and global variables:

```html
<!-- Old way: order matters, globals everywhere -->
<script src="utils.js"></script>
<script src="api.js"></script>
<script src="app.js"></script>
```

Problems with this approach:
- Order-dependent loading
- Global namespace pollution
- No explicit dependencies
- Hard to track what uses what

Modules solve these issues with explicit imports and exports.

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

## Re-exports

Export from another module without importing first:

```javascript
// components/Button.js
export function Button() { /* ... */ }

// components/Card.js
export function Card() { /* ... */ }

// components/Modal.js
export default function Modal() { /* ... */ }
```

Create a barrel file to re-export everything:

```javascript
// components/index.js
export { Button } from './Button.js';
export { Card } from './Card.js';
export { default as Modal } from './Modal.js';
```

Now import from one place:

```javascript
// app.js
import { Button, Card, Modal } from './components';
```

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

### One Component Per File

```javascript
// Good: Button.js exports Button
export function Button() { /* ... */ }

// Avoid: Multiple unrelated exports
export function Button() { /* ... */ }
export function formatDate() { /* ... */ }  // Unrelated!
```

### Prefer Named Exports

Named exports are more refactorable and easier to track:

```javascript
// Easier to find usages, rename, and tree-shake
export function formatDate() { /* ... */ }
export function formatCurrency() { /* ... */ }
```

### Use Barrel Files Sparingly

Barrel files (`index.js`) are convenient but can hurt tree-shaking:

```javascript
// This might import more than you need
import { Button } from './components';

// More explicit, better for bundle size
import { Button } from './components/Button';
```

### Avoid Circular Dependencies

```javascript
// a.js
import { b } from './b.js';
export const a = 'a' + b;

// b.js
import { a } from './a.js';  // Circular!
export const b = 'b' + a;
```

Circular dependencies cause confusing bugs. Restructure to avoid them.

## Try It Yourself

### Exercise: Module Refactoring

Split this code into modules:

```javascript
const API_URL = 'https://api.example.com';

function fetchUsers() { /* ... */ }
function fetchPosts() { /* ... */ }

function formatDate(date) { /* ... */ }
function formatCurrency(amount) { /* ... */ }
```

Create:
1. `constants.js` - Export `API_URL`
2. `api.js` - Export `fetchUsers`, `fetchPosts` (import `API_URL`)
3. `formatters.js` - Export `formatDate`, `formatCurrency`
4. `index.js` - Re-export everything as a barrel file

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

- Modules use `export` and `import` for explicit dependencies
- Named exports: `export function foo()` → `import { foo }`
- Default exports: `export default` → `import anyName`
- Re-exports create convenient barrel files
- Dynamic imports enable code splitting
- Prefer named exports for better refactorability

## Next Steps

Continue to [Classes and Modern Syntax](./10-classes-and-modern-syntax.md) →


