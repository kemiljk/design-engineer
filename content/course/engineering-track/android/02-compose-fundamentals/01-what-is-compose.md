# What is Compose

> **Quick Summary:** Jetpack Compose is Android's modern toolkit for building native UI. It's declarative, reactive, and fully Kotlin.

## What You'll Learn

During this module, you will learn the core concepts of declarative UI development and exactly how composable functions serve as the building blocks of your application. We'll examine the fundamental differences between Compose and the traditional View system and get you started with your first modern Android project.

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
Every composable must be annotated with `@Composable` and can only be called from other composable functions, never from regular code. To ensure optimal performance and predictability, they should also be side-effect free, simply transforming input data into visual descriptions.

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

Begin your journey by creating a simple composable that displays a personalised greeting text. You should also include a button that prints a confirmation message to Logcat when clicked to verify your understanding of basic interaction.

### Exercise 2: Preview Variations

Further explore the developer experience by creating multiple preview variations for your component. Practice viewing your design with different name inputs and across both light and dark themes to ensure visual consistency.

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

To master Jetpack Compose, you must understand that it is a declarative system where you describe "what" the UI should be rather than "how" to update it. Composable functions, identified by the `@Composable` annotation, are your primary tools, and they automatically recompose whenever their underlying state changes. This approach allows you to build entire interfaces in pure Kotlin without ever needing XML, while the integrated preview system provides immediate visual feedback.

## Next Steps

Continue to [Composables and Modifiers](./02-composables-and-modifiers.md) →
