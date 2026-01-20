---
estimatedTime: 12
---

# Keyframe Animations

> **Quick Summary:** Keyframe animations enable complex, multi-stage animations that run automatically—perfect for loading states, attention-grabbing effects, and entrance animations.

## What You'll Learn

In this lesson, we will explore the process of creating keyframe animations and investigate the various animation properties and timing options available. You will learn about common animation patterns, performance optimisation techniques to ensure smooth movement, and the critical accessibility considerations for users who may be sensitive to motion.

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

Keyframes can be defined using simple `from` and `to` syntax for two-stage animations, or a percentage-based approach for more complex sequences with multiple stops. This flexibility allows you to precisely control properties like scale, translation, and background colour at any point throughout the animation’s duration.

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

The `animation-fill-mode` property controls the state of an element before and after its animation. While `none` will return the element to its original state, using `forwards` ensures it retains the final keyframe’s styles. You can also use `backwards` to apply the first keyframe’s styles during an animation delay, or `both` to combine these behaviours.

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

The `transform` property is one of the most efficient ways to animate elements. It allows you to move items horizontally or vertically with `translate`, adjust their size with `scale`, or apply rotations and skews without triggering expensive layout recalculations in the browser.

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

Not all CSS properties are equal when it comes to animation performance. Properties like `transform` and `opacity` are highly performant because they can be handled by the GPU on the compositor layer, avoiding jank. In contrast, "expensive" properties such as `width`, `height`, `margin`, and `font-size` trigger layout recalculations and reflows, which are much slower and can lead to a less fluid experience.

### Best Practice

Whenever possible, you should prefer using `transform` over properties that alter an element's position or size. For example, using `translateX` rather than the `left` property ensures that the browser uses GPU acceleration, resulting in a much smoother animation that remains performant even on limited devices.

### will-change

Hint to browser about upcoming animations:

```css
.element {
  will-change: transform;
}
```

**Use sparingly.** It consumes GPU memory. Only apply to elements that will actually animate, and consider removing it after animation completes.

## Accessibility

For many users, excessive or fast motion can cause distraction or even physical discomfort. It is essential to respect user preferences by using the `prefers-reduced-motion` media query to significantly reduce or entirely disable decorative animations. While essential motion that provides functional feedback can often remain in a reduced state, any purely decorative flair should be omitted to ensure a comfortable and accessible experience for everyone.

## Try It Yourself

### Exercise 1: Loading Spinner

Build a CSS-only loading spinner using a circular shape and an infinite rotation animation. Ensure the movement is smooth by applying a `linear` timing function to the sequence.

### Exercise 2: Card Entrance

Create a series of cards that animate into view when the page loads. You should implement a fade-in effect from below, stagger the delay for each individual card, and use the `forwards` fill mode to ensure they remain in their final state.

### Exercise 3: Notification

Develop a notification component that slides in from the right of the screen. Add a subtle pulse effect to draw the user's attention and ensure the notification can be dismissed by sliding it back out of view.

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

To conclude, keyframe animations allow you to define elaborate, multi-stage sequences that go beyond simple state transitions. For the best performance, always prioritise using `transform` and `opacity` as they are less taxing on the browser. Ensure that you use the correct `animation-fill-mode` to manage the element's final state, and always respect user motion preferences to maintain high accessibility standards.

## Next Steps

By reaching this stage, you have gained a comprehensive understanding of how CSS works, including the mechanics of the cascade, specificity, and inheritance. You've mastered advanced selectors, the box model, and modern layout techniques like Flexbox and Grid. Furthermore, you are now equipped to build responsive designs, leverage custom properties for efficient styling, and create polished transitions and animations that bring your interfaces to life.

Continue to [JavaScript Essentials: What is JavaScript](../03-javascript-essentials/01-what-is-javascript.md) →

