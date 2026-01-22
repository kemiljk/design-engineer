# Introduction to Kotlin

> **Quick Summary:** Kotlin is a modern, concise language that's the preferred choice for Android development. It's safe, expressive, and interoperable with Java.

## What You'll Learn

- Why Kotlin matters as a platform for Android development
- A comprehensive overview of its basic syntax
- The relationship between Kotlin and Java
- How to write your first lines of modern Android code

## What Is Kotlin?

Kotlin is:
Developed by JetBrains, Kotlin has been the official language for Android development since 2019. It runs on the Java Virtual Machine (JVM) for full interoperability with Java, while also possessing the capability to compile to JavaScript and various native platforms.

### Why Kotlin?
Kotlin is preferred because it is concise, significantly reducing boilerplate code, and safe because of its built-in null safety. Its expressive, modern language features make it a pleasure to work with, while its full interoperability ensures it works seamlessly with existing Java codebases.

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

Practice your skills by writing a function that takes a name parameter and returns a personalised greeting string. Finally, call this function and print the result to the console to verify your implementation.

### Exercise 2: Calculator

Expand your experience by creating a set of calculator functions for addition, subtraction, multiplication, and division. Each function should take two numbers as input and return the corresponding mathematical result.

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

- Use `val` for constants and `var` for variables
- Take advantage of Kotlin's type inference to reduce boilerplate
- Utilise string templates for easy variable and expression insertion into text
- Use the `fun` keyword to define functions
- Single-expression functions can omit braces and the explicit return keyword

## Next Steps

Continue to [Variables and Types](./02-variables-and-types.md) →
