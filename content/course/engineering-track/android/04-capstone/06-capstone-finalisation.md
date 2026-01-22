---
estimatedTime: 10
---

# Capstone: Finalisation

> **Quick Summary:** Add the finishing touches with an app icon, README, and GitHub repository. Don't let a default "Android head" icon ruin your hard work.

**Time Estimate:** 1-2 hours

## What You'll Learn

- configure the modern Splash Screen API for a professional launch experience
- configure the modern Splash Screen API for a professional launch experience
- We'll also examine how to write a compelling README that clearly explains your technical decisions
- showcases the final product effectively showcases the final product effectively

## Step 1: The Adaptive Icon

Android icons are layered. They consist of a foreground (your logo) and a background (solid color or pattern). This allows the system to mask them as circles, squares, or squircles depending on the user's theme.

To create your icon, start by preparing a 108x108dp foreground image ensuring your logo fits within the central 66dp "safe zone". You should then right-click on the `res` directory, navigate to New, and select Image Asset. From there, configure your launcher icons by selecting "Adaptive and Legacy", choosing your foreground image, and selecting an appropriate background colour. Finally, verify your work by toggling through the verschiedenen preview shapes to confirm that the logo remains perfectly visible without any clipping.

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

1. Create a new Android Studio project (or open your existing project) and initialize Git for it.
2. Open the project in Android Studio.
3. Sync Gradle and Run on an emulator or device.
```

**Note:** Take real screenshots from the emulator and save them in a `docs/` folder.

## Step 4: The Repository

Begin by initialising your repository with a `git init` command and carefully configure your `.gitignore` file to exclude internal IDE files and build artifacts. Once your environment is clean, stage and commit your initial code before finally pushing your workspace to a new public GitHub repository.

## Submission Checklist

### Application Polish

Ensure your application is fully polished by verifying that your Adaptive Icon is correctly set and that the application label matches your project's name. You should also check that your dark mode colours are legible and consistent across all screens.

### Code Quality

To maintain high code quality, remove any remaining `Log.d` statements from your production code and ensure all files are correctly formatted. You should also perform a final audit of your resources to remove any unused images or layouts that may bloat the application size.

### Documentation

Finalise your documentation by ensuring a thorough `README.md` file exists with relevant screenshots and a brief explanation of your architectural choices. Finally, confirm that your repository is set to public so that it can be reviewed by others.

## What's Next

Congratulations on completing the Android Engineering Track capstone!

You have built a native, persistent, modern Android app. This proves you can handle the complexity of the Android ecosystem.

### Portfolio Tips

- **Video Walkthrough:** Android development is dynamic. Record a video of the app in action (especially transitions and state changes).
- **APK Release:** Build a release APK (Build -> Build Bundle(s) / APK(s) -> Build APK) and upload it to your GitHub Releases page so people can install it easily.

### Continue Your Journey

- → [Android Convergence Track](/course/convergence/android) — Add animations and polish
- → [Android Design Track](/course/design-track/android) — Strengthen design skills
- → [iOS Engineering Track](/course/engineering-track/ios) — Learn SwiftUI
