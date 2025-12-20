# Layout Basics

> **Quick Summary:** SwiftUI uses stacks and alignment to compose layouts. Understanding VStack, HStack, and ZStack is fundamental.

## What You'll Learn

- Stack-based layouts
- Spacing and alignment
- Spacer and flexible space
- ZStack for layering

## VStack - Vertical Stack

Arranges views vertically:
```swift
VStack {
    Text("Top")
    Text("Middle")
    Text("Bottom")
}

// With spacing
VStack(spacing: 20) {
    Text("Spaced")
    Text("Apart")
}

// With alignment
VStack(alignment: .leading) {
    Text("Left aligned")
    Text("Also left")
}
```

## HStack - Horizontal Stack

Arranges views horizontally:
```swift
HStack {
    Text("Left")
    Text("Right")
}

HStack(spacing: 16) {
    Image(systemName: "star")
    Text("Favorite")
}

HStack(alignment: .top) {
    Text("Tall\nText")
    Text("Short")
}
```

## ZStack - Depth Stack

Layers views on top of each other:
```swift
ZStack {
    Color.blue          // Background
    Text("Foreground")  // On top
}

ZStack(alignment: .bottomTrailing) {
    Image("photo")
    Text("Caption")
}
```

## Spacer

Pushes views apart:
```swift
HStack {
    Text("Left")
    Spacer()  // Pushes to edges
    Text("Right")
}

VStack {
    Text("Top")
    Spacer()
    Text("Bottom")
}
```

### Minimum Spacer
```swift
Spacer(minLength: 20)  // At least 20 points
```

## Combining Stacks

Nest stacks for complex layouts:
```swift
VStack {
    HStack {
        Image(systemName: "person")
        VStack(alignment: .leading) {
            Text("Name")
            Text("Subtitle").font(.caption)
        }
        Spacer()
        Button("Follow") { }
    }
    .padding()
    
    Divider()
    
    // More content...
}
```

## Frame and Sizing

### Fixed Size
```swift
Text("Fixed")
    .frame(width: 200, height: 100)
```

### Flexible Size
```swift
Text("Flexible")
    .frame(maxWidth: .infinity)  // Fill width
    .frame(minHeight: 44)        // Minimum height
```

### Alignment in Frame
```swift
Text("Aligned")
    .frame(width: 200, height: 100, alignment: .topLeading)
```

## Try It Yourself

### Exercise 1: Profile Row

Create a horizontal row with:
- Avatar on left
- Name and subtitle (vertical)
- Spacer
- Action button on right

### Exercise 2: Card Layout

Create a card with:
- Image at top
- Title and description below
- Button at bottom right

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swiftui-layout-quiz",
  "type": "multiple-choice",
  "title": "Layout Basics",
  "description": "Test your understanding of SwiftUI layout.",
  "difficulty": "medium",
  "question": "What is a ZStack used for in SwiftUI?",
  "options": [
    {
      "id": "a",
      "text": "Horizontal layout like HStack but with zoom capability",
      "isCorrect": false,
      "explanation": "Z refers to the z-axis (depth), not zoom."
    },
    {
      "id": "b",
      "text": "Layering views on top of each other along the depth axis",
      "isCorrect": true,
      "explanation": "Correct! ZStack overlays views—great for backgrounds, overlays, badges, or any time you need views stacked on top of each other rather than side by side."
    },
    {
      "id": "c",
      "text": "Creating 3D transformations",
      "isCorrect": false,
      "explanation": "ZStack is for 2D overlapping, not 3D transforms."
    },
    {
      "id": "d",
      "text": "Grouping views for animation purposes",
      "isCorrect": false,
      "explanation": "While ZStack affects animation, its primary purpose is spatial layering."
    }
  ]
}
-->

## Key Takeaways

- VStack for vertical layouts
- HStack for horizontal layouts
- ZStack for layering
- Spacer pushes views apart
- Nest stacks for complex layouts
- Frame controls sizing

## Next Steps

Continue to [State Management](./04-state-management.md) →
