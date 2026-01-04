# Selectors Deep Dive

> **Quick Summary:** Selectors determine which elements your CSS rules target. Mastering selectors gives you precision and flexibility in styling.

## What You'll Learn

- All major selector types
- Combinators for targeting related elements
- Pseudo-classes for states and patterns
- Pseudo-elements for generated content

## Basic Selectors

### Type Selector

Targets elements by tag name:

```css
p { color: #333; }
h1 { font-size: 2rem; }
```

### Class Selector

Targets elements with a specific class:

```css
.card { padding: 1rem; }
.btn { cursor: pointer; }
```

Classes are reusable—multiple elements can share the same class, and elements can have multiple classes.

### ID Selector

Targets a single element with a specific ID:

```css
#header { position: sticky; }
```

IDs should be unique per page. High specificity makes them harder to override—prefer classes.

### Universal Selector

Targets all elements:

```css
* {
  box-sizing: border-box;
}
```

Use sparingly—it's broad and can impact performance at scale.

### Grouping Selector

Apply the same styles to multiple selectors:

```css
h1, h2, h3 {
  font-family: Georgia, serif;
  line-height: 1.2;
}
```

## Attribute Selectors

Target elements by their attributes:

### Has Attribute

```css
/* Elements with a title attribute */
[title] { cursor: help; }
```

### Exact Match

```css
/* Links opening in new tab */
[target="_blank"] { ... }
```

### Contains Word

```css
/* Class containing the word "btn" as a whole word */
[class~="btn"] { ... }
```

### Starts With

```css
/* Links starting with https */
[href^="https"] { ... }
```

### Ends With

```css
/* PDF links */
[href$=".pdf"] { ... }
```

### Contains

```css
/* Links containing "example" anywhere */
[href*="example"] { ... }
```

### Practical Uses

```css
/* External links */
a[href^="http"]:not([href*="mysite.com"]) {
  &::after { content: " ↗"; }
}

/* Required inputs */
input[required] {
  border-left: 3px solid red;
}

/* Data attributes */
[data-theme="dark"] {
  background: #1a1a1a;
  color: white;
}
```

## Combinators

Combinators express relationships between elements.

### Descendant Combinator (space)

Targets elements anywhere inside another:

```css
/* Any p inside .article, no matter how deep */
.article p { line-height: 1.6; }
```

### Child Combinator (>)

Targets direct children only:

```css
/* Only immediate children, not nested ones */
.nav > li { display: inline-block; }
```

### Adjacent Sibling (+)

Targets the element immediately after:

```css
/* Paragraph immediately after h1 */
h1 + p { font-size: 1.25rem; }
```

### General Sibling (~)

Targets all siblings after:

```css
/* All paragraphs after h1 (same parent level) */
h1 ~ p { margin-left: 1rem; }
```

### Combinator Examples

```html
<nav class="nav">
  <ul>
    <li><a href="/">Home</a></li>
    <li>
      <a href="/products">Products</a>
      <ul>
        <li><a href="/products/a">Product A</a></li>
      </ul>
    </li>
  </ul>
</nav>
```

```css
/* All links in nav (descendant) */
.nav a { color: white; }

/* Only direct children ul (child) */
.nav > ul { display: flex; }

/* Nested lists only */
.nav li > ul { position: absolute; }
```

## Pseudo-Classes

Pseudo-classes target elements in specific states or patterns.

### User Action States

```css
/* Mouse over */
a:hover { color: blue; }

/* Keyboard focus */
a:focus { outline: 2px solid blue; }

/* Being clicked */
button:active { transform: scale(0.98); }

/* Focus visible (keyboard only) */
button:focus-visible { outline: 2px solid blue; }
```

### Link States

```css
a:link { color: blue; }      /* Unvisited */
a:visited { color: purple; } /* Visited */
```

Order matters: `:link`, `:visited`, `:hover`, `:active` (LVHA).

### Form States

```css
input:focus { border-color: blue; }
input:disabled { opacity: 0.5; }
input:checked { ... } /* Checkboxes, radios */
input:required { ... }
input:optional { ... }
input:valid { border-color: green; }
input:invalid { border-color: red; }
input:placeholder-shown { ... }
```

### Structural Pseudo-Classes

```css
/* First/last child */
li:first-child { ... }
li:last-child { ... }

/* By position */
li:nth-child(2) { ... }      /* Second child */
li:nth-child(odd) { ... }    /* 1st, 3rd, 5th... */
li:nth-child(even) { ... }   /* 2nd, 4th, 6th... */
li:nth-child(3n) { ... }     /* Every third */
li:nth-child(3n+1) { ... }   /* 1st, 4th, 7th... */

/* From the end */
li:nth-last-child(2) { ... } /* Second to last */

/* By type */
p:first-of-type { ... }
p:last-of-type { ... }
p:nth-of-type(2) { ... }

/* Only child */
p:only-child { ... }
p:only-of-type { ... }
```

### Negation

```css
/* All buttons except disabled */
button:not(:disabled) { cursor: pointer; }

/* Links that aren't in nav */
a:not(.nav a) { text-decoration: underline; }
```

### Other Useful Pseudo-Classes

