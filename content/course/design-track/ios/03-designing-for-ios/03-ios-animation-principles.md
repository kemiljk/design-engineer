# iOS Animation Principles

> **Quick Summary:** iOS animations feel distinctive because of spring physics and careful choreography. Understanding these principles helps you design motion that feels native, responsive, and physically real.

## What You'll Learn

- Spring animations vs. Bezier curves
- iOS motion principles (Responsive, Meaningful, Coherent)
- Transitions and timing
- Designing with motion

## Spring Animations

If you're coming from the web, you're likely used to "Ease In" and "Ease Out" curves (Bezier curves). iOS works differently. It uses **Spring Physics**.

### Why Springs?
Springs simulate the real world. When you push a physical object, it doesn't just slide and stop; it accelerates, creates momentum, perhaps overshoots slightly, and then settles. This makes the interface feel like a continuous physical surface rather than a series of digital slides.

### Spring Parameters
Instead of duration (e.g., "300ms"), springs are defined by physical properties:
- **Mass:** The weight of the object. Heavier objects move slower.
- **Stiffness:** The tension of the spring. Stiffer springs snap back faster.
- **Damping:** The friction. High damping behaves like moving through water (no bounce); low damping behaves like a rubber band (lots of bounce).

### Common Presets
- **Snappy:** High stiffness, medium damping. Used for small interactions like toggles and button presses.
- **Smooth:** Balanced stiffness and damping. Used for large transitions like pushing a new screen.
- **Bouncy:** Low damping. Used for playful elements like notifications or badges.

## iOS Motion Principles

### Responsive
Motion must respond to user input instantly.
- **Direct Manipulation:** If a user drags a card, it should stick to their finger.
- **Velocity Conservation:** If a user flicks a list, it should continue scrolling with the momentum of the flick, slowing down gradually due to friction.
- **Interruptible:** Users should be able to stop an animation mid-flight. If a menu is opening and the user taps "Close," it shouldn't finish opening before closing; it should reverse instantly.

### Meaningful
Every animation must have a purpose.
- **Hierarchy:** When a folder opens, it expands from its icon, showing where the content came from.
- **Feedback:** When a task fails, the UI might shake, mimicking a head shake.
- **Orientation:** Transitions show direction. Pushing a new screen slides in from the right, implying forward movement. Going back slides away to the right, implying reverse movement.

### Coherent
Animations shouldn't happen in isolation. They should be choreographed. If a card expands, the surrounding content should move out of the way smoothly, not snap to a new position. The entire screen acts as a single fluid surface.

## System Transitions

### Navigation Push/Pop
- **Action:** Tapping an item in a list.
- **Motion:** The new view slides in from the right. The old view slides slightly to the left (parallax) and dims. The navigation bar title cross-fades.
- **Duration:** Approximately 0.35s - 0.5s, but driven by springs.

### Modal Presentation
- **Action:** Tapping a "New Message" button.
- **Motion:** A sheet slides up from the bottom, covering the previous view (which recedes slightly into the background).
- **Feel:** Heavy, substantial. It implies a temporary context.

### Tab Switching
- **Action:** Tapping a tab.
- **Motion:** Instant cross-fade. There is no sliding. This reinforces that tabs are parallel peers, not a sequence.

## Designing Motion

### Specification
"Make it pop" is not a specification. When handing off motion to developers, define:
- **Trigger:** What starts it? (Tap, Drag, Automatic)
- **Parameters:** Stiffness (300), Damping (30). Or use SwiftUI presets like `.bouncy` or `.snappy`.
- **Behavior:** Is it interruptible? Does it track a gesture?

### Example Specification: Button Press
**Touch Down:** Scale to 0.96. Duration: 0.1s. (Fast response)
**Touch Up:** Spring back to 1.0. Bounce: 0.3. (Playful recovery)

## Interactive Animations

The best iOS animations are gesture-driven.

### Characteristics
- **1:1 Tracking:** The animation progress matches the finger's movement exactly.
- **Velocity Handoff:** When the finger lifts, the animation continues with the *velocity of the throw*. This is the secret sauce of iOS scrolling and dismissing.
- **Rubber Banding:** When a user scrolls past the end of a list, the content stretches and bounces back. This physical resistance signals "end of content" without needing a text label.

## Try It Yourself

### Exercise 1: Motion Audit
Open the Photos app.
1.  Tap a photo. Note how it expands from its thumbnail position.
2.  Swipe down on the photo. Note how it shrinks back to the thumbnail.
3.  Try to "throw" the photo closed vs. slowly dragging it. Notice the difference in landing.

### Exercise 2: Animation Spec
Specify the animation for a "Like" heart icon.
- **State 1 (Unliked):** Grey outline.
- **State 2 (Liked):** Red fill.
- **Transition:** Scale up to 1.2 (Overshoot), then settle to 1.0. Spring damping: Low (Bouncy).

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-animation-quiz",
  "type": "multiple-choice",
  "title": "iOS Animation Principles",
  "description": "Test your understanding of iOS motion design.",
  "difficulty": "medium",
  "question": "Why does iOS prefer spring animations over linear or ease-in-out animations?",
  "options": [
    {
      "id": "a",
      "text": "Spring animations are faster to compute",
      "isCorrect": false,
      "explanation": "Performance isn't the reason—it's about feel."
    },
    {
      "id": "b",
      "text": "Springs feel more natural and physical, like real-world objects with momentum",
      "isCorrect": true,
      "explanation": "Correct! Spring animations simulate physics—objects accelerate, overshoot slightly, and settle. This creates a natural, responsive feel that linear animations can't match."
    },
    {
      "id": "c",
      "text": "Linear animations are deprecated in SwiftUI",
      "isCorrect": false,
      "explanation": "Linear animations are still available; springs are preferred for most UI."
    },
    {
      "id": "d",
      "text": "Springs are only used for button presses",
      "isCorrect": false,
      "explanation": "iOS uses springs throughout—sheets, navigation transitions, scrolling."
    }
  ]
}
-->

## Key Takeaways

- Use **Spring Physics** (Mass, Stiffness, Damping) instead of time-based curves.
- Make motion **Responsive** (interruptible) and **Meaningful** (spatial orientation).
- **Interactive animations** track the finger 1:1 and inherit velocity.
- **Rubber banding** and **overshoot** make the interface feel alive.

## Next Steps

Continue to [From Design to SwiftUI](./04-from-design-to-swiftui.md) →
