---
estimatedTime: 10
---

# Capstone: Device Adaptations

> **Quick Summary:** An iOS app doesn't live on one screen. Adapt your designs for the reality of the ecosystem: multiple sizes, safe areas, and Dark Mode.

**Time Estimate:** 1-2 hours

## What You'll Learn

- Designing for multiple iPhone sizes
- Handling safe areas properly
- Completing dark mode versions
- (Optional) iPad considerations

## Step 1: iPhone Sizes

You likely designed on the standard iPhone size (393pt). Now stress-test it.
- **iPhone SE (375pt):** Does your content feel cramped? Do long titles truncate too early?
- **iPhone Pro Max (430pt):** Does your content feel sparse? Can you show more information?
*Action:* Create a frame for the SE size and adjust your layout constraints to prove it works.

## Step 2: Safe Areas

The screen is not a rectangle.
- **Top:** Ensure your navigation bar sits *below* the Dynamic Island/Notch, but your background colour extends *behind* it.
- **Bottom:** Ensure your interactive elements (buttons, tab bar) are clear of the Home Indicator area.
- **Clipping:** Check rounded corners. Is any content uncomfortably close to the physical edge radius?

## Step 3: Dark Mode

You set up the tokens in Phase 1. Now, apply them.
- **Duplicate** your main screens.
- **Switch** the mode to Dark.
- **Audit:** Look for low contrast. Look for "muddy" shadows (which should be invisible). Look for overly bright large surfaces.
- **Refine:** If a card border is invisible in Dark Mode, add a stroke or slightly lighten the card background colour.

## Step 4: iPad (Optional but Recommended)

If you want to shine, show how this scales to iPad.
- **Split View:** Show how the List and Detail views can sit side-by-side.
- **Sidebar:** Show the Tab Bar transforming into a Sidebar.
- **Popovers:** Show a menu appearing as a popover instead of a bottom action sheet.

## Checkpoint

Before moving on, verify:

- [ ] Designs work on a small screen (SE).
- [ ] Safe areas are respected (no content behind the notch).
- [ ] Dark Mode looks polished and legible.
- [ ] Contrast ratios pass accessibility standards in both modes.

## Next Steps

Continue to [Phase 4: Interaction & Prototype](./05-capstone-prototype.md) →
