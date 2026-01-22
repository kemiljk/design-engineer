# Setting Up Your Development Workflow

> **Quick Summary:** A smooth development workflow makes building Android apps enjoyable. Learn how to configure Android Studio, set up Compose previews effectively, and establish habits that will serve you throughout your design engineering journey.

## What You'll Learn

- How to configure Android Studio for maximum productivity
- How to master the effective use of Compose previews
- How to manage emulators efficiently and establish version control with Git
- Recommended tools and plugins to enhance your daily workflow

## Configuring Android Studio

### Theme and Appearance

Customise Android Studio's look:

Open the Settings or Preferences menu and navigate to **Appearance & Behaviour** to select your preferred UI theme, such as the popular dark Darcula option, the IntelliJ Light theme, or an accessibility-focused high-contrast variant.

### Editor Settings

Under **Editor → General → Appearance**:

Enabling line numbers, whitespaces, and indent guides within the editor settings is essential for catching formatting issues early and maintaining a clean, structured view of your code.

Under **Editor → General → Code Folding**:
- Enable folding for import statements (cleaner view)

### Font and Colours

Under **Editor → Font**:

Choose a comfortable font such as JetBrains Mono or Fira Code at a size between 13 and 15, ensuring you set the line spacing to 1.2 to maintain optimal readability during long coding sessions.

### Code Style

Under **Editor → Code Style → Kotlin**:

You should stick to the default Android and Kotlin styles, though you might consider enabling the "Use tab character" option if you prefer tabs over spaces for your indentation.

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

To maintain high performance, you should only preview the specific components you are currently working on and always use mock data rather than expensive API calls. Keeping your preview composables simple and disabling the system UI chrome when unnecessary will also help ensure that the design pane remains fast and responsive.

## Managing Emulators

### Creating Emulators

Open the Device Manager from the Tools menu and click to create a new device, where you can choose a profile like the Pixel 7 and select the latest system image before finishing the configuration.

### Recommended Emulators

Create a few emulators covering different scenarios:

It is useful to maintain several emulators for different scenarios, including current flagships like the Pixel 7, smaller popular devices such as the Pixel 7a, and a dedicated tablet profile for testing adaptive layouts.

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

Beyond standard touch interaction, you can use the extended controls menu to simulate various hardware states, including custom GPS locations, low battery conditions, slow network connections, and even incoming calls or SMS messages.

### Physical Devices

For best performance, use real devices:

For the most accurate performance testing, connect a physical device via USB after enabling developer options and USB debugging on the handset; it will then appear directly in your device selector.

### Wireless Debugging (Android 11+)

Android 11 and later also support wireless debugging, allowing you to pair devices over Wi-Fi by scanning a QR code or entering a pairing code directly within the Android Studio pairing menu.

## Version Control with Git

### Android Studio's Git Integration

Android Studio has built-in Git support:

**Enable VCS:**
Enable version control integration from the VCS menu and select Git to activate the built-in support, which allows you to open the commit dialog and review your changes before finishing with a descriptive message.

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

- Configuring a productive Android environment requires customising your theme and fonts for comfort
- Established habits like using multiple preview annotations and early Git integration ensure a professional workflow
- This setup saves time and lets you focus on building high-quality interfaces

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
