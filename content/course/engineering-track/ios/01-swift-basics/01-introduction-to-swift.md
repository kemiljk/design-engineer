# Introduction to Swift

> **Quick Summary:** Swift is Apple's modern programming language. It's safe, fast, and expressive—perfect for building iOS apps.

## What You'll Learn

- What Swift is and why it matters
- Swift Playgrounds for learning
- Basic syntax overview
- Your first Swift code

## What Is Swift?

Swift is Apple's programming language for:
- iOS, iPadOS apps
- macOS apps
- watchOS, tvOS apps
- Server-side development

### Why Swift?
- **Safe:** Catches errors at compile time
- **Fast:** Performance close to C
- **Expressive:** Clean, readable syntax
- **Modern:** Incorporates best practices

## Getting Started

### Swift Playgrounds
Best way to learn:
- Available on iPad and Mac
- Interactive, immediate feedback
- No project setup needed
- Great for experimentation

### Xcode Playgrounds
In Xcode:
1. File → New → Playground
2. Choose Blank template
3. Write code, see results

## Basic Syntax

### Comments
```swift
// Single line comment

/* 
   Multi-line
   comment
*/
```

### Printing Output
```swift
print("Hello, World!")
print("The answer is \(42)")
```

### Constants and Variables
```swift
let constant = "Cannot change"  // Immutable
var variable = "Can change"     // Mutable

variable = "New value"  // OK
// constant = "New"     // Error!
```

### Type Inference
Swift infers types:
```swift
let message = "Hello"    // String
let count = 42           // Int
let price = 19.99        // Double
let isActive = true      // Bool
```

### Type Annotations
Explicit when needed:
```swift
let score: Int = 100
let name: String = "Swift"
let ratio: Double = 0.5
```

## Basic Operations

### Arithmetic
```swift
let sum = 5 + 3      // 8
let diff = 10 - 4    // 6
let product = 6 * 7  // 42
let quotient = 20 / 4 // 5
let remainder = 17 % 5 // 2
```

### String Operations
```swift
let first = "Hello"
let second = "World"
let greeting = first + ", " + second + "!"
// "Hello, World!"

let name = "Swift"
let message = "Welcome to \(name)!"
// "Welcome to Swift!"
```

## Try It Yourself

### Exercise 1: Hello Swift

Create a playground and:
1. Print your name
2. Create a constant for your birth year
3. Calculate and print your age

### Exercise 2: String Interpolation

Create variables for:
- A product name
- A price
- A quantity

Print a formatted receipt line.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swift-intro-quiz",
  "type": "multiple-choice",
  "title": "Introduction to Swift",
  "description": "Test your understanding of Swift basics.",
  "difficulty": "easy",
  "question": "Why is Swift considered a 'safe' programming language?",
  "options": [
    {
      "id": "a",
      "text": "It prevents you from writing any bugs",
      "isCorrect": false,
      "explanation": "No language prevents all bugs—Swift focuses on preventing common categories of errors."
    },
    {
      "id": "b",
      "text": "It has optionals, type safety, and forces handling of nil/error cases at compile time",
      "isCorrect": true,
      "explanation": "Correct! Swift's type system and optionals catch many errors before your code runs. You must explicitly handle nil values, preventing null pointer crashes."
    },
    {
      "id": "c",
      "text": "It only runs on secure Apple devices",
      "isCorrect": false,
      "explanation": "Swift runs on multiple platforms—'safe' refers to language design, not hardware."
    },
    {
      "id": "d",
      "text": "It encrypts all your data automatically",
      "isCorrect": false,
      "explanation": "Security features are separate from Swift's safety guarantees."
    }
  ]
}
-->

## Key Takeaways

- Swift is safe, fast, and modern
- Use `let` for constants, `var` for variables
- Types are inferred but can be explicit
- String interpolation uses `\(value)` syntax
- Playgrounds are great for learning

## Next Steps

Continue to [Variables and Types](./02-variables-and-types.md) →
