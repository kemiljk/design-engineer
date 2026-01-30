# Modern CSS Patterns

Native CSS features that replace JavaScript workarounds — faster, more accessible, more resilient.

## CSS Anchor Positioning

Position floating elements (tooltips, popovers, dropdowns) relative to a trigger element without JavaScript positioning libraries.

### Basic pattern

```css
.trigger {
  anchor-name: --my-trigger;
}

.tooltip {
  position: fixed;
  position-anchor: --my-trigger;
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 8px;
}
```

### With `position-try` for overflow handling

```css
.tooltip {
  position: fixed;
  position-anchor: --my-trigger;
  inset-area: block-end;
  position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
}
```

### Detection

Look for:
- Popper.js, Floating UI, or Tippy.js used for basic tooltip/popover positioning
- Manual `getBoundingClientRect()` calculations for positioning
- `position: absolute` with JS-calculated `top`/`left` values
- Resize/scroll listeners that reposition floating elements

### When to keep JS

Complex positioning scenarios with multiple reference elements or virtual anchors still benefit from Floating UI. Anchor positioning is best for 1:1 trigger-to-floating relationships.

---

## Popover API

Built-in browser primitive for toggle-able UI elements. Provides light-dismiss, top-layer stacking, focus management, and keyboard handling for free.

### Basic toggle

```html
<button popovertarget="menu">Open Menu</button>

<div id="menu" popover>
  <nav>
    <a href="/about">About</a>
    <a href="/work">Work</a>
  </nav>
</div>
```

### Pair with anchor positioning

```html
<button popovertarget="tooltip" style="anchor-name: --btn">Hover me</button>

<div id="tooltip" popover="hint"
     style="position-anchor: --btn; inset-area: block-start;">
  Tooltip content
</div>
```

### Animate popover entry/exit

```css
[popover] {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.2s, transform 0.2s, display 0.2s allow-discrete, overlay 0.2s allow-discrete;
}

[popover]:not(:popover-open) {
  opacity: 0;
  transform: translateY(4px);
}

@starting-style {
  [popover]:popover-open {
    opacity: 0;
    transform: translateY(4px);
  }
}
```

### Detection

Look for:
- Custom modal/popover components managing their own backdrop clicks
- `addEventListener('click', outsideClickHandler)` for light-dismiss
- Manual `z-index` stacking for overlays
- `portal` or `createPortal` used primarily for stacking context escape

### Not just popovers

The popover API works for any toggle-able UI: slide-out menus, notification panels, search overlays, command palettes. If it toggles visibility and needs light-dismiss, it's a popover candidate.

---

## View Transitions API

Animate between DOM states (page navigations, tab switches, list reorders) with morphing elements.

### Same-document transition

```js
document.startViewTransition(() => {
  // Update the DOM here
  updateContent();
});
```

```css
::view-transition-old(root) {
  animation: fade-out 0.2s ease-out;
}

::view-transition-new(root) {
  animation: fade-in 0.3s ease-out;
}
```

### Named transitions for specific elements

```css
.hero-image {
  view-transition-name: hero;
}

/* In the target page, the same view-transition-name morphs the element */
.detail-image {
  view-transition-name: hero;
}
```

### Detection

Look for:
- Hard cuts between page states or route changes
- JavaScript-driven crossfade animations between views
- FLIP animation libraries used for layout morphing
- List reorder animations implemented manually

---

## Container Queries

Size components to their container, not the viewport. Every reusable component should be container-aware.

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card { flex-direction: row; }
}

@container card (max-width: 399px) {
  .card { flex-direction: column; }
}
```

### Container Query Units

```css
.card-title {
  font-size: clamp(1rem, 3cqi, 1.5rem); /* scales with container width */
}
```

### Detection

Look for:
- Reusable components using `@media` queries for layout changes
- Components that break when placed in different-width containers
- Sidebar/main content layout components using viewport breakpoints

---

## `@starting-style` for Entry Transitions

Define the initial style for elements being inserted into the DOM, enabling CSS transitions on first render.

```css
.notification {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.3s, transform 0.3s;

  @starting-style {
    opacity: 0;
    transform: translateX(100%);
  }
}
```

### Animating `display` changes

```css
.panel {
  display: block;
  opacity: 1;
  transition: opacity 0.3s, display 0.3s allow-discrete;

  @starting-style {
    opacity: 0;
  }
}

.panel.hidden {
  display: none;
  opacity: 0;
}
```

### Detection

Look for:
- `useEffect` + `setTimeout` patterns to delay animation start (waiting for DOM insertion)
- Class toggling with `requestAnimationFrame` to force style recalc before animating
- Animation libraries used solely for enter transitions of simple elements
- Elements that pop into existence without any transition

---

## `will-change` Best Practices

Only apply `will-change` during active animations. Never leave it on statically.

```css
/* BAD — wastes GPU memory permanently */
.card { will-change: transform; }

/* GOOD — promote only when needed */
.card:hover { will-change: transform; }
.card:active { will-change: transform; }

/* Or apply via JS before animation, remove after */
```

### Detection

Look for:
- Static `will-change` declarations in stylesheets
- `will-change: transform, opacity` applied to elements that rarely animate
- Multiple elements with `will-change` in lists or grids (each creates a compositor layer)
