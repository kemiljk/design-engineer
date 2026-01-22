---
estimatedTime: 15
---

# Capstone: Custom Composables

> **Quick Summary:** Extract reusable composable components and create custom modifiers for consistency.

**Time Estimate:** 2-3 hours

## What You'll Learn

- During this module, you will learn to create reusable Compose components from scratch
- build your own custom modifiers build your own custom modifiers
- We'll examine the design of Material 3 styled elements
- explore the development of effective empty state composables to handle missing data gracefully
- explore the development of effective empty state composables to handle missing data gracefully

## Custom Card Component

```kotlin
@Composable
fun TaskCard(
    task: Task,
    onToggleComplete: () -> Unit,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        onClick = onClick,
        modifier = modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .padding(16.dp)
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            IconButton(
                onClick = onToggleComplete,
                modifier = Modifier.semantics {
                    contentDescription = if (task.isComplete) {
                        "Mark ${task.title} as incomplete"
                    } else {
                        "Mark ${task.title} as complete"
                    }
                }
            ) {
                Icon(
                    imageVector = if (task.isComplete) {
                        Icons.Default.CheckCircle
                    } else {
                        Icons.Default.RadioButtonUnchecked
                    },
                    contentDescription = null,
                    tint = if (task.isComplete) {
                        MaterialTheme.colorScheme.primary
                    } else {
                        MaterialTheme.colorScheme.outline
                    }
                )
            }
            
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = task.title,
                    style = MaterialTheme.typography.bodyLarge,
                    textDecoration = if (task.isComplete) {
                        TextDecoration.LineThrough
                    } else null,
                    colour = if (task.isComplete) {
                        MaterialTheme.colorScheme.outline
                    } else {
                        MaterialTheme.colorScheme.onSurface
                    }
                )
                
                task.dueDate?.let { dueDate ->
                    Text(
                        text = formatDate(dueDate),
                        style = MaterialTheme.typography.bodySmall,
                        colour = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
            
            PriorityBadge(priority = task.priority)
        }
    }
}
```

## Custom Badge Component

```kotlin
@Composable
fun PriorityBadge(
    priority: Priority,
    modifier: Modifier = Modifier
) {
    Surface(
        colour = priority.colour.copy(alpha = 0.15f),
        shape = MaterialTheme.shapes.small,
        modifier = modifier
    ) {
        Text(
            text = priority.label,
            style = MaterialTheme.typography.labelSmall,
            colour = priority.colour,
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
        )
    }
}
```

## Empty State Component

```kotlin
@Composable
fun EmptyState(
    title: String,
    message: String,
    icon: ImageVector,
    action: (() -> Unit)? = null,
    actionLabel: String? = null,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            modifier = Modifier.size(64.dp),
            tint = MaterialTheme.colorScheme.outline
        )
        
        Text(
            text = title,
            style = MaterialTheme.typography.titleLarge,
            textAlign = TextAlign.Center
        )
        
        Text(
            text = message,
            style = MaterialTheme.typography.bodyMedium,
            colour = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = TextAlign.Center
        )
        
        if (action != null && actionLabel != null) {
            Button(onClick = action) {
                Text(actionLabel)
            }
        }
    }
}
```

## Custom Modifier Extensions

```kotlin
fun Modifier.shimmer(): Modifier = composed {
    var size by remember { mutableStateOf(IntSize.Zero) }
    val transition = rememberInfiniteTransition()
    val startOffsetX by transition.animateFloat(
        initialValue = -2 * size.width.toFloat(),
        targetValue = 2 * size.width.toFloat(),
        animationSpec = infiniteRepeatable(
            animation = tween(1000)
        )
    )
    
    background(
        brush = Brush.linearGradient(
            colours = listOf(
                Color.LightGray.copy(alpha = 0.6f),
                Color.LightGray.copy(alpha = 0.2f),
                Color.LightGray.copy(alpha = 0.6f),
            ),
            start = Offset(startOffsetX, 0f),
            end = Offset(startOffsetX + size.width.toFloat(), size.height.toFloat())
        )
    )
    .onGloballyPositioned { size = it.size }
}
```

## Checkpoint

Before moving on, verify:

Before proceeding to the final phase, you should verify that your core card components have been properly extracted and that your status badges or priority indicators are functional. Confirm that your empty state component is ready for use, that your custom modifiers are behaving correctly, and that all components are fully reusable across your various screens while strictly following Material 3 theming guidelines.

## Try It Yourself

Practise your modular design skills by identifying repeated UI patterns across your screens and extracting them into their own dedicated composable files. You should also create custom modifiers to encapsulate common styling logic and thoroughly test every new component using integrated previews to ensure visual accuracy.

## Next Steps

Continue to [Phase 4: Polish & Accessibility](./05-capstone-polish.md) →

