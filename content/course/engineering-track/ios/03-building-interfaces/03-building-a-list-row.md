# Building a List Row

> **Quick Summary:** List rows are repeated UI patterns that need to be efficient and consistent. Learn to build reusable, well-structured rows.

## What You'll Learn

- Row composition patterns
- Efficient row design
- Swipe actions
- Selection and editing

## Basic Row

```swift
struct SimpleRow: View {
    let title: String
    let subtitle: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title)
                .font(.body)
            Text(subtitle)
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .padding(.vertical, 4)
    }
}
```

## Row with Image

```swift
struct ImageRow: View {
    let item: Item
    
    var body: some View {
        HStack(spacing: 12) {
            AsyncImage(url: item.imageURL) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } placeholder: {
                Rectangle()
                    .fill(.quaternary)
            }
            .frame(width: 60, height: 60)
            .clipShape(RoundedRectangle(cornerRadius: 8))
            
            VStack(alignment: .leading, spacing: 4) {
                Text(item.title)
                    .font(.headline)
                Text(item.subtitle)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
            
            Spacer()
            
            Image(systemName: "chevron.right")
                .font(.caption)
                .foregroundStyle(.tertiary)
        }
        .padding(.vertical, 4)
    }
}
```

## Row with Accessory

```swift
struct SettingsRow: View {
    let title: String
    let icon: String
    let iconColor: Color
    
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.body)
                .foregroundStyle(.white)
                .frame(width: 28, height: 28)
                .background(iconColor, in: RoundedRectangle(cornerRadius: 6))
            
            Text(title)
            
            Spacer()
            
            Image(systemName: "chevron.right")
                .font(.caption.weight(.semibold))
                .foregroundStyle(.tertiary)
        }
    }
}
```

## Swipeable Row

```swift
struct SwipeableRow: View {
    let item: Item
    let onDelete: () -> Void
    let onFavorite: () -> Void
    
    var body: some View {
        Text(item.title)
            .swipeActions(edge: .trailing, allowsFullSwipe: true) {
                Button(role: .destructive, action: onDelete) {
                    Label("Delete", systemImage: "trash")
                }
            }
            .swipeActions(edge: .leading) {
                Button(action: onFavorite) {
                    Label("Favorite", systemImage: "heart")
                }
                .tint(.pink)
            }
    }
}
```

## Using in Lists

```swift
struct ItemList: View {
    @State private var items: [Item]
    
    var body: some View {
        List {
            ForEach(items) { item in
                NavigationLink {
                    DetailView(item: item)
                } label: {
                    ImageRow(item: item)
                }
            }
            .onDelete(perform: deleteItems)
        }
    }
    
    func deleteItems(at offsets: IndexSet) {
        items.remove(atOffsets: offsets)
    }
}
```

## Try It Yourself

### Exercise 1: Contact Row

Build a contact row with:
- Avatar (initials fallback)
- Name and phone
- Favorite indicator

### Exercise 2: Message Row

Create a message row:
- Sender avatar
- Name, preview, timestamp
- Unread indicator

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swiftui-listrow-quiz",
  "type": "multiple-choice",
  "title": "Building a List Row",
  "description": "Test your understanding of SwiftUI list rows.",
  "difficulty": "medium",
  "question": "How do you add swipe actions to a list row in SwiftUI?",
  "options": [
    {
      "id": "a",
      "text": "Use gesture recognizers like in UIKit",
      "isCorrect": false,
      "explanation": "SwiftUI has a dedicated API for swipe actions."
    },
    {
      "id": "b",
      "text": "Use the .swipeActions() modifier with trailing/leading edge specification",
      "isCorrect": true,
      "explanation": "Correct! .swipeActions(edge: .trailing) { Button... } adds swipe actions. Specify .trailing for right-side actions, .leading for left."
    },
    {
      "id": "c",
      "text": "Swipe actions aren't available in SwiftUI",
      "isCorrect": false,
      "explanation": "SwiftUI added native swipe actions in iOS 15."
    },
    {
      "id": "d",
      "text": "Use a third-party library",
      "isCorrect": false,
      "explanation": "Native SwiftUI supports this without external dependencies."
    }
  ]
}
-->

## Key Takeaways

- Keep rows lightweight
- Use HStack for horizontal layout
- Spacer pushes content apart
- Swipe actions add functionality
- NavigationLink wraps for navigation

## Next Steps

Continue to [Building a Form](./04-building-a-form.md) →
