# Understanding Swift Basics

> **Quick Summary:** Before diving into SwiftUI for designing interfaces, you need a foundation in Swift—Apple's programming language. This lesson covers the essential concepts designers need to know.

## What You'll Learn

- Basic structures such as variables, constants, and functions
- Swift's type system and how it ensures safety
- Optionals and how to handle potentially missing values
- How these concepts appear in SwiftUI code

## Swift for Designers

You don't need to become a Swift expert to use SwiftUI effectively, but understanding these basics will empower you to read and modify existing code while interpreting error messages with ease. This foundation will also allow you to build more complex interfaces and communicate more effectively with your fellow developers.

This lesson focuses on what you'll actually encounter when building UIs.

## Variables and Constants

### Constants with `let`

Use `let` when a value won't change:

```swift
let appName = "My Design App"
let maxUsers = 100
let isPublished = true
```

Most values in SwiftUI are constants. Once you create a view, its structure doesn't change.

### Variables with `var`

Use `var` when a value might change:

```swift
var score = 0
score = score + 10

var username = "designer"
username = "design_engineer"
```

In SwiftUI, you'll use `var` for state—things that change over time.

### Type Inference

Swift figures out types automatically:

```swift
let name = "Karl"        // Swift knows this is a String
let count = 42           // Swift knows this is an Int
let price = 19.99        // Swift knows this is a Double
let isActive = true      // Swift knows this is a Bool
```

You can be explicit if needed:

```swift
let percentage: Double = 75
```

## Basic Types

The types you'll use most:

| Type | Example | Use |
|------|---------|-----|
| `String` | `"Hello"` | Text |
| `Int` | `42` | Whole numbers |
| `Double` | `3.14` | Decimal numbers |
| `Bool` | `true`/`false` | Yes/no values |

### Strings

```swift
let greeting = "Hello"
let name = "Designer"

// Combine strings with interpolation
let message = "Welcome, \(name)!"  // "Welcome, Designer!"

// Multi-line strings
let paragraph = """
This is a longer piece of text
that spans multiple lines.
"""
```

### Numbers

```swift
let integer = 42
let decimal = 3.14

// Basic maths
let sum = 10 + 5
let product = 4 * 3
let quotient = 20 / 4
```

### Booleans

```swift
let isVisible = true
let isLoading = false

// Combine with logic
let shouldShow = isVisible && !isLoading
```

## Collections

### Arrays

Ordered lists of items:

```swift
let colours = ["Red", "Green", "Blue"]

// Access by index (starts at 0)
let first = colours[0]  // "Red"

// Array of numbers
var scores = [100, 85, 92]
scores.append(88)  // Add to end
```

### Dictionaries

Key-value pairs:

```swift
let user = [
    "name": "Karl",
    "role": "Designer"
]

let name = user["name"]  // "Karl"
```

## Functions

Functions bundle reusable code:

```swift
func greet() {
    print("Hello!")
}

greet()  // Prints: Hello!
```

### Functions with Parameters

```swift
func greet(name: String) {
    print("Hello, \(name)!")
}

greet(name: "Designer")  // Prints: Hello, Designer!
```

### Functions that Return Values

```swift
func double(number: Int) -> Int {
    return number * 2
}

let result = double(number: 5)  // 10
```

### SwiftUI Uses Functions Everywhere

When you write SwiftUI, you're constantly defining views that are like functions:

```swift
var body: some View {
    Text("Hello")
}
```

## Structs

Structs group related data:

```swift
struct User {
    let name: String
    let email: String
    var isActive: Bool
}

let designer = User(
    name: "Karl",
    email: "karl@example.com",
    isActive: true
)

print(designer.name)  // "Karl"
```

### SwiftUI Views Are Structs

Every view in SwiftUI is a struct:

```swift
struct ContentView: View {
    var body: some View {
        Text("Hello!")
    }
}
```

This is why understanding structs matters—you're creating them constantly.

## Properties

Structs have properties (values they hold):

```swift
struct Profile {
    let name: String           // Stored property
    var bio: String            // Stored property (changeable)
    
    var greeting: String {     // Computed property
        return "Hi, I'm \(name)"
    }
}
```

### SwiftUI's `body` Property

The `body` property is computed—it's calculated each time SwiftUI needs it:

```swift
struct MyView: View {
    var body: some View {
        // This runs whenever the view updates
        Text("Hello")
    }
}
```

## Control Flow

### Conditionals

```swift
let score = 85

if score >= 90 {
    print("Excellent")
} else if score >= 70 {
    print("Good")
} else {
    print("Keep practising")
}
```

### In SwiftUI

Conditionals show different content:

```swift
struct ContentView: View {
    let isLoggedIn = true
    
    var body: some View {
        if isLoggedIn {
            Text("Welcome back!")
        } else {
            Text("Please sign in")
        }
    }
}
```

