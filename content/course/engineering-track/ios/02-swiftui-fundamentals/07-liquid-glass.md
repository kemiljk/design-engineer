# Liquid Glass in SwiftUI

> **Quick Summary:** Liquid Glass is Apple's new design language in iOS 26. Learn how to apply, configure, combine, and morph Liquid Glass effects on custom views using SwiftUI's new modifiers.

## What You'll Learn

- Exactly what Liquid Glass is and how it functions as a core design element
- How to combine multiple effects with `glassEffectContainer`
- How to create smooth, morphing transitions between your views

## Introduction to Liquid Glass

Liquid Glass is a dynamic material that unifies Apple platform design. It combines the optical properties of glass with a sense of fluidity:

Liquid Glass functions by blurring the content behind it while simultaneously reflecting the subtle colours and light from its surroundings. It reacts dynamically to touch and pointer interactions in real time and can morph or flow between different states during interface transitions to create a sense of organic continuity.

Standard SwiftUI components automatically adopt Liquid Glass—navigation bars, tab bars, buttons, and controls all use this material by default. You can also apply these effects to custom views.

## Applying Liquid Glass Effects

Use the `.glassEffect()` modifier to add Liquid Glass to any view:

```swift
Text("Hello, World!")
    .font(.title)
    .padding()
    .glassEffect()
```

By default, this uses the `Glass.regular` variant within a `Capsule` shape behind the view's content.

### Custom Shapes

Use different shapes by passing them to the modifier:

```swift
// Rounded rectangle for larger components
Text("Hello, World!")
    .font(.title)
    .padding()
    .glassEffect(in: .rect(cornerRadius: 16.0))

// Circle for icon buttons
Image(systemName: "star.fill")
    .frame(width: 60, height: 60)
    .glassEffect(in: .circle)
```

### Tint and Interactivity

Customise the effect with tints and interactive behaviour:

```swift
// Tinted glass with interactive touch response
Text("Hello, World!")
    .font(.title)
    .padding()
    .glassEffect(.regular.tint(.orange).interactive())
```

The `.interactive()` modifier makes the glass react to touch and pointer interactions—the same fluid response that standard buttons have.

## The Glass Structure

The `Glass` structure provides configuration options:

```swift
// Default regular glass
.glassEffect(.regular)

// Tinted glass
.glassEffect(.regular.tint(.blue))

// Interactive glass (responds to touch)
.glassEffect(.regular.interactive())

// Combined options
.glassEffect(.regular.tint(.purple).interactive(true))
```

Use tints sparingly to suggest prominence. The material should let content shine through, not overpower it.

## Combining Views with GlassEffectContainer

When applying Liquid Glass to multiple views, wrap them in a `GlassEffectContainer` for optimal rendering and smooth blending:

```swift
GlassEffectContainer(spacing: 40.0) {
    HStack(spacing: 40.0) {
        Image(systemName: "scribble.variable")
            .frame(width: 80.0, height: 80.0)
            .font(.system(size: 36))
            .glassEffect()

        Image(systemName: "eraser.fill")
            .frame(width: 80.0, height: 80.0)
            .font(.system(size: 36))
            .glassEffect()
    }
}
```

### How Spacing Works

The `spacing` parameter on the container controls how effects interact:

- **Larger spacing values** cause glass effects to blend together sooner
- **When views overlap** within the spacing threshold, their shapes merge
- **Animations** create smooth morphing as components move

## Creating Unified Glass Regions

Use `.glassEffectUnion(id:namespace:)` to combine multiple views into a single glass effect:

```swift
@Namespace private var namespace

let symbols = ["cloud.bolt.rain.fill", "sun.rain.fill", "moon.stars.fill", "moon.fill"]

GlassEffectContainer(spacing: 20.0) {
    HStack(spacing: 20.0) {
        ForEach(symbols.indices, id: \.self) { index in
            Image(systemName: symbols[index])
                .frame(width: 80.0, height: 80.0)
                .font(.system(size: 36))
                .glassEffect()
                .glassEffectUnion(id: index < 2 ? "group1" : "group2", namespace: namespace)
        }
    }
}
```

This groups the first two and last two symbols into unified glass regions.

## Morphing Transitions

Liquid Glass creates beautiful morphing effects during transitions. Use `.glassEffectID(_:in:)` to coordinate transitions:

```swift
@Namespace private var namespace
@State private var showDetail = false

GlassEffectContainer {
    if showDetail {
        DetailView()
            .glassEffect()
            .glassEffectID("content", in: namespace)
    } else {
        ThumbnailView()
            .glassEffect()
            .glassEffectID("content", in: namespace)
    }
}
```

When `showDetail` toggles with an animation, the glass effect morphs smoothly between the two views.

### Transition Types

`GlassEffectTransition` controls how effects appear and disappear:

```swift
.glassEffect(.regular, transition: .matchedGeometry)
.glassEffect(.regular, transition: .opacity)
.glassEffect(.regular, transition: .scale)
```

## Best Practices

To ensure a high-quality user experience, you should always use standard components where possible as they adopt Liquid Glass automatically. When building custom controls, apply these effects sparingly to only the most important elements and always test your designs with accessibility settings like Reduce Transparency and Reduce Motion. Finally, allow the background content to infuse the material naturally and be judicious with your use of additional colours.

You should avoid overusing glass effects to prevent multiple elements from competing for the user's attention. Do not override system backgrounds in navigation bars or tab bars, and refrain from applying these effects to every element on the screen. Always remember to provide functional fallbacks to ensure your interface remains usable even when transparency effects are reduced.

## Accessibility Considerations

Liquid Glass adapts automatically when users enable accessibility settings:

Liquid Glass remains accessible by adapting to system settings, such as removing translucency when Reduce Transparency is enabled. It also simplifies or entirely disables complex morphing animations when the user has turned on the Reduce Motion setting to ensure a comfortable experience for everyone.

When building custom components with glass effects, ensure they remain usable when these settings are enabled.

## Try It Yourself

### Exercise 1: Glass Button

Create a custom button with Liquid Glass:

```swift
struct GlassButton: View {
    let title: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.headline)
                .padding()
        }
        .glassEffect(.regular.interactive())
    }
}
```

### Exercise 2: Morphing Toolbar

Create a toolbar where buttons morph together when selected:

Construct a sophisticated toolbar where individual buttons appear to morph together as they are selected. You should wrap your toolbar items in a `GlassEffectContainer` and use `.glassEffectUnion()` to logically group the selected items, ensuring all state changes are wrapped in a `withAnimation` block for a smooth transition.

### Exercise 3: Floating Panel

Build a floating panel that uses Liquid Glass:

```swift
struct FloatingPanel<Content: View>: View {
    @ViewBuilder let content: Content

    var body: some View {
        content
            .padding()
            .glassEffect(in: .rect(cornerRadius: 20))
    }
}
```

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "liquid-glass-quiz",
  "type": "multiple-choice",
  "title": "Liquid Glass Fundamentals",
  "description": "Test your understanding of Liquid Glass in SwiftUI.",
  "difficulty": "medium",
  "question": "What does GlassEffectContainer provide when using multiple glass effects?",
  "options": [
    {
      "id": "a",
      "text": "It applies a single glass effect to all child views",
      "isCorrect": false,
      "explanation": "Each view still has its own glass effect—the container optimises rendering."
    },
    {
      "id": "b",
      "text": "Better rendering performance and smooth blending between glass effects",
      "isCorrect": true,
      "explanation": "Correct! GlassEffectContainer optimises rendering and enables glass effects to blend their shapes together and morph during transitions."
    },
    {
      "id": "c",
      "text": "It disables individual glass customisation",
      "isCorrect": false,
      "explanation": "You can still configure each glass effect individually within a container."
    },
    {
      "id": "d",
      "text": "It only works with HStack layouts",
      "isCorrect": false,
      "explanation": "GlassEffectContainer works with any layout container."
    }
  ]
}
-->

## Key Takeaways

- To master Liquid Glass in SwiftUI, you must understand how it combines translucency, reflection, and fluid motion to create a unified design language
- Use the `.glassEffect()` modifier to apply these effects to custom views
- Leverage `glassEffectContainer` alongside `.glassEffectUnion()` for smooth blending of grouped regions
- Coordinate your transitions with `.glassEffectTransition()` for seamless morphing between views

## Next Steps

Continue to [Building a Button](../03-building-interfaces/01-building-a-button.md) →
