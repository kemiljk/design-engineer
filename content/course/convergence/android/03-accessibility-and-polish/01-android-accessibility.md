# Android Accessibility

> **Quick Summary:** Compose provides accessibility support through semantics. Enhance TalkBack experience with proper labels and roles.

## What You'll Learn

- How Jetpack Compose handles built-in accessibility and how to enhance it
- Using semantic properties to describe your UI to accessibility services
- Effective methods for testing with TalkBack
- How to provide meaningful content descriptions for visual elements

## Built-in Accessibility

Compose components have accessibility built-in:

```kotlin
Button(onClick = { }) {
    Text("Save")
}
// TalkBack: "Save, button, double tap to activate"

Checkbox(
    checked = isChecked,
    onCheckedChange = { isChecked = it }
)
// TalkBack: "checkbox, not checked, double tap to toggle"
```

## Content Descriptions

```kotlin
// Icon buttons need descriptions
IconButton(onClick = { }) {
    Icon(
        Icons.Default.Delete,
        contentDescription = "Delete item"
    )
}

// Decorative images
Image(
    painter = painterResource(R.drawable.background),
    contentDescription = null  // Decorative
)

// Informative images
Image(
    painter = painterResource(R.drawable.chart),
    contentDescription = "Sales increased 25% this quarter"
)
```

## Semantic Properties

```kotlin
// Heading
Text(
    "Settings",
    modifier = Modifier.semantics { heading() }
)

// State description
Box(
    modifier = Modifier.semantics {
        stateDescription = if (expanded) "expanded" else "collapsed"
    }
)

// Custom actions
Box(
    modifier = Modifier.semantics {
        customActions = listOf(
            CustomAccessibilityAction("Delete") { delete(); true }
        )
    }
)
```

## Merging Semantics

```kotlin
// Group related elements
Row(
    modifier = Modifier.semantics(mergeDescendants = true) { }
) {
    Icon(Icons.Default.Star, contentDescription = null)
    Text("4.5")
}
// TalkBack: "4.5, star"

// Clear children, set custom
Row(
    modifier = Modifier
        .clearAndSetSemantics {
            contentDescription = "Rating: 4.5 out of 5 stars"
        }
) {
    Icon(Icons.Default.Star, null)
    Text("4.5")
}
```

## Touch Targets

```kotlin
// Minimum 48dp touch target
IconButton(
    onClick = { },
    modifier = Modifier.size(48.dp)
) {
    Icon(
        Icons.Default.Close,
        contentDescription = "Close",
        modifier = Modifier.size(24.dp)  // Visual size
    )
}
```

## Testing TalkBack

To test your app's accessibility, verify it manually using TalkBack. First, enable it in **Settings → Accessibility → TalkBack**. Then, navigate your app using swipe gestures to move focus. Verify that every interactive element is reached and announced correctly, and ensure the logical reading order makes sense for a non-visual user.

### Accessibility Scanner
For automated checks, use Google's **Accessibility Scanner** app, which can identify common issues like missing labels or small touch targets.

## Dynamic Content

```kotlin
// Live region for updates
var status by remember { mutableStateOf("Ready") }

Text(
    text = status,
    modifier = Modifier.semantics {
        liveRegion = LiveRegionMode.Polite
    }
)
// TalkBack announces changes automatically
```

## Try It Yourself

### Exercise 1: Card Accessibility
Take a complex card component and make it fully accessible. You should group the title and subtitle so they are read together, provide a descriptive content label for the image, and ensure any interactive elements within the card are clearly announced.

### Exercise 2: Form Accessibility
Enhance a form screen for accessibility. Ensure every field has a clear label, that validation errors are announced immediately when they appear, and that helpful hints are provided for complex input requirements.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-a11y-quiz",
  "type": "multiple-choice",
  "title": "Android Accessibility",
  "description": "Test your understanding of Android accessibility.",
  "difficulty": "medium",
  "question": "How do you make a custom composable accessible to TalkBack?",
  "options": [
    {
      "id": "a",
      "text": "TalkBack automatically understands all composables",
      "isCorrect": false,
      "explanation": "Custom composables often need explicit accessibility configuration."
    },
    {
      "id": "b",
      "text": "Use Modifier.semantics {} to define content description, role, and actions",
      "isCorrect": true,
      "explanation": "Correct! Modifier.semantics { contentDescription = \"Close button\"; role = Role.Button } tells TalkBack what to announce. Add onClick for clickable elements."
    },
    {
      "id": "c",
      "text": "Add a text view with visibility gone",
      "isCorrect": false,
      "explanation": "That's a View system pattern. Compose uses semantics modifiers."
    },
    {
      "id": "d",
      "text": "Accessibility requires native code",
      "isCorrect": false,
      "explanation": "Compose has full accessibility support through modifiers."
    }
  ]
}
-->

## Key Takeaways

- Jetpack Compose provides solid **accessibility defaults**, but you must enhance them
- Always add `contentDescription` for informative icons and images
- Use **semantics** modifiers to define custom behaviour for complex components
- **merge descendants** to group related elements into single focusable targets
- **merge descendants** to group related elements into single focusable targets
- Finally, there is no substitute for testing with **TalkBack** on a real device

## Next Steps

Continue to [Polish and Details](./02-polish-and-details.md) →
