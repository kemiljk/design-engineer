# Android Motion Principles

> **Quick Summary:** Material motion is choreographed, meaningful, and helps users understand spatial relationships. Unlike decoration, these animations explain where things come from and where they go.

## What You'll Learn

- Material motion principles
- Transition patterns (Container Transform, Shared Axis)
- Choreography and sequencing
- Specifying motion for developers

## Material Motion Principles

### Informative
Motion tells a story. It shows the user the spatial relationship between two views. If a card expands to fill the screen, the user understands that the new screen *is* the card. This preserves mental context.

### Focused
Motion guides attention. A ripple effect confirms a touch. A shared axis transition draws the eye to the new content entering the screen. It should never distract from the task at hand.

### Expressive
Motion reflects personality. A banking app might use snappy, direct transitions to convey efficiency. A music app might use looser, bouncier curves to convey playfulness.

### M3 Expressive Motion
Material 3 Expressive takes this further with **Spring-based physics**. Elements can overshoot and bounce, feeling physically real. **Variable fonts** can animate their weight when pressed, and **Shapes** can morph fluidly from circle to square.

## Transition Patterns

Material Design defines four core transition patterns.

### Container Transform
This is the star of Material motion. An element (like a Card or FAB) seamlessly expands to become a new page.
- **Example:** Tapping a music album card expands it into the "Now Playing" screen.
- **Why:** It creates a direct connection between the item and its details.

### Shared Axis
Views slide in and out along a shared axis (X, Y, or Z).
- **X-Axis:** For lateral navigation, like switching tabs.
- **Y-Axis:** For hierarchical navigation, like drilling down into a list.
- **Z-Axis:** For moving forward/backward in tasks.
- **Why:** It reinforces the mental model of the app's structure.

### Fade Through
The outgoing screen fades out while the incoming screen fades in.
- **Example:** Tapping a bottom navigation bar item.
- **Why:** It signifies a total context switch. The new screen is not related to the old one; we are teleporting to a new section.

### Fade
A simple enter/exit transition.
- **Example:** A dialog appearing.
- **Why:** Used for elements that don't have a strong spatial relationship to the rest of the UI.

## Choreography

### Sequencing
When multiple elements enter the screen, they shouldn't appear all at once (which looks chaotic) or one-by-one slowly (which feels sluggish).
- **Sequence:** Main content appears first. Secondary content follows quickly.
- **Group:** Group small items together so they animate as a block.

### Timing
- **Quick:** 150-200ms for small UI changes (checkboxes).
- **Standard:** 200-300ms for navigation transitions.
- **Complex:** 300-500ms for large, elaborate movements.
Anything longer than 400ms usually feels too slow for frequent interactions.

### Easing
- **Standard:** The default for most UI. Starts quickly, ends slowly.
- **Emphasized:** For expressive movement. Starts slow, speeds up, ends slow.
- **Decelerate:** For entering elements (slowing down to a stop).
- **Accelerate:** For exiting elements (speeding up to leave).

## Interactive Motion

### Responsive Feedback
The interface must acknowledge touch instantly.
- **Ripple:** The ink-spread effect on touch.
- **Elevation:** Elements lifting up when dragged.

### Physics-Based
Motion should feel natural. Using springs instead of linear tweens allows animations to inherit the velocity of the user's gesture. If you flick a card away, it should fly out at the speed of your flick.

## Specifying Motion

### For Developers
"Make it smooth" is not a spec. You must define:
- **Pattern:** "Use Container Transform."
- **Duration:** "300ms."
- **Curve:** "Emphasized Easing."
- **Properties:** "Scale from 0.8 to 1.0, Fade from 0% to 100%."

### Example Spec: Card → Detail
- **Pattern:** Container Transform
- **Duration:** 300ms
- **Curve:** Emphasized
- **Transformation:** The card image scales to become the header image. The card body text fades out as the detail text fades in.

## Try It Yourself

### Exercise 1: Pattern Identification
Open Google Photos or Play Store. Tap an item. Does it expand (Container Transform) or slide (Shared Axis)? Tap a bottom nav tab. Does it fade (Fade Through)?

### Exercise 2: Transition Spec
Design a transition for a "Compose" FAB turning into a "New Email" screen.
- **Pattern:** Container Transform.
- **Start:** 56x56dp Circle (FAB).
- **End:** Full Screen Rectangle.
- **Motion:** The circle expands, morphs to a rectangle, and the content fades in.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-motion-quiz",
  "type": "multiple-choice",
  "title": "Android Motion Principles",
  "description": "Test your understanding of Material motion.",
  "difficulty": "medium",
  "question": "What is 'container transform' in Material motion?",
  "options": [
    {
      "id": "a",
      "text": "Changing the colour of a container",
      "isCorrect": false,
      "explanation": "Container transform is about spatial transformation, not colour."
    },
    {
      "id": "b",
      "text": "A transition where one element smoothly morphs into another, maintaining spatial continuity",
      "isCorrect": true,
      "explanation": "Correct! Container transform transitions an element (like a FAB or card) into a new view while maintaining visual continuity. It shows the relationship between origin and destination."
    },
    {
      "id": "c",
      "text": "Resizing a container when content changes",
      "isCorrect": false,
      "explanation": "While related, container transform is specifically about view transitions."
    },
    {
      "id": "d",
      "text": "A CSS animation property",
      "isCorrect": false,
      "explanation": "Container transform is a Material motion pattern, not a CSS property."
    }
  ]
}
-->

## Key Takeaways

- **Motion informs**; it is not just decoration.
- **Container Transform** connects a parent item to its detail view.
- **Shared Axis** reinforces navigation direction (X, Y, Z).
- **Choreography** prevents chaos by sequencing elements meaningfully.
- **Physics** makes interaction feel responsive and natural.

## Next Steps

Continue to [From Design to Compose](./04-from-design-to-compose.md) →
