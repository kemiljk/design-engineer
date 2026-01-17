---
estimatedTime: 15
---

# Capstone: Interaction & Prototype

> **Quick Summary:** Static screens don't tell the whole story. Design the interaction states for your components and build a clickable prototype that feels like a real iOS app.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Designing all interaction states
- Planning iOS-appropriate transitions
- Building connected prototypes
- Adding micro-interactions

## Step 1: Interaction States

Every interactive element needs feedback. Design these states as component variants.
- **Buttons:** Normal, Pressed (scale down to 96%), Disabled.
- **Inputs:** Normal, Focused (active border/cursor), Filled, Error.
- **List Items:** Normal, Highlighted (grey background on tap), Selected.

## Step 2: Transitions

Define how screens connect. Don't just use "Instant" or "Dissolve." Use native patterns.
- **Push:** Use "Move In" from the right for hierarchical navigation (List → Detail).
- **Modal:** Use "Move In" from the bottom for task-based flows (Add Item, Settings).
- **Tab Switch:** Use "Dissolve" or "Instant". Tabs do not slide.

## Step 3: Build Prototype

Connect your screens in Figma.
- **Happy Path:** Build the primary flow first. Ensure the user can complete the main task.
- **Back Navigation:** Don't forget the back buttons! The prototype shouldn't be a dead end.
- **Scroll Areas:** Set up vertical scrolling for your lists and content pages.

## Step 4: Micro-interactions

Add the polish that makes it feel like iOS.
- **Toggles:** Make the switch knob slide smoothly.
- **Checkmarks:** Animate the success state.
- **Haptics:** You can't feel them in Figma, but annotate where they should happen (e.g., "Light impact on toggle").

## Checkpoint

Before moving on, verify:

- [ ] All buttons have a "Pressed" state.
- [ ] Navigation transitions match iOS standards (Push vs. Modal).
- [ ] The prototype allows a user to complete the core task.
- [ ] Back buttons work.

## Next Steps

Continue to [Phase 5: Polish & Documentation](./06-capstone-polish.md) →
