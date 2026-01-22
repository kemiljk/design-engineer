---
estimatedTime: 15
---

# Capstone: Planning & Audit

> **Quick Summary:** Define your project scope, plan your animations, and audit for accessibility.

**Time Estimate:** 2-3 hours

## What You'll Learn

- How to define project scope effectively and avoid feature creep
- Creating a comprehensive motion design plan
- Performing an audit of existing work for accessibility gaps
- Setting clear goals for the capstone

 This lesson covers **defining project scope effectively**, helping you avoid feature creep. You will create a comprehensive **motion design plan**, perform an **audit of existing work** for accessibility gaps, and finish by **setting clear goals** for the capstone.

## Step 1: Define Scope

Document your project:

```markdown
## Project Brief

**Project:** [Name]
**Type:** [Enhancement / Feature / Prototype / Widget]
**Goal:** [What makes this exceptional?]

### Key Screens/Components
1. [Screen/Component 1]
2. [Screen/Component 2]
3. [Screen/Component 3]

### Polish Targets
- [ ] Animation goal 1
- [ ] Animation goal 2
- [ ] Accessibility goal 1
- [ ] Accessibility goal 2
```

## Step 2: Animation Inventory

Plan your motion design:

### View Transitions

| Transition | Type | Duration | Curve |
|------------|------|----------|-------|
| Screen push | Matched geometry | 0.35s | spring |
| Modal present | Scale + fade | 0.3s | easeOut |
| Tab switch | Cross-fade | 0.2s | easeInOut |

### Component Animations

| Component | Trigger | Animation | Purpose |
|-----------|---------|-----------|---------|
| Button | Tap | Scale down | Feedback |
| Card | Appear | Slide + fade | Entrance |
| Toggle | Change | Spring | State change |
| List item | Delete | Slide out | Exit |

### Reduced Motion Alternatives
- Replace motion with opacity changes
- Use instant transitions
- Keep essential feedback

## Step 3: Accessibility Audit

If enhancing existing app:

### VoiceOver
- [ ] All elements have labels
- [ ] Custom actions where helpful
- [ ] Logical reading order
- [ ] Announcements for updates

### Dynamic Type
- [ ] All text scales
- [ ] Layout adapts
- [ ] No truncation issues
- [ ] Minimum touch targets

### Reduced Motion
- [ ] All animations have alternatives
- [ ] Essential feedback preserved
- [ ] No auto-playing motion

## Checkpoint

Before moving on, verify:

- [ ] Project scope defined
- [ ] Animation plan created
- [ ] Accessibility audit complete
- [ ] Clear goals established

## Next Steps

Continue to [Phase 2: Animation Implementation](./03-capstone-animation.md) →

