# Motion Design for Android

> **Quick Summary:** Motion in Material Design creates meaning. Learn how to design animations that guide users and bring your Android app to life.

## What You'll Learn

- Material motion principles
- Shared element transitions
- Container transforms
- Designing for Reduce Animations

<!-- illustration: material-motion-system -->

## Material Motion Principles

Motion in Android is not decoration; it is communication. Every animation serves a functional purpose: to orient the user, to explain a relationship between elements, or to provide feedback on an action.

### Motion is Meaningful

When you tap a card and it expands to fill the screen, the motion tells you: *"This screen came from that card."* When you swipe a list item away and it fades out, the motion says: *"This item is gone."* Without these cues, interfaces feel abrupt and confusing, forcing the user to re-orient themselves after every click.

Material Design defines four pillars of motion:

**1. Informative:** Motion should show spatial relationships. If a menu slides out from the left, the user intuitively knows they can swipe left to dismiss it. It builds a mental model of where things "live."

**2. Focused:** Motion guides the eye. When a new notification appears, a subtle animation draws attention to it. Conversely, when loading happens in the background, motion should be minimal to avoid distraction.

**3. Expressive:** Motion is where your brand's personality shines. A banking app might use snappy, precise movements to convey security and efficiency. A meditation app might use slow, fluid easing to evoke calm. Material 3 Expressive introduces spring-based physics that feel playful and organic.

**4. Coherent:** Motion unifies the experience. If one card expands with a spring animation, but another slides in rigidly, the app feels broken. Consistent timing and easing curves tie the interface together.

## Material Motion Patterns

Google has standardized several motion patterns to solve common UI problems. Using these patterns ensures your app feels "native" to the platform.

### Container Transform

The **Container Transform** is the workhorse of Material motion. It is used when an element (like a card or a floating action button) expands to become a new screen.

Imagine a music app. You tap a small album cover (the container). Instead of a hard cut to the album details page, the cover itself expands, morphs, and fills the screen to become the header of the new page. This creates a seamless visual connection—the user never loses track of the object they interacted with.

**Characteristics:**
- The shared boundary expands using an arc or linear path.
- Content inside fades and scales appropriately.
- It is reversible: hitting "Back" shrinks the screen back into the album cover.

### Shared Axis

The **Shared Axis** pattern is used for navigation. It reinforces the relationship between screens by moving them along a specific spatial axis (X, Y, or Z).

**Horizontal (X-Axis):** Used for peer-to-peer navigation, like swiping between tabs or steps in a wizard. As Screen A slides out to the left, Screen B slides in from the right. It feels like moving through a physical sequence.

**Vertical (Y-Axis):** Used for hierarchy. Tapping a "See More" button might slide a new section up from the bottom.

**Depth (Z-Axis):** Used for layers. When a dialog appears, the background recedes (scales down slightly or dims) and the dialog scales up, creating a sense of depth.

### Fade Through

The **Fade Through** pattern is used when there is no strong relationship between the outgoing and incoming content. For example, switching between bottom navigation tabs (Home vs. Profile). Since "Home" doesn't spatially "live" next to "Profile," sliding between them feels wrong. Instead, the current screen fades out, and the new screen fades in. It acts as a palette cleanser, resetting the user's mental context.

## Timing and Easing

Great motion lives and dies by its timing.

**Duration:** Transitions should be fast enough to not block the user, but slow enough to be read.
- **Small (100ms):** For micro-interactions like checking a box.
- **Medium (250ms):** For simple transitions like cards expanding.
- **Large (300ms+):** For full-screen navigations.

**Easing:** Nothing in the real world moves at a constant speed (Linear). Things accelerate and decelerate.
- **Standard Easing (Ease-in-out):** Start slow, speed up, end slow. Use this for almost everything. It feels natural.
- **Emphasized Easing:** A dramatic curve that starts fast and ends with a long, slow settle. Use this to draw attention to elements entering the screen.

## Designing Transitions

### The "Hero" Transition

Creating a seamless hero transition (like the Container Transform) requires planning. You need to identify the **Shared Elements**—the parts of the UI that exist in both the start and end states.

