# Responsive Design

> **Quick Summary:** Responsive design ensures your interface works across all screen sizes, from phones to large monitors.

## What You'll Learn

- Mobile-first approach to design
- Effectively using media queries and breakpoints
- Principles of fluid layouts and typography
- Modern responsive techniques for robust, adaptable interfaces

## The Responsive Mindset

The web is inherently flexible. HTML without CSS flows to fit any width. Responsive design embraces this flexibility rather than fighting it.

Your goal: create interfaces that work everywhere, not fixed layouts forced onto different screens.

## Mobile-First Design

Start with mobile styles, then enhance for larger screens:

```css
/* Base styles (mobile) */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### Why Mobile-First?

Adopting a mobile-first strategy forces you to focus on the most critical content due to the limited space available on smaller screens. This approach encourages progressive enhancement, where you add complexity for more capable devices rather than trying to strip it away for limited ones. Furthermore, it significantly improves performance for mobile users who won't need to download unnecessary desktop styles, and it aligns with the reality that mobile traffic now frequently exceeds desktop usage.

## Media Queries

Media queries apply styles conditionally:

```css
@media (condition) {
  /* Styles applied when condition is true */
}
```

### Width-Based Queries

```css
/* Minimum width (mobile-first) */
@media (min-width: 768px) { }

/* Maximum width (desktop-first) */
@media (max-width: 767px) { }

/* Range */
@media (min-width: 768px) and (max-width: 1023px) { }
```

### Modern Range Syntax

```css
@media (width >= 768px) { }
@media (768px <= width < 1024px) { }
```

### Common Breakpoints

While there is no universal standard for breakpoints, common industry targets include 480px for large phones, 768px for tablets, and 1024px for laptops, with larger screens typically targeting 1280px or 1536px. However, you should always choose your breakpoints based on the specific needs of your content rather than trying to target individual devices.

### Other Media Features

```css
/* Orientation */
@media (orientation: landscape) { }

/* Hover capability */
@media (hover: hover) { }

/* Colour scheme preference */
@media (prefers-color-scheme: dark) { }

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) { }

/* High contrast mode */
@media (prefers-contrast: more) { }
```

## Container Queries

Style based on container size, not viewport:

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
```

Container queries enable truly reusable components.

## Fluid Sizing

### Fluid Typography

Instead of relying on fixed font sizes that jump at specific breakpoints, fluid typography allow your text to scale smoothly between a minimum and maximum size. Using the `clamp()` function, you can define a preferred font size in viewport units, ensuring that your headings and body text remain legible and aesthetically pleasing on any device.

### Fluid Spacing

The same `clamp()` logic can be applied to spacing, allowing your margins and padding to contract on smaller screens and expand on larger ones. This creates a more balanced and professional feel for your layout as the viewport width changes.

### Viewport Units

Viewport units allow you to size elements relative to the dimensions of the browser window. While `vw` and `vh` are standard for width and height, you should consider using dynamic viewport units like `dvh` for full-height elements to correctly account for mobile browser interfaces that can change as the user scrolls.

### Container Units

When using container queries, you can also utilise container-relative units like `cqi` to size elements based on their immediate parent's dimensions. This ensures that a component’s internal typography and spacing remain proportional to the space it actually occupies on the page.

## Responsive Images

### Fluid Images

```css
img {
  max-width: 100%;
  height: auto;
}
```

This prevents images from overflowing containers.

### Srcset for Resolution

```html
<img 
  src="image.jpg"
  srcset="image-400.jpg 400w,
          image-800.jpg 800w,
          image-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw,
         (max-width: 1000px) 50vw,
         33vw"
  alt="Description">
```

### Picture for Art Direction

```html
<picture>
  <source media="(max-width: 600px)" srcset="portrait.jpg">
  <source media="(min-width: 601px)" srcset="landscape.jpg">
  <img src="landscape.jpg" alt="Description">
</picture>
```

### Responsive Patterns

A common responsive pattern is to transition from a single-column stack on mobile to a horizontal row on desktop using flexbox. You can also leverage CSS Grid's `auto-fit` and `minmax()` functions to create columns that automatically adjust to the available width without requiring any media queries. For components like navigation, you may need to hide certain elements on smaller screens and switch to a different interface, such as a hamburger menu, to maintain a clean layout.

