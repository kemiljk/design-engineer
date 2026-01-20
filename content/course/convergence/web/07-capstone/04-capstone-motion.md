---
estimatedTime: 25
---

# Capstone: Interactions & Motion

> **Quick Summary:** Implement entrance animations, scroll-based reveals, and micro-interactions using your motion inventory.

**Time Estimate:** 4-5 hours

## What You'll Learn

- Implementing entrance animations
- Creating scroll-based reveals
- Building micro-interactions
- Handling forms with feedback

## Step 1: Entrance Animations

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

## Step 2: Scroll-Based Reveals

```javascript
const revealObserver = createScrollObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});
```

```css
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
.reveal-stagger.revealed > *:nth-child(1) { transition-delay: 0ms; }
.reveal-stagger.revealed > *:nth-child(2) { transition-delay: 100ms; }
.reveal-stagger.revealed > *:nth-child(3) { transition-delay: 200ms; }
.reveal-stagger.revealed > *:nth-child(4) { transition-delay: 300ms; }
```

## Step 3: Micro-Interactions

```css
/* Button interactions */
.button {
    position: relative;
    padding: var(--space-sm) var(--space-lg);
    background: var(--colour-primary);
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
    transition: transform var(--duration-normal) var(--easing-out),
                box-shadow var(--duration-normal) var(--easing-out);
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

/* Link underline animation */
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

## Step 4: Form Interactions

```javascript
const form = document.querySelector('.contact-form');
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach(input => {
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
```

## Checkpoint

Before moving on, verify:

- [ ] Entrance animations work smoothly
- [ ] Scroll-based reveals trigger correctly
- [ ] Micro-interactions feel responsive
- [ ] Form interactions provide feedback
- [ ] All animations respect reduced motion preference

## Try It Yourself

1. Implement all animations from your motion inventory
2. Test with reduced motion enabled
3. Verify animations are smooth at 60fps
4. Test all interactive states

## Next Steps

Continue to [Phase 4: Performance](./05-capstone-performance.md) →

