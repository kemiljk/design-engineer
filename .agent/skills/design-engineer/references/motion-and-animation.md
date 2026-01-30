# Motion & Animation

Choreographed motion patterns that guide attention, communicate state, and bring interfaces to life.

## Staggered Enter Animations

Never animate an entire container as a single block. Break components into semantic parts and stagger their entrance.

### The pattern

Each part animates with:
- `opacity: 0 → 1`
- `transform: translateY(8px) → translateY(0)`
- `filter: blur(4px) → blur(0)` (optional, for softness)
- Stagger delay: `60-100ms` between parts

### Levels of stagger

**Section-level** — Title, description, and actions animate separately:
```css
.section-enter > * {
  opacity: 0;
  transform: translateY(8px);
  filter: blur(4px);
  animation: enter 0.5s ease-out forwards;
}

.section-enter > *:nth-child(1) { animation-delay: 0ms; }
.section-enter > *:nth-child(2) { animation-delay: 80ms; }
.section-enter > *:nth-child(3) { animation-delay: 160ms; }

@keyframes enter {
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}
```

**Word-level** — Title text splits into individually animated words:
```css
.word-enter {
  display: inline-block;
  opacity: 0;
  transform: translateY(6px);
  animation: enter 0.4s ease-out forwards;
}

/* Apply via JS: stagger each word by 50-80ms */
```

**List-level** — Cards or list items stagger in sequence:
```css
.list-enter > * {
  opacity: 0;
  transform: translateY(12px);
  animation: enter 0.5s ease-out forwards;
}

/* Use a CSS custom property for dynamic stagger */
.list-enter > * {
  animation-delay: calc(var(--index) * 60ms);
}
```

### Detection

Look for:
- Components that appear without any entrance transition
- `fadeIn` applied to entire containers rather than individual children
- Missing `animation-delay` on sibling elements
- Page loads where everything appears simultaneously

---

## Scroll-Driven Animations

Replace JavaScript scroll listeners with CSS scroll-driven animations.

### Scroll progress (page-level)

```css
/* Progress bar that fills as the page scrolls */
.progress-bar {
  animation: fill-bar linear;
  animation-timeline: scroll();
}

@keyframes fill-bar {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

### View progress (element-level)

```css
/* Fade in as element enters the viewport */
.reveal {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Text highlighting on scroll

```css
/* Highlight text passages as they scroll into view */
mark {
  --highlighted: 0;
  background-image: linear-gradient(
    oklch(0.9 0.15 80),
    oklch(0.9 0.15 80)
  );
  background-size: calc(var(--highlighted) * 100%) 100%;
  background-repeat: no-repeat;
  animation: highlight linear forwards;
  animation-timeline: view();
  animation-range: entry 100% cover 30%;
}

@keyframes highlight {
  to { --highlighted: 1; }
}
```

### Detection

Look for:
- `IntersectionObserver` used solely to toggle a class for animation
- `scroll` event listeners that only update animation progress
- Third-party scroll libraries (AOS, ScrollMagic) for simple reveal effects
- `window.scrollY` calculations for parallax

---

## The `@property` Rule

Register CSS custom properties with a type so they can be animated.

```css
@property --progress {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}

.element {
  --progress: 0;
  background: conic-gradient(
    oklch(0.6 0.2 250) calc(var(--progress) * 100%),
    transparent 0
  );
  transition: --progress 0.6s ease-out;
}

.element:hover {
  --progress: 1;
}
```

### Use cases
- Animating gradient stops
- Animating counter values (functional stopwatch with pure CSS)
- Interpolating colors in custom properties
- Driving complex animations from a single `0 → 1` progress value

### Detection

Look for:
- JavaScript-driven gradient animations
- `requestAnimationFrame` loops updating CSS variables
- Inline style updates for values that `@property` could handle

---

## Exit Animations

Every element that enters with animation must exit with animation. Hard cuts are jarring.

### CSS-only exits with `@starting-style`

```css
.dialog {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.2s, transform 0.2s, display 0.2s allow-discrete;

  @starting-style {
    opacity: 0;
    transform: translateY(8px);
  }
}

.dialog:not([open]) {
  opacity: 0;
  transform: translateY(8px);
}
```

### With Motion (React)

```jsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
    />
  )}
</AnimatePresence>
```

### Detection

Look for:
- Modals/dialogs that appear with animation but disappear instantly
- Conditional renders (`{show && <Component />}`) without exit handling
- `display: none` toggles without `@starting-style` or `transition-behavior`
- Toast/notification components that vanish without fadeout

---

## Reduced Motion

All motion must be wrapped in a reduced-motion query.

```css
@media (prefers-reduced-motion: no-preference) {
  .animated {
    animation: enter 0.5s ease-out;
  }
}

/* Fallback: element is visible but static */
.animated {
  opacity: 1;
}
```

### Detection

Look for:
- Animations without `prefers-reduced-motion` wrapping
- Essential state communication conveyed only through motion
- Infinite/looping animations without pause controls
