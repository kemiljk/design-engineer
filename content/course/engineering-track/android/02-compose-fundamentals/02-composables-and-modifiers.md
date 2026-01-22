# Composables and Modifiers

> **Quick Summary:** Modifiers decorate composables with layout, behaviour, and appearance changes. They chain together and order matters.

## What You'll Learn

- During this module, you will learn exactly how modifiers work
- explore a wide variety of common modifiers used for layout
- explore a wide variety of common modifiers used for layout and appearance
- We'll examine why modifier order is so significant
- learn how to create your own custom modifiers for reusable styling patterns
- learn how to create your own custom modifiers for reusable styling patterns

## How Modifiers Work

Modifiers transform composables:

```kotlin
Text(
    text = "Styled Text",
    modifier = Modifier
        .padding(16.dp)
        .background(Color.Blue)
)
```

Each modifier wraps the previous result.

## Common Modifiers

### Size and Layout
```kotlin
Modifier
    .size(100.dp)               // Fixed size
    .width(200.dp)              // Fixed width
    .height(50.dp)              // Fixed height
    .fillMaxWidth()             // Fill available width
    .fillMaxHeight()            // Fill available height
    .fillMaxSize()              // Fill both
    .wrapContentSize()          // Wrap content
```

### Padding
```kotlin
Modifier
    .padding(16.dp)                     // All sides
    .padding(horizontal = 16.dp)        // Left and right
    .padding(vertical = 8.dp)           // Top and bottom
    .padding(start = 8.dp, end = 16.dp) // Specific sides
```

### Background and Border
```kotlin
Modifier
    .background(Color.Blue)
    .background(Color.Blue, RoundedCornerShape(8.dp))
    .border(1.dp, Color.Gray, RoundedCornerShape(8.dp))
```

### Clip
```kotlin
Modifier
    .clip(RoundedCornerShape(8.dp))
    .clip(CircleShape)
```

### Click
```kotlin
Modifier
    .clickable { onClick() }
    .clickable(
        interactionSource = remember { MutableInteractionSource() },
        indication = null  // No ripple
    ) { onClick() }
```

## Modifier Order Matters

```kotlin
// Blue background, then padding (padding is transparent)
Text(
    "A",
    modifier = Modifier
        .background(Color.Blue)
        .padding(16.dp)
)

// Padding, then blue background (blue includes padding)
Text(
    "B",
    modifier = Modifier
        .padding(16.dp)
        .background(Color.Blue)
)
```

Order determines which modification happens first.

## Chaining Modifiers

```kotlin
Modifier
    .padding(16.dp)
    .fillMaxWidth()
    .background(Color.White, RoundedCornerShape(12.dp))
    .shadow(4.dp, RoundedCornerShape(12.dp))
    .clickable { }
```

## Passing Modifiers

```kotlin
@Composable
fun Card(
    modifier: Modifier = Modifier,  // Accept modifier
    content: @Composable () -> Unit
) {
    Box(
        modifier = modifier  // Apply passed modifier
            .background(Color.White)
            .padding(16.dp)
    ) {
        content()
    }
}

// Usage
Card(modifier = Modifier.fillMaxWidth()) {
    Text("Content")
}
```

## Custom Modifiers

```kotlin
fun Modifier.card() = this
    .fillMaxWidth()
    .background(Color.White, RoundedCornerShape(12.dp))
    .padding(16.dp)

// Usage
Box(modifier = Modifier.card()) {
    Text("Card content")
}
```

## Try It Yourself

### Exercise 1: Styled Box

Practice your layout skills by creating a styled box that incorporates a fixed size, rounded corners, and a subtle shadow. You should also include specific padding tokens to ensure the interior content is properly spaced within the container.

### Exercise 2: Custom Modifier

Further expand your capabilities by creating a custom `badge()` modifier that facilitates consistent styling across your app. Your modifier should apply a pill-shaped background while managing both horizontal and small vertical padding to create a professional look.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "compose-modifiers-quiz",
  "type": "multiple-choice",
  "title": "Composables and Modifiers",
  "description": "Test your understanding of Compose modifiers.",
  "difficulty": "medium",
  "question": "Why does modifier order matter in Jetpack Compose?",
  "options": [
    {
      "id": "a",
      "text": "It doesn't—Compose optimises the order automatically",
      "isCorrect": false,
      "explanation": "Order definitely matters and affects the visual result."
    },
    {
      "id": "b",
      "text": "Modifiers are applied sequentially—earlier modifiers wrap later ones, affecting layout and appearance",
      "isCorrect": true,
      "explanation": "Correct! Modifier.padding(16.dp).background(Color.Red) pads then colours (background includes padding). Modifier.background(Color.Red).padding(16.dp) colours then pads (background doesn't extend into padding)."
    },
    {
      "id": "c",
      "text": "Only clickable modifiers are order-dependent",
      "isCorrect": false,
      "explanation": "All modifiers are order-dependent—padding, background, size, etc."
    },
    {
      "id": "d",
      "text": "Order only affects animation",
      "isCorrect": false,
      "explanation": "Order affects all aspects of layout and rendering."
    }
  ]
}
-->

## Key Takeaways

- appearance appearance
- Order remains critical to the final visual output
- Finally, leverage custom modifiers to encapsulate repeating styles
- maintain a clean, reusable codebase maintain a clean, reusable codebase

## Next Steps

Continue to [Layout Basics](./03-layout-basics.md) →
