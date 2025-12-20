# Control Flow

> **Quick Summary:** Kotlin's control flow includes expressions (not just statements), powerful when expressions, and concise loop syntax.

## What You'll Learn

- If expressions
- When expressions
- Loops
- Exception handling

## If Expressions

In Kotlin, `if` is an expression that returns a value:

```kotlin
val max = if (a > b) a else b

val result = if (score >= 90) {
    "A"
} else if (score >= 80) {
    "B"
} else {
    "C"
}
```

## When Expressions

Kotlin's `when` replaces switch and is more powerful:

```kotlin
val grade = when (score) {
    in 90..100 -> "A"
    in 80..89 -> "B"
    in 70..79 -> "C"
    else -> "F"
}

// Multiple conditions
when (x) {
    0, 1 -> println("x is 0 or 1")
    in 2..10 -> println("x is between 2 and 10")
    else -> println("otherwise")
}

// Without argument
val description = when {
    score >= 90 -> "Excellent"
    score >= 70 -> "Good"
    else -> "Needs improvement"
}
```

### When with Sealed Classes
```kotlin
sealed class Result {
    data class Success(val data: String) : Result()
    data class Error(val message: String) : Result()
    object Loading : Result()
}

fun handle(result: Result) = when (result) {
    is Result.Success -> println(result.data)
    is Result.Error -> println(result.message)
    Result.Loading -> println("Loading...")
}
```

## Loops

### For Loop
```kotlin
for (i in 1..5) {
    println(i)  // 1, 2, 3, 4, 5
}

for (i in 1 until 5) {
    println(i)  // 1, 2, 3, 4
}

for (i in 5 downTo 1) {
    println(i)  // 5, 4, 3, 2, 1
}

for (i in 1..10 step 2) {
    println(i)  // 1, 3, 5, 7, 9
}

// Iterate collection
for (item in list) {
    println(item)
}

// With index
for ((index, item) in list.withIndex()) {
    println("$index: $item")
}
```

### While Loop
```kotlin
while (condition) {
    // ...
}

do {
    // Executes at least once
} while (condition)
```

## Exception Handling

```kotlin
try {
    val result = riskyOperation()
} catch (e: IOException) {
    println("IO error: ${e.message}")
} catch (e: Exception) {
    println("Error: ${e.message}")
} finally {
    cleanup()
}

// As expression
val number = try {
    str.toInt()
} catch (e: NumberFormatException) {
    0
}
```

## Try It Yourself

### Exercise 1: Grade Calculator

Use `when` to convert a score to a letter grade with +/- variants.

### Exercise 2: Collection Loop

Loop through a list of users and print formatted output with index.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "kotlin-when-quiz",
  "type": "multiple-choice",
  "title": "Kotlin Control Flow",
  "description": "Test your understanding of Kotlin control flow.",
  "difficulty": "medium",
  "question": "How is Kotlin's 'when' expression different from a traditional switch statement?",
  "options": [
    {
      "id": "a",
      "text": "It's exactly the same, just different syntax",
      "isCorrect": false,
      "explanation": "when is more powerful than traditional switch."
    },
    {
      "id": "b",
      "text": "when is an expression (returns a value), can match ranges and conditions, and is exhaustive for enums",
      "isCorrect": true,
      "explanation": "Correct! when returns values, can match ranges (1..10), types (is String), conditions, and the compiler ensures all enum cases are handled."
    },
    {
      "id": "c",
      "text": "when only works with integers",
      "isCorrect": false,
      "explanation": "when works with any type and can have complex conditions."
    },
    {
      "id": "d",
      "text": "when requires break statements",
      "isCorrect": false,
      "explanation": "Unlike switch, when doesn't fall through—no break needed."
    }
  ]
}
-->

## Key Takeaways

- `if` and `when` are expressions returning values
- `when` is exhaustive with sealed classes
- Ranges: `..` (inclusive), `until` (exclusive)
- `step` and `downTo` for range variations
- Try-catch can be expressions

## Next Steps

Continue to [Functions and Lambdas](./05-functions-and-lambdas.md) →
