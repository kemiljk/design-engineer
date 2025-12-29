# Building a Button

> **Quick Summary:** Buttons are the most fundamental interactive component. Building one properly teaches core component concepts.

## What You'll Learn

- Button variants and states
- Accessible button implementation
- Styling interactive states
- Component API design

## Button Fundamentals

A button seems simple, but proper implementation requires attention to:

<!-- illustration: component-states -->

- Semantic HTML
- Accessibility
- All interactive states
- Visual variants

## Semantic HTML

```html
<!-- For actions -->
<button type="button">Click me</button>

<!-- For form submission -->
<button type="submit">Submit</button>

<!-- NOT a button (navigation) -->
<a href="/page">Go somewhere</a>
```

Use `<button>` for actions, `<a>` for navigation. Never use `<div>` as a button.

## Base Button Styles

```css
.button {
  /* Reset browser defaults */
  appearance: none;
  border: none;
  background: none;
  font: inherit;
  cursor: pointer;

  /* Base styling */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;

  /* Default colors */
  background-color: var(--color-primary);
  color: white;

  /* Transition for states */
  transition:
    background-color 0.15s ease,
    transform 0.1s ease;
}
```

## Interactive States

```css
/* Hover */
.button:hover {
  background-color: var(--color-primary-dark);
}

/* Focus (keyboard navigation) */
.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Active (pressed) */
.button:active {
  transform: scale(0.98);
}

/* Disabled */
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## Button Variants

```css
/* Primary (default) */
.button--primary {
  background-color: var(--color-primary);
  color: white;
}

/* Secondary */
.button--secondary {
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-900);
}

/* Ghost/Outline */
.button--ghost {
  background-color: transparent;
  border: 1px solid currentColor;
  color: var(--color-primary);
}

/* Danger */
.button--danger {
  background-color: var(--color-error);
  color: white;
}
```

## Size Variants

```css
.button--small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.button--medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.button--large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}
```

## Accessibility Requirements

```html
<!-- With icon only, add aria-label -->
<button type="button" aria-label="Close dialog">
  <svg><!-- close icon --></svg>
</button>

<!-- Loading state -->
<button type="button" disabled aria-busy="true">
  <span class="spinner"></span>
  Loading...
</button>
```

## Complete Example

```html
<button class="button button--primary button--medium" type="button">
  <svg class="button__icon"><!-- icon --></svg>
  <span class="button__label">Save Changes</span>
</button>
```

## JavaScript Enhancement

```javascript
function createButton(options = {}) {
  const {
    variant = "primary",
    size = "medium",
    disabled = false,
    loading = false,
    icon = null,
    label = "",
  } = options;

  const button = document.createElement("button");
  button.className = `button button--${variant} button--${size}`;
  button.disabled = disabled || loading;

  if (loading) {
    button.setAttribute("aria-busy", "true");
    button.innerHTML = `<span class="spinner"></span> Loading...`;
  } else {
    button.innerHTML = `
      ${icon ? `<span class="button__icon">${icon}</span>` : ""}
      <span class="button__label">${label}</span>
    `;
  }

  return button;
}
```

## Try It Yourself

### Exercise 1: Build the Button

Create a complete button component with:

- All variants (primary, secondary, ghost, danger)
- All sizes (small, medium, large)
- All states (hover, focus, active, disabled)

### Exercise 2: Icon Buttons

Create buttons with icons:

- Icon + text
- Icon only (with aria-label)
- Text + icon (icon on right)

### Exercise 3: Loading State

Implement a loading button that:

- Shows a spinner
- Disables interaction
- Announces "loading" to screen readers

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "button-component-quiz",
  "type": "multiple-choice",
  "title": "Building a Button Component",
  "description": "Test your understanding of button accessibility.",
  "difficulty": "medium",
  "question": "When should you use <button> vs <a> for a clickable element?",
  "options": [
    {
      "id": "a",
      "text": "Use <a> for everything since you can style it to look like a button",
      "isCorrect": false,
      "explanation": "Styling doesn't change semantic behaviour—links and buttons work differently for accessibility."
    },
    {
      "id": "b",
      "text": "<button> for actions (submit, toggle), <a> for navigation to a new page/section",
      "isCorrect": true,
      "explanation": "Correct! Buttons perform actions, links navigate. Screen readers announce them differently, and they have different keyboard behaviors (Enter vs Enter/Space)."
    },
    {
      "id": "c",
      "text": "Use <button> only inside forms",
      "isCorrect": false,
      "explanation": "Buttons can be used anywhere actions are needed, not just forms."
    },
    {
      "id": "d",
      "text": "It doesn't matter as long as you add role='button'",
      "isCorrect": false,
      "explanation": "Using native elements is better than adding ARIA roles to the wrong element."
    }
  ]
}
-->

## Key Takeaways

- Use semantic `<button>` elements
- Style all states: hover, focus, active, disabled
- Create variants through modifier classes
- Always consider accessibility
- Loading states need visual and accessible feedback

## Next Steps

Continue to [Building a Card](./03-building-a-card.md) →
