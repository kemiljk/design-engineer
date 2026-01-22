# Scroll-Based Animation

> **Quick Summary:** Scroll-driven animations tie motion to scroll position, creating engaging experiences where content reveals and transforms as users scroll.

## What You'll Learn

- scroll-linked progress effects scroll-linked progress effects
- dive into the essential performance dive into the essential performance
- accessibility considerations required to keep your scrolling experiences smooth
- accessibility considerations required to keep your scrolling experiences smooth and inclusive

## Types of Scroll Animation

### Scroll-Triggered
Animation plays when element enters viewport, then completes independently:
- Fade in on scroll
- Staggered list reveals

<!-- visual-example: scroll-reveal-demo -->

### Scroll-Linked
Animation progress tied directly to scroll position:
- Parallax effects
- Progress indicators
- Morphing headers

<!-- visual-example: scroll-progress-demo -->

## CSS Scroll-Driven Animations

Modern CSS provides native scroll animation support:

### Scroll Timeline

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.reveal {
  animation: fadeIn linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
```

### Progress Bar

```css
.progress-bar {
  transform-origin: left;
  animation: grow linear;
  animation-timeline: scroll();
}

@keyframes grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

## Intersection Observer Approach

For broader browser support:

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((el) => {
  observer.observe(el);
});
```

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

## Parallax Effects

<!-- visual-example: parallax-layers-demo -->

### CSS-Only Parallax

```css
.parallax-container {
  perspective: 1px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.parallax-bg {
  transform: translateZ(-1px) scale(2);
}

.parallax-content {
  transform: translateZ(0);
}
```

### JavaScript Parallax

```javascript
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  document.querySelector('.parallax').style.transform = 
    `translateY(${scrolled * 0.5}px)`;
});
```

## Scroll-Linked Headers

A common pattern is morphing headers that shrink, add blur, and change appearance as users scroll:

<!-- visual-example: scroll-linked-header-demo -->

## Staggered Reveals

```css
.reveal-list .item {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease-out;
}

.reveal-list.visible .item {
  opacity: 1;
  transform: translateY(0);
}

.reveal-list.visible .item:nth-child(1) { transition-delay: 0s; }
.reveal-list.visible .item:nth-child(2) { transition-delay: 0.1s; }
.reveal-list.visible .item:nth-child(3) { transition-delay: 0.2s; }
```

## Performance Tips

1. **Use `transform` and `opacity`** - GPU accelerated
2. **Avoid layout-triggering properties** - width, height, top, left
3. **Use `will-change` sparingly** - `will-change: transform`
4. **Debounce scroll handlers** - Don't compute on every pixel
5. **Use Intersection Observer** - More performant than scroll events

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .reveal {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

## Try It Yourself

### Exercise 1: Reveal on Scroll

Create a series of cards that fade in and slide up as they enter the viewport.

### Exercise 2: Reading Progress

Build a progress bar at the top of the page that fills as the user scrolls.

### Exercise 3: Parallax Hero

Create a hero section with a background image that scrolls at a different rate than the content.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "scroll-animation-quiz",
  "type": "multiple-choice",
  "title": "Scroll-Based Animation",
  "description": "Test your understanding of scroll-driven animations.",
  "difficulty": "medium",
  "question": "What should you consider when implementing scroll-triggered animations?",
  "options": [
    {
      "id": "a",
      "text": "Use JavaScript scroll listeners for all scroll effects",
      "isCorrect": false,
      "explanation": "CSS scroll-driven animations (where supported) perform better than JS listeners."
    },
    {
      "id": "b",
      "text": "Respect prefers-reduced-motion, throttle scroll handlers, and test on mobile",
      "isCorrect": true,
      "explanation": "Correct! Scroll animations can cause motion sickness, performance issues, and behave differently on touch devices. Always consider these factors."
    },
    {
      "id": "c",
      "text": "Make all elements animate on scroll for maximum engagement",
      "isCorrect": false,
      "explanation": "Too many scroll animations are overwhelming and distracting."
    },
    {
      "id": "d",
      "text": "Scroll animations work identically across all devices",
      "isCorrect": false,
      "explanation": "Touch scrolling, scroll velocity, and performance vary significantly across devices."
    }
  ]
}
-->

## Key Takeaways

- Scroll animations should be used intentionally to reveal content or provide progress indicators,...
- When using fallbacks like Intersection Observer, you must limit your animations to transform
- opacity properties to ensure hardware acceleration
- opacity properties to ensure hardware acceleration and smooth frame rates
- Most importantly, always respect reduced motion preferences
- test your scroll effects across both desktop test your scroll effects across both desktop
- mobile devices to ensure consistency mobile devices to ensure consistency

## Next Steps

Continue to [Implementing Motion](./06-implementing-motion.md) →
