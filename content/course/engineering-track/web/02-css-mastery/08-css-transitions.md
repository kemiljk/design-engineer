---
estimatedTime: 10
---

# CSS Transitions

> **Quick Summary:** CSS transitions animate changes between states, providing smooth feedback for hover effects, focus states, and other interactions.

## What You'll Learn

In this lesson, we will examine the mechanics of how CSS transitions work and explore the various transition properties and shorthand notations available to you. You will also learn how to use timing functions and easing curves to refine your animations, and we'll identify which properties can and cannot be transitioned to help you build more predictable interfaces.

## What Are Transitions?

Transitions animate property changes between states:

```css
.button {
  background: blue;
  transition: background 0.2s ease;
}

.button:hover {
  background: darkblue;
}
```

The colour change animates over 0.2 seconds instead of instantly. This small addition makes interfaces feel more polished and responsive.

## Transition Properties

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

Animate several properties with different timings:

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

**Use `all` sparingly.** It can cause unexpected animations and performance issues when properties change that you didn't intend to animate.

## Timing Functions

Timing functions control how the animation accelerates and decelerates.

### Built-in Functions

CSS provides several built-in timing functions that cater to common animation needs. The `ease-out` function is typically best for entering elements as it feels highly responsive, while `ease-in` is better suited for exiting elements. For elements moving across the screen, `ease-in-out` provides a natural start and end, whereas the `linear` function maintains a constant speed, making it ideal for continuous animations like spinners.

### Custom Cubic Bezier

Create custom curves for precise control:

```css
.element {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

Tools like [cubic-bezier.com](https://cubic-bezier.com) help visualise and create custom curves.

Common custom curves:
```css
/* Material Design standard */
cubic-bezier(0.4, 0, 0.2, 1)

/* Snappy */
cubic-bezier(0.4, 0, 0, 1)

/* Bouncy */
cubic-bezier(0.68, -0.55, 0.27, 1.55)
```

### Steps

For frame-by-frame animation (sprite sheets, typewriter effects):

```css
.element {
  transition-timing-function: steps(4, end);
}
```

## What Can Be Transitioned?

You can transition most CSS properties that have numeric or colour values. This include basic attributes like `width`, `height`, `padding`, and `margin`, as well as more complex properties such as `transform`, `opacity`, `box-shadow`, and `border-radius`. However, it is important to note that certain properties, most notably `display`, cannot be transitioned directly; in these cases, you often need to combine `opacity` and `visibility` to achieve a smooth appearance or disappearance.

### The Display Problem

```css
/* This doesn't work! */
.modal {
  display: none;
  transition: opacity 0.3s;
}
.modal.visible {
  display: block;
  opacity: 1;
}
```

**Solution: Use visibility + opacity:**

```css
.modal {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s;
}
.modal.visible {
  visibility: visible;
  opacity: 1;
}
```

## Practical Examples

### Button Hover

```css
.button {
  background: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  transition: 
    background 0.2s ease,
    transform 0.1s ease;
}

.button:hover {
  background: #2563eb;
}

.button:active {
  transform: scale(0.98);
}
```

### Card Lift

```css
.card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: 
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}
```

### Link Underline

```css
.link {
  position: relative;
  text-decoration: none;
}

.link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

## Try It Yourself

### Exercise 1: Button States

Create a custom button that features smooth transitions for its background colour and box shadow when hovered. You should also implement a slight scale reduction for the active pressed state and add a polished focus ring animation to enhance accessibility.

### Exercise 2: Navigation Link

Develop a navigation link that includes an underline which grows horizontally from the centre upon hovering. Ensure that the link’s colour changes smoothly and that it features a subtle background highlight to provide clear interactive feedback.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "css-transitions-quiz",
  "type": "multiple-choice",
  "title": "CSS Transitions",
  "description": "Test your understanding of CSS transitions.",
  "difficulty": "easy",
  "question": "Why should you avoid using 'transition: all' in most cases?",
  "options": [
    {
      "id": "a",
      "text": "It doesn't work in all browsers",
      "isCorrect": false,
      "explanation": "'transition: all' has excellent browser support."
    },
    {
      "id": "b",
      "text": "It can cause unexpected animations and performance issues",
      "isCorrect": true,
      "explanation": "Correct! 'all' will animate every property change, including ones you didn't intend. This can cause unexpected visual effects and performance problems."
    },
    {
      "id": "c",
      "text": "It only works with transform properties",
      "isCorrect": false,
      "explanation": "'all' works with any transitionable property."
    },
    {
      "id": "d",
      "text": "It makes animations slower",
      "isCorrect": false,
      "explanation": "The duration is the same; the issue is which properties get animated."
    }
  ]
}
-->

## Key Takeaways

To recap, CSS transitions are a powerful way to animate property changes between different states, making your interface feel more interactive and polished. For the most predictable and performant results, you should target specific properties rather than using the `all` keyword. Remember that `ease-out` typically provides the most responsive feel for hover effects, and keep your transition durations short—ideally between 100ms and 300ms—to ensure the interface remains snappy.

## Next Steps

Continue to [Keyframe Animations](./08b-keyframe-animations.md) →

