---
estimatedTime: 12
---

# Keyframe Animations

> **Quick Summary:** Keyframe animations enable complex, multi-stage animations that run automatically—perfect for loading states, attention-grabbing effects, and entrance animations.

## What You'll Learn

- Creating keyframe animations
- Animation properties and timing
- Common animation patterns
- Performance optimisation
- Accessibility considerations

## What Are Keyframe Animations?

While transitions animate between two states, keyframes define multi-stage animations:

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.element {
  animation: fadeIn 0.5s ease;
}
```

## Defining Keyframes

### From/To Syntax

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Percentage Syntax

For more complex sequences:

```css
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
```

### Multiple Stops

```css
@keyframes colorPulse {
  0%, 100% { background: blue; }
  25% { background: purple; }
  50% { background: red; }
  75% { background: orange; }
}
```

## Animation Properties

```css
.element {
  animation-name: fadeIn;
  animation-duration: 0.5s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;        /* Number or 'infinite' */
  animation-direction: normal;          /* normal, reverse, alternate */
  animation-fill-mode: none;           /* none, forwards, backwards, both */
  animation-play-state: running;       /* running, paused */
}
```

### Shorthand

```css
.element {
  animation: name duration timing-function delay iteration-count direction fill-mode;
  animation: fadeIn 0.5s ease 0s 1 normal forwards;
}
```

### Fill Mode

Controls what happens before and after the animation:

```css
.element {
  animation-fill-mode: none;      /* Return to original state */
  animation-fill-mode: forwards;  /* Keep final keyframe state */
  animation-fill-mode: backwards; /* Apply first keyframe during delay */
  animation-fill-mode: both;      /* Both forwards and backwards */
}
```

**Most common:** Use `forwards` when you want the element to stay in its final animated state.

## Common Animation Patterns

### Fade In

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.3s ease forwards;
}
```

### Slide In

```css
@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-in {
  animation: slideIn 0.4s ease forwards;
}
```

### Pulse

```css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.pulse {
  animation: pulse 2s ease infinite;
}
```

### Spin (Loading)

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

### Shake (Error)

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.3s ease;
}
```

## Transform Property

Transforms are the most performant properties to animate:

```css
.element {
  transform: translateX(100px);  /* Move horizontally */
  transform: translateY(50px);   /* Move vertically */
  transform: translate(100px, 50px);
  
  transform: scale(1.5);         /* Enlarge */
  transform: scaleX(2);          /* Stretch horizontally */
  
  transform: rotate(45deg);      /* Rotate */
  
  transform: skew(10deg);        /* Skew */
}
```

### Multiple Transforms

```css
.element {
  transform: translateX(100px) rotate(45deg) scale(1.2);
}
```

### Transform Origin

```css
.element {
  transform-origin: center;      /* Default */
  transform-origin: top left;
  transform-origin: 50% 100%;
}
```

## Performance

Not all properties animate efficiently.

### Performant Properties

These animate on the GPU (compositor layer):
- `transform`
- `opacity`

These are "cheap" to animate and won't cause jank.

### Expensive Properties

These trigger layout recalculation:
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `font-size`

These cause reflow and are much slower.

### Best Practice

Prefer `transform` over changing position/size:

```css
/* Expensive - causes layout recalculation */
.bad {
  left: 0;
  transition: left 0.3s;
}
.bad:hover {
  left: 100px;
}

/* Performant - GPU accelerated */
.good {
  transform: translateX(0);
  transition: transform 0.3s;
}
.good:hover {
  transform: translateX(100px);
}
```

### will-change

Hint to browser about upcoming animations:

```css
.element {
  will-change: transform;
}
```

**Use sparingly.** It consumes GPU memory. Only apply to elements that will actually animate, and consider removing it after animation completes.

## Accessibility

### Reduced Motion

Some users experience motion sickness or distraction from animations. Respect their preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Or be more selective:

```css
@media (prefers-reduced-motion: reduce) {
  .decorative-animation {
    animation: none;
  }
  
  .functional-transition {
    transition-duration: 0.1s;  /* Reduce but keep functional */
  }
}
```

### Essential vs Decorative Motion

- **Essential:** Provides feedback, indicates state changes
- **Decorative:** Pure visual flair

Essential motion can be kept (perhaps reduced). Decorative motion should respect the preference completely.

## Try It Yourself

### Exercise 1: Loading Spinner

Create a CSS-only loading spinner with:
- Circular shape (border with transparent sides)
- Infinite rotation animation
- `linear` timing function

### Exercise 2: Card Entrance

Create cards that animate in when the page loads:
- Fade in from below
- Stagger the delay for each card
- Use `forwards` fill mode

### Exercise 3: Notification

Create a notification that:
- Slides in from the right
- Has a subtle pulse to draw attention
- Can be dismissed (slides out)

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "css-keyframes-quiz",
  "type": "multiple-choice",
  "title": "Keyframe Animations",
  "description": "Test your understanding of CSS animation performance.",
  "difficulty": "medium",
  "question": "Which properties should you prefer to animate for best performance?",
  "options": [
    {
      "id": "a",
      "text": "width, height, and margin for size changes",
      "isCorrect": false,
      "explanation": "These properties trigger layout recalculation (reflow) which is expensive."
    },
    {
      "id": "b",
      "text": "transform and opacity, because they can be GPU-accelerated",
      "isCorrect": true,
      "explanation": "Correct! transform and opacity don't trigger layout or paint—they're compositor-only properties that can be GPU-accelerated, making them much smoother."
    },
    {
      "id": "c",
      "text": "Any property is fine as long as the animation is short",
      "isCorrect": false,
      "explanation": "Even short animations of layout properties can cause jank. Property choice matters."
    },
    {
      "id": "d",
      "text": "background-colour and border for visual effects",
      "isCorrect": false,
      "explanation": "These trigger paint, which is better than layout but still not as smooth as transform/opacity."
    }
  ]
}
-->

## Key Takeaways

- Keyframe animations define multi-stage sequences with `@keyframes`
- Use `animation-fill-mode: forwards` to keep final state
- `transform` and `opacity` are the most performant properties
- Always respect `prefers-reduced-motion` for accessibility
- Keep animations purposeful—feedback and guidance, not just decoration

## Next Steps

Congratulations! You've completed the CSS Mastery module.

You now understand:
- How CSS works (cascade, specificity, inheritance)
- Selectors and pseudo-elements
- The box model
- Layout with Flexbox and Grid
- Responsive design
- Custom properties
- Transitions and animations

Continue to [JavaScript Essentials: What is JavaScript](../03-javascript-essentials/01-what-is-javascript.md) →

