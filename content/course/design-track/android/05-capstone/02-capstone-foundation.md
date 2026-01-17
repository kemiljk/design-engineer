---
estimatedTime: 15
---

# Capstone: Material Foundation

> **Quick Summary:** Before drawing a single screen, establish your app's foundation. Research Material 3 guidelines, define your app's concept, and create a complete, accessible colour scheme that supports dynamic colour.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Researching Material 3 guidelines
- Defining app concept and purpose
- Creating Material 3 colour schemes
- Preparing for dynamic colour

## Step 1: Research & Reference

Don't guess at Material Design. It is a documented system.
- **Study the Guidelines:** Read the [Material 3 spec](https://m3.material.io/). Understand the role of containers, the logic of elevation, and the spacing rules.
- **App Audit:** Download 5-10 modern Android apps (Google and third-party). How do they handle navigation on large screens? How do they use colour?
- **Collection:** Screenshot effective patterns. Look for the "List-Detail" pattern on tablets and the "Navigation Rail" on foldables.

## Step 2: Define Your App

A pretty interface without a purpose is just decoration.
- **Name:** Give it a name. "TaskFlow," "ChefHelper," "BudgetBuddy."
- **Purpose:** Write one sentence. "A meal planner that generates shopping lists automatically."
- **User:** Who is this for? "Parents who are tired of deciding what to cook."
- **Personality:** Is it vibrant and energetic (lots of primary colour)? Or utility-focused and calm (lots of surface colour)?

## Step 3: Create Material Colour Scheme

You don't pick hex codes randomly in Material 3. You build a tonal palette.
Use the **Material Theme Builder** plugin in Figma.
1.  **Seed Colour:** Input your primary brand colour.
2.  **Generate:** Let the tool generate the full tonal range (0-100) for Primary, Secondary, Tertiary, Neutral, and Error.
3.  **Roles:** Identify your Semantic Roles.
    - **Primary:** High emphasis (FAB, active states).
    - **Primary Container:** Medium emphasis (Selected states).
    - **Surface:** Backgrounds.
    - **Outline:** Borders.

**Create schemes for both Light and Dark modes.**

## Step 4: Dynamic Colour Preparation

Your app lives on a user's device, which has its own wallpaper.
- **Test:** Use the Theme Builder to swap the seed colour. Does your layout break if the user loves neon green?
- **Plan:** Decide which parts of your UI will be static (always your brand colour) and which will be dynamic (user's wallpaper colour). Usually, branding anchors like the logo stay static, while backgrounds and buttons adapt.

## Step 5: Typography with Roboto

Stick to the system defaults unless you have a strong brand reason not to.
- **Font:** Roboto (Sans-serif).
- **Scale:** Map your styles to the Material Type Scale.
    - **Headline Large (32sp):** Page Titles.
    - **Title Medium (16sp):** Card Titles.
    - **Body Medium (14sp):** Standard Text.
    - **Label Large (14sp):** Buttons.

## Checkpoint

Before moving on, verify:

- [ ] App concept is clear and documented.
- [ ] You have a Figma file with the Material 3 Design Kit enabled.
- [ ] Your Colour Styles are set up (Primary, Surface, etc.) for both Light and Dark modes.
- [ ] You have tested your colours against a dynamic seed.

## Next Steps

Continue to [Phase 2: Phone Screen Design](./03-capstone-screens.md) →
