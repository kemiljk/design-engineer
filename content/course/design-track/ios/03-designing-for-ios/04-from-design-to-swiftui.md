# From Design to SwiftUI

> **Quick Summary:** SwiftUI is Apple's declarative UI framework. Understanding how your designs translate to SwiftUI helps you create more implementable work.

## What You'll Learn

- How designs map to SwiftUI
- Design decisions that help developers
- Common translation patterns
- Preparing designs for handoff

## SwiftUI Fundamentals

SwiftUI builds interfaces from Views:

```swift
VStack {
    Text("Hello")
    Button("Tap me") { }
}
```

Everything is a View—text, images, buttons, containers.

## Layout Translation

### Stacks = Auto Layout
| Design Concept | SwiftUI |
|----------------|---------|
| Horizontal layout | HStack |
| Vertical layout | VStack |
| Overlapping | ZStack |
| Spacing | spacing parameter |
| Alignment | alignment parameter |

### Auto Layout → SwiftUI

```
Design: Horizontal, centred, 16pt spacing
SwiftUI: HStack(spacing: 16) { ... }

Design: Vertical, leading-aligned
SwiftUI: VStack(alignment: .leading) { ... }
```

## Components → Views

### Standard Components
Most design components map directly:
- Button → Button
- Text Field → TextField
- Toggle → Toggle
- List → List

### Custom Components
Custom designs become custom Views:
```swift
struct CustomCard: View {
    var body: some View {
        VStack { ... }
    }
}
```

## Design Decisions That Help

### Consistent Spacing
Use a spacing scale:
- 4, 8, 12, 16, 20, 24, 32, 40, 48

SwiftUI developers can reference these directly.

### Clear Hierarchy
Group related elements:
- A card's contents are in a VStack
- A row's elements are in an HStack
- Groups have consistent internal spacing

### Named Colors
Use semantic colour names:
- `primary`, `secondary`
- `background`, `surface`
- `accent`, `destructive`

Map to asset catalog colours in Xcode.

### Text Styles
Use iOS text styles:
- `.largeTitle`, `.title`, `.headline`, `.body`
- These map directly to SwiftUI's font modifier

## Responsive Design

### Size That Fits
Design elements that:
- Expand to fill available space
- Have sensible minimum/maximum widths
- Adapt to content changes

### Flexible Containers
```swift
// Takes all available width
Text("Hello").frame(maxWidth: .infinity)

// Fixed width
Text("Hello").frame(width: 200)
```

Specify which approach you intend.

## Handoff Best Practices

### Annotate Clearly
- Spacing values
- Font styles and weights
- Color names/values
- Animation intentions

### Group Logically
Organize frames to match component structure developers will build.

### Document Interactions
- All states (default, pressed, disabled)
- Transitions between states
- Gesture behaviours

### Provide Assets
- Export icons at correct scales
- Provide image assets
- Document any special treatment

## Try It Yourself

### Exercise 1: SwiftUI Mapping

Take a design screen and write pseudo-SwiftUI:
- What stacks are needed?
- What are the spacing values?
- What's the component hierarchy?

### Exercise 2: Handoff Document

Prepare a screen for handoff:
- Annotate all spacing
- Document colours and typography
- Note interactions and states

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

- SwiftUI builds UIs from composable Views
- Stacks (VStack, HStack) = auto layout groups
- Consistent spacing and naming helps translation
- Design with implementation in mind
- Clear annotations make handoff smooth

## Congratulations!

You've completed the iOS Design Track!

**What's Next?**

→ [iOS Engineering Track](../../engineering-track/ios/01-swift-basics/01-introduction-to-swift.md) to learn SwiftUI implementation

→ [iOS Convergence Track](../../convergence/ios/01-ios-motion-and-animation/01-swiftui-animation.md) for advanced iOS skills

→ Return to the [Course Overview](/course) to explore other tracks
