# Adaptive and Responsive

> **Quick Summary:** Android's diverse device ecosystem requires adaptive design thinking. Learn to design for phones, tablets, foldables, and more.

## What You'll Learn

- Designing for device diversity
- Adaptive layout patterns
- Foldable considerations
- Multi-window support

## The Android Landscape

### Device Variety
- Phones: Various sizes and aspect ratios
- Tablets: 7" to 12"+ screens
- Foldables: Multiple form factors
- Chrome OS: Laptop/desktop
- TV: Large screen, lean-back
- Wear: Tiny, round or square

### The Challenge
Design once, run everywhere. Or design adaptations for key form factors.

## Window Size Classes

### Compact (<600dp width)
Phone-optimised layouts:
- Single column
- Bottom navigation
- Full-width content
- Stacked elements

### Medium (600-840dp width)
Transitional layouts:
- Start showing more content
- Navigation rail possible
- Two columns for some content
- Cards can be larger

### Expanded (>840dp width)
Tablet/desktop layouts:
- Multi-column layouts
- Navigation rail or drawer
- List-detail patterns
- Maximum content density

## Adaptive Patterns

### Navigation Changes
| Compact | Medium | Expanded |
|---------|--------|----------|
| Bottom nav | Navigation rail | Rail or drawer |
| Hamburger menu | Expanded drawer | Permanent drawer |

### Content Changes
| Compact | Medium | Expanded |
|---------|--------|----------|
| Single column | 2 columns | 3+ columns |
| Stacked cards | Grid cards | Grid with filters |
| Full-width images | Sized images | Gallery layouts |

### List-Detail Pattern
Most common adaptive pattern:
- Compact: Separate screens
- Expanded: Side-by-side panels
- Transition: Smooth, not jarring

## Foldable Design

### Fold-Aware Design
- Avoid placing interactive elements on the fold
- Consider half-open postures
- Support different orientations

### Table-Top Mode
Device partially folded, sitting on surface:
- Content above fold
- Controls below fold
- Great for video calls, media

### Continuity
App should work across states:
- Folded → Unfolded
- Portrait → Landscape
- Remember state during transitions

## Multi-Window

### Split Screen
Two apps side by side:
- Your app might be narrow
- Must handle window resizing
- Don't assume full screen

### Picture-in-Picture
Floating video window:
- For video/communication apps
- Minimal controls in PiP
- Expand to full functionality

## Design Deliverables

For comprehensive adaptive design:
1. Compact phone layout
2. Expanded tablet layout
3. Key transition states
4. Documentation of how layouts adapt

## Try It Yourself

### Exercise 1: Adaptive Layout

Design a screen at:
- Compact (phone)
- Expanded (tablet)

Document what changes between them.

### Exercise 2: List-Detail

Design a list-detail pattern:
- Separate screens for compact
- Side-by-side for expanded
- Transition behaviour

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-adaptive-quiz",
  "type": "multiple-choice",
  "title": "Adaptive and Responsive Design",
  "description": "Test your understanding of Android adaptive design.",
  "difficulty": "medium",
  "question": "How does Android categorise different screen sizes for adaptive design?",
  "options": [
    {
      "id": "a",
      "text": "By device model name",
      "isCorrect": false,
      "explanation": "Android uses size-based categories, not device-specific targeting."
    },
    {
      "id": "b",
      "text": "Window size classes: Compact, Medium, and Expanded for width and height",
      "isCorrect": true,
      "explanation": "Correct! Window size classes provide breakpoints for adaptive layouts. Compact is typically phone portrait, Medium is tablet portrait or phone landscape, Expanded is tablet landscape or desktop."
    },
    {
      "id": "c",
      "text": "Small, Normal, Large, and XLarge screen densities",
      "isCorrect": false,
      "explanation": "Those are density qualifiers, not the modern window size classes."
    },
    {
      "id": "d",
      "text": "Phone vs Tablet only",
      "isCorrect": false,
      "explanation": "The distinction is more nuanced with foldables and varying sizes."
    }
  ]
}
-->

## Key Takeaways

- Android runs on diverse devices
- Window size classes define breakpoints
- Navigation and content adapt together
- Foldables need special consideration
- Design key breakpoints, not every size

## Next Steps

Continue to [Android Motion Principles](./03-android-motion-principles.md) →
