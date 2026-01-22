# Colour Theory and Application

> **Quick Summary:** Colour isn't just aesthetic preference. It's a powerful communication tool that affects perception, accessibility, and usability.

## What You'll Learn

- Colour properties (hue, saturation, lightness)
- Colour psychology and how it affects perception
- How to create effective colour palettes
- Accessibility considerations for colour
- Practical application of colour in interfaces

## The Language of Colour

> *"Colour is a power which directly influences the soul."* — Wassily Kandinsky

Before diving into application, let's establish the vocabulary:

<!-- illustration: colour-wheel -->

### Colour Properties

**Hue** is the colour family itself (red, blue, green, etc.). When people ask "what colour is this?", they are usually asking about the hue.

**Saturation** defines the intensity or purity of the colour. A highly saturated colour looks vivid and rich, while a low saturation colour looks muted or grey.

**Lightness (or Value)** describes how light or dark the colour is. High lightness approaches white; low lightness approaches black.

### Colour Models

**RGB (Red, Green, Blue)** is an additive model used for screens. It mixes light to create colour. `rgb(255, 255, 255)` is white.

**HSL (Hue, Saturation, Lightness)** is a more intuitive model for design because it aligns with how we perceive colour. It makes it much easier to create palette variations programmatically.

**Hex codes** are just a shorthand for RGB values (e.g., `#FF5733`).

### Why HSL Matters

HSL is superior for creating systematic palettes. By keeping the **Hue** constant and adjusting **Lightness**, you can create a perfect monochromatic scale. By keeping **Lightness** constant and changing **Hue**, you can create distinct colours that share the same visual weight.

```css
/* Base colour */
--primary: hsl(220, 65%, 50%);

/* Lighter variant - just increase lightness */
--primary-light: hsl(220, 65%, 70%);

/* Darker variant - decrease lightness */
--primary-dark: hsl(220, 65%, 30%);
```

## Colour Psychology

Colours carry deep associations that vary by culture and context. Understanding these helps you choose colours that support your message rather than fighting it.

### Common Associations

**Red** is the colour of urgency and passion. It naturally draws the eye and signals importance. In UI, it is the standard for **errors**, **destructive actions**, and **alerts**. Be careful not to overuse it, or your interface will feel stressful.

**Orange** radiates energy and creativity. It is friendlier than red but still commands attention. It works excellently for **calls to action** or **highlights**, but can feel "cheap" if not balanced with neutrals.

**Yellow** is the most visible colour. It signifies optimism and caution. Use it for **warnings** or to highlight essential information. Note that yellow often has poor contrast against white backgrounds, so you may need a darker mustard shade for text.

**Green** signifies growth, success, and safety. It is the universal signal for **success states**, **confirmation**, and **financial positive trends**.

**Blue** represents trust, calm, and intelligence. It is the most common favourite colour and the standard for **corporate**, **tech**, and **healthcare** brands. Its ubiquity makes it a safe, if sometimes generic, choice.

**Purple** is associated with luxury, creativity, and mystery. It is often used in **premium products** or **creative tools** to signal sophistication.

**Neutrals (Grey, Black, White)** are the workhorses of your palette. They provide structure and balance. A good design relies on neutrals for 60-80% of the interface to let the accent colours shine.

### Cultural Considerations

Always remember that colour meaning is not universal. In Western cultures, **White** represents purity; in some Eastern cultures, it represents mourning. **Red** can mean danger in the US but luck and prosperity in China. Research your target audience.

## Building Colour Palettes

A professional palette isn't just a random collection of colours. It's a system.

### Anatomy of a UI Palette

<!-- illustration: colour-palette -->

**Primary Colour:** Your main brand colour. Used for primary buttons, active states, and key branding moments.

**Secondary Colour:** Supports the primary. Often an analogous or complementary shade used for variety.

**Accent Colour:** A high-contrast colour used sparingly for emphasis (like a notification dot).

**Semantic Colours:** Functional colours with fixed meanings (Success Green, Error Red, Warning Yellow, Info Blue). These should be distinct from your brand colours to avoid confusion.

**Neutral Colours:** A scale of greys for text, backgrounds, and borders. You will need way more greys than you think (usually 8-10 shades).

### The 60-30-10 Rule

