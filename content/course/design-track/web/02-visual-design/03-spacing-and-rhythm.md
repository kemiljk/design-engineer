# Spacing and Rhythm

> **Quick Summary:** Consistent spacing creates rhythm, improves scanability, and is often the difference between amateur and professional design.

## What You'll Learn

- Why spacing matters more than you think
- The 8-point grid system and how to use it
- Creating vertical rhythm with consistent spacing
- Practical spacing patterns for common UI elements

## The Invisible Art

Spacing is design's invisible medium. You don't see spacing directly. You see its effects. Good spacing makes interfaces feel organised, calm, and professional. Bad spacing makes them feel chaotic, cramped, or disconnected.

Most engineers underspacing. Designs feel crowded because elements are packed together without breathing room. When in doubt, add more space.

## Whitespace is Not Wasted Space

A common misconception: empty space is wasted space that should be filled with content.

The opposite is true. Whitespace:
- **Reduces cognitive load:** Fewer elements competing for attention
- **Improves comprehension:** Grouped content is easier to understand
- **Creates focus:** Important elements stand out when surrounded by space
- **Signals quality:** Premium products use generous spacing
- **Improves readability:** Text with breathing room is easier to read

<!-- visual-example: whitespace-demo -->

Don't fear whitespace. Embrace it.

## The 8-Point Grid

The 8-point grid is an industry-standard spacing system. All spacing values are multiples of 8:

<!-- visual-example: spacing-scale-demo -->

<!-- illustration: spacing-scale -->

```
8, 16, 24, 32, 40, 48, 56, 64, 72, 80...
```

### Why 8?

**Mathematical harmony:** 8 divides evenly by 2 and 4, making half-steps possible.

**Device alignment:** Most screen sizes divide evenly by 8, reducing subpixel rendering issues.

**Industry standard:** Material Design, iOS, and most design systems use 8-point grids.

**Easy math:** Multiples of 8 are simple to calculate mentally.

### The 4-Point Variant

Some systems use 4-point for fine-tuning:

```
4, 8, 12, 16, 20, 24, 28, 32...
```

This provides more flexibility for small UI elements while maintaining consistency.

### Applying the Grid

Map semantic names to grid values:

```css
:root {
  --space-1: 4px;   /* Tight: icon padding */
  --space-2: 8px;   /* Small: between related items */
  --space-3: 12px;  /* Medium-small */
  --space-4: 16px;  /* Medium: standard padding */
  --space-5: 20px;  /* Medium-large */
  --space-6: 24px;  /* Large: section padding */
  --space-8: 32px;  /* X-large: between sections */
  --space-10: 40px; /* XX-large: major divisions */
  --space-12: 48px; /* Page margins */
  --space-16: 64px; /* Section spacing */
}
```

Now use these variables everywhere instead of arbitrary values.

## Vertical Rhythm

Vertical rhythm is the consistent vertical spacing throughout a page. It creates a visual "beat" that makes content feel organised.

### Establishing Rhythm

Start with your base unit (often line-height of body text):

If your body text is 16px with 1.5 line-height:
- Base unit = 16 × 1.5 = 24px

All vertical spacing should be multiples of this base:
- 24px (1×) — Between paragraphs
- 48px (2×) — Between sections
- 72px (3×) — Between major sections

### Maintaining Rhythm

Consistent vertical rhythm means:
- Margins and padding follow the grid
- Different elements align to the same vertical lines
- Scrolling feels smooth and predictable

## Component Spacing

### Internal vs. External Spacing

**Internal spacing (padding):** Space inside an element, between its border and content.

**External spacing (margin):** Space outside an element, between it and other elements.

Keep these concerns separate. A button should define its own padding but not assume its surrounding margin.

### Common Component Patterns

**Buttons:**
```css
.button {
  padding: 12px 24px; /* Vertical: 12px, Horizontal: 24px */
}

.button-small {
  padding: 8px 16px;
}

.button-large {
  padding: 16px 32px;
}
```

Horizontal padding is typically 1.5-2× vertical padding.

**Cards:**
```css
.card {
  padding: 24px; /* Internal spacing */
}

.card + .card {
  margin-top: 16px; /* Space between cards */
}
```

**Form Fields:**
```css
.form-group {
  margin-bottom: 24px; /* Space between fields */
}

.label {
  margin-bottom: 8px; /* Space between label and input */
}
```

**Sections:**
```css
.section {
  padding: 64px 0; /* Generous vertical padding */
}
```

## Spacing for Hierarchy

