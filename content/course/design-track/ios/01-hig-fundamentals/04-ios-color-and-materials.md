# iOS Color and Materials

> **Quick Summary:** iOS uses system colours that adapt to appearance modes and accessibility settings, plus translucent materials that create depth.

## What You'll Learn

- System colours and semantic colours
- Dark mode considerations
- Materials and blur effects
- Designing for accessibility

## System Colors

Apple provides semantic colours that adapt automatically:

### UI Element Colors
- **Label:** Primary text
- **Secondary Label:** Less prominent text
- **Tertiary Label:** Disabled or placeholder text
- **Separator:** Divider lines
- **Background:** View backgrounds

### Accent Colors
- **System Blue:** Links, buttons
- **System Green:** Success, positive
- **System Red:** Destructive, errors
- **System Orange:** Warnings
- **System Yellow:** Highlights
- **System Pink, Purple, Teal, Indigo:** Various accents

### Why System Colors?
- Automatically adapt to light/dark mode
- Respond to accessibility settings
- Maintain consistency across iOS
- Future-proof for new modes

## Dark Mode

iOS apps should support both light and dark appearance:

### What Changes
- Background colours invert
- Text colours adjust
- System colours adapt
- Elevation changes meaning

### Design Considerations
- Don't just invert colours
- Reduce contrast slightly in dark mode
- Elevated surfaces get lighter (not darker)
- Test both modes throughout design

### Elevation in Dark Mode
| Light Mode | Dark Mode |
|------------|-----------|
| Higher = more shadow | Higher = lighter background |
| Base is white | Base is near-black |

## Materials

Translucent, blurred backgrounds:

### Material Types
- **Ultra Thin:** Most transparent
- **Thin:** Subtle blur
- **Regular:** Balanced
- **Thick:** More opaque
- **Chrome:** For bars and toolbars

### When to Use Materials
- Navigation bars
- Tab bars
- Sheets and popovers
- Cards over rich backgrounds

### Effect
- Shows content underneath (blurred)
- Creates visual depth
- Maintains context
- Feels lightweight

## Vibrancy

Text and symbols can interact with materials:

### Vibrancy Types
- **Label:** Primary text on materials
- **Secondary Label:** Less prominent
- **Tertiary Label:** Even more subtle
- **Separator:** Divider lines

Vibrant content appears to be part of the underlying material.

## Accessibility

### Color Contrast
System colours maintain accessible contrast.
Custom colours must meet:
- 4.5:1 for normal text
- 3:1 for large text

### Increase Contrast
iOS has an "Increase Contrast" setting:
- System colours respond automatically
- Test your app with this enabled

### Don't Rely on Color Alone
Pair colour with:
- Icons
- Text labels
- Patterns or shapes

## Try It Yourself

### Exercise 1: Color Palette

Create a colour palette using system colours:
- Background colours
- Text colours
- Accent colours
- Ensure both modes work

### Exercise 2: Material Exploration

In Figma or Sketch, experiment with material effects over different background images.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-materials-quiz",
  "type": "multiple-choice",
  "title": "iOS Colors and Materials",
  "description": "Test your understanding of iOS visual system.",
  "difficulty": "medium",
  "question": "What are 'materials' in iOS design?",
  "options": [
    {
      "id": "a",
      "text": "Solid background colours for containers",
      "isCorrect": false,
      "explanation": "Materials are more sophisticated than simple solid colours."
    },
    {
      "id": "b",
      "text": "Translucent surfaces with blur effects that show depth and context",
      "isCorrect": true,
      "explanation": "Correct! iOS materials are semi-transparent layers with blur (vibrancy) that let underlying content show through, creating depth and context while maintaining legibility."
    },
    {
      "id": "c",
      "text": "Textures that mimic real-world surfaces",
      "isCorrect": false,
      "explanation": "That's skeuomorphism. iOS materials are about translucency and depth, not texture simulation."
    },
    {
      "id": "d",
      "text": "The colour palette used for icons",
      "isCorrect": false,
      "explanation": "Materials are about surface treatments, not icon colours."
    }
  ]
}
-->

## Key Takeaways

- Use semantic system colours for automatic adaptation
- Design for both light and dark modes
- Materials create depth through translucency
- Elevated surfaces behave differently in each mode
- Always consider accessibility

## Congratulations!

You've completed the HIG Fundamentals module!

Continue to [iOS Design Patterns: Standard UI Components](../02-ios-design-patterns/01-standard-ui-components.md) →
