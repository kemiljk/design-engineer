# Selectors Deep Dive

> **Quick Summary:** Selectors determine which elements your CSS rules target. Mastering selectors gives you precision and flexibility in styling.

## What You'll Learn

- All major selector types
- How to use combinators to target related elements
- Pseudo-classes for managing states and patterns
- Pseudo-elements for generating content through CSS

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

Attribute selectors allow you to target elements based on the attributes they possess and the specific values they contain. You can style an element simply because it **has an attribute**, such as `[title]` to add a help cursor, or target an **exact match** like `[target="_blank"]` for links that open in new tabs.

For more flexibility, you can target an attribute that **contains a specific word** using `[class~="btn"]`, or check if an attribute **starts with** a certain string, such as `[href^="https"]` for secure links. Similarly, you can target elements where an attribute **ends with** a specific pattern, like `[href$=".pdf"]` for documents, or simply **contains** a substring anywhere within the value using `[href*="example"]`.

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

Combinators express the specific relationships between elements in your HTML structure. The **descendant combinator**, represented by a space, targets elements located anywhere inside another, regardless of how deep they are nested. In contrast, the **child combinator** (`>`) targets only immediate children, ensuring that nested instances remain unaffected. For sibling relationships, the **adjacent sibling** combinator (`+`) targets an element that immediately follows another, while the **general sibling** combinator (`~`) targets all siblings that come after a specific element at the same level.

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

Pseudo-classes allow you to style elements based on user interaction. Common states include `:hover` for when the mouse is over an element, `:focus` for when an element receives keyboard focus, and `:active` for the brief moment an element is being clicked. To improve the experience for keyboard users, you can use `:focus-visible` to apply styles only when focus is triggered by the keyboard.
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

Structural pseudo-classes target elements based on their position within the document. You can easily style the `:first-child` or `:last-child` of a container, or use `:nth-child()` to target elements at specific positions, such as the second child (`:nth-child(2)`), alternating rows (`:nth-child(odd)` or `:nth-child(even)`), or every third element (`:nth-child(3n)`). You can also target elements from the end of a container using `:nth-last-child()`. When children of different types are present, you can use type-specific selectors like `:first-of-type`, `:last-of-type`, or `:nth-of-type()`, and target elements that are the `:only-child` or `:only-of-type` within their parent.
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

Pseudo-elements allow you to create and style virtual elements that are not part of the original HTML. The `::before` and `::after` elements allow you to insert generated content before or after an element’s actual content, provided you include the `content` property. You can also target parts of the text using `::first-line` or `::first-letter`, style the user's current selection with `::selection`, or customise the appearance of input placeholders and list markers using `::placeholder` and `::marker` respectively.

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

### Selector Strategies

To keep your styles organised and flexible, you should follow established naming conventions and strategies. BEM (Block-Element-Modifier) is a popular methodology that uses names like `.card__title` and `.card--featured` to clarify relationships between your components and their variations. Always strive to keep your specificity low by preferring single class selectors over deeply nested rules, and consider using utility classes for single-purpose duties such as centring text or hiding elements.

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

Create a table and use the `nth-child` pseudo-class to apply alternating row colours without adding any additional classes to your HTML structure.

### Exercise 2: Form Validation Styling

Design a form styling system where required fields feature a distinct left border, and the border colour of all fields dynamically updates to green or red based on their validation status. Ensure that focused fields remain clearly identifiable with a blue outline.

### Exercise 3: Navigation Styling

Develop a navigation component where all links share a consistent base style, but the current page link is clearly highlighted. Implement a dropdown menu that appears on hover and ensure that all focus states are fully visible for accessibility.

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

To master CSS selectors, remember to use basic type, class, and ID selectors appropriately while leveraging attribute selectors for more specific targeting based on metadata. Use combinators to express the relationships between descendants, children, and siblings, and apply pseudo-classes to manage interaction states and structural patterns. You can also use pseudo-elements to generate content and style specific parts of your text. With the introduction of native CSS nesting and the powerful `:has()` parent selector, you have all the tools necessary to maintain simple, low-specificity stylesheets that are easy to manage and scale.

## Next Steps

Continue to [The Box Model](./03-the-box-model.md) →
