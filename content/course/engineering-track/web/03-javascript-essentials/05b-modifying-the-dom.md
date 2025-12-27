---
estimatedTime: 12
---

# Modifying the DOM

> **Quick Summary:** Once you can select elements, you can modify them—changing content, creating new elements, and updating styles to build dynamic interfaces.

## What You'll Learn

- Modifying text and HTML content
- Creating and removing elements
- Working with classes and styles
- Practical DOM manipulation patterns

## Modifying Content

### Text Content

```javascript
const heading = document.querySelector('h1');
heading.textContent = 'New Title';
```

### HTML Content

```javascript
const container = document.querySelector('.container');
container.innerHTML = '<p>New paragraph</p>';

// Careful: innerHTML can be a security risk with user input
// Use textContent for plain text
```

**Security warning:** Never use `innerHTML` with user-provided content:

```javascript
// DANGEROUS - XSS vulnerability!
container.innerHTML = userInput;

// Safe alternative
container.textContent = userInput;
```

### Attributes

```javascript
const link = document.querySelector('a');

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
// HTML: <div data-user-id="123">

const div = document.querySelector('div');

// Write
div.dataset.status = 'loading';
// Adds: data-status="loading"

// Update
div.dataset.userId = '456';

// Remove
delete div.dataset.status;
```

## Creating Elements

### Basic Creation

```javascript
// Create element
const newPara = document.createElement('p');
newPara.textContent = 'New paragraph';
newPara.classList.add('intro');

// Add to DOM
document.body.appendChild(newPara);
```

### Insertion Methods

```javascript
const container = document.querySelector('.container');

// Insert at specific position
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

Using a fragment batches DOM updates, avoiding multiple reflows.

## Removing Elements

```javascript
// Remove element
element.remove();

// Remove child
parent.removeChild(child);

// Remove all children
container.innerHTML = '';
// Or (preserves event listeners on container)
while (container.firstChild) {
  container.removeChild(container.firstChild);
}

// Replace element
oldElement.replaceWith(newElement);
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
element.style.color = 'blue';
element.style.backgroundColor = 'yellow';  // camelCase
element.style.fontSize = '18px';

// Multiple styles
Object.assign(element.style, {
  color: 'blue',
  backgroundColor: 'yellow',
  padding: '10px'
});
```

### Computed Styles

Read the actual applied styles:

```javascript
// Get actual computed style
const styles = getComputedStyle(element);
styles.fontSize;  // "16px"
styles.display;   // "block"
```

### CSS Variables

```javascript
// Set CSS variable
document.documentElement.style.setProperty('--primary-color', 'blue');

// Get CSS variable
getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-color');
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

### Loading State

```javascript
function setLoading(element, isLoading) {
  element.classList.toggle('loading', isLoading);
  element.disabled = isLoading;
  element.textContent = isLoading ? 'Loading...' : 'Submit';
}
```

### Safe HTML Insertion

When you need HTML from user input, sanitise it:

```javascript
function sanitiseHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Usage
container.innerHTML = `<p>${sanitiseHTML(userInput)}</p>`;
```

## Try It Yourself

### Exercise 1: Todo List

Create a simple todo list that:
1. Has an input and add button
2. Adds new items to a list
3. Each item has a delete button that removes it

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
  "id": "js-dom-modifying-quiz",
  "type": "multiple-choice",
  "title": "Modifying the DOM",
  "description": "Test your understanding of DOM modification.",
  "difficulty": "medium",
  "question": "What is the difference between textContent and innerHTML when setting content?",
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

- `textContent` for safe text updates, `innerHTML` for HTML (with caution)
- `createElement` and `append`/`appendChild` to add elements
- Use `DocumentFragment` for batch insertions
- `classList` provides clean class manipulation
- `style` for inline styles, CSS variables for theming
- Always sanitise user input before using `innerHTML`

## Next Steps

Continue to [Events](./06-events.md) →

