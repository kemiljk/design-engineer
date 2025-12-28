# Implementing Motion

> **Quick Summary:** Practical implementation of motion in modern web projects using CSS, JavaScript, and animation libraries.

## What You'll Learn

- CSS animations and transitions
- JavaScript animation approaches
- Popular animation libraries
- When to use each approach

## CSS Transitions

Best for simple state changes:

```css
.card {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}
```

### Transition Properties

```css
transition: property duration timing-function delay;
transition: all 0.3s ease-out;
transition: transform 0.2s ease-out, opacity 0.2s ease-out 0.1s;
```

## CSS Keyframe Animations

For complex, multi-step animations:

```css
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.icon {
  animation: bounce 1s ease-in-out infinite;
}
```

### Animation Properties

```css
animation: name duration timing-function delay iteration-count direction fill-mode;
animation: bounce 0.5s ease-out forwards;
animation: spin 1s linear infinite;
```

## Web Animations API

JavaScript control over CSS animations:

```javascript
element.animate([
  { transform: 'translateY(0)', opacity: 1 },
  { transform: 'translateY(-20px)', opacity: 0 }
], {
  duration: 300,
  easing: 'ease-out',
  fill: 'forwards'
});
```

### Controlling Animations

```javascript
const animation = element.animate(keyframes, options);

animation.pause();
animation.play();
animation.reverse();
animation.finish();
animation.cancel();

animation.onfinish = () => {
  console.log('Animation complete');
};
```

## Animation Libraries

### Motion

```tsx
import { motion } from 'motion/react';

function Card() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      Content
    </motion.div>
  );
}
```

### GSAP

```javascript
import gsap from 'gsap';

gsap.to('.element', {
  x: 100,
  opacity: 1,
  duration: 0.5,
  ease: 'power2.out'
});

// Timeline for sequences
const tl = gsap.timeline();
tl.to('.first', { opacity: 1 })
  .to('.second', { x: 100 }, '-=0.2')
  .to('.third', { scale: 1.1 });
```

### Anime.js

```javascript
import anime from 'animejs';

anime({
  targets: '.element',
  translateX: 250,
  rotate: '1turn',
  duration: 800,
  easing: 'easeInOutQuad'
});
```

## CSS vs JavaScript Animation

When should you use CSS vs a JavaScript library? Here's a side-by-side comparison:

<!-- visual-example: css-vs-js-demo -->

## Choosing Your Approach

| Scenario | Recommendation |
|----------|----------------|
| Hover/focus states | CSS Transitions |
| Loading spinners | CSS Keyframes |
| Enter/exit animations | Motion or CSS |
| Complex sequences | GSAP or Motion |
| Scroll animations | CSS Scroll API or GSAP ScrollTrigger |
| Physics-based | Motion |

## React Animation Patterns

### AnimatePresence for Exit Animations

AnimatePresence enables exit animations—something CSS alone cannot do:

<!-- visual-example: animate-presence-demo -->

```tsx
import { AnimatePresence, motion } from 'motion/react';

function List({ items }) {
  return (
    <AnimatePresence>
      {items.map(item => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {item.content}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
```

### Gesture-Based Animation

Motion makes it easy to create gesture-driven interactions with physics:

<!-- visual-example: gesture-animation-demo -->

### Layout Animations

The `layout` prop automatically animates position and size changes:

<!-- visual-example: layout-animation-demo -->

### Reduced Motion Support

Always respect the user's motion preferences for accessibility:

<!-- visual-example: reduced-motion-demo -->

## Try It Yourself

### Exercise 1: Notification Toast

Build a toast notification that:
- Slides in from the right
- Stays for 3 seconds
- Slides out

### Exercise 2: Modal with Backdrop

Create a modal that:
- Fades in backdrop
- Scales up modal content
- Reverses on close

### Exercise 3: Staggered Grid

Build a grid of items that:
- Fade and slide in on mount
- Stagger with delay
- Animate out on unmount

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "implementing-motion-quiz",
  "type": "multiple-choice",
  "title": "Implementing Motion",
  "description": "Test your understanding of animation implementation.",
  "difficulty": "medium",
  "question": "When should you use CSS transitions vs JavaScript animation libraries?",
  "options": [
    {
      "id": "a",
      "text": "Always use JS libraries—they're more powerful",
      "isCorrect": false,
      "explanation": "CSS is often sufficient and more performant for simple animations."
    },
    {
      "id": "b",
      "text": "CSS for simple state changes (hover, toggle); JS for complex sequences, physics, and gesture-driven animations",
      "isCorrect": true,
      "explanation": "Correct! CSS handles simple transitions well. Libraries like Motion excel at orchestration, spring physics, exit animations, and gesture-based interactions."
    },
    {
      "id": "c",
      "text": "CSS is deprecated for animations—use JS only",
      "isCorrect": false,
      "explanation": "CSS animations are well-supported and actively improving."
    },
    {
      "id": "d",
      "text": "They're interchangeable—use whichever you prefer",
      "isCorrect": false,
      "explanation": "They have different strengths—choosing the right tool matters for performance and capability."
    }
  ]
}
-->

## Key Takeaways

- Use CSS for simple state transitions
- Use keyframes for complex, self-contained animations
- Use libraries for interactive, physics-based, or complex sequenced motion
- Web Animations API bridges CSS and JavaScript
- Motion is excellent for React projects

## Congratulations!

You've completed the Motion and Interaction module!

Continue to [Prototyping: Prototyping Mindset](../02-prototyping/01-prototyping-mindset.md) →