### Responsive Table

Tables on mobile:

```css
/* Option 1: Horizontal scroll */
.table-container {
  overflow-x: auto;
}

/* Option 2: Stack rows */
@media (max-width: 600px) {
  table, thead, tbody, tr, th, td {
    display: block;
  }
  
  tr {
    margin-bottom: 1rem;
    border: 1px solid #ddd;
  }
  
  td::before {
    content: attr(data-label);
    font-weight: bold;
  }
}
```

## Testing Responsive Design

### Browser Dev Tools

- Toggle device toolbar (responsive mode)
- Test various widths
- Simulate devices

### Real Device Testing

Dev tools simulate, but real devices reveal:
- Touch behaviour
- Real performance
- Actual viewport behaviour

### Common Issues

When reviewing your responsive designs, be on the lookout for common pitfalls such as text that is too small to read or touch targets that fall below the minimum recommended size of 44px. You should also ensure that your layout does not trigger horizontal scrolling and that fixed-width elements are not inadvertently breaking the responsive flow on smaller viewports.

## Modern CSS for Responsive

### Logical Properties

Direction-agnostic properties:

```css
/* Instead of: */
margin-left: 1rem;

/* Use: */
margin-inline-start: 1rem;
```

Works correctly in right-to-left languages.

### min(), max(), clamp()

```css
.container {
  width: min(100%, 1200px);  /* Whichever is smaller */
  padding: max(1rem, 2vw);   /* Whichever is larger */
  font-size: clamp(1rem, 2vw, 1.5rem);  /* Clamped between min and max */
}
```

### aspect-ratio

Maintain proportions:

```css
.video {
  aspect-ratio: 16 / 9;
  width: 100%;
}
```

## Try It Yourself

### Exercise 1: Mobile-First Layout

Build a page layout that starts as a single column on mobile, transitions to a two-column sidebar structure on tablets, and expands to a three-column desktop layout. You should use mobile-first media queries to progressively enhance the experience as the screen width increases.

### Exercise 2: Fluid Typography

Create a heading that uses the `clamp()` function to scale smoothly with the viewport width. Set a minimum size of 1.5rem and ensure the text never exceeds 3rem, providing a consistent typographic experience across all resolutions.

### Exercise 3: Responsive Navigation

Develop a navigation component that displays a hamburger menu on mobile devices and expands into a horizontal list of links on desktop. Pay close attention to the touch targets on the mobile version to ensure they are easy to interact with.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "css-responsive-quiz",
  "type": "multiple-choice",
  "title": "Responsive Design",
  "description": "Test your understanding of responsive design principles.",
  "difficulty": "medium",
  "question": "What is the 'mobile-first' approach to responsive design?",
  "options": [
    {
      "id": "a",
      "text": "Designing the mobile version before the desktop version in Figma",
      "isCorrect": false,
      "explanation": "Mobile-first refers to CSS structure, not just design process."
    },
    {
      "id": "b",
      "text": "Writing base styles for mobile, then using min-width media queries to enhance for larger screens",
      "isCorrect": true,
      "explanation": "Correct! Mobile-first means your default CSS is for mobile, then you use min-width breakpoints to add complexity for larger screens. This ensures mobile works without media queries."
    },
    {
      "id": "c",
      "text": "Only supporting mobile devices and ignoring desktop",
      "isCorrect": false,
      "explanation": "Mobile-first still supports desktop—it's about the CSS structure, starting simple and adding."
    },
    {
      "id": "d",
      "text": "Using max-width media queries to remove features on mobile",
      "isCorrect": false,
      "explanation": "That's desktop-first approach. Mobile-first uses min-width to ADD features as screens get larger."
    }
  ]
}
-->

## Key Takeaways

To recap, a mobile-first approach involves writing your base styles for smaller screens and using `min-width` media queries to add complexity for larger devices. You should choose your breakpoints based on the content's needs rather than specific devices and leverage modern tools like container queries and the `clamp()` function for fluid, robust designs. Always remember to test your interfaces on real devices to understand the true user experience, including touch interactions and performance constraints.

## Next Steps

Continue to [Custom Properties](./07-custom-properties.md) →