Spacing communicates relationships (remember proximity from Gestalt):

### Tight Spacing = Related

Elements that belong together should be close:
- Label and input
- Icon and text
- List item children

### Loose Spacing = Separate

Elements that are distinct should have more space:
- Between form sections
- Between cards
- Between page sections

### Visual Example

```
[ Section Title ]            ← 48px above
                              ← 16px below title
[ Card 1                ]     
[ Content               ]
[______________________ ]     ← 16px between cards

[ Card 2                ]
[ Content               ]
[______________________ ]
                              ← 48px below section
[ Next Section Title ]
```

The different spacing values communicate structure without needing borders or backgrounds.

## Responsive Spacing

Spacing should adapt to screen size:

### Smaller Screens, Tighter Spacing

Mobile screens have less room. Reduce spacing proportionally:

```css
:root {
  --space-section: 64px;
}

@media (max-width: 768px) {
  :root {
    --space-section: 40px;
  }
}
```

### Maintain Proportions

Even when reducing, maintain relative proportions. If section spacing is 4× card spacing on desktop, it should be ~4× on mobile too.

### Container Padding

Edge padding (space between content and screen edge) is critical on mobile:

```css
.container {
  padding-left: 24px;
  padding-right: 24px;
}

@media (min-width: 768px) {
  .container {
    padding-left: 48px;
    padding-right: 48px;
  }
}
```

## Common Spacing Mistakes

### Inconsistent Values

**Bad:** Using 17px here, 23px there, 31px somewhere else.
**Good:** Using consistent scale values (16px, 24px, 32px).

### Equal Spacing Everywhere

**Bad:** Same 16px spacing between everything.
**Good:** Varying spacing to show relationships.

### Cramped Components

**Bad:** Content touches edges, no breathing room.
**Good:** Generous padding inside components.

### Spacing with Borders Instead of Space

**Bad:** Using borders/lines to separate what space could separate.
**Good:** Using whitespace as the primary separator.

## The Squint Test

A quick way to evaluate spacing: squint at your interface until you can't read text. You should still see:
- Clear groupings
- Obvious hierarchy
- Balanced distribution

If everything blurs into one mass, spacing needs work.

## Try It Yourself

### Exercise 1: Grid Audit

Take a screen you've built or designed. Measure every spacing value. Are they on an 8-point (or 4-point) grid? Identify values that should be adjusted.

### Exercise 2: Spacing Scale

Create a spacing scale for a project:
1. Choose your base unit (8px recommended)
2. Define 8-10 spacing values
3. Give them semantic names
4. Document when to use each

### Exercise 3: Card Redesign

Design a card component three ways:
1. **Cramped:** Minimal padding, tight spacing
2. **Balanced:** Appropriate padding, good rhythm
3. **Spacious:** Generous padding, lots of breathing room

Compare how each feels. Which is most appropriate for different contexts?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "spacing-grid-quiz",
  "type": "multiple-choice",
  "title": "The 8-Point Grid",
  "description": "Test your understanding of spacing systems.",
  "difficulty": "medium",
  "question": "Why is the 8-point grid an industry standard for spacing?",
  "options": [
    {
      "id": "a",
      "text": "8 is a lucky number in design communities",
      "isCorrect": false,
      "explanation": "The choice is practical, not superstitious!"
    },
    {
      "id": "b",
      "text": "It divides evenly, aligns with devices, and is used by major design systems",
      "isCorrect": true,
      "explanation": "Correct! 8 divides evenly by 2 and 4, most screens divide evenly by 8 (reducing subpixel issues), and Material Design, iOS, and most design systems use it."
    },
    {
      "id": "c",
      "text": "8px is the minimum size browsers can render accurately",
      "isCorrect": false,
      "explanation": "Browsers can render much smaller sizes. The 8-point system is about consistency, not minimum sizing."
    },
    {
      "id": "d",
      "text": "8 pixels equals 1 rem in all browsers",
      "isCorrect": false,
      "explanation": "The default rem is typically 16px, not 8px. The 8-point grid is independent of rem."
    }
  ]
}
-->

## Key Takeaways

- Spacing is invisible but critical. It creates rhythm and communicates relationships.
- Whitespace is a feature, not wasted space
- Use an 8-point grid for consistent spacing
- Establish vertical rhythm based on your type scale
- Use tighter spacing for related elements, looser spacing for distinct elements
- Adapt spacing responsively but maintain proportions
- Use the squint test to evaluate overall spacing balance

## Next Steps

Continue to [Layout and Composition](./04-layout-and-composition.md) →
