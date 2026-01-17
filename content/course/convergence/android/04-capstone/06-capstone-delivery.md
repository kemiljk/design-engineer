---
estimatedTime: 10
---

# Capstone: Documentation & Delivery

> **Quick Summary:** Document your code, create a case study, and prepare your repository. Great engineering is invisible without communication.

**Time Estimate:** 1-2 hours

## What You'll Learn

- Writing Javadoc/KDoc for interaction components
- Structuring a technical case study
- Packaging your repository for recruiters and peers

## 1. Code Documentation

Don't just describe *what* the code does; describe the *design intent*.

**Example: A Swipeable Card**

```kotlin
/**
 * A Card component that supports a physics-based swipe-to-dismiss gesture.
 *
 * **Design Specs:**
 * - **Threshold:** 200dp (Users must drag 200dp to trigger dismiss).
 * - **Resistance:** Linear drag resistance.
 * - **Release:** Uses a spring spec (Damping: 0.8, Stiffness: 400) for snap-back.
 *
 * **Accessibility:**
 * - Adds a custom accessibility action ("Dismiss Item") to the TalkBack menu.
 * - Announces "Item dismissed" event upon completion.
 *
 * @param onDismiss Callback triggered when the swipe threshold is crossed.
 */
@Composable
fun SwipeableCard(onDismiss: () -> Unit)
```

## 2. The Case Study

A case study proves you can think like a Design Engineer. Create a `CASE_STUDY.md` in your repo.

### Case Study Template

```markdown
# Android Animation Capstone

## Overview
**Goal:** Build a complex, accessible animation in Jetpack Compose.
**Stack:** Kotlin, Compose, Material 3.

## The Problem
Standard transitions often feel rigid. I wanted to create a "Shared Element" transition that feels continuous and physical, rather than just fading screen A into screen B.

## Design Decisions
1.  **Spring Physics:** I avoided standard tweens. Springs allow the animation to handle interruptions (e.g., if the user grabs the card mid-flight).
2.  **Orchestration:** The text fades in *after* the image settles to reduce visual noise.

## Accessibility Strategy
*   **TalkBack:** The complex image/text group is merged into one semantic node (`Modifier.semantics { mergeDescendants = true }`).
*   **Scale:** The layout uses `FlowRow` so that when font size increases to 200%, the buttons wrap instead of being cut off.

## Performance
*   Verified 0% frame drops in the Android Profiler.
*   Used `derivedStateOf` to prevent excessive recomposition during the drag loop.
```

## 3. The Repository

Your GitHub repo is your portfolio.

1.  **README.md:**
    *   **Screenshot/GIF:** Put a recording at the very top.
    *   **Features:** Bullet points of what you built.
    *   **Setup:** "Clone repo -> Open in Android Studio -> Run."
2.  **Clean Up:** Remove unused resources and commented-out code.
3.  **APK:** (Optional) Upload a debug APK to the "Releases" section so people can try it without compiling.

## Submission Checklist

### Code Quality
- [ ] Logic is separated from UI (hoisted state).
- [ ] No hardcoded dimensions (use `dp`, `sp`, or theme tokens).
- [ ] Modifiers are ordered correctly (size before padding, etc).

### Animation
- [ ] Transitions feel fluid (no jank).
- [ ] Motion has purpose (spatial orientation), not just flair.
- [ ] Interrupted animations handle state gracefully.

### Accessibility
- [ ] TalkBack reads content in a logical order.
- [ ] Touch targets are at least 48x48dp.
- [ ] Layouts adapt to large fonts without overlapping.

### Documentation
- [ ] `README.md` has a hero image/video.
- [ ] `CASE_STUDY.md` explains the "Why".
- [ ] Key functions have KDoc comments.

## What's Next

Congratulations on completing the Convergence track!

You now possess a rare skillset:
- **Compose Fluency:** You can build complex, custom UIs.
- **Motion Literacy:** You understand physics, timing, and choreography.
- **Inclusive Mindset:** You build for everyone, not just the "happy path."

### Share Your Project
Post your case study on LinkedIn, Twitter, or the Android Developers Reddit. Design Engineering is a visual field—show your work!
