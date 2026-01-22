# Typography Fundamentals

> **Quick Summary:** Typography is the voice of your interface. It is not just about making text readable; it is about establishing hierarchy, tone, and structure.

## What You'll Learn

- The anatomy of typefaces and why it matters for digital interfaces
- How to choose and pair fonts effectively
- Creating robust typographic hierarchies
- Testing and validating your type systems
- Essential web typography considerations and best practices

## Start with the Content

Before you choose a font or pick a size, you must understand what you are typesetting. Typography is the clothes words wear. You wouldn't wear a tuxedo to the gym, and you shouldn't use a delicate display serif for a utilitarian dashboard.

Ask yourself:
Determine if the product is a content-heavy reading application like Medium, a data-dense tool like Excel, or a marketing site designed to capture immediate attention.

The function dictates the form.

## Why Typography Matters

> *"Typography has one plain duty before it and that is to convey information in writing."* — Emil Ruder

<!-- visual-example: typographic-showcase-demo -->

On the web, text is the interface. 90% of what users consume is text. If your typography is bad, your interface is broken.

Good typography is invisible. It allows the reader to absorb the message without friction. Bad typography is an obstacle course—it tires the eyes, confuses the brain, and makes the content feel untrustworthy. A study by MIT found that good typography can make users feel happy, while bad typography can physically induce a frown response.

## Type Anatomy

You don't need to be a calligrapher, but you need to know the basic parts of a letter to compare typefaces.

Serif typefaces feature small "feet" at the ends of strokes, creating a traditional and authoritative feel seen in fonts like Georgia, whereas sans-serifs lack these feet to provide a more modern, clean, and geometric appearance characteristic of fonts like Inter.

**X-Height:**
This is the height of the lowercase "x" relative to the capital letters. In UI design, a **large x-height** is crucial. It makes text more legible at small sizes because the letters feel more "open."

**Weights:**
A typeface is a family. It includes weights from "Thin" to "Black." For UI work, you typically need at least Regular (400), Medium (500), and Bold (700). Variable fonts allow you to pick any weight in between, offering granular control.

## Choosing Fonts

With thousands of fonts available, where do you start?

**Purpose First:**
If you are designing a dashboard, look for a "Workhorse" sans-serif (like Inter or Roboto) that is legible at tiny sizes and has tabular figures (numbers that line up vertically). If you are designing a luxury fashion brand, look for a high-contrast serif that oozes elegance.

**Practical Constraints:**
Prioritise readability by ensuring users can distinguish between similar characters like uppercase 'I' and lowercase 'l', verify that the typeface offers enough weights to build a clear hierarchy, and confirm that it supports all the languages your users speak.

### Safe Bets
If you're stuck, these are reliable choices:
Reliable choices for sans-serifs include Inter, Roboto, and system fonts like San Francisco, while Merriweather and Georgia serve as excellent serifs, and JetBrains Mono or Fira Code are standard for monospaced needs.

## Font Pairing

Combining fonts is tricky. The golden rule: **Contrast or Consistency.**

**Contrast:** Pair a strong Serif header with a clean Sans-Serif body. The difference creates visual interest.
**Consistency:** Use one Superfamily (like Roboto and Roboto Slab) that was designed to work together.

**Avoid:** Pairing two different sans-serifs (like Arial and Helvetica). They look like mistakes, not choices. They are too similar to have contrast, but too different to match.

## Typographic Hierarchy

Hierarchy tells the reader what is important. It guides the eye from the Headline -> Subhead -> Body -> Caption.

<!-- visual-example: type-scale-demo -->
<!-- illustration: type-scale -->

**The Type Scale:**
Don't pick random sizes. Use a mathematical scale. A "Major Third" scale (1.25 ratio) is a good starting point for the web.
- **Base:** 16px (Body)
- **Scale up:** 20px (H3), 25px (H2), 31px (H1), 39px (Hero)
- **Scale down:** 12.8px (Caption)

**Beyond Size:**
Size is not the only tool; you can also use **weight** for bold headings, **colour** for grey captions, and **case**—such as uppercase overlines—to distinguish elements without needing to increase the font size excessively.

## Readability Rules

**Line Length (Measure):**
Text lines should be 50-75 characters long. Any longer, and the eye loses its place when tracking back to the start of the next line. Any shorter, and the rhythm is broken by constant jumping. Use `max-width` in CSS to control this.

**Line Height (Leading):**
Space between lines allows text to breathe.
- **Headings:** Tighter (1.1 - 1.2). Large text needs less space.
- **Body:** Looser (1.5 - 1.6). Small text needs room to be legible.

**Contrast:**
Text must have sufficient contrast against the background. Aim for WCAG AA standards (4.5:1 ratio). Grey text looks cool, but if users can't read it, it's useless.

## Web Typography Considerations

**Font Loading:**
Web fonts take time to download. Use `font-display: swap` to ensure text is visible immediately (in a fallback font) before the custom font loads. This prevents the "Flash of Invisible Text" (FOIT).

**Fluid Typography:**
On modern web, we use fluid units (`clamp()`) to scale text smoothly between viewport sizes, rather than having it jump at fixed breakpoints.

## Testing Your Type System

**The Squint Test:**
Squint at your design until it blurs. Can you still tell which text is the headline and which is the body? If not, your hierarchy is too weak. Increase the contrast in size or weight.

**The Black and White Test:**
Designing in grayscale forces you to rely on weight and size for hierarchy, rather than colour; if the system works in black and white, it will remain effective when colour is introduced.

## Try It Yourself

### Exercise 1: Build a Scale
Start with a base size of 16px. Create a type scale using a 1.25 ratio. Define styles for H1, H2, H3, Body, and Caption. Apply appropriate line heights to each.

### Exercise 2: Pairings
Choose a brand personality (e.g., "Trustworthy Banking" vs. "Playful Gaming"). Pick two font pairings that convey this personality. Explain why.

### Exercise 3: The Fix
Find a website that is hard to read. Inspect the code. Is the line height too tight? Is the measure too long? Is the contrast too low? Tweak the CSS in the inspector to fix it.

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

- Ensuring legibility through appropriate x-heights and line lengths
- By limiting font choices and maintaining visible hierarchy even when blurred, you can create a readable and structured interface that guides the user naturally through the information

## Next Steps

Continue to [Colour Theory and Application](./02-colour-theory-and-application.md) →
