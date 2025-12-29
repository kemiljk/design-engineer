# iOS Accessibility

> **Quick Summary:** SwiftUI has excellent accessibility support built-in. Learn to enhance it with labels, traits, and VoiceOver testing.

## What You'll Learn

- Built-in accessibility
- Custom accessibility labels
- VoiceOver testing
- Dynamic Type support

## Built-in Accessibility

SwiftUI provides accessibility automatically:

```swift
Button("Save") {
    save()
}
// VoiceOver: "Save, button"

Toggle("Notifications", isOn: $enabled)
// VoiceOver: "Notifications, switch button, off"
```

## Custom Labels

```swift
Button(action: delete) {
    Image(systemName: "trash")
}
.accessibilityLabel("Delete item")

Image(decorative: "background")  // Ignored by VoiceOver
```

### Labels and Hints
```swift
TextField("", text: $query)
    .accessibilityLabel("Search")
    .accessibilityHint("Enter search terms")

Button("Submit") { }
    .accessibilityHint("Submits your order")
```

## Accessibility Traits

```swift
Text("Welcome")
    .accessibilityAddTraits(.isHeader)

Button("Play") { }
    .accessibilityAddTraits(.startsMediaSession)

Link("Learn More", destination: url)
    .accessibilityAddTraits(.isLink)
```

## Grouping

```swift
HStack {
    Image(systemName: "star.fill")
    Text("4.5 rating")
}
.accessibilityElement(children: .combine)
// VoiceOver: "4.5 rating, star fill"

// Or ignore children entirely
.accessibilityElement(children: .ignore)
.accessibilityLabel("4.5 star rating")
```

## Dynamic Type

```swift
Text("Hello")
    .font(.body)  // Automatically scales

// Custom fonts need explicit scaling
Text("Hello")
    .font(.custom("MyFont", size: 16, relativeTo: .body))

// Limit scaling if needed
Text("Hello")
    .dynamicTypeSize(.large ... .accessibility2)
```

## Testing VoiceOver

1. Enable VoiceOver: Settings → Accessibility → VoiceOver
2. Navigate with swipe gestures
3. Check every element is announced correctly
4. Verify order makes sense

### Accessibility Inspector
Xcode → Open Developer Tool → Accessibility Inspector

## Reduced Motion

```swift
@Environment(\.accessibilityReduceMotion) var reduceMotion

.animation(reduceMotion ? nil : .spring(), value: isExpanded)
```

## Try It Yourself

### Exercise 1: Image Gallery

Make an image gallery accessible:
- Label each image
- Group caption with image
- Announce image count

### Exercise 2: Form Accessibility

Enhance a form:
- Clear labels
- Error announcements
- Focus management

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-a11y-quiz",
  "type": "multiple-choice",
  "title": "iOS Accessibility",
  "description": "Test your understanding of iOS accessibility.",
  "difficulty": "medium",
  "question": "How do you provide a custom VoiceOver description in SwiftUI?",
  "options": [
    {
      "id": "a",
      "text": "Use a comment in the code",
      "isCorrect": false,
      "explanation": "Comments aren't read by VoiceOver. You need accessibility modifiers."
    },
    {
      "id": "b",
      "text": "Use .accessibilityLabel() to set the spoken description",
      "isCorrect": true,
      "explanation": "Correct! .accessibilityLabel(\"Heart button\") tells VoiceOver what to announce. Combine with .accessibilityHint() for additional context about what happens on activation."
    },
    {
      "id": "c",
      "text": "VoiceOver automatically reads all text correctly",
      "isCorrect": false,
      "explanation": "Icons, images, and custom views often need explicit labels."
    },
    {
      "id": "d",
      "text": "Accessibility is automatic in SwiftUI",
      "isCorrect": false,
      "explanation": "SwiftUI provides foundations, but you still need to add labels and customize behaviour."
    }
  ]
}
-->

## Key Takeaways

- SwiftUI provides solid defaults
- Add labels for icon-only buttons
- Group related elements
- Test with VoiceOver
- Support Dynamic Type
- Respect Reduce Motion

## Next Steps

Continue to [Polish and Details](./02-polish-and-details.md) →
