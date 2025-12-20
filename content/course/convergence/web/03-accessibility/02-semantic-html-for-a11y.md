# Semantic HTML for Accessibility

> **Quick Summary:** Semantic HTML is the foundation of accessible interfaces. Using the right elements provides built-in accessibility features.

## What You'll Learn

- Why semantic HTML matters for accessibility
- Choosing the right elements
- ARIA: when and why
- Common accessibility patterns

## The Power of Native Elements

Native HTML elements come with built-in accessibility:

```html
<!-- A <button> gives you: -->
<!-- - Keyboard focusable -->
<!-- - Activatable with Enter/Space -->
<!-- - Announced as "button" by screen readers -->
<button>Click me</button>

<!-- A <div> gives you nothing -->
<div onclick="handleClick()">Click me</div>
```

Always prefer native elements over custom implementations.

## Landmark Elements

Help users navigate page structure:

```html
<header>Site header</header>
<nav>Navigation links</nav>
<main>Primary content</main>
<aside>Sidebar content</aside>
<footer>Site footer</footer>
```

Screen reader users can jump between landmarks.

## Headings Create Structure

```html
<h1>Page Title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>
    <h3>Subsection</h3>
  <h2>Section</h2>
```

Rules:
- One `<h1>` per page
- Don't skip levels
- Use for structure, not styling

## Form Accessibility

```html
<form>
  <div>
    <label for="email">Email address</label>
    <input 
      type="email" 
      id="email" 
      name="email"
      required
      aria-describedby="email-hint email-error"
    >
    <span id="email-hint">We'll never share your email</span>
    <span id="email-error" role="alert"></span>
  </div>
</form>
```

Key patterns:
- `<label>` with matching `for` and `id`
- Hint text with `aria-describedby`
- Error messages with `role="alert"`

## When to Use ARIA

ARIA (Accessible Rich Internet Applications) fills gaps where HTML falls short.

### First Rule of ARIA
Don't use ARIA if native HTML works.

### Common ARIA Uses

```html
<!-- Current page in navigation -->
<a href="/about" aria-current="page">About</a>

<!-- Expanded state -->
<button aria-expanded="false" aria-controls="menu">Menu</button>

<!-- Live regions for dynamic content -->
<div aria-live="polite">New notification</div>

<!-- Accessible names -->
<button aria-label="Close dialog">×</button>
```

## Accessible Interactive Patterns

### Buttons vs. Links

```html
<!-- Links: navigation -->
<a href="/page">Go to page</a>

<!-- Buttons: actions -->
<button type="button">Do something</button>
```

### Accessible Icons

```html
<!-- Icon with visible text -->
<button>
  <svg aria-hidden="true">...</svg>
  <span>Save</span>
</button>

<!-- Icon only -->
<button aria-label="Save">
  <svg aria-hidden="true">...</svg>
</button>
```

## Try It Yourself

### Exercise 1: Semantic Audit

Take a page you've built. Replace any:
- `<div>` that should be `<button>`
- `<span>` that should be `<a>`
- Missing landmarks
- Missing form labels

### Exercise 2: Form Accessibility

Build a form with:
- Proper labels
- Hint text
- Error messages
- Required field indication

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "semantic-a11y-quiz",
  "type": "multiple-choice",
  "title": "Semantic HTML for Accessibility",
  "description": "Test your understanding of semantic HTML's role in accessibility.",
  "difficulty": "medium",
  "question": "Why is it better to use native HTML elements instead of ARIA roles when possible?",
  "options": [
    {
      "id": "a",
      "text": "ARIA roles are deprecated and no longer supported",
      "isCorrect": false,
      "explanation": "ARIA is actively maintained and supported—but it has specific use cases."
    },
    {
      "id": "b",
      "text": "Native elements have built-in keyboard and screen reader behavior; ARIA only adds labels, not functionality",
      "isCorrect": true,
      "explanation": "Correct! A <button> automatically handles keyboard events, focus, and screen reader announcements. Adding role='button' to a div only announces it—you must add keyboard handling yourself."
    },
    {
      "id": "c",
      "text": "ARIA adds too much to the file size",
      "isCorrect": false,
      "explanation": "ARIA attributes are tiny—the issue is about functionality, not file size."
    },
    {
      "id": "d",
      "text": "Native elements are easier to style",
      "isCorrect": false,
      "explanation": "Styling difficulty isn't the primary reason—functionality is."
    }
  ]
}
-->

## Key Takeaways

- Native HTML elements have built-in accessibility
- Use landmarks to structure pages
- Headings create navigable hierarchy
- Labels are required for form inputs
- ARIA supplements HTML but doesn't replace it

## Next Steps

Continue to [Keyboard Navigation](./03-keyboard-navigation.md) →
