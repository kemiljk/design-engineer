---
estimatedTime: 15
---

# Capstone: Token System

> **Quick Summary:** Set up your project structure and create a complete design token system with colours, typography, spacing, and theme support.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Project structure for component libraries
- Creating CSS custom properties for design tokens
- Implementing light and dark theme support
- Building a systematic, scalable token architecture

## Step 1: Project Setup

Initialise your project:

```bash
mkdir my-component-library
cd my-component-library
npm init -y
```

Create your folder structure:

```
my-component-library/
├── src/
│   ├── tokens/
│   │   ├── colors.css
│   │   ├── typography.css
│   │   ├── spacing.css
│   │   └── index.css
│   ├── components/
│   │   ├── button/
│   │   ├── input/
│   │   └── ...
│   └── index.css
├── docs/
│   └── index.html
├── dist/
├── package.json
└── README.md
```

## Step 2: Colour Tokens

Create your colour system with semantic aliases:

```css
/* src/tokens/colors.css */
:root {
  /* Primary */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  
  /* Neutral */
  --color-neutral-0: #ffffff;
  --color-neutral-50: #f9fafb;
  --color-neutral-100: #f3f4f6;
  --color-neutral-200: #e5e7eb;
  --color-neutral-300: #d1d5db;
  --color-neutral-500: #6b7280;
  --color-neutral-700: #374151;
  --color-neutral-900: #111827;
  
  /* Semantic */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* Theme-aware aliases */
  --color-background: var(--color-neutral-0);
  --color-surface: var(--color-neutral-50);
  --color-border: var(--color-neutral-200);
  --color-text-primary: var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-500);
}

/* Dark theme */
[data-theme="dark"] {
  --color-background: var(--color-neutral-900);
  --color-surface: var(--color-neutral-700);
  --color-border: var(--color-neutral-500);
  --color-text-primary: var(--color-neutral-50);
  --color-text-secondary: var(--color-neutral-300);
}
```

## Step 3: Typography Tokens

Define your type scale:

```css
/* src/tokens/typography.css */
:root {
  /* Font families */
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-mono: ui-monospace, monospace;
  
  /* Font sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  
  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  
  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

## Step 4: Spacing & Utility Tokens

Create spacing, radius, shadows, and transitions:

```css
/* src/tokens/spacing.css */
:root {
  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  
  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;
}
```

## Step 5: Index File

Import all tokens:

```css
/* src/tokens/index.css */
@import './colors.css';
@import './typography.css';
@import './spacing.css';
```

```css
/* src/index.css */
@import './tokens/index.css';
/* Components will be added here later */
```

## Checkpoint

Before moving on, verify:

- [ ] Project structure created with src/tokens, src/components, docs, dist
- [ ] Colour tokens with primary, neutral, and semantic values
- [ ] Light and dark theme support via `[data-theme="dark"]`
- [ ] Typography tokens with font families, sizes, weights
- [ ] Spacing scale defined (0.25rem increments)
- [ ] Border radius, shadow, and transition tokens
- [ ] All tokens imported in index.css

## Try It Yourself

Test your token system:

1. Create a simple HTML file that imports your CSS
2. Add some test elements using your tokens
3. Test the theme toggle by adding/removing `data-theme="dark"` on the HTML element
4. Verify all values render correctly

## Next Steps

Continue to [Phase 2: Core Components](./03-capstone-components.md) →

