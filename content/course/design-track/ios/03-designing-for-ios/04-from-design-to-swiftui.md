# From Design to SwiftUI

> **Quick Summary:** SwiftUI is Apple's declarative UI framework. It is the language developers speak. Understanding how your designs translate to SwiftUI helps you create work that is easier to build and harder to break.

## What You'll Learn

- How designs map to SwiftUI Views
- Translating layout concepts (Stacks vs. Auto Layout)
- Design decisions that help developers
- Preparing designs for handoff

## SwiftUI Fundamentals

SwiftUI builds interfaces by composing small, reusable pieces called **Views**.
```swift
VStack {
    Text("Hello")
    Button("Tap me") { }
}
```
In this code, a Vertical Stack (`VStack`) holds a text label and a button. Everything is a View—text, images, buttons, and even the containers that hold them.

## Layout Translation

### Stacks are the new Auto Layout
In Figma, you use Auto Layout. In SwiftUI, we use Stacks. They map almost perfectly.

**HStack (Horizontal Stack):** Arranges items side-by-side. Equivalent to a Figma Auto Layout row.
**VStack (Vertical Stack):** Arranges items top-to-bottom. Equivalent to a Figma Auto Layout column.
**ZStack (Depth Stack):** Layers items on top of each other (back to front). Equivalent to placing items in a group without Auto Layout.

### Parameters
**Spacing:** The gap between items in a stack. In Figma, this is the "gap" setting.
**Alignment:** How items line up (Leading, Center, Trailing). In Figma, this is the alignment box.

## Components → Views

### Standard Components
Most design components map directly to SwiftUI views:
- **Button** → `Button`
- **Text Input** → `TextField`
- **Switch** → `Toggle`
- **List/Table** → `List`

### Custom Components
When you design a "Card" component in Figma, a developer creates a custom `View` struct for it.
```swift
struct CustomCard: View {
    var body: some View {
        VStack { ... }
    }
}
```
This modularity means you should design your components to be self-contained.

## Design Decisions That Help

### Consistent Spacing
Use a spacing scale (e.g., 4, 8, 16, 24, 32). SwiftUI developers often define these as constants. If you use random values like 13px or 19px, the developer has to hard-code magic numbers, which leads to inconsistent layouts.

### Clear Hierarchy
Group related elements logically.
- A card's contents should be in a specific container.
- A row's text and icon should be grouped.
This structure helps the developer decide where to put the `VStack` and `HStack` containers.

### Named Colours
Never hand off a hex code like `#FF5733`. Define a semantic colour in Figma like `Brand/Primary` or `Status/Error`. The developer can then create a Color Asset in Xcode with the same name, ensuring the colour updates everywhere if you change it later.

## Responsive Design

### Size That Fits
Design elements that expand to fill available space.
- **Fixed Width:** `frame(width: 200)` — Rigid, rarely used for main content.
- **Flexible Width:** `frame(maxWidth: .infinity)` — Fluid, fills the container.

### Flexible Containers
SwiftUI layout is adaptive by default. A text view will grow as you type. A list will scroll if it gets too long. Design your Figma components to demonstrate this behavior (using Auto Layout constraints) so the developer knows how the UI should react to different content lengths.

## Handoff Best Practices

### Annotate Clearly
Don't assume the developer knows your intent.
- **Spacing:** "16pt gap here."
- **Typography:** "Use the `.headline` style."
- **Interaction:** "This row should highlight on tap."

### Group Logically
Organize your Figma layers to match the intended component structure. If your layer tree is a mess of groups and un-named frames, the developer has to reverse-engineer your layout logic.

### Provide Assets
- **Icons:** Export as PDFs or SVGs (for vectors).
- **Images:** Provide @2x and @3x scales if not using vectors.
- **Names:** Name your assets consistently (e.g., `icon_settings_outlined`).

## Try It Yourself

### Exercise 1: SwiftUI Mapping
Take a simple card design. Write out the "pseudo-code" structure:
- VStack
  - Image (Full width)
  - VStack (Padding 16)
    - Text (Headline)
    - Text (Body)
    - HStack
      - Button (Secondary)
      - Spacer
      - Button (Primary)

### Exercise 2: Handoff Document
Prepare a screen for handoff. Annotate every margin, font style, and colour name. Explicitly state which elements should stretch and which should stay fixed.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-handoff-quiz",
  "type": "multiple-choice",
  "title": "From Design to SwiftUI",
  "description": "Test your understanding of iOS design handoff.",
  "difficulty": "easy",
  "question": "What makes handoff to SwiftUI development smoother?",
  "options": [
    {
      "id": "a",
      "text": "Exporting all designs as images for developers to implement",
      "isCorrect": false,
      "explanation": "Images aren't scalable or accessible—native components are preferred."
    },
    {
      "id": "b",
      "text": "Using SF Symbols, Dynamic Type styles, and standard components that map directly to SwiftUI",
      "isCorrect": true,
      "explanation": "Correct! When designs use system resources (SF Symbols, text styles, standard components), developers can implement directly with native SwiftUI equivalents."
    },
    {
      "id": "c",
      "text": "Providing pixel measurements from Figma only",
      "isCorrect": false,
      "explanation": "iOS uses points, not pixels, and semantic styles are more useful than raw measurements."
    },
    {
      "id": "d",
      "text": "Creating separate designs for each iOS version",
      "isCorrect": false,
      "explanation": "Designs should be adaptive; developers handle version compatibility."
    }
  ]
}
-->

## Key Takeaways

- **SwiftUI Views** map closely to Figma frames and Auto Layout.
- **Stacks (VStack, HStack)** are the core layout tool.
- Use **consistent spacing** and **semantic naming** to help developers.
- Design **responsive components** that adapt to content, not just fixed rectangles.
- **Clear annotation** saves hours of back-and-forth.

## Congratulations!

You've completed the iOS Design Track!

**What's Next?**

→ [iOS Engineering Track](../../engineering-track/ios/01-swift-basics/01-introduction-to-swift.md) to learn SwiftUI implementation.
→ [iOS Convergence Track](../../convergence/ios/01-ios-motion-and-animation/01-swiftui-animation.md) for advanced iOS skills.
→ Return to the [Course Overview](/course) to explore other tracks.
