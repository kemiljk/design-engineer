# Understanding Kotlin Basics

> **Quick Summary:** Before getting into Jetpack Compose for designing Android interfaces, you need a foundation in Kotlin, the modern language for Android development. This lesson covers the essential concepts designers need to know.

## What You'll Learn

Throughout this lesson, you will learn the fundamentals of Kotlin without being overwhelmed by excessive detail. We'll examine variables, types, and the language's robust null safety features, alongside practical introductions to functions, lambdas, classes, and data classes, focusing specifically on how these concepts appear within Jetpack Compose.

## Kotlin for Designers

You don't need to become a Kotlin expert to use Jetpack Compose effectively. But understanding the basics helps you:

Understanding the basics of Kotlin allows you to read and modify existing code with confidence, while also helping you decipher complex error messages more easily. This foundational knowledge empowers you to build more sophisticated user interfaces and communicate far more effectively with your Android development team.

This lesson focuses on what you'll actually encounter when building interfaces.

## Variables and Types

### Immutable with `val`

Use `val` when a value won't change (like `let` in Swift):

```kotlin
val appName = "My Design App"
val maxUsers = 100
val isPublished = true
```

Most values in Compose are immutable. This helps prevent bugs.

### Mutable with `var`

Use `var` when a value might change:

```kotlin
var score = 0
score = score + 10

var username = "designer"
username = "design_engineer"
```

In Compose, you'll use `var` with special state holders for reactive updates.

### Type Inference

Kotlin figures out types automatically:

```kotlin
val name = "Karl"        // Kotlin knows this is String
val count = 42           // Kotlin knows this is Int
val price = 19.99        // Kotlin knows this is Double
val isActive = true      // Kotlin knows this is Boolean
```

Be explicit when needed:

```kotlin
val percentage: Double = 75.0
```

## Basic Types

| Type | Example | Use |
|------|---------|-----|
| `String` | `"Hello"` | Text |
| `Int` | `42` | Whole numbers |
| `Double` | `3.14` | Decimal numbers |
| `Boolean` | `true`/`false` | Yes/no values |
| `Float` | `3.14f` | Decimals (less precision) |

### Strings

```kotlin
val greeting = "Hello"
val name = "Designer"

// String templates (interpolation)
val message = "Welcome, $name!"  // "Welcome, Designer!"

// For expressions, use braces
val info = "Length: ${name.length}"

// Multi-line strings
val paragraph = """
    This is a longer piece of text
    that spans multiple lines.
    """.trimIndent()
```

### Numbers

```kotlin
val integer = 42
val decimal = 3.14

// Basic maths
val sum = 10 + 5
val product = 4 * 3
val quotient = 20 / 4
```

### Booleans

```kotlin
val isVisible = true
val isLoading = false

// Logic operators
val shouldShow = isVisible && !isLoading  // AND, NOT
val eitherOne = isVisible || isLoading    // OR
```

## Null Safety

Kotlin's null safety is one of its best features. It prevents the dreaded "null pointer exception."

### Nullable vs Non-Nullable

```kotlin
val name: String = "Karl"    // Cannot be null
val nickname: String? = null // Can be null (note the ?)
```

The `?` marks a type as nullable.

### Safe Calls

```kotlin
val length = nickname?.length  // Returns null if nickname is null
```

### Elvis Operator

```kotlin
val displayName = nickname ?: "Anonymous"  // Use "Anonymous" if null
```

### The !! Operator (Use Sparingly)

```kotlin
val length = nickname!!.length  // Crashes if null!
```

Avoid `!!` unless you're absolutely certain the value isn't null.

### Why This Matters

In Compose, data from APIs might be missing:

```kotlin
data class Profile(
    val name: String,
    val bio: String?  // User might not have set a bio
)
```

## Collections

### Lists

```kotlin
// Immutable list
val colours = listOf("Red", "Green", "Blue")
val first = colours[0]  // "Red"

// Mutable list
val scores = mutableListOf(100, 85, 92)
scores.add(88)
```

