---
estimatedTime: 15
---

# Capstone: Documentation & Delivery

> **Quick Summary:** Create screen recordings, write your case study, and prepare deliverables. Your code is only half the delivery; how you explain it is the other half.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Recording demonstrations that sell your work
- Writing a compelling case study
- Preparing a professional repository

## Step 1: Screen Recordings

A static screenshot cannot capture motion or interaction. You need video.

Create separate recordings for each key area:
1.  **Main User Flow:** The "happy path" from start to finish.
2.  **Animation Detail:** A slow-motion (50% speed) recording of your complex transitions to show the physics and choreography.
3.  **Accessibility Demo:** Enable VoiceOver and record the screen (with audio) to prove navigation works without sight.
4.  **Dynamic Type:** Record the interface scaling from Large to Accessibility XXXL text sizes.

**Pro Tip:** Use the iOS Simulator's "Record Screen" feature (`Cmd + R`) or QuickTime Player to capture high-quality video without the red recording dot.

## Step 2: Case Study

Your case study documents your thinking. Do not just list features; explain *why* you built them.

Create a `CASE_STUDY.md` file in your repository. Here is a structure you can use, with a filled-out example for a fictional "Meditation App" to guide you.

### Structure

1.  **Overview:** What is it? What was the focus?
2.  **The Challenge:** What was the starting point? What problem were you solving?
3.  **Design Decisions:** Why did you choose specific animations or layouts?
4.  **Accessibility:** How did you handle VoiceOver and Dynamic Type?
5.  **Results:** Performance metrics and completion status.

### Example Case Study

```markdown
# iOS Capstone Case Study: "Zen Focus"

## Overview
- **Project:** Zen Focus
- **Focus:** Fluid transitions, Interruptible gestures, and Accessibility
- **Timeline:** 2 Weeks

## The Challenge
The initial prototype used standard navigation transitions which felt stiff and disjointed. My goal was to create a sense of continuity, where the "now playing" card physically expands from the playlist rather than just sliding in, creating a deeper spatial connection for the user.

## Animation Design

### Philosophy
I chose spring animations with a lower damping ratio (0.7) to give the app a calm but responsive feel. All layout changes are orchestrated to guide the user's eye—elements don't just appear; they flow from their source.

### Key Interactions
1.  **Card Expansion:** Uses `matchedGeometryEffect` to seamlessly transform the compact playlist item into the full-screen player.
2.  **Breathing Circle:** A repeating animation that syncs with the haptic engine to guide user breathing.

### Reduced Motion
When the user enables "Reduce Motion" in system settings, I replace the card expansion with a simple cross-fade, and disable the breathing circle animation to prevent motion sickness.

## Accessibility Implementation

### VoiceOver
I grouped the "Player Controls" (Play, Rewind, Forward) into a single semantic container so VoiceOver announces "Player Controls" before the individual buttons, giving context to non-sighted users.

### Dynamic Type
At accessibility sizes (XXXL), the horizontal track progress bar switches to a vertical layout, ensuring the timestamps are never truncated.

## Results
- **Performance:** Maintained 60fps during all heavy transitions on iPhone 14 Pro.
- **Compliance:** 100% navigable via VoiceOver with all custom actions labelled.
```

## Step 3: README

Your `README.md` is the front door to your repository. It tells recruiters and engineers how to run your code.

```markdown
# Zen Focus - iOS Capstone

A polished iOS app demonstrating production-grade animation and accessibility.

## Features
- ✨ **Fluid Motion:** Physics-based springs and interruptible gestures.
- ♿ **VoiceOver First:** Semantic grouping and custom actions.
- 📱 **Adaptive Layout:** Supports all Dynamic Type sizes.
- 🎯 **Inclusive:** Full support for Reduced Motion preferences.

## Requirements
- iOS 17.0+
- Xcode 15+

## Setup
1. Clone the repository.
2. Open `ZenFocus.xcodeproj`.
3. Press `Cmd + R` to run on iPhone 15 Pro simulator.
```

## Submission Checklist

### Polished App/Feature
- [ ] Animations are smooth (no hitching) and interruptible.
- [ ] Motion language is consistent across screens.
- [ ] Empty and Error states are designed (no blank screens).

### Accessibility
- [ ] VoiceOver navigates logical groups, not just raw views.
- [ ] Dynamic Type scales without breaking layout.
- [ ] Reduced Motion preference disables excessive movement.

### Documentation
- [ ] `CASE_STUDY.md` is written and proofread.
- [ ] `README.md` includes setup instructions.
- [ ] Screen recordings are included in the repository (or linked).

### Deliverables
- [ ] Working Xcode project (clean build).
- [ ] GitHub repository link.

## What's Next

Congratulations on completing the iOS Convergence Track capstone!

This project demonstrates your ability to:
- Implement sophisticated SwiftUI animations
- Build accessible iOS experiences
- Polish apps to a professional standard
- Document your design engineering work

### Portfolio Impact

Use this project to:
- **Showcase Motion:** Show the slow-mo video in your portfolio.
- **Demonstrate Empathy:** Highlight your accessibility work.
- **Prove Craft:** Point to your handling of edge cases and empty states.

### Continue Your Journey

- → [Web Convergence Track](/course/convergence/web) — Apply skills to web
- → [Android Convergence Track](/course/convergence/android) — Apply skills to Android
- → Ship more polished iOS apps!
