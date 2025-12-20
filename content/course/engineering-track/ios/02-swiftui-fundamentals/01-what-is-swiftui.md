# What is SwiftUI

> **Quick Summary:** SwiftUI is Apple's declarative UI framework. You describe what you want, and SwiftUI figures out how to render it.

## What You'll Learn

- Declarative vs imperative UI
- The SwiftUI mental model
- Basic SwiftUI structure
- Preview system

## Declarative UI

### Imperative (UIKit)
You tell the system *how* to do things:
```swift
let label = UILabel()
label.text = "Hello"
label.textColor = .blue
view.addSubview(label)
```

### Declarative (SwiftUI)
You describe *what* you want:
```swift
Text("Hello")
    .foregroundColor(.blue)
```

SwiftUI handles the how.

## The SwiftUI Mental Model

### Views Are Descriptions
A SwiftUI View is a description of UI, not the UI itself:
- Lightweight structs
- Created frequently
- System manages actual rendering

### State Drives UI
When state changes, UI updates automatically:
```swift
@State private var count = 0

Text("Count: \(count)")
Button("Add") { count += 1 }
```

### Composition Over Inheritance
Build complex views from simple ones:
```swift
struct ContentView: View {
    var body: some View {
        VStack {
            HeaderView()
            ContentList()
            FooterView()
        }
    }
}
```

## Basic Structure

### A SwiftUI View
```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, SwiftUI!")
    }
}
```

Every view has a `body` property that returns `some View`.

### The App Entry Point
```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## Preview System

Live previews in Xcode:

```swift
struct ContentView: View {
    var body: some View {
        Text("Hello!")
    }
}

#Preview {
    ContentView()
}
```

### Preview Benefits
- See changes instantly
- Multiple device previews
- Different states and configurations
- Interactive testing

## Basic Views

### Text
```swift
Text("Hello, World!")
Text("Bold").bold()
Text("Large").font(.largeTitle)
```

### Image
```swift
Image(systemName: "star.fill")
Image("photo")
    .resizable()
    .aspectRatio(contentMode: .fit)
```

### Button
```swift
Button("Tap Me") {
    print("Tapped!")
}

Button(action: { }) {
    Label("Settings", systemImage: "gear")
}
```

## Try It Yourself

### Exercise 1: First View

Create a view that shows:
- A greeting text
- An SF Symbol
- A button that prints to console

### Exercise 2: Preview Variations

Create multiple previews:
- Light and dark mode
- Different device sizes

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swiftui-intro-quiz",
  "type": "multiple-choice",
  "title": "What is SwiftUI",
  "description": "Test your understanding of SwiftUI fundamentals.",
  "difficulty": "easy",
  "question": "What is the core paradigm of SwiftUI?",
  "options": [
    {
      "id": "a",
      "text": "Imperative programming where you tell the UI exactly what to do step by step",
      "isCorrect": false,
      "explanation": "That's UIKit's approach. SwiftUI is different."
    },
    {
      "id": "b",
      "text": "Declarative UI—you describe what you want, and SwiftUI figures out how to render it",
      "isCorrect": true,
      "explanation": "Correct! In SwiftUI, you declare the UI state and structure. SwiftUI handles updating the actual views when state changes—you don't manipulate views directly."
    },
    {
      "id": "c",
      "text": "HTML-based rendering like web frameworks",
      "isCorrect": false,
      "explanation": "SwiftUI uses native Swift code, not HTML."
    },
    {
      "id": "d",
      "text": "Drawing all UI elements with graphics commands",
      "isCorrect": false,
      "explanation": "SwiftUI provides high-level components, not low-level drawing."
    }
  ]
}
-->

## Key Takeaways

- SwiftUI is declarative: describe what, not how
- Views are lightweight structs
- State changes drive UI updates
- Composition builds complex UIs
- Previews enable rapid iteration

## Next Steps

Continue to [Views and Modifiers](./02-views-and-modifiers.md) →
