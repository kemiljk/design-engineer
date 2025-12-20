# CSS Performance

> **Quick Summary:** CSS can cause performance issues through layout thrashing, expensive selectors, and render-blocking behavior. Learn to write performant styles.

## What You'll Learn

- Layout, paint, and composite
- Avoiding layout thrashing
- Efficient animations
- Critical CSS strategies

## The Rendering Pipeline

1. **Style** - Calculate computed styles
2. **Layout** - Calculate positions and sizes
3. **Paint** - Fill in pixels
4. **Composite** - Layer and display

Changing certain properties triggers different stages:
- Layout properties (width, height, top) → Everything reruns
- Paint properties (color, background) → Paint + Composite
- Composite properties (transform, opacity) → Only Composite

## Composite-Only Animations

For smooth 60fps animations, only animate:
- `transform`
- `opacity`

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
      "explanation": "Layout changes are expensive—they affect other elements."
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

- Animate only transform and opacity for 60fps
- Batch DOM reads and writes
- Use will-change sparingly
- Keep selectors simple
- Consider critical CSS for above-the-fold
- Use contain to isolate rendering

## Next Steps

Continue to [JavaScript Performance](./04-javascript-performance.md) →
