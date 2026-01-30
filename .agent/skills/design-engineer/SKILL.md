---
name: design-engineer
description: "Audit and refine frontend codebases for design engineering craft: optical precision, motion choreography, modern CSS, color systems, and interaction delight. Inspired by the work of Jhey Tompkins (jh3y) and Jakub Krehel. This skill should be used when asked to 'audit my UI', 'add polish', 'add delight', 'refine the details', 'design engineer this', or when reviewing frontend code for craft quality."
---

# Design Engineer Audit

Audit and apply design engineering craft to frontend codebases. Rooted in the work of two practitioners:

- **Jhey Tompkins (jh3y)** — Staff Design Engineer at Shopify. Pushes the boundaries of CSS with scroll-driven animations, anchor positioning, the Popover API, `@property` hacks, 3D transforms, and creative interaction patterns. Turns complex UI challenges into approachable, delightful solutions.
- **Jakub Krehel** — Founding Design Engineer at Interfere. Obsesses over the smallest details: concentric border radii, optical alignment, OKLCH color, shadows as borders, staggered enter animations, and shared layout transitions. Makes people feel something through craft.

## How to Use

- `/design-engineer` — Run a full audit against all five lenses on the current project
- `/design-engineer <file-or-pattern>` — Audit specific files
- `/design-engineer fix` — Audit and apply fixes directly

## Audit Process

### 1. Discover

Scan the codebase for UI files (HTML, CSS, JSX, TSX, Vue, Svelte, etc.). Identify components, pages, layouts, and style files.

### 2. Audit Through Five Lenses

Evaluate every UI surface against these five design engineering lenses. Each lens has a dedicated reference file with detailed patterns and code examples.

#### Lens 1: Optical Refinement
**Reference:** `references/optical-refinement.md`

Detect and fix visual misalignments the eye catches but the spec misses:
- **Concentric border radii** — Nested rounded elements must subtract padding from the outer radius. `inner_radius = outer_radius - padding`. Mismatched curvature looks careless.
- **Shadows over borders** — `box-shadow: inset 0 0 0 1px` renders subpixel and blends with backgrounds. Hard `border` adds layout-affecting pixels and looks heavy.
- **Optical alignment** — Center icons and text visually, not mathematically. Play buttons need `padding-left` nudges. Rounded shapes in square containers need optical centering.
- **Consistent spacing rhythm** — Spacing should follow a scale (4px base). Irregular gaps between siblings break visual rhythm.
- **Border radius consistency** — Related elements sharing a visual group must use matching or concentric radii, never arbitrary values.

#### Lens 2: Motion & Animation
**Reference:** `references/motion-and-animation.md`

Choreograph motion that guides attention and communicates state:
- **Staggered enter animations** — Break components into parts (title, description, actions). Animate each with opacity + translateY + blur, staggered by 60-100ms. Never animate a container as one block.
- **Scroll-driven animations** — Replace JS scroll listeners with CSS `animation-timeline: scroll()` and `animation-timeline: view()`. Highlight text, parallax layers, progress indicators — all without JavaScript.
- **`@property` for animatable custom properties** — Register custom properties with `@property` to animate values CSS normally cannot interpolate (numbers, colors, percentages).
- **Exit animations** — Elements that enter with animation must exit with animation. Use `AnimatePresence`, the `@starting-style` rule, or `transition-behavior: allow-discrete` for display/overlay transitions.
- **`prefers-reduced-motion`** — Always wrap motion in `@media (prefers-reduced-motion: no-preference)`. Provide static fallbacks.

#### Lens 3: Color & Depth
**Reference:** `references/color-and-depth.md`

