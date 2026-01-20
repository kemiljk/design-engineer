---
estimatedTime: 15
---

# Capstone: Screen Design

> **Quick Summary:** This is the core design phase. You will map your information architecture and design the high-fidelity screens using standard iOS patterns and components.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Planning information architecture
- Choosing navigation patterns
- Designing core screens
- Using iOS-standard components

## Step 1: Information Architecture

Before pushing pixels, map the flow.
Define a sitemap to identify top-level destinations, establish a navigation hierarchy that moves logically from lists to details, and clearly identify the primary action for each screen.

## Step 2: Navigation Pattern

Choose the navigation model that fits your depth.
Utilise a **Tab Bar** for primary sections, consider a **Sidebar** for iPad adaptations, and use **Modals** for temporary tasks that should not take the user away from their current context.

## Step 3: Core Screens

Design the 5-7 screens that define your app.

**1. Home / Dashboard:**
This is the anchor. It should summarize the app's state. Use large titles to establish context.

**2. List View:**
Most apps display collections. Design a standard cell (image + title + subtitle). Consider edge cases: what if the title is long?

**3. Detail View:**
When a user taps an item, where do they go? Design the detail view. Ensure the "Back" button text matches the previous screen's title.

**4. Creation Flow:**
How does data get in? Design a form or input screen. Use a modal presentation style (Sheet) for this to keep context.

**5. Settings / Profile:**
A standard list of grouped rows. This is a great place to practice using system components strictly.

## Step 4: Component Usage

Don't reinvent the wheel. Use the iOS UI Kit.
Leverage standard **Navigation Bars** with correct heights, use **Tab Bars** with SF Symbols in consistent active and inactive states, and implement standard **Inputs** like text fields and toggles to ensure a recognizable interface.

## Checkpoint

Before moving on, verify:

- [ ] You have mapped the user flow.
- [ ] You have designed the key screens in high fidelity.
- [ ] You are using iOS standard components (Nav Bars, Tab Bars).
- [ ] Navigation hierarchy is clear (Push vs. Modal).

## Next Steps

Continue to [Phase 3: Device Adaptations](./04-capstone-devices.md) →
