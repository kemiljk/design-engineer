# Introduction to Swift

> **Quick Summary:** Swift is Apple's modern programming language. It's safe, fast, and expressive—perfect for building iOS apps.

## What You'll Learn

During this module, you will learn exactly what Swift is and why it remains the premier language for Apple platform development. We'll examine the use of Swift Playgrounds for interactive learning and provide a comprehensive overview of basic syntax to help you write your first lines of modern Swift code.

## What Is Swift?

Swift is Apple's programming language for:
Swift is Apple's primary programming language for building high-quality applications across iOS, iPadOS, macOS, watchOS, and tvOS. Beyond client-side apps, it is also increasingly utilised for robust server-side development, offering a unified language for your entire technology stack.

### Why Swift?
Swift is preferred because it is safe, catching many common errors at compile time, and fast, offering performance that rivals traditional C implementations. Its expressive, clean syntax makes the code highly readable, while its modern design incorporates the latest industry best practices.

## Getting Started

### Swift Playgrounds
Best way to learn:
Swift Playgrounds offers an interactive environment with immediate feedback, making it a great tool for experimentation on both Mac and iPad. Since no complex project setup is needed, it remains the best way to learn the language through direct, hands-on experience.

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
Practise your foundational Swift skills by creating a new playground and printing your name to the console. You should also create a constant to store your birth year and implement a simple calculation to determine and print your current age.

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

To build a strong foundation in Apple platform development, you must embrace Swift's safe, fast, and modern architecture. Use `let` for constants to ensure immutability and `var` for variables that require change, while leveraging type inference to keep your code clean and readable. Master the use of string interpolation for dynamic text and utilise playgrounds as your primary environment for continuous learning and experimentation.

## Next Steps

Continue to [Variables and Types](./02-variables-and-types.md) →
