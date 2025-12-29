# JavaScript Performance

> **Quick Summary:** JavaScript can block rendering and cause janky interactions. Learn patterns for keeping interfaces responsive.

## What You'll Learn

- Main thread and responsiveness
- Debouncing and throttling
- Efficient DOM updates
- Code splitting basics

## The Main Thread

JavaScript runs on the main thread, the same thread that:
- Handles user input
- Runs animations
- Paints the screen

Long-running JavaScript blocks everything else.

## Debouncing

Delay execution until activity stops:

```javascript
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Usage: Search as you type
const handleSearch = debounce((query) => {
  fetchResults(query);
}, 300);

input.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});
```

Use for:
- Search inputs
- Window resize handlers
- Form validation

## Throttling

Limit execution frequency:

```javascript
function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage: Scroll handler
const handleScroll = throttle(() => {
  updateScrollPosition();
}, 100);

window.addEventListener('scroll', handleScroll);
```

Use for:
- Scroll events
- Mouse move tracking
- Continuous updates

## Efficient DOM Updates

### Batch Updates

```javascript
// Bad: Multiple reflows
items.forEach(item => {
  const el = document.createElement('div');
  el.textContent = item.name;
  container.appendChild(el); // Reflow each time
});

// Good: Single reflow
const fragment = document.createDocumentFragment();
items.forEach(item => {
  const el = document.createElement('div');
  el.textContent = item.name;
  fragment.appendChild(el);
});
container.appendChild(fragment); // One reflow
```

### requestAnimationFrame

Sync with browser paint cycle:

```javascript
function animate() {
  // Update animation state
  element.style.transform = `translateX(${position}px)`;
  
  if (animating) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);
```

## Event Delegation

Instead of many listeners, use one:

```javascript
// Bad: Listener per item
items.forEach(item => {
  item.addEventListener('click', handleClick);
});

// Good: Single delegated listener
container.addEventListener('click', (e) => {
  if (e.target.matches('.item')) {
    handleClick(e);
  }
});
```

## Code Splitting

Load code only when needed:

```javascript
// Dynamic import
button.addEventListener('click', async () => {
  const { heavyFunction } = await import('./heavy-module.js');
  heavyFunction();
});
```

In React:
```jsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

## Try It Yourself

### Exercise 1: Debounce Search

Implement a search input that debounces API calls.

### Exercise 2: Scroll Performance

Create a scroll listener with throttling and measure the difference without.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "js-performance-quiz",
  "type": "multiple-choice",
  "title": "JavaScript Performance",
  "description": "Test your understanding of JS performance optimisation.",
  "difficulty": "medium",
  "question": "Why should you debounce or throttle scroll and resize event handlers?",
  "options": [
    {
      "id": "a",
      "text": "To make animations smoother",
      "isCorrect": false,
      "explanation": "Debouncing limits function calls, not animation smoothness directly."
    },
    {
      "id": "b",
      "text": "These events fire many times per second, and running expensive code each time causes jank",
      "isCorrect": true,
      "explanation": "Correct! Scroll events can fire 60+ times per second. Running heavy calculations each time blocks the main thread and causes stuttering. Throttle limits frequency; debounce waits for inactivity."
    },
    {
      "id": "c",
      "text": "To prevent memory leaks",
      "isCorrect": false,
      "explanation": "Throttling is about reducing execution frequency, not memory management."
    },
    {
      "id": "d",
      "text": "It's only needed in older browsers",
      "isCorrect": false,
      "explanation": "All browsers benefit from efficient event handling."
    }
  ]
}
-->

## Key Takeaways

- JavaScript blocks the main thread
- Debounce for "when activity stops"
- Throttle for "at most X times per second"
- Batch DOM updates
- Use requestAnimationFrame for animations
- Event delegation reduces listener count
- Code splitting loads code on demand

## Next Steps

Continue to [The Details Matter](./05-the-details-matter.md) →