A classic interior design rule that works for UI:
Following the 60-30-10 rule for colour distribution ensures a balanced interface, with 60% of the surface area dedicated to your neutral background, 30% to your secondary brand colour, and a final 10% reserved for high-impact accent colours.

<!-- visual-example: colour-60-30-10-demo -->

This distribution creates hierarchy and visual balance.

### Creating Palette Variations

You need more than one shade of each colour. A button needs a hover state (lighter) and an active state (darker). A background needs subtle borders.

A robust scale typically runs from **50 (lightest)** to **900 (darkest)**.
A robust color scale runs from a 50 level for background tints up to a 900 level for high-contrast text. Intermediate values between 100 and 700 are used for borders, enabled elements like buttons and icons, and their various hover and pressed states.

### Generating Variations

Don't guess. Use HSL math or tools like the [Tailwind Colour Generator](https://uicolors.app/create) or [Coolors.co](https://coolors.co/) to generate mathematically consistent scales.

## Colour in UI

### Text Colour

Never use pure black (`#000000`) on pure white. It creates eye strain.
Avoid pure black on white to reduce eye strain, instead using dark grey for primary text, medium grey for subtitles, and light grey for disabled states.

In Dark Mode, invert this logic: off-white for text (`#F5F5F5`) on dark grey backgrounds.

### Background Colours

Use lightness to create depth.
Leverage lightness to create depth by using light grey for page backgrounds, pure white for cards, and white with subtle shadows for elevated elements.

### Interactive States

Colour communicates state.
Interactive states are communicated through logical colour shifts, moving from a base colour to slightly darker shades for hover and pressed states, while using desaturated light greys for disabled elements.

## Accessibility and Colour

### Contrast Requirements

Accessibility isn't optional. The WCAG guidelines require specific contrast ratios between text and background:
Adhere to WCAG guidelines by maintaining a 4.5:1 contrast ratio for normal text, a 3:1 ratio for large text over 18px, and a 3:1 ratio for essential UI components.

<!-- visual-example: contrast-checker-demo -->

### Testing Contrast

Use tools like the **WebAIM Contrast Checker** or Figma plugins like **Stark** to verify every colour combination in your system.

### Beyond Contrast: Colour Blindness

About 1 in 12 men are colour blind. If you rely *only* on colour to convey meaning (e.g., a red border for error), they will miss it.
**The Fix:** Always pair colour with a secondary indicator like an icon or text label.
To ensure accessibility for users with colour blindness, always pair colour indicators with secondary cues such as red outlines combined with descriptive error text and warning icons.

## Dark Mode

Dark mode is not just "invert colours." It's a separate design system.

### Dark Mode Principles

1.  **Avoid Pure Black:** Pure black (`#000000`) can cause "smearing" on OLED screens. Use dark grey (`#121212`) instead.
2.  **Desaturate Colours:** Bright, saturated colours vibrate uncomfortably against dark backgrounds. Mute your primary colours (lower the saturation) for dark mode.
3.  **Elevation via Lightness:** In light mode, shadows create depth. In dark mode, lighter surfaces are "closer" to the user. A modal should be lighter grey than the background.

## Try It Yourself

### Exercise 1: Analyse a Palette

Pick a product you admire. Identify:
Identify the primary, secondary, and accent colours in a product you admire, and examine how their semantic tones and neutral scales create a clear hierarchy.

### Exercise 2: Build a Palette

Create a palette for a hypothetical product:
Build a palette by selecting a primary colour based on brand personality, generating a neutral scale of at least six shades, and defining semantic colours that pass all necessary contrast tests.

### Exercise 3: Dark Mode Conversion

<!-- illustration: dark-mode-mapping -->

Take an existing light interface and design dark mode colours:
Convert an existing interface to dark mode by adjusting background and text tones, modifying primary saturation, and verifying that all contrast ratios pass.

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

Effective use of colour requires an understanding of hue, saturation, and lightness to build systematic palettes that include primary, secondary, accent, semantic, and neutral shades. By following the 60-30-10 rule and adhering to accessibility standards like the 4.5:1 contrast ratio—while ensuring colour is never the sole carrier of meaning—you can create an intuitive interface that remains functional in both light and dark modes.

## Next Steps

Continue to [Spacing and Rhythm](./03-spacing-and-rhythm.md) →
