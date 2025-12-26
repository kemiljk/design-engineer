# Android Motion Principles

> **Quick Summary:** Material motion is choreographed, meaningful, and helps users understand spatial relationships. Learn the principles behind Android's motion language.

## What You'll Learn

- Material motion principles
- Transition patterns
- Choreography and sequencing
- Specifying motion for developers

## Material Motion Principles

### Informative
Motion tells stories:
- Where elements come from
- Where they go
- How they relate

### Focused
Motion guides attention:
- Direct eye to what matters
- Smooth between states
- Don't distract from content

### Expressive
Motion reflects personality:
- Brand through motion
- Appropriate energy level
- Consistent feel

## Transition Patterns

### Container Transform
Element expands into new view:
- Card → Detail screen
- FAB → Full page
- Image → Gallery view

Maintains visual continuity by transforming the originating element.

### Shared Axis
Views shift along shared axis:
- Horizontal: Peer navigation (tabs)
- Vertical: Parent-child (lists)
- Z-axis: Forward-backward

### Fade Through
Quick fade between unrelated views:
- Bottom navigation switches
- Unrelated content
- Clean separation

### Fade
Simpler single-element transitions:
- Elements entering/exiting
- No spatial relationship
- Subtle and quick

## Choreography

### Sequencing
When multiple elements animate:
- Main content first
- Supporting elements follow
- Exit: Supporting first, main last

### Timing
- Quick transitions: 150-200ms
- Standard transitions: 200-300ms
- Complex transitions: 300-500ms

### Easing
Material uses specific easing curves:
- **Emphasised:** For larger, important movements
- **Standard:** Most transitions
- **Emphasised Decelerate:** Entering elements
- **Emphasised Accelerate:** Exiting elements

## Interactive Motion

### Responsive Feedback
Immediate response to touch:
- Ripple effect on touch
- State change animations
- Drag feedback

### Physics-Based
Natural-feeling motion:
- Momentum
- Spring physics
- Realistic deceleration

## Specifying Motion

### For Developers
When documenting motion:
- Pattern name (container transform, fade through)
- Duration
- Easing curve
- Choreography order
- Example or reference

### Example Spec
```
Card → Detail Transition:
- Pattern: Container transform
- Duration: 300ms
- Easing: Emphasised
- Card image becomes hero
- Card title moves to top
- Details fade in after transform
```

## Try It Yourself

### Exercise 1: Pattern Identification

Open Material apps. For each transition, identify:
- Which pattern is used
- What spatial relationship is communicated
- Approximate duration

### Exercise 2: Transition Spec

Design and specify a transition:
- List item to detail view
- What transforms?
- What fades?
- What's the sequence?

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

- Motion is informative, focused, and expressive
- Container transform maintains visual continuity
- Shared axis communicates spatial relationships
- Choreograph sequences thoughtfully
- Specify patterns clearly for developers

## Next Steps

Continue to [From Design to Compose](./04-from-design-to-compose.md) →
