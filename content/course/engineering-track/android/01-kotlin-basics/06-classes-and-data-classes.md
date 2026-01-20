# Classes and Data Classes

> **Quick Summary:** Kotlin makes classes concise with primary constructors, and data classes automatically generate boilerplate code.

## What You'll Learn

During this module, you will learn the syntax for class declarations, property definitions, and the various constructor types available in Kotlin. We'll examine the power of data classes for reducing boilerplate code and explore object declarations for implementing singletons and companion members.

## Basic Classes

```kotlin
class Person(val name: String, var age: Int) {
    fun greet() = "Hello, I'm $name"
}

val person = Person("John", 30)
println(person.name)  // John
person.age = 31       // Mutable property
```

## Properties

```kotlin
class Rectangle(val width: Int, val height: Int) {
    // Computed property
    val area: Int
        get() = width * height
    
    // Property with backing field
    var color: String = "white"
        set(value) {
            field = value.lowercase()
        }
}
```

## Constructors

```kotlin
class Person(val name: String) {
    var age: Int = 0
    
    // Secondary constructor
    constructor(name: String, age: Int) : this(name) {
        this.age = age
    }
    
    // Init block
    init {
        println("Person created: $name")
    }
}
```

## Data Classes

Automatic generation of `equals()`, `hashCode()`, `toString()`, `copy()`:

```kotlin
data class User(
    val id: Int,
    val name: String,
    val email: String
)

val user = User(1, "John", "john@example.com")
println(user)  // User(id=1, name=John, email=john@example.com)

// Copy with modifications
val updated = user.copy(email = "new@example.com")

// Destructuring
val (id, name, email) = user
```

## Object Declarations

### Singleton
```kotlin
object DatabaseConfig {
    val url = "jdbc://..."
    fun connect() { }
}

DatabaseConfig.connect()
```

### Companion Object
```kotlin
class User private constructor(val name: String) {
    companion object {
        fun create(name: String): User {
            return User(name)
        }
    }
}

val user = User.create("John")
```

## Sealed Classes

Restricted class hierarchies:

```kotlin
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
    object Loading : Result<Nothing>()
}

fun handle(result: Result<String>) = when (result) {
    is Result.Success -> println(result.data)
    is Result.Error -> println(result.message)
    Result.Loading -> println("Loading...")
}
```

## Try It Yourself

### Exercise 1: Data Class

Practise your structural design skills by creating a `Product` data class that includes properties for an ID, name, price, and quantity. Use the generated `copy` function to create a second version of a product with a discounted price while maintaining the other original values.

### Exercise 2: Sealed Class

Further develop your understanding of class hierarchies by implementing a `NetworkState` sealed class with three specific states: loading, success with data, and error with an exception. Finally, write a `when` expression to handle each of these states in a safe and exhaustive manner.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "kotlin-dataclass-quiz",
  "type": "multiple-choice",
  "title": "Data Classes",
  "description": "Test your understanding of Kotlin data classes.",
  "difficulty": "easy",
  "question": "What does the 'data' keyword provide for a class in Kotlin?",
  "options": [
    {
      "id": "a",
      "text": "Database connectivity",
      "isCorrect": false,
      "explanation": "data class is about structure, not persistence."
    },
    {
      "id": "b",
      "text": "Automatic equals(), hashCode(), toString(), and copy() based on properties",
      "isCorrect": true,
      "explanation": "Correct! Data classes automatically generate common methods based on constructor properties—perfect for value objects, DTOs, and models."
    },
    {
      "id": "c",
      "text": "JSON serialization",
      "isCorrect": false,
      "explanation": "Serialization requires additional libraries—data class just provides common methods."
    },
    {
      "id": "d",
      "text": "Makes the class immutable",
      "isCorrect": false,
      "explanation": "You can have var properties in data classes—use val for immutability."
    }
  ]
}
-->

## Key Takeaways

To master classes in Kotlin, you must remember that primary constructors are defined directly in the class header and that property mutability is controlled through the use of `val` and `var`. Data classes are essential for automatically generating common boilerplate methods, while the `copy` function allows you to create modified versions of your data objects with ease. Finally, leverage sealed classes to restrict inheritance and use object declarations to implement singletons or companion members for static-like functionality within your codebase.

## Congratulations!

You've completed the Kotlin Basics module!

Continue to [Compose Fundamentals: What is Compose](../02-compose-fundamentals/01-what-is-compose.md) →
