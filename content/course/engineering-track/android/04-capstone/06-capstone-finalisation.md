---
estimatedTime: 10
---

# Capstone: Finalisation

> **Quick Summary:** Add the finishing touches with an app icon, README, and GitHub repository.

**Time Estimate:** 1-2 hours

## What You'll Learn

- Creating an adaptive app icon
- Configuring the splash screen
- Writing a comprehensive README
- Setting up a GitHub repository

## Step 1: App Icon

Create an adaptive icon in `res/mipmap-anydpi-v26/`:
- Foreground layer (your icon graphic)
- Background layer (solid colour or pattern)

## Step 2: Splash Screen

Configure splash screen in `themes.xml`:

```xml
<style name="Theme.App.Starting" parent="Theme.SplashScreen">
    <item name="windowSplashScreenBackground">@colour/splash_background</item>
    <item name="windowSplashScreenAnimatedIcon">@drawable/splash_icon</item>
    <item name="postSplashScreenTheme">@style/Theme.App</item>
</style>
```

## Step 3: README

Create comprehensive documentation:

```markdown
# Task Manager

A Jetpack Compose task management app demonstrating modern Android development.

## Features
- Create, edit, delete tasks
- Organise by priority
- Set due dates
- Mark tasks complete
- Search tasks
- Dark mode support
- TalkBack accessible

## Architecture
- Jetpack Compose for UI
- ViewModel for state management
- Room for persistence
- Kotlin Coroutines & Flow

## Requirements
- Android 8.0+ (API 26)
- Android Studio Hedgehog+

## Installation
1. Clone the repository
2. Open in Android Studio
3. Build and run

## Screenshots
[Add screenshots]
```

## Step 4: GitHub Repository

1. Initialise git: `git init`
2. Create .gitignore for Android projects
3. Push to GitHub
4. (Optional) Publish to Play Store

## Submission Checklist

Your capstone should include:

### Working App
- [ ] 3-5 functional screens
- [ ] Real data, not mock data
- [ ] Data persists across launches

### Custom Composables
- [ ] At least 3 reusable components
- [ ] Custom modifiers
- [ ] Consistent Material 3 styling

### State Management
- [ ] ViewModel for UI state
- [ ] StateFlow/collectAsState patterns
- [ ] Clean data flow

### Data Persistence
- [ ] Room or DataStore
- [ ] Data survives app restart
- [ ] Proper repository pattern

### Accessibility
- [ ] TalkBack descriptions
- [ ] Dynamic text support
- [ ] Sufficient contrast

### Code Quality
- [ ] Clean organisation
- [ ] No warnings
- [ ] README documentation

### GitHub Repository
- [ ] Public repo with code
- [ ] Comprehensive README

## What's Next

Congratulations on completing the Android Engineering Track capstone!

This project demonstrates:
- Kotlin language proficiency
- Jetpack Compose UI composition
- State management understanding
- Data persistence capability

### Portfolio Tips

A working Android app is a strong portfolio piece. Consider:
- Recording a demo video
- Writing about your architecture decisions
- Deploying to Play Store for real distribution
- Publishing source code with clean documentation

### Continue Your Journey

- → [Android Convergence Track](/course/convergence/android) — Add animations and polish
- → [Android Design Track](/course/design-track/android) — Strengthen design skills
- → [iOS Engineering Track](/course/engineering-track/ios) — Learn SwiftUI

