---
estimatedTime: 25
---

# Capstone: Animation Implementation

> **Quick Summary:** Implement core animations, transitions, and gesture-driven motion.

**Time Estimate:** 4-5 hours

## What You'll Learn

- How to create robust core compose animations
- Building silky smooth transitions between states and screens
- Implementing responsive gesture animations that feel natural
- Bringing your motion plan to life in code

In this phase, you will write the code to bring your motion plan to life. You will focus on creating robust **core Compose animations**, building silky smooth **transitions** between states and screens, and implementing responsive **gesture animations** that feel natural to touch.

## Core Animations

```kotlin
@Composable
fun AnimatedFeature() {
    var isExpanded by remember { mutableStateOf(false) }
    
    val animatedHeight by animateDpAsState(
        targetValue = if (isExpanded) 300.dp else 80.dp,
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioMediumBouncy,
            stiffness = Spring.StiffnessLow
        ),
        label = "height"
    )
    
    val animatedAlpha by animateFloatAsState(
        targetValue = if (isExpanded) 1f else 0f,
        animationSpec = tween(durationMillis = 300),
        label = "alpha"
    )
    
    // Implementation
}
```

## Transition Animations

```kotlin
AnimatedContent(
    targetState = currentScreen,
    transitionSpec = {
        fadeIn(tween(300)) togetherWith fadeOut(tween(300))
    }
) { screen ->
    when (screen) {
        Screen.List -> ListScreen(onItemClick = { /* transition */ })
        Screen.Detail -> DetailScreen()
    }
}
```

## Gesture Animations

```kotlin
@Composable
fun SwipeableCard(onDismiss: () -> Unit) {
    var offsetX by remember { mutableFloatStateOf(0f) }
    val dismissThreshold = 200f
    
    Box(
        modifier = Modifier
            .offset { IntOffset(offsetX.roundToInt(), 0) }
            .pointerInput(Unit) {
                detectHorizontalDragGestures(
                    onDragEnd = {
                        if (abs(offsetX) > dismissThreshold) {
                            onDismiss()
                        } else {
                            offsetX = 0f
                        }
                    },
                    onHorizontalDrag = { _, dragAmount ->
                        offsetX += dragAmount
                    }
                )
            }
    ) {
        // Card content
    }
}
```

## Checkpoint

Before moving on, verify:

- [ ] Core animations implemented
- [ ] Transitions smooth
- [ ] Gestures responsive
- [ ] 60fps performance

## Next Steps

Continue to [Phase 3: Accessibility Implementation](./04-capstone-accessibility.md) →

