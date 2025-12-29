# Tokens and Variables

> **Quick Summary:** Design tokens are named values that store design decisions—colors, spacing, typography—creating a shared vocabulary between design and code.

## What You'll Learn

- What design tokens are and why they matter
- Token naming conventions and hierarchies
- Semantic vs. primitive tokens
- Implementing tokens in design and code

## What Are Design Tokens?

> *"The strength of a design system is in its constraints."* — Nathan Curtis

Design tokens are named containers for design values:

| Instead of | Use |
|------------|-----|
| #3B82F6 | primary-500 |
| 16px | space-4 |
| Inter Bold 24px | heading-large |

Tokens abstract raw values into meaningful names. This abstraction provides:

**Consistency:** The same value everywhere
**Maintainability:** Change once, update everywhere
**Communication:** Shared vocabulary between design and code
**Theming:** Swap values for different themes/brands

## Token Categories

Explore the different categories of tokens in a design system:

<!-- visual-example: token-explorer-demo -->

### Colour Tokens

All colours in your system:

**Brand colours:**

| Token | Value |
|-------|-------|
| primary | #3B82F6 |
| secondary | #10B981 |

**Neutral scale:** 50 (#F9FAFB) through 900 (#111827)

**Semantic colours:**

| Token | Value | Usage |
|-------|-------|-------|
| error | #EF4444 | Destructive actions, errors |
| warning | #F59E0B | Warnings, caution states |
| success | #10B981 | Success, completion |
| info | #3B82F6 | Informational |

### Spacing Tokens

Margin, padding, and gap values:

| Token | Value |
|-------|-------|
| space-1 | 4px |
| space-2 | 8px |
| space-3 | 12px |
| space-4 | 16px |
| space-5 | 20px |
| space-6 | 24px |
| space-8 | 32px |
| space-10 | 40px |
| space-12 | 48px |
| space-16 | 64px |

### Typography Tokens

**Font families:**

| Token | Value |
|-------|-------|
| sans | 'Inter', system-ui, sans-serif |
| mono | 'JetBrains Mono', monospace |

**Font sizes:**

| Token | Value |
|-------|-------|
| xs | 12px |
| sm | 14px |
| base | 16px |
| lg | 18px |
| xl | 20px |
| 2xl | 24px |

**Font weights:**

| Token | Value |
|-------|-------|
| regular | 400 |
| medium | 500 |
| semibold | 600 |
| bold | 700 |

**Line heights:**

| Token | Value |
|-------|-------|
| tight | 1.25 |
| normal | 1.5 |
| loose | 1.75 |

### Other Tokens

**Border radius:**

| Token | Value |
|-------|-------|
| sm | 4px |
| md | 8px |
| lg | 12px |
| full | 9999px |

**Shadows:**

| Token | Value |
|-------|-------|
| sm | 0 1px 2px rgba(0,0,0,0.05) |
| md | 0 4px 6px rgba(0,0,0,0.1) |
| lg | 0 10px 15px rgba(0,0,0,0.1) |

**Border width:**

| Token | Value |
|-------|-------|
| thin | 1px |
| thick | 2px |

## Primitive vs. Semantic Tokens

Tokens exist at different levels of abstraction:

<!-- illustration: token-hierarchy -->

### Primitive Tokens

Raw values with descriptive names:

```
blue-500: #3B82F6
gray-100: #F3F4F6
space-4: 16px
```

Primitive tokens describe _what_ the value is.

### Semantic Tokens

Values with contextual meaning:

```
color-primary: {blue-500}
color-background: {gray-100}
space-component-padding: {space-4}
```

Semantic tokens describe _how_ the value is used.

### Why Both?

Primitive tokens provide the palette.
Semantic tokens apply the palette to purposes.

This separation enables theming:

| Token | Light Theme | Dark Theme |
|-------|-------------|------------|
| color-background | gray-100 → #F3F4F6 | gray-900 → #111827 |
| color-text | gray-900 → #111827 | gray-100 → #F3F4F6 |

Same semantic tokens, different values.

## Naming Conventions

Consistent naming makes tokens discoverable and intuitive.

### Common Patterns

**Category-Property-Variant:**

```
color-background-primary
color-text-secondary
space-padding-large
```

**Property-Scale:**

```
font-size-sm
font-size-md
font-size-lg
```

**Component-Property-State:**

```
button-background-default
button-background-hover
button-background-disabled
```

### Naming Guidelines

**Be consistent:** Once you establish a pattern, follow it everywhere.

**Be specific:** `text-color-primary` is clearer than `color-1`.

**Be predictable:** Users should guess token names correctly.

**Avoid magic numbers:** Use scales (sm, md, lg) or numbers that relate to a system (space-4 = 4 × 4px).

## Token Hierarchies

Organise tokens into logical groups:

<!-- illustration: token-file-structure -->

## Tokens in Design Tools

Modern design tools support token concepts through styles and variables:

### Color Styles

Define named colors:

- `Primary/500`
- `Gray/100`
- `Error/500`

Apply consistently. Update the style to change all instances.

### Text Styles

Define named typography:

- `Heading/Large`
- `Body/Default`
- `Caption/Small`

Each style includes: font, size, weight, line-height.

### Variables (Figma Variables, etc.)

More advanced token support:

- Numeric values (spacing)
- Modes (light/dark themes)
- Aliasing (semantic referencing primitive)

## Tokens in Code

### CSS Custom Properties

The web-native approach:

```css
:root {
  /* Primitives */
  --color-blue-500: #3b82f6;
  --color-neutral-100: #f3f4f6;
  --color-neutral-900: #111827;

  /* Semantics */
  --color-primary: var(--color-blue-500);
  --color-background: var(--color-neutral-100);
  --color-text: var(--color-neutral-900);

  /* Spacing */
  --space-4: 16px;
  --space-6: 24px;
}

.button {
  background: var(--color-primary);
  padding: var(--space-4);
}
```

### Theme Switching

CSS custom properties enable runtime theming:

```css
[data-theme="dark"] {
  --color-background: var(--color-neutral-900);
  --color-text: var(--color-neutral-100);
}
```

### JavaScript/Framework Tokens

Many frameworks have token systems:

```javascript
// Tailwind config
module.exports = {
  theme: {
    colors: {
      primary: "#3B82F6",
      gray: {
        100: "#F3F4F6",
        900: "#111827",
      },
    },
    spacing: {
      4: "16px",
      6: "24px",
    },
  },
};
```

## Design-to-Code Token Sync

The holy grail: tokens defined once, used everywhere.

### Manual Sync

Export tokens from design, import into code:

1. Define in design tool
2. Export as JSON
3. Transform to CSS/JS format
4. Import into codebase

Works, but manual process can drift.

### Automated Sync

Tools that automate the pipeline:

**Style Dictionary (Amazon):** Transform tokens from JSON to multiple formats.

**Figma Tokens plugin:** Define tokens in Figma, sync to code.

**Tokens Studio:** Advanced token management with GitHub sync.

### Example Pipeline

<!-- illustration: token-pipeline -->

## Token Governance

Tokens require maintenance:

### Adding Tokens

- When is a new token justified?
- Who approves additions?
- How is it documented?

### Changing Tokens

- How are changes communicated?
- What's the deprecation process?
- How is versioning handled?

### Auditing Tokens

- Are all tokens used?
- Are there duplicate values?
- Is naming consistent?

## Try It Yourself

### Exercise 1: Token Inventory

For a product you're working on:

1. List all unique colors used
2. List all unique spacing values
3. List all font sizes
4. Identify inconsistencies

### Exercise 2: Define a Token System

Create a token system including:

1. 5-shade grey scale
2. Primary and secondary brand colors
3. Semantic status colors (error, warning, success)
4. Spacing scale (at least 8 values)
5. Type scale (at least 5 sizes)

### Exercise 3: Implement in CSS

Take your token system and implement it as CSS custom properties. Create a sample component using only your tokens.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "design-tokens-quiz",
  "type": "multiple-choice",
  "title": "Token Hierarchy",
  "description": "Test your understanding of primitive vs semantic tokens.",
  "difficulty": "medium",
  "question": "Why do design systems use BOTH primitive tokens (like 'blue-500') AND semantic tokens (like 'color-primary')?",
  "options": [
    {
      "id": "a",
      "text": "Semantic tokens are for designers, primitive tokens are for developers",
      "isCorrect": false,
      "explanation": "Both audiences use both types—the distinction is about abstraction level, not audience."
    },
    {
      "id": "b",
      "text": "Semantic tokens enable theming—you can change 'color-primary' to point to a different primitive for dark mode",
      "isCorrect": true,
      "explanation": "Correct! Primitives provide the palette, semantics apply the palette to purposes. For dark mode, 'color-background' can reference gray-900 instead of gray-100 without changing component code."
    },
    {
      "id": "c",
      "text": "Primitive tokens are deprecated and will be removed in future versions",
      "isCorrect": false,
      "explanation": "Primitive tokens are essential—they're the foundation that semantic tokens reference."
    },
    {
      "id": "d",
      "text": "Having both is redundant—you only need one or the other",
      "isCorrect": false,
      "explanation": "The separation of concerns is essential for maintainability and theming capabilities."
    }
  ]
}
-->

## Key Takeaways

- Design tokens are named values that store design decisions
- Categories: color, spacing, typography, effects
- Primitive tokens describe values; semantic tokens describe usage
- Good naming is consistent, specific, and predictable
- Tokens exist in design tools (styles, variables) and code (CSS properties)
- Design-to-code sync can be manual or automated
- Tokens require governance for additions, changes, and maintenance

## Next Steps

Continue to [Component Architecture](./03-component-architecture.md) →
