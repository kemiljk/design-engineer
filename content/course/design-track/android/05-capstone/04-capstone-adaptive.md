---
estimatedTime: 10
---

# Capstone: Adaptive Layouts

> **Quick Summary:** Android apps run on everything from 4-inch phones to 12-inch tablets. Prove your design is robust by adapting it to larger screens using the Window Size Class system.

**Time Estimate:** 1-2 hours

## What You'll Learn

Throughout this stage, you will plan responsive breakpoints and adapt your navigation for larger screens. We'll explore designing content transformations and creating sophisticated tablet-specific layouts to ensure your app remains functional across all form factors.

## Step 1: Breakpoint Strategy

You've designed for **Compact** width (<600dp). Now design for **Expanded** width (>840dp).
Having designed for compact widths, you must now plan for expanded displays by ensuring layouts don't simply stretch unreadably. You should define your grid structure carefully, moving from a four-column phone layout to a twelve-column tablet system.

## Step 2: Navigation Adaptation

Navigation must move to remain ergonomic.
To maintain ergonomics, your navigation must move from a thumb-accessible Bottom Navigation Bar on compact devices to a vertical Navigation Rail on tablets. This side-mounted bar saves valuable vertical space for content and prevents buttons from spreading too far apart across the wide display.

## Step 3: Content Adaptation

How does your layout reflow?
Consider how your layout reflows, such as transforming a single-column list into a multi-column grid and repurposing a full-width hero header into a side-panel image. Most importantly, you must keep line lengths readable by ensuring text does not span the full width of a landscape tablet.

## Step 4: The List-Detail View

This is the gold standard for adaptive Android apps.
While phone experiences typically require a full-page transition between a list and its detail view, tablet designs should utilize a side-by-side panel configuration where tapping a list item updates the adjacent detail pane instantly.
- *Action:* Design this view. Show how the user selects an item on the left and edits it on the right without leaving the screen.

## Checkpoint

Before moving on, verify:

- [ ] You have a design for Compact (Phone) and Expanded (Tablet).
- [ ] Navigation switches from Bottom Bar to Nav Rail.
- [ ] Content reflows logically (using columns).
- [ ] Line lengths are readable on the large screen.

## Next Steps

Continue to [Phase 4: Motion & Prototype](./05-capstone-motion.md) →
