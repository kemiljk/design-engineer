# Styling and Theming

> **Quick Summary:** SwiftUI provides powerful styling through environment values, custom styles, and theming systems.

## What You'll Learn

- Colors and materials
- Custom styles
- Environment and preferences
- Dark mode support

## Colors

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

Translucent backgrounds:
```swift
Text("Frosted")
    .padding()
    .background(.ultraThinMaterial)
    .background(.regularMaterial)
    .background(.thickMaterial)
```

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

SwiftUI supports dark mode automatically with semantic colors:
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
- Brand colors
- Press animation
- Disabled state

### Exercise 2: Theme Preview

Create a view and preview it:
- Light mode
- Dark mode
- Large dynamic type

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
      "text": "Use semantic colors and system-provided materials that automatically adapt",
      "isCorrect": true,
      "explanation": "Correct! Use semantic colors like .primary, .secondary, Color(.systemBackground), and system materials. They automatically adjust for light/dark mode."
    },
    {
      "id": "c",
      "text": "Check the color scheme manually and apply different styles",
      "isCorrect": false,
      "explanation": "While possible, using semantic colors is the recommended approach."
    },
    {
      "id": "d",
      "text": "Dark mode isn't supported in SwiftUI",
      "isCorrect": false,
      "explanation": "SwiftUI has excellent Dark Mode support through semantic colors."
    }
  ]
}
-->

## Key Takeaways

- Use semantic colors for automatic adaptation
- Materials provide translucent backgrounds
- Custom styles enable reusable styling
- Environment values access system settings
- Always test light and dark modes

## Congratulations!

You've completed the SwiftUI Fundamentals module!

Continue to [Building Interfaces: Building a Button](../03-building-interfaces/01-building-a-button.md) →
