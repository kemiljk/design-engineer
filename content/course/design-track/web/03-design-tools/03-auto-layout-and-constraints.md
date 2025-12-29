# Auto Layout and Constraints

> **Quick Summary:** Auto layout makes designs responsive and maintainable. Components resize, reflow, and adapt automatically instead of breaking when content changes.

## What You'll Learn

- What auto layout is and why it matters
- How to create flexible components with auto layout
- Using constraints for responsive positioning
- Best practices for building production-ready components

## The Problem with Static Design

Traditional design is static: elements are positioned at exact coordinates. This creates problems:

**Content changes:** If button text changes from "OK" to "Submit Application," the button needs manual resizing.

**Responsive design:** Elements don't adapt to different screen sizes without manual adjustment.

**Maintenance burden:** Every change requires manually updating multiple instances.

Auto layout solves these problems by defining *relationships* between elements instead of fixed positions.

## What is Auto Layout?

Auto layout (or "Flexbox for design tools") arranges children automatically based on rules:

- Stack children horizontally or vertically
- Add consistent spacing between children
- Apply padding inside containers
- Allow children to grow, shrink, or stay fixed

When content changes, the layout recalculates automatically.

## Auto Layout Fundamentals

### Direction

Choose how children stack:
- **Horizontal:** Children line up left to right
- **Vertical:** Children stack top to bottom

### Spacing

Define the gap between children:
- Consistent spacing keeps rhythm
- Usually follows your 8-point grid (8px, 16px, 24px)

### Padding

Define space between container edges and children:
- Can be uniform (all sides the same)
- Or independent (different top, right, bottom, left)

### Alignment

Control where children sit within the container:
- **Primary axis:** Start, centre, end, space-between
- **Cross axis:** Start, centre, end, stretch

This mirrors CSS Flexbox exactly.

## Building with Auto Layout

The interactive example below shows how auto layout properties translate into real UI components. Toggle between examples to see the Figma-style properties panel update.

<!-- visual-example: auto-layout-demo -->

### How It Works

**Button:** A horizontal layout with icon and text as children. The 8px gap keeps them spaced, and the padding creates breathing room around the content. The button grows or shrinks based on the label length.

**Card:** A vertical layout stacking image, title, description, and actions. The 16px gap creates consistent rhythm between sections. The card adapts to different content lengths automatically.

**Form Row:** Demonstrates mixed sizing behaviours—the label stays fixed width, the input fills available space, and the button hugs its content.

**Navigation:** Uses space-between alignment to push the logo left and actions right, with nav items in the centre.

### Nested Auto Layout

Layouts nest for complex components. A social media card might have:

- **Card** (vertical layout, 16px gap)
  - **Header** (horizontal layout, 12px gap)
    - Avatar
    - **User Info** (vertical layout, 4px gap)
      - Name
      - Date
  - **Content** (vertical layout, 8px gap)
    - Title
    - Description
  - **Footer** (horizontal layout, 16px gap)
    - Like Button
    - Comment Button
    - Share Button

Each level has its own direction, gap, and padding.

## Sizing Behaviours

Children can behave differently when the container resizes. The interactive demo below lets you experiment with each sizing mode.

<!-- visual-example: sizing-behaviours-demo -->

### Fixed Size

Element stays the same size regardless of container. Use for icons, avatars, and fixed-width labels.

### Hug Contents

Element sizes to fit its children. Use for buttons, tags, and badges that should adapt to their text.

### Fill Container

Element expands to fill available space. Use for input fields, main content areas, and anything that should stretch.

## Constraints

Constraints define how elements behave when their parent resizes. They're essential for responsive positioning.

<!-- visual-example: constraints-demo -->

### Position Constraints

Control how elements stay positioned:
- **Left:** Maintains distance from left edge
- **Right:** Maintains distance from right edge
- **Left and Right:** Stretches horizontally
- **Centre:** Stays horizontally centred

Same applies vertically (Top, Bottom, Top and Bottom, Centre).

