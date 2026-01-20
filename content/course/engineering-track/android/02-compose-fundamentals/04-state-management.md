# State Management

> **Quick Summary:** Compose uses state to drive UI updates. Understanding `remember`, `mutableStateOf`, and state hoisting is essential.

## What You'll Learn

During this module, you will learn how state drives UI updates in Compose and explore the essential roles of `remember` and `mutableStateOf`. We'll examine the concept of state hoisting for creating reusable components and look at how to integrate ViewModels for more robust state management.

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
Hoisting your state results in more reusable components and drastically simplifies the testing process. By creating a single source of truth, you ensure that the parent container maintains control over the behaviour of its child elements, leading to a cleaner and more predictable architecture.

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

Practise your state management skills by creating an interactive text field that displays its current character count in real time. You should also include a clear button that resets the state, ensuring that the interface updates immediately to reflect the change.

### Exercise 2: Hoisted State

Further develop your architectural skills by refactoring a stateful component into a stateless one. Move the internal state management up to the parent container and pass the necessary state and event callbacks back down to ensure proper state hoisting.

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

To build responsive interfaces in Compose, you must use `remember` to preserve your state across recompositions and `mutableStateOf` to create observables that trigger UI updates. Always prioritise hoisting your state to enhance component reusability and use `rememberSaveable` to ensure data persists through configuration changes like screen rotation. Finally, leverage ViewModels to manage complex business logic and provide a consistent source of truth for your screen's state.

## Next Steps

Continue to [Lists and Navigation](./05-lists-and-navigation.md) →
