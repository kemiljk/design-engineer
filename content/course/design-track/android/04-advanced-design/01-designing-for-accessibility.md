# Designing for Accessibility on Android

> **Quick Summary:** Accessible design is inclusive design. Learn how to create Android apps that work seamlessly with TalkBack and other assistive technologies, ensuring your app can be used by anyone, anywhere.

## Why Accessibility Matters

Accessible design isn't just about charity or compliance; it's about making a better product. Over **26% of US adults** live with some form of disability. When you design for accessibility, you improve usability for everyone—large touch targets help users with motor impairments *and* users carrying groceries. High contrast helps users with low vision *and* users in bright sunlight. Google Play also boosts the discoverability of high-quality, accessible apps.

## Android Accessibility Services

Android offers a robust suite of tools that change how users interact with their devices.

**TalkBack** is Android's screen reader. It speaks UI elements aloud, allowing users to navigate without seeing the screen. Users swipe to move focus linearly and double-tap anywhere on the screen to activate the focused element.

**Select to Speak** is for users who can see the screen but might struggle with reading small text. They tap a specific paragraph or button to hear it read aloud.

**Switch Access** allows users with limited mobility to control their phone using external switches (like a button or a puff-sip device) instead of the touch screen.

**Magnification** lets users zoom in on the screen to see details, requiring high-resolution assets that don't blur when enlarged.

## Designing for TalkBack

Designing for a screen reader means designing the *structure* of your content, not just the pixels.

### Content Descriptions
Every meaningful element needs a description.
**❌ Poor:** "Button", "Image", "Icon"
**✅ Good:** "Add to shopping cart", "Product photo: Blue running shoes", "Navigate back"

### Traversal Order
TalkBack reads elements in a linear sequence. By default, this is top-to-bottom, left-to-right (in LTR languages). You must ensure this order makes logical sense. Group related content (like a profile photo and name) so they are read as a single item ("Profile: Alice Smith") rather than two disjointed ones.

### Accessibility Actions
For complex interactions (like "swipe to delete"), provide a custom accessibility action. TalkBack can announce "Double-tap to open, double-tap and hold for more options," giving users a clear path to functionality that might otherwise be hidden behind a gesture.

## Touch Target Guidelines

### Minimum Sizes
Material Design guidelines are clear: interactive elements must be at least **48x48 dp**. This is slightly larger than iOS's 44pt standard. If your visual icon is smaller (e.g., 24dp), you must add invisible padding around it to meet this requirement.

### Spacing
Leave at least **8dp** between interactive targets. Tightly packed buttons are a nightmare for users with tremors or motor impairments, leading to frustrating accidental clicks.

## Colour and Contrast

### Contrast Ratios
To meet WCAG 2.1 standards, you must ensure a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18sp+). Essential UI components, such as icons and input borders, should also maintain a minimum 3:1 ratio.

### Colour Independence
Never use colour as the only signal. A green circle and a red circle look identical to someone with red-green colour blindness. Always use a secondary cue like an icon (check vs. X) or a text label.

## Testing Accessibility

### Accessibility Scanner
Google provides a free tool called the **Accessibility Scanner**. You open your app, tap the scanner button, and it analyzes the screen. It highlights touch targets that are too small, text with low contrast, and missing content descriptions. It is an essential first pass for any designer.

### Manual TalkBack Testing
The best test is reality. Enable TalkBack in your settings. Close your eyes. Try to navigate your app. Can you complete the primary user flow? If you get stuck or confused, your design needs work.

## Designing for Text Scaling

### Use `sp` for Text
Always specify font sizes in **sp** (scale-independent pixels), not dp or px. This allows the text to scale up when the user adjusts their system font size setting.

### Layout Considerations
Your layout must be flexible. What happens if the user sets the font size to 200%?
You must allow containers to expand vertically and wrap text to multiple lines rather than truncating it, avoiding fixed-height containers that clip content when scaled.

## Try It Yourself

### Exercise 1: TalkBack Walkthrough
Enable TalkBack. Navigate to the "Settings" app on your phone to learn the gestures. Now open your own design (if prototyped) or a similar app. Close your eyes. Can you navigate? Note every time the spoken description is confusing or missing.

Take a screenshot of your app and run it through a colour blindness simulator like Sim Daltonism on Mac. Determine if you can still clearly distinguish error states from success states without relying on hue alone.

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

Accessibility is fundamentally about structure and clarity rather than mere compliance, requiring descriptive labels and logical grouping for TalkBack users. With a mandatory 48dp minimum for touch targets and strict adherence to WCAG contrast standards, your design must also support mandatory text scaling through sp units to avoid breaking the experience when users adjust their system settings.

## Next Steps

Continue to [Dark Mode and Dynamic Colour](./02-dark-mode-and-dynamic-colour.md) →
