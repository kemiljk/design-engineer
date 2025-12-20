# Collections

> **Quick Summary:** Kotlin provides immutable and mutable collections. Understanding the distinction and collection operations is essential.

## What You'll Learn

- Lists, Sets, and Maps
- Mutable vs Immutable
- Collection operations
- Transformations

## Lists

### Immutable List
```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val first = numbers[0]
val size = numbers.size
// numbers.add(6)  // Error - immutable
```

### Mutable List
```kotlin
val mutableNumbers = mutableListOf(1, 2, 3)
mutableNumbers.add(4)
mutableNumbers.removeAt(0)
mutableNumbers[0] = 10
```

### List Operations
```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

numbers.first()     // 1
numbers.last()      // 5
numbers.contains(3) // true
numbers.indexOf(3)  // 2
```

## Sets

Unique elements, unordered:
```kotlin
val uniqueNumbers = setOf(1, 2, 2, 3, 3)  // [1, 2, 3]

val mutableSet = mutableSetOf<String>()
mutableSet.add("apple")
mutableSet.add("apple")  // Ignored - already exists
```

## Maps

Key-value pairs:
```kotlin
val user = mapOf(
    "name" to "John",
    "email" to "john@example.com"
)

val name = user["name"]  // "John" or null

val mutableMap = mutableMapOf<String, Int>()
mutableMap["score"] = 100
mutableMap["level"] = 5
```

### Iterating Maps
```kotlin
for ((key, value) in user) {
    println("$key: $value")
}
```

## Collection Transformations

### Map
Transform each element:
```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val doubled = numbers.map { it * 2 }  // [2, 4, 6, 8, 10]
```

### Filter
Keep matching elements:
```kotlin
val evens = numbers.filter { it % 2 == 0 }  // [2, 4]
```

### Reduce/Fold
Combine to single value:
```kotlin
val sum = numbers.reduce { acc, num -> acc + num }  // 15
val sum2 = numbers.sum()  // 15
```

### Other Operations
```kotlin
numbers.take(3)          // [1, 2, 3]
numbers.drop(2)          // [3, 4, 5]
numbers.sorted()         // Sorted copy
numbers.reversed()       // Reversed copy
numbers.distinct()       // Remove duplicates
numbers.any { it > 3 }   // true
numbers.all { it > 0 }   // true
numbers.none { it < 0 }  // true
```

## Try It Yourself

### Exercise 1: List Operations

Given a list of numbers:
- Filter for even numbers
- Double each
- Sum the result

### Exercise 2: Map Practice

Create a map of products to prices:
- Add items
- Look up a price safely
- Calculate total of all prices

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "kotlin-collections-quiz",
  "type": "multiple-choice",
  "title": "Kotlin Collections",
  "description": "Test your understanding of Kotlin collections.",
  "difficulty": "easy",
  "question": "What's the difference between listOf() and mutableListOf() in Kotlin?",
  "options": [
    {
      "id": "a",
      "text": "They're the same—both create lists",
      "isCorrect": false,
      "explanation": "They have different mutability."
    },
    {
      "id": "b",
      "text": "listOf() creates an immutable list; mutableListOf() creates a list you can add to or modify",
      "isCorrect": true,
      "explanation": "Correct! Immutable by default prevents accidental modifications. Use mutableListOf() when you need to add, remove, or change elements."
    },
    {
      "id": "c",
      "text": "listOf() is for primitives, mutableListOf() is for objects",
      "isCorrect": false,
      "explanation": "Both work with any type—the difference is mutability."
    },
    {
      "id": "d",
      "text": "mutableListOf() uses more memory",
      "isCorrect": false,
      "explanation": "Memory difference is negligible—the distinction is about modification capability."
    }
  ]
}
-->

## Key Takeaways

- Use `listOf`, `setOf`, `mapOf` for immutable
- Use `mutableListOf`, etc. for mutable
- `map`, `filter`, `reduce` transform collections
- Chain operations for powerful transformations
- `it` is implicit single parameter in lambdas

## Next Steps

Continue to [Control Flow](./04-control-flow.md) →
