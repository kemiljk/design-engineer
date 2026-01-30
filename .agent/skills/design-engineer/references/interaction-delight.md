# Interaction Delight

Moments of surprise and personality that reward engagement and make interfaces feel alive.

## Cursor-Aware Effects

Track cursor position with minimal JavaScript, expose as CSS custom properties, and drive visual effects entirely in CSS.

### Setup

```js
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  document.documentElement.style.setProperty('--mouse-x', x);
  document.documentElement.style.setProperty('--mouse-y', y);
});
```

### Card tilt / parallax

```css
.card {
  --tilt-x: calc((var(--mouse-x) - 0.5) * 10deg);
  --tilt-y: calc((var(--mouse-y) - 0.5) * -10deg);
  transform: perspective(800px) rotateY(var(--tilt-x)) rotateX(var(--tilt-y));
  transition: transform 0.1s ease-out;
}
```

### Light source effect

```css
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    circle at
      calc(var(--mouse-x) * 100%)
      calc(var(--mouse-y) * 100%),
    oklch(100% 0 0 / 0.15),
    transparent 50%
  );
  pointer-events: none;
}
```

### Per-element tracking

For effects relative to the element rather than the viewport:

```js
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--x', (e.clientX - rect.left) / rect.width);
  card.style.setProperty('--y', (e.clientY - rect.top) / rect.height);
});

card.addEventListener('mouseleave', () => {
  card.style.setProperty('--x', 0.5);
  card.style.setProperty('--y', 0.5);
});
```

### Detection

Look for:
- Cards or hero elements with static backgrounds that could respond to cursor
- Interactive elements that feel flat despite having visual depth (shadows, gradients)
- Image galleries or portfolios without spatial interaction

---

## Clip-Path Interactions

Use CSS `clip-path` for reveal effects, morphing shapes, and hold-to-confirm patterns. `clip-path` transitions are GPU-accelerated.

### Circular reveal

```css
.reveal {
  clip-path: circle(0% at 50% 50%);
  transition: clip-path 0.5s ease-out;
}

.reveal.active {
  clip-path: circle(150% at 50% 50%);
}
```

### Hold-to-confirm button

```css
.hold-button {
  position: relative;
  overflow: hidden;
}

.hold-button::after {
  content: '';
  position: absolute;
  inset: 0;
  background: oklch(60% 0.2 140);
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1s linear;
}

.hold-button:active::after {
  clip-path: inset(0 0 0 0);
}
```

### Shape morphing between states

```css
.shape {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); /* diamond */
  transition: clip-path 0.4s ease-in-out;
}

.shape:hover {
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); /* rectangle */
}
```

### Detection

Look for:
- Reveal animations using `opacity` + `transform` that could use `clip-path` for directional reveals
- Delete/confirm buttons without hold-to-confirm protection
- State transitions that could benefit from shape morphing
- Image transitions that hard-cut instead of revealing

---

## Shared Layout Animations

When the same conceptual element appears in two views (list → detail, thumbnail → hero, tab content → expanded), animate the transition rather than cutting.

### With Motion (React)

```jsx
// In list view
<motion.div layoutId={`card-${id}`}>
  <h3>{title}</h3>
</motion.div>

// In detail view
<motion.div layoutId={`card-${id}`}>
  <h1>{title}</h1>
  <p>{description}</p>
</motion.div>
```

Motion handles FLIP (First, Last, Invert, Play) automatically. The element morphs position, size, and style between states.

### With View Transitions API (vanilla)

```css
/* Same view-transition-name on both elements */
.list-item { view-transition-name: card; }
.detail-hero { view-transition-name: card; }
```

```js
document.startViewTransition(() => {
  showDetailView(id);
});
```

### Detection

Look for:
- List-to-detail navigations that hard-cut
- Tab content that appears/disappears without morphing
- Image thumbnails that open a lightbox without spatial transition
- Accordion/expandable sections that just toggle height without visual continuity

---

## Whimsical Form Feedback

Replace generic validation styling with character.

### Shake on error

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
}

.input-error {
  animation: shake 0.4s ease-out;
  box-shadow: inset 0 0 0 1.5px oklch(65% 0.25 25);
}
```

### Color-shifting border on focus

```css
@property --border-hue {
  syntax: '<number>';
  inherits: false;
  initial-value: 250;
}

.input:focus {
  --border-hue: 250;
  box-shadow: inset 0 0 0 1.5px oklch(65% 0.2 var(--border-hue));
  animation: hue-shift 3s linear infinite;
}

@keyframes hue-shift {
  to { --border-hue: 610; } /* 250 + 360 = full rotation */
}
```

### Success micro-animation

```css
@keyframes success-pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.input-success {
  animation: success-pop 0.3s ease-out;
  box-shadow: inset 0 0 0 1.5px oklch(70% 0.2 145);
}
```

### Detection

Look for:
- Error states using only `border-color: red` with no animation
- Success states with no visual feedback beyond color
- Form submissions without any transition or acknowledgment
- Password strength meters using plain bars instead of animated fill

---

## Hover State Depth

Hover should reveal information or create depth, not just swap colors.

### Subtle lift

```css
.card {
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 0 0 1px oklch(0% 0 0 / 0.03),
    0 4px 8px oklch(0% 0 0 / 0.08),
    0 12px 40px oklch(0% 0 0 / 0.1);
}
```

### Reveal hidden content

```css
.card-meta {
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.2s, transform 0.2s;
}

.card:hover .card-meta {
  opacity: 1;
  transform: translateY(0);
}
```

### Scale with restraint

```css
/* Subtle — barely perceptible but makes things feel alive */
.interactive:hover {
  transform: scale(1.015);
  transition: transform 0.2s ease-out;
}

/* NEVER this — feels like a toy */
.interactive:hover {
  transform: scale(1.1); /* too much */
}
```

### Icon micro-animation on hover

```css
.button:hover svg {
  animation: nudge 0.3s ease-out;
}

@keyframes nudge {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(3px); }
}
```

### Detection

Look for:
- Hover states that only change `background-color` or `color`
- Interactive cards without any hover elevation
- Buttons without icon micro-animations
- Links without underline animations or transitions
- Any interactive element where hover feels "flat"
