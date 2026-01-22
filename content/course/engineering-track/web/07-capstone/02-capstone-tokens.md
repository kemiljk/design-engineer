---
estimatedTime: 15
---

# Capstone: Token System

> **Quick Summary:** Set up your project structure and create a complete design token system with colours, typography, spacing, and theme support.

**Time Estimate:** 2-3 hours

## What You'll Learn

- The project structure for component libraries
- How to create CSS custom properties for design tokens
- How to implement support for both light and dark themes
- How to build a systematic, scalable token architecture

## Step 1: Project Setup

Initialise your project:

```bash
mkdir my-component-library
cd my-component-library
npm init -y
```

Create your folder structure:

```text
my-component-library/
├── src/
│   ├── tokens/
│   │   ├── colours.css
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
/* src/tokens/colours.css */
:root {
  /* Primary */
  --colour-primary-50: #eff6ff;
  --colour-primary-100: #dbeafe;
  --colour-primary-500: #3b82f6;
  --colour-primary-600: #2563eb;
  --colour-primary-700: #1d4ed8;
  
  /* Neutral */
  --colour-neutral-0: #ffffff;
  --colour-neutral-50: #f9fafb;
  --colour-neutral-100: #f3f4f6;
  --colour-neutral-200: #e5e7eb;
  --colour-neutral-300: #d1d5db;
  --colour-neutral-500: #6b7280;
  --colour-neutral-700: #374151;
  --colour-neutral-900: #111827;
  
  /* Semantic */
  --colour-success: #22c55e;
  --colour-warning: #f59e0b;
  --colour-error: #ef4444;
  --colour-info: #3b82f6;
  
  /* Theme-aware aliases */
  --colour-background: var(--colour-neutral-0);
  --colour-surface: var(--colour-neutral-50);
  --colour-border: var(--colour-neutral-200);
  --colour-text-primary: var(--colour-neutral-900);
  --colour-text-secondary: var(--colour-neutral-500);
}

/* Dark theme */
[data-theme="dark"] {
  --colour-background: var(--colour-neutral-900);
  --colour-surface: var(--colour-neutral-700);
  --colour-border: var(--colour-neutral-500);
  --colour-text-primary: var(--colour-neutral-50);
  --colour-text-secondary: var(--colour-neutral-300);
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
@import './colours.css';
@import './typography.css';
@import './spacing.css';
```

```css
/* src/index.css */
@import './tokens/index.css';
/* Components will be added here later */
```

## Checkpoint

Before moving on, verify that you have created the correct project structure with `src/tokens`, `src/components`, `docs`, and `dist` directories. Ensure your colour tokens include primary, neutral, and semantic values, and that you have implemented light and dark theme support via the `[data-theme="dark"]` selector. You should also have typography tokens covering font families, sizes, and weights, a defined spacing scale using 0.25rem increments, and tokens for border radii, shadows, and transitions. Finally, confirm that all your token files are correctly imported into `index.css`.

## Try It Yourself

Test your token system:

1. Create a simple HTML file that imports your CSS
2. Add some test elements using your tokens
3. Test the theme toggle by adding/removing `data-theme="dark"` on the HTML element
4. Verify all values render correctly

## Next Steps

Continue to [Phase 2: Core Components](./03-capstone-components.md) →

