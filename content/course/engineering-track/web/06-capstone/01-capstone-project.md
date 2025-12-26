# Capstone Project: Build a Deployable Component Library

> **Quick Summary:** Apply everything you've learned to build a production-ready component library with a token system, full accessibility, interactive documentation, and deployment to npm or a CDN.

## What You'll Learn

- How to synthesize all engineering skills into a cohesive library
- Building a CSS custom properties token system from scratch
- Creating accessible, production-ready components
- Documenting components for developer consumption
- Deploying and versioning a component library

## Project Overview

This capstone brings together everything from the Engineering Track: HTML fundamentals, CSS mastery, JavaScript essentials, component building, and design systems in code. You'll build a complete component library that demonstrates professional-level frontend engineering.

**Why this project?** Component libraries are exceptional portfolio pieces. They showcase:
- Deep HTML/CSS knowledge (semantic, accessible markup)
- JavaScript proficiency (interactive behaviours)
- Systems thinking (consistent APIs, tokens)
- Documentation skills (developer experience)
- DevOps awareness (deployment, versioning)

**Time Estimate:** 10-15 hours

## What You'll Create

By the end of this capstone, you'll have:

1. **Token System**
   - CSS custom properties for colours, typography, spacing
   - Light and dark theme support
   - Easily customizable by consumers

2. **Component Library (8-10 components)**
   - Button
   - Input
   - Card
   - Badge
   - Alert
   - Modal
   - Tooltip
   - Dropdown
   - Plus 2-3 additional components

3. **Interactive Documentation**
   - Live component examples
   - Props/API documentation
   - Usage guidelines
   - Copy-paste code snippets

4. **Deployment**
   - Published to npm, GitHub Packages, or CDN
   - Version tagged releases
   - README with installation instructions

5. **GitHub Repository**
   - Clean code organisation
   - Comprehensive README
   - MIT license (or similar)

## The Brief: Design System Theme

Choose a theme for your component library:

### Option A: Minimal System
Clean, unopinionated components:
- **Style:** Simple, functional, highly customizable
- **Inspiration:** Radix, Headless UI, Reach UI
- **Focus:** Accessibility and flexibility over visual flourish

### Option B: Modern Professional
Contemporary, polished business aesthetic:
- **Style:** Clean lines, subtle shadows, professional feel
- **Inspiration:** Stripe, Linear, Vercel
- **Focus:** Polish and developer experience

### Option C: Playful/Creative
Friendly, approachable design:
- **Style:** Rounded corners, vibrant colours, personality
- **Inspiration:** Discord, Notion, Framer
- **Focus:** Delight and expressiveness

### Option D: Your Brand
Design from scratch:
- **Style:** Your unique design direction
- **Focus:** Creating something distinctive

## Phase 1: Token System (2-3 hours)

### Step 1: Project Setup
Initialize your project:

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

### Step 2: Colour Tokens

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

### Step 3: Typography Tokens

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

### Step 4: Spacing & Misc Tokens

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

### Checkpoint
✓ Project structure created
✓ Colour tokens with light/dark support
✓ Typography tokens defined
✓ Spacing and utility tokens defined
✓ All tokens imported in index.css

## Phase 2: Core Components (4-5 hours)

Build these components with full accessibility:

### Component 1: Button

```css
/* src/components/button/button.css */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variants */
.btn--primary {
  background: var(--color-primary-500);
  color: white;
}

.btn--primary:hover:not(:disabled) {
  background: var(--color-primary-600);
}

.btn--secondary {
  background: transparent;
  border-color: var(--color-border);
  color: var(--color-text-primary);
}

.btn--ghost {
  background: transparent;
  color: var(--color-text-primary);
}

/* Sizes */
.btn--sm { padding: var(--space-1) var(--space-3); font-size: var(--text-xs); }
.btn--lg { padding: var(--space-3) var(--space-6); font-size: var(--text-base); }
```

### Component Requirements

For each component, implement:

**Button:**
- Variants: primary, secondary, ghost, destructive
- Sizes: sm, md (default), lg
- States: default, hover, focus, active, disabled
- Support: icon-only, icon + text, loading state
- A11y: focus visible, disabled state

**Input:**
- Types: text, email, password, search
- States: default, focus, filled, error, disabled
- Features: labels, help text, error messages
- A11y: proper labeling, error announcements

**Card:**
- Variants: elevated, outlined, filled
- Parts: header, body, footer, media
- Interactive: clickable card option
- A11y: semantic structure, focus if interactive

**Badge:**
- Variants: default, primary, success, warning, error
- Sizes: sm, md
- Features: with icon, dismissible

**Alert:**
- Variants: info, success, warning, error
- Parts: icon, title, description, actions
- Features: dismissible
- A11y: role="alert" for important messages

