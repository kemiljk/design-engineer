# Android Motion Principles

> **Quick Summary:** Material motion is choreographed, meaningful, and helps users understand spatial relationships. Unlike decoration, these animations explain where things come from and where they go.

## What You'll Learn

- Principles of Material motion
- Foundational transition patterns (Container Transform, Shared Axis)
- Importance of choreography and sequencing in animations
- How to effectively specify motion requirements for developers

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
For example, tapping a music album card that expands into a full "Now Playing" screen creates a direct and meaningful connection between the item and its subsequent details.

### Shared Axis
Views slide in and out along a shared axis (X, Y, or Z).
Views slide along a shared axis to reinforce structural relationships: **X-Axis** for lateral navigation between tabs or peers, **Y-Axis** for hierarchical drilling into lists, and **Z-Axis** for moving through task steps.

### Fade Through
The outgoing screen fades out while the incoming screen fades in.
A common example is tapping a bottom navigation bar item, which signifies a total context switch; it informs the user that we are effectively teleporting to a new section that may not be spatially related to the previous one.

### Fade
A simple enter/exit transition.
This is typically used for elements like appearing dialogs that lack a strong spatial relationship to the rest of the interface.

## Choreography

### Sequencing
When multiple elements enter the screen, they shouldn't appear all at once (which looks chaotic) or one-by-one slowly (which feels sluggish).
Maintaining a clear sequence ensures that main content appears first followed quickly by secondary elements, while grouping small items allows them to animate together as a cohesive block.

### Timing
Standard UI changes for elements like checkboxes should be **Quick** (150-200ms), while navigation transitions typically require a **Standard** duration (200-300ms), and large, elaborate movements for **Complex** transitions may extend to 300-500ms.
Anything longer than 400ms usually feels too slow for frequent interactions.

### Easing
Easing choices define the character of motion, from the **Standard** curve for general UI and the **Emphasized** curve for expressive focus, to **Decelerate** and **Accelerate** curves for entering and exiting elements respectively.

## Interactive Motion

### Responsive Feedback
The interface must acknowledge touch instantly.
The interface acknowledges touch instantly through effects like the ink-spread ripple or by having elements lift up through elevation changes when they are dragged.

### Physics-Based
Motion should feel natural. Using springs instead of linear tweens allows animations to inherit the velocity of the user's gesture. If you flick a card away, it should fly out at the speed of your flick.

## Specifying Motion

### For Developers
"Make it smooth" is not a spec. You must define:
When specifying motion for development, you must provide the pattern type (such as Container Transform), the exact duration in milliseconds, the easing curve name, and the specific property changes like scale and opacity levels.

### Example Spec: Card → Detail
An example specification for a card-to-detail transition would define the pattern as Container Transform over a 300ms duration using an Emphasized curve. This transformation might involve the card image scaling to become the header image while the card body text fades out as the detail content fades in.

## Try It Yourself

### Exercise 1: Pattern Identification
Open Google Photos or Play Store. Tap an item. Does it expand (Container Transform) or slide (Shared Axis)? Tap a bottom nav tab. Does it fade (Fade Through)?

### Exercise 2: Transition Spec
Design a transition for a "Compose" FAB turning into a "New Email" screen.
Design a transition for a "Compose" FAB turning into a "New Email" screen using a Container Transform pattern. The animation should smoothly morph a 56x56dp circular Floating Action Button into a full-screen rectangle as the content fluidly fades into view.

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

Motion serves as an informative tool rather than mere decoration, with Container Transform and Shared Axis patterns reinforcing navigation and the relationship between structural items. By employing meaningful choreography to sequence elements and physics-based interactions that feel organic, you can create a responsive interface that acknowledges every user gesture naturally.

## Next Steps

Continue to [From Design to Compose](./04-from-design-to-compose.md) →
