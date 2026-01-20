---
estimatedTime: 15
---

# Capstone: Performance

> **Quick Summary:** Optimise images, CSS, and JavaScript to meet your performance budget.

**Time Estimate:** 2-3 hours

## What You'll Learn

In this phase, you will tackle performance holistically. You will learn techniques for **optimising images** for the web, applying **CSS performance** best practices to avoid layout thrashing, **optimising JavaScript** execution, and measuring your success using **Core Web Vitals**.

## Step 1: Image Optimisation

```html
<!-- Responsive images -->
<picture>
    <source 
        srcset="/images/hero-800.webp 800w,
                /images/hero-1200.webp 1200w,
                /images/hero-1600.webp 1600w"
        type="image/webp">
    <img 
        src="/images/hero-1200.jpg"
        srcset="/images/hero-800.jpg 800w,
                /images/hero-1200.jpg 1200w,
                /images/hero-1600.jpg 1600w"
        sizes="(max-width: 800px) 100vw, 80vw"
        alt="Descriptive alt text"
        loading="lazy"
        decoding="async"
        width="1200"
        height="800">
</picture>
```

## Step 2: CSS Optimisation

```css
/* Use GPU-accelerated properties */
.animate-transform {
    transform: translateZ(0);
    will-change: transform;
}

/* Contain layout */
.card {
    contain: layout style paint;
}

/* Avoid expensive selectors */
/* ❌ */ .container div p span { }
/* ✅ */ .text-highlight { }
```

## Step 3: JavaScript Optimisation

```javascript
// Lazy load non-critical scripts
const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
};

// Load analytics after page is interactive
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        loadScript('/scripts/analytics.js');
    });
} else {
    setTimeout(() => {
        loadScript('/scripts/analytics.js');
    }, 2000);
}

// Efficient scroll handling
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});
```

## Step 4: Measure Performance

```javascript
// Core Web Vitals monitoring
if ('web-vital' in window) {
    import('web-vitals').then(({ getCLS, getFID, getLCP }) => {
        getCLS(console.log);
        getFID(console.log);
        getLCP(console.log);
    });
}

// Custom performance marks
performance.mark('hero-animation-start');
animateHero().then(() => {
    performance.mark('hero-animation-end');
    performance.measure('hero-animation', 'hero-animation-start', 'hero-animation-end');
});
```

## Checkpoint

Before finalising, verify that all images are optimised and served in modern formats like **WebP**, utilizing responsive `srcset` attributes. Check that your CSS employs **GPU-accelerated properties** for motion, and that non-critical JavaScript is **lazy-loaded**. Confirm that your **Lighthouse performance score** is above 90 and all **Core Web Vitals** are passing.

## Try It Yourself

Run a full **Lighthouse audit** to identify remaining issues. Open the **Performance** tab in Chrome DevTools to check your Core Web Vitals and profile your animations for dropped frames. Finally, verify that your total page weight is within the budget you set in the concept phase.

## Next Steps

Continue to [Phase 5: Documentation & Deployment](./06-capstone-deployment.md) →

