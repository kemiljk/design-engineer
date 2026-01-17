---
estimatedTime: 15
---

# Capstone: Motion & Prototype

> **Quick Summary:** Static screens are dead. Use Material Motion principles to connect your screens, creating an experience that explains itself through movement.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Applying Material motion principles
- Designing all interaction states
- Building connected prototypes
- Adding Material micro-interactions

## Step 1: Material Motion Principles

Apply the standard patterns. Don't invent random slides.
- **Container Transform:** Use this for List → Detail. The card should visually expand to become the new screen.
- **Shared Axis (X):** Use this for steps in a flow (e.g., Setup Wizard).
- **Fade Through:** Use this for Bottom Navigation switching. It implies a context reset.

## Step 2: Interaction States

Every interactive element needs feedback.
- **State Layer:** Material uses a semi-transparent overlay to show states.
- **Pressed:** Add a 10-12% opacity layer over your primary colour.
- **Drag:** Show elevation (shadow) increasing when an item is dragged.

## Step 3: Build Prototype

Connect your screens in Figma.
- **Smart Animate:** Use this to simulate the Container Transform. Match the layer names of the card (List) and the container (Detail) to make them morph.
- **Scrolling:** Ensure your lists scroll and your Top App Bar collapses (if designed).
- **Dialogs:** Use overlays for dialogs and bottom sheets.

## Step 4: Micro-interactions

Add the delight.
- **Ripple:** You can't code a real ripple in Figma easily, but you can simulate the "Pressed" state instant change.
- **Icon Toggle:** Animate a "Favourite" icon from outlined to filled with a small scale bounce.

## Checkpoint

Before moving on, verify:

- [ ] List-to-Detail transition uses Container Transform (or looks like it).
- [ ] Bottom Nav switching uses a dissolve/fade.
- [ ] Buttons show visual feedback when pressed.
- [ ] The prototype allows a full user journey.

## Next Steps

Continue to [Phase 5: Polish & Documentation](./06-capstone-polish.md) →
