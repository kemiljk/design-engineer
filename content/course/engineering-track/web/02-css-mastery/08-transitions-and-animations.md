# Transitions and Animations

> **Quick Summary:** CSS transitions and animations bring interfaces to life—providing feedback, guiding attention, and creating polished experiences.

## What You'll Learn

- CSS transitions for state changes
- Keyframe animations for complex sequences
- Timing functions and easing
- Performance considerations

## Transitions

Transitions animate changes between states:

```css
.button {
  background: blue;
  transition: background 0.2s ease;
}

.button:hover {
  background: darkblue;
}
```

The colour change animates over 0.2 seconds instead of instantly.

### Transition Properties

```css
.element {
  transition-property: background;   /* What to animate */
  transition-duration: 0.2s;         /* How long */
  transition-timing-function: ease;  /* Acceleration curve */
  transition-delay: 0s;              /* Wait before starting */
}
```

### Shorthand

```css
.element {
  transition: property duration timing-function delay;
  transition: background 0.2s ease 0s;
}
```

### Multiple Transitions

```css
.element {
  transition: 
    background 0.2s ease,
    transform 0.3s ease,
    box-shadow 0.2s ease;
}
```

Or transition all animatable properties:

```css
.element {
  transition: all 0.2s ease;
}
```

Use `all` sparingly. It can cause unexpected animations and performance issues.

### What Can Be Transitioned?

Most properties with numeric values:
- Colors (`colour`, `background-colour`)
- Dimensions (`width`, `height`, `padding`, `margin`)
- Position (`top`, `left`, with `position: relative/absolute`)
- Transforms (`transform`)
- Opacity

Can't be transitioned:
- `display`
- `font-family`
- Discrete values (`visibility` partially works)

## Timing Functions

Timing functions control acceleration:

### Built-in Functions

```css
.element {
  transition-timing-function: linear;      /* Constant speed */
  transition-timing-function: ease;        /* Slow-fast-slow (default) */
  transition-timing-function: ease-in;     /* Slow start */
  transition-timing-function: ease-out;    /* Slow end */
  transition-timing-function: ease-in-out; /* Slow start and end */
}
```

### Custom Cubic Bezier

```css
.element {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

Tools like cubic-bezier.com help create custom curves.

### Steps

For frame-by-frame animation:

```css
.element {
  transition-timing-function: steps(4, end);
}
```

## Keyframe Animations

For more complex, multi-stage animations:

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

### Multiple Keyframes

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

### Animation Properties

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

What happens before/after animation:

```css
.element {
  animation-fill-mode: none;      /* Return to original state */
  animation-fill-mode: forwards;  /* Keep final keyframe state */
  animation-fill-mode: backwards; /* Apply first keyframe during delay */
  animation-fill-mode: both;      /* Both forwards and backwards */
}
```

## Common Animations

### Fade In

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.3s ease;
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
  animation: slideIn 0.4s ease;
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

### Spin

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

### Shake

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

Transforms are commonly animated for performance:

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

These are "cheap" to animate.

### Expensive Properties

These trigger layout recalculation:
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `font-size`

These cause reflow and are slower.

### Best Practice

Prefer `transform` over changing position/size:

```css
/* Expensive */
.bad {
  left: 0;
  transition: left 0.3s;
}
.bad:hover {
  left: 100px;
}

/* Performant */
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

Use sparingly. It consumes resources. Remove after animation.

## Accessibility

### Reduced Motion

Respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Or be selective:

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

### Essential vs Decorative

- Essential: Provides feedback, indicates state
- Decorative: Pure visual flair

Essential motion can be kept (perhaps reduced). Decorative motion should respect preference completely.

## Try It Yourself

### Exercise 1: Button States

Create a button with transitions for:
- Background colour on hover
- Shadow on hover
- Slight scale on active (pressed)
- Focus outline animation

### Exercise 2: Card Hover Effect

Create a card that on hover:
- Lifts up (translateY)
- Increases shadow
- Image zooms slightly (overflow: hidden)

All with smooth transitions.

### Exercise 3: Loading Spinner

Create a CSS-only loading spinner with:
- Circular shape
- Infinite rotation animation
- Appropriate timing function

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "css-animations-quiz",
  "type": "multiple-choice",
  "title": "CSS Transitions and Animations",
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

- Transitions animate between states (hover, focus, etc.)
- Keyframe animations handle complex multi-step sequences
- Timing functions control acceleration (ease, ease-out, cubic-bezier)
- Use `transform` and `opacity` for performant animations
- Respect `prefers-reduced-motion` for accessibility
- Keep animations purposeful—feedback and guidance, not decoration

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
