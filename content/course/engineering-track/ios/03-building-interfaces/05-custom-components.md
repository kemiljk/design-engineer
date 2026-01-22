# Custom Components

> **Quick Summary:** Build reusable, well-designed components by extracting common patterns and following SwiftUI idioms.

## What You'll Learn

- Best practices for component extraction
- The power of using generics to build flexible UI containers
- Robust methods for view configuration

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
    let color: Color
    
    init(_ text: String, color: Color = .blue) {
        self.text = text
        self.color = color
    }
    
    var body: some View {
        Text(text)
            .font(.caption)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(color, in: Capsule())
            .foregroundStyle(.white)
    }
}

Badge("New")
Badge("Sale", color: .red)
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
Practise your component architecture skills by building a versatile Avatar component that displays either a user image or an initials fallback. Your implementation should support multiple predefined sizes—such as small, medium, and large—and include an optional status indicator for real-time presence.

### Exercise 2: Empty State

Create an EmptyState component:
Develop an EmptyState component that effectively communicates a lack of content using an icon, title, and descriptive text. Ensure the component is designed to be reusable across various screens and includes an optional action button to guide the user's next steps.

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

- To build a maintainable and scalable SwiftUI application, you should always extract repeated patterns into dedicated components
- Use generics to create flexible view containers
- Configure your components efficiently through initialisers or the environment
- Prioritise writing comprehensive previews to account for different states
- By keeping your components focused and composable, you can ensure a consistent and high-quality user experience across your entire codebase

## Congratulations!

You've completed the iOS Engineering Track!

**What's Next?**

→ [iOS Convergence Track](../../convergence/ios/01-ios-motion-and-animation/01-swiftui-animation.md) for advanced motion and polish

→ Return to the [Course Overview](/course) to explore other tracks
