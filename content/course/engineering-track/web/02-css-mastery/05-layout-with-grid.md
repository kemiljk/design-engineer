# Layout with Grid

> **Quick Summary:** CSS Grid is a two-dimensional layout system. It handles rows AND columns simultaneously, making complex layouts straightforward.

## What You'll Learn

- Fundamental concepts of grid containers and grid items
- How to define columns and rows effectively
- Placing items on the grid using various techniques
- Practical grid patterns common in modern web development

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

To start using CSS Grid, you must first define a grid container by setting `display: grid` on a parent element. Once this is established, all direct children of that container automatically become grid items.

### Defining Columns

You can define the structure of your grid's columns using the `grid-template-columns` property. This allows you to specify fixed pixel values for each column, or use the `fr` unit for balanced distribution. For more complex layouts, you might combine fixed and fluid columns, or use the `repeat()` shorthand to quickly generate multiple columns of equal width.

### The fr Unit

The `fr` (fractional unit) is a powerful tool that divides the available space within your grid container. For example, if you define three columns as `1fr 2fr 1fr`, the first and third columns will each take up 25% of the width, while the middle column expands to occupy 50%.

### Defining Rows

Similarly, you can define your grid's rows using the `grid-template-rows` property. In many cases, you will want rows to be auto-sized based on their content, but you can also define specific heights for standard layout sections like headers and footers.

### Gap

The `gap` property provides a simple way to manage the space between your grid cells. You can set a single value to apply a consistent gap between all rows and columns, or define separate `row-gap` and `column-gap` values for more specialised designs.

## Grid Item Placement

### Automatic Placement

By default, items fill cells left-to-right, top-to-bottom.

### Line-Based Placement

Line-based placement allows you to position items by referencing the grid lines. You can specify the starting and ending lines for both columns and rows using `grid-column` and `grid-row` shorthands. This technique also supports the `span` keyword, which lets you define how many tracks an item should cover from its current position.

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

Naming specific regions of your grid with the `grid-template-areas` property makes complex layouts much easier to manage and read. You can define a visual map of your grid, assigning each cell to a named area like "header", "main", or "sidebar". If you need to leave certain cells empty, you can represent them with a period (.) in your template.

## Responsive Grids

### Auto-fill and Auto-fit

You can create highly responsive grids without the need for media queries by using `auto-fill` and `auto-fit`. These keywords instruct the browser to create as many columns as will fit within the container's width. While `auto-fill` keeps any empty columns as part of the grid, `auto-fit` collapses them, allowing the existing columns to expand and fill the remaining space.

### minmax()

The `minmax()` function allows you to set a minimum and maximum size for your grid tracks. This is particularly useful for ensuring that a column never shrinks below a certain pixel value while still allowing it to grow fluidly if more space becomes available.

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

### Alignment

CSS Grid offers granular control over the alignment of items within their cells and the distribution of the entire grid within its container. Use `justify-items` and `align-items` to position elements within their respective cells, or `justify-content` and `align-content` to manage the spacing of the grid as a whole.

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

### Centring

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

Nested grids can now inherit and perfectly align with their parent's grid structure using the `subgrid` value. By setting `grid-template-columns: subgrid`, a child element can seamlessly align its own content with the tracks of the outer grid, ensuring consistent spacing across your entire interface.

## Try It Yourself

### Exercise 1: Responsive Card Grid

Develop a responsive card grid that displays a single column on mobile, two columns on tablet, and up to four columns on desktop. You should implement this using the `auto-fill` and `minmax()` keywords to avoid over-reliance on media queries.

### Exercise 2: Dashboard Layout

Create a structured dashboard layout featuring a full-width header, a fixed-width sidebar, a fluid main content area, and a full-width footer. Use the `grid-template-areas` property to map out and manage your layout regions visually.

### Exercise 3: Image Gallery

Build a dynamic image gallery where individual images span different numbers of rows and columns. Use grid item overlap to create a responsive hover overlay for each item in the gallery.

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

- CSS Grid allows you to define rows and columns simultaneously, creating two-dimensional layouts
- You can use the `fr` unit to distribute space proportionally
- Leverage functions like `repeat()` and `minmax()` for sophisticated responsive designs
- `place-items: center` remains the simplest method for perfectly centring content within a grid cell

## Next Steps

Continue to [Responsive Design](./06-responsive-design.md) →
