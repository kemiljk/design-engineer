# Color and Contrast

> **Quick Summary:** Color contrast affects readability for everyone and is critical for users with visual impairments. Learn the standards and how to meet them.

## What You'll Learn

- WCAG contrast requirements
- Testing contrast ratios
- Designing for color blindness
- Beyond color for meaning

## WCAG Contrast Requirements

<!-- illustration: contrast-ratio -->

### AA Level (Minimum)
- Normal text: 4.5:1
- Large text (18pt+): 3:1
- UI components: 3:1

### AAA Level (Enhanced)
- Normal text: 7:1
- Large text: 4.5:1

### What Counts as Large Text?
- 18pt (24px) regular weight
- 14pt (18.66px) bold

## Understanding Contrast Ratios

Contrast ratio = (L1 + 0.05) / (L2 + 0.05)

Where L1 is the lighter color's luminance and L2 is the darker.

- 1:1 = No contrast (same color)
- 21:1 = Maximum contrast (black on white)

## Testing Tools

### Browser DevTools
Chrome: Inspect element → Color picker → Shows contrast ratio

### Online Tools
- WebAIM Contrast Checker
- Colour Contrast Analyser
- Stark (Figma plugin)

### Quick Test

```css
/* Check these common combinations */
--text-on-white: #374151;      /* gray-700: 10.6:1 ✓ */
--text-on-white: #6b7280;      /* gray-500: 4.6:1 ✓ */
--text-on-white: #9ca3af;      /* gray-400: 2.9:1 ✗ */
```

## Color Blindness

8% of men and 0.5% of women have some form of color blindness.

### Types
- **Protanopia:** Red blindness
- **Deuteranopia:** Green blindness
- **Tritanopia:** Blue blindness
- **Achromatopsia:** Complete color blindness

### Design Implications

Don't rely on color alone:

```html
<!-- Bad: Only color indicates error -->
<input style="border-color: red">

<!-- Good: Color + icon + text -->
<input style="border-color: red" aria-invalid="true">
<span class="error">
  <svg><!-- error icon --></svg>
  Invalid email address
</span>
```

### Testing
- Chrome DevTools: Rendering → Emulate vision deficiencies
- Stark, Color Oracle, or Sim Daltonism

## Patterns and Icons

Use multiple visual cues:

```html
<!-- Links: underline + color -->
<a href="/about" style="color: blue; text-decoration: underline">
  About us
</a>

<!-- Charts: patterns + colors + labels -->
<div class="chart-bar chart-bar--striped" data-value="25">
  Sales: 25%
</div>

<!-- Status: icon + color + text -->
<span class="status status--success">
  <svg><!-- checkmark --></svg>
  Payment complete
</span>
```

## Dark Mode Considerations

Don't just invert colors:

```css
/* Light mode */
:root {
  --bg: #ffffff;
  --text: #1f2937;       /* 14.3:1 */
  --text-muted: #6b7280; /* 4.6:1 */
}

/* Dark mode - adjusted for readability */
[data-theme="dark"] {
  --bg: #111827;
  --text: #f3f4f6;       /* 13.9:1 */
  --text-muted: #9ca3af; /* 5.5:1 */
}
```

Pure white (#fff) on pure black (#000) can be harsh—soften both.

## Try It Yourself

### Exercise 1: Contrast Audit

Check your project's color palette:
- Text on background colors
- Button text on button backgrounds
- Icon colors on backgrounds

### Exercise 2: Color Blindness Test

View your interface with simulated color blindness:
- Can you distinguish all elements?
- Is meaning clear without color?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "color-contrast-quiz",
  "type": "multiple-choice",
  "title": "Color and Contrast",
  "description": "Test your understanding of accessible color usage.",
  "difficulty": "medium",
  "question": "What is the minimum contrast ratio for normal text according to WCAG AA?",
  "options": [
    {
      "id": "a",
      "text": "3:1",
      "isCorrect": false,
      "explanation": "3:1 is the requirement for large text and UI components, not normal text."
    },
    {
      "id": "b",
      "text": "4.5:1",
      "isCorrect": true,
      "explanation": "Correct! WCAG AA requires 4.5:1 for normal text (under 18px or 14px bold). Large text can have 3:1."
    },
    {
      "id": "c",
      "text": "7:1",
      "isCorrect": false,
      "explanation": "7:1 is the WCAG AAA requirement—stricter than AA."
    },
    {
      "id": "d",
      "text": "2:1",
      "isCorrect": false,
      "explanation": "2:1 is too low for readable text."
    }
  ]
}
-->

## Key Takeaways

- Minimum 4.5:1 contrast for normal text
- Large text and UI components need 3:1
- Test with actual tools, not just eyeballing
- 8% of men have color blindness
- Never use color alone to convey meaning

## Next Steps

Continue to [Motion and Accessibility](./06-motion-and-accessibility.md) →
