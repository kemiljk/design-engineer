---
estimatedTime: 15
---

# Capstone: iOS Design System

> **Quick Summary:** Before designing a single screen, establish your app's foundation. Research similar apps, define your concept, and create a robust set of iOS-specific design tokens.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Researching iOS design patterns
- Defining app concept and purpose
- Creating iOS-specific design tokens
- Setting up light and dark mode

## Step 1: Research & Reference

Great artists steal; great designers reference. Before you start drawing rectangles, understand the landscape.
- **Competitor Audit:** Download 5-10 apps in your category. How do they handle navigation? What does their detail view look like?
- **Pattern Matching:** Don't just look at features; look at *iOS patterns*. Do they use a modal for settings? Do they use a large title for the home screen?
- **Collection:** Take screenshots. Annotate them. What works? What feels broken? This reference library will be your guide when you get stuck.

## Step 2: Define Your App

A pretty interface without a purpose is decoration. Define the soul of your app.
- **Name:** Give it a name. It makes it real.
- **Purpose:** Write one sentence that explains what it does. "A habit tracker that focuses on streaks."
- **User:** Who is this for? "Busy professionals who forget to drink water."
- **Personality:** Is it serious and data-heavy (Stocks)? Or playful and bouncy (Duolingo)? This dictates your visual choices.

## Step 3: Create iOS Tokens

Build your design system using iOS native values. Do not invent your own grid or type scale unless you have a very specific reason.

### Colour System
Define semantic tokens that support Light and Dark mode from day one.
- **Primary:** Your brand colour. Define a `Light` version and a `Dark` version (usually lighter/desaturated).
- **Backgrounds:** Use `System Background` (White/Black) and `Secondary Background` (Light Gray/Dark Gray).
- **Labels:** Use `Label` (Black/White) and `Secondary Label` (Gray/Light Gray).
- **Semantic:** define standard `Success` (Green), `Warning` (Orange), and `Destructive` (Red) states.

### Typography (SF Pro)
Stick to the system styles. It guarantees accessibility.
- **Large Title:** 34pt Bold (Page Headers)
- **Title 2:** 22pt Bold (Section Headers)
- **Headline:** 17pt Semibold (Important Text)
- **Body:** 17pt Regular (Reading Text)
- **Caption 1:** 12pt Regular (Metadata)

### Spacing
Use the 4pt grid, but rely heavily on the iOS standard values:
- **8pt:** Tight spacing between related items.
- **16pt:** Standard padding and margins.
- **20-24pt:** Separating distinct sections.

## Step 4: Setup Light & Dark Mode

Don't treat Dark Mode as an afterthought. Set up your Figma variables (or colour styles) now.
- Create a "Mode" collection.
- Map your semantic tokens (e.g., "Background/Primary") to values for both "Light" and "Dark".
- Test it immediately by creating a frame and switching modes. If the text disappears, fix your tokens now.

## Checkpoint

Before moving on, verify:

- [ ] App concept is defined and clear.
- [ ] You have a moodboard of reference screenshots.
- [ ] Your Figma file has local styles for Colour and Typography.
- [ ] You have tested swapping a frame between Light and Dark modes.

## Next Steps

Continue to [Phase 2: Screen Design](./03-capstone-screens.md) →
