# What is Compose

> **Quick Summary:** Jetpack Compose is Android's modern toolkit for building native UI. It's declarative, reactive, and fully Kotlin.

## What You'll Learn

- Declarative UI concepts
- Composable functions
- Compose vs Views
- Getting started

## Declarative UI

### Imperative (XML + Views)
Tell the system how to update:
```kotlin
// Find view, update it
textView.text = "Hello"
button.setOnClickListener { }
```

### Declarative (Compose)
Describe what you want:
```kotlin
@Composable
fun Greeting() {
    Text("Hello")
    Button(onClick = { }) {
        Text("Click")
    }
}
```

Compose handles the updates.

## Composable Functions

```kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Hello, $name!")
}
```

### Rules of Composables
- Annotated with `@Composable`
- Can call other composables
- Can't be called from regular functions
- Should be side-effect free

## Recomposition

When state changes, Compose re-runs composables:

```kotlin
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    
    Column {
        Text("Count: $count")
        Button(onClick = { count++ }) {
            Text("Add")
        }
    }
}
```

Only affected composables recompose.

## Compose vs Views

| Views (XML) | Compose |
|-------------|---------|
| XML + Kotlin | Pure Kotlin |
| Imperative | Declarative |
| Mutable views | Immutable descriptions |
| findViewById | Direct references |
| Complex lifecycle | Simpler model |

## Basic Setup

### build.gradle
```kotlin
android {
    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.activity:activity-compose")
}
```

### Activity
```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyAppTheme {
                Surface {
                    Greeting("Android")
                }
            }
        }
    }
}
```

## Preview

```kotlin
@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    Greeting("Compose")
}
```

## Try It Yourself

### Exercise 1: First Composable

Create a composable that shows:
- A greeting text
- A button that prints to logcat

### Exercise 2: Preview Variations

Create previews for:
- Different names
- Light and dark themes

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "compose-intro-quiz",
  "type": "multiple-choice",
  "title": "What is Jetpack Compose",
  "description": "Test your understanding of Compose fundamentals.",
  "difficulty": "easy",
  "question": "What makes Jetpack Compose different from the traditional View system?",
  "options": [
    {
      "id": "a",
      "text": "Compose uses XML layouts while Views use Kotlin",
      "isCorrect": false,
      "explanation": "It's the opposite—Compose uses Kotlin, Views used XML."
    },
    {
      "id": "b",
      "text": "Compose is declarative. You describe UI based on state, and it automatically updates when state changes",
      "isCorrect": true,
      "explanation": "Correct! In Compose, you declare what the UI should look like for a given state. When state changes, Compose automatically recomposes (re-renders) affected UI."
    },
    {
      "id": "c",
      "text": "Compose only works on newer Android versions",
      "isCorrect": false,
      "explanation": "Compose supports API 21+ through Jetpack compatibility."
    },
    {
      "id": "d",
      "text": "Compose is slower because it redraws everything",
      "isCorrect": false,
      "explanation": "Compose is optimised. It only recomposes changed parts."
    }
  ]
}
-->

## Key Takeaways

- Compose is declarative: describe what, not how
- Composables are functions annotated with @Composable
- State changes trigger recomposition
- Preview lets you see UI in Android Studio
- Pure Kotlin, no XML needed

## Next Steps

Continue to [Composables and Modifiers](./02-composables-and-modifiers.md) →
