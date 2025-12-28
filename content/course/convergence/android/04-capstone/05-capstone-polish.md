---
estimatedTime: 15
---

# Capstone: Polish & Details

> **Quick Summary:** Optimise performance, add haptic feedback, and handle edge cases.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Performance optimisation
- Adding haptic feedback
- Handling edge cases
- Testing thoroughly

## Performance Optimisation

```kotlin
// Use remember for expensive calculations
val animatedColor by remember(progress) {
    derivedStateOf {
        lerp(startColor, endColor, progress)
    }
}

// Use graphicsLayer for GPU-accelerated transforms
Modifier.graphicsLayer {
    translationX = offsetX
    alpha = alphaValue
    // GPU-accelerated, no recomposition
}
```

## Haptic Feedback

```kotlin
@Composable
fun HapticButton(onClick: () -> Unit) {
    val haptic = LocalHapticFeedback.current
    
    Button(
        onClick = {
            haptic.performHapticFeedback(HapticFeedbackType.LongPress)
            onClick()
        }
    ) {
        Text("Action")
    }
}
```

## Edge Cases

Handle all states gracefully:

- Empty states with helpful messaging
- Error states with recovery options
- Loading states with skeleton screens
- Offline states with cached data

## Testing

```kotlin
@Test
fun testAccessibility() {
    composeTestRule.setContent {
        YourScreen()
    }
    
    composeTestRule
        .onNodeWithContentDescription("Submit form")
        .assertExists()
    
    composeTestRule
        .onAllNodes(hasClickAction())
        .assertCountEquals(expectedCount)
}
```

## Checkpoint

Before moving on, verify:

- [ ] Performance optimised
- [ ] Haptic feedback added
- [ ] Edge cases handled
- [ ] Tests passing

## Next Steps

Continue to [Phase 5: Documentation & Delivery](./06-capstone-delivery.md) →

