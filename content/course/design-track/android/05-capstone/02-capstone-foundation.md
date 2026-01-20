---
estimatedTime: 15
---

# Capstone: Material Foundation

> **Quick Summary:** Before drawing a single screen, establish your app's foundation. Research Material 3 guidelines, define your app's concept, and create a complete, accessible colour scheme that supports dynamic colour.

**Time Estimate:** 2-3 hours

## What You'll Learn

During this phase, you will research the Material 3 guidelines and define your app's core concept and purpose. We'll examine exactly how to create comprehensive Material 3 colour schemes while preparing your design for dynamic colour and system-wide adaptation.

## Step 1: Research & Reference

Don't guess at Material Design. It is a documented system.
Begin by studying the official Material 3 specification to understand the logic of elevation, containers, and spacing rules. Conduct an audit of several modern Android apps to see how they utilize colour and navigation on large screens, and collect screenshots of effective patterns like the list-detail view or navigation rails to serve as a reference for your own work.

## Step 2: Define Your App

A pretty interface without a purpose is just decoration.
Clearly define your app's identity by choosing a name and writing a single-sentence purpose statement. Identify your target user and decide on a visual personality, whether it should be a vibrant, energy-filled interface with lots of primary colour or a utility-focused experience that relies on calm surface tones.

## Step 3: Create Material Colour Scheme

You don't pick hex codes randomly in Material 3. You build a tonal palette.
Use the **Material Theme Builder** plugin in Figma.
1.  **Seed Colour:** Input your primary brand colour.
2.  **Generate:** Let the tool generate the full tonal range (0-100) for Primary, Secondary, Tertiary, Neutral, and Error.
3.  **Roles:** Identify your Semantic Roles.
Identify your semantic roles within the scheme, using high-emphasis primary colours for active states and FABs, medium-emphasis primary containers for selections, and neutral surface and outline tokens for backgrounds and borders.

**Create schemes for both Light and Dark modes.**

## Step 4: Dynamic Colour Preparation

Your app lives on a user's device, which has its own wallpaper.
Test your layout against various dynamic seeds using the Theme Builder to ensure your design remains legible regardless of the user's wallpaper. You must also plan which parts of your interface will remain static to anchor your brand and which will adapt dynamically to the system's generated palette.

## Step 5: Typography with Roboto

Stick to the system defaults unless you have a strong brand reason not to.
- **Font:** Roboto (Sans-serif).
- **Scale:** Map your styles to the Material Type Scale.
Map your typography to the Material type scale using Roboto as your foundational system font. This includes defining headline large styles at 32sp for page titles, title medium at 16sp for cards, and standard body text at 14sp, alongside a 14sp label large style for buttons.

## Checkpoint

Before moving on, verify:

- [ ] App concept is clear and documented.
- [ ] You have a Figma file with the Material 3 Design Kit enabled.
- [ ] Your Colour Styles are set up (Primary, Surface, etc.) for both Light and Dark modes.
- [ ] You have tested your colours against a dynamic seed.

## Next Steps

Continue to [Phase 2: Phone Screen Design](./03-capstone-screens.md) →
