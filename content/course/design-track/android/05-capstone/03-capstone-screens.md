---
estimatedTime: 15
---

# Capstone: Phone Screen Design

> **Quick Summary:** Design the core experience for the most common form factor. Plan your information architecture and apply Material 3 components to solve user problems.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Planning information architecture
- Choosing Material 3 navigation patterns
- Designing core screens
- Applying Material 3 components correctly

## Step 1: Information Architecture

Map the skeleton of your app.
- **Destinations:** What are the 3-5 main places a user can go?
- **Hierarchy:** Is the app flat (dashboard) or deep (folder structure)?
- **Actions:** What is the primary action on each screen? (e.g., "Compose Email", "Add Task"). This determines your FAB placement.

## Step 2: Navigation Pattern

Choose the navigation component that fits your IA.
- **Bottom Navigation Bar:** Use this for 3-5 top-level destinations. It is the standard for mobile.
- **Navigation Drawer:** Use this if you have 6+ destinations or if the destinations are secondary (e.g., mail folders).
- **Navigation Rail:** Plan ahead—this will replace the bottom bar on tablets.

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
- **FAB:** Use for the *single* most important action on a screen.
- **Cards:** Use "Outlined" or "Filled" cards to group content. Avoid "Elevated" cards unless you need separation from a busy background.
- **Text Fields:** Use "Outlined" text fields for forms. They have better usability testing results than filled fields in many contexts.
- **Bottom Sheets:** Use these for secondary actions or simple inputs to keep the user in context.

## Checkpoint

Before moving on, verify:

- [ ] Navigation is consistent (back buttons work, bottom nav works).
- [ ] You are using Material Design 3 components, not iOS clones.
- [ ] The FAB is used correctly (high impact, singular).
- [ ] Text hierarchy relies on the Type Scale (Display, Headline, Body).

## Next Steps

Continue to [Phase 3: Adaptive Layouts](./04-capstone-adaptive.md) →
