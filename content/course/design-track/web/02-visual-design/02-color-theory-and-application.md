# Color Theory and Application

> **Quick Summary:** Colour isn't just aesthetic preference. It's a powerful communication tool that affects perception, accessibility, and usability.

## What You'll Learn

- Color theory fundamentals and terminology
- Color psychology and its impact on design
- Building effective color palettes
- Ensuring accessibility with color
- Implementing dark mode

## The Language of Color

Before diving into application, let's establish the vocabulary:

<!-- illustration: color-wheel -->

### Color Properties

**Hue:** The colour itself (red, blue, green, etc.). What most people mean when they say "colour."

**Saturation:** How pure or intense the color is. High saturation = vivid; low saturation = muted/gray.

**Lightness/Value:** How light or dark the color is. High lightness = closer to white; low lightness = closer to black.

### Color Models

**RGB (Red, Green, Blue):** Additive color for screens. All colors at full intensity = white.

**HSL (Hue, Saturation, Lightness):** More intuitive for design. Easier to create variations by adjusting one property.

**Hex codes:** Shorthand for RGB values (#FF5733 = R:255, G:87, B:51).

### Why HSL Matters

HSL is more useful for creating palettes because you can:
- Keep hue constant, adjust saturation/lightness for variants
- Maintain consistent saturation across different hues
- Create predictable dark/light versions

```css
/* Base color */
--primary: hsl(220, 65%, 50%);

/* Lighter variant - just increase lightness */
--primary-light: hsl(220, 65%, 70%);

/* Darker variant - decrease lightness */
--primary-dark: hsl(220, 65%, 30%);
```

## Color Psychology

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

**Neutral (gray, black, white):** Sophistication, balance, modernity
- Use for: Content, UI chrome, professional applications
- Caution: Too neutral can feel boring or empty

### Cultural Considerations

Color meanings vary by culture:
- White = purity in Western cultures, mourning in some Eastern cultures
- Red = luck in China, danger in Western contexts
- Green = Islam in some cultures, environmental in others

For international products, research your audience's color associations.

## Building Color Palettes

A color palette provides the colors for your entire product. Building one intentionally prevents random color choices.

### Anatomy of a UI Palette

<!-- illustration: color-palette -->

**Primary color:** Your brand color. Used for key actions, branding elements.

**Secondary color:** Supports the primary. Often a complement or analogous color.

**Accent color:** For highlighting special elements. Should be attention-grabbing.

**Semantic colors:** Status indicators with fixed meanings:
- Error/Danger: Red
- Warning: Yellow/Orange
- Success: Green
- Info: Blue

**Neutral colors:** Grays for text, backgrounds, borders. You'll need more neutral shades than any other color.

### The 60-30-10 Rule

A guideline for colour distribution:
- **60%** Neutral/background colours
- **30%** Secondary colours
- **10%** Accent/primary colours

<!-- visual-example: colour-60-30-10-demo -->

This creates visual balance without overwhelming users.

### Creating Palette Variations

Each color needs variations for different contexts:

```
Primary Blue:
├── 50  - Lightest (backgrounds)
├── 100 - Light (hover states)
├── 200 
├── 300 
├── 400 
├── 500 - Base (primary use)
├── 600 
├── 700 - Dark (pressed states)
├── 800 
└── 900 - Darkest (high contrast)
```

Tools like Tailwind CSS use this 50-900 scale. It provides predictable variations.

### Generating Variations

Use HSL to create consistent variations:
1. Pick your base color (500 level)
2. For lighter variants: Increase lightness, slightly decrease saturation
3. For darker variants: Decrease lightness, slightly increase saturation

Or use tools:
- Tailwind CSS color generator
- Coolors.co
- Adobe Color
- Huemint

## Color in UI

### Text Color

**Primary text:** Near-black on light backgrounds, near-white on dark.
- Light mode: `hsl(0, 0%, 10%)` — not pure black (softer on eyes)
- Dark mode: `hsl(0, 0%, 90%)` — not pure white (less strain)

**Secondary text:** Reduced contrast for less important information.
- Light mode: `hsl(0, 0%, 45%)`
- Dark mode: `hsl(0, 0%, 60%)`

**Disabled text:** Further reduced contrast.
- Light mode: `hsl(0, 0%, 65%)`
- Dark mode: `hsl(0, 0%, 40%)`

### Background Colors

Layer backgrounds to create depth:

```
Light mode:
├── Page background: hsl(0, 0%, 98%)
├── Card background: hsl(0, 0%, 100%)
└── Elevated element: hsl(0, 0%, 100%) + shadow
```

### Interactive States

Colors communicate interaction possibilities:

**Default:** Base color
**Hover:** Slightly darker (or lighter on dark backgrounds)
**Active/Pressed:** Darker still
**Disabled:** Desaturated, reduced contrast
**Focus:** Often shown with outline rather than color change

### Status Colors

Maintain consistent semantic meaning:

```
Success: green variants
Warning: yellow/orange variants  
Error: red variants
Info: blue variants
```

Each needs a:
- Background tint (very light version)
- Border color (medium version)
- Icon/text color (dark version)

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

### Beyond Contrast: Color Blindness

8% of men and 0.5% of women have some form of color blindness. Don't rely on color alone to convey meaning.

**Bad:** "Red fields have errors" (colorblind users can't see the red)

**Good:** Red color + error icon + error message text

**Patterns:**
- Use icons alongside color
- Include text descriptions
- Use patterns or textures for charts
- Test with colorblind simulation tools

## Dark Mode

Dark mode isn't just inverted colors. It requires thoughtful adjustment.

### Dark Mode Principles

**True black is harsh:** Use dark grays instead of pure black for backgrounds.
```css
--bg-dark: hsl(220, 15%, 10%); /* Not hsl(0, 0%, 0%) */
```

**Reduce saturation:** Bright colors on dark backgrounds feel glaring.
```css
--primary-light: hsl(220, 65%, 50%);
--primary-dark: hsl(220, 55%, 55%); /* Reduced saturation, adjusted lightness */
```

**Elevation through lightness:** In dark mode, "raised" elements are lighter (opposite of light mode shadows).

**Lower contrast text:** Pure white on dark gray is harsh. Soften to off-white.
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

### Exercise 1: Analyze a Palette

Pick a product you admire. Identify:
1. Primary, secondary, and accent colors
2. Semantic colors (success, error, etc.)
3. Neutral scale (how many grays?)
4. How colors create hierarchy

### Exercise 2: Build a Palette

Create a palette for a hypothetical product:
1. Choose a primary color based on the brand personality
2. Generate a neutral gray scale (at least 6 shades)
3. Define semantic colors
4. Create variations (50-900) for your primary
5. Test contrast ratios for text combinations

### Exercise 3: Dark Mode Conversion

<!-- illustration: dark-mode-mapping -->

Take an existing light interface and design dark mode colors:
1. Adjust background from light grays to dark grays
2. Modify primary color saturation
3. Adjust text colors
4. Ensure contrast ratios still pass

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "color-accessibility-quiz",
  "type": "multiple-choice",
  "title": "Color and Accessibility",
  "description": "Test your understanding of accessible color usage.",
  "difficulty": "medium",
  "question": "Why shouldn't you rely on color alone to convey meaning (like red for errors)?",
  "options": [
    {
      "id": "a",
      "text": "Red is associated with danger in some cultures but luck in others",
      "isCorrect": false,
      "explanation": "While cultural associations vary, this isn't the primary accessibility concern."
    },
    {
      "id": "b",
      "text": "About 8% of men have some form of color blindness and may not perceive the color difference",
      "isCorrect": true,
      "explanation": "Correct! Color blindness affects a significant portion of users. Always pair color with icons, text, or other visual indicators."
    },
    {
      "id": "c",
      "text": "Colors look different on every monitor, so red might appear orange",
      "isCorrect": false,
      "explanation": "While monitor calibration varies, this isn't why color alone is problematic for accessibility."
    },
    {
      "id": "d",
      "text": "Users might have dark mode enabled which inverts colors",
      "isCorrect": false,
      "explanation": "Dark mode doesn't invert colours. It uses a separate, designed palette."
    }
  ]
}
-->

## Key Takeaways

- Understand color properties: hue, saturation, lightness
- Colour psychology influences perception. Choose intentionally.
- Build systematic palettes with primary, secondary, accent, semantic, and neutral colors
- Follow the 60-30-10 rule for color distribution
- Ensure accessibility: 4.5:1 contrast for text, don't rely on color alone
- Dark mode requires adjustment, not inversion. Reduce saturation, soften contrast.

## Next Steps

Continue to [Spacing and Rhythm](./03-spacing-and-rhythm.md) →
