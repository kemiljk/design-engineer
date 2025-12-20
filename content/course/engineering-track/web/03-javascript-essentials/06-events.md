# Events

> **Quick Summary:** Events let JavaScript respond to user actions—clicks, typing, scrolling, and more. They're the foundation of interactive interfaces.

## What You'll Learn

- Adding and removing event listeners
- Common event types
- Event objects and their properties
- Event delegation and bubbling

## What Are Events?

Events are things that happen: a user clicks, types, scrolls, or the page loads. JavaScript can listen for these events and respond.

```javascript
button.addEventListener('click', () => {
  console.log('Button clicked!');
});
```

## Adding Event Listeners

### addEventListener

The modern, preferred way:

```javascript
const button = document.querySelector('button');

button.addEventListener('click', () => {
  console.log('Clicked!');
});
```

### With Named Function

```javascript
function handleClick() {
  console.log('Clicked!');
}

button.addEventListener('click', handleClick);
```

### Removing Listeners

Must use the same function reference:

```javascript
button.removeEventListener('click', handleClick);
```

Anonymous functions can't be removed:

```javascript
// Can't remove this later
button.addEventListener('click', () => {});
```

## Common Event Types

### Mouse Events

```javascript
element.addEventListener('click', handler);      // Click
element.addEventListener('dblclick', handler);   // Double click
element.addEventListener('mouseenter', handler); // Mouse enters
element.addEventListener('mouseleave', handler); // Mouse leaves
element.addEventListener('mousemove', handler);  // Mouse moves
element.addEventListener('mousedown', handler);  // Mouse button pressed
element.addEventListener('mouseup', handler);    // Mouse button released
```

### Keyboard Events

```javascript
input.addEventListener('keydown', handler);   // Key pressed
input.addEventListener('keyup', handler);     // Key released
input.addEventListener('keypress', handler);  // Deprecated, use keydown
```

### Form Events

```javascript
form.addEventListener('submit', handler);    // Form submitted
input.addEventListener('input', handler);    // Value changes
input.addEventListener('change', handler);   // Value committed (blur)
input.addEventListener('focus', handler);    // Element focused
input.addEventListener('blur', handler);     // Element loses focus
```

### Window/Document Events

```javascript
window.addEventListener('load', handler);     // Page fully loaded
document.addEventListener('DOMContentLoaded', handler); // DOM ready
window.addEventListener('resize', handler);   // Window resized
window.addEventListener('scroll', handler);   // Page scrolled
```

### Touch Events (Mobile)

```javascript
element.addEventListener('touchstart', handler);
element.addEventListener('touchmove', handler);
element.addEventListener('touchend', handler);
```

## The Event Object

Event handlers receive an event object with information about the event:

```javascript
button.addEventListener('click', (event) => {
  console.log(event.type);     // "click"
  console.log(event.target);   // The clicked element
  console.log(event.currentTarget); // Element with listener
});
```

### Common Event Properties

```javascript
event.target          // Element that triggered event
event.currentTarget   // Element with the listener
event.type            // Event type ("click", "keydown", etc.)
event.timeStamp       // When event occurred

// Mouse events
event.clientX         // Mouse X position in viewport
event.clientY         // Mouse Y position in viewport
event.pageX           // Mouse X position in page
event.pageY           // Mouse Y position in page
event.button          // Which mouse button (0=left, 1=middle, 2=right)

// Keyboard events
event.key             // Key pressed ("Enter", "a", "Escape")
event.code            // Physical key ("KeyA", "Enter")
event.shiftKey        // Shift held?
event.ctrlKey         // Ctrl held?
event.altKey          // Alt held?
event.metaKey         // Cmd/Win held?
```

## Preventing Default Behavior

Stop the browser's default action:

```javascript
// Prevent form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // Handle form with JavaScript
});

// Prevent link navigation
link.addEventListener('click', (event) => {
  event.preventDefault();
  // Custom handling
});
```

## Event Bubbling

<!-- illustration: event-bubbling -->

Events bubble up the DOM tree:

```html
<div class="parent">
  <button class="child">Click me</button>
</div>
```

