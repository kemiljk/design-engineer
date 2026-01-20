# Building a Token System

> **Quick Summary:** A complete token system covers colours, typography, spacing, and effects—providing everything needed to build consistent interfaces.

## What You'll Learn

In this lesson, we will cover the creation of comprehensive colour scales and typography systems. You will learn how to define robust spacing scales and explore the use of effect tokens, such as those for shadows and border radii.

## Color System

### Gray Scale

```css
:root {
  --neutral-50: #f9fafb;
  --neutral-100: #f3f4f6;
  --neutral-200: #e5e7eb;
  --neutral-300: #d1d5db;
  --neutral-400: #9ca3af;
  --neutral-500: #6b7280;
  --neutral-600: #4b5563;
  --neutral-700: #374151;
  --neutral-800: #1f2937;
  --neutral-900: #111827;
}
```

### Brand Colors

```css
:root {
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-200: #bfdbfe;
  --primary-300: #93c5fd;
  --primary-400: #60a5fa;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;
  --primary-800: #1e40af;
  --primary-900: #1e3a8a;
}
```

### Semantic Colors

```css
:root {
  --colour-success: #10b981;
  --colour-warning: #f59e0b;
  --colour-error: #ef4444;
  --colour-info: #3b82f6;
}
```

## Typography System

```css
:root {
  /* Font families */
  --font-sans: "Inter", -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  /* Font sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;

  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

## Spacing System

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem; /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */
  --space-20: 5rem; /* 80px */
}
```

## Effect System

```css
:root {
  /* Border radius */
  --radius-none: 0;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}
```

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "token-system-quiz",
  "type": "multiple-choice",
  "title": "Building a Token System",
  "description": "Test your understanding of token architecture.",
  "difficulty": "medium",
  "question": "What is the relationship between 'primitive' and 'semantic' tokens?",
  "options": [
    {
      "id": "a",
      "text": "They're different names for the same thing",
      "isCorrect": false,
      "explanation": "They serve different purposes in the token hierarchy."
    },
    {
      "id": "b",
      "text": "Semantic tokens reference primitive tokens, adding meaning like 'colour-primary' → 'blue-500'",
      "isCorrect": true,
      "explanation": "Correct! Primitives define raw values (blue-500: #3B82F6), semantics add meaning (colour-primary: var(--blue-500)). This allows theming by changing what semantic tokens reference."
    },
    {
      "id": "c",
      "text": "Primitives are for designers, semantics are for developers",
      "isCorrect": false,
      "explanation": "Both audiences use both types. The distinction is about abstraction level."
    },
    {
      "id": "d",
      "text": "Semantic tokens are deprecated in favour of primitives",
      "isCorrect": false,
      "explanation": "Both are essential parts of a well-structured token system."
    }
  ]
}
-->

## Key Takeaways

In summary, a strong token system relies on building comprehensive scales for each design category. A 50–900 scale typically works well for colours, while spacing should follow a consistent 4px or 8px grid. Ensure your type scales use consistent ratios and always document exactly which tokens should be used in specific contexts to maintain consistency across the team.

## Next Steps

Continue to [Component API Design](./03-component-api-design.md) →
