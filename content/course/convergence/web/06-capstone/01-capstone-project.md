# Capstone Project: Design Engineer Portfolio Piece

> **Quick Summary:** Synthesize everything from the Web Convergence Track into a polished, portfolio-ready project that demonstrates your motion design, accessibility, performance, and design engineering workflow skills.

## What You'll Learn

- How to bring together motion, accessibility, and performance in one project
- Building production-ready interactive experiences
- Creating case studies that demonstrate design engineering skills
- Implementing accessible animations and micro-interactions
- Optimizing for real-world performance constraints

## Project Overview

This capstone is the culmination of the Web Convergence Track. You'll build a sophisticated interactive project that showcases your unique position at the intersection of design and engineering—able to both design and implement delightful, accessible, performant experiences.

**Why this project?** A design engineer portfolio piece demonstrates:
- Motion design sensibility and implementation skills
- Accessibility-first thinking
- Performance awareness
- Ability to ship polished work
- Design-to-code fluency

**Time Estimate:** 15-20 hours

## What You'll Create

By the end of this capstone, you'll have:

1. **Interactive Experience**
   - A polished, interactive web project
   - Thoughtful motion and micro-interactions
   - Responsive across devices

2. **Accessibility Excellence**
   - WCAG 2.1 AA compliant
   - Full keyboard navigation
   - Screen reader optimised
   - Reduced motion support

3. **Performance Optimized**
   - Fast initial load
   - Smooth 60fps animations
   - Optimized assets
   - Core Web Vitals passing

4. **Case Study**
   - Process documentation
   - Design decisions explained
   - Technical challenges solved
   - Results and learnings

5. **Live Deployment**
   - Deployed to production
   - GitHub repository
   - Portfolio-ready presentation

## The Brief: Choose Your Project

Select one of these project types, or propose your own:

### Option A: Interactive Product Landing Page
A marketing page with sophisticated interactions:
- **Features:** Hero animation, scroll-based reveals, interactive demos, micro-interactions
- **Key Sections:** Hero, features, testimonials, pricing, footer
- **Challenge:** Balance visual richness with performance and accessibility

### Option B: Interactive Data Visualization
A storytelling experience with data:
- **Features:** Animated charts, scroll-driven narrative, interactive exploration
- **Key Sections:** Introduction, data story, exploration tool, conclusion
- **Challenge:** Make data accessible and animations meaningful

### Option C: Portfolio/Case Study Site
Your own design engineering portfolio:
- **Features:** Project showcases, smooth transitions, interactive elements
- **Key Sections:** About, projects, case studies, contact
- **Challenge:** Demonstrate skills while maintaining usability

### Option D: Interactive Tool or Utility
A useful web tool with great UX:
- **Features:** Core functionality, delightful interactions, helpful feedback
- **Examples:** Colour palette generator, design token converter, accessibility checker
- **Challenge:** Make utility feel crafted and enjoyable

## Phase 1: Concept & Design (3-4 hours)

### Step 1: Define Your Project

Document your concept:

```markdown
## Project Brief

**Project:** [Name]
**Type:** [Landing page / Data viz / Portfolio / Tool]
**Goal:** [What should users do/feel/learn?]

### Target Audience
- Who will use this?
- What devices do they use?
- Any accessibility considerations?

### Success Metrics
- [ ] Metric 1
- [ ] Metric 2
- [ ] Metric 3

### Constraints
- Timeline: X hours
- Technology: HTML, CSS, vanilla JS
- Performance: < 3s load time
- Accessibility: WCAG 2.1 AA
```

### Step 2: Motion Inventory

Plan your animations purposefully:

```markdown
## Motion Design Plan

### Page-Level Transitions
| Transition | Purpose | Duration | Easing |
|------------|---------|----------|--------|
| Hero entrance | Draw attention, set tone | 600ms | ease-out |
| Scroll reveals | Guide reading flow | 400ms | ease-out |
| Page exit | Smooth navigation | 300ms | ease-in |

### Micro-Interactions
| Element | Trigger | Animation | Purpose |
|---------|---------|-----------|---------|
| Buttons | Hover | Scale, shadow | Affordance |
| Links | Hover | Underline slide | Feedback |
| Form inputs | Focus | Border glow | Focus state |
| Cards | Hover | Lift, shadow | Interactivity |

### Reduced Motion Fallbacks
- Replace motion with opacity fades
- Instant state changes
- Static alternatives
```

### Step 3: Accessibility Checklist

Plan accessibility from the start:

```markdown
## Accessibility Plan

### Semantic Structure
- [ ] Logical heading hierarchy
- [ ] Landmark regions
- [ ] Skip links

### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Focus visible and styled
- [ ] Logical tab order
- [ ] No keyboard traps

### Screen Readers
- [ ] Meaningful alt text
- [ ] ARIA labels where needed
- [ ] Live regions for updates
- [ ] Hidden decorative elements

### Visual
- [ ] 4.5:1 contrast minimum
- [ ] Focus indicators visible
- [ ] Not color-only information
- [ ] Reduced motion respected
```

### Step 4: Performance Budget

Set performance constraints:

