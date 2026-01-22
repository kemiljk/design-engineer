# State Management

> **Quick Summary:** SwiftUI uses property wrappers to manage state. Understanding @State, @Binding, and @ObservableObject is essential for dynamic UIs.

## What You'll Learn

- During this module, you will learn to use `@State` for managing local view properties
- explore the role of `@Binding` in connecting child views to their parents
- explore the role of `@Binding` in connecting child views to their parents
- We'll examine the critical "source of truth" concept

## @State

Local, view-owned state:
```swift
struct CounterView: View {
    @State private var count = 0
    
    var body: some View {
        VStack {
            Text("Count: \(count)")
            Button("Add") {
                count += 1
            }
        }
    }
}
```

### When to Use @State
You should use `@State` specifically for simple value types like integers, strings, and booleans that are owned by and private to a single view. This ensures that the state remains encapsulated while allowing SwiftUI to handle UI updates automatically whenever the underlying value changes.

## @Binding

Two-way connection to state:
```swift
struct ToggleRow: View {
    let title: String
    @Binding var isOn: Bool
    
    var body: some View {
        HStack {
            Text(title)
            Spacer()
            Toggle("", isOn: $isOn)
        }
    }
}

// Parent view
struct SettingsView: View {
    @State private var notificationsOn = true
    
    var body: some View {
        ToggleRow(
            title: "Notifications",
            isOn: $notificationsOn  // Pass binding with $
        )
    }
}
```

### The $ Prefix
`$property` creates a binding to that property.

## Source of Truth

### Single Source
Every piece of state should have one owner:
To maintain a reliable application flow, every piece of state must have a single owner who acts as the primary source of truth. Children should receive bindings to this state, allowing changes to flow back up to the parent automatically without creating redundant copies of the data.

### Example Flow
```text
ParentView (@State count)
    ↓ passes $count
ChildView (@Binding count)
    ↓ modifies count
ParentView updates automatically
```

## Observable Objects

For more complex state:
```swift
@Observable
class UserSettings {
    var username = ""
    var notificationsEnabled = true
}

struct SettingsView: View {
    @State private var settings = UserSettings()
    
    var body: some View {
        Form {
            TextField("Username", text: $settings.username)
            Toggle("Notifications", isOn: $settings.notificationsEnabled)
        }
    }
}
```

## Environment

Share data through view hierarchy:
```swift
// Define
@Observable
class AppState {
    var isLoggedIn = false
}

// Provide at top level
@main
struct MyApp: App {
    @State private var appState = AppState()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(appState)
        }
    }
}

// Use anywhere below
struct ProfileView: View {
    @Environment(AppState.self) var appState
    
    var body: some View {
        if appState.isLoggedIn {
            // Show profile
        }
    }
}
```

## Try It Yourself

### Exercise 1: Toggle State

Create a view with:
Practise your state management skills by creating a view with a toggle that dynamically shows or hides content based on the user's selection. Use the `@State` property wrapper to track the toggle's value and ensure the interface updates correctly.

### Exercise 2: Parent-Child Binding

Create:
Implement a parent-child relationship where the parent owns a piece of text state and passes a binding to a child's text field. Verify that any updates made within the child component are immediately reflected in the parent's display.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swiftui-state-quiz",
  "type": "multiple-choice",
  "title": "State Management",
  "description": "Test your understanding of SwiftUI state.",
  "difficulty": "medium",
  "question": "What is the difference between @State and @Binding?",
  "options": [
    {
      "id": "a",
      "text": "They're interchangeable—both store mutable data",
      "isCorrect": false,
      "explanation": "They have different ownership semantics."
    },
    {
      "id": "b",
      "text": "@State owns the data (source of truth); @Binding references someone else's @State",
      "isCorrect": true,
      "explanation": "Correct! @State creates and owns data. @Binding provides read-write access to state owned elsewhere—allowing child views to modify parent's state."
    },
    {
      "id": "c",
      "text": "@Binding is for classes, @State is for structs",
      "isCorrect": false,
      "explanation": "Both work with value types. The difference is ownership."
    },
    {
      "id": "d",
      "text": "@State is for SwiftUI, @Binding is for UIKit",
      "isCorrect": false,
      "explanation": "Both are SwiftUI property wrappers."
    }
  ]
}
-->

## Key Takeaways

- responsive SwiftUI applications, you must effectively use `@State` for local view management
- responsive SwiftUI applications, you must effectively use `@State` for local view management
- `@Binding` to connect dependencies between parent `@Binding` to connect dependencies between parent
- child components child components
- Adhering to the single source of truth principle will prevent data inconsistencies

## Next Steps

Continue to [Lists and Navigation](./05-lists-and-navigation.md) →
