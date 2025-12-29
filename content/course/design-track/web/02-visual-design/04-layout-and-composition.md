# Layout and Composition

> **Quick Summary:** Layout is how elements are arranged on a page. Good layout creates visual flow, establishes hierarchy, and makes content easy to consume.

## What You'll Learn

- Grid systems and how to use them
- Common layout patterns for web
- Responsive design principles
- Composition techniques for visual balance

## The Purpose of Layout

Layout answers fundamental questions:
- Where does content go?
- How does content relate spatially?
- How does the eye move through the page?
- How does the layout adapt to different screens?

Without intentional layout, content sprawls chaotically. With it, even complex pages feel organised.

## Grid Systems

> *"The grid system is an aid, not a guarantee."* — Josef Müller-Brockmann

Grids are invisible structures that organise content. They create consistency, establish rhythm, and simplify decision-making.

<!-- visual-example: grid-columns-demo -->

<!-- illustration: grid-overlay -->

### Anatomy of a Grid

**Columns:** Vertical divisions where content sits. Common: 12 columns (divisible by 2, 3, 4, 6).

**Gutters:** Spaces between columns. Typically 16-32px.

**Margins:** Space between the grid and the screen edge.

**Container:** The maximum width of the content area.

### The 12-Column Grid

12 columns is the most common system because of its flexibility:
- 1 column: Full width
- 2 columns: 6 + 6
- 3 columns: 4 + 4 + 4
- 4 columns: 3 + 3 + 3 + 3
- Asymmetric: 8 + 4, 3 + 9, etc.

```
|  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  | 11  | 12  |
|_____|_____|_____|_____|_____|_____|_____|_____|_____|_____|_____|_____|
```

### When to Break the Grid

> *"The grid is there so you know when to break it."* — d×e

Grids are guides, not prisons. Break them intentionally for:
- Emphasis (an element that spans "outside" feels important)
- Visual interest (perfect grids can feel rigid)
- Content requirements (some content doesn't fit neatly)

But break rarely and deliberately.

## Common Layout Patterns

### Single Column

The simplest layout: content in one vertical stack.

**Best for:**
- Long-form reading (articles, documentation)
- Mobile layouts
- Focused content (sign-up forms)

**Considerations:**
- Control line length (max-width)
- Generous vertical spacing
- Clear hierarchy within the column

### Two Column

Content split into two areas, often with different purposes.

**Common patterns:**
- Sidebar + main content
- Content + form
- Image + text

**Best for:**
- Dashboards
- Documentation with navigation
- Product pages

**Considerations:**
- Decide which column dominates
- Consider column behaviour on mobile (stack or hide?)

### Multi-Column Grid

Three or more columns of equal or varying widths.

**Common patterns:**
- Card grids (3-4 columns)
- Feature lists
- Portfolio galleries

**Best for:**
- Displaying many similar items
- Comparison layouts
- Dashboard widgets

**Considerations:**
- Items should have similar visual weight
- Spacing between items matters
- Consider odd numbers of items (partial rows)

### Asymmetric Layouts

Intentionally unbalanced for visual interest.

**Common patterns:**
- Hero sections with offset imagery
- 2/3 + 1/3 content splits
- Scattered/editorial layouts

**Best for:**
- Marketing pages
- Creative portfolios
- Editorial content

**Considerations:**
- Asymmetry should feel intentional, not accidental
- Balance visual weight even if columns differ

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

Eye-tracking research shows users scan in an F-pattern:
1. Horizontal line across the top
2. Down the left side
3. Another horizontal scan lower

**Implications:**
- Put important content top-left
- Left-align primary content
- Front-load information in paragraphs

### The Z-Pattern

For less text-heavy pages, eyes follow a Z:
1. Top-left to top-right
2. Diagonal to bottom-left
3. Bottom-left to bottom-right

**Implications:**
- Logo top-left
- Navigation top-right
- Call to action bottom-right

### Visual Weight Distribution

Elements have visual "weight" based on:
- Size (larger = heavier)
- Color (darker or more saturated = heavier)
- Contrast (high contrast = heavier)
- Complexity (more detail = heavier)

Balance weight across the layout. A large image on the left might balance a text block and CTA on the right.

### Rule of Thirds

Divide the canvas into a 3×3 grid. Place important elements at intersections or along lines.

This works for:
- Hero image positioning
- Call to action placement
- Balancing whitespace

### Above the Fold

The area visible without scrolling is prime real estate. Place:
- Value proposition
- Primary action
- Enough content to encourage scrolling

But don't cram everything above the fold. Users scroll if you give them reason to.

## Creating Visual Flow

Good layouts guide the eye through content in logical order.

### Techniques for Flow

**Size progression:** Large elements first, smaller supporting elements after.

**Directional cues:** Images of people looking toward content, arrows, diagonal lines.

**Whitespace channels:** Empty space creates paths the eye follows.

**Repetition:** Repeating elements create rhythm that pulls you through.

### Common Flow Patterns

**Hero → Features → Social Proof → CTA**
Classic marketing page flow. Interest → Details → Trust → Action.

**Problem → Solution → How it Works → Pricing**
Product page flow. Empathy → Answer → Clarity → Conversion.

**Navigation → Main Content → Related → Footer**
App/document flow. Orient → Engage → Explore → Navigate.

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

- Grids create consistency and simplify decision-making
- 12-column grids are flexible and widely used
- Common patterns: single column, two column, multi-column, asymmetric
- Design mobile-first, enhance for larger screens
- Composition techniques (F-pattern, Z-pattern, rule of thirds) guide visual flow
- Balance visual weight for harmonious layouts
- Avoid walls of sameness, random placement, and overcrowding

## Next Steps

Continue to [Iconography and Imagery](./05-iconography-and-imagery.md) →
