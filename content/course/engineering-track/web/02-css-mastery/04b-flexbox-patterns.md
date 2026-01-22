---
estimatedTime: 10
---

# Flexbox Patterns

> **Quick Summary:** Learn common flexbox patterns for navigation, cards, sidebars, and page layouts that you'll use repeatedly in real projects.

## What You'll Learn

- In this lesson, we will explore the essential navigation bar patterns
- card layout strategies used in modern web design card layout strategies used in modern web design
- You will learn how to implement robust sidebar layouts, manage complex page structures
- build efficient form layouts using the power of flexbox
- build efficient form layouts using the power of flexbox

## Centring

Centring elements is perhaps the most famous and widely used flexbox pattern. By combining `justify-content: centre` and `align-items: centre` on a container, you can perfectly position its children in the middle of the spare space. This technique is equally effective for full-page centring, such as for modals or splash screens, when combined with a minimum height of `100vh`.

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

For a standard navigation bar, you can use `margin-right: auto` on the logo to push the subsequent navigation links to the far right. If your design requires the links to be centred while the logo and action buttons remain pinned to the sides, you can apply `margin-left: auto` and `margin-right: auto` to the link container. This "margin: auto" trick is a powerful way to absorb available space and distribute items exactly where you need them.

### Navigation with Spacer

Another common approach is to use a dedicated spacer element. By applying `margin-left: auto` to a spacer div, you can force all subsequent items to the right side of your navigation bar, which is perfect for separating primary navigation from utility links or call-to-action buttons.

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

You can use flexbox to create rows of cards that automatically match each other's height. By setting `flex: 1` on each card, they will take up equal width regardless of their individual content. If your design requires a fixed number of cards per row, you can use `flex-wrap: wrap` on the container and set a specific `flex-basis` for the cards using `calc()` to account for the gaps. Additionally, flexbox makes it easy to pin a footer to the bottom of a card by setting the card itself to `display: flex` with a column direction and allowing the content area to grow and fill the available space.

## Sidebar Layout

A classic sidebar layout can be achieved by setting the sidebar to a fixed width and letting the main content area fill the remaining space with `flex: 1`. This pattern is also ideal for collapsible sidebars, where you can transition the `flex-basis` to smoothly shrink the sidebar to a narrow icon-only view.

## Page Structure Patterns

The "Holy Grail" layout is a traditional three-column structure that includes a header, a main content area flanked by two sidebars, and a footer. By setting the main wrapper to a column flex direction and the content area to `flex: 1`, you can ensure that the footer remains pinned to the bottom of the viewport even when the page content is sparse.

## Form Layouts

Flexbox is invaluable for building consistent form layouts. You can create inline rows where labels have a fixed width and input fields automatically stretch to fill the rest of the available space. For search bars, you can seamlessly join an input field and a search button by setting the button's flex to `none` to preserve its natural size while the input expands.

## Media Object

The media object pattern—a small image or icon with associated text beside it—is a staple of web design. By setting the image to `flex: 0 0 auto`, you ensure it maintains its natural dimensions while the body text grows to fill all remaining horizontal space.

## Responsive Patterns

To ensure your layouts work effectively on mobile devices, you can use media queries to switch your flex direction from row to column, causing items to stack vertically. Alternatively, you can use `flex-wrap: wrap` combined with a minimum `flex-basis` to allow items to automatically flow onto new lines as the screen width decreases.

## Try It Yourself

### Exercise 1: Navigation Bar

Create a navigation bar that features a logo on the left, primary links in the centre, and a login button on the right. Use flexbox along with the `margin-left: auto` technique to manage the distribution of these components.

### Exercise 2: Card Grid

Develop a card grid featuring three equal-width cards that maintain a consistent gap. Ensure that the content within each card is centred vertically and that the grid automatically stacks into a single column on mobile devices.

### Exercise 3: Modal Overlay

Build a full-page modal overlay with a semi-transparent background. The modal content should remain perfectly centred both horizontally and vertically without stretching to fill the entire container.

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

- `flex: 1` ensures that cards maintain equal widths
- `flex: 1` ensures that cards maintain equal widths
- You can create fixed-width sidebars by defining a specific pixel value in your flex shorthand
- use `flex-direction: column` to reliably pin footers to the bottom of your pages
- use `flex-direction: column` to reliably pin footers to the bottom of your pages
- For responsive grids, `flex-wrap: wrap` remains the most versatile option,

## Next Steps

Continue to [Layout with Grid](./05-layout-with-grid.md) →

