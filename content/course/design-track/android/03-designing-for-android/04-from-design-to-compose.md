# From Design to Compose

> **Quick Summary:** Jetpack Compose is Android's modern, declarative UI toolkit. It is how modern Android apps are built. Understanding how your designs map to Compose primitives helps you create work that is developer-friendly and robust.

## What You'll Learn

Throughout this lesson, you will learn exactly how your design elements map to Jetpack Compose functions and explore the declarative mental model of columns, rows, and modifiers. We'll identify specific design decisions that help streamline the development process and establish best practices for preparing your files for a successful handoff.

## Compose Fundamentals

Compose builds UIs by calling functions that emit UI elements.
```kotlin
@Composable
fun Greeting() {
    Column {
        Text("Hello")
        Button(onClick = { }) {
            Text("Click me")
        }
    }
}
```
Just like SwiftUI, everything is a component (called a **Composable**). The UI is described as a tree of these functions.

## Layout Translation

### Columns and Rows
In Figma, you use Auto Layout. In Compose, we use:
In Figma, you use Auto Layout to manage distribution, which maps directly to vertical stacks (**Column**), horizontal stacks (**Row**), and overlapping Z-stacks (**Box**) in Compose.

### Modifiers
Modifiers are used to configure layouts.
Modifiers are used to configure element appearance and behaviour, such as adding **padding**, setting a fixed **size**, or making an element **clickable**.

## Components → Composables

### Material Components
Most of your design elements map 1:1 to the Material Compose library:
Standard Material components map directly to Compose functions, including **Buttons** (Button, OutlinedButton, TextButton), **Cards** (Card, ElevatedCard), **Text Fields** (TextField, OutlinedTextField), and lists (LazyColumn and LazyRow).

### Custom Components
When you design a custom card, the developer creates a custom Composable function.
```kotlin
@Composable
fun ProductCard(title: String, price: String) {
    Card {
        Column {
            Image(...)
            Text(title)
            Text(price)
        }
    }
}
```
This means your design components should be modular and reusable, just like the code will be.

## Design Decisions That Help

### Use Material Theme Slots
Compose has a built-in theming engine. Reference semantic roles in your design:
Reference semantic roles in your design rather than raw values, such as using specific **Typography** roles, **Colour** schemes, and **Shapes** defined in the Material theme.

This allows the entire app to support Dark Mode and Dynamic Colour automatically.

### Consistent Spacing
Use an 8dp spacing scale. Developers often create spacing objects: `Spacing.medium` (16dp), `Spacing.large` (24dp). Random pixel values break this system.

### Clear Hierarchy
Structure your Figma layers to match the intended Compose structure.
To ensure a logical translation to code, you should group elements that belong in a row together and organise vertical sections into clear columns, while taking care to name all layers meaningfully.

## Responsive Design

### Weight-Based Layouts
In Compose, we often use "weights" to distribute space.
```kotlin
Row {
    Box(Modifier.weight(1f)) // Takes up 50%
    Box(Modifier.weight(1f)) // Takes up 50%
}
```
Indicate in your handoff if an element should "fill available space" or has a "fixed width".

### Adaptive Breakpoints
Compose handles adaptation easily. You can check the screen size and switch layouts.
For compact widths, you might display a simple scrollable list, whereas expanded layouts can transition to a vertical grid with multiple columns.
Document this behaviour: "At 600dp width, switch from List to Grid."

## Handoff Best Practices

### Annotate
Annotations should clearly label **spacing**, **tokens** (such as Primary Container colour), and **typography** roles.

### Document Interactions
Document interaction models by showing all necessary **states**, describing **transitions** like card expansion, and specifying intended **gestures**.

### Provide Assets
Provide all necessary **vector** assets as XML or SVG files and high-density **image** assets in WebP or PNG formats.

## Try It Yourself

### Exercise 1: Compose Mapping
Take a music player control bar. Write the pseudo-code:
Take a control bar from a music player and write its pseudo-code by mapping the layout to a row that fills the width with space between its children. This should include an image for album art, a column with a flex weight of one for the title and artist text, and a final icon for the play and pause actions.

### Exercise 2: Handoff Document
Annotate a screen for a developer. Use strictly Material semantic names for all colours and fonts. Mark which elements are flexible and which are fixed.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-compose-quiz",
  "type": "multiple-choice",
  "title": "From Design to Compose",
  "description": "Test your understanding of Android design handoff.",
  "difficulty": "easy",
  "question": "What should designs include to ensure smooth handoff to Jetpack Compose development?",
  "options": [
    {
      "id": "a",
      "text": "Pixel-perfect measurements only",
      "isCorrect": false,
      "explanation": "dp units and semantic tokens are more useful than pixel measurements."
    },
    {
      "id": "b",
      "text": "Material theme tokens, component specifications, and state designs",
      "isCorrect": true,
      "explanation": "Correct! Using Material theme tokens (colours, typography, shapes) maps directly to Compose themes. Specifying components and all their states enables accurate implementation."
    },
    {
      "id": "c",
      "text": "Just screenshots of all screens",
      "isCorrect": false,
      "explanation": "Screenshots miss interactive states, specifications, and component details."
    },
    {
      "id": "d",
      "text": "Designs don't matter—Compose generates everything automatically",
      "isCorrect": false,
      "explanation": "Compose implements designs. It doesn't generate them automatically."
    }
  ]
}
-->

## Key Takeaways

Jetpack Compose is a declarative system where the UI is a direct function of state, requiring you to map your designs to fundamental primitives like rows, columns, and boxes. By consistently using Material semantic tokens for colour and typography, and designing for flexibility through adaptive layouts and weights, you can provide thorough annotations that bridge the gap between design and implementation.

## Congratulations!

You've completed the Android Design Track!

**What's Next?**

→ [Android Engineering Track](../../engineering-track/android/01-kotlin-basics/01-introduction-to-kotlin.md) to learn Compose implementation.
→ [Android Convergence Track](../../convergence/android/01-android-motion-and-animation/01-compose-animation.md) for advanced Android skills.
→ Return to the [Course Overview](/course) to explore other tracks.
