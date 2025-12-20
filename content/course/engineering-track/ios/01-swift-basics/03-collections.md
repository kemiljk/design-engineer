# Collections

> **Quick Summary:** Swift provides Arrays, Dictionaries, and Sets for storing collections of values. Each has specific use cases and behaviors.

## What You'll Learn

- Arrays for ordered collections
- Dictionaries for key-value pairs
- Sets for unique values
- Common operations

## Arrays

Ordered collections of same-type elements:

### Creating Arrays
```swift
var numbers = [1, 2, 3, 4, 5]
var names: [String] = []
var scores = [Int]()
```

### Accessing Elements
```swift
let first = numbers[0]      // 1
let last = numbers[numbers.count - 1]  // 5

// Safe access
if let value = numbers.first {
    print(value)
}
```

### Modifying Arrays
```swift
numbers.append(6)           // Add to end
numbers.insert(0, at: 0)    // Insert at index
numbers.remove(at: 0)       // Remove at index
numbers.removeLast()        // Remove last
```

### Array Operations
```swift
let count = numbers.count
let isEmpty = numbers.isEmpty
let contains = numbers.contains(3)  // true

let doubled = numbers.map { $0 * 2 }
let evens = numbers.filter { $0 % 2 == 0 }
let sum = numbers.reduce(0, +)
```

## Dictionaries

Key-value pairs:

### Creating Dictionaries
```swift
var user = ["name": "John", "email": "john@example.com"]
var scores: [String: Int] = [:]
var ages = [String: Int]()
```

### Accessing Values
```swift
let name = user["name"]  // Optional String

if let email = user["email"] {
    print(email)
}

// Default value
let role = user["role", default: "User"]
```

### Modifying Dictionaries
```swift
user["phone"] = "555-1234"     // Add/update
user["email"] = nil            // Remove
user.removeValue(forKey: "phone")
```

### Iterating
```swift
for (key, value) in user {
    print("\(key): \(value)")
}

let keys = Array(user.keys)
let values = Array(user.values)
```

## Sets

Unordered collections of unique values:

### Creating Sets
```swift
var tags: Set<String> = ["swift", "ios", "mobile"]
let numbers: Set = [1, 2, 3, 3, 3]  // [1, 2, 3]
```

### Set Operations
```swift
tags.insert("apple")
tags.remove("mobile")
let contains = tags.contains("swift")

// Set math
let a: Set = [1, 2, 3]
let b: Set = [2, 3, 4]

let union = a.union(b)          // [1, 2, 3, 4]
let intersection = a.intersection(b)  // [2, 3]
let difference = a.subtracting(b)     // [1]
```

## Choosing Collections

| Need | Use |
|------|-----|
| Ordered list | Array |
| Key-value lookup | Dictionary |
| Unique values | Set |
| Fast membership check | Set |

## Try It Yourself

### Exercise 1: Array Manipulation

Create an array of numbers and:
- Add numbers to both ends
- Filter for even numbers
- Calculate the average

### Exercise 2: Dictionary

Create a contacts dictionary:
- Add several contacts
- Look up a contact safely
- List all names

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swift-collections-quiz",
  "type": "multiple-choice",
  "title": "Swift Collections",
  "description": "Test your understanding of Swift collection types.",
  "difficulty": "easy",
  "question": "When should you use a Set instead of an Array in Swift?",
  "options": [
    {
      "id": "a",
      "text": "When you need to access items by index",
      "isCorrect": false,
      "explanation": "Sets don't have index access—use Array for that."
    },
    {
      "id": "b",
      "text": "When you need unique values and fast membership testing",
      "isCorrect": true,
      "explanation": "Correct! Sets guarantee uniqueness and provide O(1) contains() checks. Use Set when order doesn't matter and you need to avoid duplicates or quickly check membership."
    },
    {
      "id": "c",
      "text": "When the order of items matters",
      "isCorrect": false,
      "explanation": "Sets are unordered—use Array when order matters."
    },
    {
      "id": "d",
      "text": "When you need key-value pairs",
      "isCorrect": false,
      "explanation": "That's Dictionary, not Set."
    }
  ]
}
-->

## Key Takeaways

- Arrays: Ordered, indexed, allow duplicates
- Dictionaries: Key-value pairs, fast lookup
- Sets: Unique values, unordered, set operations
- All collections are generic (typed)
- Dictionary values are optionals

## Next Steps

Continue to [Control Flow](./04-control-flow.md) →
