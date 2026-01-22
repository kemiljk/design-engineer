---
estimatedTime: 15
---

# Capstone: Polish & Accessibility

> **Quick Summary:** Add accessibility support, Material motion, and error handling to polish your app.

**Time Estimate:** 2-3 hours

## What You'll Learn

- How to ensure support for dynamic text sizes
- The implementation of Material Motion to create smooth transitions
- Robust techniques for handling errors gracefully within your UI

## Step 1: Accessibility Semantics

```kotlin
Modifier.semantics {
    contentDescription = "Task: ${task.title}, ${task.priority.label} priority"
    if (task.isComplete) {
        stateDescription = "Completed"
    }
}

// Custom actions
Modifier.semantics {
    customActions = listOf(
        CustomAccessibilityAction("Delete") {
            onDelete()
            true
        },
        CustomAccessibilityAction("Toggle complete") {
            onToggleComplete()
            true
        }
    )
}
```

## Step 2: Dynamic Text Support

```kotlin
// Use Material typography (scales automatically)
Text(
    text = task.title,
    style = MaterialTheme.typography.bodyLarge
)

// Avoid fixed text sizes
// ❌ fontSize = 16.sp
// ✅ style = MaterialTheme.typography.bodyLarge
```

## Step 3: TalkBack Optimisation

```kotlin
// Group related elements
Row(
    modifier = Modifier.semantics(mergeDescendants = true) { }
) {
    Icon(Icons.Default.Calendar, null)
    Text(formatDate(dueDate))
}

// Clear content descriptions
IconButton(
    onClick = onToggleComplete,
    modifier = Modifier.semantics {
        contentDescription = if (task.isComplete) {
            "Mark as incomplete"
        } else {
            "Mark as complete"
        }
    }
) {
    // ...
}
```

## Step 4: Material Motion

```kotlin
// List animations
LazyColumn {
    items(tasks, key = { it.id }) { task ->
        TaskCard(
            task = task,
            modifier = Modifier.animateItem(
                fadeInSpec = tween(300),
                fadeOutSpec = tween(300)
            )
        )
    }
}

// State transitions
val completedAlpha by animateFloatAsState(
    targetValue = if (task.isComplete) 0.5f else 1f,
    animationSpec = tween(200)
)
```

## Step 5: Error Handling

```kotlin
@Composable
fun TaskListScreen(viewModel: TaskListViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    
    when (val state = uiState) {
        is UiState.Loading -> LoadingIndicator()
        is UiState.Error -> ErrorMessage(
            message = state.message,
            onRetry = viewModel::retry
        )
        is UiState.Success -> TaskList(tasks = state.tasks)
    }
}

sealed interface UiState {
    data object Loading : UiState
    data class Error(val message: String) : UiState
    data class Success(val tasks: List<Task>) : UiState
}
```

## Checkpoint

Before moving on, verify:

Before proceeding to the finalisation phase, you should verify that every interactive element in your app has proper accessibility semantics and that dynamic text scales correctly across the entire interface. Confirm that TalkBack navigation follows a logical flow and that all Material motion animations are smooth and purposeful. Finally, ensure that error states are handled gracefully and that you have personally tested the application with TalkBack enabled.

## Try It Yourself

Practise your refinement skills by enabling TalkBack and navigating through your entire application to identify any friction points. Test your design with the largest font size available in the system accessibility settings to ensure layout integrity, and review all animations for consistency before verifying that your error scenarios are handled correctly.

## Next Steps

Continue to [Phase 5: Finalisation](./06-capstone-finalisation.md) →

