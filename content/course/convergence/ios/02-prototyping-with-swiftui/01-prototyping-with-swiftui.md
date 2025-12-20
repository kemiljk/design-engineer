# Prototyping with SwiftUI

> **Quick Summary:** SwiftUI's preview system and rapid iteration make it perfect for prototyping. Build interactive prototypes that feel like the real thing.

## What You'll Learn

- Preview-driven prototyping
- Rapid iteration techniques
- Creating realistic interactions
- Sharing prototypes

## Preview-Driven Development

```swift
struct InteractivePrototype: View {
    @State private var isExpanded = false
    
    var body: some View {
        VStack {
            Button("Toggle") {
                withAnimation {
                    isExpanded.toggle()
                }
            }
            
            if isExpanded {
                DetailContent()
                    .transition(.move(edge: .bottom))
            }
        }
    }
}

#Preview {
    InteractivePrototype()
}
```

### Preview Variations
```swift
#Preview("Light") {
    ContentView()
        .preferredColorScheme(.light)
}

#Preview("Dark") {
    ContentView()
        .preferredColorScheme(.dark)
}

#Preview("Large Text") {
    ContentView()
        .dynamicTypeSize(.xxxLarge)
}
```

## Rapid Iteration

### Placeholder Data
```swift
extension User {
    static let preview = User(
        name: "John Doe",
        email: "john@example.com",
        avatar: URL(string: "https://picsum.photos/100")!
    )
}
```

### Mock States
```swift
#Preview("Loading") {
    FeedView(state: .loading)
}

#Preview("Empty") {
    FeedView(state: .empty)
}

#Preview("Error") {
    FeedView(state: .error("Network unavailable"))
}

#Preview("Loaded") {
    FeedView(state: .loaded([.preview, .preview, .preview]))
}
```

## Interactive Prototypes

```swift
struct GesturePrototype: View {
    @State private var offset = CGSize.zero
    @State private var isDragging = false
    
    var body: some View {
        Card()
            .offset(offset)
            .scaleEffect(isDragging ? 1.05 : 1)
            .gesture(
                DragGesture()
                    .onChanged { value in
                        offset = value.translation
                        isDragging = true
                    }
                    .onEnded { _ in
                        withAnimation(.spring()) {
                            offset = .zero
                            isDragging = false
                        }
                    }
            )
    }
}
```

## Sharing Prototypes

### TestFlight
1. Archive in Xcode
2. Upload to App Store Connect
3. Invite testers via TestFlight

### Xcode Previews on Device
1. Connect device
2. Select device in preview
3. Run preview directly on device

### Screen Recording
Use Cmd+R in Simulator to record interactions.

## Try It Yourself

### Exercise 1: Onboarding Prototype

Build an onboarding flow:
- Multiple pages with swipe navigation
- Progress indicator
- Skip and continue buttons

### Exercise 2: Interaction Prototype

Create a draggable card stack:
- Cards can be swiped away
- Spring back if not swiped far enough
- Next card animates up

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-prototyping-quiz",
  "type": "multiple-choice",
  "title": "Prototyping with SwiftUI",
  "description": "Test your understanding of SwiftUI prototyping.",
  "difficulty": "easy",
  "question": "Why is SwiftUI well-suited for prototyping?",
  "options": [
    {
      "id": "a",
      "text": "It generates code from design files automatically",
      "isCorrect": false,
      "explanation": "You still write the code—SwiftUI just makes it faster."
    },
    {
      "id": "b",
      "text": "Declarative syntax, live previews, and real gesture/animation support let you iterate quickly on realistic interactions",
      "isCorrect": true,
      "explanation": "Correct! SwiftUI's concise syntax and Xcode previews speed up iteration. Unlike design tool prototypes, you get real physics, gestures, and can use actual device sensors."
    },
    {
      "id": "c",
      "text": "Prototypes in SwiftUI can't be used in production",
      "isCorrect": false,
      "explanation": "SwiftUI prototypes can often evolve into production code."
    },
    {
      "id": "d",
      "text": "It only works with simple layouts",
      "isCorrect": false,
      "explanation": "SwiftUI handles complex layouts and animations well."
    }
  ]
}
-->

## Key Takeaways

- Previews enable rapid iteration
- Create variations for different states
- Use placeholder data for realism
- Test on device for accurate feel
- Share via TestFlight for feedback

## Next Steps

Continue to [iOS Accessibility](../03-accessibility-and-polish/01-ios-accessibility.md) →
