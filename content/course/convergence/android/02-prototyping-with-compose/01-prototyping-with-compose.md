# Prototyping with Compose

> **Quick Summary:** Compose's preview system and hot reload enable rapid prototyping. Build interactive prototypes that feel like real apps.

## What You'll Learn

- Preview-driven prototyping techniques
- Using interactive previews to test logic without deploying
- How to achieve rapid iteration loops
- Effective methods for sharing prototypes with stakeholders

## Preview System

```kotlin
@Preview(showBackground = true)
@Composable
fun CardPreview() {
    MyAppTheme {
        ItemCard(item = Item.preview)
    }
}

@Preview(showBackground = true, uiMode = UI_MODE_NIGHT_YES)
@Composable
fun CardDarkPreview() {
    MyAppTheme {
        ItemCard(item = Item.preview)
    }
}
```

### Preview Parameters
```kotlin
@Preview(
    name = "Phone",
    device = Devices.PHONE
)
@Preview(
    name = "Tablet",
    device = Devices.TABLET
)
@Composable
fun ResponsivePreview() {
    LayoutPreview()
}
```

## Interactive Previews

```kotlin
@Preview
@Composable
fun InteractiveCardPreview() {
    var expanded by remember { mutableStateOf(false) }
    
    MyAppTheme {
        ExpandableCard(
            expanded = expanded,
            onExpandChange = { expanded = it }
        )
    }
}
```

Run with "Interactive Mode" in Android Studio.

## Preview Data

```kotlin
// Preview data class
object PreviewData {
    val user = User(
        id = "1",
        name = "Jane Doe",
        email = "jane@example.com",
        avatarUrl = "https://picsum.photos/100"
    )
    
    val items = listOf(
        Item(1, "First item", "Description"),
        Item(2, "Second item", "Description"),
        Item(3, "Third item", "Description")
    )
}

@Preview
@Composable
fun UserListPreview() {
    UserList(users = PreviewData.users)
}
```

## State Variations

```kotlin
@Preview(name = "Loading")
@Composable
fun LoadingPreview() {
    FeedScreen(state = FeedState.Loading)
}

@Preview(name = "Empty")
@Composable
fun EmptyPreview() {
    FeedScreen(state = FeedState.Empty)
}

@Preview(name = "Error")
@Composable
fun ErrorPreview() {
    FeedScreen(state = FeedState.Error("Network error"))
}

@Preview(name = "Success")
@Composable
fun SuccessPreview() {
    FeedScreen(state = FeedState.Success(PreviewData.items))
}
```

## Gesture Prototypes

```kotlin
@Composable
fun SwipeableCardPrototype() {
    var offset by remember { mutableStateOf(0f) }
    var dismissed by remember { mutableStateOf(false) }
    
    if (!dismissed) {
        Card(
            modifier = Modifier
                .offset { IntOffset(offset.roundToInt(), 0) }
                .pointerInput(Unit) {
                    detectHorizontalDragGestures(
                        onDragEnd = {
                            if (abs(offset) > 200) {
                                dismissed = true
                            } else {
                                offset = 0f
                            }
                        },
                        onHorizontalDrag = { _, dragAmount ->
                            offset += dragAmount
                        }
                    )
                }
        ) {
            ItemContent()
        }
    }
}
```

## Sharing Prototypes

### APK Build
1. Build debug APK
2. Share directly or via Firebase App Distribution

### Android Studio Preview
Share preview screenshots for quick feedback.

### Screen Recording
Use Logcat → Device Explorer for video capture.

## Try It Yourself

### Exercise 1: Multi-State Preview
Create a comprehensive set of previews for a form component. You should include an **empty state** (initial load), a **filled state** with sample data, an **error state** showing validation messages, and a **submitting state** with a disabled UI and loading indicator.

### Exercise 2: Gesture Prototype
Build a prototype of a swipeable card. Implement a drag gesture that reveals actions behind the card, with logic to **snap back** if the threshold isn't met or **complete the action** if it is. Ensure there is clear visual feedback throughout the interaction.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "compose-prototyping-quiz",
  "type": "multiple-choice",
  "title": "Prototyping with Compose",
  "description": "Test your understanding of Compose prototyping.",
  "difficulty": "easy",
  "question": "What's the advantage of prototyping in Compose vs design tools?",
  "options": [
    {
      "id": "a",
      "text": "Compose prototypes look better",
      "isCorrect": false,
      "explanation": "Visual quality can be similar. The advantage is elsewhere."
    },
    {
      "id": "b",
      "text": "Real gestures, physics, and actual device behaviour that design tools can't fully replicate",
      "isCorrect": true,
      "explanation": "Correct! Compose prototypes run on real devices with actual touch, scroll physics, and Material motion. You can test with real data, network calls, and sensors."
    },
    {
      "id": "c",
      "text": "It's faster to create than in Figma",
      "isCorrect": false,
      "explanation": "Design tools may be faster for visuals—code excels at interaction fidelity."
    },
    {
      "id": "d",
      "text": "Non-developers can use Compose prototypes",
      "isCorrect": false,
      "explanation": "Compose requires Kotlin knowledge—design tools are more accessible."
    }
  ]
}
-->

## Key Takeaways
Compose **Previews** are your primary tool for rapid iteration—use them liberally. Enable **Interactive Mode** to test gestures and state logic instantly. Maintain a `PreviewData` object to keep your example data consistent across the project. Always visualize all possible states (loading, error, empty) in your previews to catch edge cases early. For final verification, share **APKs** to test the "feel" on a real device.

## Next Steps

Continue to [Android Accessibility](../03-accessibility-and-polish/01-android-accessibility.md) →
