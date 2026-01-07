# State Management

> **Quick Summary:** SwiftUI uses property wrappers to manage state. Understanding @State, @Binding, and @ObservableObject is essential for dynamic UIs.

## What You'll Learn

- @State for local state
- @Binding for child views
- Source of truth concept
- Observable objects for shared state

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
- Simple value types (Int, String, Bool)
- State owned by this view
- Private to the view

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
- Parent owns state
- Children receive bindings
- Changes flow back up automatically

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
- A toggle that shows/hides content
- @State for the toggle value

### Exercise 2: Parent-Child Binding

Create:
- Parent with @State text
- Child TextField with @Binding
- Display text updates in parent

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

- @State for view-local state
- @Binding for child view connections
- Single source of truth principle
- @Observable for complex state
- Environment for deep sharing

## Next Steps

Continue to [Lists and Navigation](./05-lists-and-navigation.md) →
