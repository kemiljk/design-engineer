# Color & Depth

Build color systems that are perceptually uniform and create convincing visual depth.

## OKLCH Color Space

Define colors in `oklch(L C H)` instead of `hsl()` or `hex`. OKLCH is perceptually uniform — two colors with the same lightness value actually appear equally bright to the human eye.

### Structure

```
oklch(L C H / alpha)
```

- **L** (Lightness): `0%` (black) to `100%` (white) — perceptually linear
- **C** (Chroma): `0` (gray) to `~0.4` (maximum saturation) — how vivid
- **H** (Hue): `0` to `360` — the color wheel angle

### Why not HSL

HSL lightness is mathematically uniform but perceptually wrong. `hsl(60, 100%, 50%)` (yellow) appears far brighter than `hsl(240, 100%, 50%)` (blue) despite both having `50%` lightness. OKLCH corrects this — same L = same perceived brightness.

### Generating harmonious palettes

Rotate the hue channel while keeping L and C constant:

```css
:root {
  --primary: oklch(65% 0.18 250);     /* blue */
  --secondary: oklch(65% 0.18 310);   /* purple — +60 hue */
  --accent: oklch(65% 0.18 30);       /* orange — +140 hue */
}
```

All three appear equally vivid and equally bright because L and C are shared.

### Generating tint/shade scales

Vary lightness while keeping chroma and hue constant:

```css
:root {
  --blue-50: oklch(97% 0.02 250);
  --blue-100: oklch(93% 0.05 250);
  --blue-200: oklch(87% 0.08 250);
  --blue-300: oklch(78% 0.12 250);
  --blue-400: oklch(70% 0.15 250);
  --blue-500: oklch(62% 0.18 250);
  --blue-600: oklch(54% 0.16 250);
  --blue-700: oklch(45% 0.14 250);
  --blue-800: oklch(37% 0.11 250);
  --blue-900: oklch(28% 0.08 250);
}
```

### Detection

Look for:
- Color palettes defined in `hsl()` or `hex` that could benefit from OKLCH uniformity
- Colors that appear at different perceived brightness despite being "the same lightness"
- Palette generation using HSL rotation (hue shift in HSL causes brightness jumps)
- Dark mode palettes with colors that look muddier than their light mode counterparts

### Fix

Convert key brand/theme colors to OKLCH. Use the same L value across accent colors for visual harmony.

---

## Smooth Gradients

Gradients in sRGB (`linear-gradient()` default) can produce muddy midpoints, especially between complementary colors. OKLCH interpolation fixes this.

```css
/* BAD — sRGB interpolation, muddy brown midpoint */
.gradient { background: linear-gradient(to right, blue, orange); }

/* GOOD — OKLCH interpolation, vibrant clean transition */
.gradient { background: linear-gradient(in oklch to right, blue, orange); }
```

### Anti-banding

Even smooth gradients can show banding on certain displays. Add a subtle noise texture on top:

```css
.gradient {
  background:
    url("data:image/svg+xml,...") /* inline noise SVG */,
    linear-gradient(in oklch to bottom, oklch(95% 0.02 250), oklch(20% 0.05 260));
}
```

### Detection

Look for:
- Gradients between saturated colors without `in oklch`
- Visible banding in large gradient areas
- Gradients with a "muddy" or "gray" midpoint

---

## Layered Shadows for Depth

Flat single-value `box-shadow` looks artificial. Real-world light creates multiple shadow layers.

### The three-layer shadow

```css
.card {
  box-shadow:
    0 0 0 1px oklch(0% 0 0 / 0.03),       /* contact — tight ring */
    0 1px 2px oklch(0% 0 0 / 0.06),         /* direct — close, sharp */
    0 4px 16px oklch(0% 0 0 / 0.08);        /* ambient — large, soft */
}
```

**Elevated state (hover/focus):**
```css
.card:hover {
  box-shadow:
    0 0 0 1px oklch(0% 0 0 / 0.03),
    0 2px 4px oklch(0% 0 0 / 0.08),
    0 8px 32px oklch(0% 0 0 / 0.12);
  transform: translateY(-1px);
  transition: box-shadow 0.2s ease-out, transform 0.2s ease-out;
}
```

### Detection

Look for:
- Single-value `box-shadow` on cards or elevated elements
- `box-shadow` values with high opacity (> 0.2) — too heavy
- Missing shadow transition on hover states
- Shadows using named colors or full-opacity values instead of transparent layers

---

## Depth Through Layering

Create visual depth without relying on shadows alone.

### Background layering

```css
.surface {
  background:
    radial-gradient(ellipse at 30% 0%, oklch(95% 0.03 250 / 0.5), transparent 50%),
    oklch(98% 0.005 250);
}
```

### Translucent overlays

```css
.frosted {
  background: oklch(98% 0.01 250 / 0.7);
  backdrop-filter: blur(12px) saturate(1.5);
}
```

### Detection

Look for:
- Flat `background-color` on surfaces that sit above other content
- Missing `backdrop-filter` on overlay/modal backgrounds
- Uniform gray backgrounds that could benefit from subtle gradient warmth
