# Building a List Item

> **Quick Summary:** ListItem is a Material 3 component for consistent list layouts. Learn to use it and build custom list items.

## What You'll Learn

- Material 3 ListItem
- Custom list items
- Swipe to dismiss
- Selection states

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

Build a contact list item with:
- Avatar with initials fallback
- Name and phone number
- Call and message action icons

### Exercise 2: Task Item

Create a task item with:
- Checkbox
- Title with strikethrough when complete
- Due date badge
- Swipe to delete

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

- ListItem provides consistent Material 3 layout
- Use slots: headlineContent, supportingContent, leadingContent, trailingContent
- Build custom items with Row for more control
- SwipeToDismissBox for swipe actions

## Next Steps

Continue to [Building a Form](./04-building-a-form.md) →
