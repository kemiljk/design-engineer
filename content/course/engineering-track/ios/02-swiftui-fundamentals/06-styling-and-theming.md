# Styling and Theming

> **Quick Summary:** SwiftUI provides powerful styling through environment values, custom styles, and theming systems.

## What You'll Learn

During this module, you will learn to work with colours and materials to create visually stunning interfaces and explore the process of building custom styles for your components. We'll examine how to use environment values and preferences to manage global settings and walk through the essential steps for supporting dark mode across your entire application.

## Colours

### System Colors
```swift
Text("Primary").foregroundColor(.primary)
Text("Secondary").foregroundColor(.secondary)
Text("Blue").foregroundColor(.blue)
Text("Custom").foregroundColor(Color("BrandColor"))  // Asset catalog
```

### Color Modifiers
```swift
Text("Styled")
    .foregroundStyle(.blue)  // Modern approach
    
Rectangle()
    .fill(.blue.gradient)    // Gradient fill
    .fill(.blue.opacity(0.5)) // Semi-transparent
```

## Materials

### Traditional Materials

Translucent backgrounds for pre-iOS 26:
```swift
Text("Frosted")
    .padding()
    .background(.ultraThinMaterial)
    .background(.regularMaterial)
    .background(.thickMaterial)
```

### Liquid Glass (iOS 26+)

iOS 26 introduces Liquid Glass, a dynamic material that blurs, reflects, and responds to interactions. Standard components adopt it automatically—for custom views, use the `.glassEffect()` modifier. We cover this in detail in [Liquid Glass in SwiftUI](./07-liquid-glass.md).

## Typography

### System Styles
```swift
Text("Large Title").font(.largeTitle)
Text("Title").font(.title)
Text("Headline").font(.headline)
Text("Body").font(.body)
Text("Caption").font(.caption)
```

### Custom Fonts
```swift
Text("Custom")
    .font(.custom("Avenir", size: 20))
    .font(.system(size: 16, weight: .medium, design: .rounded))
```

## Button Styles

```swift
Button("Default") { }

Button("Bordered") { }
    .buttonStyle(.bordered)

Button("Prominent") { }
    .buttonStyle(.borderedProminent)

Button("Plain") { }
    .buttonStyle(.plain)

// iOS 26+ Liquid Glass style
Button("Glass") { }
    .buttonStyle(.glass)
```

### Custom Button Style
```swift
struct PrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding()
            .background(.blue)
            .foregroundColor(.white)
            .cornerRadius(8)
            .scaleEffect(configuration.isPressed ? 0.95 : 1)
    }
}

Button("Custom") { }
    .buttonStyle(PrimaryButtonStyle())
```

## Dark Mode

SwiftUI supports dark mode automatically with semantic colours:
```swift
// Adapts automatically
Text("Adaptive")
    .foregroundColor(.primary)
    .background(Color(.systemBackground))
```

### Preview Both Modes
```swift
#Preview("Light") {
    ContentView()
        .preferredColorScheme(.light)
}

#Preview("Dark") {
    ContentView()
        .preferredColorScheme(.dark)
}
```

## Environment Values

Read system settings:
```swift
struct ContentView: View {
    @Environment(\.colorScheme) var colorScheme
    @Environment(\.dynamicTypeSize) var dynamicType
    
    var body: some View {
        Text(colorScheme == .dark ? "Dark Mode" : "Light Mode")
    }
}
```

## Try It Yourself

### Exercise 1: Custom Button

Create a custom button style with:
Practise your custom styling by creating a bespoke button style that incorporates your unique brand colours and interactive press animations. Ensure that you also define a clear visual state for when the button is disabled to maintain a high level of accessibility and user feedback.

### Exercise 2: Theme Preview

Create a view and preview it:
Develop a comprehensive view and verify its appearance across different configurations by creating multiple previews. You should test the layout in both light and dark modes, and ensure it remains legible when displayed with large dynamic type sizes.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swiftui-theming-quiz",
  "type": "multiple-choice",
  "title": "Styling and Theming",
  "description": "Test your understanding of SwiftUI styling.",
  "difficulty": "easy",
  "question": "How do you support Dark Mode in SwiftUI?",
  "options": [
    {
      "id": "a",
      "text": "Create separate views for light and dark modes",
      "isCorrect": false,
      "explanation": "You don't need separate views. The system handles adaptation."
    },
    {
      "id": "b",
      "text": "Use semantic colours and system-provided materials that automatically adapt",
      "isCorrect": true,
      "explanation": "Correct! Use semantic colours like .primary, .secondary, Color(.systemBackground), and system materials. They automatically adjust for light/dark mode."
    },
    {
      "id": "c",
      "text": "Check the colour scheme manually and apply different styles",
      "isCorrect": false,
      "explanation": "While possible, using semantic colours is the recommended approach."
    },
    {
      "id": "d",
      "text": "Dark mode isn't supported in SwiftUI",
      "isCorrect": false,
      "explanation": "SwiftUI has excellent Dark Mode support through semantic colours."
    }
  ]
}
-->

## Key Takeaways

To create high-quality iOS interfaces, you should always use semantic colours and materials that automatically adapt to the user's system settings. Custom styles provide a powerful mechanism for building reusable and consistent components, while environment values allow you to access critical system preferences with ease. Finally, make it a standard practice to test your designs in both light and dark modes to ensure a seamless experience for every user.

## Next Steps

Continue to [Liquid Glass in SwiftUI](./07-liquid-glass.md) →
