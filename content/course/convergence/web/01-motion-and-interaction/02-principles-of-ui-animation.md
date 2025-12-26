# Principles of UI Animation

> **Quick Summary:** Great UI animation follows principles that make motion feel natural, intentional, and helpful rather than jarring or gratuitous.

## What You'll Learn

- Timing and duration guidelines
- Easing functions and their uses
- Choreography and sequencing
- Motion design principles from Disney

## Timing and Duration

Animation duration depends on purpose and distance:

### Quick Feedback (100-200ms)
- Button hover states
- Checkbox toggles
- Colour transitions

### Standard Interactions (200-300ms)
- Dropdown menus
- Modal appearances
- Tab switches

### Complex Transitions (300-500ms)
- Page transitions
- Large layout shifts
- Multi-step sequences

### Rule of Thumb
- Short distances → faster animation
- Large distances → slower animation
- Repetitive actions → faster
- Important reveals → slower

## Easing Functions

Easing controls acceleration and deceleration.

<!-- illustration: easing-curves -->

### Linear
```css
transition-timing-function: linear;
```
Constant speed. Feels mechanical and robotic. Rarely use for UI.

### Ease-Out (Deceleration)
```css
transition-timing-function: ease-out;
```
Starts fast, ends slow. Best for **entrances**—elements arriving on screen.

### Ease-In (Acceleration)
```css
transition-timing-function: ease-in;
```
Starts slow, ends fast. Best for **exits**—elements leaving screen.

### Ease-In-Out
```css
transition-timing-function: ease-in-out;
```
Slow start and end. Good for **position changes** and loops.

### Custom Cubic Bezier
```css
transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
```
Create custom curves for unique feels. The example above creates an "overshoot" effect.

## Choreography

When multiple elements animate, coordinate them:

### Stagger
Elements animate in sequence with slight delays:
```css
.item:nth-child(1) { transition-delay: 0ms; }
.item:nth-child(2) { transition-delay: 50ms; }
.item:nth-child(3) { transition-delay: 100ms; }
```

### Shared Motion
Related elements move together—expanding dropdown arrows rotate as menus open.

### Hierarchy
More important elements animate first or more prominently.

## Disney's 12 Principles (Applied to UI)

### Squash and Stretch
Elements can compress and expand subtly—buttons squishing slightly on press.

### Anticipation
Small wind-up before action—button scaling down before bouncing up.

### Staging
Direct attention through motion—dimming background while modal enters.

### Follow Through
Momentum continues after stopping—slight overshoot then settle back.

### Slow In, Slow Out
The essence of easing—objects accelerate and decelerate naturally.

### Secondary Action
Supporting motion—ripple effect on button click, shadow growing on hover.

### Timing
As discussed—duration affects personality and clarity.

### Exaggeration
Amplify for clarity—larger scale changes to ensure they're noticed.

## Try It Yourself

### Exercise 1: Timing Comparison

Create a button that scales on hover. Test:
- 100ms duration
- 200ms duration
- 500ms duration

Note how each feels.

### Exercise 2: Easing Experiments

Apply different easing to a sliding panel:
- Linear
- Ease-out
- Cubic-bezier with overshoot

Which feels most natural?

### Exercise 3: Staggered List

Create a list that animates in with staggered delays. Experiment with:
- Delay increment (30ms vs 100ms)
- Total animation duration

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "animation-timing-quiz",
  "type": "multiple-choice",
  "title": "Animation Principles",
  "description": "Test your understanding of animation timing.",
  "difficulty": "medium",
  "question": "Why should UI animations typically be between 200-500ms?",
  "options": [
    {
      "id": "a",
      "text": "That's what CSS defaults to",
      "isCorrect": false,
      "explanation": "CSS doesn't have specific timing defaults. This is based on user perception."
    },
    {
      "id": "b",
      "text": "Faster feels instant but too quick to follow; slower feels sluggish and wasteful of time",
      "isCorrect": true,
      "explanation": "Correct! This range is perceptible but not disruptive. Under 200ms can feel jarring; over 500ms feels slow and delays the user unnecessarily."
    },
    {
      "id": "c",
      "text": "Browsers can't render animations faster than 200ms smoothly",
      "isCorrect": false,
      "explanation": "Browsers can render much faster animations smoothly at 60fps."
    },
    {
      "id": "d",
      "text": "WCAG requires animations to be at least 200ms",
      "isCorrect": false,
      "explanation": "WCAG doesn't specify minimum animation duration."
    }
  ]
}
-->

## Key Takeaways

- Duration: 100-300ms for most interactions
- Use ease-out for entrances, ease-in for exits
- Choreograph multiple animations with staggers and hierarchy
- Apply Disney principles subtly for natural-feeling motion
- Always test animations at different speeds

## Next Steps

Continue to [Micro-interactions](./03-micro-interactions.md) →
