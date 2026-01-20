# Theming

> **Quick Summary:** Material 3 theming in Compose provides colour schemes, typography, and shapes that adapt to light/dark mode and dynamic colour.

## What You'll Learn

During this module, you will learn to implement Material 3 theming within your Compose applications, covering essential colour schemes and typography. We'll examine exactly how to integrate dynamic colour for Android 12 and above, ensuring your interface remains consistent and visually appealing across different system settings.

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
    // ... other colours
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

Android 12+ wallpaper-based colours:

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

## Material 3 Expressive Features

Material 3 Expressive introduces enhanced theming capabilities for more dynamic, emotional interfaces.

### Expressive Shapes

Define shapes that can morph during interactions:

```kotlin
val Shapes = Shapes(
    // Smaller radius for buttons
    small = RoundedCornerShape(8.dp),
    // Medium for cards
    medium = RoundedCornerShape(16.dp),
    // Larger for sheets and dialogs
    large = RoundedCornerShape(24.dp),
    // Extra large for containers
    extraLarge = RoundedCornerShape(32.dp)
)
```

### Animated Shape Changes

```kotlin
val cornerRadius by animateDpAsState(
    targetValue = if (isPressed) 8.dp else 24.dp,
    animationSpec = spring(
        dampingRatio = Spring.DampingRatioMediumBouncy,
        stiffness = Spring.StiffnessLow
    )
)

Surface(
    shape = RoundedCornerShape(cornerRadius),
    // ...
) { }
```

### Spring-Based Motion

M3 Expressive favours bouncy, spring-based animations:

```kotlin
val scale by animateFloatAsState(
    targetValue = if (isPressed) 0.95f else 1f,
    animationSpec = spring(
        dampingRatio = Spring.DampingRatioMediumBouncy,
        stiffness = Spring.StiffnessMedium
    )
)
```

These expressive patterns create interfaces that feel more dynamic and engaging whilst maintaining usability.

## Try It Yourself

### Exercise 1: Custom Theme

Practise your brand styling by creating a custom theme that incorporates your specific primary colour alongside distinct variants for light and dark modes. You should also define custom typography settings to ensure your application maintains a unique and professional visual identity.

### Exercise 2: Theme Switcher

Further enhance the user experience by building a theme switcher toggle. This component should allow users to manually cycle between light and dark modes or choose to follow the system's default setting for ultimate flexibility.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "compose-theming-quiz",
  "type": "multiple-choice",
  "title": "Theming in Compose",
  "description": "Test your understanding of Compose theming.",
  "difficulty": "easy",
  "question": "How do you access theme colours in a composable?",
  "options": [
    {
      "id": "a",
      "text": "Import colours directly from a colours file",
      "isCorrect": false,
      "explanation": "Direct imports bypass theming and won't adapt to dark mode."
    },
    {
      "id": "b",
      "text": "Use MaterialTheme.colorScheme.primary (or other semantic colours)",
      "isCorrect": true,
      "explanation": "Correct! MaterialTheme provides the current theme's colours, typography, and shapes. Using theme values ensures proper dark mode support and consistency."
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

To master the visual identity of your app, you must use the `MaterialTheme` object to manage your colours, typography, and shapes effectively. By implementing a comprehensive `ColorScheme`, you can ensure your UI adapts seamlessly to both light and dark modes, while leveraging dynamic colour allows your app to harmonize with the user's wallpaper on supported devices. Finally, remember to access these values through `MaterialTheme.colorScheme` and use `CompositionLocal` whenever you need to provide custom theme properties throughout your component tree.

## Congratulations!

You've completed the Compose Fundamentals module!

Continue to [Building Interfaces: Building a Button](../03-building-interfaces/01-building-a-button.md) →
