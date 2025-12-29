# Colour Theory and Application

> **Quick Summary:** Colour isn't just aesthetic preference. It's a powerful communication tool that affects perception, accessibility, and usability.

## What You'll Learn

- Colour theory fundamentals and terminology
- Colour psychology and its impact on design
- Building effective colour palettes
- Ensuring accessibility with colour
- Implementing dark mode

## The Language of Colour

> *"Colour is a power which directly influences the soul."* — Wassily Kandinsky

Before diving into application, let's establish the vocabulary:

<!-- illustration: colour-wheel -->

### Colour Properties

**Hue:** The colour itself (red, blue, green, etc.). What most people mean when they say "colour."

**Saturation:** How pure or intense the colour is. High saturation = vivid; low saturation = muted/grey.

**Lightness/Value:** How light or dark the colour is. High lightness = closer to white; low lightness = closer to black.

### Colour Models

**RGB (Red, Green, Blue):** Additive colour for screens. All colours at full intensity = white.

**HSL (Hue, Saturation, Lightness):** More intuitive for design. Easier to create variations by adjusting one property.

**Hex codes:** Shorthand for RGB values (#FF5733 = R:255, G:87, B:51).

### Why HSL Matters

HSL is more useful for creating palettes because you can:
- Keep hue constant, adjust saturation/lightness for variants
- Maintain consistent saturation across different hues
- Create predictable dark/light versions

```css
/* Base colour */
--primary: hsl(220, 65%, 50%);

/* Lighter variant - just increase lightness */
--primary-light: hsl(220, 65%, 70%);

/* Darker variant - decrease lightness */
--primary-dark: hsl(220, 65%, 30%);
```

## Colour Psychology

Colours carry associations, some universal, some cultural. Understanding these helps you choose colours intentionally.

### Common Associations

**Red:** Urgency, danger, passion, energy
- Use for: Errors, critical actions, sale badges
- Caution: Can feel aggressive or alarming

**Orange:** Enthusiasm, creativity, warmth
- Use for: CTAs, highlights, friendly interactions
- Caution: Can feel unserious or cheap

**Yellow:** Optimism, warning, attention
- Use for: Alerts, highlights, optimistic messaging
- Caution: Low contrast with white, can feel harsh

**Green:** Success, growth, nature, safety
- Use for: Success states, confirmation, environmental themes
- Caution: Too many shades can feel unbalanced

**Blue:** Trust, professionalism, calm
- Use for: Corporate, finance, technology, healthcare
- Caution: Can feel cold or generic

**Purple:** Luxury, creativity, mystery
- Use for: Premium products, creative industries
- Caution: Can feel pretentious if overused

**Neutral (grey, black, white):** Sophistication, balance, modernity
- Use for: Content, UI chrome, professional applications
- Caution: Too neutral can feel boring or empty

### Cultural Considerations

Colour meanings vary by culture:
- White = purity in Western cultures, mourning in some Eastern cultures
- Red = luck in China, danger in Western contexts
- Green = Islam in some cultures, environmental in others

For international products, research your audience's colour associations.

## Building Colour Palettes

A colour palette provides the colours for your entire product. Building one intentionally prevents random colour choices.

### Anatomy of a UI Palette

<!-- illustration: colour-palette -->

**Primary colour:** Your brand colour. Used for key actions, branding elements.

**Secondary colour:** Supports the primary. Often a complement or analogous colour.

**Accent colour:** For highlighting special elements. Should be attention-grabbing.

**Semantic colours:** Status indicators with fixed meanings:
- Error/Danger: Red
- Warning: Yellow/Orange
- Success: Green
- Info: Blue

**Neutral colours:** Greys for text, backgrounds, borders. You'll need more neutral shades than any other colour.

### The 60-30-10 Rule

A guideline for colour distribution:
- **60%** Neutral/background colours
- **30%** Secondary colours
- **10%** Accent/primary colours

<!-- visual-example: colour-60-30-10-demo -->

This creates visual balance without overwhelming users.

### Creating Palette Variations

Each colour needs variations for different contexts:

| Scale | Usage |
|-------|-------|
| 50 | Lightest (backgrounds) |
| 100 | Light (hover states) |
| 200-400 | Intermediate tints |
| 500 | Base (primary use) |
| 600 | Slightly dark |
| 700 | Dark (pressed states) |
| 800-900 | Darkest (high contrast) |

Tools like Tailwind CSS use this 50-900 scale. It provides predictable variations.

### Generating Variations

Use HSL to create consistent variations:
1. Pick your base colour (500 level)
2. For lighter variants: Increase lightness, slightly decrease saturation
3. For darker variants: Decrease lightness, slightly increase saturation

Or use tools:
- Tailwind CSS colour generator
- Coolors.co
- Adobe Colour
- Huemint

## Colour in UI

### Text Colour

**Primary text:** Near-black on light backgrounds, near-white on dark.
- Light mode: `hsl(0, 0%, 10%)` — not pure black (softer on eyes)
- Dark mode: `hsl(0, 0%, 90%)` — not pure white (less strain)

**Secondary text:** Reduced contrast for less important information.
- Light mode: `hsl(0, 0%, 45%)`
- Dark mode: `hsl(0, 0%, 60%)`

**Disabled text:** Further reduced contrast.
- Light mode: `hsl(0, 0%, 65%)`
- Dark mode: `hsl(0, 0%, 40%)`

### Background Colours

Layer backgrounds to create depth:

| Surface | Value (Light Mode) |
|---------|-------------------|
| Page background | hsl(0, 0%, 98%) |
| Card background | hsl(0, 0%, 100%) |
| Elevated element | hsl(0, 0%, 100%) + shadow |

### Interactive States

Colours communicate interaction possibilities:

**Default:** Base colour
**Hover:** Slightly darker (or lighter on dark backgrounds)
**Active/Pressed:** Darker still
**Disabled:** Desaturated, reduced contrast
**Focus:** Often shown with outline rather than colour change

### Status Colours

Maintain consistent semantic meaning:

```
Success: green variants
Warning: yellow/orange variants  
Error: red variants
Info: blue variants
```

Each needs a:
- Background tint (very light version)
- Border colour (medium version)
- Icon/text colour (dark version)

## Accessibility and Colour

### Contrast Requirements

WCAG guidelines specify minimum contrast ratios:

**Normal text (under 18px):** 4.5:1 contrast ratio
**Large text (18px+ or 14px bold):** 3:1 contrast ratio
**UI components and graphics:** 3:1 contrast ratio

<!-- visual-example: contrast-checker-demo -->

### Testing Contrast

Tools to check contrast:
- WebAIM Contrast Checker
- Figma Stark plugin
- Chrome DevTools (Accessibility pane)

### Beyond Contrast: Colour Blindness

8% of men and 0.5% of women have some form of colour blindness. Don't rely on colour alone to convey meaning.

**Bad:** "Red fields have errors" (colourblind users can't see the red)

**Good:** Red colour + error icon + error message text

**Patterns:**
- Use icons alongside colour
- Include text descriptions
- Use patterns or textures for charts
- Test with colourblind simulation tools

## Dark Mode

Dark mode isn't just inverted colours. It requires thoughtful adjustment.

### Dark Mode Principles

**True black is harsh:** Use dark greys instead of pure black for backgrounds.
```css
--bg-dark: hsl(220, 15%, 10%); /* Not hsl(0, 0%, 0%) */
```

**Reduce saturation:** Bright colours on dark backgrounds feel glaring.
```css
--primary-light: hsl(220, 65%, 50%);
--primary-dark: hsl(220, 55%, 55%); /* Reduced saturation, adjusted lightness */
```

**Elevation through lightness:** In dark mode, "raised" elements are lighter (opposite of light mode shadows).

**Lower contrast text:** Pure white on dark grey is harsh. Soften to off-white.
```css
--text-dark: hsl(0, 0%, 88%); /* Not hsl(0, 0%, 100%) */
```

### Implementing Dark Mode

Use CSS custom properties for easy switching:

```css
:root {
  --bg: hsl(0, 0%, 98%);
  --text: hsl(0, 0%, 10%);
  --primary: hsl(220, 65%, 50%);
}

[data-theme="dark"] {
  --bg: hsl(220, 15%, 10%);
  --text: hsl(0, 0%, 88%);
  --primary: hsl(220, 55%, 60%);
}
```

## Try It Yourself

### Exercise 1: Analyse a Palette

Pick a product you admire. Identify:
1. Primary, secondary, and accent colours
2. Semantic colours (success, error, etc.)
3. Neutral scale (how many greys?)
4. How colours create hierarchy

### Exercise 2: Build a Palette

Create a palette for a hypothetical product:
1. Choose a primary colour based on the brand personality
2. Generate a neutral grey scale (at least 6 shades)
3. Define semantic colours
4. Create variations (50-900) for your primary
5. Test contrast ratios for text combinations

### Exercise 3: Dark Mode Conversion

<!-- illustration: dark-mode-mapping -->

Take an existing light interface and design dark mode colours:
1. Adjust background from light greys to dark greys
2. Modify primary colour saturation
3. Adjust text colours
4. Ensure contrast ratios still pass

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "colour-accessibility-quiz",
  "type": "multiple-choice",
  "title": "Colour and Accessibility",
  "description": "Test your understanding of accessible colour usage.",
  "difficulty": "medium",
  "question": "Why shouldn't you rely on colour alone to convey meaning (like red for errors)?",
  "options": [
    {
      "id": "a",
      "text": "Red is associated with danger in some cultures but luck in others",
      "isCorrect": false,
      "explanation": "Whilst cultural associations vary, this isn't the primary accessibility concern."
    },
    {
      "id": "b",
      "text": "About 8% of men have some form of colour blindness and may not perceive the colour difference",
      "isCorrect": true,
      "explanation": "Correct! Colour blindness affects a significant portion of users. Always pair colour with icons, text, or other visual indicators."
    },
    {
      "id": "c",
      "text": "Colours look different on every monitor, so red might appear orange",
      "isCorrect": false,
      "explanation": "Whilst monitor calibration varies, this isn't why colour alone is problematic for accessibility."
    },
    {
      "id": "d",
      "text": "Users might have dark mode enabled which inverts colours",
      "isCorrect": false,
      "explanation": "Dark mode doesn't invert colours. It uses a separate, designed palette."
    }
  ]
}
-->

## Key Takeaways

- Understand colour properties: hue, saturation, lightness
- Colour psychology influences perception. Choose intentionally.
- Build systematic palettes with primary, secondary, accent, semantic, and neutral colours
- Follow the 60-30-10 rule for colour distribution
- Ensure accessibility: 4.5:1 contrast for text, don't rely on colour alone
- Dark mode requires adjustment, not inversion. Reduce saturation, soften contrast.

## Next Steps

Continue to [Spacing and Rhythm](./03-spacing-and-rhythm.md) →
