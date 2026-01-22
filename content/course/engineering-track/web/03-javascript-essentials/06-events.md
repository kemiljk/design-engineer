# Events

> **Quick Summary:** Events let JavaScript respond to user actions—clicks, typing, scrolling, and more. They're the foundation of interactive interfaces.

## What You'll Learn

- Essential techniques for adding and removing event listeners
- Wide range of common event types
- How to leverage the event object and its properties
- Event delegation and bubbling for managing complex interactions

## What Are Events?

Events represent specific actions or occurrences that happen in the browser, such as a user clicking a button, typing into an input field, scrolling down a page, or the document finishing its initial load. JavaScript can "listen" for these events and execute specific code in response, allowing you to create dynamic and interactive user experiences.

## Adding Event Listeners

### `addEventListener`

The modern and most versatile way to handle events is by using the `addEventListener` method. This approach allows you to attach one or more event handlers to a single element without overwriting existing ones, providing a clean and modular way to manage interactivity across your application.

### With Named Function

```javascript
function handleClick() {
  console.log('Clicked!');
}

button.addEventListener('click', handleClick);
```

### Removing Listeners

If you need to remove an event listener later, you must provide a reference to the exact same function that was used when the listener was added. Because of this requirement, anonymous functions cannot be removed, so it is a best practice to use named function references if you anticipate needing to clean up your event handlers to prevent memory leaks or unwanted behaviours.

## Common Event Types

JavaScript can respond to a vast array of user and browser events. Mouse events like `click`, `mouseenter`, and `mouseleave` allow you to handle physical interactions, while keyboard events such as `keydown` and `keyup` are essential for text entry and shortcuts. You will also frequently work with form events like `submit` and `input` to manage user data, as well as window events such as `resize` and `scroll` for responsive and dynamic layout adjustments. On mobile devices, touch events provide the necessary feedback for gestures like tapping and swiping.

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

The event object provides a wealth of information about exactly what occurred. For any event, you can access the `target` to find the element that triggered it, the `currentTarget` to see which element holds the listener, and the `type` to identify the specific event. Mouse events additionally include coordinates like `clientX` and `clientY`, while keyboard events provide details about the specific `key` and `code` that were pressed, along with the state of modifier keys like Shift or Alt.

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

Event delegation is a powerful technique that allows you to handle events for multiple child elements using a single listener on their parent. This approach is highly efficient as it significantly reduces the number of event listeners in your application, which leads to better performance. Furthermore, it simplifies your code and ensures that any dynamically added elements are automatically covered by the listener without any additional setup.

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

Develop a simple interface featuring a button that displays and updates a count of how many times it has been clicked by the user.

### Exercise 2: Character Counter

Create an input field paired with a character counter. Your JavaScript should listen for input events and update the counter in real-time as the user types, ensuring they can see how many characters they have entered.

### Exercise 3: Sortable List

Implement a list where each item has buttons to move it up or down relative to its siblings. You should use event delegation to handle the button clicks efficiently for the entire list.

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
      "explanation": "Event delegation is about DOM event handling, not file organisation."
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

- To recap, `addEventListener` is the primary method for attaching event handlers
- making your web pages interactive making your web pages interactive
- Every event provides an object full of useful data
- you can use `preventDefault()` to override the browser's default behaviours when necessary
- you can use `preventDefault()` to override the browser's default behaviours when necessary

## Next Steps

Continue to [Working with Data](./07-working-with-data.md) →
