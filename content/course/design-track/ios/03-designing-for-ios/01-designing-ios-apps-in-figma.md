# Designing iOS Apps in Figma

> **Quick Summary:** Figma is the primary design tool for most teams. Learn how to set up files and use resources specifically for iOS design.

## What You'll Learn

- iOS design file setup
- Using iOS UI kits
- SF Symbols in Figma
- Device frames and presentation

## File Setup

### Frame Sizes
Start with common iPhone sizes:
- iPhone 15/16: 393×852
- iPhone 15/16 Pro Max: 430×932
- iPhone SE: 375×667

### Page Organization
```
📄 Cover
📄 Components
📄 Screens - Home
📄 Screens - Detail
📄 Screens - Settings
📄 Prototypes
📄 Archive
```

### Grid System
iOS uses an 8pt grid. Set up layout grids:
- 16pt margins
- 8pt or 16pt gutters
- Flexible columns

## iOS UI Kits

### Apple's Official Resources
Apple provides official design resources:
- Figma iOS 18 UI Kit (free from Apple)
- Includes all standard components
- Regularly updated with each iOS release

### What's Included
- Navigation bars
- Tab bars
- Lists and cells
- Buttons and controls
- System colors
- Device frames

### Using UI Kit Components
1. Import the kit as a library
2. Use instances, not copies
3. Customize via properties
4. Keep linked for updates

## SF Symbols

Apple's icon system with 6,000+ symbols (SF Symbols 6):

### Adding to Figma
- Download SF Symbols app (Mac)
- Export SVGs or copy to Figma
- Use SF Symbols plugin for direct access

### Symbol Variants
- Weights: Ultralight to Black
- Scales: Small, Medium, Large
- Rendering modes: Monochrome, Hierarchical, Palette, Multicolor

### Best Practices
- Use appropriate weight for context
- Match symbol weight to text weight
- Use semantic symbols when available

## Typography Setup

### Font Files
SF Pro isn't in Figma by default:
- Download from Apple Developer
- Install locally
- Use in your files

### Text Styles
Create styles matching iOS text styles:
- Large Title: SF Pro, 34pt, Bold
- Title 1: SF Pro, 28pt, Bold
- Title 2: SF Pro, 22pt, Bold
- Body: SF Pro, 17pt, Regular
- Caption 1: SF Pro, 12pt, Regular

## Color Styles

Create semantic color styles:
- Label, Secondary Label, Tertiary Label
- System Background, Grouped Background
- System colors (Blue, Green, Red, etc.)
- Create light and dark mode versions

## Device Frames

### For Presentation
- Use device mockups for stakeholder presentations
- Show apps in context
- Multiple devices show responsiveness

### For Design Work
- Work without frames for flexibility
- Add frames for final presentation
- Consider notch/Dynamic Island

## Try It Yourself

### Exercise 1: File Setup

Create a new Figma file with:
- Correct frame sizes
- Layout grid configured
- Apple UI kit linked
- Text styles created

### Exercise 2: First Screen

Design a simple iOS screen using:
- UI kit navigation bar
- SF Symbols for icons
- System colors
- Proper text styles

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-figma-quiz",
  "type": "multiple-choice",
  "title": "Designing iOS Apps in Figma",
  "description": "Test your understanding of iOS design production.",
  "difficulty": "easy",
  "question": "When designing iOS apps in Figma, what unit should you use for measurements?",
  "options": [
    {
      "id": "a",
      "text": "Pixels (px)",
      "isCorrect": false,
      "explanation": "iOS uses points which are device-independent."
    },
    {
      "id": "b",
      "text": "Points (pt) at 1x scale",
      "isCorrect": true,
      "explanation": "Correct! Design at 1x scale using points. A point is 1px on standard displays, 2px on Retina, 3px on iPhone Plus/Max models. This keeps designs device-independent."
    },
    {
      "id": "c",
      "text": "Percentage values only",
      "isCorrect": false,
      "explanation": "While percentages are used for some layouts, fixed measurements use points."
    },
    {
      "id": "d",
      "text": "Design at 3x for the highest resolution devices",
      "isCorrect": false,
      "explanation": "Design at 1x—export at multiple scales. This makes measurements intuitive."
    }
  ]
}
-->

## Key Takeaways

- Start with correct device dimensions
- Use Apple's official UI kit
- SF Symbols provide consistent iconography
- Set up semantic text and color styles
- Device frames are for presentation, not daily design

## Next Steps

Continue to [Adaptive Layouts](./02-adaptive-layouts.md) →
