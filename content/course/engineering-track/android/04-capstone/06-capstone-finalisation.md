---
estimatedTime: 10
---

# Capstone: Finalisation

> **Quick Summary:** Add the finishing touches with an app icon, README, and GitHub repository. Don't let a default "Android head" icon ruin your hard work.

**Time Estimate:** 1-2 hours

## What You'll Learn

- Creating an **Adaptive Icon** that works on all launchers
- Configuring the modern Splash Screen API
- Writing a README that explains your technical decisions

## Step 1: The Adaptive Icon

Android icons are layered. They consist of a foreground (your logo) and a background (solid color or pattern). This allows the system to mask them as circles, squares, or squircles depending on the user's theme.

1.  **Prepare:** Create a 108x108dp foreground image. Your logo should fit within the center 66dp "safe zone".
2.  **Import:** Right-click `res` -> New -> **Image Asset**.
3.  **Configure:** Select "Launcher Icons (Adaptive and Legacy)".
    *   **Foreground Layer:** Select your image.
    *   **Background Layer:** Select a color.
4.  **Verify:** Toggle the "Preview" shapes to ensure your logo isn't cut off.

## Step 2: The Splash Screen

Android 12+ introduced a standardized splash screen. Configure it in your `themes.xml`.

```xml
<style name="Theme.App.Starting" parent="Theme.SplashScreen">
    <!-- The background color of the splash screen -->
    <item name="windowSplashScreenBackground">@color/splash_background</item>
    
    <!-- Your logo (should be an AnimatedVectorDrawable or simple Drawable) -->
    <item name="windowSplashScreenAnimatedIcon">@drawable/splash_icon</item>
    
    <!-- The theme to switch to after the splash finishes -->
    <item name="postSplashScreenTheme">@style/Theme.App</item>
</style>
```

Don't build a custom "Splash Activity" with a 3-second timer. It's an anti-pattern. Let the system handle loading.

## Step 3: The README

Your README is your documentation.

```markdown
# Task Manager

A modern Android task management app built with Jetpack Compose and Room.

<p align="center">
  <img src="docs/screen-1.png" width="32%"/>
  <img src="docs/screen-2.png" width="32%"/>
  <img src="docs/screen-3.png" width="32%"/>
</p>

## Features
- ✅ **Task Management:** Create, edit, and delete tasks with priority levels.
- 💾 **Offline First:** Local persistence via Room Database.
- 🌊 **Modern UI:** 100% Jetpack Compose with Material 3.
- 🌓 **Theming:** Full Dark Mode and Dynamic Color support.
- ♿ **Accessible:** Verified TalkBack support.

## Architecture
This app follows the recommended **MVI/MVVM** architecture:
- **UI:** Compose functions observing `StateFlow`.
- **ViewModel:** Handles business logic and exposes UI State.
- **Repository:** Abstracts data sources.
- **Data Source:** Room DAO.

## Requirements
- Android 8.0+ (API 26)
- Android Studio Hedgehog+

## Installation
1. Clone the repository.
2. Open in Android Studio.
3. Sync Gradle and Run.
```

**Note:** Take real screenshots from the emulator and save them in a `docs/` folder.

## Step 4: The Repository

1.  **Initialise:** `git init`
2.  **Ignore:** Ensure you have a proper `.gitignore` (ignore `.idea`, `build/`, `*.iml`).
3.  **Commit:** Stage and commit your code.
4.  **Push:** Push to a new public GitHub repository.

## Submission Checklist

### Application Polish
- [ ] Adaptive Icon is set (no green Android head).
- [ ] Application Label is correct (e.g., "Tasks", not "Task_Manager_Final").
- [ ] Dark Mode colors are checked and legible.

### Code Quality
- [ ] No `Log.d` statements left in production code.
- [ ] Code is formatted (press `Ctrl+Alt+L` / `Cmd+Opt+L`).
- [ ] Unused resources (images, layouts) are removed.

### Documentation
- [ ] `README.md` exists and has screenshots.
- [ ] Architecture is explained briefly.
- [ ] Repository is public.

## What's Next

Congratulations on completing the Android Engineering Track capstone!

You have built a native, persistent, modern Android app. This proves you can handle the complexity of the Android ecosystem.

### Portfolio Tips

*   **Video Walkthrough:** Android development is dynamic. Record a video of the app in action (especially transitions and state changes).
*   **APK Release:** Build a release APK (Build -> Build Bundle(s) / APK(s) -> Build APK) and upload it to your GitHub Releases page so people can install it easily.

### Continue Your Journey

- → [Android Convergence Track](/course/convergence/android) — Add animations and polish
- → [Android Design Track](/course/design-track/android) — Strengthen design skills
- → [iOS Engineering Track](/course/engineering-track/ios) — Learn SwiftUI
