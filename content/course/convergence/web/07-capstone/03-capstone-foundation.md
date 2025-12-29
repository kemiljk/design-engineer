---
estimatedTime: 20
---

# Capstone: Foundation & Structure

> **Quick Summary:** Build the semantic HTML structure, CSS architecture, and JavaScript utilities for your project.

**Time Estimate:** 3-4 hours

## What You'll Learn

- Creating semantic HTML structure
- Setting up CSS with design tokens
- Building JavaScript utilities for animations and accessibility

## Step 1: Semantic HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Title</title>
    <meta name="description" content="Project description">
    
    <!-- Preload critical assets -->
    <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
    
    <!-- Styles -->
    <link rel="stylesheet" href="/styles/main.css">
</head>
<body>
    <!-- Skip Link -->
    <a href="#main" class="skip-link">Skip to main content</a>
    
    <header role="banner">
        <nav aria-label="Main navigation">
            <!-- Navigation -->
        </nav>
    </header>
    
    <main id="main" role="main">
        <section aria-labelledby="hero-heading">
            <h1 id="hero-heading">Main Heading</h1>
            <!-- Hero content -->
        </section>
        
        <section aria-labelledby="features-heading">
            <h2 id="features-heading">Features</h2>
            <!-- Features content -->
        </section>
    </main>
    
    <footer role="contentinfo">
        <!-- Footer content -->
    </footer>
    
    <script src="/scripts/main.js" defer></script>
</body>
</html>
```

## Step 2: CSS Architecture

```css
/* Design Tokens */
:root {
    /* Colours */
    --color-primary: #2563eb;
    --color-primary-hover: #1d4ed8;
    --color-text: #1f2937;
    --color-text-muted: #6b7280;
    --color-background: #ffffff;
    --color-surface: #f9fafb;
    
    /* Typography */
    --font-sans: system-ui, -apple-system, sans-serif;
    --font-size-base: 1rem;
    --line-height-base: 1.5;
    
    /* Spacing */
    --space-xs: 0.25rem;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;
    --space-2xl: 3rem;
    
    /* Animation */
    --duration-fast: 150ms;
    --duration-normal: 300ms;
    --duration-slow: 500ms;
    --easing-default: cubic-bezier(0.4, 0, 0.2, 1);
    --easing-in: cubic-bezier(0.4, 0, 1, 1);
    --easing-out: cubic-bezier(0, 0, 0.2, 1);
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Focus Styles */
:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}

/* Skip Link */
.skip-link {
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    padding: var(--space-sm) var(--space-md);
    background: var(--color-primary);
    color: white;
    text-decoration: none;
    border-radius: 0 0 4px 4px;
    z-index: 1000;
}

.skip-link:focus {
    top: 0;
}
```

## Step 3: JavaScript Foundation

```javascript
// Feature detection
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Animation helper
function animate(element, keyframes, options) {
    if (prefersReducedMotion) {
        // Skip to final state
        const finalFrame = keyframes[keyframes.length - 1];
        Object.assign(element.style, finalFrame);
        return Promise.resolve();
    }
    
    return element.animate(keyframes, options).finished;
}

// Intersection Observer for scroll animations
function createScrollObserver(callback, options = {}) {
    const defaultOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };
    
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
}

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Announce to screen readers
function announce(message, priority = 'polite') {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    setTimeout(() => {
        announcer.textContent = message;
    }, 100);
    
    setTimeout(() => {
        announcer.remove();
    }, 1000);
}
```

## Checkpoint

Before moving on, verify:

- [ ] Semantic HTML structure with proper landmarks
- [ ] CSS architecture with design tokens
- [ ] Reduced motion media query in place
- [ ] Focus styles defined
- [ ] Skip link implemented
- [ ] JavaScript utilities ready

## Try It Yourself

1. Build out your full HTML structure
2. Implement all CSS tokens
3. Test keyboard navigation
4. Verify skip link works

## Next Steps

Continue to [Phase 3: Interactions & Motion](./04-capstone-motion.md) →

