# Lists and Navigation

> **Quick Summary:** Lists display scrolling content efficiently. NavigationStack provides hierarchical navigation patterns.

## What You'll Learn

- Creating lists
- NavigationStack and NavigationLink
- Detail views
- List styling

## Basic Lists

```swift
struct Item: Identifiable {
    let id = UUID()
    let name: String
}

struct ListView: View {
    let items = [
        Item(name: "First"),
        Item(name: "Second"),
        Item(name: "Third")
    ]
    
    var body: some View {
        List(items) { item in
            Text(item.name)
        }
    }
}
```

### Static Lists
```swift
List {
    Text("Row 1")
    Text("Row 2")
    Text("Row 3")
}
```

### ForEach in Lists
```swift
List {
    ForEach(items) { item in
        Text(item.name)
    }
}
```

## NavigationStack

Manages navigation hierarchy:
```swift
NavigationStack {
    List(items) { item in
        NavigationLink(item.name) {
            DetailView(item: item)
        }
    }
    .navigationTitle("Items")
}
```

### NavigationLink
```swift
// Text label
NavigationLink("Go to Detail") {
    DetailView()
}

// Custom label
NavigationLink {
    DetailView()
} label: {
    HStack {
        Image(systemName: "star")
        Text("Favorites")
    }
}
```

## Detail Views

```swift
struct DetailView: View {
    let item: Item
    
    var body: some View {
        VStack {
            Text(item.name)
                .font(.largeTitle)
        }
        .navigationTitle(item.name)
        .navigationBarTitleDisplayMode(.inline)
    }
}
```

## List Styling

### Sections
```swift
List {
    Section("Favorites") {
        ForEach(favourites) { item in
            Text(item.name)
        }
    }
    
    Section("All Items") {
        ForEach(allItems) { item in
            Text(item.name)
        }
    }
}
```

### List Styles
```swift
List { }
    .listStyle(.plain)        // No section styling
    .listStyle(.grouped)      // Grouped sections
    .listStyle(.insetGrouped) // Rounded sections
    .listStyle(.sidebar)      // Sidebar style
```

### Swipe Actions
```swift
List {
    ForEach(items) { item in
        Text(item.name)
            .swipeActions(edge: .trailing) {
                Button(role: .destructive) {
                    delete(item)
                } label: {
                    Label("Delete", systemImage: "trash")
                }
            }
    }
}
```

## Try It Yourself

### Exercise 1: Contact List

Create a list of contacts with:
- Name and avatar
- Navigation to detail view
- Sections by first letter

### Exercise 2: Swipe to Delete

Implement swipe actions:
- Delete on trailing swipe
- Favorite on leading swipe

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swiftui-navigation-quiz",
  "type": "multiple-choice",
  "title": "Lists and Navigation",
  "description": "Test your understanding of SwiftUI navigation.",
  "difficulty": "medium",
  "question": "Why must List items conform to Identifiable?",
  "options": [
    {
      "id": "a",
      "text": "For styling purposes",
      "isCorrect": false,
      "explanation": "Identifiable is about tracking, not styling."
    },
    {
      "id": "b",
      "text": "So SwiftUI can track which items changed, moved, or were removed for efficient updates and animations",
      "isCorrect": true,
      "explanation": "Correct! Unique IDs let SwiftUI diff collections efficiently. Without stable IDs, SwiftUI can't know if an item moved vs. was deleted and recreated."
    },
    {
      "id": "c",
      "text": "It's required for saving to disk",
      "isCorrect": false,
      "explanation": "Persistence is separate from Identifiable."
    },
    {
      "id": "d",
      "text": "For accessibility purposes only",
      "isCorrect": false,
      "explanation": "While IDs help accessibility, the main purpose is view diffing."
    }
  ]
}
-->

## Key Takeaways

- List efficiently displays scrolling content
- Items need Identifiable conformance
- NavigationStack manages navigation
- NavigationLink pushes detail views
- Sections organise list content

## Next Steps

Continue to [Styling and Theming](./06-styling-and-theming.md) →
