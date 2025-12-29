# Layout with Flexbox

> **Quick Summary:** Flexbox is a one-dimensional layout system that makes alignment, distribution, and ordering of items intuitive and powerful.

## What You'll Learn

- Flex container and flex item concepts
- Main axis and cross axis alignment
- Growing, shrinking, and sizing flex items
- Common flexbox patterns

## What is Flexbox?

Flexbox (Flexible Box Layout) arranges items in a row or column, with powerful alignment and space distribution.

Before flexbox, centring was hard. With flexbox:

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

Done.

## Flex Container

Flexbox starts with a container:

```css
.container {
  display: flex;
}
```

All direct children become flex items.

### Flex Direction

Which direction items flow:

```css
.container {
  flex-direction: row;            /* Default: left to right */
  flex-direction: row-reverse;    /* Right to left */
  flex-direction: column;         /* Top to bottom */
  flex-direction: column-reverse; /* Bottom to top */
}
```

### Main Axis and Cross Axis

Flexbox has two axes:

<!-- illustration: flexbox-axes -->

**Main axis:** The direction items flow (`flex-direction`)
**Cross axis:** Perpendicular to main axis

```
flex-direction: row

Main axis →
┌─────────────────────────────────┐
│ ┌───┐ ┌───┐ ┌───┐              │ ↕ Cross axis
│ │ 1 │ │ 2 │ │ 3 │              │
│ └───┘ └───┘ └───┘              │
└─────────────────────────────────┘
```

```
flex-direction: column

        ↕ Main axis
┌───────────────────┐
│ ┌───────────────┐ │
│ │       1       │ │
│ └───────────────┘ │ → Cross axis
│ ┌───────────────┐ │
│ │       2       │ │
│ └───────────────┘ │
└───────────────────┘
```

## Alignment

### Justify Content (Main Axis)

Distributes space along the main axis:

```css
.container {
  justify-content: flex-start;    /* Default: pack at start */
  justify-content: flex-end;      /* Pack at end */
  justify-content: center;        /* Center items */
  justify-content: space-between; /* Equal space between */
  justify-content: space-around;  /* Equal space around */
  justify-content: space-evenly;  /* Equal space everywhere */
}
```

### Align Items (Cross Axis)

Aligns items on the cross axis:

```css
.container {
  align-items: stretch;     /* Default: fill container height */
  align-items: flex-start;  /* Align to start */
  align-items: flex-end;    /* Align to end */
  align-items: center;      /* Center */
  align-items: baseline;    /* Align text baselines */
}
```

### Align Content (Multiple Lines)

When items wrap, distributes lines:

```css
.container {
  flex-wrap: wrap;
  align-content: flex-start;
  align-content: center;
  align-content: space-between;
  /* Same options as justify-content */
}
```

### Gap

Space between items:

```css
.container {
  gap: 1rem;           /* Row and column gap */
  gap: 1rem 2rem;      /* Row gap | Column gap */
  row-gap: 1rem;
  column-gap: 2rem;
}
```

`gap` is cleaner than margins on items.

## Flex Items

Properties on the children (items):

### Flex Grow

How much an item grows relative to siblings:

```css
.item {
  flex-grow: 0;  /* Default: don't grow */
  flex-grow: 1;  /* Grow to fill space */
}
```

If one item has `flex-grow: 2` and another `flex-grow: 1`, the first gets twice the extra space.

### Flex Shrink

How much an item shrinks when space is tight:

```css
.item {
  flex-shrink: 1;  /* Default: shrink equally */
  flex-shrink: 0;  /* Don't shrink */
}
```

### Flex Basis

Starting size before growing/shrinking:

```css
.item {
  flex-basis: auto;   /* Default: use width/height */
  flex-basis: 200px;  /* Start at 200px */
  flex-basis: 0;      /* Ignore content size */
}
```

### Flex Shorthand

Combine grow, shrink, basis:

```css
.item {
  flex: 0 1 auto;    /* Default: don't grow, can shrink, auto size */
  flex: 1;           /* flex: 1 1 0 — grow equally */
  flex: auto;        /* flex: 1 1 auto — grow based on content */
  flex: none;        /* flex: 0 0 auto — fixed size */
}
```

