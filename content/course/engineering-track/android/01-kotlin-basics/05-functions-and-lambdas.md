# Functions and Lambdas

> **Quick Summary:** Kotlin has powerful function features including default parameters, named arguments, and first-class lambda support.

## What You'll Learn

- During this module, you will learn the fundamental syntax for defining functions
- explore the power of default explore the power of default and named parameters
- We'll examine lambdas

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

Practise your implementation of functional programming by creating a higher-order function that accepts both a list and a transformation lambda. Your goal is to apply the provided transformation to every element and return the resulting collection.

### Exercise 2: Extension Function

Further enhance your skills by adding a practical extension to the String type called `truncate`. This function should shorten a string to a specified length and append an ellipsis, while simply returning the original string if it is already shorter than the target length.

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

- named arguments to make your calls more readable named arguments to make your calls more readable
- Remember that the implicit `it` parameter allows for cleaner lambdas
- that the trailing lambda syntax is the standard for functional calls
- that the trailing lambda syntax is the standard for functional calls
- `run` to simplify your object manipulation patterns
- `run` to simplify your object manipulation patterns

## Next Steps

Continue to [Classes and Data Classes](./06-classes-and-data-classes.md) →