## Responsive Components

Combining auto layout and constraints creates truly responsive designs:

### Responsive Card Grid

Container with:
- Auto layout (horizontal, wrap)
- Gap: 24px
- Padding: 24px

Card children with:
- Min width: 280px
- Max width: 400px
- Fill container (with min/max)

Cards reflow based on available space, just like CSS Grid with minmax.

### Responsive Navigation

Desktop:
- Horizontal nav items
- All items visible

Mobile:
- Items hidden in menu
- Hamburger button visible

Use component variants or separate designs for each breakpoint.

## Common Patterns

Here are the auto layout settings for common UI patterns:

| Component | Direction | Gap | Padding | Key Settings |
|-----------|-----------|-----|---------|--------------|
| **Button** | Horizontal | 8px | 12px / 24px | Centre aligned, hug contents |
| **Form Field** | Vertical | 4px | 0 | Label, Input, Error stack |
| **List** | Vertical | 0–1px | 0 | Dividers via gap or borders |
| **Navigation** | Horizontal | 8px | 16px | Space-between alignment |
| **Modal** | Vertical | 24px | 32px | Max-width constraint |
| **Card** | Vertical | 16px | 24px | Stretch children to fill |

## Debugging Auto Layout

When auto layout behaves unexpectedly:

### Check Sizing Modes

Is something set to "Fixed" that should be "Fill" or vice versa?

### Check Constraints

Are constraints conflicting? (Left and Right both set but element is fixed width)

### Check Nesting

Is auto layout applied at the right level? Sometimes you need a wrapper frame.

### Check Alignment

Is alignment causing unexpected positioning?

### Simplify

Remove complexity until it works, then add back gradually.

## Try It Yourself

### Exercise 1: Button Component

Build a button with auto layout that:
- Has icon on the left (optional)
- Has text label
- Maintains consistent padding
- Grows/shrinks with text content
- Has variants: Small, Medium, Large

### Exercise 2: Card Component

Build a card with:
- Image (fixed aspect ratio)
- Title (1-2 lines)
- Description (up to 3 lines)
- Action button

Test with varying content lengths.

### Exercise 3: Form Layout

Build a form with:
- Two columns on desktop (label left, input right)
- Single column on mobile (label above input)
- Proper spacing between fields

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "auto-layout-quiz",
  "type": "multiple-choice",
  "title": "Auto Layout Sizing",
  "description": "Test your understanding of auto layout sizing behaviours.",
  "difficulty": "medium",
  "question": "In a form row with a label, input field, and submit button, which sizing behaviour should the INPUT field use?",
  "options": [
    {
      "id": "a",
      "text": "Fixed size, so it's always the same width",
      "isCorrect": false,
      "explanation": "Fixed size doesn't adapt to different screen widths, causing the form to break on smaller screens."
    },
    {
      "id": "b",
      "text": "Hug contents, so it sizes to the text inside",
      "isCorrect": false,
      "explanation": "Hug contents would make the input very small when empty. Not ideal for user input."
    },
    {
      "id": "c",
      "text": "Fill container, so it expands to take remaining space",
      "isCorrect": true,
      "explanation": "Correct! Fill container lets the input stretch to fill available space, adapting to different screen sizes while the label and button maintain their natural sizes."
    },
    {
      "id": "d",
      "text": "Any sizing works, it doesn't matter for inputs",
      "isCorrect": false,
      "explanation": "Sizing behaviour significantly affects how forms respond to different screen widths."
    }
  ]
}
-->

## Key Takeaways

- Auto layout creates flexible, content-adaptive designs
- Direction, spacing, padding, and alignment are the core properties
- Children can be fixed, hug contents, or fill container
- Constraints position elements relative to parent edges
- Nest auto layouts for complex components
- Responsive design combines auto layout with constraints and breakpoint-specific layouts
- Debug by checking sizing modes, constraints, nesting, and alignment

## Next Steps

Continue to [Prototyping Basics](./04-prototyping-basics.md) →
