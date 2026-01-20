# iOS Typography

> **Quick Summary:** iOS typography is built on the San Francisco font family and Dynamic Type system. Understanding both is essential for readable, accessible apps.

## What You'll Learn

- San Francisco font family
- Text styles and hierarchy
- Dynamic Type
- Typography best practices

## San Francisco Font Family

Apple designed San Francisco (SF) specifically for its platforms. It is a modern, clean sans-serif typeface optimized for legibility on screens. The family includes several variants tailored for specific contexts.

**SF Pro** is the primary interface font. It is highly versatile, supporting a wide range of weights from Ultralight to Black. It uses variable font technology to adjust optical sizing automatically, ensuring that small text remains legible while large headlines look elegant.

**SF Pro Rounded** offers a softer, friendlier alternative. It shares the same weights and metrics as SF Pro but features rounded terminals. This variant works well in playful or casual contexts, such as fitness apps or games.

**SF Mono** is the monospaced variant, designed for code, technical content, and tabular data. It ensures clear character distinction and alignment, making it perfect for displaying snippets or data-heavy interfaces.

**New York** is a serif companion to San Francisco. It provides a more traditional, editorial feel, making it an excellent choice for reading apps or contexts that require a touch of elegance. Like SF Pro, it features variable optical sizes to maintain readability at any scale.

## Text Styles

Apple provides a set of semantic text styles that establish a clear visual hierarchy. Using these styles ensures consistency with the system and automatic support for Dynamic Type.

### Display Styles

Display styles are reserved for the most prominent text on the screen. **Large Title** (34pt) is the standard for navigation bar titles in their expanded state. **Title 1** (28pt) typically serves as the main page heading, while **Title 2** (22pt) and **Title 3** (20pt) break content into logical sections and subsections.

### Body Styles

The **Body** style (17pt) is the workhorse of iOS typography, used for the majority of reading text. **Headline** (17pt semibold) pairs with Body to emphasize key points or start paragraphs. **Callout** (16pt) distinguishes secondary information, and **Subheadline** (15pt) provides supporting context.

### Utility Styles

For metadata and fine print, use the utility styles. **Footnote** (13pt) works well for timestamps or disclaimers. **Caption 1** (12pt) and **Caption 2** (11pt) are the smallest legible sizes, suitable for labels on tab bars or intricate UI elements.

## Dynamic Type

One of the most powerful features of iOS typography is Dynamic Type. It allows users to adjust their preferred text size system-wide, and your app must respond accordingly.

### How It Works

The system defines a range of size categories, from xSmall to xxxLarge, with Medium being the default. Additionally, there are five Accessibility sizes that push the text even larger. When a user changes their settings, apps that use semantic text styles (like `.body` or `.headline`) scale their text automatically.

### Implementation Best Practices

To support Dynamic Type effectively, avoid defining fixed font sizes in your code. Instead, rely on the system styles. In your design tools, use the iOS text style names to ensure your mockups match reality.

Layouts must be flexible. Containers should be able to expand vertically as text grows. If a label is constrained to a single line, it will truncate at larger sizes, breaking the user experience. Always test your designs at the largest standard size (xxxLarge) and the largest accessibility size to ensure your content remains readable and accessible.

## Hierarchy and Readability

### Line Length

Readable text requires a comfortable line length, typically between 70 and 80 characters. If the line is too long, the eye struggles to track back to the start of the next line. If it's too short, the reading rhythm becomes choppy.

### Line Height and Weight

System text styles come with baked-in line heights that are optimized for readability—tighter for headings and more generous for body text. Use font weight to establish hierarchy rather than relying solely on size. A **Semibold** weight can draw attention to a headline without needing to be significantly larger than the surrounding text.

## Try It Yourself

### Exercise 1: Type Scale

Create a type system for a mock news app using only iOS semantic styles. Assign appropriate styles to the article headline, author byline, body text, and image captions. Notice how the hierarchy forms naturally without custom sizing.

### Exercise 2: Dynamic Type Testing

If you have an iOS device, go to **Settings > Display & Brightness > Text Size** and change the slider to the maximum. Open several popular apps and observe how they handle the change. Which ones break? Which ones adapt gracefully?

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

Building accessible apps requires using the **San Francisco** typeface—tailored for legibility across all Apple devices—and leveraging **Semantic Text Styles** like Body and Title 1. These building blocks enable **Dynamic Type** support, allowing layouts to adapt fluidly to user font preferences and avoiding the pitfalls of fixed-size text and content truncation.

## Next Steps

Continue to [iOS Colour and Materials](./04-ios-color-and-materials.md) →