### Maps

```kotlin
// Immutable map
val user = mapOf(
    "name" to "Karl",
    "role" to "Designer"
)
val name = user["name"]  // "Karl"

// Mutable map
val settings = mutableMapOf<String, Boolean>()
settings["darkMode"] = true
```

## Functions

Functions bundle reusable code:

```kotlin
fun greet() {
    println("Hello!")
}

greet()  // Prints: Hello!
```

### Parameters and Return Types

```kotlin
fun greet(name: String): String {
    return "Hello, $name!"
}

val message = greet("Designer")  // "Hello, Designer!"
```

### Single-Expression Functions

For simple functions:

```kotlin
fun double(number: Int): Int = number * 2

// Or even shorter with type inference
fun double(number: Int) = number * 2
```

### Default Parameters

```kotlin
fun greet(name: String = "Guest"): String {
    return "Hello, $name!"
}

greet()          // "Hello, Guest!"
greet("Karl")    // "Hello, Karl!"
```

### Named Parameters

```kotlin
fun createProfile(name: String, age: Int, isVerified: Boolean) { }

// Call with named parameters for clarity
createProfile(
    name = "Karl",
    age = 30,
    isVerified = true
)
```

This is very common in Compose:

```kotlin
Text(
    text = "Hello",
    fontSize = 24.sp,
    fontWeight = FontWeight.Bold
)
```

## Lambdas

Lambdas are small, anonymous functions. They're everywhere in Compose.

### Basic Syntax

```kotlin
val double = { number: Int -> number * 2 }
double(5)  // 10
```

### As Function Parameters

```kotlin
fun performAction(action: () -> Unit) {
    action()
}

performAction {
    println("Action performed!")
}
```

### Trailing Lambda Syntax

When the last parameter is a lambda, put it outside parentheses:

```kotlin
// These are equivalent:
button.setOnClickListener({ doSomething() })
button.setOnClickListener { doSomething() }
```

This is why Compose code looks like this:

```kotlin
Button(onClick = { /* action */ }) {
    Text("Click me")  // Content is a trailing lambda
}
```

## Classes

### Basic Class

```kotlin
class User(
    val name: String,
    val email: String,
    var isActive: Boolean = false
)

val designer = User(
    name = "Karl",
    email = "karl@example.com"
)

println(designer.name)  // "Karl"
designer.isActive = true
```

### Data Classes

Perfect for holding data (automatic equals, hashCode, toString, copy):

```kotlin
data class Profile(
    val name: String,
    val bio: String,
    val followers: Int
)

val profile = Profile("Karl", "Designer & Developer", 1000)
val updated = profile.copy(followers = 1001)
```

Data classes are common for Compose state.

## Control Flow

### Conditionals

```kotlin
val score = 85

if (score >= 90) {
    println("Excellent")
} else if (score >= 70) {
    println("Good")
} else {
    println("Keep practising")
}
```

### When Expression

Kotlin's powerful switch:

```kotlin
val grade = when (score) {
    in 90..100 -> "A"
    in 80..89 -> "B"
    in 70..79 -> "C"
    else -> "Needs improvement"
}
```

### In Compose

```kotlin
@Composable
fun StatusMessage(isLoggedIn: Boolean) {
    if (isLoggedIn) {
        Text("Welcome back!")
    } else {
        Text("Please sign in")
    }
}
```

### When in Compose

```kotlin
@Composable
fun StatusIcon(status: Status) {
    val icon = when (status) {
        Status.SUCCESS -> Icons.Default.Check
        Status.ERROR -> Icons.Default.Close
        Status.LOADING -> Icons.Default.Refresh
    }
    Icon(icon, contentDescription = null)
}
```

## Loops

### For Loops

```kotlin
val items = listOf("Apple", "Banana", "Cherry")

for (item in items) {
    println(item)
}

// With index
for ((index, item) in items.withIndex()) {
    println("$index: $item")
}
```

### In Compose

