# Building a Card

> **Quick Summary:** Cards are versatile containers for related content. Learn to build flexible, reusable card components in SwiftUI.

## What You'll Learn

- Card structure and composition
- Material and shadows
- Flexible content slots
- Interactive cards

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
            .shadow(colour: .black.opacity(0.1), radius: 8, y: 4)
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
- Avatar image
- Name and title
- Social stats row
- Follow button

### Exercise 2: Product Card

Create a product card:
- Product image
- Name and price
- Rating stars
- Add to cart button

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
      "explanation": "Correct! .shadow(colour: .black.opacity(0.1), radius: 8, y: 4) creates subtle, realistic elevation. Avoid harsh, high-opacity shadows."
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

- Use @ViewBuilder for flexible content
- Combine padding, background, clip, shadow
- Add interaction states for tappable cards
- Compose from smaller components

## Next Steps

Continue to [Building a List Row](./03-building-a-list-row.md) →
