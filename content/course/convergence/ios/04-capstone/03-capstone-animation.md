---
estimatedTime: 20
---

# Capstone: Animation Implementation

> **Quick Summary:** Implement view transitions, component animations, and custom transitions.

**Time Estimate:** 3-4 hours

## What You'll Learn

- How to implement matched geometry transitions for seamless navigation
- Building animated components that support standard and reduced motion
- Implementing smooth list animations
- Designing custom transitions using anytransition

In this phase, you will implement **matched geometry transitions** for seamless navigation. You will build **animated components** that fully support standard and reduced motion settings, implement smooth **list animations**, and design bespoke **custom transitions** using AnyTransition.

## View Transitions

```swift
struct ContentView: View {
    @Namespace private var animation
    @State private var selectedItem: Item?
    
    var body: some View {
        ZStack {
            if let item = selectedItem {
                DetailView(item: item, namespace: animation) {
                    withAnimation(.spring(response: 0.35, dampingFraction: 0.85)) {
                        selectedItem = nil
                    }
                }
            } else {
                ListView(namespace: animation) { item in
                    withAnimation(.spring(response: 0.35, dampingFraction: 0.85)) {
                        selectedItem = item
                    }
                }
            }
        }
    }
}
```

## Animated Button

```swift
struct AnimatedButton: View {
    let title: String
    let action: () -> Void
    
    @State private var isPressed = false
    @Environment(\.accessibilityReduceMotion) var reduceMotion
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .fontWeight(.semibold)
                .foregroundStyle(.white)
                .padding(.horizontal, 24)
                .padding(.vertical, 12)
                .background(.blue)
                .clipShape(RoundedRectangle(cornerRadius: 10))
                .scaleEffect(isPressed ? 0.96 : 1)
                .animation(
                    reduceMotion ? nil : .spring(response: 0.2, dampingFraction: 0.6),
                    value: isPressed
                )
        }
        .buttonStyle(.plain)
        .onLongPressGesture(minimumDuration: .infinity, pressing: { pressing in
            isPressed = pressing
        }, perform: {})
    }
}
```

## List Animations

```swift
struct AnimatedList: View {
    @State private var items: [Item]
    @Environment(\.accessibilityReduceMotion) var reduceMotion
    
    var body: some View {
        List {
            ForEach(items) { item in
                ItemRow(item: item)
                    .transition(
                        reduceMotion 
                            ? .opacity 
                            : .asymmetric(
                                insertion: .slide.combined(with: .opacity),
                                removal: .slide.combined(with: .opacity)
                              )
                    )
            }
            .onDelete(perform: deleteItems)
        }
        .animation(reduceMotion ? nil : .default, value: items)
    }
}
```

## Custom Transitions

```swift
extension AnyTransition {
    static var bounceScale: AnyTransition {
        .scale(scale: 0.5)
        .combined(with: .opacity)
        .animation(.spring(response: 0.4, dampingFraction: 0.6))
    }
}
```

## Checkpoint

Before moving on, verify:

- [ ] View transitions implemented
- [ ] Component animations added
- [ ] List animations smooth
- [ ] Custom transitions created
- [ ] All animations respect reduced motion

## Next Steps

Continue to [Phase 3: Accessibility Implementation](./04-capstone-accessibility.md) →

