# Motion and Accessibility

> **Quick Summary:** Motion can enhance or harm user experience. Learn to create motion that's inclusive and respects user preferences.

## What You'll Learn

- Vestibular disorders and motion sensitivity
- Prefers-reduced-motion media query
- Safe vs. problematic motion
- Implementing accessible animations

## Who Is Affected by Motion?

- People with vestibular disorders
- People with migraines
- People with certain cognitive disabilities
- People who simply find motion distracting
- ~35% of adults over 40 have vestibular issues

## Problematic Motion Patterns

### Parallax Scrolling
Background moving at different rates than foreground.

### Large Zoom Animations
Elements scaling dramatically.

### Spinning or Rotating
Continuous rotation or spinning elements.

### Flashing Content
Rapid light changes (can trigger seizures).

### Auto-playing Video
Especially with motion-heavy content.

## Safe Motion Patterns

Generally safe:
- Opacity fades
- Color transitions
- Small scale changes (5-10%)
- Subtle position shifts
- Short-duration animations (<300ms)

## prefers-reduced-motion

Users can set a preference for reduced motion:
- macOS: System Preferences → Accessibility → Display → Reduce motion
- Windows: Settings → Ease of Access → Display → Show animations
- iOS: Settings → Accessibility → Motion → Reduce Motion

### Detecting the Preference

```css
/* Default: full motion */
.element {
  transition: transform 0.3s ease-out;
}

.element:hover {
  transform: scale(1.1) translateY(-10px);
}

/* Reduced motion: simpler or no animation */
@media (prefers-reduced-motion: reduce) {
  .element {
    transition: opacity 0.2s ease-out;
  }
  
  .element:hover {
    transform: none;
    opacity: 0.8;
  }
}
```

### JavaScript Detection

```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // Use simpler animations or skip them
}
```

## Implementation Strategies

### Strategy 1: Remove Animation

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

### Strategy 2: Reduce Animation

```css
.card {
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: box-shadow 0.15s ease-out;
  }
  
  .card:hover {
    transform: none;
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  }
}
```

### Strategy 3: User Toggle

```javascript
function toggleMotion() {
  document.body.classList.toggle('reduce-motion');
  localStorage.setItem(
    'reduce-motion',
    document.body.classList.contains('reduce-motion')
  );
}

// Apply saved preference
if (localStorage.getItem('reduce-motion') === 'true') {
  document.body.classList.add('reduce-motion');
}
```

## Auto-Playing Content

```html
<!-- Respect user preference -->
<video 
  autoplay 
  muted 
  playsinline
  id="hero-video"
>
```

```javascript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.getElementById('hero-video').pause();
}
```

## Testing

1. Enable reduced motion in your OS settings
2. Navigate your site
3. Check that:
   - No jarring animations remain
   - Functionality isn't broken
   - The experience is still engaging

## Try It Yourself

### Exercise 1: Audit Your Animations

List all animations in a project:
- Classify as safe or potentially problematic
- Plan reduced-motion alternatives

### Exercise 2: Implement prefers-reduced-motion

Add reduced motion support to:
- Page transitions
- Hover effects
- Loading animations

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "motion-a11y-quiz",
  "type": "multiple-choice",
  "title": "Motion and Accessibility",
  "description": "Test your understanding of accessible animation.",
  "difficulty": "medium",
  "question": "How should you handle the prefers-reduced-motion media query?",
  "options": [
    {
      "id": "a",
      "text": "Remove all CSS transitions and animations completely",
      "isCorrect": false,
      "explanation": "Some motion is still helpful—like instant state changes. Remove or reduce motion, don't eliminate all visual feedback."
    },
    {
      "id": "b",
      "text": "Reduce or remove non-essential motion while keeping essential feedback and transitions",
      "isCorrect": true,
      "explanation": "Correct! Respect the preference by reducing parallax, auto-playing videos, and complex animations. Essential state changes (like button feedback) can be instant rather than animated."
    },
    {
      "id": "c",
      "text": "Ignore it—users can disable animations in their browser",
      "isCorrect": false,
      "explanation": "Browsers don't have a universal animation disable—this is the standard way users communicate their preference."
    },
    {
      "id": "d",
      "text": "Show a popup asking if users want reduced motion",
      "isCorrect": false,
      "explanation": "The media query already captures their system preference—no popup needed."
    }
  ]
}
-->

## Key Takeaways

- Motion can cause real physical discomfort
- Use `prefers-reduced-motion` media query
- Opacity fades are generally safe
- Parallax and large movements are risky
- Provide alternatives, don't just remove motion
- Test with reduced motion enabled

## Congratulations!

You've completed the Accessibility module!

Continue to [Performance and Polish: Perceived Performance](../04-performance-and-polish/01-perceived-performance.md) →
