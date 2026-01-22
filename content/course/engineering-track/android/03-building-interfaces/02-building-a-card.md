# Building a Card

> **Quick Summary:** Cards group related content. Material 3 provides Card, ElevatedCard, and OutlinedCard for different visual treatments.

## What You'll Learn

- During this module, you will learn to utilize the various Material 3 card types
- master the art of effective card composition master the art of effective card composition
- We'll examine how to create interactive cards

## Material 3 Cards

```kotlin
// Default card
Card {
    Text("Card content")
}

// Elevated with shadow
ElevatedCard {
    Text("Elevated content")
}

// Outlined with border
OutlinedCard {
    Text("Outlined content")
}
```

## Card with Content

```kotlin
@Composable
fun ContentCard(
    title: String,
    description: String,
    imageUrl: String
) {
    ElevatedCard(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column {
            AsyncImage(
                model = imageUrl,
                contentDescription = null,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(180.dp),
                contentScale = ContentScale.Crop
            )
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium
                )
                Spacer(Modifier.height(4.dp))
                Text(
                    text = description,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}
```

## Interactive Card

```kotlin
@Composable
fun ClickableCard(
    item: Item,
    onClick: () -> Unit
) {
    ElevatedCard(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(Icons.Default.Article, contentDescription = null)
            Spacer(Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(item.title, style = MaterialTheme.typography.titleMedium)
                Text(item.subtitle, style = MaterialTheme.typography.bodySmall)
            }
            Icon(Icons.Default.ChevronRight, contentDescription = null)
        }
    }
}
```

## Card with Actions

```kotlin
@Composable
fun ActionCard(
    title: String,
    content: String,
    onShare: () -> Unit,
    onFavorite: () -> Unit
) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(title, style = MaterialTheme.typography.titleMedium)
            Spacer(Modifier.height(8.dp))
            Text(content, style = MaterialTheme.typography.bodyMedium)
            Spacer(Modifier.height(16.dp))
            Row {
                TextButton(onClick = onShare) {
                    Text("Share")
                }
                TextButton(onClick = onFavorite) {
                    Text("Favorite")
                }
            }
        }
    }
}
```

## Custom Card

```kotlin
@Composable
fun CustomCard(
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit
) {
    Surface(
        modifier = modifier,
        shape = RoundedCornerShape(16.dp),
        color = MaterialTheme.colorScheme.surfaceVariant,
        tonalElevation = 2.dp
    ) {
        Box(modifier = Modifier.padding(16.dp)) {
            content()
        }
    }
}
```

## Try It Yourself

### Exercise 1: Product Card

Practise your composition skills by building a detailed product card. Your design should include a primary product image, clear price and name labels, a customer rating section, and a prominent "Add to cart" button for a complete commerce experience.

### Exercise 2: Profile Card

Further expand your capabilities by creating a profile card that features a user avatar and a short biography. You should also incorporate a row for displaying user statistics and include a direct message button to encourage interaction.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "compose-card-quiz",
  "type": "multiple-choice",
  "title": "Building a Card",
  "description": "Test your understanding of Compose cards.",
  "difficulty": "easy",
  "question": "What does Material 3's Card composable provide by default?",
  "options": [
    {
      "id": "a",
      "text": "Just a container with no styling",
      "isCorrect": false,
      "explanation": "Card comes with Material styling built in."
    },
    {
      "id": "b",
      "text": "Elevation (tonal or shadow), rounded corners, and proper surface colours",
      "isCorrect": true,
      "explanation": "Correct! Card provides Material 3 styling including tonal elevation, corner radius, and colour. Different variants (filled, outlined, elevated) are available."
    },
    {
      "id": "c",
      "text": "A fixed size container",
      "isCorrect": false,
      "explanation": "Cards size to their content by default."
    },
    {
      "id": "d",
      "text": "Only works with images",
      "isCorrect": false,
      "explanation": "Cards can contain any content."
    }
  ]
}
-->

## Key Takeaways

- use Column or Row layouts to structure your content
- use Column or Row layouts to structure your content
- Assign an `onClick` parameter to make your cards interactive

## Next Steps

Continue to [Building a List Item](./03-building-a-list-item.md) →
