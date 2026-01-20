# Layout and Composition

> **Quick Summary:** Layout is how elements are arranged on a page. Good layout creates visual flow, establishes hierarchy, and makes content easy to consume.

## The Purpose of Layout

Layout answers fundamental questions:
Layout determines the spatial relationship between elements, directing how the eye moves through the page while ensuring that content adapts seamlessly across different screen sizes.

Without intentional layout, content sprawls chaotically. With it, even complex pages feel organised.

## Grid Systems

> *"The grid system is an aid, not a guarantee."* — Josef Müller-Brockmann

Grids are invisible structures that organise content. They create consistency, establish rhythm, and simplify decision-making.

<!-- visual-example: grid-columns-demo -->

<!-- illustration: grid-overlay -->

### Anatomy of a Grid

A grid is composed of four key parts:

**Columns** are the vertical divisions where your content lives. The most common system uses 12 columns because the number 12 is highly divisible (by 2, 3, 4, and 6), allowing for flexible layouts.

**Gutters** are the empty spaces between columns. They provide breathing room so that text in adjacent columns doesn't run together. Typical gutter widths range from 16px to 32px.

**Margins** are the spaces between the grid content and the edge of the screen. On mobile, these might be small (16px), while on large desktops, they can be expansive.

**The Container** defines the maximum width of your content. Without a container, your text would stretch across the entire width of a 27-inch monitor, making it impossible to read.

### The 12-Column Grid

12 columns is the most common system because of its flexibility:
- 1 column: Full width
- 2 columns: 6 + 6
- 3 columns: 4 + 4 + 4
- 4 columns: 3 + 3 + 3 + 3
- Asymmetric: 8 + 4, 3 + 9, etc.

```text
|  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  | 11  | 12  |
|_____|_____|_____|_____|_____|_____|_____|_____|_____|_____|_____|_____|
```

### When to Break the Grid

> *"The grid is there so you know when to break it."* — d×e

Grids are guides, not prisons. You might choose to break the grid for **emphasis** (an element that spans "outside" feels important) or **visual interest** (perfect grids can feel rigid). However, these breaks should be rare and deliberate.

## Common Layout Patterns

### Single Column

The simplest layout is a single vertical stack of content. This pattern works best for **long-form reading** (like articles or documentation) and **mobile interfaces**. When designing single-column layouts, pay close attention to line length—text should generally not exceed 75 characters per line for readability.

### Two Column

Splitting content into two areas allows you to present related information side-by-side. This is common for **dashboards** (sidebar + main content) or **product pages** (image + description). When using two columns, establish a clear hierarchy: one column should usually be dominant (e.g., a 2/3 and 1/3 split) to guide the user's focus.

### Multi-Column Grid

Three or more columns are useful for displaying collections of similar items, such as **card grids**, **feature lists**, or **galleries**. In these layouts, consistency is key: items should generally have similar visual weight and spacing to create a harmonious rhythm.

### Asymmetric Layouts

Asymmetric layouts feel dynamic and modern. They are often used in **marketing pages** or **editorial design** to create visual interest. For example, a hero section might offset an image to the right while keeping text on the left. The key is to balance the *visual weight* of elements so the page doesn't feel like it's tipping over.

## Responsive Layout

Layouts must adapt to screens from 320px phones to 4K monitors.

<!-- visual-example: responsive-layout-demo -->

<!-- illustration: responsive-breakpoints -->

### The Mobile-First Approach

Start with mobile layout, then enhance for larger screens:

1. **Mobile (< 640px):** Single column, stacked content
2. **Tablet (640-1024px):** Two columns, condensed grids
3. **Desktop (1024px+):** Full grid, expanded layout

This approach forces prioritisation and ensures mobile experience is solid.

### Breakpoints

Common breakpoint widths:
- 640px — Small tablets/large phones
- 768px — Tablets
- 1024px — Small desktops
- 1280px — Large desktops
- 1536px — Extra large screens

Choose breakpoints based on content, not devices. Where does your layout break?

### Container Widths

Content shouldn't stretch infinitely. Set maximum widths:

```css
.container {
  max-width: 1200px; /* Common content max */
  margin: 0 auto; /* Center the container */
  padding: 0 24px; /* Side padding for small screens */
}
```

### Fluid vs. Fixed

**Fluid layouts:** Widths as percentages, flexible
**Fixed layouts:** Widths in pixels, predictable

Most modern layouts are fluid within a fixed maximum:
- Container has max-width
- Columns are percentage-based
- Content reflows until max-width, then centers

## Composition Techniques

Beyond grid structure, composition is about visual arrangement and balance.

