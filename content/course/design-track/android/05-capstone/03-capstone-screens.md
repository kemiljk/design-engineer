---
estimatedTime: 15
---

# Capstone: Phone Screen Design

> **Quick Summary:** Design the core experience for the most common form factor. Plan your information architecture and apply Material 3 components to solve user problems.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Planning robust information architecture
- Selecting appropriate Material 3 navigation patterns
- Designing core screens
- Applying Material 3 components correctly

## Step 1: Information Architecture

Map the skeleton of your app.
Map the skeleton of your application by identifying the three to five primary destinations and determining whether the hierarchy should be flat, like a dashboard, or deep, such as a multi-level folder structure. You must also define the primary action for every screen—such as composing an email or adding a task—which will inform the correct placement of your Floating Action Button.

## Step 2: Navigation Pattern

Choose the navigation component that fits your IA.
A Bottom Navigation Bar is the standard choice for three to five top-level destinations on mobile, whereas a Navigation Drawer is preferred for six or more items or secondary locations like mail folders. To ensure a seamless transition between form factors, you should also plan how your mobile navigation will eventually be replaced by a vertical Navigation Rail on tablet devices.

## Step 3: Core Screens

Design the 5-7 screens that define the experience.

**1. Dashboard / Home:**
The landing page. Use cards to group information.

**2. List View:**
A collection of items. Use the standard Material List Item specs (leading icon, headline, supporting text, trailing text).

**3. Detail View:**
What happens when you tap a list item? Use a full-screen view. Consider using a large Top App Bar that collapses on scroll.

**4. Creation Flow:**
Design the "Add New" experience. Is it a full-screen dialog? A bottom sheet?

**5. Settings:**
A simple list of toggles and menus. Great practice for standard components.

## Step 4: Material Component Usage

Don't invent custom UI elements if a standard one exists.
To maintain platform consistency, reserve the FAB for the single most important action on a screen and use outlined or filled cards to group content, avoiding elevated styles unless they are strictly necessary for separation. You should also employ outlined text fields for forms to enhance usability and utilize bottom sheets for secondary actions to keep the user focused on their current context.

## Checkpoint

Before moving on, verify:

- [ ] Navigation is consistent (back buttons work, bottom nav works).
- [ ] You are using Material Design 3 components, not iOS clones.
- [ ] The FAB is used correctly (high impact, singular).
- [ ] Text hierarchy relies on the Type Scale (Display, Headline, Body).

## Next Steps

Continue to [Phase 3: Adaptive Layouts](./04-capstone-adaptive.md) →
