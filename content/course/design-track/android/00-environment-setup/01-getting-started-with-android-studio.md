# Getting Started with Android Studio

> **Quick Summary:** Android Studio is Google's official development environment for building Android apps. Setting it up properly is your first step towards bringing your Material Design creations to life.

## What You'll Learn

- What Android Studio is and why it's required
- How to download and install Android Studio
- First-time setup and configuration
- Navigating the Android Studio interface
- Creating your first project

## What Is Android Studio?

Android Studio is Google's official IDE (Integrated Development Environment) for Android development. It's built on IntelliJ IDEA—a powerful, professional code editor—and includes everything you need to build Android apps:

- Code editor with Kotlin/Java support
- Visual layout editor
- Android emulators
- Build tools and debugger
- Performance profilers

Unlike web development where you can choose any editor, Android development works best with Android Studio. It's free and provides the most complete experience.

### Why Designers Should Learn Android Studio

Even if you're primarily a designer, understanding Android Studio helps you:

- **Prototype in Jetpack Compose:** See exactly how your designs perform
- **Understand constraints:** Know what's possible on Android
- **Collaborate better:** Speak the same language as Android developers
- **Ship your own ideas:** Build apps without waiting for engineering help

## System Requirements

Android Studio runs on Mac, Windows, and Linux:

### Mac
- macOS 10.14 (Mojave) or higher
- Apple Silicon or Intel processor
- 8GB RAM minimum (16GB recommended)
- 8GB disk space minimum (SSD recommended)

### Windows
- Windows 10/11 64-bit
- x86_64 CPU architecture
- 8GB RAM minimum (16GB recommended)
- 8GB disk space minimum (SSD recommended)

### Linux
- 64-bit Linux distribution
- GNU C Library (glibc) 2.31 or later
- 8GB RAM minimum (16GB recommended)

**Storage Note:** You'll need additional space for Android SDKs and emulators—plan for 20-30GB total.

## Installing Android Studio

### Step 1: Download

