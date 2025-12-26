# What is JavaScript?

> **Quick Summary:** JavaScript is the programming language of the web. It adds interactivity, handles data, and brings interfaces to life.

## What You'll Learn

- What JavaScript is and where it runs
- How JavaScript relates to HTML and CSS
- The role of JavaScript in modern web development
- Why Design Engineers need JavaScript

## The Language of Interactivity

HTML provides structure. CSS provides style. JavaScript provides behaviour.

When you:
- Click a button and a menu opens
- Submit a form and see validation messages
- Scroll and animations trigger
- Drag items to reorder them

JavaScript makes it happen.

## Where JavaScript Runs

### In the Browser

JavaScript was created for browsers. Every modern browser has a JavaScript engine:
- Chrome: V8
- Firefox: SpiderMonkey
- Safari: JavaScriptCore

Browser JavaScript can:
- Respond to user events (clicks, typing, scrolling)
- Modify the page (DOM manipulation)
- Make network requests (fetch data)
- Store data locally (localStorage, IndexedDB)

### On the Server (Node.js)

Node.js lets JavaScript run outside browsers:
- Build servers and APIs
- Run build tools
- Create command-line applications

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

JavaScript can:
- Find elements
- Read and modify content
- Add and remove elements
- Respond to events
- Change styles

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

As a Design Engineer, JavaScript enables you to:

### Build Interactive Prototypes

Move beyond static mockups. Create prototypes with real interactions.

### Implement Design Details

Animations, micro-interactions, and dynamic behaviours that make designs feel polished.

### Work with Real Data

Fetch and display actual data, handle loading states, manage errors.

### Bridge Design and Development

Understand implementation constraints. Build components that work.

### Ship Side Projects

Create complete projects without waiting for backend developers.

## JavaScript Ecosystem

JavaScript has a vast ecosystem:

**Frameworks:**
- React, Vue, Svelte, Angular (UI frameworks)
- Next.js, Nuxt, Remix (full-stack frameworks)

**Tools:**
- npm/Bun/yarn (package managers)
- Webpack, Vite (bundlers)
- TypeScript (typed JavaScript)

**Libraries:**
- Thousands for any need you can imagine

You don't need to know everything. Start with fundamentals; learn tools as needed.

## Modern JavaScript

JavaScript has evolved significantly. Modern JavaScript (ES6+) includes:
- `const` and `let` (better variable declarations)
- Arrow functions (`() => {}`)
- Template literals (`` `Hello, ${name}` ``)
- Destructuring, spread, and rest operators
- Modules (`import`/`export`)
- Promises and async/await
- Classes

We'll cover these throughout this module.

## Try It Yourself

### Exercise 1: Console Exploration

Open the console on any webpage. Try:
```javascript
document.title
document.body.style.background = 'lightblue'
document.querySelectorAll('a').length
```

### Exercise 2: First Script

Create an HTML file with a button. Add JavaScript that:
1. Selects the button
2. Adds a click event listener
3. Changes the button text when clicked

### Exercise 3: Variables

In the console, create variables for:
- Your name (string)
- Your age (number)
- Whether you're a designer (boolean)

Log them all.

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

- JavaScript adds interactivity to web pages
- It runs in browsers (and on servers with Node.js)
- JavaScript interacts with HTML through the DOM
- Modern JavaScript (ES6+) has powerful features
- Design Engineers use JavaScript for prototypes, interactions, and shipping products

## Next Steps

Continue to [Variables and Types](./02-variables-and-types.md) →