### Loops

```swift
let items = ["Apple", "Banana", "Cherry"]

for item in items {
    print(item)
}
```

### In SwiftUI

Loops create multiple views:

```swift
struct ListView: View {
    let items = ["Design", "Code", "Ship"]
    
    var body: some View {
        VStack {
            ForEach(items, id: \.self) { item in
                Text(item)
            }
        }
    }
}
```

## Optionals

Optionals handle the absence of a value:

```swift
var middleName: String? = nil  // Might not exist
var firstName: String = "Karl"  // Always exists
```

### Why Optionals Matter

In SwiftUI, data from APIs or user input might be missing:

```swift
struct Profile {
    let name: String
    let bio: String?  // User might not have set a bio
}
```

### Unwrapping Optionals

```swift
let nickname: String? = "Kai"

// Safe unwrapping with if let
if let name = nickname {
    print("Hi, \(name)")
}

// Default value with ??
let displayName = nickname ?? "Anonymous"
```

## Reading SwiftUI Code

Now let's see how these concepts appear in real SwiftUI:

```swift
struct ProfileCard: View {
    // Properties (data the view needs)
    let name: String
    let role: String
    var isVerified: Bool = false
    
    // Computed property (the view structure)
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            // Conditional rendering
            if isVerified {
                Image(systemName: "checkmark.seal.fill")
                    .foregroundStyle(.blue)
            }
            
            // Using properties
            Text(name)
                .font(.headline)
            
            Text(role)
                .foregroundStyle(.secondary)
        }
        .padding()
    }
}
```

Can you identify:
Can you identify the struct definition and its associated properties? Take a moment to locate the conditional logic within the body and spot where string interpolation is being used to display data.

## Common Patterns in SwiftUI

### View Modifiers

Methods that return modified views:

```swift
Text("Hello")
    .font(.title)
    .foregroundStyle(.blue)
    .padding()
```

Each modifier creates a new, modified version of the view.

### Closures

Compact functions often used in SwiftUI:

```swift
Button("Tap me") {
    // This code runs when tapped
    print("Button tapped!")
}
```

The `{ }` block is a closure—a function without a name.

### View Composition

Building complex views from simple ones:

```swift
struct ContentView: View {
    var body: some View {
        VStack {
            HeaderView()
            ContentSection()
            FooterView()
        }
    }
}
```

## Try It Yourself

### Exercise 1: Create a Struct

In a Swift Playground or Xcode:

```swift
struct Book {
    let title: String
    let author: String
    var isRead: Bool
    
    var summary: String {
        let status = isRead ? "finished" : "unread"
        return "\(title) by \(author) (\(status))"
    }
}

let myBook = Book(
    title: "Design Systems",
    author: "Alla Kholmatova",
    isRead: true
)

print(myBook.summary)
```

### Exercise 2: Work with Arrays

```swift
var tools = ["Figma", "Sketch", "Framer"]
tools.append("Xcode")

for tool in tools {
    print("I use \(tool)")
}
```

### Exercise 3: Add Conditional Logic

```swift
func getDiscount(isPremium: Bool, cartTotal: Double) -> Double {
    if isPremium {
        return cartTotal * 0.2  // 20% off
    } else if cartTotal > 100 {
        return cartTotal * 0.1  // 10% off
    } else {
        return 0
    }
}
```

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swift-basics-quiz",
  "type": "multiple-choice",
  "title": "Swift Fundamentals",
  "description": "Test your understanding of basic Swift concepts.",
  "difficulty": "easy",
  "question": "What's the difference between 'let' and 'var' in Swift?",
  "options": [
    {
      "id": "a",
      "text": "let is for strings, var is for numbers",
      "isCorrect": false,
      "explanation": "Both let and var can hold any type."
    },
    {
      "id": "b",
      "text": "let creates a constant (unchangeable), var creates a variable (changeable)",
      "isCorrect": true,
      "explanation": "Correct! Use let when a value won't change, var when it might."
    },
    {
      "id": "c",
      "text": "let is public, var is private",
      "isCorrect": false,
      "explanation": "Visibility is controlled by access modifiers, not let/var."
    },
    {
      "id": "d",
      "text": "They're interchangeable",
      "isCorrect": false,
      "explanation": "They serve different purposes—constants vs variables."
    }
  ]
}
-->

## Key Takeaways

- Master Swift's strong types like String, Int, Double, and Bool
- Remember that SwiftUI views are themselves structs
- Use functions to bundle reusable logic effectively
- Always handle potentially missing data with optionals
- Recognise how all these concepts interweave within practical SwiftUI code

## Next Steps

Continue to [Setting Up Your Development Workflow](./03-setting-up-your-workflow.md) →
