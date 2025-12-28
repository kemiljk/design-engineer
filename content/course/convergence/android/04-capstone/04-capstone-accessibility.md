---
estimatedTime: 20
---

# Capstone: Accessibility Implementation

> **Quick Summary:** Add semantic structure, focus management, and live regions for TalkBack support.

**Time Estimate:** 3-4 hours

## What You'll Learn

- Adding semantic structure
- Implementing focus management
- Creating live regions
- Adding custom actions

## Semantic Structure

```kotlin
@Composable
fun AccessibleCard(
    title: String,
    description: String,
    onAction: () -> Unit
) {
    Card(
        modifier = Modifier
            .semantics(mergeDescendants = true) {
                contentDescription = "$title. $description"
                role = Role.Button
            }
            .clickable(onClickLabel = "Open $title") { onAction() }
    ) {
        // Visual content
    }
}
```

## Focus Management

```kotlin
@Composable
fun AccessibleForm() {
    val (emailFocus, passwordFocus, submitFocus) = remember {
        FocusRequester.createRefs()
    }
    
    Column {
        TextField(
            modifier = Modifier
                .focusRequester(emailFocus)
                .focusProperties { next = passwordFocus }
        )
        
        TextField(
            modifier = Modifier
                .focusRequester(passwordFocus)
                .focusProperties { next = submitFocus }
        )
        
        Button(
            modifier = Modifier.focusRequester(submitFocus),
            onClick = { /* submit */ }
        ) {
            Text("Submit")
        }
    }
}
```

## Live Regions

```kotlin
@Composable
fun LiveUpdateSection(updateText: String) {
    Text(
        text = updateText,
        modifier = Modifier.semantics {
            liveRegion = LiveRegionMode.Polite
        }
    )
}
```

## Custom Actions

```kotlin
Row(
    modifier = Modifier.semantics {
        customActions = listOf(
            CustomAccessibilityAction("Delete") {
                onDelete()
                true
            },
            CustomAccessibilityAction("Archive") {
                onArchive()
                true
            }
        )
    }
) {
    // Content
}
```

## Checkpoint

Before moving on, verify:

- [ ] Semantic structure complete
- [ ] Focus order logical
- [ ] Live regions announce updates
- [ ] Custom actions available

## Next Steps

Continue to [Phase 4: Polish & Details](./05-capstone-polish.md) →

