---
estimatedTime: 10
---

# Selecting and Reading the DOM

> **Quick Summary:** The DOM (Document Object Model) is how JavaScript interacts with HTML. Learning to select and read elements is the foundation of dynamic interfaces.

## What You'll Learn

In this lesson, we will define what the DOM is and how it functions as a bridge between your HTML and JavaScript. You will learn the most effective methods for selecting single and multiple elements, how to read their text content and attributes, and the techniques needed to traverse the DOM tree with precision.

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

To select a single element, you can use `document.getElementById()` for high-performance ID lookups or `document.querySelector()` for more flexible selections. Both methods will return the first matching element they find or `null` if no match is available. The `querySelector` method is particularly powerful as it allows you to use standard CSS selector syntax to target elements by class, tag, or even complex parent-child relationships and data attributes.

### Multiple Elements

When you need to select multiple elements at once, you can use `document.getElementsByClassName()` or `document.getElementsByTagName()`, which return a live HTMLCollection. Alternatively, `document.querySelectorAll()` provides a more modern and versatile approach by returning a static NodeList of all elements that match your CSS selector, whether you are targeting specific classes or nested navigation links.

### HTMLCollection vs NodeList

While both collections are array-like and allow you to access elements by index, they differ in how they react to DOM changes. An `HTMLCollection` is live, meaning it will automatically update if elements are added or removed from the document. In contrast, the `NodeList` returned by `querySelectorAll` is static; it represents a fixed snapshot of the DOM at the exact moment the query was executed.

### Converting to Array

If you want to use modern array methods like `map`, `filter`, or `forEach`, you must first convert your NodeList or HTMLCollection into a true array. You can achieve this easily by using the `Array.from()` method or the spread operator, which provides you with a fully functional array that can then be manipulated using standard JavaScript techniques.

## Reading Content

### Text Content

You can read the text inside an element using either `textContent` or `innerText`. While `textContent` returns every piece of text within an element regardless of whether it is visible or not, `innerText` only retrieves the text that is currently visible to the user, respecting any CSS styling such as `display: none`. In most cases, `textContent` is preferred for its predictability and performance.

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

Develop a function that accepts a selector string and returns a detailed object containing the element's tag name, ID, class list, and text content. Ensure the function returns `null` if the specified element cannot be found in the document.

### Exercise 2: Tree Walker

Create a function that takes a DOM element as its starting point and returns an array containing all of its parent elements in order, up until it reaches the `<body>` tag.

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

To recap, the DOM is a powerful tree-based representation of your HTML that enables JavaScript to process and interact with web content dynamically. You should leverage `querySelector` and `querySelectorAll` for flexible and robust element selection, and use `dataset` to easily manage custom data stored in your HTML. Finally, remember that mastering DOM traversal and understanding the differences between `textContent` and `innerHTML` are essential for building secure and efficient web interfaces.

## Next Steps

Continue to [Modifying the DOM](./05b-modifying-the-dom.md) →

