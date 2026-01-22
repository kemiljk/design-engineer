# CSS Performance

> **Quick Summary:** CSS can cause performance issues through layout thrashing, expensive selectors, and render-blocking behaviour. Learn to write performant styles.

## What You'll Learn

- composite stages
- implement critical CSS strategies to optimize the rendering path
- implement critical CSS strategies to optimize the rendering path

## The Rendering Pipeline

The rendering pipeline consists of four distinct stages. First, **Style** calculations determine the final computed styles for every element. Next, **Layout** calculates the exact position and size of each box. Then, **Paint** fills in the pixels for backgrounds, borders, and text. Finally, **Composite** layers these painted parts together to display the final frame on the screen.

Changing certain properties triggers different stages:
Different properties trigger different parts of this pipeline. Layout properties like `width`, `height`, or `top` are the most expensive because they force the browser to re-calculate the entire geometry. Paint properties like `colour` or `background` are cheaper but still require re-painting pixels. Composite properties like `transform` and `opacity` are the most efficient because they skip layout and paint entirely, handled solely by the GPU.

## Composite-Only Animations

To achieve silky smooth 60fps animations, you should strictly limit your transitions to just two properties: `transform` (for moving, scaling, and rotating) and `opacity` (for fading). These are the only properties that can be handled purely by the compositor thread without triggering layout or paint operations.

```css
/* Bad: triggers layout */
.element {
  transition: left 0.3s, width 0.3s;
}

/* Good: composite only */
.element {
  transition: transform 0.3s, opacity 0.3s;
}
```

## Avoiding Layout Thrashing

Layout thrashing: repeatedly reading then writing layout properties.

```javascript
// Bad: Forces layout on every iteration
elements.forEach(el => {
  const height = el.offsetHeight; // Read (forces layout)
  el.style.height = height + 10 + 'px'; // Write
});

// Good: Batch reads, then batch writes
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px';
});
```

## will-change Hint

Tell the browser what will animate:

```css
.animated-element {
  will-change: transform;
}
```

Use sparingly—each `will-change` element uses GPU memory.

Remove after animation:
```javascript
element.addEventListener('transitionend', () => {
  element.style.willChange = 'auto';
});
```

## Selector Performance

Modern browsers are fast, but avoid:

```css
/* Avoid: Universal selector */
* { box-sizing: border-box; }

/* Better: Apply to html, inherit */
html { box-sizing: border-box; }
*, *::before, *::after { box-sizing: inherit; }

/* Avoid: Deep nesting */
.nav .list .item .link .icon { }

/* Better: Direct class */
.nav-icon { }
```

## Critical CSS

Inline styles needed for above-the-fold content:

```html
<head>
  <style>
    /* Critical styles inline */
    .header { ... }
    .hero { ... }
  </style>
  <link rel="preload" href="styles.css" as="style" onload="this.rel='stylesheet'">
</head>
```

## Contain Property

Isolate element rendering:

```css
.card {
  contain: layout style paint;
}
```

Changes inside `.card` won't affect outside layout calculations.

## Try It Yourself

### Exercise 1: Animation Audit

Check your animations—are they using transform/opacity or layout properties?

### Exercise 2: Paint Flashing

Enable "Paint flashing" in DevTools. Navigate your site and note unexpected paint areas.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "css-performance-quiz",
  "type": "multiple-choice",
  "title": "CSS Performance",
  "description": "Test your understanding of CSS performance.",
  "difficulty": "medium",
  "question": "Which CSS property change is cheapest for the browser to render?",
  "options": [
    {
      "id": "a",
      "text": "width/height (triggers layout)",
      "isCorrect": false,
      "explanation": "Layout changes are expensive. They affect other elements."
    },
    {
      "id": "b",
      "text": "background-color (triggers paint)",
      "isCorrect": false,
      "explanation": "Paint is cheaper than layout but still requires redrawing."
    },
    {
      "id": "c",
      "text": "transform/opacity (compositor only)",
      "isCorrect": true,
      "explanation": "Correct! transform and opacity only affect the compositor layer and can be GPU-accelerated. They don't trigger layout or paint, making them ideal for animations."
    },
    {
      "id": "d",
      "text": "All CSS changes cost the same",
      "isCorrect": false,
      "explanation": "Different properties trigger different rendering stages with very different costs."
    }
  ]
}
-->

## Key Takeaways

- To achieve smooth 60fps animations, you should restrict your transitions to `transform`
- `opacity` properties, which run on the compositor thread
- `opacity` properties, which run on the compositor thread
- Be mindful of layout thrashing by batching your DOM reads and writes
- keep your selectors simple to reduce calculation costs
- keep your selectors simple to reduce calculation costs
- Finally, consider inlining critical CSS for above-the-fold content
- using the `contain` property to isolate complex components from the rest of the page layout
- using the `contain` property to isolate complex components from the rest of the page layout

## Next Steps

Continue to [JavaScript Performance](./04-javascript-performance.md) →
