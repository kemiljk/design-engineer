# Page Transitions

> **Quick Summary:** Page transitions smooth the jarring experience of navigating between pages, creating continuity and maintaining user context.

## What You'll Learn

- We'll examine framework-specific approaches for Next.js and React
- dive into the specific patterns—such as cross-fades
- dive into the specific patterns—such as cross-fades
- shared element morphing—that create a sophisticated, app-like navigation experience on the web
- shared element morphing—that create a sophisticated, app-like navigation experience on the web

## The Problem with Instant Navigation

When pages change instantly:
- Users lose context of where they were
- The experience feels fragmented
- Important state changes go unnoticed
- The interface feels less polished

Page transitions solve these by animating between states.

## CSS-Only Approach

### Fade Transition

```css
.page {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

### Slide Transition

```css
.page {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

## View Transitions API

The modern, native approach to page transitions:

### Basic Usage

```javascript
document.startViewTransition(() => {
  updateDOM();
});
```

### CSS Customisation

```css
::view-transition-old(root) {
  animation: fadeOut 0.3s ease-out;
}

::view-transition-new(root) {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeOut {
  to { opacity: 0; }
}

@keyframes fadeIn {
  from { opacity: 0; }
}
```

### Named Transitions

```css
.hero-image {
  view-transition-name: hero;
}

::view-transition-old(hero),
::view-transition-new(hero) {
  animation-duration: 0.5s;
}
```

This creates smooth morphing between elements with the same transition name across pages.

## Framework Integration

### Next.js App Router

```typescript
// layout.tsx
import { ViewTransitions } from 'next-view-transitions';

export default function Layout({ children }) {
  return (
    <ViewTransitions>
      {children}
    </ViewTransitions>
  );
}
```

### React Router

```typescript
import { useViewTransition } from 'react-router-dom';

function Link({ to, children }) {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    e.preventDefault();
    document.startViewTransition(() => {
      navigate(to);
    });
  };
  
  return <a href={to} onClick={handleClick}>{children}</a>;
}
```

## Transition Patterns

<!-- visual-example: page-transition-types-demo -->

### Cross-fade (Default)
Old page fades out, new page fades in simultaneously.

### Sequential
Old page exits completely before new page enters.

### Slide
Pages slide in a direction (useful for navigation hierarchy).

### Morph
Shared elements animate smoothly between their positions.

<!-- visual-example: shared-element-demo -->

## Best Practices

<!-- visual-example: navigation-direction-demo -->

1. **Keep it brief** - 200-400ms total
2. **Don't block interaction** - Users should be able to navigate during transition
3. **Respect reduced motion** - Skip or simplify for accessibility
4. **Match navigation direction** - Slide right when going "forward"
5. **Use sparingly** - Not every navigation needs a transition

## Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}
```

## Try It Yourself

### Exercise 1: Simple Fade

Add a fade-in animation to your page content that plays on load.

### Exercise 2: View Transition

Implement the View Transitions API for navigation between two pages.

### Exercise 3: Shared Element

Create a card grid where clicking a card transitions the card image smoothly to a detail page hero.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "page-transitions-quiz",
  "type": "multiple-choice",
  "title": "Page Transitions",
  "description": "Test your understanding of page transition design.",
  "difficulty": "medium",
  "question": "What is the purpose of shared element transitions between pages?",
  "options": [
    {
      "id": "a",
      "text": "To show off advanced CSS capabilities",
      "isCorrect": false,
      "explanation": "The purpose is functional, not demonstrative."
    },
    {
      "id": "b",
      "text": "To create spatial continuity and help users understand navigation relationships",
      "isCorrect": true,
      "explanation": "Correct! When an element (like a card image) smoothly transforms into the hero on the next page, it creates a clear connection between views and reduces disorientation."
    },
    {
      "id": "c",
      "text": "To make the website feel more like a native app",
      "isCorrect": false,
      "explanation": "While this is a benefit, the primary purpose is improving user understanding."
    },
    {
      "id": "d",
      "text": "To reduce the amount of content that needs to load",
      "isCorrect": false,
      "explanation": "Transitions don't reduce content loading. They provide visual continuity during navigation."
    }
  ]
}
-->

## Key Takeaways

- Page transitions are a powerful tool for maintaining user context
- By keeping your transitions brief, purposeful
- aligned with navigation direction, you can create seamless connections between different views
- aligned with navigation direction, you can create seamless connections between different views
- Always prioritise accessibility by simplifying or skipping animations for users with reduced moti...

## Next Steps

Continue to [Scroll-Based Animation](./05-scroll-based-animation.md) →
