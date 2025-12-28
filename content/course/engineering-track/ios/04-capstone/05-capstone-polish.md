---
estimatedTime: 15
---

# Capstone: Polish & Accessibility

> **Quick Summary:** Add accessibility support, animations, and error handling to polish your app.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Adding VoiceOver accessibility labels
- Supporting Dynamic Type
- Implementing smooth animations
- Handling errors gracefully

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

- [ ] All interactive elements have accessibility labels
- [ ] Dynamic Type scales all text appropriately
- [ ] VoiceOver navigation is logical
- [ ] Animations are smooth and purposeful
- [ ] Errors are handled and displayed gracefully
- [ ] App tested with VoiceOver enabled

## Try It Yourself

1. Enable VoiceOver and navigate through your app
2. Test with largest Dynamic Type size
3. Review all animations for smoothness
4. Test error scenarios

## Next Steps

Continue to [Phase 5: Finalisation](./06-capstone-finalisation.md) →

