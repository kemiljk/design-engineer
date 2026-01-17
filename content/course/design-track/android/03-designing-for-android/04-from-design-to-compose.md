# From Design to Compose

> **Quick Summary:** Jetpack Compose is Android's modern, declarative UI toolkit. It is how modern Android apps are built. Understanding how your designs map to Compose primitives helps you create work that is developer-friendly and robust.

## What You'll Learn

- How designs map to Compose functions
- The Compose mental model (Columns, Rows, Modifiers)
- Design decisions that help developers
- Preparing designs for handoff

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
- **Column:** Vertical stack (Figma Auto Layout ↓).
- **Row:** Horizontal stack (Figma Auto Layout →).
- **Box:** Z-stack for overlapping elements (Figma Group).

### Modifiers
Modifiers are used to configure layouts.
- **Padding:** `Modifier.padding(16.dp)` adds space around an element.
- **Size:** `Modifier.size(50.dp)` sets fixed dimensions.
- **Clickable:** `Modifier.clickable { }` makes any element interactive.

## Components → Composables

### Material Components
Most of your design elements map 1:1 to the Material Compose library:
- **Button** → `Button`, `OutlinedButton`, `TextButton`
- **Card** → `Card`, `ElevatedCard`
- **Text Field** → `TextField`, `OutlinedTextField`
- **List** → `LazyColumn` (Vertical), `LazyRow` (Horizontal)

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
- **Typography:** Don't use "Inter 16px". Use `MaterialTheme.typography.bodyLarge`.
- **Colors:** Don't use `#6200EE`. Use `MaterialTheme.colorScheme.primary`.
- **Shapes:** Reference `MaterialTheme.shapes.medium`.

This allows the entire app to support Dark Mode and Dynamic Colour automatically.

### Consistent Spacing
Use an 8dp spacing scale. Developers often create spacing objects: `Spacing.medium` (16dp), `Spacing.large` (24dp). Random pixel values break this system.

### Clear Hierarchy
Structure your Figma layers to match the intended Compose structure.
- Group elements that belong in a `Row` together.
- Group vertical sections that belong in a `Column`.
- Name your layers meaningfully.

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
- **Compact:** Show a `LazyColumn`.
- **Expanded:** Show a `LazyVerticalGrid` with 2 columns.
Document this behavior: "At 600dp width, switch from List to Grid."

## Handoff Best Practices

### Annotate
- **Spacing:** "16dp padding."
- **Tokens:** "Primary Container colour."
- **Typography:** "Headline Medium."

### Document Interactions
- **State:** Show Default, Pressed, Disabled, and Error states.
- **Transitions:** "This card expands to full screen."
- **Gestures:** "Swipe to dismiss."

### Provide Assets
- **Vectors:** Export icons as XML Vector Drawables (or SVGs that can be converted).
- **Images:** Provide WebP or PNG assets at multiple densities.

## Try It Yourself

### Exercise 1: Compose Mapping
Take a music player control bar. Write the pseudo-code:
- Row (fill width, space between)
  - Image (Album art)
  - Column (Weight 1f)
    - Text (Title)
    - Text (Artist)
  - Icon (Play/Pause)

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

- **Compose** is declarative; UI is a function of state.
- Map your layouts to **Rows, Columns, and Boxes**.
- Use **Material Semantic Tokens** for colour and type.
- Design for **flexibility** using weights and adaptive layouts.
- **Annotate** thoroughly to bridge the gap between design and code.

## Congratulations!

You've completed the Android Design Track!

**What's Next?**

→ [Android Engineering Track](../../engineering-track/android/01-kotlin-basics/01-introduction-to-kotlin.md) to learn Compose implementation.
→ [Android Convergence Track](../../convergence/android/01-android-motion-and-animation/01-compose-animation.md) for advanced Android skills.
→ Return to the [Course Overview](/course) to explore other tracks.
