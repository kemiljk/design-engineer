---
estimatedTime: 15
---

# Capstone: Polish & Details

> **Quick Summary:** Optimise performance, add haptic feedback, and handle edge cases.

**Time Estimate:** 2-3 hours

## What You'll Learn

- How to optimise performance for 60fps rendering
- Adding haptic feedback for a tactile experience
- Handling all edge cases gracefully
- Testing thoroughly on real devices

The final code phase is about elevation. You will focus on **performance optimisation** to ensure 60fps rendering, add **haptic feedback** for a tactile experience, ensure all **edge cases** are handled gracefully, and verify quality by **testing thoroughly** on real devices.

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

Handle all states gracefully. Ensure you have designed **empty states** with helpful messaging for when data is missing, and **error states** that provide clear recovery options. implement **loading states** with skeleton screens to reduce perceived wait times, and handle **offline states** by showing cached data or friendly warnings.

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

