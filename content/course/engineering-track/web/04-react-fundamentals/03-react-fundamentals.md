# React Fundamentals

> **Quick Summary:** React components are JavaScript functions that return JSX, a syntax that looks like HTML but has the full power of JavaScript.

## What You'll Learn

- Setting up a new React project using modern tooling
- Key differences between JSX and standard HTML
- How to create and compose your own components
- Developing a strong mental model for React applications

## Setting Up React

### Quick Start with Vite

Vite is the fastest way to start a React project. The setup process is straightforward and creates a project with React and React DOM included, a development server with hot reloading, and all the necessary build tooling pre-configured.

### Project Structure

```text
my-app/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
└── package.json
```

**Key files:**

The most important files in your project are `main.jsx`, which serves as the entry point that renders the root component; `App.jsx`, your main application component; and `index.html`, the single HTML page that React mounts to.

### The Entry Point

```jsx
// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

React renders your entire application into a single DOM element (`#root`).

## Understanding JSX

JSX is a syntax extension that lets you write HTML-like code in JavaScript:

```jsx
const element = <h1>Hello, world!</h1>;
```

This isn't a string or HTML. It's JSX that compiles to JavaScript:

```javascript
// What JSX compiles to
const element = React.createElement('h1', null, 'Hello, world!');
```

You never write `createElement` yourself. JSX handles it.

### JSX vs HTML: Key Differences

Explore the key differences interactively:

<!-- visual-example: jsx-vs-html-demo -->

#### 1. className Instead of class

```jsx
// JSX uses className
<div className="container">Content</div>

// HTML uses class
<div class="container">Content</div>
```

Why? `class` is a reserved word in JavaScript.

#### 2. camelCase Attributes

```jsx
// JSX: camelCase
<input 
  tabIndex="1"
  autoComplete="off"
  onClick={handleClick}
/>

// HTML: lowercase
<input 
  tabindex="1"
  autocomplete="off"
  onclick="handleClick()"
/>
```

#### 3. Style as an Object

```jsx
// JSX: object with camelCase properties
<div style={{ 
  backgroundColor: 'blue',
  fontSize: '16px',
  marginTop: '20px'
}}>
  Styled content
</div>

// HTML: string
<div style="background-color: blue; font-size: 16px; margin-top: 20px;">
  Styled content
</div>
```

Note the double curly braces: `{{}}`. The outer braces are for JavaScript expressions; the inner braces create an object.

#### 4. JavaScript Expressions

Embed any JavaScript expression inside `{}`:

```jsx
const name = 'Design Engineer';
const items = ['React', 'Vue', 'Svelte'];

function App() {
  return (
    <div>
      {/* Variables */}
      <h1>Hello, {name}!</h1>
      
      {/* Expressions */}
      <p>2 + 2 = {2 + 2}</p>
      
      {/* Function calls */}
      <p>Uppercase: {name.toUpperCase()}</p>
      
      {/* Conditionals */}
      <p>{items.length > 0 ? 'Has items' : 'Empty'}</p>
    </div>
  );
}
```

#### 5. Self-Closing Tags

All tags must close in JSX:

```jsx
// JSX: must self-close
<img src="photo.jpg" alt="Photo" />
<input type="text" />
<br />

// HTML: can be unclosed
<img src="photo.jpg" alt="Photo">
<input type="text">
<br>
```

#### 6. Comments

```jsx
function App() {
  return (
    <div>
      {/* This is a JSX comment */}
      <h1>Title</h1>
    </div>
  );
}
```

### JSX Must Have One Root Element

Every component must return a single element:

```jsx
// ❌ Invalid: Multiple root elements
function Invalid() {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>
  );
}

// ✅ Valid: Wrapped in a div
function Valid() {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  );
}

// ✅ Better: Use a Fragment (no extra DOM element)
function Better() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}
```

Fragments (`<>...</>`) wrap elements without adding to the DOM.

## Creating Components

### Function Components

A React component is a function that returns JSX:

```jsx
function Greeting() {
  return <h1>Hello, world!</h1>;
}
```

**Rules for components:**

When creating components, remember that the name must start with a capital letter (for example, `Greeting` rather than `greeting`). Every component must return JSX or `null`, and you should aim for one component to handle one concern.

### Using Components

Use components like HTML tags:

```jsx
function App() {
  return (
    <div>
      <Greeting />
      <Greeting />
      <Greeting />
    </div>
  );
}
```

Each `<Greeting />` creates an independent instance.

### Arrow Function Components

You can also write components as arrow functions:

```jsx
const Greeting = () => {
  return <h1>Hello, world!</h1>;
};

// With implicit return for simple components
const Greeting = () => <h1>Hello, world!</h1>;
```

Both styles work. Use what your team prefers.

## Component Composition

Components can contain other components:

```jsx
function Header() {
  return (
    <header>
      <Logo />
      <Navigation />
      <UserMenu />
    </header>
  );
}

function Logo() {
  return <img src="/logo.svg" alt="Company" />;
}

function Navigation() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  );
}

function UserMenu() {
  return <button>Sign in</button>;
}
```