**Modal:**
- Features: header, body, footer
- Behavior: focus trap, escape to close, click outside
- A11y: aria-modal, focus management, screen reader announcements

**Tooltip:**
- Trigger: hover, focus
- Position: top, right, bottom, left
- A11y: proper ARIA relationships

**Dropdown:**
- Trigger: button element
- Features: options, groups, disabled items
- Behavior: keyboard navigation
- A11y: proper ARIA, roving tabindex

### JavaScript Behaviors

For interactive components, create vanilla JS:

```javascript
// src/components/modal/modal.js
class Modal {
  constructor(element) {
    this.modal = element;
    this.trigger = document.querySelector(`[data-modal-trigger="${element.id}"]`);
    this.closeButtons = element.querySelectorAll('[data-modal-close]');
    this.previouslyFocused = null;
    
    this.init();
  }
  
  init() {
    this.trigger?.addEventListener('click', () => this.open());
    this.closeButtons.forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });
    this.modal.addEventListener('keydown', (e) => this.handleKeydown(e));
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });
  }
  
  open() {
    this.previouslyFocused = document.activeElement;
    this.modal.setAttribute('aria-hidden', 'false');
    this.modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    this.trapFocus();
  }
  
  close() {
    this.modal.setAttribute('aria-hidden', 'true');
    this.modal.classList.remove('is-open');
    document.body.style.overflow = '';
    this.previouslyFocused?.focus();
  }
  
  handleKeydown(e) {
    if (e.key === 'Escape') this.close();
  }
  
  trapFocus() {
    const focusable = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable[0]?.focus();
  }
}

// Initialize all modals
document.querySelectorAll('[data-modal]').forEach(el => new Modal(el));
```

### Checkpoint
✓ Button component with all variants and states
✓ Input component with validation states
✓ Card component with variants
✓ Badge component
✓ Alert component
✓ Modal with focus trap
✓ Tooltip with positioning
✓ Dropdown with keyboard nav
✓ All components accessible

## Phase 3: Documentation (2-3 hours)

### Step 1: Documentation Site Structure

```html
<!-- docs/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Component Library</title>
  <link rel="stylesheet" href="../src/index.css">
  <link rel="stylesheet" href="docs.css">
</head>
<body>
  <nav class="docs-nav">
    <h1>Component Library</h1>
    <ul>
      <li><a href="#getting-started">Getting Started</a></li>
      <li><a href="#tokens">Design Tokens</a></li>
      <li><a href="#button">Button</a></li>
      <li><a href="#input">Input</a></li>
      <!-- ... -->
    </ul>
  </nav>
  
  <main class="docs-content">
    <section id="getting-started">
      <h2>Getting Started</h2>
      <h3>Installation</h3>
      <pre><code>npm install my-component-library</code></pre>
      
      <h3>Usage</h3>
      <pre><code>@import 'my-component-library';</code></pre>
    </section>
    
    <section id="button">
      <h2>Button</h2>
      <p>Buttons trigger actions or navigation.</p>
      
      <h3>Examples</h3>
      <div class="example">
        <div class="example-preview">
          <button class="btn btn--primary">Primary</button>
          <button class="btn btn--secondary">Secondary</button>
          <button class="btn btn--ghost">Ghost</button>
        </div>
        <pre class="example-code"><code>&lt;button class="btn btn--primary"&gt;Primary&lt;/button&gt;</code></pre>
      </div>
      
      <h3>Variants</h3>
      <!-- Document each variant -->
      
      <h3>Sizes</h3>
      <!-- Document each size -->
      
      <h3>States</h3>
      <!-- Document each state -->
      
      <h3>Accessibility</h3>
      <ul>
        <li>Use <code>&lt;button&gt;</code> for actions</li>
        <li>Use <code>&lt;a&gt;</code> for navigation</li>
        <li>Always provide accessible names</li>
      </ul>
    </section>
    
    <!-- Repeat for each component -->
  </main>
</body>
</html>
```

### Step 2: Per-Component Documentation

For each component, document:
- **Purpose:** What the component is for
- **Examples:** Visual examples with code
- **API:** All available classes/variants
- **States:** All possible states
- **Accessibility:** A11y considerations
- **Do's and Don'ts:** Usage guidelines

### Step 3: Interactive Features (Optional)

Add interactivity to docs:
- Theme switcher (light/dark)
- Code copy buttons
- Live playground
- Responsive preview

### Checkpoint
✓ Documentation site structure
✓ Getting started guide
✓ All components documented
✓ Code examples copyable
✓ Theme switcher works

## Phase 4: Deployment (2-3 hours)

### Step 1: Build Process

