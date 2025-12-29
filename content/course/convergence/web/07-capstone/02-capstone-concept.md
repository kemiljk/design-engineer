---
estimatedTime: 20
---

# Capstone: Concept & Design

> **Quick Summary:** Define your project, plan your animations purposefully, and establish accessibility and performance requirements.

**Time Estimate:** 3-4 hours

## What You'll Learn

- Defining project scope and goals
- Creating a motion inventory
- Planning accessibility from the start
- Setting a performance budget

## Step 1: Define Your Project

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

## Step 2: Motion Inventory

Plan your animations purposefully:

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

## Step 3: Accessibility Checklist

Plan accessibility from the start:

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
- [ ] Not colour-only information
- [ ] Reduced motion respected

## Step 4: Performance Budget

Set performance constraints:

### Load Time

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |

### Asset Budgets

| Asset | Budget |
|-------|--------|
| HTML | < 50KB |
| CSS | < 50KB |
| JavaScript | < 100KB |
| Images (total) | < 500KB |
| Fonts | < 100KB |

### Runtime

| Metric | Target |
|--------|--------|
| Animation framerate | 60fps |
| Input response | < 100ms |
| Layout thrashing | None |

## Checkpoint

Before moving on, verify:

- [ ] Project concept defined with clear goals
- [ ] Motion inventory created with purposeful animations
- [ ] Accessibility checklist ready
- [ ] Performance budget set

## Try It Yourself

1. Complete all documentation above
2. Share your plan with someone for feedback
3. Adjust scope if needed based on time constraints
4. Begin gathering inspiration and assets

## Next Steps

Continue to [Phase 2: Foundation & Structure](./03-capstone-foundation.md) →

