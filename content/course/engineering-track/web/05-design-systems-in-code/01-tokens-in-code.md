# Tokens in Code

> **Quick Summary:** Design tokens in code create a single source of truth for design values, enabling consistency and themability.

## What You'll Learn

- Implementing design tokens with CSS custom properties
- Token naming conventions
- Token organization strategies
- Connecting design tokens to design tools

## CSS Custom Properties as Tokens

```css
:root {
  /* Color tokens */
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-neutral-100: #f3f4f6;
  --color-neutral-900: #111827;

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
  --color-primary: var(--blue-500);
  --color-background: var(--neutral-100);
  --color-text: var(--neutral-900);

  /* Component tokens */
  --button-bg: var(--color-primary);
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
  --color-background: var(--neutral-100);
  --color-text: var(--neutral-900);
  --color-surface: white;
}

/* Dark theme */
[data-theme="dark"] {
  --color-background: var(--neutral-900);
  --color-text: var(--neutral-100);
  --color-surface: var(--neutral-800);
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
      "explanation": "Performance difference is negligible—the benefits are about maintainability."
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

- CSS custom properties are native token implementation
- Organize as primitives → semantic → component tokens
- Semantic tokens enable theming
- Use tokens everywhere—no hardcoded values in components

## Next Steps

Continue to [Building a Token System](./02-building-a-token-system.md) →
