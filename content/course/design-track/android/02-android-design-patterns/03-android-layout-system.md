# Android Layout System

> **Quick Summary:** Android runs on thousands of device configurations. Understanding the layout system helps you design for this diversity.

## What You'll Learn

- Responsive layout grid
- Window size classes
- Foldables and large screens
- Designing adaptively

## Responsive Grid

### Column System
Columns adapt to screen width:
- Compact width: 4 columns
- Medium width: 8 columns
- Expanded width: 12 columns

### Margins
Edge margins scale with width:
- Compact: 16dp
- Medium: 24dp
- Expanded: 24dp

### Gutters
Space between columns:
- Standard: 16dp
- Adjustable for density

## Window Size Classes

Material defines size classes:

### Compact Width (<600dp)
- Most phones in portrait
- Single-pane layouts
- Full-width content
- Bottom navigation

### Medium Width (600-840dp)
- Large phones in landscape
- Small tablets
- Two-pane possible
- Navigation rail option

### Expanded Width (>840dp)
- Tablets, desktops
- Multi-pane layouts
- Navigation rail/drawer
- More content visible

### Applying Size Classes
Design key breakpoints:
1. Compact (phone)
2. Medium (small tablet/landscape)
3. Expanded (large tablet/desktop)

## Foldables

Devices that fold present unique challenges:

### Considerations
- Fold location (hinge)
- Different folded/unfolded states
- Screen continuity
- Content positioning

### Table-Top Mode
Partially folded, bottom on table:
- Content above fold
- Controls below fold
- Video conferencing posture

### Book Mode
Folded like a book:
- Two distinct areas
- Different content per area

## Large Screen Patterns

### List-Detail
- List on left
- Detail on right
- Most common pattern

### Feed
- Multi-column grid
- Cards resize
- More content visible

### Supporting Panel
- Main content primary
- Supplementary panel secondary

## Designing Adaptively

### What Changes
- Number of columns
- Navigation pattern
- Content density
- Image sizes

### What Stays Same
- Brand and visual identity
- Core functionality
- Information hierarchy
- Interaction patterns

### Testing Points
- Smallest phone
- Standard phone
- Large phone
- Tablet portrait
- Tablet landscape
- Foldable states

## Try It Yourself

### Exercise 1: Breakpoint Design

Design a list-detail pattern:
- Compact: Separate screens
- Expanded: Side-by-side
- Document the transition

### Exercise 2: Grid Application

Apply a responsive grid to a design:
- 4 columns for compact
- 12 columns for expanded
- How does content reflow?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-layout-quiz",
  "type": "multiple-choice",
  "title": "Android Layout System",
  "description": "Test your understanding of Android layout.",
  "difficulty": "medium",
  "question": "What does Android's dp (density-independent pixel) unit ensure?",
  "options": [
    {
      "id": "a",
      "text": "Elements render at the same pixel size on all devices",
      "isCorrect": false,
      "explanation": "dp ensures the same physical size, not pixel size."
    },
    {
      "id": "b",
      "text": "Elements appear at approximately the same physical size regardless of screen density",
      "isCorrect": true,
      "explanation": "Correct! 1dp is roughly 1/160th of an inch. On higher density screens, more pixels are used to render the same dp value, keeping physical size consistent."
    },
    {
      "id": "c",
      "text": "Text is always readable without zooming",
      "isCorrect": false,
      "explanation": "Readability depends on the dp size chosen, not the unit itself."
    },
    {
      "id": "d",
      "text": "Layouts never need to change for different devices",
      "isCorrect": false,
      "explanation": "Different screen sizes still need different layouts—dp handles density, not screen size."
    }
  ]
}
-->

## Key Takeaways

- Window size classes define breakpoints
- Columns adapt: 4, 8, or 12
- Foldables require special consideration
- Design for key breakpoints, not every size
- Large screens need distinct patterns

## Next Steps

Continue to [Notifications and Widgets](./04-notifications-and-widgets.md) →
