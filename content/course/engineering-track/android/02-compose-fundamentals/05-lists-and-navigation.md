# Lists and Navigation

> **Quick Summary:** LazyColumn efficiently displays scrolling lists. Navigation Compose handles screen navigation with type-safe arguments.

## What You'll Learn

- LazyColumn and LazyRow
- Navigation basics
- Passing arguments
- Back stack management

## LazyColumn

Efficient scrolling list:

```kotlin
@Composable
fun ItemList(items: List<Item>) {
    LazyColumn {
        items(items) { item ->
            ItemRow(item)
        }
    }
}
```

### With Keys
```kotlin
LazyColumn {
    items(items, key = { it.id }) { item ->
        ItemRow(item)
    }
}
```

### Item Types
```kotlin
LazyColumn {
    item {
        Header()  // Single item
    }
    items(users) { user ->
        UserRow(user)
    }
    item {
        Footer()
    }
}
```

## LazyRow

Horizontal scrolling:

```kotlin
LazyRow(
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    contentPadding = PaddingValues(horizontal = 16.dp)
) {
    items(items) { item ->
        ItemCard(item)
    }
}
```

## Navigation Setup

### Dependencies
```kotlin
implementation("androidx.navigation:navigation-compose:2.7.0")
```

### NavController
```kotlin
@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    
    NavHost(navController, startDestination = "home") {
        composable("home") {
            HomeScreen(
                onNavigateToDetail = { id ->
                    navController.navigate("detail/$id")
                }
            )
        }
        composable("detail/{id}") { backStackEntry ->
            val id = backStackEntry.arguments?.getString("id")
            DetailScreen(id = id)
        }
    }
}
```

### Type-Safe Navigation (Compose 2.8+)
```kotlin
@Serializable
object Home

@Serializable
data class Detail(val id: String)

NavHost(navController, startDestination = Home) {
    composable<Home> {
        HomeScreen(onNavigate = { navController.navigate(Detail(it)) })
    }
    composable<Detail> { backStackEntry ->
        val detail: Detail = backStackEntry.toRoute()
        DetailScreen(id = detail.id)
    }
}
```

## Navigation Actions

```kotlin
// Navigate
navController.navigate("detail/123")

// Pop back
navController.popBackStack()

// Pop to specific destination
navController.popBackStack("home", inclusive = false)

// Navigate and clear back stack
navController.navigate("home") {
    popUpTo("home") { inclusive = true }
}
```

## Try It Yourself

### Exercise 1: Contact List

Create a LazyColumn of contacts:
- Profile image, name, phone
- Tap navigates to detail

### Exercise 2: Navigation Flow

Build a three-screen flow:
- List → Detail → Edit
- Proper back navigation

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "compose-lists-quiz",
  "type": "multiple-choice",
  "title": "Lists and Navigation",
  "description": "Test your understanding of Compose lists.",
  "difficulty": "medium",
  "question": "Why should you use LazyColumn instead of Column for long lists?",
  "options": [
    {
      "id": "a",
      "text": "LazyColumn looks better",
      "isCorrect": false,
      "explanation": "The difference is performance, not appearance."
    },
    {
      "id": "b",
      "text": "LazyColumn only composes visible items, providing much better performance for large lists",
      "isCorrect": true,
      "explanation": "Correct! Column composes all children immediately. LazyColumn only composes items on screen, reusing composables as you scroll—essential for lists with many items."
    },
    {
      "id": "c",
      "text": "LazyColumn supports scrolling while Column doesn't",
      "isCorrect": false,
      "explanation": "Column can scroll with Modifier.verticalScroll, but it still composes everything."
    },
    {
      "id": "d",
      "text": "There's no difference for small lists",
      "isCorrect": false,
      "explanation": "For truly small lists, either works, but LazyColumn is the pattern for lists."
    }
  ]
}
-->

## Key Takeaways

- LazyColumn/LazyRow for efficient scrolling
- Use `key` for stable item identity
- NavHost defines navigation graph
- Arguments passed via route parameters
- Type-safe navigation available in newer versions

## Next Steps

Continue to [Theming](./06-theming.md) →
