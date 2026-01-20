---
estimatedTime: 10
---

# Capstone: Finalisation

> **Quick Summary:** Add the finishing touches with an app icon, README, and GitHub repository. A great app in a messy repo will be ignored; a clean repo makes your work shine.

**Time Estimate:** 1-2 hours

## What You'll Learn

During this module, you will learn how to create a production-ready App Icon and write a comprehensive README that clearly explains your app's architecture. We'll also examine the best practices for structuring a professional GitHub repository to showcase your work effectively.

## Step 1: The App Icon

The icon is the first thing users see. Even for a learning project, don't leave the default wireframe icon.

To create your icon, design a simple 1024x1024 PNG featuring a solid background colour and a clear symbol from the SF Symbols library. Once ready, open `Assets.xcassets`, navigate to the `AppIcon` set, and drag your image into the "Single App Icon" slot so that Xcode can automatically handle the scaling for various devices.

## Step 2: The Launch Screen

The launch screen masks the loading time. Keep it simple—it should mimic the first screen of your app.

Configure your launch screen by matching its background colour to your application's primary background and optionally adding your app logo to the centre. Be sure to avoid using text on this screen, as it can be difficult to localise and align precisely during the rapid transition to your app's first view.

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

Establish your project's repository by running `git init` in your project folder and creating a `.gitignore` file using the standard Swift template to prevent committing unnecessary Xcode data. Stage and commit your clean project files before creating a new repository on GitHub and pushing your code to the remote server.

## Submission Checklist

### Application Polish
Before submitting your project, verify that your App Icon is correctly set and that the Launch Screen theme aligns with your app's design. Ensure your application has a professional display name, is free of compiler warnings and dead code, and that all files are logically organised into groups. Finally, confirm your repository includes a comprehensive `README.md` with screenshots, a proper `.gitignore` file is in place, and the project is public for easy review.

## What's Next

Congratulations on completing the iOS Engineering Track capstone!

You have built a functional, persistent, architectural iOS app. This puts you ahead of many beginners who only build static UI views.

### Portfolio Tips

To further enhance your portfolio, consider recording a brief thirty-second video of your application in action and sharing your development journey, including any specific challenges like mastering SwiftData, on social platforms. Continue to grow your skills by adding new features such as push notifications or iCloud synchronisation to your existing codebase.

### Continue Your Journey

- → [iOS Convergence Track](/course/convergence/ios) — Add professional animations and polish
- → [iOS Design Track](/course/design-track/ios) — Learn to design the screens you just built
- → [Android Engineering Track](/course/engineering-track/android) — See how the other side lives with Kotlin & Compose
