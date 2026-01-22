# iOS Accessibility

> **Quick Summary:** SwiftUI has excellent accessibility support built-in. Learn to enhance it with labels, traits, and VoiceOver testing.

## What You'll Learn

- How iOS handles built-in accessibility and how to enhance it
- Providing descriptive custom accessibility labels
- Ensuring your app scales correctly with Dynamic Type
- How to verify your work using VoiceOver testing

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

To test your app's accessibility, you must use VoiceOver on a physical device. First, enable it in **Settings → Accessibility → VoiceOver**. Then, navigate your app using standard swipe gestures. Verify that every interactive element is announced correctly and that the reading order follows a logical flow.

### Accessibility Inspector
Xcode → Open Developer Tool → Accessibility Inspector

## Reduced Motion

```swift
@Environment(\.accessibilityReduceMotion) var reduceMotion

.animation(reduceMotion ? nil : .spring(), value: isExpanded)
```

## Try It Yourself

### Exercise 1: Image Gallery
Make a photo gallery fully accessible. You should ensure each image has a clear label, **group the caption** with its corresponding image so they are read as a single unit, and announce the **image count** (e.g., "Image 1 of 5") to provide context.

### Exercise 2: Form Accessibility
Enhance a data entry form. Ensure all fields have clear, descriptive **labels**. Implement custom announcements for **validation errors** so users know exactly what went wrong, and manage **focus** so the cursor moves logically between fields.

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
      "explanation": "SwiftUI provides foundations, but you still need to add labels and customise behaviour."
    }
  ]
}
-->

## Key Takeaways

- SwiftUI provides **solid accessibility defaults**, but you must go further
- Always add **accessibility labels** for icon-only buttons
- **group related elements** to reduce clutter **group related elements** to reduce clutter
- respect the **Reduce Motion** setting for users who are sensitive to animation
- respect the **Reduce Motion** setting for users who are sensitive to animation

## Next Steps

Continue to [Polish and Details](./02-polish-and-details.md) →
