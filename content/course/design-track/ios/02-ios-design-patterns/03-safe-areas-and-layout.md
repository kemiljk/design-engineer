# Safe Areas and Layout

> **Quick Summary:** iOS devices have various screen shapes and sizes. Safe areas ensure your content is always visible and interactive.

## What You'll Learn

- What safe areas are
- Device variations
- Layout best practices
- Designing for all iPhones

## Understanding Safe Areas

Safe areas define where content should go to avoid:
- The notch/Dynamic Island
- Home indicator
- Rounded corners
- Status bar

## Safe Area Insets

### Top Safe Area
- Status bar height
- Additional inset for notch/Dynamic Island
- Varies by device

### Bottom Safe Area
- Home indicator space
- Zero on devices with home button
- ~34pt on Face ID devices

### Side Safe Areas
- Usually zero in portrait
- Significant in landscape (notch moves to side)

## Device Variations

### Screen Sizes
- iPhone SE: 375×667 pt
- iPhone 15/16: 393×852 pt
- iPhone 15/16 Pro Max: 430×932 pt

### Notch/Dynamic Island
- No notch: iPhone SE
- Notch: iPhone 12-13
- Dynamic Island: iPhone 14 Pro and later (including all iPhone 15/16 models)

### Home Indicator
- Home button devices: None
- Face ID devices: Always present

## Layout Guidelines

### Full Width Content
Let content go edge-to-edge, but keep text/controls in safe areas:

```
┌─────────────────────┐
│    [Status Bar]     │ ← Outside safe area
├─────────────────────┤
│                     │
│   Safe Content      │ ← Inside safe area
│                     │
├─────────────────────┤
│    [Home Bar]       │ ← Outside safe area
└─────────────────────┘
```

### Tab Bars and Toolbars
- Background extends to screen edge
- Buttons stay in safe area
- System components handle this automatically

### Lists and Scrolling
- Content scrolls behind navigation
- Last item has bottom padding
- Pull-to-refresh works naturally

## Orientation

### Portrait
- Primary orientation for most apps
- Safe areas top and bottom

### Landscape
- Safe areas on sides (for notch)
- Less vertical space
- Consider what's truly needed in landscape

## Designing for All Devices

### Flexibility
- Use auto layout in design tools
- Test at multiple sizes
- Don't assume specific dimensions

### Testing
- iPhone SE (smallest)
- Standard iPhone
- Pro Max (largest)
- Check both orientations

## Try It Yourself

### Exercise 1: Safe Area Overlay

Create a design at multiple device sizes. Ensure safe areas are respected.

### Exercise 2: Edge-to-Edge

Design a photo viewer that goes edge-to-edge while keeping controls in safe areas.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-safe-areas-quiz",
  "type": "multiple-choice",
  "title": "Safe Areas and Layout",
  "description": "Test your understanding of iOS safe areas.",
  "difficulty": "medium",
  "question": "What is the purpose of safe areas in iOS?",
  "options": [
    {
      "id": "a",
      "text": "To ensure content is visible and interactive away from hardware elements like notches and home indicators",
      "isCorrect": true,
      "explanation": "Correct! Safe areas protect interactive content from being obscured by the Dynamic Island, home indicator, rounded corners, and other hardware features."
    },
    {
      "id": "b",
      "text": "To add mandatory margins around all content",
      "isCorrect": false,
      "explanation": "Not all content needs to respect safe areas—full-bleed images often extend beyond them."
    },
    {
      "id": "c",
      "text": "To prevent users from accidentally closing the app",
      "isCorrect": false,
      "explanation": "Safe areas are about visibility, not preventing accidental gestures."
    },
    {
      "id": "d",
      "text": "They're only needed for older iPhone models",
      "isCorrect": false,
      "explanation": "All modern iPhones with notches or Dynamic Island need safe area consideration."
    }
  ]
}
-->

## Key Takeaways

- Safe areas protect content from notches and home indicators
- Different devices have different safe area insets
- Content can extend to edges; controls stay in safe areas
- Test designs at multiple device sizes
- System components handle safe areas automatically

## Next Steps

Continue to [Widgets and Extensions](./04-widgets-and-extensions.md) →
