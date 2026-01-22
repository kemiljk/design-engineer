# Functions and Closures

> **Quick Summary:** Functions are first-class citizens in Swift. Closures are self-contained blocks of functionality that can be passed around.

## What You'll Learn

- Function syntax, including the use of parameter labels
- How to implement robust return values
- Closures and trailing closure syntax in detail
- How to apply higher-order functions to write more concise and powerful Swift code

## Functions

### Basic Functions
```swift
func greet() {
    print("Hello!")
}

func greet(name: String) {
    print("Hello, \(name)!")
}

greet()           // Hello!
greet(name: "Swift")  // Hello, Swift!
```

### Return Values
```swift
func add(a: Int, b: Int) -> Int {
    return a + b
}

// Single expression (implicit return)
func multiply(a: Int, b: Int) -> Int {
    a * b
}

let sum = add(a: 5, b: 3)  // 8
```

### Parameter Labels
```swift
func greet(person name: String) {
    print("Hello, \(name)")
}
greet(person: "World")  // External: person, Internal: name

func move(to destination: String) {
    print("Moving to \(destination)")
}
move(to: "Home")

// Omit external label
func greet(_ name: String) {
    print("Hello, \(name)")
}
greet("Swift")  // No label needed
```

### Default Parameters
```swift
func greet(name: String = "World") {
    print("Hello, \(name)")
}

greet()           // Hello, World
greet(name: "Swift")  // Hello, Swift
```

### Multiple Returns (Tuples)
```swift
func minMax(array: [Int]) -> (min: Int, max: Int)? {
    guard let min = array.min(),
          let max = array.max() else {
        return nil
    }
    return (min, max)
}

if let result = minMax(array: [1, 5, 3]) {
    print("Min: \(result.min), Max: \(result.max)")
}
```

## Closures

Anonymous functions:

### Basic Closure
```swift
let greet = { (name: String) -> String in
    return "Hello, \(name)"
}

print(greet("Swift"))  // Hello, Swift
```

### Closure as Parameter
```swift
func performOperation(a: Int, b: Int, operation: (Int, Int) -> Int) -> Int {
    return operation(a, b)
}

let result = performOperation(a: 5, b: 3) { $0 + $1 }
// result = 8
```

### Trailing Closure Syntax
When closure is last parameter:
```swift
// Full syntax
numbers.map({ (n: Int) -> Int in
    return n * 2
})

// Shortened
numbers.map { n in n * 2 }

// Shorthand argument names
numbers.map { $0 * 2 }
```

## Higher-Order Functions

Functions that take or return functions:

### Map
Transform each element:
```swift
let numbers = [1, 2, 3, 4, 5]
let doubled = numbers.map { $0 * 2 }  // [2, 4, 6, 8, 10]
```

### Filter
Keep matching elements:
```swift
let evens = numbers.filter { $0 % 2 == 0 }  // [2, 4]
```

### Reduce
Combine into single value:
```swift
let sum = numbers.reduce(0) { $0 + $1 }  // 15
let sum2 = numbers.reduce(0, +)  // Same thing
```

### CompactMap
Transform and remove nils:
```swift
let strings = ["1", "2", "three", "4"]
let numbers = strings.compactMap { Int($0) }  // [1, 2, 4]
```

## Try It Yourself

### Exercise 1: Function Practice

Write a function that:
Practise your functional programming skills by writing a function that accepts an array of integers. Your implementation should filter for even numbers and then use the `reduce` function to calculate and return their total sum.

### Exercise 2: Closure Sorting

Sort an array of names:
Sort an array of names first by their length, placing the shortest names at the beginning of the collection. For names of equal length, apply a second sorting pass to arrange them alphabetically.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swift-closures-quiz",
  "type": "multiple-choice",
  "title": "Functions and Closures",
  "description": "Test your understanding of Swift closures.",
  "difficulty": "medium",
  "question": "What does '@escaping' mean for a closure parameter?",
  "options": [
    {
      "id": "a",
      "text": "The closure can't access variables from its enclosing scope",
      "isCorrect": false,
      "explanation": "Escaping closures can still capture variables—that's often why they need to escape."
    },
    {
      "id": "b",
      "text": "The closure may be called after the function returns, requiring special memory handling",
      "isCorrect": true,
      "explanation": "Correct! @escaping indicates the closure outlives the function call (stored for later, passed to async code). Swift needs to know this to handle memory correctly."
    },
    {
      "id": "c",
      "text": "The closure will be called on a background thread",
      "isCorrect": false,
      "explanation": "@escaping doesn't specify threading, just that it survives the function."
    },
    {
      "id": "d",
      "text": "The closure can throw errors",
      "isCorrect": false,
      "explanation": "That's 'throws'—different from @escaping."
    }
  ]
}
-->

## Key Takeaways

- Closures serve as powerful anonymous functions that can be passed around and stored
- Become comfortable using shorthand argument names like `$0` and `$1` to keep your closures concise and expressive

## Next Steps

Continue to [Structs and Classes](./06-structs-and-classes.md) →
