---
estimatedTime: 15
---

# Capstone: Accessibility Implementation

> **Quick Summary:** Implement VoiceOver support, Dynamic Type, and reduced motion alternatives.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Optimising for VoiceOver
- Supporting Dynamic Type with adaptive layouts
- Creating reduced motion alternatives
- Making screen reader announcements

## VoiceOver Optimisation

```swift
struct TaskRow: View {
    let task: Task
    let onToggle: () -> Void
    let onDelete: () -> Void
    
    var body: some View {
        HStack {
            // Content...
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel(accessibilityLabel)
        .accessibilityHint("Double tap to view details")
        .accessibilityAction(named: "Toggle completion") {
            onToggle()
        }
        .accessibilityAction(named: "Delete") {
            onDelete()
        }
    }
    
    private var accessibilityLabel: String {
        var label = task.title
        label += task.isComplete ? ", completed" : ""
        label += ", \(task.priority.label) priority"
        return label
    }
}
```

## Dynamic Type Support

```swift
struct AdaptiveCard: View {
    let title: String
    let subtitle: String
    let icon: String
    
    @Environment(\.dynamicTypeSize) var dynamicTypeSize
    
    var body: some View {
        Group {
            if dynamicTypeSize >= .accessibility1 {
                // Stack vertically for larger text
                VStack(alignment: .leading, spacing: 12) {
                    Image(systemName: icon)
                    VStack(alignment: .leading) {
                        Text(title).font(.headline)
                        Text(subtitle).font(.subheadline)
                    }
                }
            } else {
                // Standard horizontal layout
                HStack(spacing: 16) {
                    Image(systemName: icon)
                    VStack(alignment: .leading) {
                        Text(title).font(.headline)
                        Text(subtitle).font(.subheadline)
                    }
                    Spacer()
                }
            }
        }
        .padding()
    }
}
```

## Reduced Motion Helper

```swift
extension View {
    func motionAwareAnimation<V: Equatable>(
        _ animation: Animation?,
        value: V
    ) -> some View {
        modifier(MotionAwareAnimationModifier(animation: animation, value: value))
    }
}

struct MotionAwareAnimationModifier<V: Equatable>: ViewModifier {
    let animation: Animation?
    let value: V
    @Environment(\.accessibilityReduceMotion) var reduceMotion
    
    func body(content: Content) -> some View {
        content.animation(reduceMotion ? nil : animation, value: value)
    }
}
```

## Screen Reader Announcements

```swift
private func saveData() {
    // Save logic
    status = "Saved successfully"
    
    // Announce to VoiceOver
    UIAccessibility.post(
        notification: .announcement,
        argument: "Saved successfully"
    )
}
```

## Checkpoint

Before moving on, verify:

- [ ] VoiceOver fully supported
- [ ] Dynamic Type adapts layout
- [ ] Reduced motion alternatives work
- [ ] Status announcements implemented

## Next Steps

Continue to [Phase 4: Polish & Details](./05-capstone-polish.md) →

