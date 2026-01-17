# Motion Design Principles for iOS

> **Quick Summary:** Motion on iOS isn't decoration—it's communication. Learn how to design animations that feel natural, enhance the user experience, and follow Apple's physics-based philosophy.

## The iOS Motion Philosophy

### Motion as Communication
Every animation should serve a purpose.
- **Orientation:** "Where am I?" (Navigation transitions)
- **Continuity:** "Where did that come from?" (Zooming a photo)
- **Feedback:** "Did my action work?" (Button press)
- **Delight:** "Make it feel good." (A satisfying checkmark)

### Physics-Based Motion
iOS animations feel real because they follow physics. Objects have mass and momentum. Movements ease in and out naturally; nothing starts or stops abruptly. Spring dynamics create an organic feel that linear animations cannot match.

## Spring Animations

### Why Springs?
Traditional easing curves (Linear, Ease-In-Out) are defined by time. They feel artificial. Springs are defined by physics. They feel responsive.
If you interrupt a spring animation (e.g., catch a sliding card mid-flight), it reacts instantly and preserves momentum. A time-based animation would often snap or jitter.

### Spring Parameters
- **Stiffness:** The tension of the spring. High stiffness = snappy response. Low stiffness = loose, lazy movement.
- **Damping:** The friction. Low damping = bouncy (overshoots). High damping = smooth settle (no bounce).
- **Mass:** The weight. Heavier objects accelerate and decelerate slower.

### Common iOS Spring Presets
- **Snappy:** High stiffness, medium damping. Great for toggles and buttons.
- **Bouncy:** Low damping. Fun for notifications or badges.
- **Smooth:** Balanced. The default for navigation transitions.

## When to Animate

### Always Animate
- **State Changes:** A toggle turning on/off.
- **Transitions:** Moving between screens.
- **Feedback:** Loading, success, error.
- **Reveals:** New content appearing (like expanding a card).

### Consider Carefully
- **Decorative Loops:** Can be distracting.
- **Complex Sequences:** Can feel slow if they block user interaction.

### Never Animate
- **Critical Info:** Don't make the user wait to see a warning.
- **Repeated Actions:** If a user does something 100 times a day, make it instant.
- **Reduce Motion:** If the user has enabled this setting, respect it.

## Types of iOS Animations

### Navigation Transitions
The standard "Push" transition slides the new screen in from the right, while the old screen slides left and dims (parallax). This tells the user they are moving "deeper" into the hierarchy.

### Modal Presentations
Modals slide up from the bottom as a sheet. This reinforces that the new view is a temporary layer sitting *on top* of the previous context.

### Micro-interactions
Small, purposeful animations that delight.
- **Button Press:** A subtle scale down (0.95) mimics depressing a physical button.
- **Switch:** The knob slides with a spring physics feel.
- **Like:** A heart icon might pop and settle.

### Loading States
Keep users informed. Use **Skeleton Screens** (shimmering placeholders) to imply structure while data loads. Avoid generic spinners if possible; they feel slower.

## Designing Animations in Figma

### Prototyping Motion
1.  Use **Smart Animate** for simple transitions between frames.
2.  Use **Component Properties** to animate variants (e.g., button hover/press).
3.  Set the animation curve to **Spring** (or "Gentle" / "Quick") to match iOS physics.

### Documenting for Developers
Don't just send a video. Provide specs:
- **Trigger:** "On Tap."
- **Duration:** "0.35s."
- **Spring Damping:** "0.8" (or "Snappy").
- **Properties:** "Scale from 1.0 to 0.95."

## Designing for Reduce Motion

### Respecting User Preference
Some users suffer from vestibular disorders where motion causes nausea. iOS has a "Reduce Motion" setting.
- **Replace:** Large swipes and zooms with simple **Crossfades**.
- **Remove:** Parallax effects and bouncing.
- **Keep:** Essential feedback (like a loading spinner or a colour change on press).

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
1.  Trigger an animation.
2.  Guess the trigger (Tap? Scroll?).
3.  Guess the purpose (Feedback? Orientation?).
4.  Does it bounce?

### Exercise 2: Spring Parameters
In Figma (or Swift):
1.  Create a square.
2.  Animate it moving right.
3.  Try high damping (no bounce).
4.  Try low damping (lots of bounce).
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

- iOS motion uses **Spring Physics** for a natural feel.
- Every animation must have a **communication purpose**.
- Standard spring damping is around **0.7-0.9**.
- Always provide alternatives for **Reduce Motion**.
- **Document** animation specs clearly for developers.

## Next Steps

Continue to [Designing Across Devices](./04-designing-across-devices.md) →
