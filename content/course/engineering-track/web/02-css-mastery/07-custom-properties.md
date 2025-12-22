# Custom Properties

> **Quick Summary:** CSS custom properties (variables) let you define reusable values, enable theming, and make your CSS more maintainable.

## What You'll Learn

- Defining and using custom properties
- Scope and inheritance
- Dynamic values with JavaScript
- Theming with custom properties

## What Are Custom Properties?

Custom properties are user-defined values:

```css
:root {
  --primary-color: #3b82f6;
}

.button {
  background: var(--primary-color);
}
```

Change `--primary-color` once, update everywhere.

## Defining Custom Properties

### Syntax

```css
/* Define */
--property-name: value;

/* Use */
property: var(--property-name);
```

Names must start with `--`.

### Where to Define

**Global (on :root):**

```css
:root {
  --color-primary: #3b82f6;
  --spacing-md: 1rem;
}
```

`:root` is like `html` but with higher specificity.

**Scoped (on specific selectors):**

```css
.card {
  --card-padding: 1.5rem;
  padding: var(--card-padding);
}
```

## Using Custom Properties

### Basic Usage

```css
.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
}
```

### Fallback Values

If the property isn't defined:

```css
.button {
  background: var(--color-primary, blue);
  /* Use blue if --color-primary isn't defined */
}
```

### Multiple Fallbacks

```css
.button {
  background: var(--theme-primary, var(--color-primary, blue));
}
```

## Scope and Inheritance

Custom properties inherit like other CSS properties.

### Inheritance

```css
:root {
  --text-color: black;
}

/* All descendants inherit --text-color */
body {
  color: var(--text-color);
}
```

### Local Scope

Override for specific elements:

```css
:root {
  --spacing: 1rem;
}

.compact {
  --spacing: 0.5rem;
}

.section {
  padding: var(--spacing);
  /* Uses 1rem normally, 0.5rem inside .compact */
}
```

### Component-Scoped Properties

```css
.card {
  --card-bg: white;
  --card-padding: 1.5rem;
  --card-radius: 8px;

  background: var(--card-bg);
  padding: var(--card-padding);
  border-radius: var(--card-radius);
}

.card.dark {
  --card-bg: #1a1a1a;
}
```

## Calculated Values

Custom properties work with `calc()`:

```css
:root {
  --base-size: 16px;
  --scale: 1.25;
}

h1 {
  font-size: calc(
    var(--base-size) * var(--scale) * var(--scale) * var(--scale)
  );
}

h2 {
  font-size: calc(var(--base-size) * var(--scale) * var(--scale));
}
```

### Combining with other values

```css
:root {
  --spacing-unit: 8px;
}

.element {
  margin: calc(var(--spacing-unit) * 2); /* 16px */
  padding: calc(var(--spacing-unit) * 3); /* 24px */
}
```

## Theming

Custom properties make theming straightforward.

### Light/Dark Mode

```css
:root {
  --bg-color: white;
  --text-color: #1a1a1a;
  --border-color: #e5e5e5;
}

[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #f5f5f5;
  --border-color: #333;
}

body {
  background: var(--bg-color);
  color: var(--text-color);
}

.card {
  border: 1px solid var(--border-color);
}
```

### System Preference

```css
:root {
  --bg-color: white;
  --text-color: black;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: white;
  }
}
```

### Multiple Themes

```css
[data-theme="blue"] {
  --primary: #3b82f6;
  --primary-light: #93c5fd;
}

[data-theme="green"] {
  --primary: #10b981;
  --primary-light: #6ee7b7;
}

[data-theme="purple"] {
  --primary: #8b5cf6;
  --primary-light: #c4b5fd;
}
```

## JavaScript Integration

Custom properties bridge CSS and JavaScript.

### Reading Values

```javascript
const root = document.documentElement;
const primaryColor = getComputedStyle(root).getPropertyValue("--primary-color");
```

### Setting Values

```javascript
document.documentElement.style.setProperty("--primary-color", "#ff0000");
```

### Theme Switcher

