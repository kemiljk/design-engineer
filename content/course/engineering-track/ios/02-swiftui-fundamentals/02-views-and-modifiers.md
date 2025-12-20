# Views and Modifiers

> **Quick Summary:** Modifiers transform views in SwiftUI. Understanding how they chain and order matters is essential.

## What You'll Learn

- How modifiers work
- Common modifiers
- Modifier order matters
- Creating custom modifiers

## How Modifiers Work

Each modifier returns a new view:
```swift
Text("Hello")           // Text view
    .padding()          // Returns modified view
    .background(.blue)  // Returns another modified view
```

Modifiers wrap views in new views.

## Common Modifiers

### Text Modifiers
```swift
Text("Styled")
    .font(.headline)
    .fontWeight(.bold)
    .foregroundColor(.primary)
    .lineLimit(2)
    .multilineTextAlignment(.center)
```

### Layout Modifiers
```swift
Text("Padded")
    .padding()                    // All sides
    .padding(.horizontal, 20)     // Horizontal only
    .padding(.top, 10)           // Top only
```

### Frame Modifiers
```swift
Text("Sized")
    .frame(width: 200, height: 100)
    .frame(maxWidth: .infinity)  // Expand to fill
    .frame(minHeight: 44)        // Minimum size
```

### Background and Overlay
```swift
Text("Decorated")
    .padding()
    .background(.blue)
    .cornerRadius(8)

// Overlay adds views on top
Text("Badge")
    .overlay(alignment: .topTrailing) {
        Circle()
            .fill(.red)
            .frame(width: 10, height: 10)
    }
```

## Modifier Order Matters

```swift
// Blue background, then padding
Text("A")
    .background(.blue)
    .padding()  // Padding is clear

// Padding, then blue background
Text("B")
    .padding()
    .background(.blue)  // Blue includes padding
```

Order determines which view gets modified.

## Conditional Modifiers

```swift
Text("Maybe Red")
    .foregroundColor(isError ? .red : .primary)

// Or use conditional view
if isLoading {
    ProgressView()
} else {
    ContentView()
}
```

## Custom View Modifiers

### Creating a Modifier
```swift
struct CardModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding()
            .background(.white)
            .cornerRadius(12)
            .shadow(radius: 4)
    }
}

// Extension for easy use
extension View {
    func cardStyle() -> some View {
        modifier(CardModifier())
    }
}

// Usage
Text("Card Content")
    .cardStyle()
```

## Environment Modifiers

Apply to all children:
```swift
VStack {
    Text("Title")
    Text("Subtitle")
}
.font(.headline)  // Applies to both
```

Some modifiers are environment modifiers, affecting descendants.

## Try It Yourself

### Exercise 1: Styled Button

Create a button with:
- Padding
- Background color
- Rounded corners
- Shadow

### Exercise 2: Custom Modifier

Create a `tagStyle()` modifier that:
- Adds horizontal padding
- Has a colored background
- Has fully rounded corners

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swiftui-modifiers-quiz",
  "type": "multiple-choice",
  "title": "Views and Modifiers",
  "description": "Test your understanding of SwiftUI modifiers.",
  "difficulty": "medium",
  "question": "Why does modifier order matter in SwiftUI?",
  "options": [
    {
      "id": "a",
      "text": "It doesn't—modifiers are applied in parallel",
      "isCorrect": false,
      "explanation": "Order definitely matters in SwiftUI!"
    },
    {
      "id": "b",
      "text": "Each modifier returns a new view wrapping the previous—order determines which applies first",
      "isCorrect": true,
      "explanation": "Correct! .padding().background(Color.red) pads first, then adds background (including padding). .background(Color.red).padding() adds background, then pads outside it. Different results!"
    },
    {
      "id": "c",
      "text": "SwiftUI sorts modifiers alphabetically internally",
      "isCorrect": false,
      "explanation": "Modifiers are applied in the exact order you write them."
    },
    {
      "id": "d",
      "text": "Order only matters for animation modifiers",
      "isCorrect": false,
      "explanation": "Order matters for all modifiers—padding, background, frame, etc."
    }
  ]
}
-->

## Key Takeaways

- Modifiers return new views
- Order matters significantly
- Chain modifiers for complex styling
- Environment modifiers affect children
- Custom modifiers enable reuse

## Next Steps

Continue to [Layout Basics](./03-layout-basics.md) →
