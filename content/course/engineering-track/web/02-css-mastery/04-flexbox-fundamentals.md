---
estimatedTime: 12
---

# Flexbox Fundamentals

> **Quick Summary:** Flexbox is a one-dimensional layout system that makes alignment, distribution, and ordering of items intuitive and powerful.

## What You'll Learn

- Flex container and flex item concepts
- Main axis and cross axis
- Alignment and distribution
- Flex item sizing properties

## What is Flexbox?

Flexbox (Flexible Box Layout) arranges items in a row or column, with powerful alignment and space distribution.

Before flexbox, centring was notoriously difficult. With flexbox:

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

All direct children become **flex items**.

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

## Main Axis and Cross Axis

Understanding flexbox requires understanding its two axes:

**Main axis:** The direction items flow (set by `flex-direction`)
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

This matters because alignment properties work relative to these axes.

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

When items wrap to multiple lines, `align-content` distributes the lines:

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

Modern CSS provides `gap` for spacing between items:

```css
.container {
  gap: 1rem;           /* Row and column gap */
  gap: 1rem 2rem;      /* Row gap | Column gap */
  row-gap: 1rem;
  column-gap: 2rem;
}
```

`gap` is cleaner than margins on items—no need to worry about margin collapse or removing margin from the last item.

## Flex Items

Properties applied to children (items):

### Flex Grow

How much an item grows relative to siblings when extra space is available:

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
  flex-shrink: 0;  /* Don't shrink (fixed size) */
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

Combine grow, shrink, and basis:

```css
.item {
  flex: 0 1 auto;    /* Default: don't grow, can shrink, auto size */
  flex: 1;           /* flex: 1 1 0 — grow equally */
  flex: auto;        /* flex: 1 1 auto — grow based on content */
  flex: none;        /* flex: 0 0 auto — fixed size */
}
```

**Most common patterns:**
```css
.item { flex: 1; }          /* All items equal width */
.sidebar { flex: 0 0 250px; } /* Fixed 250px width */
.main { flex: 1; }          /* Takes remaining space */
```

### Align Self

Override alignment for one specific item:

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
.item { order: 0; }        /* Default */
.item-first { order: -1; } /* Move to start */
.item-last { order: 1; }   /* Move to end */
```

## Flex Wrap

By default, items stay on one line and shrink:

```css
.container {
  flex-wrap: nowrap;       /* Default: single line */
  flex-wrap: wrap;         /* Wrap to new lines */
  flex-wrap: wrap-reverse; /* Wrap upward */
}
```

## Try It Yourself

### Exercise 1: Centering

Create a full-page container that centres a box both horizontally and vertically.

### Exercise 2: Distribution

Create a row of 4 items where:
- Items are evenly distributed across the container
- Items have consistent gaps between them
- The container has padding

### Exercise 3: Mixed Sizing

Create a row with:
- A fixed-width sidebar (200px)
- A flexible main area that takes remaining space
- Another fixed-width sidebar (150px)

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "css-flexbox-fundamentals-quiz",
  "type": "multiple-choice",
  "title": "Flexbox Fundamentals",
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

- `display: flex` creates a flex container; children become flex items
- `flex-direction` sets the main axis direction
- `justify-content` aligns on main axis; `align-items` on cross axis
- `gap` creates consistent spacing between items
- `flex-grow`, `flex-shrink`, and `flex-basis` control item sizing
- `flex: 1` makes items grow equally; `flex: 0 0 200px` makes fixed-width items

## Next Steps

Continue to [Flexbox Patterns](./04b-flexbox-patterns.md) →

