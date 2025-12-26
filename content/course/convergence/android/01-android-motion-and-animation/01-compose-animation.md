# Compose Animation

> **Quick Summary:** Jetpack Compose provides powerful, easy-to-use animation APIs. From simple animateAsState to complex choreography, Compose makes motion accessible.

## What You'll Learn

- animate*AsState APIs
- AnimatedVisibility
- Transition animations
- Spring physics

## animate*AsState

Animate single values:

```kotlin
val size by animateDpAsState(
    targetValue = if (expanded) 200.dp else 100.dp,
    animationSpec = spring(dampingRatio = Spring.DampingRatioMediumBouncy)
)

Box(modifier = Modifier.size(size))
```

### Common Animations
```kotlin
val color by animateColorAsState(
    targetValue = if (selected) Color.Blue else Color.Grey
)

val alpha by animateFloatAsState(
    targetValue = if (visible) 1f else 0f
)

val offset by animateIntOffsetAsState(
    targetValue = if (moved) IntOffset(100, 0) else IntOffset.Zero
)
```

## AnimatedVisibility

Animate enter/exit:

```kotlin
AnimatedVisibility(
    visible = isVisible,
    enter = fadeIn() + slideInVertically(),
    exit = fadeOut() + slideOutVertically()
) {
    Card { Text("Content") }
}
```

### Enter/Exit Specs
```kotlin
AnimatedVisibility(
    visible = show,
    enter = fadeIn(animationSpec = tween(300)) +
            expandVertically(animationSpec = spring()),
    exit = fadeOut(animationSpec = tween(200)) +
           shrinkVertically()
) {
    Content()
}
```

## Animation Specs

### Tween
```kotlin
animationSpec = tween(
    durationMillis = 300,
    easing = FastOutSlowInEasing
)
```

### Spring
```kotlin
animationSpec = spring(
    dampingRatio = Spring.DampingRatioMediumBouncy,
    stiffness = Spring.StiffnessLow
)
```

### Keyframes
```kotlin
animationSpec = keyframes {
    durationMillis = 500
    0f at 0
    0.5f at 150 using FastOutLinearInEasing
    1f at 500
}
```

## Transition

Coordinate multiple animations:

```kotlin
val transition = updateTransition(targetState = expanded)

val size by transition.animateDp { state ->
    if (state) 200.dp else 100.dp
}

val color by transition.animateColor { state ->
    if (state) Color.Blue else Color.Grey
}

val corners by transition.animateDp { state ->
    if (state) 8.dp else 50.dp
}

Box(
    modifier = Modifier
        .size(size)
        .clip(RoundedCornerShape(corners))
        .background(color)
)
```

## Infinite Animations

```kotlin
val infiniteTransition = rememberInfiniteTransition()

val rotation by infiniteTransition.animateFloat(
    initialValue = 0f,
    targetValue = 360f,
    animationSpec = infiniteRepeatable(
        animation = tween(1000, easing = LinearEasing),
        repeatMode = RepeatMode.Restart
    )
)

Icon(
    imageVector = Icons.Default.Refresh,
    contentDescription = null,
    modifier = Modifier.rotate(rotation)
)
```

## Try It Yourself

### Exercise 1: Animated Card

Create a card that:
- Expands on tap
- Animates size, corner radius, elevation
- Uses spring animation

### Exercise 2: Loading Indicator

Build a custom loading animation:
- Three pulsing dots
- Staggered timing
- Infinite animation

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "compose-animation-quiz",
  "type": "multiple-choice",
  "title": "Compose Animation",
  "description": "Test your understanding of Compose animations.",
  "difficulty": "medium",
  "question": "What's the difference between animate*AsState and Animatable in Compose?",
  "options": [
    {
      "id": "a",
      "text": "They're identical in functionality",
      "isCorrect": false,
      "explanation": "They have different use cases and control levels."
    },
    {
      "id": "b",
      "text": "animate*AsState is declarative and automatic; Animatable gives imperative control for complex sequences",
      "isCorrect": true,
      "explanation": "Correct! Use animateFloatAsState for simple state-driven animations. Use Animatable when you need to launch animations in coroutines, chain animations, or have fine control over timing."
    },
    {
      "id": "c",
      "text": "Animatable only works with colours",
      "isCorrect": false,
      "explanation": "Animatable works with any animatable value type."
    },
    {
      "id": "d",
      "text": "animate*AsState is deprecated",
      "isCorrect": false,
      "explanation": "animate*AsState is the recommended approach for simple animations."
    }
  ]
}
-->

## Key Takeaways

- animate*AsState for single value animations
- AnimatedVisibility for enter/exit
- updateTransition for coordinated animations
- Spring for natural feel, tween for precise timing
- Test animations on device

## Next Steps

Continue to [Custom Transitions](./02-custom-transitions.md) →
