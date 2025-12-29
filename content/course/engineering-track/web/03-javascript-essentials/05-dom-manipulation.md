# DOM Manipulation

> **Quick Summary:** The DOM (Document Object Model) is how JavaScript interacts with HTML. Manipulating the DOM lets you create dynamic, interactive interfaces.

## What You'll Learn

- Selecting elements from the page
- Reading and modifying content
- Creating and removing elements
- Changing styles and attributes

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

```
document
└── body
    └── div#app
        ├── h1 "Title"
        └── p.intro "Welcome"
```

JavaScript can traverse, read, and modify this tree.

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

### Converting to Array

```javascript
const links = document.querySelectorAll('a');
const linksArray = Array.from(links);
// Or
const linksArray2 = [...links];
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

## Modifying Content

### Text Content

```javascript
heading.textContent = 'New Title';
```

### HTML Content

```javascript
container.innerHTML = '<p>New paragraph</p>';

// Careful: innerHTML can be a security risk with user input
// Use textContent for plain text
```

### Attributes

```javascript
// Set attribute
link.setAttribute('href', 'https://example.com');
link.href = 'https://example.com';  // Direct assignment

// Remove attribute
link.removeAttribute('target');

// Toggle attribute
button.toggleAttribute('disabled');
```

### Data Attributes

```javascript
// HTML: <div data-user-id="123" data-active="true">

const div = document.querySelector('div');

// Read
div.dataset.userId;   // "123" (note: camelCase)
div.dataset.active;   // "true"

// Write
div.dataset.status = 'loading';
// Adds: data-status="loading"
```

## Creating Elements

```javascript
// Create element
const newPara = document.createElement('p');
newPara.textContent = 'New paragraph';
newPara.classList.add('intro');

// Add to DOM
document.body.appendChild(newPara);

// Insert at specific position
const container = document.querySelector('.container');
container.insertBefore(newPara, container.firstChild);

// Modern insertion methods
container.prepend(newPara);        // First child
container.append(newPara);         // Last child
container.before(newPara);         // Before container
container.after(newPara);          // After container
```

### Creating Multiple Elements

```javascript
const items = ['Apple', 'Banana', 'Cherry'];
const list = document.createElement('ul');

items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  list.appendChild(li);
});

document.body.appendChild(list);
```

### Document Fragment

For better performance with many elements:

```javascript
const fragment = document.createDocumentFragment();

items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  fragment.appendChild(li);
});

list.appendChild(fragment);  // Single DOM update
```

## Removing Elements

```javascript
// Remove element
element.remove();

// Remove child
parent.removeChild(child);

// Remove all children
container.innerHTML = '';
// Or
while (container.firstChild) {
  container.removeChild(container.firstChild);
}
```

## Modifying Classes

```javascript
const element = document.querySelector('.card');

// Add class
element.classList.add('active');
element.classList.add('featured', 'new');  // Multiple

// Remove class
element.classList.remove('active');

// Toggle class
element.classList.toggle('active');
element.classList.toggle('active', true);   // Force add
element.classList.toggle('active', false);  // Force remove

// Check for class
element.classList.contains('active');  // true/false

// Replace class
element.classList.replace('old', 'new');
```

## Modifying Styles

### Inline Styles

```javascript
element.style.colour = 'blue';
element.style.backgroundColor = 'yellow';  // camelCase
element.style.fontSize = '18px';

// Multiple styles
Object.assign(element.style, {
  colour: 'blue',
  backgroundColor: 'yellow',
  padding: '10px'
});
```

### Computed Styles

```javascript
// Get actual computed style
const styles = getComputedStyle(element);
styles.fontSize;  // "16px"
styles.display;   // "block"
```

### CSS Variables

```javascript
// Set CSS variable
document.documentElement.style.setProperty('--primary-colour', 'blue');

// Get CSS variable
getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-colour');
```

## Traversing the DOM

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

## Practical Patterns

### Toggle Visibility

```javascript
function toggleElement(selector) {
  const element = document.querySelector(selector);
  element.classList.toggle('hidden');
}
```

### Update List

```javascript
function updateList(items) {
  const list = document.querySelector('.list');
  list.innerHTML = '';
  
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
}
```

### Dynamic Content

```javascript
function renderCard(data) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.description}</p>
    <button data-id="${data.id}">View</button>
  `;
  return card;
}
```

## Try It Yourself

### Exercise 1: Todo List

Create a simple todo list that:
1. Has an input and add button
2. Adds new items to a list
3. Each item has a delete button

### Exercise 2: Tab Component

Create tabs that:
1. Have multiple tab buttons
2. Show corresponding content when clicked
3. Highlight the active tab

### Exercise 3: Dynamic Table

Create a function that takes an array of objects and renders a table:

```javascript
renderTable([
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
]);
```

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "js-dom-quiz",
  "type": "multiple-choice",
  "title": "DOM Manipulation",
  "description": "Test your understanding of working with the DOM.",
  "difficulty": "medium",
  "question": "What is the difference between textContent and innerHTML?",
  "options": [
    {
      "id": "a",
      "text": "They're the same, just different names for compatibility",
      "isCorrect": false,
      "explanation": "They behave very differently—especially regarding HTML parsing."
    },
    {
      "id": "b",
      "text": "textContent sets plain text safely; innerHTML parses HTML which can be a security risk",
      "isCorrect": true,
      "explanation": "Correct! textContent escapes HTML, making it safe. innerHTML parses HTML strings, which can execute malicious scripts if the content comes from user input."
    },
    {
      "id": "c",
      "text": "innerHTML is faster because it's more direct",
      "isCorrect": false,
      "explanation": "textContent is actually faster because it doesn't need to parse HTML."
    },
    {
      "id": "d",
      "text": "textContent only works on input elements",
      "isCorrect": false,
      "explanation": "textContent works on any element. Inputs use the 'value' property."
    }
  ]
}
-->

## Key Takeaways

- Use `querySelector` and `querySelectorAll` for selection
- `textContent` for text, `innerHTML` for HTML (careful with security)
- `createElement` and `append`/`appendChild` to add elements
- `classList` for class manipulation
- `style` for inline styles, `getComputedStyle` for computed
- `dataset` for data attributes
- DOM traversal with `parent`, `children`, and `sibling` properties

## Next Steps

Continue to [Events](./06-events.md) →
