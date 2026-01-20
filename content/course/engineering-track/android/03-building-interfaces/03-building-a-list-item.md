# Building a List Item

> **Quick Summary:** ListItem is a Material 3 component for consistent list layouts. Learn to use it and build custom list items.

## What You'll Learn

During this module, you will learn to utilize the Material 3 ListItem component for creating consistent list layouts and explore techniques for building fully custom list items. We'll examine how to implement swipe-to-dismiss functionality and manage various selection states to enhance the interactivity of your data displays.

## Material 3 ListItem

```kotlin
ListItem(
    headlineContent = { Text("Title") },
    supportingContent = { Text("Supporting text") },
    leadingContent = {
        Icon(Icons.Default.Person, contentDescription = null)
    },
    trailingContent = {
        Icon(Icons.Default.ChevronRight, contentDescription = null)
    }
)
```

### ListItem Variations
```kotlin
// Simple
ListItem(headlineContent = { Text("Simple item") })

// With avatar
ListItem(
    headlineContent = { Text("Contact Name") },
    supportingContent = { Text("+1 555 123 4567") },
    leadingContent = {
        AsyncImage(
            model = avatarUrl,
            contentDescription = null,
            modifier = Modifier
                .size(40.dp)
                .clip(CircleShape)
        )
    }
)

// With checkbox
ListItem(
    headlineContent = { Text("Selectable item") },
    leadingContent = {
        Checkbox(checked = isSelected, onCheckedChange = null)
    },
    modifier = Modifier.clickable { onToggle() }
)
```

## Custom List Item

```kotlin
@Composable
fun MessageItem(
    message: Message,
    onClick: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        AsyncImage(
            model = message.senderAvatar,
            contentDescription = null,
            modifier = Modifier
                .size(48.dp)
                .clip(CircleShape)
        )
        Spacer(Modifier.width(12.dp))
        Column(modifier = Modifier.weight(1f)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = message.senderName,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = if (message.unread) FontWeight.Bold else FontWeight.Normal
                )
                Text(
                    text = message.time,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            Text(
                text = message.preview,
                style = MaterialTheme.typography.bodyMedium,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
        if (message.unread) {
            Spacer(Modifier.width(8.dp))
            Box(
                modifier = Modifier
                    .size(8.dp)
                    .background(
                        MaterialTheme.colorScheme.primary,
                        CircleShape
                    )
            )
        }
    }
}
```

## Swipe to Dismiss

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SwipeableItem(
    item: Item,
    onDismiss: () -> Unit
) {
    val dismissState = rememberSwipeToDismissBoxState()
    
    LaunchedEffect(dismissState.currentValue) {
        if (dismissState.currentValue == SwipeToDismissBoxValue.EndToStart) {
            onDismiss()
        }
    }
    
    SwipeToDismissBox(
        state = dismissState,
        backgroundContent = {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(MaterialTheme.colorScheme.error)
                    .padding(end = 16.dp),
                contentAlignment = Alignment.CenterEnd
            ) {
                Icon(
                    Icons.Default.Delete,
                    contentDescription = "Delete",
                    tint = MaterialTheme.colorScheme.onError
                )
            }
        }
    ) {
        ListItem(
            headlineContent = { Text(item.title) }
        )
    }
}
```

## Try It Yourself

### Exercise 1: Contact Item

Practise your interface design by building a comprehensive contact list item that features a user avatar with an initials-based fallback. Your implementation should display the contact's name and phone number clearly while including actionable icons for both calling and messaging.

### Exercise 2: Task Item

Further develop your interactive components by creating a task item that includes a functional checkbox and a title that displays a strikethrough effect when marked as complete. You should also incorporate a due date badge for enhanced visibility and implement swipe-to-delete logic for easy task management.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "compose-listitem-quiz",
  "type": "multiple-choice",
  "title": "Building a List Item",
  "description": "Test your understanding of Compose list items.",
  "difficulty": "medium",
  "question": "What should you use as the 'key' in LazyColumn items?",
  "options": [
    {
      "id": "a",
      "text": "The item's index position",
      "isCorrect": false,
      "explanation": "Index changes when items are added/removed, causing incorrect animations."
    },
    {
      "id": "b",
      "text": "A stable, unique identifier for each item",
      "isCorrect": true,
      "explanation": "Correct! Use item IDs: items(items, key = { it.id }). Stable keys let Compose track items correctly during reordering, additions, and deletions."
    },
    {
      "id": "c",
      "text": "Keys aren't needed in Compose",
      "isCorrect": false,
      "explanation": "Keys are important for efficient diffing and animations."
    },
    {
      "id": "d",
      "text": "The item's toString() value",
      "isCorrect": false,
      "explanation": "toString() might not be unique or stable."
    }
  ]
}
-->

## Key Takeaways

To build professional lists in Compose, you must leverage the standard `ListItem` component for Material 3 consistency while utilizing its various content slots for headlines, supporting text, and leading or trailing elements. When you require more control, build custom items from scratch using Row layouts and remember to implement the `SwipeToDismissBox` whenever you need to add intuitive swipe-based actions to your list entries.

## Next Steps

Continue to [Building a Form](./04-building-a-form.md) →
