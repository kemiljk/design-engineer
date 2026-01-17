# Motion Design for Android

> **Quick Summary:** Motion in Material Design creates meaning. It is not just decoration; it explains spatial relationships and provides feedback. Learn how to design animations that guide users and bring your Android app to life.

## Material Motion Principles

### Informative
Motion tells a story. It shows the user the spatial relationship between two views. If a card expands to fill the screen, the user understands that the new screen *is* the card. This preserves mental context.

### Focused
Motion guides attention. A ripple effect confirms a touch. A shared axis transition draws the eye to the new content entering the screen. It should never distract from the task at hand.

### Expressive
Motion reflects personality. A banking app might use snappy, precise movements to convey security. A music app might use looser, bouncier curves to convey playfulness. Material 3 Expressive introduces **Spring-based physics** that feel physically real.

## Transition Patterns

Material Design defines four core transition patterns to solve common UI problems.

### Container Transform
The **Container Transform** is the workhorse of Material motion. It seamlessly expands an element (like a Card or FAB) into a new page.
- **Example:** Tapping a music album card expands it into the "Now Playing" screen.
- **Why:** It creates a direct visual connection between the item and its details.

### Shared Axis
Views slide in and out along a shared axis (X, Y, or Z).
- **X-Axis:** For lateral navigation (tabs).
- **Y-Axis:** For hierarchical navigation (lists).
- **Z-Axis:** For moving forward/backward in tasks.
- **Why:** It reinforces the mental model of the app's structure.

### Fade Through
The outgoing screen fades out while the incoming screen fades in.
- **Example:** Tapping a bottom navigation bar item.
- **Why:** It signifies a total context switch. The new screen is not related to the old one; we are "teleporting" to a new section.

### Fade
A simple enter/exit transition for elements like dialogs that don't have a strong spatial relationship to the rest of the UI.

## Choreography

### Sequencing
When multiple elements enter the screen, sequence them. Main content appears first, followed quickly by secondary content. Group small items so they animate as a block rather than creating visual noise.

### Timing
- **Quick (100ms):** Micro-interactions.
- **Standard (300ms):** Navigation transitions.
- **Complex (500ms):** Large, elaborate movements.
Anything longer than 400ms usually feels too slow for frequent interactions.

### Easing
- **Standard Easing:** Start slow, speed up, end slow. The default.
- **Emphasized Easing:** Starts slow, speeds up significantly, ends with a long settle. Use this to draw attention.

## Interactive Motion

The interface must acknowledge touch instantly.
- **Ripple:** The ink-spread effect on touch.
- **Physics:** Using springs instead of linear tweens allows animations to inherit the velocity of the user's gesture. If you flick a card away, it should fly out at the speed of your flick.

## Specifying Motion

"Make it smooth" is not a spec. You must define:
- **Pattern:** "Container Transform."
- **Duration:** "300ms."
- **Curve:** "Emphasized Easing."
- **Properties:** "Scale 0.8 to 1.0, Fade 0% to 100%."

## Reduce Animations

Accessibility extends to motion. Some users suffer from vestibular disorders. Android has a "Remove animations" setting.
**Respect the Preference:** If this is on, replace sweeping movements with simple fades. Keep subtle feedback (like color changes), but remove the physical movement.

## Try It Yourself

### Exercise 1: Pattern Identification
Open Google Photos. Tap a photo. Does it expand (Container Transform)? Tap a bottom nav tab. Does it fade (Fade Through)?

### Exercise 2: Transition Spec
Design a transition for a "Compose" FAB turning into a "New Email" screen.
- **Pattern:** Container Transform.
- **Motion:** The circle expands, morphs to a rectangle, and the content fades in.

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

- **Motion informs**; it is not just decoration.
- **Container Transform** connects a parent item to its detail view.
- **Shared Axis** reinforces navigation direction.
- **Choreography** prevents visual chaos.
- **Physics** makes interaction feel responsive and natural.

## Next Steps

Continue to [Designing for Device Variety](./04-designing-for-device-variety.md) →
