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
        <section aria-labelledby="hero-heading" class="hero">
            <!-- Shader gradient canvas for hero background -->
            <canvas id="hero-shader" aria-hidden="true"></canvas>
            <div class="hero-content">
                <h1 id="hero-heading">Main Heading</h1>
                <!-- Hero content -->
            </div>
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
    --colour-primary: #2563eb;
    --colour-primary-hover: #1d4ed8;
    --colour-text: #1f2937;
    --colour-text-muted: #6b7280;
    --colour-background: #ffffff;
    --colour-surface: #f9fafb;
    
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
    outline: 2px solid var(--colour-primary);
    outline-offset: 2px;
}

/* Skip Link */
.skip-link {
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    padding: var(--space-sm) var(--space-md);
    background: var(--colour-primary);
    colour: white;
    text-decoration: none;
    border-radius: 0 0 4px 4px;
    z-index: 1000;
}

.skip-link:focus {
    top: 0;
}

/* Hero with Shader Gradient */
.hero {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
}

#hero-shader {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.hero-content {
    position: relative;
    z-index: 1;
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

## Step 4: Hero Shader Gradient

Add a WebGL shader gradient for your hero section background. This creates a premium, dynamic feel that pure CSS cannot achieve.

```javascript
// Hero shader gradient setup
const vertexShader = `
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
    }
`;

const fragmentShader = `
    precision mediump float;
    uniform vec2 u_resolution;
    uniform float u_time;
    varying vec2 v_uv;
    
    void main() {
        // Create flowing gradient
        float gradient = (v_uv.x + v_uv.y) / 2.0;
        gradient += sin(v_uv.x * 3.0 + u_time) * 0.1;
        gradient += sin(v_uv.y * 2.0 - u_time * 0.7) * 0.08;
        
        // Your brand colours
        vec3 color1 = vec3(0.15, 0.1, 0.25);  // Deep purple
        vec3 color2 = vec3(0.2, 0.15, 0.35);  // Lighter purple
        
        vec3 color = mix(color1, color2, clamp(gradient, 0.0, 1.0));
        gl_FragColor = vec4(color, 1.0);
    }
`;

function initHeroShader() {
    const canvas = document.getElementById('hero-shader');
    if (!canvas) return;
    
    const gl = canvas.getContext('webgl');
    if (!gl) {
        // Fallback to CSS gradient
        canvas.style.background = 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 100%)';
        return;
    }
    
    // Compile shaders and create program
    // ... (full implementation in Creative Visual Effects module)
    
    // Animation loop
    function render(time) {
        // Update uniforms and draw
        if (!prefersReducedMotion) {
            requestAnimationFrame(render);
        }
    }
    
    // Handle resize
    function resize() {
        const dpr = Math.min(window.devicePixelRatio, 2);
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    
    window.addEventListener('resize', debounce(resize, 100));
    resize();
    requestAnimationFrame(render);
}

// Initialise on load
document.addEventListener('DOMContentLoaded', initHeroShader);
```

Refer to the [Creative Visual Effects module](../04-creative-visual-effects/02-introduction-to-shaders.md) for the complete shader implementation.

## Checkpoint

Before moving on, verify:

- [ ] Semantic HTML structure with proper landmarks
- [ ] CSS architecture with design tokens
- [ ] Reduced motion media query in place
- [ ] Focus styles defined
- [ ] Skip link implemented
- [ ] JavaScript utilities ready
- [ ] Hero shader gradient implemented with CSS fallback

## Try It Yourself

1. Build out your full HTML structure
2. Implement all CSS tokens
3. Add the hero shader gradient with CSS fallback
4. Test keyboard navigation
5. Verify skip link works

## Next Steps

Continue to [Phase 3: Interactions & Motion](./04-capstone-motion.md) →