```kotlin
@Composable
fun ItemList(items: List<String>) {
    Column {
        for (item in items) {
            Text(item)
        }
    }
}

// Or using forEach
Column {
    items.forEach { item ->
        Text(item)
    }
}
```

## Reading Compose Code

Now let's see how these concepts appear in real Compose:

```kotlin
@Composable
fun ProfileCard(
    name: String,
    role: String,
    isVerified: Boolean = false
) {
    Column(
        modifier = Modifier.padding(16.dp),
        horizontalAlignment = Alignment.Start
    ) {
        if (isVerified) {
            Icon(
                Icons.Default.Verified,
                contentDescription = "Verified",
                tint = Color.Blue
            )
        }
        
        Text(
            text = name,
            style = MaterialTheme.typography.headlineSmall
        )
        
        Text(
            text = role,
            colour = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
```

As you review the code above, try to identify the specific function parameters and their default values, as well as the use of named parameters within the function calls. Look for the conditional logic that determines visibility and observe how string templates are utilized to display data.

## Common Patterns in Compose

### Modifier Chaining

Methods that return modified versions:

```kotlin
Text(
    text = "Hello",
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp)
        .background(Color.LightGray)
)
```

### Content Lambdas

Composables often take content as a trailing lambda:

```kotlin
Button(onClick = { /* action */ }) {
    Row {
        Icon(Icons.Default.Add, null)
        Text("Add Item")
    }
}
```

### Remember and State

For values that persist across recomposition:

```kotlin
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    
    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
```

## Try It Yourself

### Exercise 1: Create a Data Class

```kotlin
data class Book(
    val title: String,
    val author: String,
    val year: Int,
    val isRead: Boolean = false
)

val myBook = Book(
    title = "Design Systems",
    author = "Alla Kholmatova",
    year = 2017,
    isRead = true
)

// Create a copy with updated field
val lentBook = myBook.copy(isRead = false)
```

### Exercise 2: Work with Nullables

```kotlin
fun getDisplayName(nickname: String?, realName: String): String {
    return nickname ?: realName
}

val display = getDisplayName(null, "Karl")  // "Karl"
val display2 = getDisplayName("Kai", "Karl")  // "Kai"
```

### Exercise 3: Use When

```kotlin
enum class Theme { LIGHT, DARK, SYSTEM }

fun getThemeLabel(theme: Theme): String = when (theme) {
    Theme.LIGHT -> "Light Mode"
    Theme.DARK -> "Dark Mode"
    Theme.SYSTEM -> "Follow System"
}
```

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "kotlin-basics-quiz",
  "type": "multiple-choice",
  "title": "Kotlin Fundamentals",
  "description": "Test your understanding of basic Kotlin concepts.",
  "difficulty": "easy",
  "question": "What does the '?' after a type mean in Kotlin?",
  "options": [
    {
      "id": "a",
      "text": "The value is optional and might not be provided",
      "isCorrect": false,
      "explanation": "Close, but it specifically means the value can be null."
    },
    {
      "id": "b",
      "text": "The type is nullable, meaning it can hold null as a value",
      "isCorrect": true,
      "explanation": "Correct! String? can hold a String or null, while String cannot be null."
    },
    {
      "id": "c",
      "text": "The variable is mutable",
      "isCorrect": false,
      "explanation": "Mutability is controlled by val/var, not the ? operator."
    },
    {
      "id": "d",
      "text": "It marks the variable as public",
      "isCorrect": false,
      "explanation": "Visibility is controlled by keywords like public/private."
    }
  ]
}
-->

## Key Takeaways

To master Kotlin for Android, you must use `val` for immutable values and `var` specifically for those that need to change, while leveraging the language's strong null safety through operators like `?`, `?.`, and `?:`. Remember that data classes are ideal for managing UI state and that lambdas are the essential building blocks for Compose. Finally, utilizing named parameters will significantly improve code readability, while `when` expressions provide an elegant way to handle multiple logical conditions.

## Next Steps

Continue to [Setting Up Your Development Workflow](./03-setting-up-your-workflow.md) →
