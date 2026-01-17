# Designing for Accessibility on iOS

> **Quick Summary:** Accessible design isn't optional—it's essential. Learn how to design iOS apps that work beautifully with VoiceOver and other assistive technologies, ensuring your product can be used by everyone.

## Why Accessibility Matters

One in four adults has some form of disability. When you design for accessibility, you are not just ticking a legal box. You are reaching over 1 billion people worldwide. You are improving usability for everyone—clear labels and high contrast help tired users just as much as visually impaired ones. And critically, you are following Apple's core values; accessibility is deeply integrated into iOS, and your app should reflect that.

## iOS Accessibility Features

### VoiceOver
VoiceOver is a gesture-based screen reader that lets you enjoy using your iPhone even if you don't see the screen. It speaks interface elements, reading labels, hints, and traits. Users navigate by swiping to move focus and double-tapping to activate. Your job is to ensure the reading order makes sense and every element has a clear description.

### Dynamic Type
This system-wide feature allows users to choose their preferred text size. Text can scale from 82% to 310% of the default size. Your designs must accommodate this—layouts that break when text expands are broken layouts.

### Reduce Motion
For users prone to motion sickness or vertigo, iOS offers a "Reduce Motion" setting. This replaces complex parallax and zoom effects with simple crossfades. You must design alternative transitions for these users.

### Increase Contrast
This setting enhances visual distinction by darkening separators and reducing transparency. It ensures that text stands out sharply against backgrounds.

## Designing for VoiceOver

### Focus Order
VoiceOver reads elements in a logical sequence, typically top-to-bottom, left-to-right. However, you can group related elements so they are read together, reducing swipe fatigue. Ensure that decorative elements are skipped entirely to avoid noise.

### Meaningful Labels
Every interactive control needs a label.
**❌ Poor:** "Button", "Image"
**✅ Good:** "Add to Cart", "Product photo of blue sneakers"

### Accessibility Hints
Hints provide extra context. If the label is "Play," the hint might be "Plays the selected podcast episode." Use these sparingly for complex or non-standard interactions.

### Traits
Traits tell VoiceOver what an element *is*. Is it a Button? A Link? Is it Selected? A trait like "Adjustable" tells the user they can swipe up or down to change a value (like a slider).

## Touch Target Guidelines

### Minimum Sizes
Apple's Human Interface Guidelines are strict: interactive elements must be at least **44x44 points**. This applies even if the visual icon is smaller. Add invisible padding to ensure users with motor impairments (or just large fingers) can tap accurately.

### Spacing
Prevent accidental taps by leaving at least **8 points** between interactive targets. For critical or destructive actions, increase this spacing to prevent catastrophic errors.

## Color and Contrast

### Contrast Ratios
Text must be legible. Follow WCAG guidelines:
- **4.5:1** for normal text.
- **3:1** for large text (18pt+ or 14pt+ bold).
- **3:1** for UI components like inputs and buttons.

### Don't Rely on Colour Alone
Never use colour as the only way to convey information. A red error message might look identical to a grey status text for a colour-blind user. Always pair colour with an icon or a clear text label.

## Designing for Dynamic Type

### Text Must Scale
Your layouts must be fluid. Containers should grow vertically as text expands. Avoid fixed-height rows that clip content.

### Fixed vs. Scaling
Most elements (Body text, labels, buttons) should scale. However, some elements like Tab Bars or Navigation Bars might stay fixed while the content inside them scales or truncates. Images and icons generally do not scale with text, but you should ensure they don't overlap expanding text.

### Testing
Always preview your designs at the **Smallest** size (to check for awkward gaps) and the **Largest Accessibility Size** (to check for breaking layouts).

## Try It Yourself

### Exercise 1: Accessibility Audit
Take a screen you designed. Close your eyes. Describe the screen out loud element by element. Is the order logical? Did you miss anything? This simulates the VoiceOver experience.

### Exercise 2: Contrast Check
Use a plugin like Stark or a web contrast checker. Test your primary text against your background. Test your button text against the button fill. Ensure every pair meets the 4.5:1 ratio.

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

- **Accessibility** benefits everyone and is a core iOS value.
- Design for **VoiceOver** by defining clear labels and logical order.
- Respect the **44pt minimum touch target**.
- Ensure **colour contrast** meets WCAG standards.
- Test your app at **Dynamic Type** extremes.

## Next Steps

Continue to [Dark Mode Design](./02-dark-mode-design.md) →
