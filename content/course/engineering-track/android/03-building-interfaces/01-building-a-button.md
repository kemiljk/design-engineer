# Building a Button

> **Quick Summary:** Material 3 provides various button styles. Learn to use them correctly and create custom buttons when needed.

## What You'll Learn

- Material 3 button types
- Custom button styling
- Loading and disabled states
- Accessibility

## Material 3 Buttons

### Button Types
```kotlin
// High emphasis
Button(onClick = { }) {
    Text("Filled")
}

// Medium emphasis
FilledTonalButton(onClick = { }) {
    Text("Tonal")
}

// Medium emphasis
OutlinedButton(onClick = { }) {
    Text("Outlined")
}

// Low emphasis
TextButton(onClick = { }) {
    Text("Text")
}
```

### With Icons
```kotlin
Button(onClick = { }) {
    Icon(Icons.Default.Add, contentDescription = null)
    Spacer(Modifier.width(8.dp))
    Text("Add Item")
}

// Icon button
IconButton(onClick = { }) {
    Icon(Icons.Default.Favorite, contentDescription = "Favorite")
}
```

## Custom Styling

```kotlin
Button(
    onClick = { },
    colours = ButtonDefaults.buttonColors(
        containerColor = Color(0xFF6200EE),
        contentColor = Color.White
    ),
    shape = RoundedCornerShape(8.dp)
) {
    Text("Custom")
}
```

### Full Custom Button
```kotlin
@Composable
fun CustomButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(12.dp))
            .background(
                if (enabled) MaterialTheme.colorScheme.primary
                else MaterialTheme.colorScheme.outline
            )
            .clickable(enabled = enabled, onClick = onClick)
            .padding(horizontal = 24.dp, vertical = 12.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = text,
            colour = if (enabled) MaterialTheme.colorScheme.onPrimary
                   else MaterialTheme.colorScheme.onSurface.copy(alpha = 0.38f),
            style = MaterialTheme.typography.labelLarge
        )
    }
}
```

## Loading State

```kotlin
@Composable
fun LoadingButton(
    text: String,
    isLoading: Boolean,
    onClick: () -> Unit
) {
    Button(
        onClick = onClick,
        enabled = !isLoading
    ) {
        if (isLoading) {
            CircularProgressIndicator(
                modifier = Modifier.size(20.dp),
                colour = MaterialTheme.colorScheme.onPrimary,
                strokeWidth = 2.dp
            )
            Spacer(Modifier.width(8.dp))
        }
        Text(text)
    }
}
```

## Accessibility

```kotlin
IconButton(
    onClick = { toggleFavorite() }
) {
    Icon(
        imageVector = if (isFavorite) Icons.Filled.Favorite 
                      else Icons.Outlined.FavoriteBorder,
        contentDescription = if (isFavorite) "Remove from favourites" 
                            else "Add to favourites"
    )
}
```

## Try It Yourself

### Exercise 1: Button Set

Create a row of buttons:
- Primary action (filled)
- Secondary action (outlined)
- Tertiary action (text)

### Exercise 2: Async Button

Build a button that:
- Shows loading spinner during action
- Disables while loading
- Shows success state briefly

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "compose-button-quiz",
  "type": "multiple-choice",
  "title": "Building a Button",
  "description": "Test your understanding of Compose buttons.",
  "difficulty": "easy",
  "question": "How do you add a loading state to a button in Compose?",
  "options": [
    {
      "id": "a",
      "text": "Use a special LoadingButton composable",
      "isCorrect": false,
      "explanation": "There's no built-in LoadingButton. You compose it yourself."
    },
    {
      "id": "b",
      "text": "Conditionally show a CircularProgressIndicator in the button content based on loading state",
      "isCorrect": true,
      "explanation": "Correct! Button { if (isLoading) CircularProgressIndicator() else Text('Submit') } paired with enabled = !isLoading. State-driven UI makes this straightforward."
    },
    {
      "id": "c",
      "text": "Create an XML animation resource",
      "isCorrect": false,
      "explanation": "Compose doesn't use XML resources for animations."
    },
    {
      "id": "d",
      "text": "Buttons don't support loading states",
      "isCorrect": false,
      "explanation": "You can compose any content inside a Button."
    }
  ]
}
-->

## Key Takeaways

- Use appropriate button type for emphasis
- ButtonDefaults for customising colours
- Handle loading and disabled states
- Always provide content descriptions for icon buttons

## Next Steps

Continue to [Building a Card](./02-building-a-card.md) →
