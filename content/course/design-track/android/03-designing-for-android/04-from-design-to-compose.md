# From Design to Compose

> **Quick Summary:** Jetpack Compose is Android's modern UI toolkit. Understanding how designs translate to Compose helps you create more implementable work.

## What You'll Learn

- How designs map to Compose
- Compose thinking model
- Design decisions that help developers
- Preparing designs for handoff

## Compose Fundamentals

Compose builds UIs from composable functions:

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

Everything is a composable—building blocks that combine.

## Layout Translation

### Columns and Rows
| Design Concept | Compose |
|----------------|---------|
| Vertical stack | Column |
| Horizontal stack | Row |
| Overlapping | Box |
| Spacing | Arrangement.spacedBy() |
| Alignment | Alignment parameter |

### Design → Compose

```text
Design: Vertical, 16dp spacing, centred
Compose: Column(
    verticalArrangement = Arrangement.spacedBy(16.dp),
    horizontalAlignment = Alignment.CenterHorizontally
)
```

## Components → Composables

### Material Components
Most Material components have Compose equivalents:
- Button → Button, TextButton, OutlinedButton
- Card → Card, ElevatedCard, OutlinedCard
- TextField → TextField, OutlinedTextField
- List → LazyColumn with items

### Custom Components
Custom designs become custom composables:
```kotlin
@Composable
fun CustomCard(
    title: String,
    subtitle: String
) {
    Card {
        Column(Modifier.padding(16.dp)) {
            Text(title, style = MaterialTheme.typography.titleMedium)
            Text(subtitle, style = MaterialTheme.typography.bodySmall)
        }
    }
}
```

## Design Decisions That Help

### Use Material Theme Slots
Reference semantic roles:
- Typography: headline, body, label
- Colors: primary, surface, onSurface
- Shapes: small, medium, large

Maps directly to MaterialTheme in Compose.

### Consistent Spacing
Use values from a scale:
- 4, 8, 12, 16, 24, 32dp
- Developers can use consistent values

### Clear Hierarchy
Make component structure obvious:
- Groups that are Columns
- Rows within those groups
- Clear nesting

### Component Variants
If a component has variants, make them explicit:
- FilledButton, OutlinedButton
- ElevatedCard, OutlinedCard
- Naming matches code

## Responsive Design

### Weight-Based Layouts
```kotlin
Row {
    Box(Modifier.weight(1f)) { /* Flexible */ }
    Box(Modifier.width(100.dp)) { /* Fixed */ }
}
```

Indicate when elements should be flexible vs. fixed.

### Adaptive Breakpoints
Document what changes at size classes:
- Compact: Single column
- Expanded: Two columns
- What moves where

## Handoff Best Practices

### Annotate
- Spacing values (in dp)
- Typography styles (semantic names)
- Colors (semantic names)
- Component states

### Document Interactions
- All states
- Transitions
- Gestures
- Error states

### Provide Assets
- Custom icons as SVG
- Images at appropriate densities
- Custom illustrations

## Try It Yourself

### Exercise 1: Compose Mapping

Take a design and write pseudo-Compose:
- What's a Column?
- What's a Row?
- What spacing values?

### Exercise 2: Handoff Document

Prepare a screen for development:
- All spacing annotated
- States documented
- Typography named
- Colors referenced

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

- Compose builds UIs from composable functions
- Columns and Rows = stacks
- Use Material semantic tokens
- Consistent spacing helps translation
- Clear documentation speeds development

## Congratulations!

You've completed the Android Design Track!

**What's Next?**

→ [Android Engineering Track](../../engineering-track/android/01-kotlin-basics/01-introduction-to-kotlin.md) to learn Compose implementation

→ [Android Convergence Track](../../convergence/android/01-android-motion-and-animation/01-compose-animation.md) for advanced Android skills

→ Return to the [Course Overview](/course) to explore other tracks
