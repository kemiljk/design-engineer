# Theming

> **Quick Summary:** Material 3 theming in Compose provides color schemes, typography, and shapes that adapt to light/dark mode and dynamic color.

## What You'll Learn

- Material 3 theming
- Color schemes
- Typography
- Dynamic color

## MaterialTheme

```kotlin
@Composable
fun MyAppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme,
        typography = Typography,
        shapes = Shapes,
        content = content
    )
}
```

## Color Schemes

### Define Colors
```kotlin
private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF6200EE),
    onPrimary = Color.White,
    secondary = Color(0xFF03DAC6),
    background = Color(0xFFFFFBFE),
    surface = Color(0xFFFFFBFE),
    onBackground = Color(0xFF1C1B1F),
    onSurface = Color(0xFF1C1B1F)
)

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFFD0BCFF),
    onPrimary = Color(0xFF381E72),
    // ... other colors
)
```

### Using Theme Colors
```kotlin
Text(
    text = "Primary",
    color = MaterialTheme.colorScheme.primary
)

Surface(
    color = MaterialTheme.colorScheme.surface
) { }
```

## Typography

```kotlin
val Typography = Typography(
    displayLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 57.sp,
        lineHeight = 64.sp
    ),
    headlineMedium = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 28.sp,
        lineHeight = 36.sp
    ),
    bodyLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 24.sp
    )
)
```

### Using Typography
```kotlin
Text(
    text = "Headline",
    style = MaterialTheme.typography.headlineMedium
)
```

## Dynamic Color

Android 12+ wallpaper-based colors:

```kotlin
@Composable
fun MyAppTheme(
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (isSystemInDarkTheme()) {
                dynamicDarkColorScheme(context)
            } else {
                dynamicLightColorScheme(context)
            }
        }
        isSystemInDarkTheme() -> DarkColorScheme
        else -> LightColorScheme
    }
    
    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}
```

## Custom Theme Values

```kotlin
// Define custom properties
data class CustomColors(
    val success: Color,
    val warning: Color
)

val LocalCustomColors = staticCompositionLocalOf {
    CustomColors(Color.Green, Color.Yellow)
}

// Provide in theme
CompositionLocalProvider(
    LocalCustomColors provides CustomColors(
        success = Color(0xFF4CAF50),
        warning = Color(0xFFFF9800)
    )
) {
    content()
}

// Use
val customColors = LocalCustomColors.current
Text(color = customColors.success)
```

## Try It Yourself

### Exercise 1: Custom Theme

Create a theme with:
- Brand primary color
- Light and dark variants
- Custom typography

### Exercise 2: Theme Switcher

Build a toggle that switches between:
- Light mode
- Dark mode
- System default

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "compose-theming-quiz",
  "type": "multiple-choice",
  "title": "Theming in Compose",
  "description": "Test your understanding of Compose theming.",
  "difficulty": "easy",
  "question": "How do you access theme colors in a composable?",
  "options": [
    {
      "id": "a",
      "text": "Import colors directly from a colors file",
      "isCorrect": false,
      "explanation": "Direct imports bypass theming and won't adapt to dark mode."
    },
    {
      "id": "b",
      "text": "Use MaterialTheme.colorScheme.primary (or other semantic colors)",
      "isCorrect": true,
      "explanation": "Correct! MaterialTheme provides the current theme's colors, typography, and shapes. Using theme values ensures proper dark mode support and consistency."
    },
    {
      "id": "c",
      "text": "Hard-code hex values for consistency",
      "isCorrect": false,
      "explanation": "Hard-coded values don't adapt to themes or dark mode."
    },
    {
      "id": "d",
      "text": "Theming isn't supported in Compose",
      "isCorrect": false,
      "explanation": "Compose has robust theming through MaterialTheme."
    }
  ]
}
-->

## Key Takeaways

- MaterialTheme provides colors, typography, shapes
- ColorScheme for light/dark mode colors
- Dynamic color uses wallpaper (Android 12+)
- Access theme via `MaterialTheme.colorScheme`
- CompositionLocal for custom theme values

## Congratulations!

You've completed the Compose Fundamentals module!

Continue to [Building Interfaces: Building a Button](../03-building-interfaces/01-building-a-button.md) →
