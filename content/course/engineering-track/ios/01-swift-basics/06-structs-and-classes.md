# Structs and Classes

> **Quick Summary:** Swift uses structs and classes to model data. Structs are value types (preferred); classes are reference types. Knowing when to use each is important.

## What You'll Learn

During this module, you will learn the fundamental differences between structs and classes and examine how to implement properties and methods within these structures. We'll explore the critical concepts of value versus reference semantics and provide clear guidance on when to choose each approach in your own projects.

## Structs

Value types—copied when assigned:

```swift
struct Point {
    var x: Double
    var y: Double
}

var point1 = Point(x: 0, y: 0)
var point2 = point1  // Copy!

point2.x = 10
print(point1.x)  // Still 0
```

### Properties
```swift
struct Rectangle {
    // Stored properties
    var width: Double
    var height: Double
    
    // Computed property
    var area: Double {
        width * height
    }
    
    // Property with getter/setter
    var perimeter: Double {
        get { 2 * (width + height) }
        set { width = newValue / 4; height = newValue / 4 }
    }
}
```

### Methods
```swift
struct Counter {
    var count = 0
    
    // Mutating method (modifies self)
    mutating func increment() {
        count += 1
    }
    
    func description() -> String {
        "Count: \(count)"
    }
}
```

### Initializers
```swift
struct Person {
    var name: String
    var age: Int
    
    // Memberwise initializer is automatic
    // Person(name: "John", age: 30)
    
    // Custom initializer
    init(name: String) {
        self.name = name
        self.age = 0
    }
}
```

## Classes

Reference types—shared when assigned:

```swift
class Person {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}

let person1 = Person(name: "John", age: 30)
let person2 = person1  // Same instance!

person2.name = "Jane"
print(person1.name)  // "Jane" - changed!
```

### Inheritance
```swift
class Animal {
    var name: String
    
    init(name: String) {
        self.name = name
    }
    
    func speak() {
        print("...")
    }
}

class Dog: Animal {
    override func speak() {
        print("Woof!")
    }
}
```

## Struct vs Class

### Use Structs When
You should prioritise structs when representing simple data structures where independent copy semantics make sense and there is no requirement for inheritance. Structs are also the preferred choice when thread safety is a primary concern, as value types inherently avoid shared mutable state.

### Use Classes When
Conversely, classes are necessary when you require inheritance or reference semantics to share a single instance across multiple parts of your application. They are also mandatory for Objective-C interoperability or when the unique identity of an instance is more important than its underlying data.

### Swift Preference
**Prefer structs by default.** Most Swift standard library types are structs: Int, String, Array, Dictionary.

## Common Patterns

### Struct for Model Data
```swift
struct User {
    let id: UUID
    var name: String
    var email: String
}
```

### Class for Shared State
```swift
class UserSession {
    static let shared = UserSession()
    var currentUser: User?
    
    private init() {}
}
```

## Try It Yourself

### Exercise 1: Model a Card

Create a struct for a playing card:
Practise your modeling skills by creating a struct for a playing card that includes enums for both suit and rank. You should also implement a computed property that generates a clear, human-readable description of the card.

### Exercise 2: Value vs Reference

Create examples demonstrating:
Create practical code examples that demonstrate the distinct differences between struct copy behaviour and class reference behaviour to solidify your understanding of these two fundamental types.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swift-structs-quiz",
  "type": "multiple-choice",
  "title": "Structs and Classes",
  "description": "Test your understanding of value vs reference types.",
  "difficulty": "medium",
  "question": "Why does Swift prefer structs over classes for most data types?",
  "options": [
    {
      "id": "a",
      "text": "Structs are always faster than classes",
      "isCorrect": false,
      "explanation": "Performance depends on usage. The main benefit is simpler reasoning."
    },
    {
      "id": "b",
      "text": "Structs are value types—copies are independent, preventing shared mutable state bugs",
      "isCorrect": true,
      "explanation": "Correct! When you pass a struct, you get an independent copy. This eliminates bugs from unexpected mutations through shared references—a common source of errors in class-heavy code."
    },
    {
      "id": "c",
      "text": "Classes can't have methods",
      "isCorrect": false,
      "explanation": "Both structs and classes can have methods."
    },
    {
      "id": "d",
      "text": "Structs automatically persist to disk",
      "isCorrect": false,
      "explanation": "Persistence is separate from the struct/class choice."
    }
  ]
}
-->

## Key Takeaways

To build a scalable Swift codebase, you must understand that structs are value types that create independent copies, while classes are reference types that share instances. Prefer structs for the majority of your data modelling and use the `mutating` keyword for any struct methods that modify their own properties. Finally, remember that while classes support inheritance, structs prioritising safety and simplicity—remain the idiomatic choice for most Swift development.

## Congratulations!

You've completed the Swift Basics module!

Continue to [SwiftUI Fundamentals: What is SwiftUI](../02-swiftui-fundamentals/01-what-is-swiftui.md) →
