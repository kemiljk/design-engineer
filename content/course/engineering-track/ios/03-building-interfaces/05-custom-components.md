# Custom Components

> **Quick Summary:** Build reusable, well-designed components by extracting common patterns and following SwiftUI idioms.

## What You'll Learn

- Component extraction
- Generic components
- View configuration
- Preview-driven development

## Extracting Components

### Before (Repeated Code)
```swift
// In multiple places
HStack {
    Image(systemName: "star.fill")
        .foregroundStyle(.yellow)
    Text("4.5")
        .font(.subheadline)
}
```

### After (Reusable Component)
```swift
struct RatingView: View {
    let rating: Double
    let maxRating: Int
    
    init(rating: Double, maxRating: Int = 5) {
        self.rating = rating
        self.maxRating = maxRating
    }
    
    var body: some View {
        HStack(spacing: 4) {
            ForEach(1...maxRating, id: \.self) { index in
                Image(systemName: index <= Int(rating) ? "star.fill" : "star")
                    .foregroundStyle(index <= Int(rating) ? .yellow : .grey)
            }
            Text(String(format: "%.1f", rating))
                .font(.subheadline)
        }
    }
}
```

## Generic Components

```swift
struct LoadingView<Content: View>: View {
    let isLoading: Bool
    let content: () -> Content
    
    var body: some View {
        ZStack {
            content()
                .opacity(isLoading ? 0.3 : 1)
            
            if isLoading {
                ProgressView()
            }
        }
    }
}

// Usage
LoadingView(isLoading: viewModel.isLoading) {
    ContentList(items: viewModel.items)
}
```

## Component Configuration

### Via Initializer
```swift
struct Badge: View {
    let text: String
    let colour: Color
    
    init(_ text: String, colour: Color = .blue) {
        self.text = text
        self.colour = colour
    }
    
    var body: some View {
        Text(text)
            .font(.caption)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(colour, in: Capsule())
            .foregroundStyle(.white)
    }
}

Badge("New")
Badge("Sale", colour: .red)
```

### Via Environment
```swift
struct CardStyle: EnvironmentKey {
    static let defaultValue: CardVariant = .elevated
}

enum CardVariant {
    case elevated, outlined, filled
}

extension EnvironmentValues {
    var cardStyle: CardVariant {
        get { self[CardStyle.self] }
        set { self[CardStyle.self] = newValue }
    }
}

// Apply to subtree
VStack {
    Card { /* content */ }
    Card { /* content */ }
}
.environment(\.cardStyle, .outlined)
```

## Preview-Driven Development

```swift
struct ProfileHeader: View {
    let user: User
    
    var body: some View {
        HStack {
            AsyncImage(url: user.avatarURL) { image in
                image.resizable()
            } placeholder: {
                Circle().fill(.quaternary)
            }
            .frame(width: 60, height: 60)
            .clipShape(Circle())
            
            VStack(alignment: .leading) {
                Text(user.name).font(.headline)
                Text(user.title).foregroundStyle(.secondary)
            }
        }
    }
}

#Preview("Default") {
    ProfileHeader(user: .preview)
}

#Preview("Long Name") {
    ProfileHeader(user: .init(
        name: "Very Long Name That Might Wrap",
        title: "Senior Design Engineer"
    ))
}

#Preview("No Avatar") {
    ProfileHeader(user: .init(name: "John", avatarURL: nil))
}
```

## Try It Yourself

### Exercise 1: Avatar Component

Build an Avatar component:
- Shows image or initials fallback
- Multiple sizes (small, medium, large)
- Optional status indicator

### Exercise 2: Empty State

Create an EmptyState component:
- Icon, title, description
- Optional action button
- Reusable across screens

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swiftui-custom-quiz",
  "type": "multiple-choice",
  "title": "Custom Components",
  "description": "Test your understanding of SwiftUI component design.",
  "difficulty": "easy",
  "question": "What makes a SwiftUI component reusable?",
  "options": [
    {
      "id": "a",
      "text": "Making it as feature-rich as possible",
      "isCorrect": false,
      "explanation": "Too many features can make components inflexible."
    },
    {
      "id": "b",
      "text": "Clear inputs (parameters), focused responsibility, and sensible defaults with customisation options",
      "isCorrect": true,
      "explanation": "Correct! Good components have clear APIs, do one thing well, work out of the box with defaults, and allow customisation where needed."
    },
    {
      "id": "c",
      "text": "Hard-coding all values to ensure consistency",
      "isCorrect": false,
      "explanation": "Hard-coded values prevent reuse in different contexts."
    },
    {
      "id": "d",
      "text": "Using global state for all data",
      "isCorrect": false,
      "explanation": "Global state creates tight coupling—pass data through parameters."
    }
  ]
}
-->

## Key Takeaways

- Extract repeated patterns into components
- Use generics for flexible containers
- Configure via initializer or environment
- Write previews for different states
- Keep components focused and composable

## Congratulations!

You've completed the iOS Engineering Track!

**What's Next?**

→ [iOS Convergence Track](../../convergence/ios/01-ios-motion-and-animation/01-swiftui-animation.md) for advanced motion and polish

→ Return to the [Course Overview](/course) to explore other tracks
