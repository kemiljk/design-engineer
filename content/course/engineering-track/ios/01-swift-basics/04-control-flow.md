# Control Flow

> **Quick Summary:** Swift provides familiar control flow structures with some powerful additions like pattern matching in switch statements.

## What You'll Learn

- Conditionals (if, guard, switch)
- Loops (for, while)
- Early exit patterns
- Pattern matching

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
- Takes a score (0-100)
- Returns a letter grade using switch
- Handles invalid scores

### Exercise 2: FizzBuzz

Print numbers 1-100:
- "Fizz" for multiples of 3
- "Buzz" for multiples of 5
- "FizzBuzz" for both

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
      "explanation": "Swift does have 'default'—but you're encouraged to handle all cases explicitly."
    }
  ]
}
-->

## Key Takeaways

- Guard is great for early exit with unwrapping
- Switch is exhaustive and supports patterns
- For-in works with any Sequence
- Pattern matching is powerful in switch
- Use ranges with `...` (inclusive) or `..<` (exclusive)

## Next Steps

Continue to [Functions and Closures](./05-functions-and-closures.md) →
