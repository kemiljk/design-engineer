---
estimatedTime: 15
---

# How CSS Works

> **Quick Summary:** CSS is the language that styles web pages. Understanding the cascade, specificity, and inheritance helps you write predictable, maintainable styles.

## What You'll Learn

- The fundamental nature of CSS and how it connects to HTML
- The cascade and how it resolves style conflicts
- Rules and calculations for selector specificity
- How inheritance allows styles to pass down through document structure

## What is CSS?

> *"CSS is like Lego for the web—simple blocks that combine into complex structures."* — Håkon Wium Lie

CSS (Cascading Style Sheets) controls how HTML elements look:

```css
h1 {
  color: navy;
  font-size: 2rem;
}
```

This says: "All `<h1>` elements should be navy and 2rem."

### CSS Syntax

To write effective CSS, you must understand the basic syntax of a rule. A **selector** identifies which elements you wish to style, while a **property** defines the specific aspect you want to change, and a **value** determines the new appearance. Together, a property and its value form a **declaration**, and multiple declarations are grouped within curly braces to create a **declaration block**.

### Adding CSS to HTML

**External stylesheet (recommended):**
```html
<link rel="stylesheet" href="styles.css">
```

**Internal styles:**
```html
<style>
  h1 { color: navy; }
</style>
```

**Inline styles (avoid for styling):**
```html
<h1 style="color: navy;">Title</h1>
```

## The Cascade

CSS stands for *Cascading* Style Sheets. The cascade determines which styles apply when multiple rules target the same element.

<!-- illustration: css-cascade -->

### Cascade Order

When multiple styles conflict, the browser uses a specific hierarchy to determine the winner. It first considers **importance**, looking for `!important` declarations, followed by the **origin** of the style, such as whether it comes from the author, the user, or browser defaults. If these are equal, it calculates **specificity** to see which selector is more precise, and finally, it looks at the **source order**, where rules defined later in the stylesheet take precedence.

### Example

```css
/* Rule 1 - less specific */
p { color: black; }

/* Rule 2 - more specific */
.intro { color: blue; }

/* Rule 3 - same specificity as Rule 2, but later */
.highlight { color: red; }
```

```html
<p class="intro highlight">What colour am I?</p>
```

The text is **red**. Rules 2 and 3 have equal specificity, but Rule 3 comes later.

## Specificity

Specificity is a weight that determines which CSS rule applies. Higher specificity wins.

### Specificity Levels

Specificity levels range from the lowest to the highest weight. **Type selectors**, such as `h1` or `div`, have the lowest specificity, followed by **class selectors** like `.card` or `.active`. **ID selectors**, such as `#header`, carry even more weight, while **inline styles** applied directly to an element have the highest regular specificity. The `!important` declaration acts as a final override for everything else, though it should be avoided in most architectural designs.

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
p { color: black; }

/* Specificity: 0,1,0 — wins over above */
.text { color: blue; }

/* Specificity: 0,1,1 */
p.text { color: green; }

/* Specificity: 1,0,0 — wins over all above */
#intro { color: red; }
```

### !important

The nuclear option:

```css
p { color: red !important; }
```

This overrides everything except other `!important` rules with higher specificity.

**Avoid `!important`:** It makes debugging difficult and indicates specificity problems in your architecture.

## Inheritance

Some CSS properties pass from parent to child elements.

### Inherited Properties

Most text-related properties are designed to inherit from their parents, which helps maintain consistency across your typography. This includes properties such as `colour`, `font-family`, `font-size`, `line-height`, and `text-align`.

```css
body {
  font-family: Arial, sans-serif;
  color: #333;
}
```

All text in `<body>` inherits these unless overridden.

### Non-Inherited Properties

Conversely, properties related to layout and the box model typically do not inherit. You must define properties such as `margin`, `padding`, `border`, `background`, `width`, and `height` specifically for the elements you wish to style.

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
  color: inherit;  /* Use parent's value */
  color: initial;  /* Use browser default */
  color: unset;    /* inherit if inherited property, initial otherwise */
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

### Writing Maintainable CSS

To keep your CSS maintainable, you should strive to keep your specificity as low as possible. Avoiding deeply nested selectors in favour of shallow class-based rules like `.nav-link.is-active` makes your styles much easier to override when necessary. Classes are generally the "sweet spot" for styling because they are more specific than elements but less rigid than IDs, and they remain highly reusable across different parts of your interface. Always aim to avoid `!important` by considering if your specificity is too high elsewhere or if your selectors need restructuring. Finally, organise your CSS in a predictable order, starting with base and reset styles, followed by layout rules, components, and finally utility classes.

## Try It Yourself

### Exercise 1: Specificity Practice

Without running the code, try to predict the final colour of the text in the example below. Calculate the specificity for each rule to see which one the browser will ultimately select.

### Exercise 2: Cascade Debugging

Create two conflicting rules in your stylesheet and use your browser's developer tools to inspect which one wins. Observe how the dev tools strike out the losing declarations, providing a clear visual of the cascade in action.

### Exercise 3: Inheritance Exploration

Set up a nested HTML structure with a parent div and a child paragraph. Experiment with different properties like `colour`, `border`, and `margin` on the parent to see which ones automatically apply to the child and which require manual definition.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "css-specificity-quiz",
  "type": "multiple-choice",
  "title": "CSS Specificity",
  "description": "Test your understanding of CSS cascade and specificity.",
  "difficulty": "medium",
  "question": "If an element has both a class (.button) and an ID (#submit), and both have conflicting background-color rules, which wins?",
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

To recap, CSS is the language of appearance while HTML defines structure. The cascade serves as the mechanism for resolving conflicts by weighing importance, specificity, and source order. You should generally avoid `!important` as it often masks underlying architectural issues, and instead focus on keeping specificity low by using classes as your primary selector type. Remember that while text-related properties like typography usually inherit from their parents, box model properties do not, requiring explicit definition for each component.

## Next Steps

Continue to [Selectors Deep Dive](./02-selectors-deep-dive.md) →
