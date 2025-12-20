# Building a Button

> **Quick Summary:** Buttons are fundamental interactive elements. Learn to build accessible, styled buttons with proper states and haptic feedback.

## What You'll Learn

- SwiftUI button basics
- Custom button styles
- Haptic feedback
- Accessibility

## Basic Buttons

```swift
Button("Tap Me") {
    print("Tapped!")
}

Button(action: { print("Tapped!") }) {
    Text("Tap Me")
}

Button {
    print("Tapped!")
} label: {
    Label("Settings", systemImage: "gear")
}
```

## Button Styles

### Built-in Styles
```swift
Button("Bordered") { }
    .buttonStyle(.bordered)
    .tint(.blue)

Button("Prominent") { }
    .buttonStyle(.borderedProminent)

Button("Destructive", role: .destructive) { }
    .buttonStyle(.bordered)
```

### Custom Button Style
```swift
struct PrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.headline)
            .foregroundStyle(.white)
            .padding(.horizontal, 24)
            .padding(.vertical, 12)
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(.blue)
            )
            .opacity(configuration.isPressed ? 0.8 : 1)
            .scaleEffect(configuration.isPressed ? 0.98 : 1)
            .animation(.easeOut(duration: 0.1), value: configuration.isPressed)
    }
}

// Usage
Button("Primary Action") { }
    .buttonStyle(PrimaryButtonStyle())
```

## Button with Loading State

```swift
struct LoadingButton: View {
    let title: String
    let isLoading: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 8) {
                if isLoading {
                    ProgressView()
                        .tint(.white)
                }
                Text(title)
            }
        }
        .disabled(isLoading)
        .buttonStyle(PrimaryButtonStyle())
    }
}
```

## Haptic Feedback

```swift
struct HapticButton: View {
    var body: some View {
        Button("With Haptics") {
            let impact = UIImpactFeedbackGenerator(style: .medium)
            impact.impactOccurred()
        }
    }
}

// Sensory feedback modifier (iOS 17+)
Button("Tap") { }
    .sensoryFeedback(.impact, trigger: tapCount)
```

## Accessibility

```swift
Button {
    toggleFavorite()
} label: {
    Image(systemName: isFavorite ? "heart.fill" : "heart")
}
.accessibilityLabel(isFavorite ? "Remove from favorites" : "Add to favorites")
.accessibilityHint("Double tap to toggle favorite status")
```

## Try It Yourself

### Exercise 1: Styled Button Set

Create buttons:
- Primary (filled)
- Secondary (outlined)
- Destructive (red)

### Exercise 2: Async Button

Build a button that:
- Shows loading spinner
- Disables during load
- Shows success checkmark

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swiftui-button-quiz",
  "type": "multiple-choice",
  "title": "Building a Button",
  "description": "Test your understanding of SwiftUI buttons.",
  "difficulty": "easy",
  "question": "What's the best way to create reusable button styles in SwiftUI?",
  "options": [
    {
      "id": "a",
      "text": "Copy the styling modifiers to each button",
      "isCorrect": false,
      "explanation": "Duplicating code is hard to maintain and update."
    },
    {
      "id": "b",
      "text": "Create a custom ButtonStyle struct and apply it with .buttonStyle()",
      "isCorrect": true,
      "explanation": "Correct! ButtonStyle encapsulates appearance and behavior, including pressed states. Apply once with .buttonStyle(MyButtonStyle())."
    },
    {
      "id": "c",
      "text": "Create extension methods on Button",
      "isCorrect": false,
      "explanation": "While possible, ButtonStyle is the SwiftUI-intended approach."
    },
    {
      "id": "d",
      "text": "Use CSS classes like on web",
      "isCorrect": false,
      "explanation": "SwiftUI doesn't use CSS—it uses native Swift protocols."
    }
  ]
}
-->

## Key Takeaways

- ButtonStyle enables custom appearances
- Handle isPressed for interactive states
- Add haptics for tactile feedback
- Always consider accessibility

## Next Steps

Continue to [Building a Card](./02-building-a-card.md) →
