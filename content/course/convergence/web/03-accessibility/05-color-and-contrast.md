# Colour and Contrast

> **Quick Summary:** Colour contrast affects readability for everyone and is critical for users with visual impairments. Learn the standards and how to meet them.

## What You'll Learn

During this lesson, you will learn the precise WCAG contrast requirements for text and UI components and how to verify them using professional testing tools. We'll explore how to design for various forms of colour blindness to ensure your interface remains usable for the 8% of men who experience vision deficiencies, and examine strategies for using patterns and icons to convey meaning beyond colour alone.

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
According to WCAG standards, "large text" is defined as at least **18pt (24px)** for regular weight fonts, or **14pt (18.66px)** for bold text. Because larger text is easier to read, it has a slightly more lenient contrast requirement (3:1) compared to body text.

## Understanding Contrast Ratios

Contrast ratio = (L1 + 0.05) / (L2 + 0.05)

Where L1 is the lighter colour's luminance and L2 is the darker.

- 1:1 = No contrast (same colour)
- 21:1 = Maximum contrast (black on white)

## Testing Tools

### Browser DevTools
**Browser DevTools**: In Chrome, you can inspect any element and click its colour swatch. The picker will show the contrast ratio against the background and indicate if it passes AA or AAA standards.

### Online Tools
**Online Tools**: Websites like the WebAIM Contrast Checker are excellent for quick validation. For a workflow integrated directly into your design process, plugins like Stark for Figma or the Colour Contrast Analyser app can check your entire screen.

### Quick Test

```css
/* Check these common combinations */
--text-on-white: #374151;      /* grey-700: 10.6:1 ✓ */
--text-on-white: #6b7280;      /* grey-500: 4.6:1 ✓ */
--text-on-white: #9ca3af;      /* grey-400: 2.9:1 ✗ */
```

## Colour Blindness

8% of men and 0.5% of women have some form of colour blindness.

### Types
There are several distinct types of colour blindness to consider. **Protanopia** (red blindness) and **Deuteranopia** (green blindness) are the most common forms of red-green colour deficiency. **Tritanopia** causes blue-yellow confusion, while **Achromatopsia** results in complete colour blindness, where the user sees only in shades of grey.

### Design Implications

Don't rely on colour alone:

```html
<!-- Bad: Only colour indicates error -->
<input style="border-color: red">

<!-- Good: Color + icon + text -->
<input style="border-color: red" aria-invalid="true">
<span class="error">
  <svg><!-- error icon --></svg>
  Invalid email address
</span>
```

### Testing
### Testing
You can simulate these conditions directly in your browser. In Chrome DevTools, go to the **Rendering** tab and use the "Emulate vision deficiencies" dropdown. Alternatively, apps like plain **Stark**, **Color Oracle**, or **Sim Daltonism** allow you to simulate these filters over your entire screen to catch issues early.

## Patterns and Icons

Use multiple visual cues:

```html
<!-- Links: underline + colour -->
<a href="/about" style="color: blue; text-decoration: underline">
  About us
</a>

<!-- Charts: patterns + colours + labels -->
<div class="chart-bar chart-bar--striped" data-value="25">
  Sales: 25%
</div>

<!-- Status: icon + colour + text -->
<span class="status status--success">
  <svg><!-- checkmark --></svg>
  Payment complete
</span>
```

## Dark Mode Considerations

Don't just invert colours:

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

Conduct an audit of your project's colour palette. Specifically check all text against its background colour, ensure button labels have sufficient contrast against their containers, and verify that all icons are legible against their respective backgrounds.

### Exercise 2: Colour Blindness Test

View your interface using a simulation tool like Chrome's "Emulate vision deficiencies." As you navigate, ask yourself if you can clearly distinguish all UI elements and if the state changes (like errors or success messages) are understandable without relying on colour perception.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "colour-contrast-quiz",
  "type": "multiple-choice",
  "title": "Colour and Contrast",
  "description": "Test your understanding of accessible colour usage.",
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

To ensure legibility, you must meet the minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text and UI components, verifying these values with proper testing tools. Remember that approximately 8% of men have some form of colour blindness, so you should never rely on colour alone to convey meaning—always supplement it with icons, text labels, or patterns to ensure your message is clear to everyone.

## Next Steps

Continue to [Motion and Accessibility](./06-motion-and-accessibility.md) →
