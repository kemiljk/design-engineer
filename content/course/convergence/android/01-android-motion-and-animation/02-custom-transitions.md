# Custom Transitions

> **Quick Summary:** Material motion patterns guide Android transitions. Learn container transforms, shared elements, and custom enter/exit animations.

In this lesson, you will learn how to implement standard **Material motion patterns** in Compose. We will explore complex **shared element transitions** between screens, creating custom **AnimatedVisibility** enter/exit effects, and applying polished transitions to your **Navigation** graph.

## Material Motion Patterns

### Container Transform
Element expands into new screen:

```kotlin
@OptIn(ExperimentalSharedTransitionApi::class)
@Composable
fun SharedElementExample() {
    SharedTransitionLayout {
        AnimatedContent(targetState = showDetail) { isDetail ->
            if (isDetail) {
                DetailScreen(
                    modifier = Modifier.sharedElement(
                        state = rememberSharedContentState(key = "card"),
                        animatedVisibilityScope = this
                    )
                )
            } else {
                CardView(
                    modifier = Modifier.sharedElement(
                        state = rememberSharedContentState(key = "card"),
                        animatedVisibilityScope = this
                    ),
                    onClick = { showDetail = true }
                )
            }
        }
    }
}
```

### Shared Axis
```kotlin
AnimatedContent(
    targetState = currentPage,
    transitionSpec = {
        if (targetState > initialState) {
            slideInHorizontally { it } + fadeIn() togetherWith
            slideOutHorizontally { -it } + fadeOut()
        } else {
            slideInHorizontally { -it } + fadeIn() togetherWith
            slideOutHorizontally { it } + fadeOut()
        }
    }
) { page ->
    PageContent(page)
}
```

### Fade Through
```kotlin
AnimatedContent(
    targetState = selectedTab,
    transitionSpec = {
        fadeIn(tween(300, delayMillis = 150)) togetherWith
        fadeOut(tween(150))
    }
) { tab ->
    TabContent(tab)
}
```

## Custom Enter/Exit

```kotlin
AnimatedVisibility(
    visible = visible,
    enter = slideInVertically(
        initialOffsetY = { fullHeight -> fullHeight },
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioMediumBouncy,
            stiffness = Spring.StiffnessLow
        )
    ) + fadeIn(tween(200)),
    exit = slideOutVertically(
        targetOffsetY = { fullHeight -> fullHeight }
    ) + fadeOut()
) {
    BottomSheet()
}
```

## Navigation Transitions

```kotlin
NavHost(
    navController = navController,
    startDestination = "home",
    enterTransition = {
        slideInHorizontally(initialOffsetX = { it })
    },
    exitTransition = {
        slideOutHorizontally(targetOffsetX = { -it })
    },
    popEnterTransition = {
        slideInHorizontally(initialOffsetX = { -it })
    },
    popExitTransition = {
        slideOutHorizontally(targetOffsetX = { it })
    }
) {
    composable("home") { HomeScreen() }
    composable("detail/{id}") { DetailScreen() }
}
```

## Crossfade

Simple content switch:

```kotlin
Crossfade(targetState = currentScreen) { screen ->
    when (screen) {
        Screen.Home -> HomeContent()
        Screen.Settings -> SettingsContent()
    }
}
```

## Try It Yourself

### Exercise 1: Tab Transition
Build a tab navigation component that uses a **fade through** animation when switching tabs. The content should slide in from the correct direction (left or right) based on the tab order, providing a smooth, direction-aware context switch.

### Exercise 2: Card Expansion
Create a Master-Detail flow where clicking a card expands it into a full details screen. Implement a **container transform** feel using shared elements for the main image and background, and use a staggered reveal animation for the detail content.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "compose-transitions-quiz",
  "type": "multiple-choice",
  "title": "Custom Transitions",
  "description": "Test your understanding of Compose transitions.",
  "difficulty": "medium",
  "question": "What does AnimatedContent provide that AnimatedVisibility doesn't?",
  "options": [
    {
      "id": "a",
      "text": "Nothing—they're interchangeable",
      "isCorrect": false,
      "explanation": "They serve different purposes."
    },
    {
      "id": "b",
      "text": "AnimatedContent transitions between different content states, not just visible/hidden",
      "isCorrect": true,
      "explanation": "Correct! AnimatedVisibility shows/hides a single view. AnimatedContent transitions between different content based on state—like switching between screens or different UI states."
    },
    {
      "id": "c",
      "text": "AnimatedContent is faster",
      "isCorrect": false,
      "explanation": "Performance is similar. The distinction is about use case."
    },
    {
      "id": "d",
      "text": "AnimatedContent only works with text",
      "isCorrect": false,
      "explanation": "AnimatedContent works with any composable content."
    }
  ]
}
-->

## Key Takeaways
Remember that **Material motion patterns** exist to guide your design choices, not just for aesthetics. Use `SharedTransitionLayout` to create seamless hero animations that connect screens. Leverage `AnimatedContent` for smooth state transitions within a single screen. For a truly polished feel, carefully coordinate your enter and exit animations, ensuring they are **direction-aware** to match the user's mental model of navigation.

## Next Steps

Continue to [Prototyping with Compose](../02-prototyping-with-compose/01-prototyping-with-compose.md) →
