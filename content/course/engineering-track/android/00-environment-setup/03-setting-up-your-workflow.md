# Setting Up Your Development Workflow

> **Quick Summary:** A smooth development workflow makes building Android apps enjoyable. Learn how to configure Android Studio, set up Compose previews effectively, and establish habits that will serve you throughout your design engineering journey.

## What You'll Learn

- Configuring Android Studio for productivity
- Effective use of Compose previews
- Managing emulators efficiently
- Version control with Git
- Recommended tools and plugins

## Configuring Android Studio

### Theme and Appearance

Customise Android Studio's look:

1. **Settings/Preferences** (⌘/Ctrl + ,)
2. **Appearance & Behavior → Appearance**
3. Choose a theme:
   - **Darcula:** Dark theme (popular)
   - **IntelliJ Light:** Light theme
   - **High Contrast:** Accessibility-focused

### Editor Settings

Under **Editor → General → Appearance**:

- ✅ Show line numbers
- ✅ Show whitespaces (helps catch formatting issues)
- ✅ Show indent guides

Under **Editor → General → Code Folding**:
- Enable folding for import statements (cleaner view)

### Font and Colours

Under **Editor → Font**:

- **Font:** JetBrains Mono (built-in), Fira Code, or SF Mono
- **Size:** 13-15 is comfortable for most
- **Line spacing:** 1.2 for readability

### Code Style

Under **Editor → Code Style → Kotlin**:

- Use the default Android/Kotlin style
- Consider enabling "Use tab character" if you prefer tabs

## Compose Preview Mastery

Previews are essential for rapid UI development—master them.

### Basic Preview

```kotlin
@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    MyTheme {
        Greeting("Designer")
    }
}
```

### Multiple Previews

See different configurations:

```kotlin
@Preview(name = "Light Mode")
@Composable
fun LightPreview() {
    MyTheme(darkTheme = false) {
        ProfileCard()
    }
}

@Preview(name = "Dark Mode")
@Composable
fun DarkPreview() {
    MyTheme(darkTheme = true) {
        ProfileCard()
    }
}
```

### Preview Annotations

Control preview appearance:

```kotlin
@Preview(
    name = "Small Phone",
    device = Devices.PIXEL_4,
    showBackground = true,
    backgroundColor = 0xFFFFFFFF
)
@Composable
fun SmallPhonePreview() {
    MyComponent()
}

@Preview(
    name = "Tablet",
    device = Devices.TABLET,
    showBackground = true
)
@Composable
fun TabletPreview() {
    MyComponent()
}
```

### Preview Parameters

Show different data variations:

```kotlin
@Preview
@Composable
fun ButtonPreview(
    @PreviewParameter(ButtonStateProvider::class) state: ButtonState
) {
    MyButton(state = state)
}

class ButtonStateProvider : PreviewParameterProvider<ButtonState> {
    override val values = sequenceOf(
        ButtonState.ENABLED,
        ButtonState.DISABLED,
        ButtonState.LOADING
    )
}
```

### Interactive Mode

Click the **Interactive** button (play icon) in the preview to interact with your UI without running the full app.

### Deploy Preview to Device

Click the **Run Preview** button to send just that composable to a device for real-world testing.

### Keeping Previews Fast

- Preview only the components you're working on
- Use mock/sample data, not real API calls
- Keep preview composables simple
- Use `@Preview(showSystemUi = false)` to skip system chrome

## Managing Emulators

### Creating Emulators

1. **Tools → Device Manager**
2. Click **Create Device**
3. Choose a device profile (Pixel 7 is a good default)
4. Select a system image (download the latest if needed)
5. Configure AVD settings
6. Click **Finish**

### Recommended Emulators

Create a few emulators covering different scenarios:

- **Pixel 7** (current flagship)
- **Pixel 7a** (smaller, popular device)
- **Pixel Tablet** (for tablet layouts)
- **Older device** (Pixel 4, API 28 for compatibility)

### Emulator Shortcuts

| Shortcut | Action |
|----------|--------|
| ⌘/Ctrl + Shift + H | Home |
| ⌘/Ctrl + Shift + B | Back |
| ⌘/Ctrl + Shift + O | Overview/Recent apps |
| ⌘/Ctrl + ← / → | Rotate |
| ⌘/Ctrl + Shift + S | Screenshot |

### Extended Controls

Click **...** in the emulator toolbar for:

- **Location:** Simulate GPS coordinates
- **Battery:** Test low battery states
- **Network:** Simulate slow connections
- **Phone:** Simulate calls and SMS

### Physical Devices

For best performance, use real devices:

1. Enable Developer Options (tap Build Number 7 times)
2. Enable USB Debugging
3. Connect via USB
4. Device appears in device selector

### Wireless Debugging (Android 11+)

1. Enable **Wireless debugging** in Developer Options
2. In Android Studio: **Run → Pair Devices Using Wi-Fi**
3. Scan QR code or enter pairing code

## Version Control with Git

### Android Studio's Git Integration

Android Studio has built-in Git support:

**Enable VCS:**
1. **VCS → Enable Version Control Integration**
2. Select Git

**Commit Changes:**
- **⌘/Ctrl + K** opens commit dialog
- Review changes, write message, commit

**View History:**
- **View → Tool Windows → Git**
- See branches, logs, and diffs

### Using Terminal

Android Studio has a built-in terminal:

1. **View → Tool Windows → Terminal** (⌥/Alt + F12)
2. Use Git commands directly

```bash
git status
git add .
git commit -m "Implement profile screen"
git push origin main
```

### .gitignore for Android

Your `.gitignore` should include:

```text
# Android Studio
*.iml
.gradle/
/local.properties
/.idea/
/build/
/captures/
.externalNativeBuild/

# Kotlin
*.class

# OS
.DS_Store
Thumbs.db
```

## Plugins and Tools

### Essential Plugins

Install via **Settings → Plugins → Marketplace**:

**Material Theme UI**
Beautiful IDE themes that match Material Design.

**Rainbow Brackets**
Colour-coded bracket pairs for easier reading.

**String Manipulation**
Case conversion and string utilities.

**GitToolBox**
Enhanced Git integration and blame info.

### Material Design Resources

**Material 3 Theme Builder**
[material.io/theme-builder](https://material.io/theme-builder)
Generate colour schemes and export to Compose.

**Material Symbols**
[fonts.google.com/icons](https://fonts.google.com/icons)
Browse icons and copy names for `Icons.Default.*`.

### Useful Websites

- **Jetpack Compose Docs:** developer.android.com/jetpack/compose
- **Compose Samples:** github.com/android/compose-samples
- **Accompanist:** google.github.io/accompanist (additional Compose utilities)

## Productivity Tips

### Find Action

**⌘/Ctrl + Shift + A** finds any action. This is the most important shortcut—search for any menu item, setting, or command.

### Smart Completion

**⌘/Ctrl + Shift + Space** shows context-aware suggestions.

### Quick Documentation

**F1** (Mac) or **Ctrl + Q** (Windows) shows documentation for the symbol under the cursor.

### Surround With

Select code, press **⌘/Ctrl + ⌥/Alt + T** to wrap it in if, try/catch, etc.

### Multiple Cursors

**⌥/Alt + Click** adds cursors. Edit multiple lines simultaneously.

### Live Templates

Type abbreviations and press Tab:
- `fun` → function template
- `comp` → @Composable function
- `prev` → @Preview annotation

Create custom templates in **Settings → Editor → Live Templates**.

### Split Editor

**Right-click a tab → Split Right/Down**
Work with two files side by side.

## Project Organisation

### Recommended Structure

```text
app/src/main/java/com/yourname/app/
├── ui/
│   ├── theme/
│   │   ├── Color.kt
│   │   ├── Type.kt
│   │   └── Theme.kt
│   ├── components/
│   │   ├── Button.kt
│   │   └── Card.kt
│   └── screens/
│       ├── HomeScreen.kt
│       └── ProfileScreen.kt
├── data/
│   └── models/
│       └── User.kt
└── MainActivity.kt
```

### Naming Conventions

- **Composables:** PascalCase, descriptive (`ProfileCard`, `PrimaryButton`)
- **Parameters:** camelCase (`userName`, `isEnabled`)
- **Files:** Match the main composable name

### Package Structure

Group by feature for larger apps:

```text
├── features/
│   ├── home/
│   │   ├── HomeScreen.kt
│   │   └── HomeViewModel.kt
│   └── profile/
│       ├── ProfileScreen.kt
│       └── ProfileViewModel.kt
```

## Try It Yourself

### Exercise 1: Customise Android Studio

1. Change to Darcula theme
2. Enable line numbers
3. Set your preferred font and size
4. Install Rainbow Brackets plugin

### Exercise 2: Create Multiple Previews

```kotlin
@Preview(name = "Light", showBackground = true)
@Composable
fun LightPreview() {
    MyTheme(darkTheme = false) {
        GreetingCard(name = "Designer")
    }
}

@Preview(name = "Dark", showBackground = true)
@Composable
fun DarkPreview() {
    MyTheme(darkTheme = true) {
        GreetingCard(name = "Designer")
    }
}

@Preview(
    name = "Large Font",
    showBackground = true,
    fontScale = 1.5f
)
@Composable
fun LargeFontPreview() {
    MyTheme {
        GreetingCard(name = "Designer")
    }
}
```

### Exercise 3: Set Up Git

1. Create a new project
2. Enable VCS (Git)
3. Make changes to MainActivity
4. Commit with message "Initial setup"

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-workflow-quiz",
  "type": "multiple-choice",
  "title": "Development Workflow",
  "description": "Test your understanding of Android Studio workflow.",
  "difficulty": "easy",
  "question": "What keyboard shortcut lets you search for any action in Android Studio?",
  "options": [
    {
      "id": "a",
      "text": "⌘/Ctrl + F",
      "isCorrect": false,
      "explanation": "This opens find in the current file."
    },
    {
      "id": "b",
      "text": "⌘/Ctrl + Shift + A",
      "isCorrect": true,
      "explanation": "Correct! Find Action is the most powerful shortcut—search for any menu, setting, or command."
    },
    {
      "id": "c",
      "text": "⌘/Ctrl + R",
      "isCorrect": false,
      "explanation": "This runs your app."
    },
    {
      "id": "d",
      "text": "⌘/Ctrl + K",
      "isCorrect": false,
      "explanation": "This opens the commit dialog."
    }
  ]
}
-->

## Key Takeaways

- Customise Android Studio's theme and fonts for comfort
- Use multiple @Preview annotations to see different states
- Create emulators for different device sizes and API levels
- Set up Git from the start—version control is essential
- Learn keyboard shortcuts, especially ⌘/Ctrl + Shift + A
- Organise projects with clear package structures

## Environment Complete!

You now have a fully configured Android development environment:

✅ Android Studio installed and configured  
✅ Kotlin fundamentals understood  
✅ Compose preview workflow established  
✅ Emulators ready  
✅ Version control set up  

You're ready to start designing and building Android interfaces!

## Next Steps

Continue to [Introduction to Kotlin](../01-kotlin-basics/01-introduction-to-kotlin.md) →
