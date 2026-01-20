---
estimatedTime: 15
---

# Capstone: Motion & Prototype

> **Quick Summary:** Static screens are dead. Use Material Motion principles to connect your screens, creating an experience that explains itself through movement.

**Time Estimate:** 2-3 hours

## What You'll Learn

During this phase, you will learn to apply Material motion principles and design comprehensive interaction states for all UI elements. We'll examine how to build connected prototypes and add delightful Material-style micro-interactions to bring your interface to life.

## Step 1: Material Motion Principles

Apply the standard patterns. Don't invent random slides.
Apply standard Material patterns by using Container Transform to visually expand cards from a list into a full-detail view and Shared Axis transitions for sequential steps in a flow. When switching between bottom navigation destinations, use Fade Through to subtly imply a reset of the current context.

## Step 2: Interaction States

Every interactive element needs feedback.
Provide instant feedback for every interaction by utilizing Material's semi-transparent state layers, such as adding a 10-12% opacity overlay for pressed states or increasing elevation shadows to signify when an item is being dragged.

## Step 3: Build Prototype

Connect your screens in Figma.
Connect your screens in Figma using Smart Animate to simulate the morphing effect of a Container Transform, ensuring that layer names match between the list card and the detail container. You should also verify that lists scroll correctly, top app bars collapse as intended, and that all dialogs or bottom sheets are implemented as functional overlays.

## Step 4: Micro-interactions

Add the delight.
Inject delight into the experience by simulating the instant visual change of a ripple's pressed state and animating icon toggles—such as a favourite button—with a subtle scale bounce as they transition from outlined to filled.

## Checkpoint

Before moving on, verify:

- [ ] List-to-Detail transition uses Container Transform (or looks like it).
- [ ] Bottom Nav switching uses a dissolve/fade.
- [ ] Buttons show visual feedback when pressed.
- [ ] The prototype allows a full user journey.

## Next Steps

Continue to [Phase 5: Polish & Documentation](./06-capstone-polish.md) →
