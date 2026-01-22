# Motion Design Principles for iOS

> **Quick Summary:** Motion on iOS isn't decoration—it's communication. Learn how to design animations that feel natural, enhance the user experience, and follow Apple's physics-based philosophy.

## What You'll Learn

- How motion communicates orientation, continuity, and feedback
- Spring animation parameters and when to use them
- Types of iOS animations (navigation, modals, micro-interactions)
- How to design animations in Figma for iOS
- Respecting the Reduce Motion accessibility setting

## The iOS Motion Philosophy

### Motion as Communication
Every animation should serve a purpose.
Effective motion provides **orientation** by showing where the user is in the hierarchy, ensures **continuity** by demonstrating where elements originated, delivers immediate **feedback** for user actions, and adds a touch of **delight** through satisfying micro-interactions.

### Physics-Based Motion
iOS animations feel real because they follow physics. Objects have mass and momentum. Movements ease in and out naturally; nothing starts or stops abruptly. Spring dynamics create an organic feel that linear animations cannot match.

## Spring Animations

### Why Springs?
Traditional easing curves (Linear, Ease-In-Out) are defined by time. They feel artificial. Springs are defined by physics. They feel responsive.
If you interrupt a spring animation (e.g., catch a sliding card mid-flight), it reacts instantly and preserves momentum. A time-based animation would often snap or jitter.

### Spring Parameters
Springs are defined by **stiffness** for responsiveness, **damping** to control friction and bounce, and **mass** which governs the speed of acceleration and deceleration.

### Common iOS Spring Presets
Common presets include **Snappy** for interactive controls like toggles, **Bouncy** for playful alerts, and **Smooth** for standard navigation transitions.

## When to Animate

### Always Animate
Animations should always accompany **state changes**, screen **transitions**, user **feedback** events, and content **reveals** to maintain a sense of continuity.

### Consider Carefully
Consider decorative loops and complex sequences carefully, as they can be distracting or feel slow if they block user interaction.

### Never Animate
Never animate critical warnings, repeated actions that users perform frequently, or when the user has enabled the **Reduce Motion** setting.

## Types of iOS Animations

### Navigation Transitions
The standard "Push" transition slides the new screen in from the right, while the old screen slides left and dims (parallax). This tells the user they are moving "deeper" into the hierarchy.

### Modal Presentations
Modals slide up from the bottom as a sheet. This reinforces that the new view is a temporary layer sitting *on top* of the previous context.

### Micro-interactions
Small, purposeful animations that delight.
Delightful micro-interactions include a subtle **scale down** for button presses, a spring-based **slide** for switches, and a slight **pop** for action icons like a heart.

### Loading States
Keep users informed. Use **Skeleton Screens** (shimmering placeholders) to imply structure while data loads. Avoid generic spinners if possible; they feel slower.

## Designing Animations in Figma

### Prototyping Motion
When prototyping, use **Smart Animate** for transitions, **Component Properties** for variants, and set the curve to **Spring** to mirror iOS physics.

### Documenting for Developers
Don't just send a video. Provide specs:
Document the **trigger**, **duration**, **spring damping**, and target **properties** for developers.

## Designing for Reduce Motion

### Respecting User Preference
Some users suffer from vestibular disorders where motion causes nausea. iOS has a "Reduce Motion" setting.
Respect user preferences by replacing large zooms with **crossfades**, removing unnecessary **parallax**, and keeping only **essential feedback** like loading indicators.

## Motion Audit Checklist

For each animation, ask:
- [ ] Does it communicate something?
- [ ] Does it use spring physics?
- [ ] Is it interruptible?
- [ ] Does it respect Reduce Motion?
- [ ] Is the timing fast enough (usually <0.4s)?

## Try It Yourself

### Exercise 1: Animation Inventory
Open 3 Apple apps (Notes, Maps, Music).
Open Apple apps like Notes or Maps to trigger an animation, then identifying its trigger, purpose, and whether it uses physical bounce.

### Exercise 2: Spring Parameters
In Figma (or Swift):
In your design tool, create a square and experiment with high and low damping to see which feels more playful or precise.
5.  Which feels more "playful"? Which feels more "precise"?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-motion-quiz",
  "type": "multiple-choice",
  "title": "iOS Motion Design",
  "description": "Test your understanding of motion design principles.",
  "difficulty": "medium",
  "question": "What happens to your animations when a user enables 'Reduce Motion' in iOS settings?",
  "options": [
    {
      "id": "a",
      "text": "All animations are completely disabled",
      "isCorrect": false,
      "explanation": "Reduce Motion doesn't disable all animations—essential feedback animations should still work."
    },
    {
      "id": "b",
      "text": "Animations play at half speed",
      "isCorrect": false,
      "explanation": "Reduce Motion doesn't slow animations. It changes or removes them."
    },
    {
      "id": "c",
      "text": "Complex motions should be replaced with simpler alternatives like crossfades",
      "isCorrect": true,
      "explanation": "Correct! When Reduce Motion is enabled, designers should replace zooms, slides, and bounces with simple crossfades while keeping essential feedback."
    },
    {
      "id": "d",
      "text": "Only the app's custom animations are affected",
      "isCorrect": false,
      "explanation": "System animations are also simplified when Reduce Motion is enabled."
    }
  ]
}
-->

## Key Takeaways

iOS motion leverage **Spring Physics** to create a natural and physically real feel, provided every animation serves a clear **communication purpose**. By maintaining standard damping ratios and always providing alternatives for **Reduce Motion**, you can deliver a polished experience that remains accessible, provided you **document** your specifications clearly for the engineering team.

## Next Steps

Continue to [Designing Across Devices](./04-designing-across-devices.md) →