```json
// package.json
{
  "name": "your-component-library",
  "version": "1.0.0",
  "description": "A production-ready component library",
  "main": "dist/index.css",
  "files": ["dist"],
  "scripts": {
    "build": "npm run build:css && npm run build:js",
    "build:css": "postcss src/index.css -o dist/index.css",
    "build:js": "esbuild src/index.js --bundle --minify --outfile=dist/index.js"
  },
  "keywords": ["components", "css", "design-system"],
  "author": "Your Name",
  "license": "MIT"
}
```

### Step 2: GitHub Repository

Create a comprehensive README:

```markdown
# Your Component Library

A production-ready component library with accessibility built-in.

## Installation

npm install your-component-library

## Usage

@import 'your-component-library';

## Components

- Button
- Input
- Card
- Badge
- Alert
- Modal
- Tooltip
- Dropdown

## Customization

Override CSS custom properties to customise:

:root {
  --color-primary-500: #your-brand-color;
}

## Documentation

See full documentation at: [your-docs-url]

## License

MIT
```

### Step 3: Publish

**Option A: npm**
```bash
npm login
npm publish
```

**Option B: GitHub Packages**
Configure package.json with registry URL.

**Option C: CDN (unpkg/jsDelivr)**
Once on npm, automatically available via:
```html
<link rel="stylesheet" href="https://unpkg.com/your-package@1.0.0/dist/index.css">
```

**Option D: GitHub Pages**
Deploy docs site to GitHub Pages.

### Checkpoint
✓ Build process creates dist files
✓ GitHub repo with README
✓ Library published/deployed
✓ Docs site live

## Submission Checklist

Your capstone should include:

- [ ] **Token System**
  - [ ] Colour tokens (light/dark)
  - [ ] Typography tokens
  - [ ] Spacing tokens
  - [ ] All use CSS custom properties

- [ ] **Components (8-10 minimum)**
  - [ ] Button (all variants, sizes, states)
  - [ ] Input (validation, error states)
  - [ ] Card (variants)
  - [ ] Badge
  - [ ] Alert
  - [ ] Modal (with focus trap)
  - [ ] Tooltip
  - [ ] Dropdown (keyboard accessible)
  - [ ] 2+ additional components

- [ ] **Accessibility**
  - [ ] Semantic HTML throughout
  - [ ] Keyboard navigable
  - [ ] Focus visible states
  - [ ] ARIA where needed
  - [ ] Colour contrast passing

- [ ] **Documentation**
  - [ ] Getting started guide
  - [ ] Each component documented
  - [ ] Code examples
  - [ ] Accessibility notes

- [ ] **Deployment**
  - [ ] GitHub repository
  - [ ] Published (npm/CDN/GitHub Pages)
  - [ ] README complete

## Evaluation Criteria

| Criteria | Developing | Proficient | Excellent |
|----------|-----------|------------|-----------|
| **Code Quality** | Works but inconsistent | Clean, consistent patterns | Exceptional organisation, DRY, maintainable |
| **Accessibility** | Some consideration | WCAG AA compliant | Exemplary a11y, thorough testing |
| **Documentation** | Basic docs exist | Clear, complete docs | Exceptional DX, live examples, thorough |
| **API Design** | Functional but awkward | Intuitive, consistent | Elegant, flexible, well-considered |
| **Visual Polish** | Basic styling | Clean, professional | Beautiful, cohesive, delightful |
| **Token System** | Tokens exist | Well-organised, useful | Elegant architecture, fully themeable |

## Examples for Inspiration

Study these component libraries:

**Minimal/Headless:**
- Radix UI (radix-ui.com)
- Headless UI (headlessui.com)
- Reach UI (reach.tech)

**Styled:**
- Chakra UI (chakra-ui.com)
- Mantine (mantine.dev)
- daisyUI (daisyui.com)

**Enterprise:**
- Carbon Design System (carbondesignsystem.com)
- Atlassian Design System
- Polaris (polaris.shopify.com)

## Tips for Success

1. **Start with tokens.** A solid foundation makes components easier.
2. **Build accessibility in.** Don't bolt it on after.
3. **Document as you build.** Don't leave it all for the end.
4. **Test in context.** Components should work together.
5. **Keep scope realistic.** 8-10 polished components > 20 rough ones.
6. **Use real content.** "Lorem ipsum" hides layout issues.

## What's Next

Congratulations on completing the Engineering Track capstone!

This project demonstrates:
- Deep HTML, CSS, and JavaScript knowledge
- Systems thinking and API design
- Accessibility expertise
- Documentation and developer experience focus

**Portfolio Tip:** A component library is an exceptional portfolio piece. Consider:
- Writing about your design decisions on a blog
- Creating a video walkthrough
- Sharing specific components on CodePen/CodeSandbox
- Discussing token architecture in interviews

**Continue your journey:**
- → [Convergence Track](/course/convergence/web) — Add motion and polish
- → [iOS Engineering Track](/course/engineering-track/ios) — Build in SwiftUI
- → [Android Engineering Track](/course/engineering-track/android) — Build in Compose
