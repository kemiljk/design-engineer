---
estimatedTime: 15
---

# Capstone: Custom Components

> **Quick Summary:** Extract reusable view components and create custom modifiers for consistency.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Creating reusable SwiftUI view components
- Building custom view modifiers
- Designing button styles
- Creating empty state views

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
            .background(priority.color.opacity(0.15))
            .foregroundStyle(priority.color)
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

- [ ] TaskRow (or equivalent) component extracted
- [ ] Badge/status component created
- [ ] Custom view modifiers work
- [ ] Button styles applied consistently
- [ ] Empty state component ready
- [ ] Components are reusable across views

## Try It Yourself

1. Identify repeated UI patterns in your screens
2. Extract them into separate view files
3. Create modifiers for common styling
4. Test components in isolation with previews

## Next Steps

Continue to [Phase 4: Polish & Accessibility](./05-capstone-polish.md) →

