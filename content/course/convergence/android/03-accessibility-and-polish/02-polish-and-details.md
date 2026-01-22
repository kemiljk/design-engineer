# Polish and Details

> **Quick Summary:** Small details elevate apps from good to great. Haptics, edge cases, and micro-interactions create memorable experiences.

## What You'll Learn

- How to implement haptic feedback for tactile responsiveness
- Creating delightful micro-interactions
- Handling common edge cases gracefully
- Verifying your work against a comprehensive polish checklist

## Haptic Feedback

```kotlin
val haptic = LocalHapticFeedback.current

Button(
    onClick = {
        haptic.performHapticFeedback(HapticFeedbackType.LongPress)
        doAction()
    }
) {
    Text("Press")
}
```

### Vibration API
```kotlin
val context = LocalContext.current
val vibrator = context.getSystemService(Vibrator::class.java)

fun vibrate() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        vibrator?.vibrate(
            VibrationEffect.createOneShot(50, VibrationEffect.DEFAULT_AMPLITUDE)
        )
    }
}
```

### When to Use Haptics
Haptics are effective for confirming actions. Use them for button presses, toggling switches, providing success or error feedback, indicating when a user has reached scroll bounds, and for any other important actions that require user confirmation.

## Micro-interactions

### Button Press
```kotlin
@Composable
fun PressableButton(
    onClick: () -> Unit,
    content: @Composable () -> Unit
) {
    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()
    
    val scale by animateFloatAsState(
        targetValue = if (isPressed) 0.95f else 1f,
        animationSpec = spring(dampingRatio = 0.5f)
    )
    
    Box(
        modifier = Modifier
            .scale(scale)
            .clickable(
                interactionSource = interactionSource,
                indication = rememberRipple()
            ) { onClick() }
    ) {
        content()
    }
}
```

### Success Animation
```kotlin
@Composable
fun SuccessCheckmark() {
    var animate by remember { mutableStateOf(false) }
    
    val scale by animateFloatAsState(
        targetValue = if (animate) 1f else 0f,
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioMediumBouncy
        )
    )
    
    LaunchedEffect(Unit) {
        animate = true
    }
    
    Icon(
        Icons.Default.CheckCircle,
        contentDescription = "Success",
        tint = Color.Green,
        modifier = Modifier
            .scale(scale)
            .size(80.dp)
    )
}
```

## Edge Cases

### Empty States
```kotlin
@Composable
fun ItemList(items: List<Item>) {
    if (items.isEmpty()) {
        EmptyState(
            icon = Icons.Default.Inbox,
            title = "No items yet",
            description = "Items you add will appear here",
            action = { Button(onClick = { }) { Text("Add Item") } }
        )
    } else {
        LazyColumn {
            items(items) { ItemRow(it) }
        }
    }
}
```

### Error Handling
```kotlin
@Composable
fun DataScreen(state: DataState) {
    when (state) {
        is DataState.Loading -> LoadingIndicator()
        is DataState.Success -> SuccessContent(state.data)
        is DataState.Error -> ErrorState(
            message = state.message,
            onRetry = { retry() }
        )
    }
}
```

### Long Text
```kotlin
Text(
    text = longTitle,
    maxLines = 2,
    overflow = TextOverflow.Ellipsis,
    style = MaterialTheme.typography.titleMedium
)
```

## Polish Checklist

### Visual
Verify that all spacing is consistent (using an 8dp grid). Check that elevation and shadows create proper depth, that dark mode is fully tested and legible, that the UI handles edge-to-edge display correctly, and that loading states are smooth and non-jarring.

### Interaction
Ensure all buttons provide immediate visual feedback. Verify that appropriate haptics are present, that all animations run smoothly without jank, and that transitions between states feel fluid.

### Content
Check that empty states are designed and helpful. Ensure error states provide clear guidance on how to recover. Verify that long text truncates or wraps correctly, and that loading indicators clearly communicate activity.

### Accessibility
Confirm that all elements have content labels. Test the entire flow with TalkBack. Ensure all touch targets meet the 48dp minimum size, and that colour contrast ratios are sufficient for readability.

## Try It Yourself

### Exercise 1: Like Animation
Create a delightful animated like button. It should feature a heart icon that fills with colour, performs a bouncy scale animation, triggers a particle burst effect, and provides crisp haptic feedback upon activation.

### Exercise 2: Error State
Design a polished error state component. Include a friendly illustration to reduce frustration, a clear and helpful message explaining what went wrong, a prominent "Retry" action, and a smooth animation when the component appears.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-polish-quiz",
  "type": "multiple-choice",
  "title": "Polish and Details",
  "description": "Test your understanding of Android app polish.",
  "difficulty": "easy",
  "question": "What's the purpose of edge-to-edge design in modern Android apps?",
  "options": [
    {
      "id": "a",
      "text": "It's required for Play Store approval",
      "isCorrect": false,
      "explanation": "It's recommended for modern design, not strictly required."
    },
    {
      "id": "b",
      "text": "Content extends behind system bars for an immersive experience, with proper inset handling for interactive elements",
      "isCorrect": true,
      "explanation": "Correct! Edge-to-edge lets your UI extend to screen edges while respecting system bars through WindowInsets. It creates a more polished, modern look."
    },
    {
      "id": "c",
      "text": "It removes the navigation bar entirely",
      "isCorrect": false,
      "explanation": "System bars remain—your content just draws behind them."
    },
    {
      "id": "d",
      "text": "It only matters for games",
      "isCorrect": false,
      "explanation": "All modern apps benefit from edge-to-edge design."
    }
  ]
}
-->

## Key Takeaways

- You must handle all **edge cases** (like loading and errors) to ensure a robust experience
- Use the **polish checklist** before every release
- always test on real devices to ensure the quality matches your design intent
- always test on real devices to ensure the quality matches your design intent

## Congratulations!

You've completed the Android Convergence Track and the entire Design Engineer Course!

**What's Next?**

→ Return to the [Course Overview](/course) to review any sections

→ Build your portfolio with projects from each track

→ Share your work and join the Design Engineer community

→ Keep learning and pushing boundaries

**Thank you for learning with us!**