```javascript
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

// Toggle dark mode
document.querySelector(".theme-toggle").addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});
```

### Dynamic Values

```javascript
// Set spacing based on user preference
const spacingSlider = document.querySelector(".spacing-slider");
spacingSlider.addEventListener("input", (e) => {
  document.documentElement.style.setProperty(
    "--spacing-unit",
    `${e.target.value}px`,
  );
});
```

## Design Token System

Organize custom properties as design tokens:

```css
:root {
  /* Primitive tokens */
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-neutral-100: #f3f4f6;
  --color-neutral-900: #111827;

  /* Semantic tokens */
  --color-primary: var(--color-blue-500);
  --color-primary-hover: var(--color-blue-600);
  --color-background: var(--color-neutral-100);
  --color-text: var(--color-neutral-900);

  /* Component tokens */
  --button-bg: var(--color-primary);
  --button-bg-hover: var(--color-primary-hover);
}
```

This hierarchy enables:

- Primitive tokens stay constant
- Semantic tokens change per theme
- Component tokens can be overridden locally

## Common Patterns

### Spacing Scale

```css
:root {
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem; /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */
}
```

### Typography Scale

```css
:root {
  --font-xs: 0.75rem;
  --font-sm: 0.875rem;
  --font-base: 1rem;
  --font-lg: 1.125rem;
  --font-xl: 1.25rem;
  --font-2xl: 1.5rem;
  --font-3xl: 1.875rem;
  --font-4xl: 2.25rem;
}
```

### Responsive Custom Properties

```css
:root {
  --container-padding: 1rem;
}

@media (min-width: 768px) {
  :root {
    --container-padding: 2rem;
  }
}

@media (min-width: 1024px) {
  :root {
    --container-padding: 3rem;
  }
}

.container {
  padding: var(--container-padding);
}
```

## Try It Yourself

### Exercise 1: Token System

Create a custom property system with:

- Color primitives (gray scale, brand color)
- Semantic color tokens
- Spacing scale
- Apply to a simple card component

### Exercise 2: Theme Switcher

Build a page with:

- Light and dark themes using custom properties
- A toggle button that switches themes
- System preference detection with `prefers-color-scheme`

### Exercise 3: Dynamic Component

Create a component that:

- Has customizable properties (colors, spacing)
- Can be styled differently by overriding custom properties
- Works with different themes

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "css-custom-props-quiz",
  "type": "multiple-choice",
  "title": "CSS Custom Properties",
  "description": "Test your understanding of CSS variables.",
  "difficulty": "medium",
  "question": "Why are CSS custom properties (--variables) better than Sass variables for theming?",
  "options": [
    {
      "id": "a",
      "text": "They compile to smaller CSS files",
      "isCorrect": false,
      "explanation": "Custom properties actually add slightly to file size compared to compiled Sass."
    },
    {
      "id": "b",
      "text": "They can be changed at runtime without recompiling, enabling dynamic themes",
      "isCorrect": true,
      "explanation": "Correct! CSS custom properties exist in the browser and can be changed with JavaScript or CSS selectors (like [data-theme='dark']) at runtime. Sass variables compile away."
    },
    {
      "id": "c",
      "text": "They work in older browsers that don't support Sass",
      "isCorrect": false,
      "explanation": "Sass compiles to regular CSS which works everywhere. Custom properties actually have newer browser requirements."
    },
    {
      "id": "d",
      "text": "They're faster for the browser to process",
      "isCorrect": false,
      "explanation": "Performance difference is negligible. The advantage is runtime flexibility."
    }
  ]
}
-->

## Key Takeaways

- Custom properties are defined with `--name` and used with `var(--name)`
- They inherit like other CSS properties
- Scope them globally on `:root` or locally on components
- Provide fallback values: `var(--color, blue)`
- They enable easy theming (light/dark mode, brand variants)
- JavaScript can read and write custom properties
- Organize as primitive → semantic → component tokens

## Next Steps

Continue to [Transitions and Animations](./08-transitions-and-animations.md) →
