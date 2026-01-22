# Layout Basics

> **Quick Summary:** Compose uses Column, Row, and Box as primary layout composables. Understanding arrangement and alignment is key.

## What You'll Learn

- How to use Column, Row, and Box layouts as the primary building blocks for your application's interface
- How to manage arrangement and alignment within these containers
- How to use weight and sizing to create sophisticated nested layouts

## Column

Arranges children vertically:

```kotlin
Column {
    Text("First")
    Text("Second")
    Text("Third")
}

// With parameters
Column(
    modifier = Modifier.fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(8.dp),
    horizontalAlignment = Alignment.CenterHorizontally
) {
    Text("Centered")
    Text("Content")
}
```

## Row

Arranges children horizontally:

```kotlin
Row {
    Text("Left")
    Text("Right")
}

Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.SpaceBetween,
    verticalAlignment = Alignment.CenterVertically
) {
    Text("Start")
    Text("End")
}
```

## Box

Stacks children (like FrameLayout):

```kotlin
Box {
    Image(painterResource(R.drawable.bg), contentDescription = null)
    Text("Overlay")
}

Box(
    modifier = Modifier.size(200.dp),
    contentAlignment = Alignment.Center
) {
    Text("Centered in Box")
}
```

### Box Alignment
```kotlin
Box(modifier = Modifier.size(200.dp)) {
    Text("TopStart", modifier = Modifier.align(Alignment.TopStart))
    Text("Center", modifier = Modifier.align(Alignment.Center))
    Text("BottomEnd", modifier = Modifier.align(Alignment.BottomEnd))
}
```

## Arrangement

### Horizontal (Row)
Arrange elements horizontally within a row using standard alignment tokens such as start, end, or centre. You can also utilize more complex spacing options like space between, space around, and space evenly, or apply a specific fixed gap between every child using the `spacedBy` function.

### Vertical (Column)
Similarly, vertical arrangements within a column can be set to the top, bottom, or centre, and you have access to the same flexible spacing choices used for horizontal rows to ensure consistent layout behaviour across your entire app.

## Spacer

Creates empty space:

```kotlin
Row {
    Text("Left")
    Spacer(modifier = Modifier.weight(1f))
    Text("Right")
}

Column {
    Text("Top")
    Spacer(modifier = Modifier.height(16.dp))
    Text("Below")
}
```

## Weight

Distribute available space:

```kotlin
Row(modifier = Modifier.fillMaxWidth()) {
    Box(modifier = Modifier.weight(1f).background(Color.Red))
    Box(modifier = Modifier.weight(2f).background(Color.Blue))
}
// Red gets 1/3, Blue gets 2/3
```

## Combining Layouts

```kotlin
Column {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Image(/* avatar */)
        Column(modifier = Modifier.weight(1f)) {
            Text("Name")
            Text("Subtitle")
        }
        IconButton(onClick = {}) {
            Icon(Icons.Default.MoreVert, contentDescription = null)
        }
    }
    Divider()
}
```

## Try It Yourself

### Exercise 1: Profile Row

Practise your layout skills by creating a profile row that features an avatar on the far left and a central column for the name and subtitle. You should also include a primary action button on the right, ensuring all elements are properly aligned and spaced.

### Exercise 2: Card Grid

Build a 2-column grid using nested Rows and Columns.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "compose-layout-quiz",
  "type": "multiple-choice",
  "title": "Layout Basics",
  "description": "Test your understanding of Compose layout.",
  "difficulty": "easy",
  "question": "What does Modifier.weight() do in a Row or Column?",
  "options": [
    {
      "id": "a",
      "text": "Sets the font weight of text inside",
      "isCorrect": false,
      "explanation": "weight() is for layout distribution, not typography."
    },
    {
      "id": "b",
      "text": "Distributes available space proportionally among siblings with weight",
      "isCorrect": true,
      "explanation": "Correct! In a Row, items with weight(1f) share remaining horizontal space equally. weight(2f) gets twice the space of weight(1f)."
    },
    {
      "id": "c",
      "text": "Sets a fixed size for the element",
      "isCorrect": false,
      "explanation": "weight() is proportional—use size() for fixed dimensions."
    },
    {
      "id": "d",
      "text": "Controls z-index stacking order",
      "isCorrect": false,
      "explanation": "weight() affects layout distribution, not stacking."
    }
  ]
}
-->

## Key Takeaways

- To build robust layouts in Compose, you must use Column for vertical orientation, Row for horizontal, and Box for stacking elements on top of one another
- Remember that arrangement controls the spacing between child elements and alignment manages their cross-axis positioning
- Leverage weights to distribute available space proportionally
- Use Spacers to create flexible gaps that adapt to different screen sizes

## Next Steps

Continue to [State Management](./04-state-management.md) →
