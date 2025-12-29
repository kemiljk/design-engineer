---
estimatedTime: 15
---

# How CSS Works

> **Quick Summary:** CSS is the language that styles web pages. Understanding the cascade, specificity, and inheritance helps you write predictable, maintainable styles.

## What You'll Learn

- What CSS is and how it connects to HTML
- The cascade and how style conflicts resolve
- Specificity rules and calculations
- How inheritance works

## What is CSS?

> *"CSS is like Lego for the web—simple blocks that combine into complex structures."* — Håkon Wium Lie

CSS (Cascading Style Sheets) controls how HTML elements look:

```css
h1 {
  colour: navy;
  font-size: 2rem;
}
```

This says: "All `<h1>` elements should be navy and 2rem."

### CSS Syntax

```css
selector {
  property: value;
  property: value;
}
```

- **Selector:** What elements to style
- **Property:** What aspect to change
- **Value:** What to change it to
- **Declaration:** A property-value pair
- **Declaration block:** Everything inside `{}`

### Adding CSS to HTML

**External stylesheet (recommended):**
```html
<link rel="stylesheet" href="styles.css">
```

**Internal styles:**
```html
<style>
  h1 { colour: navy; }
</style>
```

**Inline styles (avoid for styling):**
```html
<h1 style="colour: navy;">Title</h1>
```

## The Cascade

CSS stands for *Cascading* Style Sheets. The cascade determines which styles apply when multiple rules target the same element.

<!-- illustration: css-cascade -->

### Cascade Order

When styles conflict, these factors determine the winner (in order):

1. **Importance** (`!important` declarations)
2. **Origin** (author, user, browser defaults)
3. **Specificity** (how specific the selector is)
4. **Source order** (later rules win)

### Example

```css
/* Rule 1 - less specific */
p { colour: black; }

/* Rule 2 - more specific */
.intro { colour: blue; }

/* Rule 3 - same specificity as Rule 2, but later */
.highlight { colour: red; }
```

```html
<p class="intro highlight">What colour am I?</p>
```

The text is **red**. Rules 2 and 3 have equal specificity, but Rule 3 comes later.

## Specificity

Specificity is a weight that determines which CSS rule applies. Higher specificity wins.

### Specificity Levels

From lowest to highest:

1. **Type selectors** (`h1`, `p`, `div`) — Specificity: 0,0,1
2. **Class selectors** (`.card`, `.active`) — Specificity: 0,1,0
3. **ID selectors** (`#header`, `#main`) — Specificity: 1,0,0
4. **Inline styles** — Highest regular specificity
5. **!important** — Overrides everything (avoid using)

### Calculating Specificity

Count the IDs, classes, and elements:

| Selector | IDs | Classes | Elements | Specificity |
|----------|-----|---------|----------|-------------|
| `h1` | 0 | 0 | 1 | 0,0,1 |
| `.card` | 0 | 1 | 0 | 0,1,0 |
| `h1.title` | 0 | 1 | 1 | 0,1,1 |
| `#header` | 1 | 0 | 0 | 1,0,0 |
| `#header .nav a` | 1 | 1 | 1 | 1,1,1 |

### Specificity Examples

```css
/* Specificity: 0,0,1 */
p { colour: black; }

/* Specificity: 0,1,0 — wins over above */
.text { colour: blue; }

/* Specificity: 0,1,1 */
p.text { colour: green; }

/* Specificity: 1,0,0 — wins over all above */
#intro { colour: red; }
```

### !important

The nuclear option:

```css
p { colour: red !important; }
```

This overrides everything except other `!important` rules with higher specificity.

**Avoid `!important`:** It makes debugging difficult and indicates specificity problems in your architecture.

## Inheritance

Some CSS properties pass from parent to child elements.

### Inherited Properties

Text-related properties typically inherit:
- `colour`
- `font-family`
- `font-size`
- `line-height`
- `text-align`

```css
body {
  font-family: Arial, sans-serif;
  colour: #333;
}
```

