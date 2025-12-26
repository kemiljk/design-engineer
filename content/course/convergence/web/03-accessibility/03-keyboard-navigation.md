# Keyboard Navigation

> **Quick Summary:** Many users navigate entirely with keyboards. Ensuring all functionality is keyboard accessible is essential.

## What You'll Learn

- Focus management fundamentals
- Tab order and focus trapping
- Visible focus indicators
- Skip links and navigation shortcuts

## Who Uses Keyboard Navigation?

- Users with motor impairments
- Screen reader users
- Power users preferring keyboard shortcuts
- Users with broken mice/trackpads
- Anyone temporarily unable to use a mouse

## Focus Fundamentals

<!-- illustration: focus-order -->

### Focusable Elements

By default, these are focusable:
- Links (`<a href>`)
- Buttons (`<button>`)
- Form inputs
- Elements with `tabindex="0"`

Not focusable:
- `<div>`, `<span>`
- `<a>` without href
- Disabled elements

### Making Elements Focusable

```html
<!-- Add to tab order -->
<div tabindex="0">Now focusable</div>

<!-- Programmatically focusable only -->
<div tabindex="-1">Can receive focus via JS</div>
```

## Tab Order

Tab order should follow visual/logical order:

```html
<!-- Good: Natural order -->
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>

<!-- Avoid: Unnatural tabindex -->
<a tabindex="3">Third</a>
<a tabindex="1">First</a>
<a tabindex="2">Second</a>
```

Let the DOM order determine tab order.

## Visible Focus Indicators

Never remove focus styles without replacement:

```css
/* Bad */
*:focus {
  outline: none;
}

/* Good */
:focus-visible {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}
```

`:focus-visible` shows focus for keyboard users while hiding it for mouse users.

## Focus Trapping

Modal dialogs must trap focus:

```javascript
function trapFocus(element) {
  const focusable = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}
```

## Skip Links

Allow users to skip repetitive navigation:

```html
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <nav><!-- Long navigation --></nav>
  <main id="main-content">
    <!-- Main content -->
  </main>
</body>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
}

.skip-link:focus {
  top: 0;
}
```

## Common Keyboard Interactions

| Key | Expected Action |
|-----|-----------------|
| Tab | Move to next focusable element |
| Shift+Tab | Move to previous focusable element |
| Enter | Activate links/buttons |
| Space | Activate buttons, toggle checkboxes |
| Escape | Close modal, cancel action |
| Arrow keys | Navigate within components |

## Try It Yourself

### Exercise 1: Keyboard Testing

Navigate a page you've built using only keyboard:
- Can you reach all interactive elements?
- Is focus visible?
- Can you close modals with Escape?

### Exercise 2: Focus Trap

Build a modal with proper focus trapping:
- Focus moves into modal on open
- Tab cycles within modal
- Escape closes modal
- Focus returns to trigger on close

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "keyboard-nav-quiz",
  "type": "multiple-choice",
  "title": "Keyboard Navigation",
  "description": "Test your understanding of keyboard accessibility.",
  "difficulty": "medium",
  "question": "What should happen when a user opens a modal dialogue?",
  "options": [
    {
      "id": "a",
      "text": "Focus should stay on the button that opened it",
      "isCorrect": false,
      "explanation": "The user needs to interact with the modal—focus should move into it."
    },
    {
      "id": "b",
      "text": "Focus moves into the modal, is trapped there, and returns to the trigger when closed",
      "isCorrect": true,
      "explanation": "Correct! Focus must move into the modal so keyboard users can interact. Tab should cycle within the modal (focus trap). On close, focus returns to the triggering element."
    },
    {
      "id": "c",
      "text": "The modal shouldn't be keyboard accessible—use mouse only",
      "isCorrect": false,
      "explanation": "All interactive elements must be keyboard accessible."
    },
    {
      "id": "d",
      "text": "Focus should go to the browser URL bar",
      "isCorrect": false,
      "explanation": "Focus should stay within the page content."
    }
  ]
}
-->

## Key Takeaways

- Many users rely on keyboard navigation
- Focusable elements: links, buttons, inputs, tabindex="0"
- Never remove focus styles without replacement
- Modals must trap focus
- Skip links help users bypass repetitive content

## Next Steps

Continue to [Screen Reader Experience](./04-screen-reader-experience.md) →
