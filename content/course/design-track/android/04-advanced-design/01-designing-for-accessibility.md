# Designing for Accessibility on Android

> **Quick Summary:** Accessible design is inclusive design. Learn how to create Android apps that work seamlessly with TalkBack and other assistive technologies.

## What You'll Learn

- Understanding Android accessibility services
- Designing for TalkBack users
- Creating accessible touch targets
- Using the Accessibility Scanner

<!-- illustration: android-accessibility-focus -->

## Why Accessibility Matters

Accessible design benefits everyone:

- **26% of US adults** have some form of disability
- **Better usability** for all users in various contexts
- **Legal compliance** in many markets
- **Google Play requirements** for quality apps

## Android Accessibility Services

### TalkBack
Android's screen reader:
- Speaks UI elements aloud
- Linear navigation by swiping
- Double-tap to activate
- Explore by touch mode

### Select to Speak
On-demand reading:
- Tap to hear specific content
- Useful for low-vision users
- Works with any visible text

### Switch Access
For users with motor impairments:
- Navigate with external switches
- Scanning mode for selection
- Custom switch configuration

### Magnification
Screen zoom features:
- Triple-tap to zoom
- Pinch to adjust level
- Pan around zoomed screen

## Designing for TalkBack

### Content Descriptions
Every meaningful element needs a description:

**❌ Poor:**
- "Button"
- "Image"
- "Icon"

**✅ Good:**
- "Add to shopping cart"
- "Product photo: Blue running shoes"
- "Navigate back"

### Traversal Order
TalkBack reads elements in order:

1. **Top to bottom, start to end** by default
2. **Group related content** together
3. **Skip decorative elements**
4. **Ensure logical reading sequence**

### Accessibility Actions
Provide alternative interactions:
- Custom actions for complex gestures
- Multiple ways to accomplish tasks
- Clear action labels

### Live Regions
Announce dynamic changes:
- Error messages
- Status updates
- Timer changes
- Content refreshes

## Touch Target Guidelines

### Material Design Minimums
- **48×48 dp** minimum touch target
- Even if visual element is smaller
- Include padding in touch area

### Spacing Requirements
- **8 dp minimum** between targets
- Prevents accidental activation
- Essential for motor accessibility

### Visual vs. Touch Size
The touch target can be larger than the visual element:
- Small icon (24 dp) → Large target (48 dp)
- Invisible padding extends touch area
- Use `android:minWidth` and `android:minHeight`

## Color and Contrast

### WCAG Contrast Requirements
- **4.5:1** ratio for normal text
- **3:1** ratio for large text (18sp+)
- **3:1** ratio for UI components

### Material Design Guidance
- Use surface colours with appropriate text
- Semantic colours maintain contrast
- Test with Android's colour correction

### Color Independence
Never rely on colour alone:
- Add icons to coloured status indicators
- Include text with coloured buttons
- Use patterns in charts and graphs

## Testing Accessibility

### Accessibility Scanner
Google's testing tool:
1. Install from Play Store
2. Enable in Accessibility settings
3. Analyze your screens
4. Review suggestions

### Common Scanner Warnings
- Touch target too small
- Missing content description
- Low text contrast
- Text scaling issues

### Manual TalkBack Testing
1. Enable TalkBack in Settings
2. Navigate your app by swiping
3. Listen to what's announced
4. Verify logical order
5. Test all interactions

### Accessibility Test Framework
Automated testing in development:
- Integrate with Espresso tests
- Catch issues early
- CI/CD integration

## Designing for Text Scaling

### Font Sizes in sp
Use sp (scale-independent pixels):
- Respects user's font size preference
- Scales with system settings
- Essential for accessibility

### Testing at Scale
Test your layouts at:
- Default (100%)
- Large (130%)
- Largest (200%)

### Layout Considerations
- Text may wrap unexpectedly
- Buttons may need more height
- Cards may expand significantly
- Scrolling may become necessary

## Try It Yourself

### Exercise 1: TalkBack Walkthrough

Enable TalkBack and navigate your app:
1. Close your eyes
2. Navigate using swipe gestures
3. Can you complete key tasks?
4. Note any confusing announcements

### Exercise 2: Contrast Audit

Check your colour contrast:
1. Test primary text on background
2. Test secondary text
3. Test buttons and icons
4. Fix any failures below 4.5:1

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-accessibility-quiz",
  "type": "multiple-choice",
  "title": "Android Accessibility",
  "description": "Test your understanding of accessible Android design.",
  "difficulty": "medium",
  "question": "What is the minimum touch target size recommended by Material Design?",
  "options": [
    {
      "id": "a",
      "text": "24×24 dp",
      "isCorrect": false,
      "explanation": "24 dp is the common icon size, but the touch target should be larger."
    },
    {
      "id": "b",
      "text": "36×36 dp",
      "isCorrect": false,
      "explanation": "36 dp is still below the recommended minimum."
    },
    {
      "id": "c",
      "text": "48×48 dp",
      "isCorrect": true,
      "explanation": "Correct! Material Design recommends a minimum touch target of 48×48 dp to ensure all users can comfortably tap interactive elements."
    },
    {
      "id": "d",
      "text": "56×56 dp",
      "isCorrect": false,
      "explanation": "While larger targets are easier to tap, 48×48 dp is the recommended minimum."
    }
  ]
}
-->

## Key Takeaways

- Design for TalkBack with clear content descriptions
- Maintain minimum 48×48 dp touch targets
- Ensure 4.5:1 contrast ratio for text
- Never rely on colour alone to convey information
- Test with Accessibility Scanner and TalkBack

## Next Steps

Continue to [Dark Mode and Dynamic Color](./02-dark-mode-and-dynamic-colour.md) →
