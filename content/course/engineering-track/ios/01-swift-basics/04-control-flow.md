# Control Flow

> **Quick Summary:** Swift provides familiar control flow structures with some powerful additions like pattern matching in switch statements.

## What You'll Learn

During this module, you will learn to implement core conditionals like `if`, `guard`, and `switch`, and explore the various loop structures including `for` and `while`. We'll examine effective early exit patterns and walk through the process of using advanced pattern matching to handle complex logic with ease.

## Conditionals

### If Statements
```swift
let score = 85

if score >= 90 {
    print("A")
} else if score >= 80 {
    print("B")
} else {
    print("C or below")
}
```

### Ternary Operator
```swift
let status = score >= 60 ? "Pass" : "Fail"
```

### Guard Statements
For early exit:
```swift
func process(value: Int?) {
    guard let value = value else {
        print("No value")
        return
    }
    // value is now unwrapped and available
    print("Processing \(value)")
}
```

### Switch Statements
Powerful pattern matching:
```swift
let grade = "B"

switch grade {
case "A":
    print("Excellent")
case "B", "C":
    print("Good")
case "D":
    print("Passing")
case "F":
    print("Failing")
default:
    print("Unknown")
}
```

**Range Matching:**
```swift
switch score {
case 90...100:
    print("A")
case 80..<90:
    print("B")
case 70..<80:
    print("C")
default:
    print("Below C")
}
```

**Where Clauses:**
```swift
let point = (2, 3)

switch point {
case let (x, y) where x == y:
    print("On diagonal")
case let (x, y) where x > y:
    print("Below diagonal")
default:
    print("Above diagonal")
}
```

## Loops

### For-In Loops
```swift
// Array iteration
for number in [1, 2, 3] {
    print(number)
}

// Range iteration
for i in 1...5 {
    print(i)  // 1, 2, 3, 4, 5
}

for i in 1..<5 {
    print(i)  // 1, 2, 3, 4
}

// Dictionary iteration
for (key, value) in ["a": 1, "b": 2] {
    print("\(key): \(value)")
}
```

### While Loops
```swift
var count = 0
while count < 5 {
    print(count)
    count += 1
}

// At least once
repeat {
    print(count)
    count += 1
} while count < 5
```

### Loop Control
```swift
for i in 1...10 {
    if i == 3 { continue }  // Skip 3
    if i == 8 { break }     // Stop at 8
    print(i)
}
```

## Pattern Matching

### Optional Pattern
```swift
let value: Int? = 5

if case let x? = value {
    print("Value is \(x)")
}
```

### Enum Pattern
```swift
enum Status {
    case loading
    case success(String)
    case error(Error)
}

let status = Status.success("Done")

switch status {
case .loading:
    print("Loading...")
case .success(let message):
    print("Success: \(message)")
case .error(let error):
    print("Error: \(error)")
}
```

## Try It Yourself

### Exercise 1: Grade Calculator

Write a function that:
Practise your conditional logic by writing a function that takes a score between 0 and 100. The function should return a corresponding letter grade using a `switch` statement and include robust handling for any invalid scores that may be passed.

### Exercise 2: FizzBuzz

Print numbers 1-100:
Implement the classic FizzBuzz problem by printing numbers from 1 to 100 with specific rules. Your code should display "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for numbers that are multiples of both.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swift-control-flow-quiz",
  "type": "multiple-choice",
  "title": "Control Flow",
  "description": "Test your understanding of Swift control flow.",
  "difficulty": "medium",
  "question": "Why must Swift switch statements be exhaustive?",
  "options": [
    {
      "id": "a",
      "text": "It's just a style preference",
      "isCorrect": false,
      "explanation": "It's a language requirement that improves safety."
    },
    {
      "id": "b",
      "text": "To ensure all possible cases are handled, preventing runtime errors from unhandled values",
      "isCorrect": true,
      "explanation": "Correct! Exhaustive switches guarantee you've considered every possibility. With enums, the compiler verifies this, catching missing cases at compile time."
    },
    {
      "id": "c",
      "text": "To make switch statements run faster",
      "isCorrect": false,
      "explanation": "Exhaustiveness is about correctness, not performance."
    },
    {
      "id": "d",
      "text": "Because Swift doesn't have a default keyword",
      "isCorrect": false,
      "explanation": "Swift does have 'default', but you're encouraged to handle all cases explicitly."
    }
  ]
}
-->

## Key Takeaways

To build reliable Swift applications, you should utilise `guard` for early exits and clean optional unwrapping, and remember that `switch` statements must be exhaustive to ensure all possibilities are handled. The `for-in` loop is your primary tool for iterating over sequences, while advanced pattern matching within switches provides a powerful way to deconstruct complex data. Finally, use ranges with the inclusive `...` or exclusive `..<` operators to define precise intervals in your logic.

## Next Steps

Continue to [Functions and Closures](./05-functions-and-closures.md) →
