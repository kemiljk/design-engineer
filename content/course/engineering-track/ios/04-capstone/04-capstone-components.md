---
estimatedTime: 15
---

# Capstone: Custom Components

> **Quick Summary:** Extract reusable view components and create custom modifiers for consistency.

**Time Estimate:** 2-3 hours

## What You'll Learn

- During this module, you will learn how to create reusable SwiftUI view components
- build custom view modifiers for consistent styling
- build custom view modifiers for consistent styling
- We'll examine the process of designing bespoke button styles
- walk through the creation of effective empty state views to handle missing data gracefully
- walk through the creation of effective empty state views to handle missing data gracefully

## Custom Row Component

```swift
struct TaskRow: View {
    let task: Task
    
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: task.isComplete ? "checkmark.circle.fill" : "circle")
                .foregroundStyle(task.isComplete ? .green : .secondary)
                .imageScale(.large)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(task.title)
                    .strikethrough(task.isComplete)
                    .foregroundStyle(task.isComplete ? .secondary : .primary)
                
                if let dueDate = task.dueDate {
                    Label(dueDate.formatted(date: .abbreviated, time: .shortened), systemImage: "calendar")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
            
            Spacer()
            
            PriorityBadge(priority: task.priority)
        }
        .contentShape(Rectangle())
        .accessibilityElement(children: .combine)
        .accessibilityLabel(accessibilityLabel)
    }
    
    private var accessibilityLabel: String {
        var label = task.title
        label += task.isComplete ? ", completed" : ""
        label += ", \(task.priority.label) priority"
        if let dueDate = task.dueDate {
            label += ", due \(dueDate.formatted(date: .abbreviated, time: .shortened))"
        }
        return label
    }
}
```

## Custom Badge Component

```swift
struct PriorityBadge: View {
    let priority: Priority
    
    var body: some View {
        Text(priority.label)
            .font(.caption2)
            .fontWeight(.medium)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(priority.colour.opacity(0.15))
            .foregroundStyle(priority.colour)
            .clipShape(Capsule())
    }
}
```

## Custom View Modifiers

```swift
struct CardStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding()
            .background(.background)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .shadow(color: .black.opacity(0.1), radius: 4, y: 2)
    }
}

extension View {
    func cardStyle() -> some View {
        modifier(CardStyle())
    }
}
```

## Custom Button Style

```swift
struct PrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .fontWeight(.semibold)
            .foregroundStyle(.white)
            .padding(.horizontal, 24)
            .padding(.vertical, 12)
            .background(.blue)
            .clipShape(RoundedRectangle(cornerRadius: 10))
            .opacity(configuration.isPressed ? 0.8 : 1)
            .scaleEffect(configuration.isPressed ? 0.98 : 1)
            .animation(.easeInOut(duration: 0.1), value: configuration.isPressed)
    }
}
```

## Empty State Component

```swift
struct EmptyStateView: View {
    let title: String
    let message: String
    let systemImage: String
    var action: (() -> Void)?
    var actionLabel: String?
    
    var body: some View {
        ContentUnavailableView {
            Label(title, systemImage: systemImage)
        } description: {
            Text(message)
        } actions: {
            if let action, let actionLabel {
                Button(actionLabel, action: action)
                    .buttonStyle(.borderedProminent)
            }
        }
    }
}
```

## Checkpoint

Before moving on, verify:

Before proceeding, verify that your task row or equivalent component has been successfully extracted and that you have created dedicated badge or status components for your interface. You should also ensure that your custom view modifiers function as expected, that button styles are applied consistently throughout the app, and that your empty state component is fully reusable across different views.

## Try It Yourself

Enhance your application's architecture by identifying repeated UI patterns across your screens and extracting them into separate, manageable view files. Create custom modifiers for common styling needs and meticulously test each component in isolation using SwiftUI previews to ensure they are robust and visually consistent.

## Next Steps

Continue to [Phase 4: Polish & Accessibility](./05-capstone-polish.md) →

