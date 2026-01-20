# Tokens and Variables

> **Quick Summary:** Design tokens are named values that store design decisions—colours, spacing, typography—creating a shared vocabulary between design and code.

## What You'll Learn

By progressing through this lesson, you will understand what design tokens are and why they are essential for modern design systems. You will also learn about token naming conventions and hierarchies, explore the differences between semantic and primitive tokens, and master the techniques for implementing tokens across both design tools and codebases.

## What Are Design Tokens?

> *"The strength of a design system is in its constraints."* — Nathan Curtis

Design tokens are named containers for design values:

| Instead of | Use |
|------------|-----|
| #3B82F6 | primary-500 |
| 16px | space-4 |
| Inter Bold 24px | heading-large |

Tokens abstract raw values into meaningful names, providing global consistency and improved maintainability by allowing you to update a single value to effect changes across the entire system. Furthermore, tokens establish a shared vocabulary between design and engineering and enable powerful theming capabilities by allowing you to swap sets of values for different brand or interface modes.

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

```text
blue-500: #3B82F6
grey-100: #F3F4F6
space-4: 16px
```

Primitive tokens describe _what_ the value is.

### Semantic Tokens

Values with contextual meaning:

```text
colour-primary: {blue-500}
colour-background: {grey-100}
space-component-padding: {space-4}
```

Semantic tokens describe _how_ the value is used.

### Why Both?

Primitive tokens provide the palette.
Semantic tokens apply the palette to purposes.

This separation enables theming:

| Token | Light Theme | Dark Theme |
|-------|-------------|------------|
| colour-background | grey-100 → #F3F4F6 | grey-900 → #111827 |
| colour-text | grey-900 → #111827 | grey-100 → #F3F4F6 |

Same semantic tokens, different values.

## Naming Conventions

Consistent naming makes tokens discoverable and intuitive.

### Common Patterns

**Category-Property-Variant:**

```text
colour-background-primary
colour-text-secondary
space-padding-large
```

**Property-Scale:**

```text
font-size-sm
font-size-md
font-size-lg
```

**Component-Property-State:**

```text
button-background-default
button-background-hover
button-background-disabled
```

When naming tokens, strive for consistency by following established patterns everywhere and use specific terms like `text-colour-primary` to ensure clarity. Predictability is also key, as users should be able to intuitively guess token names. Finally, avoid using "magic numbers" by sticking to logical scales like sm, md, and lg, or numeric systems that relate directly to your core grid.

## Token Hierarchies

Organise tokens into logical groups:

<!-- illustration: token-file-structure -->

## Tokens in Design Tools

Modern design tools support token concepts through styles and variables:

#### Colour Styles
Named colours such as `Primary/500`, `Grey/100`, and `Error/500` should be defined and applied consistently so that updating a single style instantly reflects across all associated instances.

#### Text Styles
Named typography styles like `Heading/Large`, `Body/Default`, and `Caption/Small` encapsulate specific font families, sizes, weights, and line-heights into single reusable definitions.

#### Variables
Advanced token support through tools like Figma Variables allows for the management of numeric values for spacing, distinct modes for light and dark themes, and complex aliasing where semantic tokens reference primitive ones.

## Tokens in Code

### CSS Custom Properties

The web-native approach:

```css
:root {
  /* Primitives */
  --colour-blue-500: #3b82f6;
  --colour-neutral-100: #f3f4f6;
  --colour-neutral-900: #111827;

  /* Semantics */
  --colour-primary: var(--colour-blue-500);
  --colour-background: var(--colour-neutral-100);
  --colour-text: var(--colour-neutral-900);

  /* Spacing */
  --space-4: 16px;
  --space-6: 24px;
}

.button {
  background: var(--colour-primary);
  padding: var(--space-4);
}
```

### Theme Switching

CSS custom properties enable runtime theming:

```css
[data-theme="dark"] {
  --colour-background: var(--colour-neutral-900);
  --colour-text: var(--colour-neutral-100);
}
```

### JavaScript/Framework Tokens

Many frameworks have token systems:

```javascript
// Tailwind config
module.exports = {
  theme: {
    colours: {
      primary: "#3B82F6",
      grey: {
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

The manual sync process involves defining tokens within a design tool and exporting them as JSON, which is then transformed into CSS or JavaScript formats to be imported into the codebase. While effective, this approach requires careful management to ensure the two environments don't drift apart over time.

### Automated Sync

Tools that automate the pipeline:

**Style Dictionary (Amazon):** Transform tokens from JSON to multiple formats.

**Figma Tokens plugin:** Define tokens in Figma, sync to code.

**Tokens Studio:** Advanced token management with GitHub sync.

### Example Pipeline

<!-- illustration: token-pipeline -->

Tokens require rigorous governance, including clear criteria and approval processes for adding new values, well-defined deprecation and versioning strategies for making changes, and regular audits to remove duplicates or inconsistencies and ensure naming remains predictable.

## Try It Yourself

For a product you're currently working on, perform a token inventory by listing all unique colours, spacing values, and font sizes used across the interface. Use this list to identify and document any inconsistencies that need to be addressed.

Define a comprehensive token system that includes at least five shades of grey, primary and secondary brand colours, and semantic status colours for errors, warnings, and success. Additionally, establish scales for spacing with at least eight values and typography with at least five distinct sizes.

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
  "question": "Why do design systems use BOTH primitive tokens (like 'blue-500') AND semantic tokens (like 'colour-primary')?",
  "options": [
    {
      "id": "a",
      "text": "Semantic tokens are for designers, primitive tokens are for developers",
      "isCorrect": false,
      "explanation": "Both audiences use both types—the distinction is about abstraction level, not audience."
    },
    {
      "id": "b",
      "text": "Semantic tokens enable theming—you can change 'colour-primary' to point to a different primitive for dark mode",
      "isCorrect": true,
      "explanation": "Correct! Primitives provide the palette, semantics apply the palette to purposes. For dark mode, 'colour-background' can reference grey-900 instead of grey-100 without changing component code."
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

Design tokens are named values that store crucial design decisions across categories like colour, spacing, typography, and effects. By distinguishing between primitive tokens that describe values and semantic tokens that describe usage, you can create a consistent and specific system that resides in both design tools and code. Maintaining this system requires clear governance for additions and changes, alongside either manual or automated synchronization to ensure design and engineering remain aligned.

## Next Steps

Continue to [Component Architecture](./03-component-architecture.md) →