```css
/* Element with no children */
div:empty { display: none; }

/* Target of URL fragment (#id) */
section:target { background: yellow; }

/* Matching element itself */
.card:is(.featured, .promoted) { border: 2px solid gold; }

/* Where (same as :is but zero specificity) */
:where(h1, h2, h3) { font-family: serif; }

/* Has child matching selector */
.card:has(img) { padding-top: 0; }
.card:has(> .badge) { position: relative; }
```

## Pseudo-Elements

Pseudo-elements create virtual elements for styling.

### Before and After

Create content before or after an element:

```css
.required-field::before {
  content: "* ";
  color: red;
}

.external-link::after {
  content: " ↗";
}
```

`content` is required for `::before` and `::after` to appear.

### First Line and First Letter

```css
p::first-line {
  font-weight: bold;
}

p::first-letter {
  font-size: 2em;
  float: left;
}
```

### Selection

Style selected text:

```css
::selection {
  background: yellow;
  color: black;
}
```

### Placeholder

Style input placeholders:

```css
input::placeholder {
  color: #999;
  font-style: italic;
}
```

### Marker

Style list markers:

```css
li::marker {
  color: blue;
  font-weight: bold;
}
```

## Selector Strategies

### BEM Naming

Block-Element-Modifier convention:

```css
.card { }
.card__title { }
.card__content { }
.card--featured { }
```

- `.block` — Component
- `.block__element` — Part of component
- `.block--modifier` — Variation

### Low Specificity

Keep specificity low for flexibility:

```css
/* Avoid */
#sidebar .widget ul li a { }

/* Prefer */
.widget-link { }
```

### Utility Classes

Single-purpose classes:

```css
.text-center { text-align: center; }
.mt-4 { margin-top: 1rem; }
.hidden { display: none; }
```

## CSS Nesting

Native CSS now supports nesting (Baseline 2024), similar to Sass:

```css
.card {
  padding: 1rem;
  background: white;
  
  /* Nested selector - equivalent to .card:hover */
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  /* Nested descendant - equivalent to .card .title */
  .title {
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  /* Nested child - equivalent to .card > .content */
  > .content {
    margin-top: 0.5rem;
  }
  
  /* Media query nesting */
  @media (min-width: 768px) {
    padding: 2rem;
  }
}
```

### The & Selector

The `&` represents the parent selector:

```css
.button {
  background: blue;
  
  &:hover { background: darkblue; }
  &:focus { outline: 2px solid blue; }
  &:disabled { opacity: 0.5; }
  
  /* Compound: .button.primary */
  &.primary { background: green; }
  
  /* Parent context: .dark .button */
  .dark & { background: lightblue; }
}
```

### When to Nest

Nesting improves readability for related styles, but don't over-nest:

```css
/* Good: Related styles grouped */
.nav {
  display: flex;
  
  a { color: white; }
  a:hover { text-decoration: underline; }
}

/* Avoid: Too deeply nested */
.page {
  .container {
    .sidebar {
      .widget {
        .title { /* Too deep! */ }
      }
    }
  }
}
```

Keep nesting shallow (2-3 levels max) to maintain readability and avoid specificity issues.

## Try It Yourself

### Exercise 1: Zebra Striping

Use `nth-child` to create alternating row colours in a table without adding classes to HTML.

### Exercise 2: Form Validation Styling

Style a form so that:
- Required fields have a left border
- Invalid fields have red borders
- Valid fields have green borders
- Focused fields have blue outlines

### Exercise 3: Navigation Styling

Create navigation where:
- All links have base styles
- Current page link is highlighted
- Dropdowns appear on hover
- Focus states are visible

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "css-selectors-quiz",
  "type": "multiple-choice",
  "title": "CSS Selectors",
  "description": "Test your understanding of CSS selector specificity.",
  "difficulty": "medium",
  "question": "What does the selector 'button:hover:not(:disabled)' match?",
  "options": [
    {
      "id": "a",
      "text": "All buttons that are either hovered OR not disabled",
      "isCorrect": false,
      "explanation": "Chained pseudo-classes are AND conditions, not OR."
    },
    {
      "id": "b",
      "text": "Buttons that are currently being hovered AND are not disabled",
      "isCorrect": true,
      "explanation": "Correct! Chained pseudo-classes all apply simultaneously. This matches buttons that are both hovered and not disabled."
    },
    {
      "id": "c",
      "text": "All buttons except those that are disabled and being hovered",
      "isCorrect": false,
      "explanation": "The :not() only applies to :disabled, and the hover condition must also be true."
    },
    {
      "id": "d",
      "text": "This is invalid CSS syntax",
      "isCorrect": false,
      "explanation": "Chaining pseudo-classes is valid and commonly used in modern CSS."
    }
  ]
}
-->

## Key Takeaways

- Basic selectors: type, class, ID, universal
- Attribute selectors target by attribute values
- Combinators express relationships: descendant, child, sibling
- Pseudo-classes target states: `:hover`, `:focus`, `:nth-child()`
- Pseudo-elements create virtual elements: `::before`, `::after`
- Native CSS nesting with `&` is now baseline (2024)
- Keep selectors simple and specificity low
- `:has()` is a powerful parent selector (modern browsers)

## Next Steps

Continue to [The Box Model](./03-the-box-model.md) →