1. Go to [developer.android.com/studio](https://developer.android.com/studio)
2. Click **Download Android Studio**
3. Accept the terms and conditions
4. Download the installer for your platform

### Step 2: Install

**Mac:**
1. Open the downloaded `.dmg` file
2. Drag Android Studio to the Applications folder
3. Open Android Studio from Applications

**Windows:**
1. Run the downloaded `.exe` installer
2. Follow the setup wizard
3. Choose installation location (default is fine)
4. Install Android Virtual Device (AVD) when prompted

**Linux:**
1. Extract the downloaded `.tar.gz`
2. Run `studio.sh` from the `bin` folder
3. Follow the setup wizard

### Step 3: First-Time Setup

When you first launch Android Studio:

1. **Import Settings:** Choose "Do not import settings" if this is a fresh install

2. **Setup Wizard:** Follow the guided setup:
   - Select **Standard** installation type
   - Choose a UI theme (Darcula for dark, Light for light)
   - Verify SDK components to download

3. **SDK Download:** Wait for components to download (this takes a while)

4. **Ready to Use:** Once complete, you'll see the Welcome screen

## The Android Studio Interface

Android Studio's interface has several key areas:

### Welcome Screen

When you open Android Studio without a project:
- **New Project:** Create a new app
- **Open:** Open an existing project
- **Recent Projects:** Quick access to previous work

### Main Editor Areas

**Project Panel (Left)**
- File and folder structure
- Resource files
- Gradle scripts
- Toggle with **⌘/Ctrl + 1**

**Editor (Centre)**
- Code editor
- Layout preview
- Multiple tabs for open files

**Tool Windows (Sides/Bottom)**
- Build output
- Logcat (device logs)
- Terminal
- Version control

**Toolbar (Top)**
- Run/Debug buttons
- Device selector
- Build variant selector

### Essential Shortcuts

| Shortcut (Mac/Windows) | Action |
|------------------------|--------|
| ⌘/Ctrl + Shift + A | Find any action |
| ⌘/Ctrl + O | Open file by name |
| ⌘/Ctrl + Shift + O | Open file by path |
| ⌘/Ctrl + B | Go to definition |
| ⌘/Ctrl + R | Run app |
| ⌘/Ctrl + D | Debug app |
| ⌘/Ctrl + Shift + F | Find in project |
| ⌘/Ctrl + E | Recent files |
| ⌘/Ctrl + / | Comment line |

The most important: **⌘/Ctrl + Shift + A** lets you search for any action.

## Creating Your First Project

Let's create a simple Jetpack Compose project:

### Step 1: Start New Project

1. Click **New Project** on the Welcome screen
2. Or: **File → New → New Project**

### Step 2: Choose Template

1. Select **Phone and Tablet** on the left
2. Choose **Empty Activity** (with Compose icon)
3. Click **Next**

### Step 3: Configure Project

- **Name:** My First App
- **Package name:** com.yourname.myfirstapp
- **Save location:** Choose your preferred folder
- **Language:** Kotlin
- **Minimum SDK:** API 24 (Android 7.0) is a good default
- **Build configuration language:** Kotlin DSL (Recommended)

Click **Finish**.

### Step 4: Wait for Gradle

Android Studio uses Gradle to manage builds. The first time, it downloads many dependencies—this can take several minutes.

Watch the progress bar at the bottom. When it says "Gradle sync finished," you're ready.

## Understanding the Project Structure

Your new project contains:

```
MyFirstApp/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/yourname/myfirstapp/
│   │   │   │   └── MainActivity.kt
│   │   │   ├── res/           ← Resources (images, strings)
│   │   │   └── AndroidManifest.xml
│   │   └── androidTest/       ← UI tests
│   └── build.gradle.kts       ← App build config
├── gradle/                    ← Gradle wrapper
└── build.gradle.kts           ← Project build config
```

### Key Files

**MainActivity.kt**
```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyFirstAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Greeting("Android")
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}
```

This is your first Compose code! We'll learn the syntax later—for now, recognise that this creates a screen showing "Hello Android!"

**AndroidManifest.xml**
Declares your app's components and permissions.

**build.gradle.kts (app level)**
Configures dependencies and build settings.

## Running Your App

### Setting Up an Emulator

1. Click **Device Manager** in the toolbar (phone icon)
2. Click **Create Device**
3. Select a phone (e.g., Pixel 7)
4. Click **Next**
5. Select a system image (download if needed—choose the latest)
6. Click **Next**, then **Finish**

The emulator appears in Device Manager. Click the play button to start it.

### Running on the Emulator

1. Select your emulator in the toolbar dropdown
2. Click the **Run** button (green play icon) or press **⌘/Ctrl + R**
3. Wait for the build and deployment

Your app launches in the emulator showing "Hello Android!"

### Running on a Physical Device

To test on a real phone:

1. Enable **Developer Options** on your Android phone:
   - Go to **Settings → About Phone**
   - Tap **Build Number** seven times

2. Enable **USB Debugging**:
   - Go to **Settings → Developer Options**
   - Enable **USB debugging**

3. Connect your phone via USB

4. Your device appears in the toolbar—select it and run

## Jetpack Compose Preview

Like SwiftUI, Compose has live previews:

```kotlin
@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    MyFirstAppTheme {
        Greeting("Design Engineer")
    }
}
```

The preview appears in the **Split** or **Design** view (tabs at top right of editor).

### Preview Controls

- **Build & Refresh:** Update the preview
- **Interactive Mode:** Click to interact with components
- **Device Settings:** Preview on different screen sizes

## Try It Yourself

### Exercise 1: Modify the Greeting

In `MainActivity.kt`, change the greeting text:

```kotlin
@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Welcome, $name! 🎨",
        modifier = modifier
    )
}
```

Rebuild to see the change.

### Exercise 2: Add Another Text Element

```kotlin
@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Column(
        modifier = modifier,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(text = "Hello $name!")
        Text(text = "Welcome to Android development")
    }
}
```

You'll need to import `Column` and `Alignment`:
- Place cursor on the red text
- Press **⌥/Alt + Enter** → Import

### Exercise 3: Run on Emulator

Build and run your modified app. See your changes on the virtual device.

## Troubleshooting Common Issues

### Gradle Sync Failed

- Check internet connection
- **File → Invalidate Caches → Restart**
- Delete `.gradle` folder in your home directory

### Emulator Won't Start

- Ensure virtualisation is enabled in BIOS (Windows)
- Update graphics drivers
- Try a different system image
- Allocate more RAM to the emulator

### "SDK location not found"

- **File → Project Structure → SDK Location**
- Set the correct Android SDK path

### Slow Performance

- Allocate more RAM: **Settings → Appearance → System Settings → Memory Settings**
- Use SSD storage
- Close unnecessary applications
- Use a physical device instead of emulator

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-studio-intro-quiz",
  "type": "multiple-choice",
  "title": "Android Studio Basics",
  "description": "Test your understanding of the Android Studio environment.",
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
      "explanation": "Correct! Find Action is the most powerful shortcut—you can search for any command or setting."
    },
    {
      "id": "c",
      "text": "⌘/Ctrl + R",
      "isCorrect": false,
      "explanation": "This runs your app."
    },
    {
      "id": "d",
      "text": "⌘/Ctrl + O",
      "isCorrect": false,
      "explanation": "This opens a file by class name."
    }
  ]
}
-->

## Key Takeaways

- Android Studio is required for Android development
- Download from developer.android.com/studio
- First-time setup downloads SDKs—be patient
- Use Device Manager to create emulators
- ⌘/Ctrl + Shift + A finds any action
- Compose previews update as you code

## Next Steps

Continue to [Understanding Kotlin Basics](./02-understanding-kotlin-basics.md) →
