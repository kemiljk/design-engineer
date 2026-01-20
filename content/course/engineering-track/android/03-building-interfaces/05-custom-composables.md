# Custom Composables

> **Quick Summary:** Build reusable composables by extracting common patterns, using slots for flexibility, and following Compose idioms.

## What You'll Learn

During this module, you will learn to extract reusable components from complex UI patterns and master the use of slot-based APIs for ultimate flexibility. We'll examine the benefits of preview-driven development and establish a set of best practices to ensure your custom composables are robust and maintainable.

## Extracting Components

### Before
```kotlin
// Repeated in multiple places
Row(verticalAlignment = Alignment.CenterVertically) {
    AsyncImage(url, Modifier.size(40.dp).clip(CircleShape))
    Spacer(Modifier.width(12.dp))
    Column {
        Text(name, style = MaterialTheme.typography.titleMedium)
        Text(subtitle, style = MaterialTheme.typography.bodySmall)
    }
}
```

### After
```kotlin
@Composable
fun UserRow(
    avatarUrl: String,
    name: String,
    subtitle: String,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier,
        verticalAlignment = Alignment.CenterVertically
    ) {
        AsyncImage(
            model = avatarUrl,
            contentDescription = null,
            modifier = Modifier.size(40.dp).clip(CircleShape)
        )
        Spacer(Modifier.width(12.dp))
        Column {
            Text(name, style = MaterialTheme.typography.titleMedium)
            Text(subtitle, style = MaterialTheme.typography.bodySmall)
        }
    }
}
```

## Slot-Based APIs

```kotlin
@Composable
fun InfoCard(
    title: String,
    modifier: Modifier = Modifier,
    icon: @Composable (() -> Unit)? = null,
    action: @Composable (() -> Unit)? = null,
    content: @Composable () -> Unit
) {
    Card(modifier = modifier) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                icon?.invoke()
                if (icon != null) Spacer(Modifier.width(8.dp))
                Text(title, style = MaterialTheme.typography.titleMedium)
                Spacer(Modifier.weight(1f))
                action?.invoke()
            }
            Spacer(Modifier.height(8.dp))
            content()
        }
    }
}

// Usage
InfoCard(
    title = "Settings",
    icon = { Icon(Icons.Default.Settings, null) },
    action = { IconButton(onClick = {}) { Icon(Icons.Default.Edit, null) } }
) {
    Text("Configure your preferences")
}
```

## Configurable Components

```kotlin
@Composable
fun Badge(
    text: String,
    modifier: Modifier = Modifier,
    style: BadgeStyle = BadgeStyle.Default
) {
    val (backgroundColor, textColor) = when (style) {
        BadgeStyle.Default -> MaterialTheme.colorScheme.primaryContainer to 
                             MaterialTheme.colorScheme.onPrimaryContainer
        BadgeStyle.Success -> Color(0xFF4CAF50) to Color.White
        BadgeStyle.Error -> MaterialTheme.colorScheme.errorContainer to 
                           MaterialTheme.colorScheme.onErrorContainer
    }
    
    Text(
        text = text,
        modifier = modifier
            .background(backgroundColor, RoundedCornerShape(4.dp))
            .padding(horizontal = 8.dp, vertical = 4.dp),
        color = textColor,
        style = MaterialTheme.typography.labelSmall
    )
}

enum class BadgeStyle { Default, Success, Error }
```

## Preview-Driven Development

```kotlin
@Preview(name = "Light Mode")
@Preview(name = "Dark Mode", uiMode = UI_MODE_NIGHT_YES)
@Composable
private fun UserRowPreview() {
    MyAppTheme {
        Surface {
            UserRow(
                avatarUrl = "",
                name = "John Doe",
                subtitle = "Software Engineer"
            )
        }
    }
}

@Preview
@Composable
private fun BadgePreview() {
    MyAppTheme {
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Badge("Default")
            Badge("Success", style = BadgeStyle.Success)
            Badge("Error", style = BadgeStyle.Error)
        }
    }
}
```

## Component Guidelines

### Accept Modifier
```kotlin
@Composable
fun MyComponent(
    modifier: Modifier = Modifier  // Always accept modifier
) {
    Box(modifier = modifier) { }
}
```

### Provide Defaults
```kotlin
@Composable
fun Button(
    text: String,
    onClick: () -> Unit,
    enabled: Boolean = true,  // Sensible defaults
    style: ButtonStyle = ButtonStyle.Primary
)
```

### Keep State Hoisted
```kotlin
// Stateless composable
@Composable
fun Counter(
    count: Int,
    onIncrement: () -> Unit,
    onDecrement: () -> Unit
)
```

## Try It Yourself

### Exercise 1: Stat Card

Practise your component architecture by creating a reusable stat card. Your design should feature a title, a numerical value, and a trend indicator, with configurable directions for both upward and downward movements. Ensure you include multiple preview states to verify the design under different conditions.

### Exercise 2: Empty State

Further enhance your design system by building a flexible empty state component. Your implementation should provide dedicated slots for an icon, a title and description, and an action button, alongside various preview variations to demonstrate its versatility.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "compose-custom-quiz",
  "type": "multiple-choice",
  "title": "Custom Composables",
  "description": "Test your understanding of composable design.",
  "difficulty": "easy",
  "question": "What makes @Preview useful during development?",
  "options": [
    {
      "id": "a",
      "text": "It makes the app run faster",
      "isCorrect": false,
      "explanation": "Preview is for development, not runtime performance."
    },
    {
      "id": "b",
      "text": "You can see UI without running the app, and preview multiple states/themes side by side",
      "isCorrect": true,
      "explanation": "Correct! @Preview shows composables in Android Studio without building the app. You can preview different themes, sizes, locales, and states simultaneously."
    },
    {
      "id": "c",
      "text": "It generates documentation automatically",
      "isCorrect": false,
      "explanation": "Preview is for visual development, not documentation."
    },
    {
      "id": "d",
      "text": "It's required for all composables",
      "isCorrect": false,
      "explanation": "@Preview is optional—add it to composables you want to preview."
    }
  ]
}
-->

## Key Takeaways

To build a scalable and professional interface in Compose, you must extract repeated patterns into dedicated composables and use slots to allow for flexible content injection. Always accept a `Modifier` as your first optional parameter to ensure external calls can control layout, and utilise previews throughout the development process to document and verify your components' visual states. Finally, prioritise keeping your components stateless whenever possible to maximise their reusability across your entire application.

## Congratulations!

You've completed the Android Engineering Track!

**What's Next?**

→ [Android Convergence Track](../../convergence/android/01-android-motion-and-animation/01-compose-animation.md) for advanced animation and polish

→ Return to the [Course Overview](/course) to explore other tracks
