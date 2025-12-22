# Custom Transitions

> **Quick Summary:** Transitions animate views entering and leaving. SwiftUI provides built-in transitions and lets you create custom ones.

## What You'll Learn

- Built-in transitions
- Combining transitions
- Custom transitions
- matchedGeometryEffect

## Built-in Transitions

```swift
if isVisible {
    CardView()
        .transition(.opacity)
        .transition(.slide)
        .transition(.scale)
        .transition(.move(edge: .bottom))
}
```

## Combining Transitions

```swift
.transition(.scale.combined(with: .opacity))

.transition(
    .asymmetric(
        insertion: .move(edge: .trailing).combined(with: .opacity),
        removal: .move(edge: .leading).combined(with: .opacity)
    )
)
```

## Custom Transitions

```swift
struct RotateTransition: ViewModifier {
    let active: Bool
    
    func body(content: Content) -> some View {
        content
            .rotationEffect(.degrees(active ? 90 : 0))
            .opacity(active ? 0 : 1)
    }
}

extension AnyTransition {
    static var rotate: AnyTransition {
        .modifier(
            active: RotateTransition(active: true),
            identity: RotateTransition(active: false)
        )
    }
}

// Usage
.transition(.rotate)
```

## matchedGeometryEffect

Animate between different views:

```swift
@Namespace private var animation

if showDetail {
    DetailView()
        .matchedGeometryEffect(id: "card", in: animation)
} else {
    CardView()
        .matchedGeometryEffect(id: "card", in: animation)
}
```

### Hero Animation
```swift
struct HeroView: View {
    @Namespace private var heroAnimation
    @State private var selectedItem: Item?
    
    var body: some View {
        ZStack {
            ScrollView {
                LazyVGrid(columns: columns) {
                    ForEach(items) { item in
                        if selectedItem != item {
                            ItemCard(item: item)
                                .matchedGeometryEffect(
                                    id: item.id,
                                    in: heroAnimation
                                )
                                .onTapGesture {
                                    withAnimation(.spring()) {
                                        selectedItem = item
                                    }
                                }
                        }
                    }
                }
            }
            
            if let item = selectedItem {
                DetailView(item: item)
                    .matchedGeometryEffect(id: item.id, in: heroAnimation)
                    .onTapGesture {
                        withAnimation(.spring()) {
                            selectedItem = nil
                        }
                    }
            }
        }
    }
}
```

## Navigation Transitions

```swift
NavigationStack {
    List(items) { item in
        NavigationLink(value: item) {
            ItemRow(item: item)
        }
    }
    .navigationDestination(for: Item.self) { item in
        DetailView(item: item)
    }
}
.navigationTransition(.zoom(sourceID: item.id, in: namespace))
```

## Try It Yourself

### Exercise 1: Card Flip

Create a card that:
- Flips on tap
- Shows different content on each side
- Has 3D rotation effect

### Exercise 2: Hero Transition

Build a photo grid where:
- Tapping expands photo full screen
- Photo animates between positions
- Smooth spring animation

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-transitions-quiz",
  "type": "multiple-choice",
  "title": "Custom Transitions",
  "description": "Test your understanding of SwiftUI transitions.",
  "difficulty": "medium",
  "question": "What does AnyTransition.asymmetric provide?",
  "options": [
    {
      "id": "a",
      "text": "A transition that only works on certain devices",
      "isCorrect": false,
      "explanation": "Asymmetric refers to insertion vs. removal, not devices."
    },
    {
      "id": "b",
      "text": "Different animations for when a view appears vs. when it disappears",
      "isCorrect": true,
      "explanation": "Correct! AnyTransition.asymmetric(insertion: .scale, removal: .opacity) lets a view scale in but fade out, or any combination you need."
    },
    {
      "id": "c",
      "text": "Non-reversible animations",
      "isCorrect": false,
      "explanation": "Transitions are always applied on insert/remove—asymmetric just gives different effects for each."
    },
    {
      "id": "d",
      "text": "Random transition selection",
      "isCorrect": false,
      "explanation": "You explicitly specify both the insertion and removal transitions."
    }
  ]
}
-->

## Key Takeaways

- Transitions animate view insertion/removal
- Combine for complex effects
- matchedGeometryEffect for hero animations
- @Namespace for animation identity
- Test transitions at different speeds

## Next Steps

Continue to [Prototyping with SwiftUI](../02-prototyping-with-swiftui/01-prototyping-with-swiftui.md) →
