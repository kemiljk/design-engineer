# Designing for Accessibility on iOS

> **Quick Summary:** Accessible design isn't optional—it's essential. Learn how to design iOS apps that work beautifully with VoiceOver and other assistive technologies.

## What You'll Learn

- Understanding iOS accessibility features
- Designing for VoiceOver users
- Creating accessible touch targets
- Testing accessibility in your designs

<!-- illustration: ios-accessibility-focus -->

## Why Accessibility Matters

One in four adults has some form of disability. When you design for accessibility, you're:

- **Reaching more users:** Over 1 billion people worldwide
- **Improving usability for everyone:** Clear labels help all users
- **Meeting legal requirements:** Many regions require accessible apps
- **Following Apple's values:** Accessibility is core to iOS

## iOS Accessibility Features

### VoiceOver
Screen reader that speaks interface elements:
- Reads labels, hints, and traits
- Users navigate by swiping
- Double-tap to activate elements
- Rotor for quick navigation

### Dynamic Type
System-wide text size adjustment:
- Users choose their preferred size
- Text scales from 82% to 310%
- Your designs must accommodate this

### Reduce Motion
For users sensitive to animation:
- Disables parallax effects
- Simplifies transitions
- Crossfade replaces zoom

### Increase Contrast
Enhanced visual distinction:
- Darker separators
- Less transparency
- Stronger text contrast

## Designing for VoiceOver

### Focus Order
Elements are read in a logical sequence:

1. **Top to bottom, left to right** (by default)
2. **Group related elements** together
3. **Skip decorative elements**
4. **Ensure all interactive elements are reachable**

### Meaningful Labels
Every control needs a clear label:

**❌ Poor:** "Button", "Image"
**✅ Good:** "Add to Cart", "Product photo of blue sneakers"

### Accessibility Hints
Provide additional context when needed:

**Label:** "Play"
**Hint:** "Plays the selected podcast episode"

### Traits
Tell VoiceOver what type of element it is:
- Button
- Link
- Header
- Selected/Not Selected
- Adjustable (sliders)

## Touch Target Guidelines

### Minimum Sizes
Apple's Human Interface Guidelines specify:
- **44×44 points** minimum touch target
- Even if visual element is smaller
- Padding counts toward touch area

### Spacing Between Targets
Prevent accidental taps:
- **8 points minimum** between targets
- More space for critical actions
- Consider motor impairments

## Color and Contrast

### Contrast Ratios
WCAG guidelines for text:
- **4.5:1** for normal text
- **3:1** for large text (18pt+ or 14pt+ bold)
- **3:1** for UI components

### Don't Rely on Color Alone
Always pair colour with another indicator:
- Icons alongside coloured status
- Text labels with coloured buttons
- Patterns with coloured charts

## Designing for Dynamic Type

### Text Must Scale
Your layouts should handle:
- Extra small to accessibility XXL
- Text wrapping and truncation
- Responsive spacing

### Fixed vs. Scaling Elements
- **Scale:** Body text, labels, buttons
- **Consider:** Navigation, headers
- **Careful:** Icons, images

### Testing at Extreme Sizes
Always preview designs at:
- Smallest size (for density)
- Largest size (for accessibility)

## Try It Yourself

### Exercise 1: Accessibility Audit

Take a screen from your current project:
1. Close your eyes and imagine using VoiceOver
2. What would be read first? Last?
3. Are all actions clearly labelled?
4. Is the focus order logical?

### Exercise 2: Contrast Check

Using a contrast checker tool:
1. Test your primary text colour
2. Test your secondary text colour
3. Test button text against button background
4. Ensure all meet minimum ratios

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-accessibility-quiz",
  "type": "multiple-choice",
  "title": "iOS Accessibility",
  "description": "Test your understanding of accessible iOS design.",
  "difficulty": "medium",
  "question": "What is the minimum recommended touch target size for iOS apps?",
  "options": [
    {
      "id": "a",
      "text": "24×24 points",
      "isCorrect": false,
      "explanation": "24 points is too small and would be difficult for many users to tap accurately."
    },
    {
      "id": "b",
      "text": "44×44 points",
      "isCorrect": true,
      "explanation": "Correct! Apple's Human Interface Guidelines recommend a minimum of 44×44 points to ensure comfortable tapping for all users."
    },
    {
      "id": "c",
      "text": "60×60 points",
      "isCorrect": false,
      "explanation": "While larger targets are easier to tap, 44×44 is the recommended minimum."
    },
    {
      "id": "d",
      "text": "32×32 points",
      "isCorrect": false,
      "explanation": "32 points is below the recommended minimum and may cause usability issues."
    }
  ]
}
-->

## Key Takeaways

- Accessibility benefits everyone, not just users with disabilities
- Design for VoiceOver with clear labels and logical focus order
- Maintain minimum 44×44pt touch targets
- Ensure sufficient colour contrast (4.5:1 for text)
- Test at all Dynamic Type sizes

## Next Steps

Continue to [Dark Mode Design](./02-dark-mode-design.md) →
