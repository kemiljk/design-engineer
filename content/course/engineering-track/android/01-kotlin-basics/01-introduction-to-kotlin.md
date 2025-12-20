# Introduction to Kotlin

> **Quick Summary:** Kotlin is a modern, concise language that's the preferred choice for Android development. It's safe, expressive, and interoperable with Java.

## What You'll Learn

- What Kotlin is and why it matters
- Basic syntax overview
- Kotlin vs Java
- Getting started

## What Is Kotlin?

Kotlin is:
- Developed by JetBrains
- Official language for Android (since 2019)
- Runs on JVM (interoperable with Java)
- Also compiles to JavaScript and Native

### Why Kotlin?
- **Concise:** Less boilerplate
- **Safe:** Null safety built-in
- **Expressive:** Modern language features
- **Interoperable:** Works with existing Java code

## Basic Syntax

### Hello World
```kotlin
fun main() {
    println("Hello, Kotlin!")
}
```

### Variables
```kotlin
val immutable = "Cannot change"  // Like final
var mutable = "Can change"

mutable = "New value"  // OK
// immutable = "New"   // Error!
```

### Type Inference
```kotlin
val message = "Hello"    // String inferred
val count = 42           // Int inferred
val price = 19.99        // Double inferred
val isActive = true      // Boolean inferred
```

### Explicit Types
```kotlin
val score: Int = 100
val name: String = "Kotlin"
val ratio: Double = 0.5
```

## Functions

```kotlin
// Basic function
fun greet() {
    println("Hello!")
}

// With parameters
fun greet(name: String) {
    println("Hello, $name!")
}

// With return type
fun add(a: Int, b: Int): Int {
    return a + b
}

// Single expression (implicit return)
fun multiply(a: Int, b: Int) = a * b
```

## String Templates

```kotlin
val name = "Kotlin"
println("Welcome to $name!")  // Simple variable

val a = 5
val b = 3
println("Sum: ${a + b}")  // Expression
```

## Kotlin vs Java

```java
// Java
public class Person {
    private String name;
    
    public Person(String name) {
        this.name = name;
    }
    
    public String getName() {
        return name;
    }
}
```

```kotlin
// Kotlin
data class Person(val name: String)
```

Same functionality, fraction of the code.

## Try It Yourself

### Exercise 1: Hello Kotlin

Write a function that:
1. Takes a name parameter
2. Returns a greeting string
3. Call it and print the result

### Exercise 2: Calculator

Create functions:
- add, subtract, multiply, divide
- Each takes two numbers
- Returns the result

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "kotlin-intro-quiz",
  "type": "multiple-choice",
  "title": "Introduction to Kotlin",
  "description": "Test your understanding of Kotlin basics.",
  "difficulty": "easy",
  "question": "Why is Kotlin the preferred language for Android development?",
  "options": [
    {
      "id": "a",
      "text": "It's the only language Android supports",
      "isCorrect": false,
      "explanation": "Java is still supported—Kotlin is preferred, not required."
    },
    {
      "id": "b",
      "text": "It's more concise, safer (null safety), and fully interoperable with Java",
      "isCorrect": true,
      "explanation": "Correct! Kotlin reduces boilerplate, prevents null pointer exceptions by design, and works seamlessly with existing Java code and libraries."
    },
    {
      "id": "c",
      "text": "It runs faster than Java",
      "isCorrect": false,
      "explanation": "Performance is comparable—Kotlin's advantages are in developer experience."
    },
    {
      "id": "d",
      "text": "It doesn't require compilation",
      "isCorrect": false,
      "explanation": "Kotlin compiles to bytecode just like Java."
    }
  ]
}
-->

## Key Takeaways

- Use `val` for constants, `var` for variables
- Types are inferred but can be explicit
- String templates use `$variable` or `${expression}`
- Functions use `fun` keyword
- Single expressions can omit braces and return

## Next Steps

Continue to [Variables and Types](./02-variables-and-types.md) →
