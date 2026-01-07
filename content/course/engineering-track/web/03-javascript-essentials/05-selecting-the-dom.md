---
estimatedTime: 10
---

# Selecting and Reading the DOM

> **Quick Summary:** The DOM (Document Object Model) is how JavaScript interacts with HTML. Learning to select and read elements is the foundation of dynamic interfaces.

## What You'll Learn

- What the DOM is and how it works
- Selecting single and multiple elements
- Reading text, HTML, and attributes
- Traversing the DOM tree

## What is the DOM?

The DOM is a tree representation of your HTML that JavaScript can interact with:

```html
<body>
  <div id="app">
    <h1>Title</h1>
    <p class="intro">Welcome</p>
  </div>
</body>
```

Becomes:

```text
document
└── body
    └── div#app
        ├── h1 "Title"
        └── p.intro "Welcome"
```

JavaScript can traverse, read, and modify this tree. The browser creates the DOM when it parses your HTML, and keeps it synchronised with what's displayed on screen.

## Selecting Elements

### Single Element

```javascript
// By ID (returns element or null)
const app = document.getElementById('app');

// By selector (returns first match or null)
const intro = document.querySelector('.intro');
const heading = document.querySelector('h1');
const specific = document.querySelector('#app .intro');
```

`querySelector` uses CSS selector syntax, making it powerful and flexible:

```javascript
// Complex selectors work too
document.querySelector('nav > ul > li:first-child a');
document.querySelector('[data-active="true"]');
document.querySelector('input[type="email"]');
```

### Multiple Elements

```javascript
// By class name (returns HTMLCollection)
const items = document.getElementsByClassName('item');

// By tag name (returns HTMLCollection)
const paragraphs = document.getElementsByTagName('p');

// By selector (returns NodeList)
const allLinks = document.querySelectorAll('a');
const menuLinks = document.querySelectorAll('.nav a');
```

### HTMLCollection vs NodeList

Both are array-like, but differ subtly:

- **HTMLCollection** is live (updates automatically when DOM changes)
- **NodeList** from `querySelectorAll` is static (a snapshot)

### Converting to Array

To use array methods like `map`, `filter`, `forEach`:

```javascript
const links = document.querySelectorAll('a');
const linksArray = Array.from(links);
// Or
const linksArray2 = [...links];

// Now you can use array methods
linksArray.filter(link => link.href.includes('example.com'));
```

## Reading Content

### Text Content

```javascript
const heading = document.querySelector('h1');

// Get text (without HTML tags)
heading.textContent;  // "Title"

// Get text (visible text, accounts for CSS)
heading.innerText;    // "Title"
```

The difference:
- `textContent` returns all text, including hidden elements
- `innerText` returns only visible text (respects CSS)

```javascript
// <span style="display: none">Hidden</span> Visible

element.textContent;  // "Hidden Visible"
element.innerText;    // "Visible"
```

### HTML Content

```javascript
const container = document.querySelector('.container');

// Get inner HTML
container.innerHTML;  // "<p>Paragraph</p>"

// Get outer HTML (includes the element itself)
container.outerHTML;  // "<div class=\"container\"><p>Paragraph</p></div>"
```

### Attributes

```javascript
const link = document.querySelector('a');

// Get attribute
link.getAttribute('href');
link.href;  // Direct property access

// Has attribute
link.hasAttribute('target');

// Get all attributes
link.attributes;  // NamedNodeMap
```

### Data Attributes

Custom data stored in HTML:

```javascript
// HTML: <div data-user-id="123" data-active="true">

const div = document.querySelector('div');

// Read via dataset (note: camelCase conversion)
div.dataset.userId;   // "123"
div.dataset.active;   // "true"
```

## Traversing the DOM

Navigate between elements:

```javascript
const element = document.querySelector('.item');

// Parent
element.parentElement;
element.parentNode;

// Children
element.children;           // HTMLCollection of child elements
element.childNodes;         // NodeList including text nodes
element.firstElementChild;
element.lastElementChild;

// Siblings
element.nextElementSibling;
element.previousElementSibling;

// Closest ancestor matching selector
element.closest('.container');
```

### Practical Traversal

```javascript
// Find the form containing this input
const input = document.querySelector('#email');
const form = input.closest('form');

// Get all siblings
function getSiblings(element) {
  return [...element.parentElement.children].filter(
    child => child !== element
  );
}
```

## Common Selection Patterns

### Scoped Selection

Select within a container:

```javascript
const card = document.querySelector('.card');
const title = card.querySelector('h2');  // Only searches within card
const buttons = card.querySelectorAll('button');
```

### Checking if Element Exists

```javascript
const element = document.querySelector('.maybe-exists');

if (element) {
  // Safe to use element
  console.log(element.textContent);
}
```

### Finding Elements by Content

```javascript
// Find all links containing "Learn more"
const links = [...document.querySelectorAll('a')].filter(
  link => link.textContent.includes('Learn more')
);
```

## Try It Yourself

### Exercise 1: Element Inspector

Create a function that:
1. Takes a selector as an argument
2. Returns an object with: `tagName`, `id`, `classes`, `textContent`
3. Returns `null` if element doesn't exist

### Exercise 2: Tree Walker

Create a function that:
1. Takes an element as an argument
2. Returns an array of all its parent elements up to `<body>`

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "js-dom-selecting-quiz",
  "type": "multiple-choice",
  "title": "Selecting DOM Elements",
  "description": "Test your understanding of DOM selection methods.",
  "difficulty": "easy",
  "question": "What is the main advantage of querySelector over getElementById?",
  "options": [
    {
      "id": "a",
      "text": "querySelector is faster",
      "isCorrect": false,
      "explanation": "getElementById is actually slightly faster for ID lookups, but the difference is negligible."
    },
    {
      "id": "b",
      "text": "querySelector uses CSS selector syntax, allowing complex queries",
      "isCorrect": true,
      "explanation": "Correct! querySelector accepts any valid CSS selector, enabling complex queries like '.nav > ul li:first-child' or '[data-active=\"true\"]'."
    },
    {
      "id": "c",
      "text": "querySelector returns an array",
      "isCorrect": false,
      "explanation": "querySelector returns a single element (or null). querySelectorAll returns a NodeList."
    },
    {
      "id": "d",
      "text": "querySelector works in older browsers",
      "isCorrect": false,
      "explanation": "getElementById has better legacy browser support, though querySelector is supported in all modern browsers."
    }
  ]
}
-->

## Key Takeaways

- The DOM is a tree representation of HTML that JavaScript can interact with
- Use `querySelector` and `querySelectorAll` for flexible element selection
- `textContent` is safer than `innerHTML` for reading text
- `dataset` provides easy access to `data-*` attributes
- Traverse with `parentElement`, `children`, `closest`, and sibling properties

## Next Steps

Continue to [Modifying the DOM](./05b-modifying-the-dom.md) →

