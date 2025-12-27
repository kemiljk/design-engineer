# Typography Fundamentals

> **Quick Summary:** Typography is how text looks and feels. It's often the difference between an interface that feels professional and one that feels amateur.

## What You'll Learn

- The anatomy of typefaces and why it matters
- How to choose and pair fonts effectively
- Creating typographic hierarchy
- Testing and validating your type system
- Web typography considerations and best practices

## Start with the Text

Before opening a font picker or thinking about sizes, **understand your content**. Read it. Figure out which parts are headlines, subheadings, body copy, pull quotes, calls to action, captions, and footnotes. Then rank them by importance.

Ask yourself: *"If the reader only looks at one thing, what should it be?"*

This becomes your starting point. Typography serves content, not the other way around. A beautiful typeface applied without understanding the content hierarchy will still create a confusing interface.

## Why Typography Matters

> *"Typography has one plain duty before it and that is to convey information in writing."* — Emil Ruder

<!-- visual-example: typographic-showcase-demo -->

Text dominates interfaces. A typical app or website is 80% or more text. Yet typography is often an afterthought. Developers reach for system fonts and default sizes without considering the impact.

Good typography:
- Improves readability and comprehension
- Establishes hierarchy and guides attention
- Conveys tone and personality
- Builds trust and credibility

Bad typography:
- Makes content difficult to read
- Creates confusion about importance
- Feels unprofessional or untrustworthy
- Fatigues users over time

Typography is arguably the most impactful design skill you can develop. Small improvements compound across every word on screen.

## Type Anatomy

Understanding type anatomy helps you make informed decisions and communicate with designers. Here are the essential terms:

### Key Terms

**Typeface vs. Font:** A typeface is a family of fonts (e.g., Helvetica). A font is a specific variant (e.g., Helvetica Bold 14px). In practice, people use these interchangeably.

**Serif vs. Sans-serif:** Serifs are small decorative strokes on letter ends. Serif fonts (Times, Georgia) feel traditional. Sans-serif fonts (Helvetica, Arial) feel modern and clean.

**x-height:** The height of lowercase letters like 'x'. Higher x-height = better readability at small sizes.

**Cap height:** The height of capital letters.

**Baseline:** The invisible line text sits on.

**Leading (line-height):** Vertical space between lines of text.

**Tracking (letter-spacing):** Space between all characters.

**Kerning:** Space between specific character pairs.

### Why Anatomy Matters

When comparing fonts, understanding anatomy helps you evaluate:
- Readability at various sizes (x-height comparison)
- Tone and feel (serif vs. sans-serif)
- How well fonts pair (similar x-heights often pair well)
- Spacing needs (some fonts need more leading)

## Choosing Fonts

With thousands of fonts available, selection can be overwhelming. Here's how to narrow down:

### Start with Purpose

What should the typography convey?
- Professional and trustworthy → Classic serifs or neutral sans-serifs
- Modern and tech-forward → Geometric sans-serifs
- Friendly and approachable → Rounded fonts with higher x-height
- Elegant and premium → High-contrast serifs

### Consider Practical Requirements

- **Language support:** Does it include the characters you need?
- **Weight variations:** Do you need bold, light, etc.?
- **OpenType features:** Small caps, old-style figures?
- **File size:** Especially important for web
- **Licensing:** Can you use it for your project?

### Safe Starting Points

If you're unsure, these fonts are reliable defaults:

**Sans-serif:**
- Inter — Designed for screens, highly legible, many weights
- System fonts (San Francisco, Segoe UI) — Native feel, zero load time
- Roboto — Google's workhorse, versatile

**Serif:**
- Georgia — Web classic, great x-height, highly readable
- Lora — Modern serif, good for long-form reading
- Merriweather — Designed for screens, comfortable reading

**Monospace:**
- JetBrains Mono — Designed for code, includes ligatures
- Fira Code — Popular for code, clear distinction between characters
- Source Code Pro — Clean, professional

<!-- visual-example: font-comparison-demo -->

## Font Pairing

Most interfaces need at least two fonts: one for headings, one for body text. Pairing well is an art, but there are reliable approaches.

<!-- visual-example: font-pairing-demo -->

### The Classic Approach: Serif + Sans-serif

Pairing a serif heading with a sans-serif body (or vice versa) creates contrast while maintaining harmony.

Examples:
- Playfair Display (serif heading) + Source Sans Pro (sans body)
- Montserrat (sans heading) + Merriweather (serif body)

### The Safe Approach: Same Family

Many type families include both display and text versions designed to work together.

Examples:
- Roboto + Roboto Slab
- IBM Plex Sans + IBM Plex Serif

### The Superfamily Approach

Some typefaces have extensive families with consistent design across categories.

Examples:
- Inter (many weights, includes display variants)
- Source Sans Pro + Source Serif Pro + Source Code Pro

### Pairing Principles

