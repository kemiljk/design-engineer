# Prototyping with SwiftUI

> **Quick Summary:** SwiftUI's preview system and rapid iteration make it perfect for prototyping. Build interactive prototypes that feel like the real thing.

## What You'll Learn

- Preview-driven prototyping to visualise changes instantly
- Rapid iteration techniques to refine your designs quickly
- How to create realistic interactions using gestures and animations
- Efficient methods for sharing prototypes for feedback

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
First, **archive** your build in Xcode. Then, **upload** it to App Store Connect. Finally, use **TestFlight** to invite testers to install the prototype on their devices.

### Xcode Previews on Device
**Connect your device** to your Mac. Select your connected device in the **preview canvas** selector. The preview will then **run directly** on your device, allowing you to test touch interactions and performance in real-time.

### Screen Recording
Use Cmd+R in Simulator to record interactions.

## Try It Yourself

### Exercise 1: Onboarding Prototype
Build a polished onboarding flow with multiple pages. Implement **swipe navigation** between steps, include a dynamic **progress indicator**, and add functional **Skip** and **Continue** buttons to navigate through the flow.

### Exercise 2: Interaction Prototype
Create a stack of draggable cards. Users should be able to **swipe cards away** to dismiss them. If a card is not swiped far enough, it should **spring back** to its original position. As a card is removed, the **next card** should animate up into view.

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
**Previews** are your most powerful tool for rapid iteration, allowing you to visualize changes instantly. Create **preview variations** to test different data states (loading, error, empty) without running the full app. Use **placeholder data** to make your layouts look realistic, and always **test on a physical device** to ensure gestures feel right. Finally, share your builds via **TestFlight** to get valuable feedback from real users.

## Next Steps

Continue to [iOS Accessibility](../03-accessibility-and-polish/01-ios-accessibility.md) →
