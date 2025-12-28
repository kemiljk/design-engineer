---
estimatedTime: 15
---

# Capstone: Polish & Accessibility

> **Quick Summary:** Add accessibility support, Material motion, and error handling to polish your app.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Adding TalkBack accessibility semantics
- Supporting dynamic text sizes
- Implementing Material motion
- Handling errors gracefully

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

- [ ] All interactive elements have accessibility semantics
- [ ] Dynamic text scales all text appropriately
- [ ] TalkBack navigation is logical
- [ ] Material motion animations are smooth
- [ ] Errors are handled and displayed gracefully
- [ ] App tested with TalkBack enabled

## Try It Yourself

1. Enable TalkBack and navigate through your app
2. Test with largest font size in accessibility settings
3. Review all animations for smoothness
4. Test error scenarios

## Next Steps

Continue to [Phase 5: Finalisation](./06-capstone-finalisation.md) →

