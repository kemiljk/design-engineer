# Android Accessibility

> **Quick Summary:** Compose provides accessibility support through semantics. Enhance TalkBack experience with proper labels and roles.

## What You'll Learn

- Built-in accessibility
- Semantic properties
- TalkBack testing
- Content descriptions

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

1. Enable TalkBack: Settings → Accessibility → TalkBack
2. Navigate with swipe gestures
3. Verify all elements are announced
4. Check reading order makes sense

### Accessibility Scanner
Use Google's Accessibility Scanner app for automated checks.

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

Make a complex card accessible:
- Group title and subtitle
- Describe image content
- Announce interactive elements

### Exercise 2: Form Accessibility

Enhance a form:
- Label all fields
- Announce errors
- Provide hints

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

- Compose provides solid accessibility defaults
- Add contentDescription for icons/images
- Use semantics for custom behaviour
- Merge descendants for grouped elements
- Test with TalkBack on device

## Next Steps

Continue to [Polish and Details](./02-polish-and-details.md) →
