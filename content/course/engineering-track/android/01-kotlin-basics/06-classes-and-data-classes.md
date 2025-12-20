# Classes and Data Classes

> **Quick Summary:** Kotlin makes classes concise with primary constructors, and data classes automatically generate boilerplate code.

## What You'll Learn

- Class declaration
- Properties and constructors
- Data classes
- Object declarations

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

Create a `Product` data class:
- id, name, price, quantity
- Use copy to create discounted version

### Exercise 2: Sealed Class

Create a `NetworkState` sealed class:
- Loading, Success(data), Error(exception)
- Handle with when expression

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

- Primary constructor in class header
- `val` = read-only, `var` = mutable property
- Data classes generate boilerplate
- `copy()` creates modified copies
- Sealed classes restrict inheritance
- Object for singletons, companion for static-like members

## Congratulations!

You've completed the Kotlin Basics module!

Continue to [Compose Fundamentals: What is Compose](../02-compose-fundamentals/01-what-is-compose.md) →
