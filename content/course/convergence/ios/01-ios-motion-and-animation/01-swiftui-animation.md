# SwiftUI Animation

> **Quick Summary:** SwiftUI makes animation simple with withAnimation and implicit animations. Understanding spring physics helps create natural-feeling motion.

## What You'll Learn

- The basics of withAnimation for explicit animations
- The difference between implicit and explicit animation
- How to craft natural-feeling spring animations
- How to chain animation modifiers for complex effects

## withAnimation

## withAnimation

Wrap state changes to animate:

```swift
@State private var isExpanded = false

Button("Toggle") {
    withAnimation {
        isExpanded.toggle()
    }
}

Rectangle()
    .frame(height: isExpanded ? 200 : 100)
```

### Animation Types
```swift
withAnimation(.easeInOut) { }
withAnimation(.easeIn(duration: 0.3)) { }
withAnimation(.linear(duration: 0.5)) { }
withAnimation(.spring()) { }
```

## Spring Animations

SwiftUI's springs feel natural:

```swift
withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) {
    scale = 1.2
}

// Presets
withAnimation(.snappy) { }   // Quick, responsive
withAnimation(.smooth) { }   // Balanced
withAnimation(.bouncy) { }   // Playful overshoot
```

### Spring Parameters
The **response** parameter controls how quickly the spring reacts (duration to reach target). **dampingFraction** determines how much the spring oscillates (0 oscillates forever, 1 has no bounce). **blendDuration** handles the smoothing when an animation is interrupted by another change.

## Implicit Animation

Use `.animation` modifier:

```swift
Circle()
    .fill(isActive ? .blue : .gray)
    .scaleEffect(isActive ? 1.2 : 1)
    .animation(.spring(), value: isActive)
```

Animation applies to all changes in that view when `isActive` changes.

## Animation Modifiers

```swift
Text("Hello")
    .offset(y: offset)
    .animation(.easeOut, value: offset)
    
Image(systemName: "star.fill")
    .rotationEffect(.degrees(rotation))
    .animation(.linear(duration: 2).repeatForever(autoreverses: false), value: rotation)
```

## Animatable Properties

Common animatable properties include **.offset**, **.scale**, **.rotation**, **.opacity**, **.frame** (size changes), **.position**, and **.foregroundColor**.

## Combining Animations

```swift
@State private var isVisible = false

VStack {
    if isVisible {
        CardView()
            .transition(.asymmetric(
                insertion: .scale.combined(with: .opacity),
                removal: .slide.combined(with: .opacity)
            ))
    }
}
.animation(.spring(), value: isVisible)
```

## Try It Yourself

### Exercise 1: Animated Toggle
Create a custom toggle component that slides the knob smoothly, changes colour upon activation, and uses a spring animation for a tactile feel.

### Exercise 2: Loading Animation
Build a loading indicator featuring three bouncing dots with staggered timing to create a wave effect, ensuring the animation loops continuously.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-animation-quiz",
  "type": "multiple-choice",
  "title": "SwiftUI Animation",
  "description": "Test your understanding of SwiftUI animations.",
  "difficulty": "medium",
  "question": "What's the difference between .animation() and withAnimation {}?",
  "options": [
    {
      "id": "a",
      "text": "They're exactly the same",
      "isCorrect": false,
      "explanation": "They have different use cases and scope."
    },
    {
      "id": "b",
      "text": ".animation() animates state changes in that view; withAnimation {} explicitly controls which state change triggers animation",
      "isCorrect": true,
      "explanation": "Correct! .animation() (deprecated in iOS 17) applied to state changes in a view. withAnimation { state = newValue } gives explicit control over what animates."
    },
    {
      "id": "c",
      "text": "withAnimation only works with springs",
      "isCorrect": false,
      "explanation": "Both support all animation types."
    },
    {
      "id": "d",
      "text": ".animation() is for iOS, withAnimation for macOS",
      "isCorrect": false,
      "explanation": "Both work on all Apple platforms."
    }
  ]
}
-->

## Key Takeaways
Always use **withAnimation** to wrap explicit state changes. Prefer **springs** over linear curves for more natural motion. Use the **.animation** modifier carefully for implicit effects, and **combine animations** to create complex, multi-layered interactions. Finally, always **test the feel** on a real device.

## Next Steps

Continue to [Custom Transitions](./02-custom-transitions.md) →