1. **You don't need five fonts.** In most cases, one family with multiple styles is more than enough
2. **Contrast is good:** Different fonts should look noticeably different
3. **Too much contrast is bad:** Wildly different styles clash
4. **Similar x-heights help:** Fonts feel harmonious when proportions align
5. **Limit to 2–3 fonts maximum:** More creates visual chaos and inconsistency
6. **Test in context:** Fonts that pair well in samples might clash in your layout

The best interfaces often use a single typeface family with multiple weights. This creates cohesion without the complexity of managing font pairings.

## Typographic Hierarchy

Hierarchy uses size, weight, and style to communicate importance. A clear hierarchy helps users scan and understand content quickly.

### Use Size Intentionally

Your biggest text should signal the most important element (usually the headline), followed by subheadings, and so on.

**Practical size ranges for web:**

| Level | Size Range | Purpose |
|-------|------------|---------|
| Headline | 40–60px | Page titles, hero text |
| Subheading | 24–36px | Section titles |
| Body | 16–20px | Primary reading text |
| Caption | 12–14px | Footnotes, metadata |

**Practical size ranges for print:**

| Level | Size Range | Purpose |
|-------|------------|---------|
| Headline | 38–60pt | Major titles |
| Subheading | 20–36pt | Section breaks |
| Body | 10–14pt | Reading text |
| Caption | 6–8pt | Fine print |

Don't go overboard with size differences. **Consistency matters more than drama.** Set your body text first, then scale the rest accordingly.

### The Type Scale

<!-- visual-example: type-scale-demo -->

<!-- illustration: type-scale -->

A type scale is a set of consistent sizes used throughout a product. Rather than arbitrary sizes, scales create rhythm and consistency.

Common scale ratios:
- **Minor second (1.067):** Subtle differences, good for dense UIs
- **Major second (1.125):** Common for body text scales
- **Minor third (1.2):** Balanced, popular for web
- **Major third (1.25):** More dramatic, good for marketing
- **Perfect fourth (1.333):** High contrast, impactful headings

Example scale (1.25 ratio, 16px base):
- 10px — Caption
- 13px — Small
- 16px — Body
- 20px — H4
- 25px — H3
- 31px — H2
- 39px — H1

### Beyond Size: Weights and Styles

Size alone doesn't create hierarchy. Pair different font weights to create emphasis. Bold text draws attention to key ideas; lighter text signals secondary information. Italics work well for differentiation—but use them sparingly for emphasis, quotes, or asides. Not everything needs a tilt.

**Weight:**
- Headings in semibold or bold
- Body text in regular
- Metadata in light or regular

Choose fonts with enough weight variety (Light through Bold, at minimum) to build complex hierarchies without needing multiple typefaces.

**Colour:**
- Primary text: Full contrast (black on white)
- Secondary text: Reduced contrast (grey)
- Tertiary text: Further reduced

**Important:** Your hierarchy should work in black and white first. Then add colour to reinforce structure or highlight interactive elements. Colour-coded hierarchies can fall apart with poor contrast or accessibility issues.

**Style:**
- Italics for emphasis or quotes
- ALL CAPS sparingly for labels

## Line Length and Measure

The number of characters per line dramatically affects readability.

<!-- visual-example: measure-demo -->

### Optimal Line Length

**For body text:** 50-75 characters per line (including spaces)
- Too short: Eyes tire from constant line breaks
- Too long: Hard to find the next line
- Ideal: Comfortable reading rhythm

### Controlling Line Length

In CSS, use `max-width` with character-based units:

```css
.prose {
  max-width: 65ch; /* approximately 65 characters */
}
```

### Wide Screens

On desktop screens, content can span too wide. Solutions:
- Constrain content width (max-width)
- Use multi-column layouts
- Increase side margins/padding

## Line Height (Leading)

Line height is the vertical space between lines. It dramatically affects readability.

<!-- visual-example: line-height-demo -->

### Guidelines

**Body text:** 1.4 to 1.6 × font size
- Tighter feels dense, harder to read
- Looser feels spacious, easier to scan

**Headings:** 1.1 to 1.3 × font size
- Large text needs less relative spacing
- Too much line height looks disconnected

**UI text (labels, buttons):** 1.0 to 1.3 × font size
- Single-line text can be tighter
- Consider vertical centering

### CSS Line Height

```css
body {
  line-height: 1.5; /* unitless - recommended */
}

h1 {
  line-height: 1.2;
}
```

Use unitless values for line-height. They scale properly with font size.

## Web Typography Considerations

### Font Loading

Web fonts can delay text rendering. Strategies:

**Font-display property:**
```css
@font-face {
  font-display: swap; /* Show fallback immediately, swap when loaded */
}
```

**System font stacks:**
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### Responsive Typography

Text that works at one screen size may not work at others.

**Fluid typography:**
```css
html {
  font-size: clamp(16px, 1.5vw, 20px);
}
```

**Responsive scales:**
Smaller screens might need a tighter scale (less size difference between levels).

### Accessibility

