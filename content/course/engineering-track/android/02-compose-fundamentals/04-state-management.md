# State Management

> **Quick Summary:** Compose uses state to drive UI updates. Understanding `remember`, `mutableStateOf`, and state hoisting is essential.

## What You'll Learn

- State in Compose
- remember and mutableStateOf
- State hoisting
- ViewModel integration

## State Basics

State that changes triggers recomposition:

```kotlin
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    
    Column {
        Text("Count: $count")
        Button(onClick = { count++ }) {
            Text("Add")
        }
    }
}
```

## remember

Preserves state across recompositions:

```kotlin
// Survives recomposition
val count = remember { mutableStateOf(0) }

// Reset when key changes
val data = remember(userId) { fetchUser(userId) }
```

Without `remember`, state resets every recomposition.

## mutableStateOf

Creates observable state:

```kotlin
// Using property delegate
var text by remember { mutableStateOf("") }
text = "New"  // Triggers recomposition

// Using State directly
val textState = remember { mutableStateOf("") }
textState.value = "New"
```

## State Hoisting

Move state up for reusability:

```kotlin
// Stateful (owns its state)
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    Counter(count, onIncrement = { count++ })
}

// Stateless (receives state)
@Composable
fun Counter(
    count: Int,
    onIncrement: () -> Unit
) {
    Column {
        Text("Count: $count")
        Button(onClick = onIncrement) {
            Text("Add")
        }
    }
}
```

### Benefits of Hoisting
- Reusable components
- Easier testing
- Single source of truth
- Parent controls behavior

## rememberSaveable

Survives configuration changes:

```kotlin
var text by rememberSaveable { mutableStateOf("") }
// Survives rotation!
```

## ViewModel Integration

```kotlin
class CounterViewModel : ViewModel() {
    var count by mutableStateOf(0)
        private set
    
    fun increment() {
        count++
    }
}

@Composable
fun CounterScreen(viewModel: CounterViewModel = viewModel()) {
    Counter(
        count = viewModel.count,
        onIncrement = viewModel::increment
    )
}
```

## Derived State

Compute values from state:

```kotlin
val items = remember { mutableStateListOf<String>() }
val itemCount by remember { derivedStateOf { items.size } }
```

## Try It Yourself

### Exercise 1: Text Input

Create a text field with:
- State for text
- Display current text length
- Clear button

### Exercise 2: Hoisted State

Refactor a stateful component:
- Move state to parent
- Pass state and callbacks down

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "compose-state-quiz",
  "type": "multiple-choice",
  "title": "State Management",
  "description": "Test your understanding of Compose state.",
  "difficulty": "medium",
  "question": "Why use 'remember' when creating state in Compose?",
  "options": [
    {
      "id": "a",
      "text": "For debugging purposes only",
      "isCorrect": false,
      "explanation": "remember is essential for state survival, not debugging."
    },
    {
      "id": "b",
      "text": "Without remember, state resets on every recomposition—remember preserves it across recompositions",
      "isCorrect": true,
      "explanation": "Correct! Composables can recompose many times. remember { mutableStateOf(...) } keeps the state alive between recompositions instead of reinitializing."
    },
    {
      "id": "c",
      "text": "remember makes state persist across app restarts",
      "isCorrect": false,
      "explanation": "remember survives recomposition, not process death. Use rememberSaveable for configuration changes."
    },
    {
      "id": "d",
      "text": "It's optional but improves performance",
      "isCorrect": false,
      "explanation": "remember is required for state to work correctly, not optional."
    }
  ]
}
-->

## Key Takeaways

- `remember` preserves state across recompositions
- `mutableStateOf` creates observable state
- Hoist state for reusability
- `rememberSaveable` survives config changes
- ViewModel for business logic state

## Next Steps

Continue to [Lists and Navigation](./05-lists-and-navigation.md) →
