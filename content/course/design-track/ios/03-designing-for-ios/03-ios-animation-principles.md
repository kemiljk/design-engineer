# iOS Animation Principles

> **Quick Summary:** iOS animations feel distinctive because of spring physics and careful choreography. Understanding these principles helps you design motion that feels native.

## What You'll Learn

- Spring animations
- iOS motion principles
- Transitions and timing
- Designing with motion

## Spring Animations

iOS uses spring physics, not bezier curves:

### Why Springs?
- Feel more natural
- Respond to velocity
- Interruptible smoothly
- Match physical intuition

### Spring Parameters
- **Mass:** Weight of object
- **Stiffness:** Spring tension
- **Damping:** Friction/resistance
- **Initial Velocity:** Starting momentum

### Common Presets
- **Snappy:** Quick, responsive (buttons, toggles)
- **Smooth:** Balanced (most UI elements)
- **Bouncy:** Playful overshoot (notifications, badges)

## iOS Motion Principles

### Responsive
Motion responds to user input:
- Interactive gestures
- Velocity-based animations
- Interruptible at any time

### Meaningful
Every animation has purpose:
- Show relationships
- Provide feedback
- Guide attention

### Coherent
Animations work together:
- Consistent timing feel
- Coordinated choreography
- Unified motion language

## System Transitions

### Navigation Push/Pop
- Content slides from right
- Previous content scales slightly
- Navbar cross-fades
- ~0.35 seconds

### Modal Presentation
- Sheet slides from bottom
- Background dims/scales
- Spring-based with slight bounce
- Can be dismissed interactively

### Tab Switching
- Cross-fade between tabs
- Quick, nearly instant
- No directional animation

## Designing Motion

### Specification
When specifying animation:
- Describe the intent
- Note spring characteristics
- Reference iOS system animations
- Include before/after states

### In Prototypes
- Use spring curves when possible
- Match iOS timing feel
- Test on actual devices
- Prototype key interactions

### Example Specification

**Button Tap Animation:**

| Property | Value |
|----------|-------|
| Touch down | Scale to 0.96 |
| Release | Spring back to 1.0 |
| Spring stiffness | 400 |
| Spring damping | 30 |
| Feel | Quick, responsive snap |

## Interactive Animations

Many iOS animations are gesture-driven:

### Characteristics
- Tied to gesture progress
- Velocity affects outcome
- Can change direction mid-gesture
- Feel physically connected

### Examples
- Swipe to go back
- Pull to refresh
- Interactive dismissal
- Rubber banding at scroll bounds

## Try It Yourself

### Exercise 1: Motion Audit

Use your iPhone and note animations:
- What feels springy?
- What's interruptible?
- What feels connected to your gesture?

### Exercise 2: Animation Spec

Specify animation for a button press:
- What happens on touch down?
- What happens on release?
- What spring characteristics?

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

- iOS uses spring physics for natural feel
- Animations are responsive and interruptible
- System transitions follow consistent patterns
- Specify motion by intent and feel, not just curves
- Interactive animations connect gesture to result

## Next Steps

Continue to [From Design to SwiftUI](./04-from-design-to-swiftui.md) →
