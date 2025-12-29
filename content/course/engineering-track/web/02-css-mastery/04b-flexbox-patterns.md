---
estimatedTime: 10
---

# Flexbox Patterns

> **Quick Summary:** Learn common flexbox patterns for navigation, cards, sidebars, and page layouts that you'll use repeatedly in real projects.

## What You'll Learn

- Navigation bar patterns
- Card layouts
- Sidebar layouts
- Page structure patterns
- Form layouts

## Centering

The most famous flexbox pattern:

```css
.center-all {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

For full-page centring (modals, splash screens):

```css
.fullscreen-center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

## Navigation Bar

### Basic Navigation

```css
.nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}
```

### Logo Left, Links Right

```css
.nav {
  display: flex;
  align-items: center;
}

.nav-logo {
  margin-right: auto;
}

.nav-links {
  display: flex;
  gap: 1rem;
}
```

### Logo Left, Links Centre, Actions Right

```css
.nav {
  display: flex;
  align-items: center;
}

.nav-logo { }

.nav-links {
  display: flex;
  gap: 1rem;
  margin-left: auto;
  margin-right: auto;
}

.nav-actions {
  display: flex;
  gap: 0.5rem;
}
```

The `margin-left: auto` trick pushes items to the right. Combined with `margin-right: auto`, it centres the links.

### Navigation with Spacer

```css
.nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-spacer {
  margin-left: auto;  /* Push subsequent items right */
}
```

```html
<nav class="nav">
  <a href="/">Logo</a>
  <a href="/about">About</a>
  <a href="/work">Work</a>
  <div class="nav-spacer"></div>
  <a href="/contact">Contact</a>
  <button>Sign In</button>
</nav>
```

## Card Layouts

### Equal Width Cards

```css
.card-row {
  display: flex;
  gap: 1.5rem;
}

.card {
  flex: 1;  /* Equal width cards */
}
```

### Fixed Number of Cards Per Row

```css
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.card {
  flex: 0 0 calc(33.333% - 1rem);  /* 3 per row, accounting for gap */
}
```

### Card with Fixed Height Footer

```css
.card {
  display: flex;
  flex-direction: column;
}

.card-content {
  flex: 1;  /* Takes available space */
}

.card-footer {
  /* Stays at bottom */
}
```

## Sidebar Layout

### Fixed Sidebar, Flexible Main

```css
.layout {
  display: flex;
}

.sidebar {
  flex: 0 0 250px;  /* Fixed 250px width */
}

.main {
  flex: 1;  /* Fill remaining space */
}
```

### Collapsible Sidebar

```css
.sidebar {
  flex: 0 0 250px;
  transition: flex-basis 0.3s ease;
}

.sidebar.collapsed {
  flex-basis: 60px;
}
```

## Holy Grail Layout

The classic three-column layout with header and footer:

```css
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header { }

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

.footer { }
```

## Footer Stuck to Bottom

When content is short, keep footer at bottom:

```css
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;  /* Grows to push footer down */
}

.footer {
  /* Stays at bottom */
}
```

## Form Layouts

### Inline Form Row

```css
.form-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.form-row label {
  flex: 0 0 100px;  /* Fixed label width */
}

.form-row input {
  flex: 1;  /* Input fills remaining space */
}

.form-row button {
  flex: none;  /* Button's natural size */
}
```

### Search Bar

```css
.search {
  display: flex;
}

.search input {
  flex: 1;
  border-radius: 0.5rem 0 0 0.5rem;
}

.search button {
  flex: none;
  border-radius: 0 0.5rem 0.5rem 0;
}
```

## Media Object

Image/icon with text beside it:

```css
.media {
  display: flex;
  gap: 1rem;
}

.media-image {
  flex: 0 0 auto;  /* Image's natural size */
}

.media-body {
  flex: 1;  /* Text fills remaining space */
}
```

## Responsive Patterns

### Stack on Mobile

```css
.row {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }
}
```

### Wrap on Smaller Screens

```css
.features {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.feature {
  flex: 1 1 300px;  /* Grow and shrink, min 300px */
}
```

## Try It Yourself

### Exercise 1: Navigation Bar

Create a nav bar with:
- Logo on the left
- Links in the middle
- Login button on the right

Use flexbox with `margin-left: auto` to separate sections.

### Exercise 2: Card Grid

Create a row of 3 equal-width cards that:
- Have equal widths
- Have consistent gap
- Centre their content vertically
- Stack on mobile

### Exercise 3: Modal Overlay

Create a full-page modal overlay with:
- Semi-transparent background
- Content centred both horizontally and vertically
- Modal box that doesn't stretch to fill

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "css-flexbox-patterns-quiz",
  "type": "multiple-choice",
  "title": "Flexbox Patterns",
  "description": "Test your understanding of common flexbox patterns.",
  "difficulty": "medium",
  "question": "To push a navigation item to the right side of a flex container, which technique works best?",
  "options": [
    {
      "id": "a",
      "text": "justify-content: flex-end on the item",
      "isCorrect": false,
      "explanation": "justify-content is a container property, not an item property."
    },
    {
      "id": "b",
      "text": "margin-left: auto on the item or a spacer before it",
      "isCorrect": true,
      "explanation": "Correct! In flexbox, margin: auto absorbs available space. margin-left: auto pushes the item to the right."
    },
    {
      "id": "c",
      "text": "float: right on the item",
      "isCorrect": false,
      "explanation": "Floats don't work on flex items. Flexbox provides better alternatives."
    },
    {
      "id": "d",
      "text": "position: absolute on the item",
      "isCorrect": false,
      "explanation": "Absolute positioning removes the item from the flex flow. margin-left: auto is cleaner."
    }
  ]
}
-->

## Key Takeaways

- `margin-left: auto` pushes items right; great for navigation
- `flex: 1` on cards creates equal widths
- `flex: 0 0 250px` creates fixed-width sidebars
- `flex-direction: column` with `flex: 1` on main content pins footer to bottom
- `flex-wrap: wrap` with `flex: 1 1 300px` creates responsive grids
- Flexbox is one-dimensional—use Grid for two-dimensional layouts

## Next Steps

Continue to [Layout with Grid](./05-layout-with-grid.md) →

