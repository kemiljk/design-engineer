# Layout with Flexbox

> **Quick Summary:** Flexbox is a one-dimensional layout system that makes alignment, distribution, and ordering of items intuitive and powerful.

## What You'll Learn

- Core concepts of flex containers and flex items
- Managing alignment across main and cross axes
- Mechanics of growing, shrinking, and sizing flex items
- Common flexbox patterns for modern web layout

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
  flex-direction: row; /* Default: left to right */
  flex-direction: row-reverse; /* Right to left */
  flex-direction: column; /* Top to bottom */
  flex-direction: column-reverse; /* Bottom to top */
}
```

### Main Axis and Cross Axis

Flexbox operates along two primary axes. The **main axis** follows the direction defined by your `flex-direction` setting, while the **cross axis** runs perpendicular to it. Understanding the relationship between these two axes is fundamental to mastering flexbox alignment.

```text
flex-direction: row

Main axis →
┌─────────────────────────────────┐
│ ┌───┐ ┌───┐ ┌───┐               │ ↕ Cross axis
│ │ 1 │ │ 2 │ │ 3 │               │
│ └───┘ └───┘ └───┘               │
└─────────────────────────────────┘
```

```text
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

The `justify-content` property distributes space along the main axis. By default, items are packed at the start of the container with `flex-start`, but you can also pack them at the end with `flex-end` or centre them using `center`. To manage the spacing between items, you can use `space-between` for equal gaps between elements, or `space-around` and `space-evenly` for more balanced distribution across the entire container.

### Align Items (Cross Axis)

To align items on the cross axis, you can use the `align-items` property. Most browsers default to `stretch`, causing items to fill the container's height, but you can also align them to the `flex-start` or `flex-end`. Other common values include `center` for vertical centring in a row and `baseline` to ensure that the text within your items aligns perfectly.

### Align Content (Multiple Lines)

When you allow items to wrap onto multiple lines, the `align-content` property determines how those rows or columns are distributed within the container. It offers the same distribution options as `justify-content`, allowing you to pack lines at the start, centre them, or space them out evenly.

### Gap

The `gap` property provides a modern and clean way to manage the space between your items without needing to apply margins to the items themselves. You can set a single value for both row and column gaps, or specify them individually using `row-gap` and `column-gap` for more complex layouts.

`gap` is cleaner than margins on items.

## Flex Items

Properties on the children (items):

### Flex Grow

The `flex-grow` property determines how much an item should expand relative to its siblings to fill any remaining space. By default, items do not grow, but setting this to `1` allows an item to take up its share of the free space. If you assign `flex-grow: 2` to one item and `1` to another, the first item will receive twice as much of the extra space.

### Flex Shrink

Conversely, `flex-shrink` defines how items should behave when the container is too small to fit them all. While most items shrink equally by default, you can set this to `0` to prevent a specific item from shrinking at all, preserving its original size.

### Flex Basis

The `flex-basis` property sets the initial size of an item before any growing or shrinking occurs. While the default `auto` setting instructs the browser to use the item's defined width or height, you can also specify a fixed pixel value or set it to `0` to ignore the natural content size entirely.

### Flex Shorthand

For efficiency, you can combine grow, shrink, and basis into the `flex` shorthand property. This allows you to quickly define whether items should grow equally, scale based on their content, or maintain a fixed size that ignores the flex container's distribution logic.

Common patterns:

```css
.item {
  flex: 1;
} /* All items equal width */
.sidebar {
  flex: 0 0 250px;
} /* Fixed width */
.main {
  flex: 1;
} /* Takes remaining space */
```

### Align Self

You can override the container's alignment for an individual item using the `align-self` property. This gives you the flexibility to centre a single item while others are stretched, or align one specific element to the end of the cross axis.

### Order

The `order` property allows you to change the visual sequence of your items without altering the underlying HTML structure. By assigning negative or positive values, you can easily move specific elements to the start or end of the row.

## Flex Wrap

By default, flex items attempt to stay on a single line even if they have to shrink. You can change this behavior using `flex-wrap`, which allows items to wrap onto new lines or even wrap in reverse, ensuring that your layout remains responsive on smaller screens.

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

.nav-item {
}

.nav-spacer {
  margin-left: auto; /* Push subsequent items right */
}
```

### Card Row

```css
.card-row {
  display: flex;
  gap: 1.5rem;
}

.card {
  flex: 1; /* Equal width cards */
}
```

### Sidebar Layout

```css
.layout {
  display: flex;
}

.sidebar {
  flex: 0 0 250px; /* Fixed width */
}

.main {
  flex: 1; /* Fill remaining */
}
```

### Holy Grail Layout

```css
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
}
.footer {
}

.content {
  display: flex;
  flex: 1;
}

.sidebar-left {
  flex: 0 0 200px;
}
.main {
  flex: 1;
}
.sidebar-right {
  flex: 0 0 200px;
}
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
  flex: none; /* Button's natural size */
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
  flex: 1; /* Grows to push footer down */
}

.footer {
}
```

## Try It Yourself

### Exercise 1: Navigation Bar

Create a navigation bar that features a logo on the left, primary links in the centre, and a login button on the right. You should use flexbox for the overall layout and leverage `margin-left: auto` to push the login button to the far right.

### Exercise 2: Card Grid

Develop a row containing three equal-width cards. Ensure that they maintain a consistent gap between them and that the content within each card is centred vertically regardless of its length.

### Exercise 3: Modal

Create a full-page modal overlay where the content box remains perfectly centred both horizontally and vertically. The modal box itself should not stretch to fill the entire viewport, but rather wrap its content neatly.

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

- To build powerful layouts with flexbox, you must first create a flex container using `display: flex`
- define the main axis with `flex-direction` define the main axis with `flex-direction`
- Use `justify-content` and `align-items` to manage alignment across the axes
- take advantage of the `gap` property for clean spacing between your items
- take advantage of the `gap` property for clean spacing between your items
- By mastering the `flex` shorthand property, you can control how items grow and shrink
- `order` and `align-self` provide granular control over individual elements
- `order` and `align-self` provide granular control over individual elements
- Finally, remember that flexbox is a one-dimensional system,

## Next Steps

Continue to [Layout with Grid](./05-layout-with-grid.md) →
