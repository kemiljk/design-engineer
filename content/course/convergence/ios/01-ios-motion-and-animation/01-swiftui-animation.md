# SwiftUI Animation

> **Quick Summary:** SwiftUI makes animation simple with withAnimation and implicit animations. Understanding spring physics helps create natural-feeling motion.

## What You'll Learn

- withAnimation basics
- Implicit vs explicit animation
- Spring animations
- Animation modifiers

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
- **response:** Duration to reach target
- **dampingFraction:** 0 = oscillate forever, 1 = no bounce
- **blendDuration:** Smoothing when interrupted

## Implicit Animation

Use `.animation` modifier:

```swift
Circle()
    .fill(isActive ? .blue : .grey)
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

Common animatable properties:
- `.offset`
- `.scale`
- `.rotation`
- `.opacity`
- `.frame`
- `.position`
- `.foregroundColor`

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

Create a custom toggle that:
- Slides the knob
- Changes colour
- Has spring animation

### Exercise 2: Loading Animation

Build a loading indicator:
- Three bouncing dots
- Staggered timing
- Continuous animation

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

- withAnimation wraps state changes
- Springs feel more natural than linear
- .animation modifier for implicit animation
- Combine animations for complex effects
- Test feel on device

## Next Steps

Continue to [Custom Transitions](./02-custom-transitions.md) →