Build color systems that are perceptually uniform and create visual depth:
- **OKLCH color space** — Define colors in `oklch(L C H)`. Manipulate lightness and chroma independently without hue shifts. Generate harmonious palettes by rotating the hue channel.
- **Perceptual uniformity** — Two colors with the same L value in OKLCH appear equally bright. HSL cannot guarantee this. Use OKLCH for accessible contrast calculations.
- **Layered depth** — Build depth through multiple `box-shadow` layers (ambient + direct + contact), translucent overlays, and subtle background gradients rather than flat solid fills.
- **Gradient craft** — Gradients must not band. Use OKLCH interpolation (`in oklch`) for smooth perceptual transitions. Add subtle noise textures to kill banding.

#### Lens 4: Modern CSS Patterns
**Reference:** `references/modern-css-patterns.md`

Replace JavaScript workarounds with native CSS features:
- **CSS Anchor Positioning** — Position tooltips, popovers, and dropdowns relative to their trigger with `anchor-name` and `position-anchor`. No JS positioning libraries needed.
- **Popover API** — Use `popover` attribute for toggle-able UI: menus, tooltips, drawers. Built-in light-dismiss, top-layer stacking, keyboard handling. Pair with anchor positioning.
- **View Transitions API** — Animate between page states or route changes with `document.startViewTransition()`. Add `view-transition-name` to morph specific elements across states.
- **Container Queries** — Size components to their container with `@container`, not the viewport. Every reusable component should be container-aware.
- **`@starting-style`** — Define the initial style for elements entering the DOM so `transition` works on first render. Essential for animating `display: none` to `display: block`.

#### Lens 5: Interaction Delight
**Reference:** `references/interaction-delight.md`

Add moments of surprise that reward engagement:
- **Cursor-aware effects** — Track cursor position with CSS custom properties via minimal JS. Drive parallax, light sources, card tilts, and reveal effects from `--mouse-x` / `--mouse-y`.
- **Clip-path interactions** — Use `clip-path` for hold-to-confirm buttons, circular reveals, and morphing shapes. `clip-path` transitions are GPU-accelerated and silky smooth.
- **Shared layout animations** — When an element appears in two states (list item to detail, thumbnail to hero), animate the transition with FLIP technique or Motion's `layoutId`. Never hard-cut between related views.
- **Whimsical form feedback** — Replace generic validation with character: shaking inputs, color-shifting borders, confetti on success. Small personality in forms builds trust.
- **Hover state depth** — Hover should reveal, not just highlight. Scale subtle transforms (1.01-1.03), shift shadows, reveal hidden content, or trigger micro-animations.

### 3. Report

For each finding, output:

```
[LENS] file:line — Issue description
  WHY: Why this matters (1 sentence)
  FIX: Concrete code change
```

Group findings by lens. Prioritize highest-impact items first within each lens.

### 4. Apply (when `fix` mode)

When applying fixes:
- Make the smallest change that achieves the effect
- Preserve existing code style and conventions
- Test that fixes don't break layout or functionality
- Add `will-change` only during active animations, never statically
- Respect the project's existing animation library (Motion, GSAP, CSS) rather than introducing new dependencies

## Severity Levels

- **CRAFT** — Optical misalignment, missing concentric radii, inconsistent spacing. Feels unpolished.
- **MOTION** — Missing enter/exit animations, jarring state changes, no stagger. Feels static.
- **MODERN** — JavaScript used for something CSS handles natively. Unnecessarily heavy.
- **DELIGHT** — Missed opportunity for a moment of surprise or personality. Feels generic.

## Principles

1. **Sweat the details humans notice** — Mismatched curves, jumpy transitions, and dead hover states erode trust subconsciously.
2. **Choreograph, don't animate** — Every moving element should have a reason, a direction, and a relationship to other elements in motion.
3. **CSS-first, JS-last** — Reach for native CSS features before JavaScript. They are faster, more accessible, and more resilient.
4. **Perceptual over mathematical** — Optical centering beats geometric centering. OKLCH beats HSL. The eye is the final judge.
5. **Earn delight through restraint** — One perfectly timed staggered reveal is worth more than twenty bouncing elements. Delight comes from precision, not quantity.
