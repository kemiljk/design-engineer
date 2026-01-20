# What is SwiftUI

> **Quick Summary:** SwiftUI is Apple's declarative UI framework. You describe what you want, and SwiftUI figures out how to render it.

## What You'll Learn

During this module, you will explore the differences between declarative and imperative UI paradigms and dive into the fundamental SwiftUI mental model. We'll examine the basic structure of a SwiftUI application and show you how to leverage the powerful preview system for rapid development.

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
SwiftUI views are essentially lightweight structs that are created frequently by the system. Instead of maintaining persistent view objects, you provide a description of the interface, and the system manages the actual rendering and updates on your behalf.

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
The preview system allows you to see changes instantly without rebuilding the entire app and enables simultaneous testing on multiple device types. You can easily observe different states and configurations in real-time, facilitating a much more interactive and efficient testing process.

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
Practise your SwiftUI skills by creating a new view that displays a personalised greeting text and an SF Symbol. Include a button that performs a simple action, such as printing a message to the console, to verify your understanding of basic interactions.

### Exercise 2: Preview Variations

Create multiple previews:
Expand your development workflow by creating multiple preview configurations for your view. Ensure that you test your design in both light and dark modes across several different device sizes to confirm its responsiveness.

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
      "text": "Declarative UI where you describe what you want, and SwiftUI figures out how to render it",
      "isCorrect": true,
      "explanation": "Correct! In SwiftUI, you declare the UI state and structure. SwiftUI handles updating the actual views when state changes. You don't manipulate views directly."
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

To build modern iOS interfaces effectively, you must embrace SwiftUI's declarative paradigm where you describe the desired state rather than the rendering steps. Recognise that views are lightweight structs and that all UI updates are driven by state changes. By using composition to assemble complex interfaces from simple components and leveraging live previews for rapid iteration, you can create high-quality applications with confidence.

## Next Steps

Continue to [Views and Modifiers](./02-views-and-modifiers.md) →
