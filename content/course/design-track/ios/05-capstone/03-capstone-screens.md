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
- **Sitemap:** What are the top-level destinations? (e.g., Home, Search, Library).
- **Hierarchy:** How deep does the navigation go? (List → Detail → Edit).
- **Primary Actions:** What is the most important thing a user does on each screen? Make that action accessible.

## Step 2: Navigation Pattern

Choose the navigation model that fits your depth.
- **Tab Bar:** Use this for 3-5 top-level sections that need equal access. This is the most common iOS pattern.
- **Sidebar:** If designing for iPad, consider how your tab bar transforms into a sidebar.
- **Modals:** Use sheets for temporary tasks (like "Add New Item") that interrupt the main flow.

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
- **Navigation Bars:** Ensure they have the correct height and transparency settings.
- **Tab Bars:** Use SF Symbols for icons. Ensure the active state is filled and the inactive state is outlined.
- **Inputs:** Use standard text fields and toggles. They are recognizable and accessible.

## Checkpoint

Before moving on, verify:

- [ ] You have mapped the user flow.
- [ ] You have designed the key screens in high fidelity.
- [ ] You are using iOS standard components (Nav Bars, Tab Bars).
- [ ] Navigation hierarchy is clear (Push vs. Modal).

## Next Steps

Continue to [Phase 3: Device Adaptations](./04-capstone-devices.md) →
