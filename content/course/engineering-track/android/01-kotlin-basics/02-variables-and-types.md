# Variables and Types

> **Quick Summary:** Kotlin has a strong type system with null safety as a core feature. Understanding nullable types is essential for Android development.

## What You'll Learn

During this module, you will learn about Kotlin's basic numerical and boolean types before diving into the essential concept of nullable types. Let's examine how to use safe calls and the Elvis operator effectively, while also covering type conversion and smart casting to ensure your code is both robust and concise.

## Basic Types

### Numbers
```kotlin
val byte: Byte = 127
val short: Short = 32767
val int: Int = 2147483647
val long: Long = 9223372036854775807L

val float: Float = 3.14f
val double: Double = 3.14159
```

### Boolean
```kotlin
val isActive = true
val isComplete: Boolean = false
```

### Characters and Strings
```kotlin
val letter: Char = 'A'
val text: String = "Hello, Kotlin"
val multiline = """
    First line
    Second line
""".trimIndent()
```

## Null Safety

Kotlin distinguishes nullable from non-nullable types:

### Non-Nullable
```kotlin
var name: String = "Kotlin"
// name = null  // Compile error!
```

### Nullable
```kotlin
var nickname: String? = null  // OK
nickname = "K"                // Also OK
nickname = null               // Back to null
```

## Working with Nullables

### Safe Call (?.)
```kotlin
val length = nickname?.length  // null if nickname is null
```

### Elvis Operator (?:)
```kotlin
val displayName = nickname ?: "Anonymous"  // Default if null
```

### Safe Call Chain
```kotlin
val city = user?.address?.city  // null if any is null
```

### let Block
```kotlin
nickname?.let { name ->
    println("Nickname is $name")
}
```

### Not-Null Assertion (!!)
```kotlin
val length = nickname!!.length  // Throws if null - avoid!
```

## Smart Casts

Kotlin remembers null checks:
```kotlin
fun process(text: String?) {
    if (text != null) {
        // text is automatically String (not String?)
        println(text.length)
    }
}
```

## Type Conversion

Explicit conversion required:
```kotlin
val i: Int = 42
val l: Long = i.toLong()
val d: Double = i.toDouble()
val s: String = i.toString()

val str = "123"
val num = str.toIntOrNull()  // Safe conversion, returns null if fails
```

## Try It Yourself

### Exercise 1: Null Safety

Test your understanding of null safety by writing a function that accepts a nullable string as an argument. The function should return the length of the string if it exists, or zero if the value is null, ensuring that you use safe calls for a clean implementation.

### Exercise 2: Conversion

Further develop your skills by creating a function that takes a string input that might represent a number. Your task is to return the numerical value doubled if the conversion is successful, or null if the input is invalid.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "kotlin-null-quiz",
  "type": "multiple-choice",
  "title": "Null Safety in Kotlin",
  "description": "Test your understanding of Kotlin null safety.",
  "difficulty": "medium",
  "question": "What does the '?' operator mean after a type in Kotlin?",
  "options": [
    {
      "id": "a",
      "text": "The variable is optional and can be omitted",
      "isCorrect": false,
      "explanation": "? indicates nullability, not optional parameters."
    },
    {
      "id": "b",
      "text": "The variable can hold null—it's a nullable type",
      "isCorrect": true,
      "explanation": "Correct! String? can be null, String cannot. The compiler enforces null checks on nullable types before you can use them."
    },
    {
      "id": "c",
      "text": "The type will be inferred at runtime",
      "isCorrect": false,
      "explanation": "Kotlin's type inference happens at compile time."
    },
    {
      "id": "d",
      "text": "It's a ternary operator",
      "isCorrect": false,
      "explanation": "Kotlin doesn't have a ternary operator. It uses if expressions."
    }
  ]
}
-->

## Key Takeaways

To master variables and types in Kotlin, you must understand that appending a question mark to a type name makes it nullable and that the safe call operator allows for error-free property access. You should use the Elvis operator to provide sensible default values and rely on smart casts to simplify your null-checking logic, while always avoiding the not-null assertion operator to maintain the integrity of your code.

## Next Steps

Continue to [Collections](./03-collections.md) →
