# Functions and Lambdas

> **Quick Summary:** Kotlin has powerful function features including default parameters, named arguments, and first-class lambda support.

## What You'll Learn

- Function syntax
- Default and named parameters
- Lambdas and higher-order functions
- Extension functions

## Function Basics

```kotlin
fun greet(name: String): String {
    return "Hello, $name!"
}

// Single expression
fun greet(name: String) = "Hello, $name!"

// Unit return (void)
fun log(message: String) {
    println(message)
}
```

## Default Parameters

```kotlin
fun greet(name: String = "World", greeting: String = "Hello") =
    "$greeting, $name!"

greet()                    // "Hello, World!"
greet("Kotlin")            // "Hello, Kotlin!"
greet("Kotlin", "Hi")      // "Hi, Kotlin!"
```

## Named Arguments

```kotlin
greet(greeting = "Welcome", name = "User")
// Can mix positional and named
greet("Kotlin", greeting = "Welcome")
```

## Lambdas

Anonymous functions:

```kotlin
val sum = { a: Int, b: Int -> a + b }
println(sum(5, 3))  // 8

// Type can be specified
val multiply: (Int, Int) -> Int = { a, b -> a * b }

// Single parameter uses 'it'
val double: (Int) -> Int = { it * 2 }
```

## Higher-Order Functions

Functions that take or return functions:

```kotlin
fun operate(a: Int, b: Int, operation: (Int, Int) -> Int): Int {
    return operation(a, b)
}

val result = operate(5, 3) { x, y -> x + y }  // 8
```

### Trailing Lambda Syntax
When last parameter is a lambda:
```kotlin
// Lambda outside parentheses
list.map { it * 2 }

// If only parameter
list.forEach { println(it) }
```

## Extension Functions

Add methods to existing types:

```kotlin
fun String.addExclamation() = "$this!"

"Hello".addExclamation()  // "Hello!"

// With receiver
fun Int.isEven() = this % 2 == 0

4.isEven()  // true
```

## Scope Functions

### let
```kotlin
user?.let { u ->
    println(u.name)
}
```

### apply
```kotlin
val user = User().apply {
    name = "John"
    email = "john@example.com"
}
```

### run
```kotlin
val length = text.run {
    println("Processing: $this")
    length
}
```

### also
```kotlin
val numbers = mutableListOf(1, 2, 3).also {
    println("Created list: $it")
}
```

## Try It Yourself

### Exercise 1: Higher-Order Function

Create a function that:
- Takes a list and a transformation lambda
- Returns transformed list

### Exercise 2: Extension Function

Add an extension to String:
- `truncate(length: Int)` - truncates with "..."
- Returns original if shorter

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "kotlin-lambdas-quiz",
  "type": "multiple-choice",
  "title": "Functions and Lambdas",
  "description": "Test your understanding of Kotlin lambdas.",
  "difficulty": "medium",
  "question": "What is the 'trailing lambda' syntax in Kotlin?",
  "options": [
    {
      "id": "a",
      "text": "A lambda that runs after the function completes",
      "isCorrect": false,
      "explanation": "Trailing refers to syntax position, not execution timing."
    },
    {
      "id": "b",
      "text": "When a lambda is the last parameter, you can write it outside the parentheses",
      "isCorrect": true,
      "explanation": "Correct! Instead of items.filter({ it > 0 }) you write items.filter { it > 0 }. If the lambda is the only parameter, you can omit parentheses entirely."
    },
    {
      "id": "c",
      "text": "A way to chain multiple lambdas together",
      "isCorrect": false,
      "explanation": "Trailing lambda is about calling syntax, not chaining."
    },
    {
      "id": "d",
      "text": "A deprecated syntax that should be avoided",
      "isCorrect": false,
      "explanation": "Trailing lambdas are idiomatic Kotlin and widely used."
    }
  ]
}
-->

## Key Takeaways

- Default parameters reduce overloads
- Named arguments improve readability
- `it` is implicit single lambda parameter
- Trailing lambdas are idiomatic
- Extension functions add to existing types
- Scope functions (`let`, `apply`, `run`) simplify common patterns

## Next Steps

Continue to [Classes and Data Classes](./06-classes-and-data-classes.md) →
