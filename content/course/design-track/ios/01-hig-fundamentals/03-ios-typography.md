# iOS Typography

> **Quick Summary:** iOS typography is built on the San Francisco font family and Dynamic Type system. Understanding both is essential for readable, accessible apps.

## What You'll Learn

- San Francisco font family
- Text styles and hierarchy
- Dynamic Type
- Typography best practices

## San Francisco Font Family

### SF Pro
Primary interface font:
- Clean, modern sans-serif
- Optimized for screens
- Multiple weights (Ultralight to Black)
- Variable font technology

### SF Pro Rounded
Softer alternative:
- Rounded terminals
- Friendlier appearance
- Same weights as SF Pro
- Good for playful contexts

### SF Mono
Monospaced variant:
- For code and technical content
- Tabular figures
- Clear character distinction

### New York
Serif option:
- Editorial and reading contexts
- Variable optical sizes
- Warmer, more traditional feel

## Text Styles

Apple provides semantic text styles:

### Display Styles
- **Large Title:** 34pt, navigation bar titles
- **Title 1:** 28pt, page headings
- **Title 2:** 22pt, section headings
- **Title 3:** 20pt, subsection headings

### Body Styles
- **Headline:** 17pt semibold, emphasized text
- **Body:** 17pt, primary reading text
- **Callout:** 16pt, secondary information
- **Subheadline:** 15pt, supporting text

### Utility Styles
- **Footnote:** 13pt, metadata
- **Caption 1:** 12pt, labels
- **Caption 2:** 11pt, fine print

## Dynamic Type

iOS users can adjust system text size. Your app should respond:

### Size Categories
1. xSmall
2. Small
3. Medium (default)
4. Large
5. xLarge
6. xxLarge
7. xxxLarge
8. Accessibility sizes (5 larger options)

### Implementation
Use system text styles. They scale automatically:
- In design tools: Use iOS text style names
- In code: Use semantic styles, not fixed sizes

### Best Practices
- Test at multiple size categories
- Ensure text doesn't truncate unexpectedly
- Layouts should adapt to larger text
- Use scrollable containers when needed

## Hierarchy and Readability

### Line Length
Optimal: 70-80 characters per line.
- Too long: Hard to track to next line
- Too short: Choppy reading

### Line Height
System styles have appropriate line heights.
- Tighter for headings
- More generous for body text

### Weight for Emphasis
Use weight, not just size:
- Semibold for emphasis
- Regular for body
- Avoid using only size for hierarchy

## Try It Yourself

### Exercise 1: Type Scale

Create a type system using iOS text styles:
- Large title
- Section headers
- Body text
- Captions

### Exercise 2: Dynamic Type Testing

If you have an iOS device, change the text size setting. Open several apps and note which handle it well.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-typography-quiz",
  "type": "multiple-choice",
  "title": "iOS Typography",
  "description": "Test your understanding of iOS type system.",
  "difficulty": "medium",
  "question": "Why should iOS apps use Dynamic Type instead of fixed font sizes?",
  "options": [
    {
      "id": "a",
      "text": "Dynamic Type uses less memory",
      "isCorrect": false,
      "explanation": "Memory isn't the reason—it's about accessibility and user preference."
    },
    {
      "id": "b",
      "text": "It respects user accessibility settings and scales with their preferred text size",
      "isCorrect": true,
      "explanation": "Correct! Dynamic Type lets users set their preferred text size system-wide. Apps that support it automatically adapt, making them accessible to users with vision needs."
    },
    {
      "id": "c",
      "text": "Apple requires it for App Store approval",
      "isCorrect": false,
      "explanation": "It's strongly recommended but not strictly required."
    },
    {
      "id": "d",
      "text": "It makes fonts look better on Retina displays",
      "isCorrect": false,
      "explanation": "Retina rendering is separate from Dynamic Type."
    }
  ]
}
-->

## Key Takeaways

- San Francisco is optimised for Apple devices
- Use semantic text styles, not fixed sizes
- Dynamic Type makes apps accessible
- Test at multiple size categories
- Let system styles handle line height

## Next Steps

Continue to [iOS Color and Materials](./04-ios-color-and-materials.md) →
