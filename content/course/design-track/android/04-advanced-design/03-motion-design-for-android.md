# Motion Design for Android

> **Quick Summary:** Motion in Material Design creates meaning. It is not just decoration; it explains spatial relationships and provides feedback. Learn how to design animations that guide users and bring your Android app to life.

## What You'll Learn

- Material motion principles (informative, focused, expressive)
- Core transition patterns (Container Transform, Shared Axis, Fade Through, Fade)
- Spring-based physics in Material 3 Expressive
- How to design motion that guides users and provides feedback

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
For example, tapping a music album card that expands into a full "Now Playing" screen creates a direct and meaningful connection between the item and its subsequent details.

### Shared Axis
Views slide in and out along a shared axis (X, Y, or Z).
Views slide along a shared axis to reinforce structural relationships: **X-Axis** for lateral navigation between tabs or peers, **Y-Axis** for hierarchical drilling into lists, and **Z-Axis** for moving through task steps.

### Fade Through
The outgoing screen fades out while the incoming screen fades in.
A common example is tapping a bottom navigation bar item, which signifies a total context switch; it informs the user that we are effectively teleporting to a new section that may not be spatially related to the previous one.

### Fade
A simple enter/exit transition for elements like dialogs that don't have a strong spatial relationship to the rest of the UI.

## Choreography

### Sequencing
When multiple elements enter the screen, sequence them. Main content appears first, followed quickly by secondary content. Group small items so they animate as a block rather than creating visual noise.

### Timing
Standard UI changes for elements like checkboxes should be **Quick** (100ms), while navigation transitions typically require a **Standard** duration (300ms), and large, elaborate movements for **Complex** transitions may extend to 500ms.
Anything longer than 400ms usually feels too slow for frequent interactions.

### Easing
Easing choices define the character of motion, from the **Standard** curve for general UI and the **Emphasized** curve for expressive focus that draws the user's attention.

## Interactive Motion

The interface must acknowledge touch instantly.
The interface acknowledges touch instantly through ripple effects and physics-based springs that allow animations to inherit user velocity, ensuring that if a card is flicked away, it flies out at a natural, expected speed.

## Specifying Motion

"Make it smooth" is not a spec. You must define:
When specifying motion for development, you must provide the pattern type (such as Container Transform), the exact duration in milliseconds, the easing curve name, and the specific property changes like scale and opacity levels.

## Reduce Animations

Accessibility extends to motion. Some users suffer from vestibular disorders. Android has a "Remove animations" setting.
**Respect the Preference:** If this is on, replace sweeping movements with simple fades. Keep subtle feedback (like colour changes), but remove the physical movement.

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

- Motion serves as an informative tool rather than mere decoration, with Container Transform
- Shared Axis patterns reinforcing navigation Shared Axis patterns reinforcing navigation
- the relationship between structural items the relationship between structural items
- By employing meaningful choreography to prevent visual chaos

## Next Steps

Continue to [Designing for Device Variety](./04-designing-for-device-variety.md) →
