---
estimatedTime: 25
---

# Capstone: Core Components

> **Quick Summary:** Build 8-10 accessible, production-ready components using your token system.

**Time Estimate:** 4-5 hours

## What You'll Learn

- In this lesson, we will focus on building accessible HTML and CSS components
- creating various component variants creating various component variants and states
- You will learn how to implement keyboard navigation effectively
- write vanilla JavaScript to manage interactive behaviours across your component library
- write vanilla JavaScript to manage interactive behaviours across your component library

## Component 1: Button

The foundation of any component library:

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

### Button Requirements

- **Variants:** primary, secondary, ghost, destructive
- **Sizes:** sm, md (default), lg
- **States:** default, hover, focus, active, disabled
- **Features:** icon-only, icon + text, loading state
- **A11y:** focus visible, disabled state, use `<button>` for actions

## Component 2: Input

Form inputs with validation states:

### Input Requirements

- **Types:** text, email, password, search
- **States:** default, focus, filled, error, disabled
- **Features:** labels, help text, error messages
- **A11y:** proper labelling with `<label>`, error announcements with `aria-describedby`

## Component 3: Card

Content containers with variants:

### Card Requirements

- **Variants:** elevated, outlined, filled
- **Parts:** header, body, footer, media
- **Features:** clickable card option
- **A11y:** semantic structure, focus management if interactive

## Component 4: Badge

Status indicators:

### Badge Requirements

- **Variants:** default, primary, success, warning, error
- **Sizes:** sm, md
- **Features:** with icon, dismissible

## Component 5: Alert

Important messages:

### Alert Requirements

- **Variants:** info, success, warning, error
- **Parts:** icon, title, description, actions
- **Features:** dismissible
- **A11y:** `role="alert"` for important messages

## Component 6: Modal

Dialogue overlays with focus management:

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

// Initialise all modals
document.querySelectorAll('[data-modal]').forEach(el => new Modal(el));
```

### Modal Requirements

- **Features:** header, body, footer
- **Behaviour:** focus trap, escape to close, click outside to close
- **A11y:** `aria-modal="true"`, focus management, screen reader announcements

## Component 7: Tooltip

Contextual hints:

### Tooltip Requirements

- **Trigger:** hover, focus
- **Position:** top, right, bottom, left
- **A11y:** proper ARIA relationships with `aria-describedby`

## Component 8: Dropdown

Selection menus with keyboard navigation:

### Dropdown Requirements

- **Trigger:** button element
- **Features:** options, groups, disabled items
- **Behaviour:** keyboard navigation (arrow keys, enter, escape)
- **A11y:** proper ARIA (`aria-expanded`, `aria-haspopup`), roving tabindex

## Additional Components (2-3 more)

Choose from:
- **Tabs** — Content organisation
- **Accordion** — Collapsible sections
- **Avatar** — User representations
- **Progress** — Loading/completion indicators
- **Switch** — Toggle control
- **Select** — Custom select dropdown

## Checkpoint

Before moving on, verify that you have completed a Button component with all variants and states, an Input component featuring validation states, and a Card component with its respective variants. You should also have finished the Badge and Alert components, along with a Modal that includes a focus trap and keyboard support. Ensure your Tooltip has correct positioning and the Dropdown supports keyboard navigation. Finally, confirm that you have built at least two additional components, that all components use your token system, and that every element is keyboard accessible with visible focus states.

## Try It Yourself

Test each component:

1. Create a test page with all components
2. Tab through every interactive element
3. Test with a screen reader
4. Verify all states (hover, focus, disabled, error)
5. Test in both light and dark modes

## Next Steps

Continue to [Phase 3: Documentation](./04-capstone-documentation.md) →

