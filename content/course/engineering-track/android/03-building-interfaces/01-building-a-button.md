# Building a Button

> **Quick Summary:** Material 3 provides various button styles. Learn to use them correctly and create custom buttons when needed.

## What You'll Learn

During this module, you will learn to navigate the various Material 3 button types and explore techniques for custom button styling. We'll examine how to implement loading and disabled states effectively while ensuring your components adhere to strict accessibility standards.

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
    colors = ButtonDefaults.buttonColors(
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
            color = if (enabled) MaterialTheme.colorScheme.onPrimary
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
                color = MaterialTheme.colorScheme.onPrimary,
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

Practise your UI composition by creating a cohesive row of buttons that demonstrates the hierarchy of actions. Include a primary filled button for high emphasis, an outlined secondary action for medium emphasis, and a simple text button for tertiary actions.

### Exercise 2: Async Button

Further develop your interactive elements by building an asynchronous button that manages its own loading state. The component should show a loading spinner during the action, disable itself to prevent multiple clicks, and briefly transition to a success state upon completion.

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

To build effective buttons in Compose, you must select the appropriate type to reflect the correct level of functional emphasis and use `ButtonDefaults` to customising colours and shapes. Always handle loading and disabled states to provide a responsive user experience and ensure that every icon button includes an accurate content description for accessibility.

## Next Steps

Continue to [Building a Card](./02-building-a-card.md) →
