# Optical Refinement

Detailed patterns for visual precision — the differences the eye catches but the spec misses.

## Concentric Border Radii

When nesting rounded elements, the inner element's `border-radius` must be smaller than the outer element's by exactly the padding between them. This creates optically concentric curves that feel harmonious.

**Formula:**
```
inner_radius = outer_radius - padding
```

**Why it matters:** Humans are sensitive to mismatched curvature. The visual system detects irregularities in edges and contours. Identical radii on nested elements creates a visual "pinch" at the corners where the curves diverge.

### Detection

Look for:
- A parent with `border-radius` containing a child with its own `border-radius`
- Both using the same radius value (e.g., both `rounded-xl`)
- Any card-in-card, button-in-container, or input-in-fieldset pattern

### Fix

```css
/* BAD — same radius on parent and child */
.card { border-radius: 16px; padding: 8px; }
.card-inner { border-radius: 16px; }

/* GOOD — concentric radii */
.card { border-radius: 16px; padding: 8px; }
.card-inner { border-radius: 8px; } /* 16 - 8 = 8 */
```

With CSS custom properties for maintainability:

```css
.card {
  --outer-radius: 16px;
  --padding: 8px;
  border-radius: var(--outer-radius);
  padding: var(--padding);
}

.card-inner {
  border-radius: calc(var(--outer-radius) - var(--padding));
}
```

**Tailwind approach:**
```html
<!-- BAD -->
<div class="rounded-2xl p-3">
  <div class="rounded-2xl">...</div>
</div>

<!-- GOOD -->
<div class="rounded-2xl p-3">
  <div class="rounded-xl">...</div>  <!-- stepped down one size -->
</div>
```

### Edge cases
- When `border-radius` is `0` or `9999px` (fully round), concentric correction is unnecessary — both extremes look balanced regardless.
- When the calculated inner radius would be negative or zero, use a minimum of `2px` to maintain a visible curve.
- Multiple nesting levels: apply the formula recursively at each level.

---

## Shadows as Borders

Replace `border` with `box-shadow: inset` for visually lighter, subpixel-rendered boundaries.

**Why:** A CSS `border` adds physical pixels to the element's box model. It renders crisp and heavy, especially at 1px. An inset box-shadow renders subpixel, blends with the background, and does not affect layout.

### Detection

Look for:
- `border: 1px solid` on cards, inputs, containers
- `border` with low-opacity or light colors (indicators that the developer wanted a subtle boundary)
- `divide-*` utilities in Tailwind used between list items

### Fix

```css
/* BAD — layout-affecting, heavy 1px line */
.card { border: 1px solid rgba(0, 0, 0, 0.1); }

/* GOOD — subpixel, blended, no layout impact */
.card { box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1); }

/* GOOD — combine with depth shadow */
.card {
  box-shadow:
    inset 0 0 0 1px rgba(0, 0, 0, 0.06),
    0 1px 3px rgba(0, 0, 0, 0.08);
}
```

**When to keep `border`:**
- Focus rings (`outline` is better still)
- Active/selected states where visual weight is intentional
- When the border color needs to be opaque and precise

---

## Optical Centering

Mathematical centering and optical centering are different. Certain shapes need manual adjustment to appear centered.

### Common cases

**Play buttons in circles:**
```css
/* The triangle points right, so visual weight is left-heavy */
.play-button svg {
  transform: translateX(1px); /* nudge right to optically center */
}
```

**Icons next to text:**
```css
/* Icons often have built-in padding that misaligns with text baseline */
.icon-text {
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.icon-text svg {
  /* Adjust per-icon; measurement icons may need -1px, rounded icons +1px */
  margin-top: -1px;
}
```

**Text in buttons with icons:**
```css
/* When a button has a leading icon, the text appears off-center */
.button-with-icon {
  padding-left: 12px;  /* less padding on icon side */
  padding-right: 16px; /* more padding on text side */
}
```

---

## Spacing Rhythm

All spacing should follow a consistent scale. The recommended base is 4px.

### Detection

Look for:
- Arbitrary values: `margin-top: 13px`, `padding: 7px`, `gap: 5px`
- Inconsistent gaps between sibling elements
- Mixing spacing systems (some elements use 8px rhythm, others 6px)

### Fix

Snap to a 4px grid: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96`.

In Tailwind, this is the default spacing scale (`1 = 4px`). Flag any use of arbitrary spacing values (`m-[13px]`) as a potential rhythm violation.

---

## Border Radius Consistency

Elements in the same visual group must share matching or deliberately stepped radii.

### Detection

Look for:
- Buttons within a card using a different radius than the card
- Input fields and buttons side-by-side with different radii
- Tags/badges with radii that don't relate to their container

### Fix

Define radius tokens per visual level:
```css
:root {
  --radius-sm: 6px;   /* chips, badges, small controls */
  --radius-md: 10px;  /* buttons, inputs, small cards */
  --radius-lg: 16px;  /* cards, modals, panels */
  --radius-xl: 24px;  /* hero sections, large containers */
}
```

Apply consistently within each visual group. Inner elements use the concentric formula.
