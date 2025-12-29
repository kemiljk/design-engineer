# Responsive Design

> **Quick Summary:** Responsive design ensures your interface works across all screen sizes, from phones to large monitors.

## What You'll Learn

- The mobile-first approach
- Media queries and breakpoints
- Fluid layouts and typography
- Modern responsive techniques

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

1. **Mobile constraints force focus:** Limited space means prioritizing what matters.
2. **Progressive enhancement:** Add features for capable devices, not remove for limited ones.
3. **Performance:** Mobile users don't download desktop styles.
4. **More users:** Mobile traffic often exceeds desktop.

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

There's no universal standard, but common breakpoints:

| Breakpoint | Target |
|------------|--------|
| 480px | Large phones |
| 768px | Tablets |
| 1024px | Laptops |
| 1280px | Desktops |
| 1536px | Large desktops |

Choose breakpoints based on your content, not devices.

### Other Media Features

```css
/* Orientation */
@media (orientation: landscape) { }

/* Hover capability */
@media (hover: hover) { }

/* Color scheme preference */
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

Instead of fixed sizes at breakpoints, scale smoothly:

```css
/* Using clamp() */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  /* Minimum | Preferred | Maximum */
}
```

`clamp()` ensures text never gets too small or too large.

### Fluid Spacing

```css
.section {
  padding: clamp(2rem, 5vw, 6rem);
}
```

### Viewport Units

```css
/* Viewport width */
.hero { font-size: 5vw; }

/* Viewport height */
.full-height { min-height: 100vh; }

/* Dynamic viewport (accounts for mobile browser chrome) */
.full-height { min-height: 100dvh; }
```

### Container Units

```css
.card-container {
  container-type: inline-size;
}

.card-title {
  font-size: 5cqi; /* Container query inline size */
}
```

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

## Responsive Patterns

### Stack to Horizontal

Mobile: stacked. Desktop: side-by-side.

```css
.layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .layout {
    flex-direction: row;
  }
}
```

### Grid Auto-Flow

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

Automatically adjusts columns based on space.

### Hide/Show Elements

```css
.mobile-menu {
  display: block;
}

.desktop-nav {
  display: none;
}

@media (min-width: 768px) {
  .mobile-menu {
    display: none;
  }
  
  .desktop-nav {
    display: flex;
  }
}
```

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

- Text too small
- Touch targets too small (minimum 44px)
- Horizontal scroll
- Fixed widths breaking layout
- Content cut off

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

Build a page layout that:
- Single column on mobile
- Two columns (sidebar + main) on tablet
- Three columns (nav, main, aside) on desktop

Use mobile-first media queries.

### Exercise 2: Fluid Typography

Create a heading that:
- Is 1.5rem at minimum
- Scales with viewport width
- Never exceeds 3rem

Use `clamp()`.

### Exercise 3: Responsive Navigation

Build navigation that:
- Shows a hamburger menu on mobile
- Expands to horizontal links on desktop
- Has appropriate touch targets

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

- Mobile-first: Start with mobile styles, enhance for larger screens
- Use `min-width` media queries for mobile-first
- Choose breakpoints based on content, not devices
- Container queries enable component-level responsiveness
- `clamp()` creates fluid sizing without breakpoints
- Always test on real devices
- Modern CSS (logical properties, aspect-ratio) simplifies responsive work

## Next Steps

Continue to [Custom Properties](./07-custom-properties.md) →
