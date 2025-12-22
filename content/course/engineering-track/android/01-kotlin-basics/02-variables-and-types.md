# Variables and Types

> **Quick Summary:** Kotlin has a strong type system with null safety as a core feature. Understanding nullable types is essential for Android development.

## What You'll Learn

- Basic types
- Nullable types
- Safe calls and Elvis operator
- Type conversion

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

Write a function that:
- Takes a nullable string
- Returns its length or 0 if null
- Use safe calls

### Exercise 2: Conversion

Create a function that:
- Takes a string that might be a number
- Returns the number doubled, or null if invalid

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

- `Type?` makes a type nullable
- `?.` for safe calls
- `?:` (Elvis) for default values
- Avoid `!!` - it defeats null safety
- Smart casts simplify null checks

## Next Steps

Continue to [Collections](./03-collections.md) →