Common patterns:
```css
.item { flex: 1; }      /* All items equal width */
.sidebar { flex: 0 0 250px; }  /* Fixed width */
.main { flex: 1; }      /* Takes remaining space */
```

### Align Self

Override alignment for one item:

```css
.item {
  align-self: auto;       /* Use container's align-items */
  align-self: flex-start;
  align-self: center;
  align-self: flex-end;
  align-self: stretch;
}
```

### Order

Change visual order without changing HTML:

```css
.item { order: 0; }       /* Default */
.item-first { order: -1; } /* Move to start */
.item-last { order: 1; }   /* Move to end */
```

## Flex Wrap

By default, items stay on one line and shrink:

```css
.container {
  flex-wrap: nowrap;   /* Default: single line */
  flex-wrap: wrap;     /* Wrap to new lines */
  flex-wrap: wrap-reverse; /* Wrap upward */
}
```

## Common Patterns

### Centering

```css
.center-all {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### Navigation

```css
.nav {
  display: flex;
  gap: 1rem;
}

.nav-item { }

.nav-spacer {
  margin-left: auto;  /* Push subsequent items right */
}
```

### Card Row

```css
.card-row {
  display: flex;
  gap: 1.5rem;
}

.card {
  flex: 1;  /* Equal width cards */
}
```

### Sidebar Layout

```css
.layout {
  display: flex;
}

.sidebar {
  flex: 0 0 250px;  /* Fixed width */
}

.main {
  flex: 1;  /* Fill remaining */
}
```

### Holy Grail Layout

```css
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header { }
.footer { }

.content {
  display: flex;
  flex: 1;
}

.sidebar-left { flex: 0 0 200px; }
.main { flex: 1; }
.sidebar-right { flex: 0 0 200px; }
```

### Form Row

```css
.form-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.form-row label {
  flex: 0 0 100px;
}

.form-row input {
  flex: 1;
}

.form-row button {
  flex: none;  /* Button's natural size */
}
```

### Footer Stuck to Bottom

```css
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;  /* Grows to push footer down */
}

.footer { }
```

## Try It Yourself

### Exercise 1: Navigation Bar

Create a nav bar with:
- Logo on the left
- Links in the center
- Login button on the right

Use flexbox with `margin-left: auto` to separate sections.

### Exercise 2: Card Grid

Create a row of 3 equal-width cards that:
- Have equal widths
- Have consistent gap
- Center their content vertically

### Exercise 3: Modal

Create a full-page modal overlay with:
- Content centred both horizontally and vertically
- Modal box that doesn't stretch to fill

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "css-flexbox-quiz",
  "type": "multiple-choice",
  "title": "Flexbox Layout",
  "description": "Test your understanding of flexbox properties.",
  "difficulty": "medium",
  "question": "To center an item both horizontally and vertically in a flex container, which properties do you need?",
  "options": [
    {
      "id": "a",
      "text": "justify-content: center and flex-direction: center",
      "isCorrect": false,
      "explanation": "flex-direction controls the main axis direction (row or column), not centring."
    },
    {
      "id": "b",
      "text": "justify-content: center and align-items: center",
      "isCorrect": true,
      "explanation": "Correct! justify-content centers on the main axis and align-items centers on the cross axis. Together they center both ways."
    },
    {
      "id": "c",
      "text": "align-content: center and align-items: center",
      "isCorrect": false,
      "explanation": "align-content only works with wrapped flex lines, not single items."
    },
    {
      "id": "d",
      "text": "margin: auto on the child element only",
      "isCorrect": false,
      "explanation": "While margin: auto can center flex children, it's not the only solution and the question asks about container properties."
    }
  ]
}
-->

## Key Takeaways

- `display: flex` creates a flex container
- `flex-direction` sets the main axis
- `justify-content` aligns on main axis; `align-items` on cross axis
- `gap` creates space between items
- `flex: 1` makes items grow equally
- `flex: 0 0 200px` creates fixed-width items
- `margin-left: auto` pushes items right
- Flexbox is one-dimensional—use Grid for two-dimensional layouts

## Next Steps

Continue to [Layout with Grid](./05-layout-with-grid.md) →