```markdown
## Performance Budget

### Load Time
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s

### Asset Budgets
- HTML: < 50KB
- CSS: < 50KB
- JavaScript: < 100KB
- Images: < 500KB total
- Fonts: < 100KB

### Runtime
- 60fps animations
- < 100ms input response
- No layout thrashing
```

### Checkpoint
✓ Project concept defined
✓ Motion inventory created
✓ Accessibility checklist ready
✓ Performance budget set

## Phase 2: Foundation & Structure (3-4 hours)

### Step 1: Semantic HTML Structure

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
        
        <!-- More sections -->
    </main>
    
    <footer role="contentinfo">
        <!-- Footer content -->
    </footer>
    
    <script src="/scripts/main.js" defer></script>
</body>
</html>
```

### Step 2: CSS Architecture

```css
/* Design Tokens */
:root {
    /* Colors */
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

### Step 3: JavaScript Foundation

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

### Checkpoint
✓ Semantic HTML structure
✓ CSS architecture with tokens
✓ JavaScript utilities ready
✓ Accessibility foundations in place

## Phase 3: Interactions & Motion (4-5 hours)

### Step 1: Entrance Animations

```javascript
// Hero entrance
const heroElements = document.querySelectorAll('.hero-animate');

function animateHero() {
    heroElements.forEach((el, index) => {
        const delay = index * 100;
        
        animate(el, [
            { opacity: 0, transform: 'translateY(20px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], {
            duration: 600,
            delay,
            easing: 'cubic-bezier(0, 0, 0.2, 1)',
            fill: 'forwards'
        });
    });
}

// Run on load
document.addEventListener('DOMContentLoaded', animateHero);
```

### Step 2: Scroll-Based Reveals

```javascript
// Scroll reveal observer
const revealObserver = createScrollObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
});

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});
```

```css
/* Reveal animations */
.reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity var(--duration-normal) var(--easing-out),
                transform var(--duration-normal) var(--easing-out);
}

.reveal.revealed {
    opacity: 1;
    transform: translateY(0);
}

/* Staggered reveals */
.reveal-stagger > * {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity var(--duration-normal) var(--easing-out),
                transform var(--duration-normal) var(--easing-out);
}

.reveal-stagger.revealed > *:nth-child(1) { transition-delay: 0ms; }
.reveal-stagger.revealed > *:nth-child(2) { transition-delay: 100ms; }
.reveal-stagger.revealed > *:nth-child(3) { transition-delay: 200ms; }
.reveal-stagger.revealed > *:nth-child(4) { transition-delay: 300ms; }

.reveal-stagger.revealed > * {
    opacity: 1;
    transform: translateY(0);
}
```

### Step 3: Micro-Interactions

```css
/* Button interactions */
.button {
    position: relative;
    padding: var(--space-sm) var(--space-lg);
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: transform var(--duration-fast) var(--easing-default),
                box-shadow var(--duration-fast) var(--easing-default);
}

.button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.button:active {
    transform: translateY(0);
}

/* Card hover */
.card {
    background: var(--color-surface);
    border-radius: 8px;
    padding: var(--space-lg);
    transition: transform var(--duration-normal) var(--easing-out),
                box-shadow var(--duration-normal) var(--easing-out);
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

/* Link underline animation */
.link {
    position: relative;
    text-decoration: none;
    color: var(--color-primary);
}

.link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform var(--duration-fast) var(--easing-out);
}

.link:hover::after {
    transform: scaleX(1);
    transform-origin: left;
}
```

### Step 4: Form Interactions

```javascript
// Form validation with feedback
const form = document.querySelector('.contact-form');
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach(input => {
    // Focus animation
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
        validateInput(input);
    });
});

function validateInput(input) {
    const isValid = input.checkValidity();
    const errorEl = input.parentElement.querySelector('.error-message');
    
    if (!isValid) {
        input.setAttribute('aria-invalid', 'true');
        errorEl.textContent = input.validationMessage;
        announce(`Error: ${input.validationMessage}`, 'assertive');
    } else {
        input.setAttribute('aria-invalid', 'false');
        errorEl.textContent = '';
    }
}

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    try {
        // Submit logic here
        await submitForm(new FormData(form));
        
        // Success feedback
        showSuccessMessage();
        announce('Form submitted successfully');
    } catch (error) {
        showErrorMessage(error);
        announce('Form submission failed', 'assertive');
    } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
});
```

### Checkpoint
✓ Entrance animations
✓ Scroll-based reveals
✓ Micro-interactions
✓ Form interactions
✓ All animations respect reduced motion

## Phase 4: Performance Optimization (2-3 hours)

### Step 1: Image Optimization

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

### Step 2: CSS Optimization

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

### Step 3: JavaScript Optimization

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

### Step 4: Measure Performance

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

### Checkpoint
✓ Images optimised
✓ CSS performance tuned
✓ JavaScript optimised
✓ Performance measured

## Phase 5: Documentation & Deployment (3-4 hours)

### Step 1: Case Study Document

Create a comprehensive case study:

```markdown
# Project Case Study

## Overview
- **Project:** [Name]
- **Role:** Design Engineer
- **Timeline:** [Duration]
- **Live URL:** [Link]

## The Challenge
What problem were you solving? What constraints did you face?

## Process

### Research & Planning
- What did you learn?
- How did you approach the problem?

### Design Decisions
- Motion design rationale
- Accessibility considerations
- Performance trade-offs

### Technical Implementation
- Architecture choices
- Interesting solutions
- Challenges overcome

## Results
- Performance metrics achieved
- Accessibility compliance
- User feedback (if any)

## Learnings
- What would you do differently?
- What are you proud of?
- What did you learn?

## Screenshots & Videos
[Include visual documentation]
```

### Step 2: README Documentation

```markdown
# Project Name

A [brief description] built with HTML, CSS, and vanilla JavaScript.

## Features
- ✨ Feature 1
- 🎯 Feature 2
- ♿ Fully accessible
- 🚀 Performance optimised

## Live Demo
[Link to deployed site]

## Performance
- LCP: X.Xs
- FID: Xms
- CLS: X.XX

## Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigable
- Screen reader tested

## Local Development
```bash
# Clone the repository
git clone https://github.com/username/project.git

# Navigate to directory
cd project

# Start local server
npx serve
```

## Built With
- Semantic HTML5
- CSS Custom Properties
- Vanilla JavaScript
- [Any other technologies]

## Author
[Your name and links]
```

### Step 3: Deploy

Deploy to your preferred platform:

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm i -g netlify-cli
netlify deploy --prod
```

**GitHub Pages:**
Enable in repository settings.

### Step 4: Final Testing

Run through this checklist:

- [ ] **Functionality**
  - [ ] All features work
  - [ ] No console errors
  - [ ] Forms submit correctly

- [ ] **Accessibility**
  - [ ] Keyboard navigation complete
  - [ ] Screen reader tested
  - [ ] Colour contrast verified
  - [ ] Reduced motion works

- [ ] **Performance**
  - [ ] Lighthouse score > 90
  - [ ] Core Web Vitals passing
  - [ ] No layout shifts

- [ ] **Cross-Browser**
  - [ ] Chrome tested
  - [ ] Firefox tested
  - [ ] Safari tested
  - [ ] Mobile tested

### Checkpoint
✓ Case study written
✓ README complete
✓ Site deployed
✓ Final testing passed

## Submission Checklist

Your capstone should include:

- [ ] **Interactive Experience**
  - [ ] Polished, complete project
  - [ ] Thoughtful motion design
  - [ ] Responsive across devices

- [ ] **Accessibility**
  - [ ] WCAG 2.1 AA compliant
  - [ ] Full keyboard navigation
  - [ ] Screen reader optimised
  - [ ] Reduced motion support

- [ ] **Performance**
  - [ ] Lighthouse performance > 90
  - [ ] Core Web Vitals passing
  - [ ] Optimized assets

- [ ] **Documentation**
  - [ ] README with setup instructions
  - [ ] Case study document
  - [ ] Code comments where helpful

- [ ] **Deployment**
  - [ ] Live URL accessible
  - [ ] GitHub repository public
  - [ ] Portfolio-ready presentation

## Evaluation Criteria

| Criteria | Developing | Proficient | Excellent |
|----------|-----------|------------|-----------|
| **Motion Design** | Basic animations | Purposeful, polished motion | Delightful, cohesive motion language |
| **Accessibility** | Some consideration | WCAG compliant, keyboard works | Exemplary, exceeds requirements |
| **Performance** | Page loads | Optimized, good scores | Lightning fast, all vitals green |
| **Code Quality** | Works but messy | Clean, organised | Elegant, well-documented |
| **Polish** | Functional | Professional quality | Portfolio-worthy, inspiring |
| **Case Study** | Brief explanation | Clear documentation | Compelling narrative |

## Examples for Inspiration

Study these portfolio pieces and case studies:

**Design Engineer Portfolios:**
- Stripe.com (interaction design)
- Linear.app (motion design)
- Vercel.com (performance)

**Case Studies:**
- Airbnb Design
- Spotify Design
- Dropbox Design

## Tips for Success

1. **Scope appropriately.** Better to polish a smaller project than rush a large one.
2. **Motion with purpose.** Every animation should serve a goal.
3. **Test early.** Don't leave accessibility testing for the end.
4. **Document as you go.** Take screenshots and notes throughout.
5. **Get feedback.** Share with peers before finalising.
6. **Own your narrative.** Your case study tells your story.

## What's Next

Congratulations on completing the Web Convergence Track capstone!

This project demonstrates your ability to:
- Design and implement sophisticated interactions
- Build accessible experiences from the ground up
- Optimize for real-world performance
- Document and present your work professionally

**Portfolio Impact:** This capstone is designed to be a centerpiece portfolio piece. Consider:
- Adding it prominently to your portfolio
- Writing a blog post about your process
- Sharing on social media
- Using it in job applications

**Continue your journey:**
- → [iOS Convergence Track](/course/convergence/ios) — Apply skills to native iOS
- → [Android Convergence Track](/course/convergence/android) — Apply skills to native Android
- → Build more projects and grow your portfolio!
