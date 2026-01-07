# Building a Modal

> **Quick Summary:** Modals are complex components requiring focus management, keyboard handling, and careful accessibility work.

## What You'll Learn

- Modal structure and styling
- Focus trapping and management
- Keyboard interactions
- Accessible modal implementation

## Modal HTML Structure

```html
<div
  class="modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <div class="modal__backdrop"></div>
  <div class="modal__container">
    <div class="modal__header">
      <h2 id="modal-title" class="modal__title">Modal Title</h2>
      <button class="modal__close" aria-label="Close">
        <svg><!-- close icon --></svg>
      </button>
    </div>
    <div class="modal__body">
      <!-- Modal content -->
    </div>
    <div class="modal__footer">
      <button class="button button--secondary">Cancel</button>
      <button class="button button--primary">Confirm</button>
    </div>
  </div>
</div>
```

## Modal Styles

```css
.modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modal__container {
  position: relative;
  background: white;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--colour-neutral-200);
}

.modal__title {
  margin: 0;
  font-size: 1.25rem;
}

.modal__body {
  padding: 1.5rem;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--colour-neutral-200);
}
```

## Animation

```css
.modal[hidden] {
  display: none;
}

.modal {
  animation: fadeIn 0.15s ease;
}

.modal__container {
  animation: slideUp 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

## JavaScript Implementation

```javascript
class Modal {
  constructor(element) {
    this.element = element;
    this.container = element.querySelector(".modal__container");
    this.closeButton = element.querySelector(".modal__close");
    this.backdrop = element.querySelector(".modal__backdrop");

    this.previousActiveElement = null;

    this.bindEvents();
  }

  bindEvents() {
    this.closeButton.addEventListener("click", () => this.close());
    this.backdrop.addEventListener("click", () => this.close());
    this.element.addEventListener("keydown", (e) => this.handleKeydown(e));
  }

  open() {
    this.previousActiveElement = document.activeElement;
    this.element.hidden = false;
    document.body.style.overflow = "hidden";
    this.trapFocus();
  }

  close() {
    this.element.hidden = true;
    document.body.style.overflow = "";
    this.previousActiveElement?.focus();
  }

  handleKeydown(e) {
    if (e.key === "Escape") {
      this.close();
    }
    if (e.key === "Tab") {
      this.handleTab(e);
    }
  }

  trapFocus() {
    const focusableElements = this.container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    firstElement?.focus();
  }

  handleTab(e) {
    const focusable = this.container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}
```

## Accessibility Requirements

1. **Role and ARIA:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
2. **Focus trap:** Focus stays within modal
3. **Escape key:** Closes modal
4. **Return focus:** Returns to trigger element on close
5. **Background scroll:** Prevent body scroll when open

## Try It Yourself

### Exercise 1: Basic Modal

Implement a modal with:

- Open/close functionality
- Escape key to close
- Backdrop click to close

### Exercise 2: Confirmation Dialog

Build a confirmation modal:

- Warning message
- Cancel and Confirm buttons
- Returns user's choice

### Exercise 3: Form Modal

Create a modal with a form:

- Form fields inside
- Proper focus management
- Submit handling

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "modal-component-quiz",
  "type": "multiple-choice",
  "title": "Building a Modal Component",
  "description": "Test your understanding of modal accessibility.",
  "difficulty": "hard",
  "question": "What is 'focus trapping' and why is it important for modals?",
  "options": [
    {
      "id": "a",
      "text": "Preventing any keyboard interaction while the modal is open",
      "isCorrect": false,
      "explanation": "Users should be able to use the keyboard inside the modal, just not escape to the background."
    },
    {
      "id": "b",
      "text": "Keeping keyboard focus inside the modal, cycling from last to first focusable element",
      "isCorrect": true,
      "explanation": "Correct! Focus trapping ensures Tab cycles through modal content only. When reaching the last element, Tab moves to the first. This prevents users from accidentally interacting with the hidden background."
    },
    {
      "id": "c",
      "text": "Automatically focusing the close button when modal opens",
      "isCorrect": false,
      "explanation": "Focus management is related but different—usually you focus the first element or the modal container itself."
    },
    {
      "id": "d",
      "text": "Saving the previously focused element to restore later",
      "isCorrect": false,
      "explanation": "That's focus restoration—important but different from trapping."
    }
  ]
}
-->

## Key Takeaways

- Use semantic HTML and ARIA attributes
- Implement focus trapping
- Handle Escape key
- Return focus on close
- Prevent background scrolling
- Animate open/close for polish

## Next Steps

Continue to [Building a Form](./05-building-a-form.md) →
