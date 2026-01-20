---
estimatedTime: 15
---

# Capstone: Polish & Accessibility

> **Quick Summary:** Add accessibility support, animations, and error handling to polish your app.

**Time Estimate:** 2-3 hours

## What You'll Learn

During this module, you will learn how to add descriptive VoiceOver labels to your interface and ensure your application fully supports Dynamic Type for better readability. We'll examine the implementation of smooth, purposeful animations and walk through the essential patterns for handling and displaying errors gracefully.

## Step 1: Accessibility Labels

```swift
Button {
    task.isComplete.toggle()
} label: {
    Image(systemName: task.isComplete ? "checkmark.circle.fill" : "circle")
}
.accessibilityLabel(task.isComplete ? "Mark as incomplete" : "Mark as complete")
.accessibilityHint("Double-tap to toggle completion")
```

## Step 2: Dynamic Type Support

```swift
// Use system fonts that scale with Dynamic Type
Text(task.title)
    .font(.body)  // Scales automatically

// For custom sizes, use relative scaling
@ScaledMetric var iconSize: CGFloat = 24

Image(systemName: "checkmark")
    .font(.system(size: iconSize))
```

## Step 3: VoiceOver Optimisation

```swift
// Combine related elements
HStack {
    Image(systemName: "calendar")
    Text(date.formatted())
}
.accessibilityElement(children: .combine)

// Custom actions
.accessibilityAction(named: "Delete") {
    deleteTask()
}
```

## Step 4: Animations

```swift
// List animations
.animation(.default, value: tasks)

// Toggle animations
withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
    task.isComplete.toggle()
}

// Custom transitions
.transition(.asymmetric(
    insertion: .scale.combined(with: .opacity),
    removal: .opacity
))
```

## Step 5: Error Handling

```swift
struct TaskListView: View {
    @State private var errorMessage: String?
    @State private var showingError = false
    
    var body: some View {
        // ... view content ...
        .alert("Error", isPresented: $showingError) {
            Button("OK") { }
        } message: {
            Text(errorMessage ?? "An unknown error occurred")
        }
    }
}
```

## Checkpoint

Before moving on, verify:

Before proceeding to the final phase, verify that all interactive elements in your application have appropriate accessibility labels and that Dynamic Type scales all text correctly across your various layouts. You should also ensure that VoiceOver navigation follows a logical path, animations are consistently smooth, and that any potential errors are handled and displayed gracefully to the user. Finally, conduct a thorough test of your application with VoiceOver enabled to confirm a seamless experience for all users.

## Try It Yourself

Conduct a final review of your application's polish by enabling VoiceOver and navigating through every screen to ensure clarity. Test your interface with the largest Dynamic Type sizes, review all animations for visual smoothness, and meticulously verify that all error scenarios are handled with clear and helpful user feedback.

## Next Steps

Continue to [Phase 5: Finalisation](./06-capstone-finalisation.md) →