This is **composition**: building complex UIs from simple pieces.

### The Component Tree

Every React app is a tree of components:

```text
App
├── Header
│   ├── Logo
│   ├── Navigation
│   └── UserMenu
├── Main
│   ├── Hero
│   └── Features
│       ├── Feature
│       ├── Feature
│       └── Feature
└── Footer
    ├── FooterLinks
    └── Copyright
```

Data flows down this tree through props (covered in the next lesson).

## Organising Components

### File Structure

One component per file is standard:

```text
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Button.jsx
│   └── Card.jsx
├── App.jsx
└── main.jsx
```

### Importing and Exporting

**Named exports:**
```jsx
// Button.jsx
export function Button() {
  return <button>Click me</button>;
}

// App.jsx
import { Button } from './components/Button';
```

**Default exports:**
```jsx
// Button.jsx
export default function Button() {
  return <button>Click me</button>;
}

// App.jsx
import Button from './components/Button';
```

Default exports are common for components. Named exports are useful when a file exports multiple things.

## Conditional Rendering

Render different things based on conditions:

### Using Ternary Operator

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please sign in</h1>
      )}
    </div>
  );
}
```

### Using Logical AND

```jsx
function Notification({ message }) {
  return (
    <div>
      {message && <p className="notification">{message}</p>}
    </div>
  );
}
```

If `message` is truthy, the `<p>` renders. If falsy, nothing renders.

### Using Early Return

```jsx
function UserProfile({ user }) {
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

## Rendering Lists

Use `.map()` to render arrays:

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

### The key Prop

Every item in a list needs a unique `key`:

```jsx
// ✅ Good: Unique ID
{items.map(item => (
  <Item key={item.id} {...item} />
))}

// ❌ Bad: Using index (causes bugs with reordering)
{items.map((item, index) => (
  <Item key={index} {...item} />
))}
```

Keys help React track which items changed, added, or removed.

## Your First Component

Let's build a simple card component:

```jsx
// Card.jsx
function Card() {
  return (
    <article className="card">
      <img 
        className="card-image"
        src="https://picsum.photos/300/200" 
        alt="Placeholder"
      />
      <div className="card-content">
        <h2 className="card-title">Card Title</h2>
        <p className="card-description">
          This is a description of the card content.
        </p>
        <button className="card-button">Learn more</button>
      </div>
    </article>
  );
}

export default Card;
```

```css
/* Card styles */
.card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.card-title {
  margin: 0 0 8px;
  font-size: 1.25rem;
}

.card-description {
  color: #666;
  margin: 0 0 16px;
}

.card-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
```

Currently this card is static. In the next lesson, you'll learn to make it dynamic with props.

## Try It Yourself

### Exercise 1: Setup a Project

Create a new React project with Vite:
```bash
npm create vite@latest my-first-react -- --template react
cd my-first-react
npm install
npm run dev
```

### Exercise 2: Create Components

Practise your component-building skills by creating a `Logo` component that displays an image, a `NavLink` component that renders a styled link, and a `Header` component that composes your `Logo` and multiple `NavLink` instances together.

### Exercise 3: List Rendering

Create a `FeatureList` component that renders this array:

```jsx
const features = [
  { id: 1, title: 'Fast', description: 'Lightning quick performance' },
  { id: 2, title: 'Secure', description: 'Enterprise-grade security' },
  { id: 3, title: 'Scalable', description: 'Grows with your business' },
];
```

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "react-fundamentals-quiz",
  "type": "multiple-choice",
  "title": "React Fundamentals",
  "description": "Test your understanding of React basics.",
  "difficulty": "easy",
  "question": "Why does JSX use className instead of class?",
  "options": [
    {
      "id": "a",
      "text": "className is faster to type",
      "isCorrect": false,
      "explanation": "It's actually longer! The reason is JavaScript compatibility."
    },
    {
      "id": "b",
      "text": "class is a reserved word in JavaScript, so JSX uses className",
      "isCorrect": true,
      "explanation": "Correct! Since JSX compiles to JavaScript, and 'class' is a reserved keyword for ES6 classes, React uses 'className' to avoid conflicts."
    },
    {
      "id": "c",
      "text": "React wants to be different from HTML",
      "isCorrect": false,
      "explanation": "React tries to stay close to HTML when possible. This is a JavaScript constraint."
    },
    {
      "id": "d",
      "text": "className provides additional features",
      "isCorrect": false,
      "explanation": "className works exactly like the HTML class attribute."
    }
  ]
}
-->

## Key Takeaways

- Use curly braces for JavaScript expressions in JSX
- Components must return a single root element
- Composition is the key pattern, allowing you to build complex UIs from simple, reusable pieces
- When rendering lists, always provide unique `key` props to enable efficient updates
- Organise your project with one component per file

## Next Steps

Continue to [Props and Component Communication](./04-props-and-components.md) →
