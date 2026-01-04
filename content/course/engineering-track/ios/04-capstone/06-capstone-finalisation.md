---
estimatedTime: 10
---

# Capstone: Finalisation

> **Quick Summary:** Add the finishing touches with an app icon, README, and GitHub repository.

**Time Estimate:** 1-2 hours

## What You'll Learn

- Creating an app icon
- Configuring the launch screen
- Writing a comprehensive README
- Setting up a GitHub repository

## Step 1: App Icon

Create an app icon in Xcode's Asset Catalog:
1. Open Assets.xcassets
2. Select AppIcon
3. Add your 1024x1024 icon image

## Step 2: Launch Screen

Configure launch screen in Info.plist or use a simple SwiftUI view.

## Step 3: README

Create comprehensive documentation:

```markdown
# Task Manager

A SwiftUI task management app demonstrating modern iOS development patterns.

## Features
- Create, edit, delete tasks
- Organise by priority
- Set due dates
- Mark tasks complete
- Search tasks
- Dark mode support
- VoiceOver accessible

## Architecture
- SwiftUI for UI
- SwiftData for persistence
- MVVM-inspired structure

## Requirements
- iOS 18.0+ (iOS 26 recommended for Liquid Glass)
- Xcode 16+ (Xcode 26 recommended)

## Installation
1. Clone the repository
2. Open `TaskManager.xcodeproj`
3. Build and run

## Screenshots
[Add screenshots]
```

## Step 4: GitHub Repository

1. Initialise git: `git init`
2. Create .gitignore for Xcode projects
3. Push to GitHub
4. (Optional) Deploy to TestFlight

## Submission Checklist

Your capstone should include:

### Working App
- [ ] 3-5 functional screens
- [ ] Real data, not mock data
- [ ] Data persists across launches

### Custom Components
- [ ] At least 3 reusable components
- [ ] Custom view modifiers
- [ ] Consistent styling

### State Management
- [ ] Proper use of @State, @Binding
- [ ] @Observable or @Query patterns
- [ ] Clean data flow

### Data Persistence
- [ ] SwiftData or UserDefaults
- [ ] Data survives app restart
- [ ] Proper model relationships

### Accessibility
- [ ] VoiceOver labels
- [ ] Dynamic Type support
- [ ] Sufficient contrast

### Code Quality
- [ ] Clean organisation
- [ ] No warnings
- [ ] README documentation

### GitHub Repository
- [ ] Public repo with code
- [ ] Comprehensive README

## What's Next

Congratulations on completing the iOS Engineering Track capstone!

This project demonstrates:
- Swift language proficiency
- SwiftUI view composition skills
- State management understanding
- Data persistence capability

### Portfolio Tips

A working iOS app is a strong portfolio piece. Consider:
- Recording a demo video
- Writing about your architecture decisions
- Deploying to TestFlight for real testing
- Publishing source code with clean documentation

### Continue Your Journey

- → [iOS Convergence Track](/course/convergence/ios) — Add animations and polish
- → [iOS Design Track](/course/design-track/ios) — Strengthen design skills
- → [Android Engineering Track](/course/engineering-track/android) — Learn Compose

