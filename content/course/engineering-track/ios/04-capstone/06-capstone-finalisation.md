---
estimatedTime: 10
---

# Capstone: Finalisation

> **Quick Summary:** Add the finishing touches with an app icon, README, and GitHub repository. A great app in a messy repo will be ignored; a clean repo makes your work shine.

**Time Estimate:** 1-2 hours

## What You'll Learn

- Creating a production-ready App Icon
- Writing a README that explains your architecture
- Structuring a professional GitHub repository

## Step 1: The App Icon

The icon is the first thing users see. Even for a learning project, don't leave the default wireframe icon.

1.  **Design:** Create a simple 1024x1024 PNG. A solid background colour with a white symbol (SF Symbol) is sufficient for a clean look.
2.  **Import:** Open `Assets.xcassets` -> `AppIcon`.
3.  **Assign:** Drag your 1024x1024 image into the "Single App Icon" slot. Xcode will handle scaling for different devices automatically.

## Step 2: The Launch Screen

The launch screen masks the loading time. Keep it simple—it should mimic the first screen of your app.

1.  Open the `Launch Screen` file (or `Info.plist` configuration).
2.  Set the background colour to match your app's background.
3.  (Optional) Add your app logo in the center. Avoid text, as it's hard to localize and align perfectly during the launch transition.

## Step 3: The README

Your README is your documentation. Use this structure:

```markdown
# Task Manager

A SwiftUI task management app exploring SwiftData persistence and MVVM architecture.

<p align="center">
  <img src="docs/screenshot-light.png" alt="Light Mode" width="200"/>
  <img src="docs/screenshot-dark.png" alt="Dark Mode" width="200"/>
</p>

## Features
- ✅ **Task Management:** Create, edit, and delete tasks with priority levels.
- 💾 **SwiftData:** Local persistence with complex sorting predicates.
- 🔍 **Search:** Real-time filtering using `@Query`.
- 🌓 **Theming:** Full Dark Mode and Dynamic Type support.
- ♿ **Accessible:** VoiceOver labels and semantic ordering.

## Architecture
This app follows a strict **MVVM (Model-View-ViewModel)** pattern:
- **Models:** Defined using `@Model` macros for SwiftData.
- **ViewModels:** Observable classes handling business logic and data transformation.
- **Views:** Pure SwiftUI layers that react to state changes.

## Requirements
- iOS 17.0+
- Xcode 15+

## Installation
1. Clone the repository.
2. Open `TaskManager.xcodeproj`.
3. Press `Cmd + R` to build and run.
```

**Note:** Actually take screenshots of your app running in the Simulator (`Cmd + S`) and save them to a `docs/` folder in your repo so the image links work.

## Step 4: The Repository

1.  **Initialise:** Run `git init` in your project folder.
2.  **Ignore:** Create a `.gitignore` file. Use [Swift.gitignore](https://github.com/github/gitignore/blob/main/Swift.gitignore) as a template to avoid committing user-specific Xcode data.
3.  **Commit:** Stage and commit your clean project.
4.  **Push:** Create a new repository on GitHub and push your code.

## Submission Checklist

### Application Polish
- [ ] App Icon is set (no default placeholder).
- [ ] Launch Screen matches the app theme.
- [ ] Display Name is correct (e.g., "Tasks", not "TaskManager_Final_v2").

### Code Quality
- [ ] No compiler warnings.
- [ ] Dead code (commented-out blocks) removed.
- [ ] Files organised into groups (Views, Models, ViewModels).

### Documentation
- [ ] `README.md` created with screenshots.
- [ ] `.gitignore` prevents derived data commit.
- [ ] Repository is public (so it can be reviewed).

## What's Next

Congratulations on completing the iOS Engineering Track capstone!

You have built a functional, persistent, architectural iOS app. This puts you ahead of many beginners who only build static UI views.

### Portfolio Tips

*   **Record a Video:** A README is great, but a 30-second video of you using the app is better. Embed it or link to it.
*   **Write a Post:** Share your "biggest challenge" (e.g., "Learning how SwiftData predicates work") on LinkedIn or Twitter.
*   **Keep Building:** Add one more feature. Maybe push notifications? Maybe iCloud sync? The best way to learn is to extend existing code.

### Continue Your Journey

- → [iOS Convergence Track](/course/convergence/ios) — Add professional animations and polish
- → [iOS Design Track](/course/design-track/ios) — Learn to design the screens you just built
- → [Android Engineering Track](/course/engineering-track/android) — See how the other side lives with Kotlin & Compose
