---
estimatedTime: 10
---

# Capstone: Device Adaptations

> **Quick Summary:** An iOS app doesn't live on one screen. Adapt your designs for the reality of the ecosystem: multiple sizes, safe areas, and Dark Mode.

**Time Estimate:** 1-2 hours

## What You'll Learn

- Adapting designs for various iphone dimensions
- Stress-testing layouts for smallest and largest displays
- Handling safe areas effectively across device generations
- Applying semantic tokens to create polished dark mode versions
- Optional strategies for transforming interfaces for ipad

## Step 1: iPhone Sizes

You likely designed on the standard iPhone size (393pt). Now stress-test it.
Ensure your content remains legible on the **iPhone SE** by checking for truncation and over-crowding, and verify that the **iPhone Pro Max** doesn't feel overly sparse.
*Action:* Create a frame for the SE size and adjust your layout constraints to prove it works.

## Step 2: Safe Areas

The screen is not a rectangle.
Place navigation bars below the notch while extending background colours behind it, ensure interactive elements are clear of the Home Indicator, and check that content is not clipped by the screen's rounded corners.

## Step 3: Dark Mode

You set up the tokens in Phase 1. Now, apply them.
- **Duplicate** your main screens.
- **Switch** the mode to Dark.
Audit your dark mode screens for low contrast or "muddy" shadows, ensuring that large surfaces aren't overly bright and that card borders remain visible by adding a subtle stroke or adjusting the background colour.

## Step 4: iPad (Optional but Recommended)

If you want to shine, show how this scales to iPad.
Demonstrate platform mastery by showing how views transform into a **Split View** or **Sidebar** on iPad, and utilise **Popovers** for menus that would otherwise be modal sheets on iPhone.

## Checkpoint

Before moving on, verify:

- [ ] Designs work on a small screen (SE).
- [ ] Safe areas are respected (no content behind the notch).
- [ ] Dark Mode looks polished and legible.
- [ ] Contrast ratios pass accessibility standards in both modes.

## Next Steps

Continue to [Phase 4: Interaction & Prototype](./05-capstone-prototype.md) →
