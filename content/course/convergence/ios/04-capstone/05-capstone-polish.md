---
estimatedTime: 15
---

# Capstone: Polish & Details

> **Quick Summary:** Add loading states, empty states, error handling, and haptic feedback.

**Time Estimate:** 2-3 hours

The final code phase is about resilience and delight. You will learn to **design loading states** that keep users engaged, create helpful **empty states** for when content is missing, handle **errors gracefully** with clear recovery paths, and add tactile **haptic feedback** to key interactions.

## Loading States

```swift
struct LoadingStateView: View {
    var body: some View {
        VStack(spacing: 16) {
            ProgressView()
                .scaleEffect(1.2)
            
            Text("Loading...")
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel("Loading content")
    }
}
```

## Empty States

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

## Error Handling

```swift
struct ErrorView: View {
    let error: Error
    let retry: () -> Void
    
    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "exclamationmark.triangle")
                .font(.largeTitle)
                .foregroundStyle(.orange)
            
            Text("Something went wrong")
                .font(.headline)
            
            Text(error.localizedDescription)
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
            
            Button("Try Again", action: retry)
                .buttonStyle(.bordered)
        }
        .padding()
        .accessibilityElement(children: .combine)
    }
}
```

## Haptic Feedback

```swift
class HapticManager {
    static let shared = HapticManager()
    
    private let impactLight = UIImpactFeedbackGenerator(style: .light)
    private let notification = UINotificationFeedbackGenerator()
    private let selection = UISelectionFeedbackGenerator()
    
    func impact(_ style: UIImpactFeedbackGenerator.FeedbackStyle = .medium) {
        UIImpactFeedbackGenerator(style: style).impactOccurred()
    }
    
    func notification(_ type: UINotificationFeedbackGenerator.FeedbackType) {
        notification.notificationOccurred(type)
    }
    
    func selection() {
        selection.selectionChanged()
    }
}

// Usage
Button("Save") {
    HapticManager.shared.notification(.success)
    save()
}
```

## Checkpoint

Before moving on, verify:

- [ ] Loading states implemented
- [ ] Empty states designed
- [ ] Error handling graceful
- [ ] Haptic feedback added

## Next Steps

Continue to [Phase 5: Documentation & Delivery](./06-capstone-delivery.md) →

