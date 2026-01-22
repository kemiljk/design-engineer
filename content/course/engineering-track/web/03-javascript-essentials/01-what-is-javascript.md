# What is JavaScript?

> **Quick Summary:** JavaScript is the programming language of the web. It adds interactivity, handles data, and brings interfaces to life.

## What You'll Learn

- What JavaScript is and where it runs in the web ecosystem
- How JavaScript interacts with HTML and CSS
- JavaScript's critical role in modern web development
- Why JavaScript is indispensable for Design Engineers

## The Language of Interactivity

> *"Always bet on JavaScript."* — Brendan Eich

HTML provides the structure of a page, while CSS handles the styling. JavaScript provides the behaviour. Whether you are clicking a button to open a menu, submitting a form to see validation messages, triggering animations as you scroll, or dragging items to reorder them, JavaScript is the engine that makes these interactive experiences possible.

## Where JavaScript Runs

### In the Browser

JavaScript was originally created for browsers, and every modern browser today includes a powerful JavaScript engine, such as Chrome's V8, Firefox's SpiderMonkey, or Safari's JavaScriptCore. In a browser environment, JavaScript can respond to user events like clicks and scrolling, modify the page content via DOM manipulation, make network requests to fetch data, and store information locally using tools like `localStorage`.

### On the Server (Node.js)

Node.js allows JavaScript to run outside the browser environment, enabling you to build servers, APIs, and command-line applications. It also powers the build tools that are essential for modern web development workflows.

As a Design Engineer, you'll primarily write browser JavaScript, but understanding Node.js helps with build tools and frameworks.

## JavaScript and the DOM

The DOM (Document Object Model) is how JavaScript sees HTML:

```html
<button id="my-button">Click me</button>
```

```javascript
const button = document.getElementById('my-button');
button.addEventListener('click', () => {
  alert('Button clicked!');
});
```

By interacting with the DOM, JavaScript can find specific elements on a page, read and modify their content, add or remove elements dynamically, and respond to various user events. It also allows you to change styles on the fly, providing a level of interactivity that CSS alone cannot achieve.

## Adding JavaScript to HTML

**External file (recommended):**
```html
<script src="app.js" defer></script>
```

**Inline script:**
```html
<script>
  console.log('Hello, world!');
</script>
```

Place scripts at the end of `<body>` or use `defer` to avoid blocking page render.

## Your First JavaScript

Open your browser's developer console (F12 or Cmd+Option+I) and type:

```javascript
console.log('Hello, world!');
```

You've just run JavaScript.

### Variables

```javascript
const name = 'Design Engineer';
let count = 0;

console.log(name); // "Design Engineer"
```

### Functions

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World')); // "Hello, World!"
```

### DOM Interaction

```javascript
const button = document.querySelector('.my-button');

button.addEventListener('click', () => {
  button.textContent = 'Clicked!';
});
```

## Why Design Engineers Need JavaScript

As a Design Engineer, mastering JavaScript enables you to move beyond static mockups and build interactive prototypes with real functionality. You can implement the fine design details, such as complex animations and micro-interactions, that make a product feel truly polished. Furthermore, JavaScript allows you to work with real data, handle loading states, and manage errors effectively, helping you bridge the gap between design and development and ship complete side projects independently.

## JavaScript Ecosystem

The JavaScript ecosystem is vast, featuring a wide array of UI frameworks like React and Svelte, as well as full-stack frameworks such as Next.js. You'll also encounter essential tools like the npm package manager and bundlers like Vite. While there are thousands of libraries available for almost any need, you don't need to know everything at once; starting with the fundamentals will allow you to learn more specialised tools as you need them.

## Modern JavaScript

JavaScript has evolved significantly in recent years, with modern versions (ES6+) introducing powerful features such as `const` and `let` for better variable declarations, arrow functions, and template literals. These versions also include essential tools like modules, promises, and the `async/await` syntax, as well as classes for more structured programming. We will cover these modern enhancements in detail throughout this module.

## Try It Yourself

### Exercise 1: Console Exploration

Open the developer console on any webpage and experiment with finding the document title, changing the page's background colour, or counting the number of links on the page.

### Exercise 2: First Script

Create a basic HTML file containing a single button and add a JavaScript script that selects the button and changes its text when it is clicked.

### Exercise 3: Variables

Practise using the console to create variables for your name, age, and professional role, and then log them all to verify they have been stored correctly.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "js-intro-quiz",
  "type": "multiple-choice",
  "title": "JavaScript Fundamentals",
  "description": "Test your understanding of JavaScript's role in web development.",
  "difficulty": "easy",
  "question": "What makes JavaScript different from HTML and CSS?",
  "options": [
    {
      "id": "a",
      "text": "JavaScript runs on the server, HTML/CSS run on the client",
      "isCorrect": false,
      "explanation": "JavaScript primarily runs in the browser (client-side), same as HTML/CSS."
    },
    {
      "id": "b",
      "text": "JavaScript is a programming language that adds interactivity and behaviour",
      "isCorrect": true,
      "explanation": "Correct! HTML provides structure, CSS provides style, and JavaScript adds behaviour—responding to events, manipulating content, and creating dynamic experiences."
    },
    {
      "id": "c",
      "text": "JavaScript is only used for animations",
      "isCorrect": false,
      "explanation": "CSS can handle many animations. JavaScript's scope is much broader—any dynamic behaviour."
    },
    {
      "id": "d",
      "text": "JavaScript is optional and most websites don't use it",
      "isCorrect": false,
      "explanation": "JavaScript is used on virtually all modern websites for interactivity."
    }
  ]
}
-->

## Key Takeaways

To recap, JavaScript is the primary tool for adding interactivity to web pages, and it runs both in browsers and on servers via Node.js. It interacts with your HTML through the Document Object Model (DOM), and modern ES6+ features provide a powerful toolkit for building complex applications. For Design Engineers, JavaScript is essential for creating high-fidelity prototypes, implementing detailed interactions, and shipping complete products.

## Next Steps

Continue to [Variables and Types](./02-variables-and-types.md) →
