---
estimatedTime: 12
---

# Modifying the DOM

> **Quick Summary:** Once you can select elements, you can modify them—changing content, creating new elements, and updating styles to build dynamic interfaces.

## What You'll Learn

- Techniques for modifying text and HTML content
- How to create and remove elements dynamically
- Working effectively with CSS classes and inline styles
- Practical DOM manipulation patterns for real-world interfaces

## Modifying Content

### Text and HTML Content

You can update an element's text by assigning a new string to its `textContent` property, or modify its structure using `innerHTML`. While `innerHTML` allows you to insert complex HTML, you must be extremely cautious when using it with user-provided content, as it can introduce significant security risks such as cross-site scripting (XSS) vulnerabilities. For plain text updates, `textContent` is always the safer and more performant choice.

**Security warning:** Never use `innerHTML` with user-provided content:

```javascript
// DANGEROUS - XSS vulnerability!
container.innerHTML = userInput;

// Safe alternative
container.textContent = userInput;
```

### Attributes

JavaScript provides straightforward ways to manage HTML attributes. You can use `setAttribute()` to define new attributes or update existing ones, or directly assign values to properties like `href`. Likewise, `removeAttribute()` allows you to delete attributes entirely, while `toggleAttribute()` is highly useful for managing boolean states such as `disabled` on button elements.

### Data Attributes

Custom data attributes can be easily managed through an element's `dataset` property. You can read current values, add new data by assigning to properties on the dataset object—which automatically converts camelCase names to their hyphenated HTML counterparts—or use the `delete` keyword to remove specific data attributes when they are no longer needed.

## Creating Elements

### Basic Creation

To add new content to a page, you must first create an element using `document.createElement()`, configure its properties like text content or classes, and then explicitly add it to the DOM. Common methods for insertion include `appendChild()`, which adds the new element as the last child of a parent, ensuring it appears correctly within your interface structure.

### Insertion Methods

Beyond simple appending, modern JavaScript offers several versatile insertion methods. You can use `prepend()` to add an element as the first child, or `before()` and `after()` to position it as a sibling relative to another element. For more precise control, `insertBefore()` allows you to specify exactly which child the new element should precede.

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

When you need to insert a large number of elements at once, using a `DocumentFragment` is a significantly more performant approach. By appending your elements to a fragment first and then adding that fragment to the DOM in a single operation, you can avoid multiple layout reflows and ensure that your application remains responsive and fluid.

## Removing Elements

Removing elements from the DOM is equally simple. The `remove()` method allows an element to remove itself directly, while `removeChild()` can be used by a parent to target a specific child. If you need to clear all content from a container, you can either set its `innerHTML` to an empty string or use a loop to remove each child individually, which helpfully preserves any event listeners attached to the container itself.

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
document.documentElement.style.setProperty('--primary-colour', 'blue');

// Get CSS variable
getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-colour');
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

Build a basic todo list application that features an input field and an add button. Your script should allow users to add new items to the list dynamically, and each individual item should include a delete button that removes it from the DOM when clicked.

### Exercise 2: Tab Component

Create an interactive tab component that includes several tab buttons. When a user clicks a button, the corresponding content section should be revealed, and the active tab should be highlighted to provide clear visual feedback.

### Exercise 3: Dynamic Table

Develop a function that accepts an array of objects and renders them as a structured HTML table. This function should demonstrate your ability to create elements, set their content, and build a nested structure through DOM manipulation.

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

- To recap, `textcontent` should be your default for safe text updates
- `innerHTML` should only be used when you are certain the HTML content is secure
- Consider using a `documentfragment` to batch multiple updates for better performance
- Always ensure that you sanitise any user-provided input to prevent security vulnerabilities

## Next Steps

Continue to [Events](./06-events.md) →