All text in `<body>` inherits these unless overridden.

### Non-Inherited Properties

Layout and box properties typically don't inherit:
- `margin`
- `padding`
- `border`
- `background`
- `width`
- `height`

```css
.container {
  border: 1px solid black;
}
```

Children of `.container` don't automatically have borders.

### Forcing Inheritance

```css
.child {
  border: inherit; /* Take parent's border */
}
```

### The inherit, initial, and unset Values

```css
.element {
  colour: inherit;  /* Use parent's value */
  colour: initial;  /* Use browser default */
  colour: unset;    /* inherit if inherited property, initial otherwise */
}
```

## Browser Defaults

Browsers apply default styles before your CSS. That's why unstyled HTML has:
- Margins on `<p>` and headings
- Bullet points on `<ul>`
- Underlines on links

### CSS Reset / Normalize

Many developers use resets to create a consistent baseline:

**Simple reset:**
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

**Modern approach:**
```css
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  line-height: 1.5;
}

img {
  max-width: 100%;
  display: block;
}
```

## Writing Maintainable CSS

Understanding the cascade helps you write better CSS:

### Keep Specificity Low

```css
/* Avoid */
#header #nav ul li a.active { ... }

/* Prefer */
.nav-link.is-active { ... }
```

Low specificity is easier to override when needed.

### Use Classes

Classes are the sweet spot:
- More specific than elements
- Less specific than IDs
- Reusable across elements

### Avoid !important

If you need `!important`, consider:
- Is specificity too high elsewhere?
- Can you restructure selectors?
- Is there a cascade conflict to resolve?

### Order Matters

Organize CSS predictably:
1. Base/reset styles
2. Layout
3. Components
4. Utilities

## Try It Yourself

### Exercise 1: Specificity Practice

Without running the code, predict the colour:

```css
p { colour: black; }
.text { colour: blue; }
p.text { colour: green; }
#intro { colour: red; }
p#intro.text { colour: purple; }
```

```html
<p id="intro" class="text">What colour am I?</p>
```

### Exercise 2: Cascade Debugging

Create two rules that conflict. Use browser dev tools to see which wins and why.

### Exercise 3: Inheritance Exploration

Create a nested structure:
```html
<div class="parent">
  <p class="child">Text</p>
</div>
```

Test which properties inherit (colour, border, margin) and which don't.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "css-specificity-quiz",
  "type": "multiple-choice",
  "title": "CSS Specificity",
  "description": "Test your understanding of CSS cascade and specificity.",
  "difficulty": "medium",
  "question": "If an element has both a class (.button) and an ID (#submit), and both have conflicting background-colour rules, which wins?",
  "options": [
    {
      "id": "a",
      "text": "The class selector, because classes are for styling",
      "isCorrect": false,
      "explanation": "Classes don't automatically win—specificity determines the winner."
    },
    {
      "id": "b",
      "text": "Whichever rule comes later in the stylesheet",
      "isCorrect": false,
      "explanation": "Source order only matters when specificity is equal. ID has higher specificity than class."
    },
    {
      "id": "c",
      "text": "The ID selector, because IDs have higher specificity than classes",
      "isCorrect": true,
      "explanation": "Correct! ID selectors have higher specificity (1,0,0) than class selectors (0,1,0). Specificity: inline > ID > class > element."
    },
    {
      "id": "d",
      "text": "It depends on which element is more specific in the DOM",
      "isCorrect": false,
      "explanation": "DOM structure doesn't affect specificity—only the selector types matter."
    }
  ]
}
-->

## Key Takeaways

- CSS controls appearance; HTML controls structure
- The cascade resolves conflicts using importance, specificity, and source order
- Specificity: IDs > Classes > Elements
- Avoid `!important`. It indicates architecture problems.
- Text properties inherit; box properties don't
- Keep specificity low for maintainable CSS
- Use classes as your primary selector type

## Next Steps

Continue to [Selectors Deep Dive](./02-selectors-deep-dive.md) →
