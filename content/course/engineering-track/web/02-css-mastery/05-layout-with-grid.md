# Layout with Grid

> **Quick Summary:** CSS Grid is a two-dimensional layout system. It handles rows AND columns simultaneously, making complex layouts straightforward.

## What You'll Learn

- Grid container and grid item concepts
- Defining columns and rows
- Placing items on the grid
- Practical grid patterns

## What is CSS Grid?

Grid lets you define a two-dimensional layout structure and place items within it:

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}
```

This creates a three-column grid with equal widths.

### Grid vs Flexbox

**Flexbox:** One-dimensional (row OR column)
**Grid:** Two-dimensional (rows AND columns)

Use flexbox for components and content flow. Use grid for page layout and structured grids.

## Grid Container

```css
.container {
  display: grid;
}
```

Direct children become grid items.

### Defining Columns

```css
.container {
  grid-template-columns: 200px 200px 200px;     /* Three 200px columns */
  grid-template-columns: 1fr 1fr 1fr;           /* Three equal columns */
  grid-template-columns: 200px 1fr 200px;       /* Fixed-fluid-fixed */
  grid-template-columns: repeat(3, 1fr);        /* Shorthand for 3 equal */
  grid-template-columns: repeat(4, 100px);      /* Four 100px columns */
}
```

### The fr Unit

`fr` (fractional unit) divides available space:

```css
.container {
  grid-template-columns: 1fr 2fr 1fr;
  /* First: 25%, Second: 50%, Third: 25% */
}
```

### Defining Rows

```css
.container {
  grid-template-rows: 100px auto 100px;  /* Header, content, footer */
}
```

Rows are often auto-sized based on content.

### Gap

Space between cells:

```css
.container {
  gap: 1rem;              /* Row and column */
  gap: 1rem 2rem;         /* Row | Column */
  row-gap: 1rem;
  column-gap: 2rem;
}
```

## Grid Item Placement

### Automatic Placement

By default, items fill cells left-to-right, top-to-bottom.

### Line-Based Placement

Reference grid lines to place items:

```css
.item {
  grid-column-start: 1;
  grid-column-end: 3;    /* Span columns 1-2 */
  
  grid-row-start: 1;
  grid-row-end: 2;       /* Row 1 */
}
```

Shorthand:
```css
.item {
  grid-column: 1 / 3;    /* Start / End */
  grid-row: 1 / 2;
}
```

Span syntax:
```css
.item {
  grid-column: span 2;   /* Span 2 columns from current position */
  grid-column: 1 / span 2; /* Start at 1, span 2 */
}
```

### Named Lines

```css
.container {
  grid-template-columns: [start] 1fr [content-start] 2fr [content-end] 1fr [end];
}

.item {
  grid-column: content-start / content-end;
}
```

### Grid Areas

Name regions of the grid:

<!-- illustration: grid-template-areas -->

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

`.` represents empty cells:
```css
grid-template-areas:
  "header header ."
  "main main sidebar"
  "footer footer footer";
```

## Responsive Grids

### Auto-fill and Auto-fit

Create responsive grids without media queries:

```css
.container {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
```

This creates as many 250px+ columns as fit.

**auto-fill vs auto-fit:**
- `auto-fill` keeps empty columns
- `auto-fit` collapses empty columns

### minmax()

Set minimum and maximum sizes:

```css
.container {
  grid-template-columns: minmax(200px, 300px) 1fr;
}
```

### Media Query Approach

```css
.container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 600px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Alignment

### Justify/Align Items

Position items within their cells:

```css
.container {
  justify-items: stretch;  /* Default: fill cell width */
  justify-items: start;
  justify-items: center;
  justify-items: end;
  
  align-items: stretch;    /* Default: fill cell height */
  align-items: start;
  align-items: center;
  align-items: end;
}
```

### Justify/Align Content

Position the entire grid within the container:

```css
.container {
  justify-content: start;
  justify-content: center;
  justify-content: end;
  justify-content: space-between;
  
  align-content: start;
  align-content: center;
  /* etc. */
}
```

### Individual Item Alignment

```css
.item {
  justify-self: center;
  align-self: end;
}
```

## Common Patterns

### Card Grid

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

### Page Layout

```css
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header {
  grid-column: 1 / -1;  /* Span all columns */
}

.sidebar { }

.main { }

.footer {
  grid-column: 1 / -1;
}
```

### Holy Grail (Grid Version)

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
```

### Centering

```css
.center {
  display: grid;
  place-items: center;  /* Shorthand for align-items + justify-items */
}
```

### Overlapping Items

Grid items can occupy the same cells:

```css
.container {
  display: grid;
}

.background {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
}

.content {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  z-index: 1;  /* Layer above background */
}
```

### Masonry-like Layout

```css
.masonry {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 10px;
  gap: 10px;
}

.item-small { grid-row: span 10; }
.item-medium { grid-row: span 20; }
.item-large { grid-row: span 30; }
```

Note: True masonry is coming to CSS but not yet widely supported.

## Subgrid

Nested grids can inherit parent's grid:

```css
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.child {
  display: grid;
  grid-template-columns: subgrid;  /* Use parent's columns */
  grid-column: span 3;
}
```

Subgrid aligns nested content to outer grid.

## Try It Yourself

### Exercise 1: Responsive Card Grid

Create a grid that:
- Shows 1 column on mobile
- 2 columns on tablet
- 3-4 columns on desktop
- Uses `auto-fill` and `minmax()`

### Exercise 2: Dashboard Layout

Create a dashboard with:
- Full-width header
- Sidebar (fixed 250px)
- Main content area
- Full-width footer

Use `grid-template-areas`.

### Exercise 3: Image Gallery

Create a gallery with:
- Various image sizes (span different rows)
- Responsive columns
- Hover overlay using grid overlap

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "css-grid-quiz",
  "type": "multiple-choice",
  "title": "CSS Grid",
  "description": "Test your understanding of CSS Grid layout.",
  "difficulty": "medium",
  "question": "What does 'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))' create?",
  "options": [
    {
      "id": "a",
      "text": "Exactly 250px columns that never change size",
      "isCorrect": false,
      "explanation": "The minmax and auto-fit combination makes columns responsive."
    },
    {
      "id": "b",
      "text": "A responsive grid where columns are at least 250px and grow to fill space",
      "isCorrect": true,
      "explanation": "Correct! auto-fit creates as many columns as fit, each at least 250px and stretching up to 1fr of available space. It's a responsive grid pattern."
    },
    {
      "id": "c",
      "text": "Columns that are always 1fr regardless of content",
      "isCorrect": false,
      "explanation": "The minmax sets a minimum of 250px—columns won't go smaller."
    },
    {
      "id": "d",
      "text": "A single column that's 250px on mobile and 1fr on desktop",
      "isCorrect": false,
      "explanation": "This creates multiple columns that respond to container width, not a media query-based change."
    }
  ]
}
-->

## Key Takeaways

- Grid handles two-dimensional layouts (rows AND columns)
- `fr` unit distributes available space
- `repeat()` and `minmax()` create flexible responsive grids
- `auto-fill`/`auto-fit` create responsive grids without media queries
- `grid-template-areas` enables named layout regions
- Items can be placed with line numbers, spans, or area names
- `place-items: center` is the simplest centring

## Next Steps

Continue to [Responsive Design](./06-responsive-design.md) →
