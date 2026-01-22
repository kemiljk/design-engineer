# Tokens in Code

> **Quick Summary:** Design tokens in code create a single source of truth for design values, enabling consistency and themability.

## What You'll Learn

- The practical implementation of design tokens using CSS custom properties
- Token naming conventions and organisation strategies
- How to effectively connect your design tokens to various design tools

## CSS Custom Properties as Tokens

```css
:root {
  /* Color tokens */
  --colour-primary-500: #3b82f6;
  --colour-primary-600: #2563eb;
  --colour-neutral-100: #f3f4f6;
  --colour-neutral-900: #111827;

  /* Spacing tokens */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-6: 1.5rem;

  /* Typography tokens */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;

  /* Border radius tokens */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;

  /* Shadow tokens */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## Semantic Tokens

Layer meaning on top of primitives:

```css
:root {
  /* Primitive tokens */
  --blue-500: #3b82f6;
  --neutral-100: #f3f4f6;
  --neutral-900: #111827;

  /* Semantic tokens */
  --colour-primary: var(--blue-500);
  --colour-background: var(--neutral-100);
  --colour-text: var(--neutral-900);

  /* Component tokens */
  --button-bg: var(--colour-primary);
  --card-bg: white;
}
```

## Using Tokens in Components

```css
.button {
  background: var(--button-bg);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
}

.card {
  background: var(--card-bg);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
```

## Theming with Tokens

```css
/* Light theme (default) */
:root {
  --colour-background: var(--neutral-100);
  --colour-text: var(--neutral-900);
  --colour-surface: white;
}

/* Dark theme */
[data-theme="dark"] {
  --colour-background: var(--neutral-900);
  --colour-text: var(--neutral-100);
  --colour-surface: var(--neutral-800);
}
```

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "tokens-in-code-quiz",
  "type": "multiple-choice",
  "title": "Design Tokens in Code",
  "description": "Test your understanding of implementing design tokens.",
  "difficulty": "easy",
  "question": "Why use CSS custom properties for design tokens instead of hardcoded values?",
  "options": [
    {
      "id": "a",
      "text": "Custom properties are faster for the browser to render",
      "isCorrect": false,
      "explanation": "Performance difference is negligible. The benefits are about maintainability."
    },
    {
      "id": "b",
      "text": "Single source of truth that can be updated globally and changed at runtime (for theming)",
      "isCorrect": true,
      "explanation": "Correct! Custom properties allow you to change one value to update everywhere, and they can be changed at runtime for features like dark mode."
    },
    {
      "id": "c",
      "text": "They work in older browsers that don't support modern CSS",
      "isCorrect": false,
      "explanation": "Custom properties have newer browser requirements than hardcoded values."
    },
    {
      "id": "d",
      "text": "They automatically generate documentation",
      "isCorrect": false,
      "explanation": "You still need to document tokens manually or with tooling."
    }
  ]
}
-->

## Key Takeaways

- To recap, CSS custom properties serve as a native way to implement design tokens in your code
- It is best practice to organise these tokens from primitives to semantic tokens, and finally to specific component tokens
- Semantic tokens are particularly powerful as they enable easy theming
- You should aim to use tokens throughout your styles to eliminate hardcoded values in your components

## Next Steps

Continue to [Building a Token System](./02-building-a-token-system.md) →
