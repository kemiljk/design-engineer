# Variables and Types

> **Quick Summary:** Swift is strongly typed with powerful type inference. Understanding types and optionals is fundamental to Swift programming.

## What You'll Learn

- Swift's robust type system and common data types
- The critical role of optionals in ensuring nil safety
- The necessary techniques for accurate type conversion in your applications

## Basic Types

### Integers
```swift
let age: Int = 25
let year = 2024  // Inferred as Int

// Sized integers (rarely needed)
let small: Int8 = 127
let big: Int64 = 9_223_372_036_854_775_807
```

### Floating Point
```swift
let pi: Double = 3.14159
let price = 19.99  // Inferred as Double

let lessPrecsion: Float = 3.14
```

### Boolean
```swift
let isActive = true
let isComplete: Bool = false
```

### Strings
```swift
let name = "Swift"
let multiline = """
    This is a
    multiline string
    """
```

### Characters
```swift
let letter: Character = "A"
let emoji: Character = "🎉"
```

## Optionals

Optionals handle the absence of a value:

### Declaring Optionals
```swift
var nickname: String? = nil
var age: Int? = 25

nickname = "Swifty"  // Now has value
nickname = nil       // Back to nil
```

### Unwrapping Optionals

**Optional Binding (if let):**
```swift
if let name = nickname {
    print("Hello, \(name)")
} else {
    print("No nickname")
}
```

**Guard Let:**
```swift
func greet(_ name: String?) {
    guard let name = name else {
        print("No name provided")
        return
    }
    print("Hello, \(name)")
}
```

**Nil Coalescing:**
```swift
let displayName = nickname ?? "Anonymous"
```

**Force Unwrapping (use carefully):**
```swift
let definitelyExists = nickname!  // Crashes if nil
```

## Type Conversion

Swift requires explicit conversion:

```swift
let integer = 42
let double = Double(integer)  // 42.0

let string = "123"
let number = Int(string)  // Optional Int

let pi = 3.14
let rounded = Int(pi)  // 3 (truncated)
```

## Type Aliases

Create custom type names:
```swift
typealias UserID = String
typealias Coordinate = (x: Double, y: Double)

let user: UserID = "user_123"
let point: Coordinate = (x: 10.0, y: 20.0)
```

## Try It Yourself

### Exercise 1: Optional Practice

Create a function that:
Practise your optional handling skills by creating a function that takes an optional name as an argument. The function should use a `guard let` statement to return a personalised greeting if a name is provided, or a generic default message if the value is nil.

### Exercise 2: Type Conversion

Write code that:
Write a piece of code that attempts to convert a string into an integer safely. Your implementation should gracefully handle the scenario where the conversion fails, ensuring the application remains stable.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swift-optionals-quiz",
  "type": "multiple-choice",
  "title": "Variables and Optionals",
  "description": "Test your understanding of Swift optionals.",
  "difficulty": "medium",
  "question": "What is the purpose of 'guard let' in Swift?",
  "options": [
    {
      "id": "a",
      "text": "To create optional values",
      "isCorrect": false,
      "explanation": "guard let unwraps optionals, it doesn't create them."
    },
    {
      "id": "b",
      "text": "To unwrap an optional and exit early if nil, keeping the unwrapped value available after",
      "isCorrect": true,
      "explanation": "Correct! guard let unwraps an optional, exits the scope if nil, and makes the unwrapped value available for the rest of the function—reducing nesting compared to if let."
    },
    {
      "id": "c",
      "text": "To force-unwrap optionals safely",
      "isCorrect": false,
      "explanation": "Guard doesn't force-unwrap. It safely unwraps with an exit path."
    },
    {
      "id": "d",
      "text": "To declare constants that can't be changed",
      "isCorrect": false,
      "explanation": "That's 'let' alone—guard let is specifically for optional unwrapping."
    }
  ]
}
-->

## Key Takeaways

- To write robust Swift code, you must master the core types of Int, Double, Bool, and String while understanding how optionals represent the possible absence of a value
- Always prioritise safe unwrapping techniques over force unwrapping
- Remember that all type conversions must be explicit
- Finally, use the nil-coalescing operator (`??`) to provide sensible default values and maintain a smooth user experience

## Next Steps

Continue to [Collections](./03-collections.md) →
