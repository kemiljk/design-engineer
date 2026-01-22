# Custom Properties

> **Quick Summary:** CSS custom properties (variables) let you define reusable values, enable theming, and make your CSS more maintainable.

## What You'll Learn

- Essentials of defining and using CSS custom properties
- Leveraging inheritance to create clean stylesheets
- Using JavaScript to manage dynamic values at runtime
- Implementing robust theming systems for user preferences or brands

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

To ensure your design remains robust, you can provide fallback values within the `var()` function. These values will be used if the specified custom property is either undefined or invalid. You can even nest multiple fallbacks to create a hierarchy of default settings, ensuring that your elements always have a sensible style to fall back on.

## Scope and Inheritance

Custom properties inherit their values from their parent elements, much like standard CSS properties. This means that a property defined on `:root` is available to every element in the document, while a property defined on a specific class will only be accessible to that element and its descendants. You can take advantage of this by defining global tokens for your design system while still retaining the ability to override those values with local scope for specific components or sections of your page.

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

A professional way to organise your custom properties is by using a design token hierarchy. This system Typically consists of primitive tokens that stay constant, semantic tokens that describe their purpose and can change based on the current theme, and component tokens used for granular overrides. This structure allows you to maintain a consistent design language while making major updates—like changing your primary brand colour or switching between light and dark modes—remarkably simple.

## Common Patterns

### Spacing Scale

By defining a dedicated spacing scale as custom properties, you can ensure that margins and padding remain consistent across your entire application. This makes it easy to adjust the overall density of your interface by simply modifying the scale values in one location.

### Typography Scale

Establishing a typography scale with custom properties allows you to manage font sizes systematically. This approach ensures that your headings and body text maintain a clear hierarchy, which is essential for both readability and professional aesthetic.

### Responsive Custom Properties

You can also use custom properties to manage responsiveness more effectively by redefining them within media queries. Instead of rewriting complex padding or layout rules multiple times, you can simply update the value of your custom property, and every element that uses that variable will automatically adapt to the new screen size.

## Try It Yourself

### Exercise 1: Token System

Create a comprehensive custom property system that includes colour architectural primitives for a greyscale and brand palette, along with associated semantic colour tokens and a standard spacing scale. Apply these tokens to build a simple card component that remains consistent with your design system.

### Exercise 2: Theme Switcher

Build a page that natively supports light and dark themes using CSS custom properties. You should include a toggle button that switches between these themes and use `prefers-color-scheme` to automatically detect and apply the user's system-level preference.

### Exercise 3: Dynamic Component

Develop a component that features several customisable properties, such as background colours and internal spacing. Ensure that the component can be easily restyled by overriding those custom properties locally, and verify that it works correctly across your different site themes.

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

- To recap, CSS custom properties are defined using the `--name` prefix
- accessed through the `var()` function accessed through the `var()` function
- They support full inheritance across the document,
- By providing fallback values, you can build more resilient styles

## Next Steps

Continue to [CSS Transitions](./08-css-transitions.md) →
