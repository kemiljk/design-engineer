---
estimatedTime: 10
---

# Capstone: Adaptive Layouts

> **Quick Summary:** Android apps run on everything from 4-inch phones to 12-inch tablets. Prove your design is robust by adapting it to larger screens using the Window Size Class system.

**Time Estimate:** 1-2 hours

## What You'll Learn

- Planning responsive breakpoints
- Adapting navigation for larger screens
- Designing content transformations
- Creating tablet-specific layouts

## Step 1: Breakpoint Strategy

You've designed for **Compact** width (<600dp). Now design for **Expanded** width (>840dp).
- Don't just stretch the phone layout. A list of items stretching 800dp wide is unreadable.
- Define your columns. Phone = 4 cols. Tablet = 12 cols.

## Step 2: Navigation Adaptation

Navigation must move to remain ergonomic.
- **Phone (Compact):** Bottom Navigation Bar. Best for thumbs.
- **Tablet (Expanded):** Navigation Rail (Left side vertical bar). This saves vertical space for content and prevents the bottom bar buttons from spreading too far apart.

## Step 3: Content Adaptation

How does your layout reflow?
- **Grid:** A single-column list on phone should become a multi-column grid on tablet.
- **Hero Image:** A full-width header on phone might become a side-panel image on tablet.
- **Text:** Keep line lengths readable (approx 60 chars). Don't let text span the full width of a landscape tablet.

## Step 4: The List-Detail View

This is the gold standard for adaptive Android apps.
- **Phone:** List Screen → (Tap) → Detail Screen.
- **Tablet:** List Panel (Left) + Detail Panel (Right). Tapping the list updates the detail panel instantly.
- *Action:* Design this view. Show how the user selects an item on the left and edits it on the right without leaving the screen.

## Checkpoint

Before moving on, verify:

- [ ] You have a design for Compact (Phone) and Expanded (Tablet).
- [ ] Navigation switches from Bottom Bar to Nav Rail.
- [ ] Content reflows logically (using columns).
- [ ] Line lengths are readable on the large screen.

## Next Steps

Continue to [Phase 4: Motion & Prototype](./05-capstone-motion.md) →