```javascript
document.querySelector('.parent').addEventListener('click', () => {
  console.log('Parent clicked');
});

document.querySelector('.child').addEventListener('click', () => {
  console.log('Child clicked');
});

// Clicking button logs:
// "Child clicked"
// "Parent clicked"
```

### Stopping Propagation

```javascript
button.addEventListener('click', (event) => {
  event.stopPropagation();
  // Parent handler won't run
});
```

## Event Delegation

Instead of adding listeners to many elements, listen on a parent:

```javascript
// Instead of this:
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', handleClick);
});

// Do this:
document.querySelector('.list').addEventListener('click', (event) => {
  if (event.target.matches('.item')) {
    handleClick(event);
  }
});
```

### Benefits of Delegation

- Works with dynamically added elements
- Better performance (fewer listeners)
- Simpler code

### Delegation Pattern

```javascript
document.querySelector('.container').addEventListener('click', (event) => {
  // Check what was clicked
  const button = event.target.closest('button');
  if (!button) return;
  
  // Get data from button
  const action = button.dataset.action;
  const id = button.dataset.id;
  
  // Handle different actions
  switch (action) {
    case 'edit':
      editItem(id);
      break;
    case 'delete':
      deleteItem(id);
      break;
  }
});
```

## Debouncing and Throttling

For events that fire frequently:

### Debounce

Wait until events stop, then run once:

```javascript
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Search as user types (after they stop)
input.addEventListener('input', debounce((e) => {
  search(e.target.value);
}, 300));
```

### Throttle

Run at most once per interval:

```javascript
function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Scroll handler (max once per 100ms)
window.addEventListener('scroll', throttle(() => {
  updateScrollPosition();
}, 100));
```

## Practical Examples

### Toggle Menu

```javascript
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuButton.addEventListener('click', () => {
  menu.classList.toggle('open');
});

// Close when clicking outside
document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
    menu.classList.remove('open');
  }
});
```

### Form Validation

```javascript
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const email = form.querySelector('[name="email"]').value;
  const errors = [];
  
  if (!email.includes('@')) {
    errors.push('Invalid email');
  }
  
  if (errors.length) {
    showErrors(errors);
  } else {
    submitForm(form);
  }
});
```

### Keyboard Shortcuts

```javascript
document.addEventListener('keydown', (event) => {
  // Ctrl/Cmd + S
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    event.preventDefault();
    saveDocument();
  }
  
  // Escape
  if (event.key === 'Escape') {
    closeModal();
  }
});
```

## Try It Yourself

### Exercise 1: Click Counter

Create a button that shows how many times it's been clicked.

### Exercise 2: Character Counter

Create an input with a character counter that updates as you type.

### Exercise 3: Sortable List

Create a list where clicking a button moves an item up or down. Use event delegation.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "js-events-quiz",
  "type": "multiple-choice",
  "title": "Event Handling",
  "description": "Test your understanding of JavaScript events.",
  "difficulty": "medium",
  "question": "What is event delegation and why is it useful?",
  "options": [
    {
      "id": "a",
      "text": "Passing event handling to a different JavaScript file",
      "isCorrect": false,
      "explanation": "Event delegation is about DOM event handling, not file organization."
    },
    {
      "id": "b",
      "text": "Adding one listener to a parent that handles events for all children, even ones added later",
      "isCorrect": true,
      "explanation": "Correct! Event delegation uses event bubbling to handle events on a parent, working for current and future children with fewer listeners and better performance."
    },
    {
      "id": "c",
      "text": "Using async/await to handle events asynchronously",
      "isCorrect": false,
      "explanation": "Event delegation is unrelated to async/await."
    },
    {
      "id": "d",
      "text": "Removing event listeners when they're no longer needed",
      "isCorrect": false,
      "explanation": "That's cleanup, not delegation."
    }
  ]
}
-->

## Key Takeaways

- `addEventListener` attaches event handlers
- Event object contains information about the event
- `preventDefault()` stops default browser behavior
- Events bubble up—use `stopPropagation()` to stop
- Event delegation listens on parents for efficiency
- Debounce and throttle for frequently firing events
- Use `event.target` to find what triggered the event

## Next Steps

Continue to [Working with Data](./07-working-with-data.md) →
