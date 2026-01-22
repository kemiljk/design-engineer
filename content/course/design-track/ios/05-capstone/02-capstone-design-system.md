---
estimatedTime: 15
---

# Capstone: iOS Design System

> **Quick Summary:** Before designing a single screen, establish your app's foundation. Research similar apps, define your concept, and create a robust set of iOS-specific design tokens.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Essential research and reference gathering techniques
- How to establish a consistent app purpose and personality
- Setting up a comprehensive system of ios-specific design tokens
- Implementing a foundation for light and dark mode

## Step 1: Research & Reference

Great artists steal; great designers reference. Before you start drawing rectangles, understand the landscape.
Perform a competitor audit by downloading five to ten apps in your category to see how they handle navigation and detail views. Look specifically for **iOS patterns**, such as the use of modals for settings or large titles for home screens, and collect annotated screenshots to serve as a reference library throughout the design process.

## Step 2: Define Your App

A pretty interface without a purpose is decoration. Define the soul of your app.
Establishing a clear app definition involves giving it a unique name and writing a single sentence that explains its core purpose. You must also identify your target users and define a distinct personality—whether it be serious and data-heavy or playful and expressive—as this will dictate your primary visual choices.

## Step 3: Create iOS Tokens

Build your design system using iOS native values. Do not invent your own grid or type scale unless you have a very specific reason.

### Colour System
Define semantic tokens that support Light and Dark mode from day one.
Define semantic tokens for your **primary** brand colour in both light and desaturated dark versions, and use standard **background** and **label** system colours to ensure automatic adaptation. You should also establish semantic tokens for **success**, **warning**, and **destructive** states using the standard green, orange, and red palette.

### Typography (SF Pro)
Stick to the system styles. It guarantees accessibility.
Use system styles such as **Large Title** for headers, **Title 2** for sections, and **Headline**, **Body**, and **Caption** styles for primary and metadata text to guarantee consistency and accessibility.

### Spacing
Use the 4pt grid, but rely heavily on the iOS standard values:
Maintain rhythm using an 8pt scale for tight spacing between related items, 16pt for standard margins, and 20 to 24pt to separate distinct sections.

## Step 4: Setup Light & Dark Mode

Don't treat Dark Mode as an afterthought. Set up your Figma variables (or colour styles) now.
Set up your Figma variables by creating a "Mode" collection and mapping your semantic tokens to specific light and dark values. You should test these immediately by switching modes on a sample frame to ensure text and background contrast remain legible.

## Checkpoint

Before moving on, verify:

- [ ] App concept is defined and clear.
- [ ] You have a moodboard of reference screenshots.
- [ ] Your Figma file has local styles for Colour and Typography.
- [ ] You have tested swapping a frame between Light and Dark modes.

## Next Steps

Continue to [Phase 2: Screen Design](./03-capstone-screens.md) →