In a "List to Detail" transition:
1.  **Start State:** A list item containing a thumbnail, title, and subtitle.
2.  **End State:** A detail screen with a large header image, title, and body text.
3.  **The Bridge:** The thumbnail becomes the header image. The title moves from list position to header position. The background color expands to fill the view.

When you specify this for developers, you don't just say "animate it." You identify these shared keys so the transition engine knows what to morph.

### Bottom Sheet Transitions

Bottom sheets are standard in Android. They should slide up from the bottom edge (Y-Axis). Crucially, a **Scrim** (a semi-transparent black overlay) should fade in behind the sheet. This visual dimmer tells the user, "The content behind is paused; focus here."

## Documenting Motion

Motion is notoriously hard to hand off. Static screenshots don't show movement. You need a Motion Spec.

A good motion spec includes:
- **Trigger:** What starts it? (Tap, Scroll, Load)
- **Duration:** How long does it take? (300ms)
- **Easing:** Which curve? (Standard, Emphasized)
- **Properties:** What changes? (Opacity 0% -> 100%, Scale 0.8 -> 1.0)

```markdown
## Card Expansion Spec

**Type:** Container Transform
**Duration:** 300ms
**Easing:** Emphasized

**Sequence:**
1. Card container expands to fill screen (0-300ms)
2. Thumbnail image scales to become Header (0-300ms)
3. Body text fades in (Start delay: 100ms, Duration: 200ms)
```

## Reduce Animations

Accessibility extends to motion. Some users suffer from vestibular disorders where excessive motion causes nausea or dizziness. Android has a system-wide setting called "Remove animations."

**Respect the Preference:**
If your app detects this setting is on, you must disable large, sweeping movements.
- Replace the "Container Transform" with a simple "Fade."
- Remove parallax effects.
- Stop auto-playing videos or carousels.

However, do **not** remove all feedback. A user still needs to know that a button was pressed. Keep subtle opacity changes or color shifts, but remove the physical movement.

## Try It Yourself

### Exercise 1: Pattern Identification

Open Google Photos or Gmail on Android. Tap an email or photo. Watch closely.
1. Does it slide in? Does it expand?
2. Does the background fade?
3. How long does it take?
Try to name the specific Material pattern being used (Container Transform, Shared Axis, Fade Through).

### Exercise 2: Transition Design

Sketch a transition for a "Music Player" app.
Start with a "Now Playing" bar at the bottom of the screen.
End with the full-screen "Player" view.
- How does the bar become the full screen?
- What happens to the Play/Pause button?
- What happens to the album art?
Write a mini-spec for this transition.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-motion-quiz",
  "type": "multiple-choice",
  "title": "Material Motion",
  "description": "Test your understanding of Android motion design.",
  "difficulty": "medium",
  "question": "Which Material motion pattern should you use when a card expands to show its full detail view?",
  "options": [
    {
      "id": "a",
      "text": "Fade Through",
      "isCorrect": false,
      "explanation": "Fade Through is for unrelated content changes, not for showing relationships."
    },
    {
      "id": "b",
      "text": "Container Transform",
      "isCorrect": true,
      "explanation": "Correct! Container Transform creates a visual connection between the card and its detail view by morphing one into the other, maintaining spatial relationship."
    },
    {
      "id": "c",
      "text": "Shared Axis (X)",
      "isCorrect": false,
      "explanation": "Shared Axis X is for peer navigation like tabs, not for card expansion."
    },
    {
      "id": "d",
      "text": "Fade",
      "isCorrect": false,
      "explanation": "Simple fade doesn't show the spatial relationship between card and detail."
    }
  ]
}
-->

## Key Takeaways

- Motion communicates hierarchy, focus, and feedback.
- Use **Container Transforms** to connect a summary to its details.
- Use **Shared Axis** to show navigation direction (forward/backward).
- Use **Fade Through** to switch between unrelated sections (tabs).
- Always define Duration and Easing in your specs.
- Respect the user's choice to reduce motion for accessibility.

## Next Steps

Continue to [Designing for Device Variety](./04-designing-for-device-variety.md) →