### The F-Pattern

Eye-tracking research shows users scan text-heavy pages in an F-pattern, reading horizontally across the top before scanning down the left side and occasionally reading across again. Consequently, your most important content—such as headlines and key points—should be placed in the top-left area or be strictly left-aligned.

### The Z-Pattern

For landing pages and other areas with less text, users follow a Z-pattern by scanning from the top-left to top-right, moving diagonally down to the bottom-left, and finally across to the bottom-right. This natural movement makes the bottom-right corner the ideal position for your primary call to action.

### Visual Weight Distribution

Every element has "weight." Large, dark, or high-contrast elements feel heavier. A balanced composition distributes this weight evenly. For instance, a large, dark image on the left can be balanced by a block of text and a heavy button on the right.

### Rule of Thirds

If you divide your canvas into a 3×3 grid, the intersections of the grid lines are natural focal points. Placing key elements (like a hero image subject or a headline) at these intersections often creates a more dynamic and pleasing composition than centering everything.

### Above the Fold

The area visible without scrolling is prime real estate. It should contain your **value proposition** and **primary action**. However, don't cram everything here; you just need enough interesting content to encourage the user to scroll down.

## Creating Visual Flow

Good layouts guide the eye through content in logical order.

### Techniques for Flow

Visual flow is established through size progression, moving from large elements to smaller supporting ones, and by using directional cues like images of people looking toward content. Furthermore, whitespace channels and repeating patterns create invisible paths that pull the user's eye naturally through the information.

### Common Flow Patterns

A classic marketing page flow moves from the hero section to features, followed by social proof and a final call to action to move users through interest, details, trust, and action.

Product pages often follow a problem-solution-pricing sequence to build empathy and clarity before conversion, while apps orient users through navigation before engaging them with main content and related information.

## Layout Anti-Patterns

### The Wall of Sameness

Everything the same size, same spacing, same treatment. No hierarchy, no flow.

**Fix:** Vary sizes and spacing to create emphasis.

### Random Placement

Elements positioned without apparent logic or alignment.

**Fix:** Use a grid. Align elements to common edges.

### Trapped Whitespace

Small pockets of space trapped between elements that feel awkward.

**Fix:** Consolidate whitespace into intentional areas.

### Overcrowding

Too much content competing for attention.

**Fix:** Reduce, prioritise, or paginate content.

## Try It Yourself

### Exercise 1: Grid Analysis

Take a website you admire. Using browser dev tools or by overlaying a grid, identify:
- Column count
- Gutter widths
- Container max-width
- How columns are used across the page

### Exercise 2: Layout Variations

Design the same content (headline, paragraph, image, button) in:
1. Single column layout
2. Two column layout (image left)
3. Two column layout (image right)
4. Card layout

Notice how the same content feels different.

### Exercise 3: Responsive Planning

For a three-column layout, plan:
- Mobile: How do columns stack?
- Tablet: 2 columns? 3 columns?
- Desktop: Full layout

Sketch each breakpoint.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "layout-patterns-quiz",
  "type": "multiple-choice",
  "title": "Layout and Composition",
  "description": "Test your understanding of layout patterns.",
  "difficulty": "medium",
  "question": "According to eye-tracking research, where should you place the most important content on a text-heavy page?",
  "options": [
    {
      "id": "a",
      "text": "Center of the page for maximum visibility",
      "isCorrect": false,
      "explanation": "Users don't naturally start scanning at the center of a page."
    },
    {
      "id": "b",
      "text": "Top-left area, following the F-pattern reading behaviour",
      "isCorrect": true,
      "explanation": "Correct! Eye-tracking shows users scan in an F-pattern: horizontal line at top, down the left side, then another horizontal scan. Important content belongs top-left."
    },
    {
      "id": "c",
      "text": "Bottom-right where call-to-action buttons typically go",
      "isCorrect": false,
      "explanation": "CTAs often go bottom-right, but this isn't where users look first on text-heavy pages."
    },
    {
      "id": "d",
      "text": "It doesn't matter if you use bold and large fonts",
      "isCorrect": false,
      "explanation": "While visual hierarchy helps, natural scanning patterns still influence where users look first."
    }
  ]
}
-->

## Key Takeaways

Effective layout uses grids to create consistency and simplify spatial decision-making, with 12-column systems providing the flexibility needed for common patterns like single or multi-column grids. By designing mobile-first and applying composition techniques like the F and Z-patterns, you can guide visual flow and balance weight to avoid walls of sameness or overcrowding in your interfaces.

## Next Steps

Continue to [Iconography and Imagery](./05-iconography-and-imagery.md) →
