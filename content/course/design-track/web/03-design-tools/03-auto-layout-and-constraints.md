# Auto Layout and Constraints

> **Quick Summary:** Auto layout makes designs responsive and maintainable—components that resize, reflow, and adapt automatically instead of breaking when content changes.

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
- **Primary axis:** Start, center, end, space-between
- **Cross axis:** Start, center, end, stretch

This mirrors CSS Flexbox exactly.

## Building with Auto Layout

### Simple Button

A button is a horizontal layout:
```
[Icon] [Text]
   ↔ 8px gap
← 16px padding →
```

Setup:
1. Create a frame
2. Apply auto layout
3. Set direction: horizontal
4. Set gap: 8px
5. Set padding: 12px vertical, 16px horizontal
6. Add icon and text as children

Now the button:
- Grows when text is longer
- Shrinks when text is shorter
- Maintains consistent padding
- Keeps icon and text properly spaced

### Card Component

A card is typically vertical:
```
[ Image           ]
[ Title           ]    ↕ vertical layout
[ Description     ]    ↕ 16px gap
[ Action Button   ]
← 24px padding all around →
```

The card adapts:
- Different title lengths
- Varying description lengths
- Optional elements (image present or not)

### Nested Auto Layout

Layouts nest for complex components:
```
Card (vertical)
├── Header (horizontal)
│   ├── Avatar
│   └── User Info (vertical)
│       ├── Name
│       └── Date
├── Content
│   ├── Title
│   └── Description
└── Footer (horizontal)
    ├── Like Button
    ├── Comment Button
    └── Share Button
```

Each level has its own direction, gap, and padding.

## Sizing Behaviors

Children can behave differently when the container resizes:

### Fixed Size

Element stays the same size regardless of container.

**Use for:** Icons, avatars, fixed-width buttons

### Hug Contents

Element sizes to fit its children.

**Use for:** Buttons (hug text), tags, badges

### Fill Container

Element expands to fill available space.

**Use for:** Input fields in a form row, main content areas

### Example: Form Row

```
[ Label (fixed) ][ Input (fill) ][ Button (hug) ]
```

- Label: Fixed 100px width
- Input: Fills remaining space
- Button: Sizes to its content

The input stretches on wider screens, shrinks on narrower screens.

## Constraints

Constraints (in tools that support them) define how elements behave when their parent resizes.

### Position Constraints

Control how elements stay positioned:
- **Left:** Maintains distance from left edge
- **Right:** Maintains distance from right edge
- **Left and Right:** Stretches horizontally
- **Center:** Stays horizontally centered

Same applies vertically (Top, Bottom, Top and Bottom, Center).

### Example: Sticky Header

A header should:
- Stay at the top (top constraint)
- Stretch full width (left and right constraints)

### Example: Floating Action Button

A FAB should:
- Stay in bottom-right corner
- Maintain fixed distance from edges

Set: Right constraint, Bottom constraint, fixed size.

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

### Buttons

```
Horizontal auto layout
Gap: 8px (if icon present)
Padding: 12px 24px (vertical horizontal)
Children: [Icon?] [Label]
```

### Form Fields

```
Vertical auto layout
Gap: 4px
Children: [Label] [Input] [Error?]
```

### Lists

```
Vertical auto layout
Gap: 0 (or 1px for dividers)
Children: [List Item] repeated
```

### Navigation

```
Horizontal auto layout
Gap: 8px (between items)
Padding: 16px
Alignment: Space between (logo left, nav right)
```

### Modals

```
Vertical auto layout
Gap: 24px
Padding: 32px
Width: Fill (with max-width)
Children: [Header] [Content] [Actions]
```

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
  "description": "Test your understanding of auto layout sizing behaviors.",
  "difficulty": "medium",
  "question": "In a form row with a label, input field, and submit button, which sizing behavior should the INPUT field use?",
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
      "explanation": "Hug contents would make the input very small when empty—not ideal for user input."
    },
    {
      "id": "c",
      "text": "Fill container, so it expands to take remaining space",
      "isCorrect": true,
      "explanation": "Correct! Fill container lets the input stretch to fill available space, adapting to different screen sizes while the label and button maintain their natural sizes."
    },
    {
      "id": "d",
      "text": "Any sizing works—it doesn't matter for inputs",
      "isCorrect": false,
      "explanation": "Sizing behavior significantly affects how forms respond to different screen widths."
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