- Minimum body text: 16px (users can zoom if needed)
- Sufficient contrast (4.5:1 for normal text, 3:1 for large)
- Avoid justified text (uneven spacing)
- Support user font size preferences

## Consistency: Repeat, Repeat, Repeat

Once you've chosen your headline size, subheading spacing, and body text rules, **stick to them**. Repeating styles creates rhythm and makes your design feel intentional and cohesive.

This consistency creates visual and conceptual pace across your entire product. Create text styles in your design tool or CSS custom properties and apply them consistently. No one wants nine subtly different heading sizes.

```css
/* Define once, use everywhere */
:root {
  --text-heading: 2.25rem;    /* H1 */
  --text-subheading: 1.5rem;  /* H2 */
  --text-body: 1rem;          /* Body */
  --text-caption: 0.875rem;   /* Small text */
}
```

The discipline of consistency compounds. Every decision you make once removes dozens of micro-decisions later.

## Testing Your Type System

**Zoom out. Squint. Scroll.**

A quick test to evaluate your hierarchy: can you tell what matters most? Can someone new glance at your interface and know where to start?

### The Black and White Test

Remove all colour from your design (convert to greyscale). Does the hierarchy still work? If you're relying on colour to show importance, your typography hierarchy is weak.

### The Squint Test

Squint at your interface until you can't read the text. You should still see:
- Clear groupings of content
- Obvious hierarchy between elements
- Balanced distribution of text blocks

If everything blurs into one mass, your hierarchy needs work.

### The Scroll Test

Scroll through your page at medium speed. Do the important elements catch your eye? Does the structure remain clear during movement?

Hierarchy should be visible without effort—the eye should naturally follow the structure you've built. If it doesn't, go back and tweak size, weight, spacing, or alignment until it clicks.

## Try It Yourself

### Exercise 1: Font Pairing

Go to Google Fonts and create three font pairings:
1. A safe pair using the same family
2. A classic serif + sans-serif pair
3. An adventurous pair with personality

For each, explain why they work together.

### Exercise 2: Build a Type Scale

Using a 16px base and 1.25 ratio, calculate a type scale with:
- Caption, Small, Body, H4, H3, H2, H1

Then apply appropriate weights and colors to create hierarchy.

### Exercise 3: Optimise a Text Block

Find a webpage with a long article. Evaluate:
- Is the line length comfortable?
- Is the line height appropriate?
- Does the hierarchy guide reading?

Suggest specific improvements.

### Exercise 4: The Three Tests

Take a design you're working on (or find one online) and run all three tests:

1. **Black and white test:** Convert to greyscale. Does hierarchy survive?
2. **Squint test:** Blur your vision. Are groupings and importance clear?
3. **Scroll test:** Scroll at speed. Do the right things catch your eye?

Document what works and what needs improvement. This becomes your refinement checklist.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "typography-line-length-quiz",
  "type": "multiple-choice",
  "title": "Typography Fundamentals",
  "description": "Test your understanding of typography best practices.",
  "difficulty": "medium",
  "question": "What is the optimal line length for body text, and why?",
  "options": [
    {
      "id": "a",
      "text": "100-120 characters, since more content per line means less scrolling",
      "isCorrect": false,
      "explanation": "Lines this long make it hard to find the beginning of the next line, causing reading fatigue."
    },
    {
      "id": "b",
      "text": "50-75 characters, which balances reading rhythm with eye tracking",
      "isCorrect": true,
      "explanation": "Correct! This range creates comfortable reading rhythm. Too short causes tiring line breaks; too long makes finding the next line difficult."
    },
    {
      "id": "c",
      "text": "20-30 characters to keep readers focused on short chunks",
      "isCorrect": false,
      "explanation": "Lines this short cause constant eye movement and break up sentences unnaturally."
    },
    {
      "id": "d",
      "text": "It depends on the font, and there's no standard guideline",
      "isCorrect": false,
      "explanation": "While font affects readability, 50-75 characters is a well-established guideline that works across most typefaces."
    }
  ]
}
-->

## Key Takeaways

> *"Typography is the craft of endowing human language with a durable visual form."* — Robert Bringhurst

- **Start with content:** Understand what you're saying before choosing how to say it
- Typography is the most impactful design skill for interfaces
- Understanding type anatomy helps you make informed decisions
- Choose fonts based on purpose, then practical requirements
- Pair fonts with deliberate contrast but visual harmony
- Use type scales for consistent sizing (body 16–20px, headings 24–60px)
- Optimise line length (50–75 characters) and line height (1.4–1.6 for body)
- **Hierarchy should work in black and white first**—colour reinforces, not creates
- **Consistency compounds:** Define your rules once, then repeat them everywhere
- **Test your system:** Zoom out, squint, scroll. If hierarchy isn't obvious, iterate
- Account for font loading and accessibility on the web

## Next Steps

Continue to [Color Theory and Application](./02-color-theory-and-application.md) →
