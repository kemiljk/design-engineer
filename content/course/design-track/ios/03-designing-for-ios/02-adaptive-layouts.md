# Adaptive Layouts

> **Quick Summary:** iOS runs on many device sizes, from iPhone SE to iPad Pro. Adaptive layouts ensure your design works everywhere.

## What You'll Learn

- Size classes
- iPhone vs. iPad design
- Multitasking on iPad
- Designing adaptable interfaces

## Size Classes

iOS uses size classes to describe available space:

### Horizontal Size Class
- **Compact:** iPhones in portrait, iPad Split View
- **Regular:** iPad, iPhones in landscape (larger models)

### Vertical Size Class
- **Compact:** iPhones in landscape
- **Regular:** iPhones in portrait, iPad

### Common Combinations
| Device | Portrait | Landscape |
|--------|----------|-----------|
| iPhone SE | Compact × Regular | Compact × Compact |
| iPhone 15 | Compact × Regular | Compact × Compact |
| iPhone 15 Pro Max | Compact × Regular | Regular × Compact |
| iPad | Regular × Regular | Regular × Regular |

## iPhone Design

### Portrait (Primary)
- Full-width layouts
- Stacked navigation
- Tab bars visible
- Most common usage

### Landscape
- Consider if needed
- Media apps benefit
- Games often require
- Many apps lock to portrait

## iPad Design

### Key Differences
- More space = different layouts
- Sidebar navigation common
- Split views for master-detail
- Multiple columns possible

### Layout Patterns
- **Full Screen:** Some content (media, documents)
- **Split View:** Master-detail pattern
- **Column Layout:** Dashboard, email-style apps

## iPad Multitasking

Users can run multiple apps simultaneously:

### Split View
Two apps side by side:
- 50/50 split
- 70/30 split
- Your app could be either size

### Slide Over
Floating app panel:
- iPhone-width interface
- Floats over full-screen app

### Design Implications
- Test at all multitasking sizes
- Layouts must be flexible
- Don't assume full screen

## Designing Adaptively

### In Figma
Design for key breakpoints:
1. iPhone SE (smallest)
2. Standard iPhone
3. iPhone Pro Max
4. iPad (full width)
5. iPad (split view)

### Flexible Components
- Use auto layout extensively
- Define min/max widths
- Create responsive variants
- Document adaptation rules

### What Changes
- Number of columns
- Navigation style (tabs vs. sidebar)
- Image sizes
- Information density

### What Stays Same
- Brand identity
- Core interactions
- Information hierarchy
- Typography scale

## Try It Yourself

### Exercise 1: Adaptive Screen

Design a screen that works at:
- iPhone width
- iPad split view
- iPad full width

Document what changes at each breakpoint.

### Exercise 2: Navigation Shift

Design a navigation pattern that uses:
- Tab bar on iPhone
- Sidebar on iPad

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-adaptive-quiz",
  "type": "multiple-choice",
  "title": "Adaptive Layouts",
  "description": "Test your understanding of iOS adaptive design.",
  "difficulty": "medium",
  "question": "How does iOS handle different screen sizes (iPhone vs iPad)?",
  "options": [
    {
      "id": "a",
      "text": "Separate app designs are required for each device",
      "isCorrect": false,
      "explanation": "iOS supports universal apps with adaptive layouts."
    },
    {
      "id": "b",
      "text": "Size Classes (Compact/Regular) let layouts adapt to different width and height environments",
      "isCorrect": true,
      "explanation": "Correct! Size Classes indicate available space. iPhone portrait is Compact width; iPad is Regular width. Layouts adapt based on these traits rather than specific device detection."
    },
    {
      "id": "c",
      "text": "iPad just scales up iPhone designs automatically",
      "isCorrect": false,
      "explanation": "Simply scaling up wastes iPad space. Adaptive layouts take advantage of the larger canvas."
    },
    {
      "id": "d",
      "text": "Only iPad Pro supports adaptive layouts",
      "isCorrect": false,
      "explanation": "All iOS devices support adaptive layouts through Size Classes."
    }
  ]
}
-->

## Key Takeaways

- Size classes describe available space
- iPad requires different layout strategies
- Design for multitasking sizes
- Create flexible, adaptable components
- Test at multiple sizes

## Next Steps

Continue to [iOS Animation Principles](./03-ios-animation-principles.md) →
