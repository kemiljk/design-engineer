# Semantic HTML for Accessibility

> **Quick Summary:** Semantic HTML is the foundation of accessible interfaces. Using the right elements provides built-in accessibility features.

## What You'll Learn

In this lesson, you will discover why semantic HTML is the non-negotiable foundation of an accessible web experience and how choosing the correct native elements provides functionality "for free." We'll explore the proper use of ARIA attributes to fill gaps where HTML falls short, and identify common semantic patterns that ensure your interfaces are machine-readable and navigable for assistive technologies.

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

There are three strict rules for using headings. First, use only one `<h1>` per page to define the main topic. Second, do not skip heading levels (e.g., jumping from `<h2>` to `<h4>`), as this confuses screen reader navigation. Finally, never use headings purely for visual styling; use CSS classes for that instead.

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

There are three key patterns to follow here. First, always link your `<label>` to its input using matching `for` and `id` attributes. Second, associate helper text using `aria-describedby` so it is announced when the field is focused. Third, for error messages, use `role="alert"` to ensure the screen reader announces the problem immediately.

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

Review a page you have recently built and identify non-semantic elements. Replace any `<div>`s that function as buttons with actual `<button>` tags, swap `<span>`s acting as links for `<a>` tags, and ensure your page has proper landmark regions and clear form labels.

### Exercise 2: Form Accessibility

Create a robust form that includes properly associated labels for every input. Add hint text linked via `aria-describedby`, implement error messages that use `role="alert"`, and clearly mark required fields both visually and programmatically.

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
      "explanation": "ARIA is actively maintained and supported, but it has specific use cases."
    },
    {
      "id": "b",
      "text": "Native elements have built-in keyboard and screen reader behaviour; ARIA only adds labels, not functionality",
      "isCorrect": true,
      "explanation": "Correct! A <button> automatically handles keyboard events, focus, and screen reader announcements. Adding role='button' to a div only announces it. You must add keyboard handling yourself."
    },
    {
      "id": "c",
      "text": "ARIA adds too much to the file size",
      "isCorrect": false,
      "explanation": "ARIA attributes are tiny. The issue is about functionality, not file size."
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

Native HTML elements should always be your first choice because they come with built-in accessibility behavioral features that significantly reduce development effort. By using landmarks to structure your pages and headings to create a navigable hierarchy, you ensure users can find what they need quickly. Always remember that labels are required for all form inputs and that ARIA should only be used to supplement HTML when native elements cannot achieve the desired result—it is never a replacement for good markup.

## Next Steps

Continue to [Keyboard Navigation](./03-keyboard-navigation.md) →
