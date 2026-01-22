# Lists and Navigation

> **Quick Summary:** Lists display scrolling content efficiently. NavigationStack provides hierarchical navigation patterns.

## What You'll Learn

- How to create high-performance scrolling lists
- How to master the use of `NavigationStack` and `NavigationLink` for hierarchical app navigation
- How to build effective detail views
- The various styling options available for customising your list interfaces

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
    Section("Favourites") {
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
Practise your navigation skills by creating a contacts list that displays names alongside avatars and enables seamless navigation to a dedicated detail view. You should also organise the list into sections based on the first letter of each contact's name for improved usability.

### Exercise 2: Swipe to Delete

Enhance your list interactions by implementing custom swipe actions. Configure a destructive delete action for trailing swipes and a favourite action for leading swipes to provide a modern and efficient user experience.

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

- To build sophisticated iOS applications, leverage `NavigationStack` to handle your app's hierarchy
- Use `NavigationLink` to push detailed content as needed
- Employ sections to organise your list data logically and provide a clear structure for your users

## Next Steps

Continue to [Styling and Theming](./06-styling-and-theming.md) →
