# Touch and Gestures

> **Quick Summary:** iOS is built for touch. Understanding gestures and designing for fingers (not cursors) is essential for natural-feeling apps.

## What You'll Learn

- Standard iOS gestures
- Touch target sizing
- Designing for fingers
- Haptic feedback

## Standard Gestures

### Tap
- Primary selection/activation
- Expected everywhere
- Clear feedback required

### Long Press
- Secondary actions
- Context menus
- Preview content

### Swipe
- Navigate back (edge swipe)
- List actions
- Delete, archive, etc.

### Scroll
- Move through content
- Pull to refresh
- Momentum scrolling

### Pinch
- Zoom in/out
- Photos, maps, documents

### Rotate
- Rotate content
- Usually paired with pinch

### Drag
- Move items
- Reorder lists
- Drag and drop

## Touch Targets

### Minimum Size
- 44×44 points minimum
- Even if visual element is smaller
- Especially important for icons

### Spacing
- Adequate gaps between targets
- Prevent accidental taps
- More space = fewer errors

### Thumb Zones
Consider one-handed use:
- Bottom of screen: Easy reach
- Top of screen: Hard to reach
- Edges: Can be awkward

## Designing for Fingers

### Precision
Fingers are imprecise compared to cursors:
- Larger targets
- Forgiving hit areas
- Clear feedback

### Occlusion
Finger covers what you're touching:
- Show feedback above finger
- Preview before commit
- Consider touch location

### No Hover State
Touch has no hover:
- States: Default, Pressed, Selected
- Don't hide information in hover
- Make affordances obvious

## Haptic Feedback

iOS devices provide tactile feedback:

### Feedback Types
- **Selection:** Light tick when selecting
- **Impact:** Physical tap sensation
- **Notification:** Success, warning, error

### When to Use
- Confirming actions
- Reinforcing interactions
- Indicating state changes
- Adding polish and delight

### Best Practices
- Subtle, not overwhelming
- Meaningful, not gratuitous
- Consistent with visual feedback

## Try It Yourself

### Exercise 1: Gesture Map

Map all gestures in a complex app. Which are standard? Which are custom?

### Exercise 2: Touch Target Audit

Check your designs against the 44pt minimum. Are all targets reachable?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-touch-quiz",
  "type": "multiple-choice",
  "title": "Touch and Gestures",
  "description": "Test your understanding of iOS touch interactions.",
  "difficulty": "easy",
  "question": "What is the minimum recommended touch target size for iOS?",
  "options": [
    {
      "id": "a",
      "text": "24x24 points",
      "isCorrect": false,
      "explanation": "This is too small for comfortable tapping."
    },
    {
      "id": "b",
      "text": "44x44 points",
      "isCorrect": true,
      "explanation": "Correct! Apple recommends at least 44x44pt for touch targets. This ensures comfortable tapping without accidental triggers on nearby elements."
    },
    {
      "id": "c",
      "text": "64x64 points",
      "isCorrect": false,
      "explanation": "This is larger than necessary—44pt is the minimum."
    },
    {
      "id": "d",
      "text": "There's no standard, it depends on the app",
      "isCorrect": false,
      "explanation": "Apple provides specific guidance on minimum touch target sizes."
    }
  ]
}
-->

## Key Takeaways

- Standard gestures set user expectations
- 44×44 points is the minimum touch target
- Design for finger imprecision and occlusion
- No hover state on touch devices
- Haptics add polish when used thoughtfully

## Next Steps

Continue to [Safe Areas and Layout](./03-safe-areas-and-layout.md) →
