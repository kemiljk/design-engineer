# Building a Card

> **Quick Summary:** Cards are versatile containers for related content. Learn to build flexible, reusable card components in SwiftUI.

## What You'll Learn

- During this module, you will learn to design robust card structures
- examine how to implement materials examine how to implement materials and shadows for added depth
- We'll explore the creation of flexible content slots
- walk through the techniques needed to build interactive cards that respond to user gestures
- walk through the techniques needed to build interactive cards that respond to user gestures

## Basic Card

```swift
struct Card<Content: View>: View {
    let content: Content
    
    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }
    
    var body: some View {
        content
            .padding()
            .background(.background)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .shadow(color: .black.opacity(0.1), radius: 8, y: 4)
    }
}

// Usage
Card {
    VStack(alignment: .leading) {
        Text("Title")
            .font(.headline)
        Text("Description")
            .foregroundStyle(.secondary)
    }
}
```

## Content Card

```swift
struct ContentCard: View {
    let title: String
    let subtitle: String
    let imageName: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Image(imageName)
                .resizable()
                .aspectRatio(16/9, contentMode: .fill)
                .clipped()
            
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.headline)
                Text(subtitle)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
            .padding()
        }
        .background(.background)
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .shadow(radius: 4)
    }
}
```

## Interactive Card

```swift
struct TappableCard<Content: View>: View {
    let action: () -> Void
    let content: Content
    
    @State private var isPressed = false
    
    init(action: @escaping () -> Void, @ViewBuilder content: () -> Content) {
        self.action = action
        self.content = content()
    }
    
    var body: some View {
        content
            .padding()
            .background(.background)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .shadow(radius: isPressed ? 2 : 8)
            .scaleEffect(isPressed ? 0.98 : 1)
            .animation(.easeOut(duration: 0.15), value: isPressed)
            .onTapGesture {
                action()
            }
            .onLongPressGesture(minimumDuration: .infinity, pressing: { pressing in
                isPressed = pressing
            }, perform: {})
    }
}
```

## Card with Actions

```swift
struct ActionCard: View {
    let item: Item
    let onFavorite: () -> Void
    let onShare: () -> Void
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(item.title)
                .font(.headline)
            
            Text(item.description)
                .font(.body)
                .foregroundStyle(.secondary)
            
            HStack {
                Button(action: onFavorite) {
                    Image(systemName: "heart")
                }
                Button(action: onShare) {
                    Image(systemName: "square.and.arrow.up")
                }
                Spacer()
            }
            .buttonStyle(.bordered)
        }
        .padding()
        .background(.background)
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}
```

## Try It Yourself

### Exercise 1: Profile Card

Build a card with:
Construct a comprehensive profile card that includes a circular avatar image alongside the user's name and professional title. You should also incorporate a row for social statistics and a clearly labelled follow button to encourage user interaction.

### Exercise 2: Product Card

Create a product card:
Design a functional product card featuring a large product image, name, and current price. Complement the layout with a rating star display and a prominent "Add to Cart" button for a complete shopping experience.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swiftui-card-quiz",
  "type": "multiple-choice",
  "title": "Building a Card",
  "description": "Test your understanding of card components.",
  "difficulty": "easy",
  "question": "How should you add a shadow to a card in SwiftUI for the best appearance?",
  "options": [
    {
      "id": "a",
      "text": "Draw a border that looks like a shadow",
      "isCorrect": false,
      "explanation": "Borders don't provide realistic depth like shadows do."
    },
    {
      "id": "b",
      "text": "Use .shadow() with subtle radius and low opacity for depth without harshness",
      "isCorrect": true,
      "explanation": "Correct! .shadow(color: .black.opacity(0.1), radius: 8, y: 4) creates subtle, realistic elevation. Avoid harsh, high-opacity shadows."
    },
    {
      "id": "c",
      "text": "Use maximum shadow radius for visibility",
      "isCorrect": false,
      "explanation": "Large shadows look unrealistic and can be distracting."
    },
    {
      "id": "d",
      "text": "Shadows aren't used in iOS design",
      "isCorrect": false,
      "explanation": "Subtle shadows are used throughout iOS for depth and hierarchy."
    }
  ]
}
-->

## Key Takeaways

- Master the combination of padding, background styling, clipping
- subtle shadows to define your card's visual identity
- subtle shadows to define your card's visual identity
- Finally, remember to add interaction states for any tappable cards
- compose your final layouts from smaller, more manageable components to ensure maintainability
- compose your final layouts from smaller, more manageable components to ensure maintainability

## Next Steps

Continue to [Building a List Row](./03-building-a-list-row.md) →
