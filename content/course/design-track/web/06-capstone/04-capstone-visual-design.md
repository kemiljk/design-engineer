---
estimatedTime: 15
---

# Capstone: Visual Design

> **Quick Summary:** Transform your wireframes into polished visual designs, building your component library and creating responsive layouts.

**Time Estimate:** 3-4 hours

## What You'll Learn

- Designing an impactful hero section
- Building a reusable component library
- Creating cohesive full-page designs
- Adapting designs for all viewports

## Step 1: Hero Section

The hero sets the tone for everything. Get this right first.

### Hero Checklist

Apply your design system:
- [ ] Use your typography scale for headline/subhead
- [ ] Apply brand colours purposefully
- [ ] Design primary and secondary CTAs
- [ ] Add hero imagery or illustration
- [ ] Ensure it's scannable in 3 seconds

### Hero Patterns

**Split layout:**
```
┌────────────────────────────────────────┐
│  Headline              │               │
│  that captures         │    [IMAGE]    │
│  attention             │               │
│                        │               │
│  Supporting text       │               │
│  [CTA] [CTA]           │               │
└────────────────────────────────────────┘
```

**Centred layout:**
```
┌────────────────────────────────────────┐
│         Centred Headline               │
│      Supporting text here              │
│         [CTA]  [CTA]                   │
│                                        │
│           [IMAGE/VIDEO]                │
└────────────────────────────────────────┘
```

**Full-bleed image:**
```
┌────────────────────────────────────────┐
│ ╔════════════════════════════════════╗ │
│ ║     Headline over image            ║ │
│ ║     Supporting text                ║ │
│ ║     [CTA]                          ║ │
│ ╚════════════════════════════════════╝ │
└────────────────────────────────────────┘
```

### Design Tips

- **Contrast:** Ensure headline stands out clearly
- **Whitespace:** Don't crowd the hero—let it breathe
- **Visual hierarchy:** One clear focal point
- **CTA prominence:** Primary button should be obvious

## Step 2: Component Library

Build reusable components before designing pages:

### Buttons

Design all states for each variant:

**Primary button:**
- Default
- Hover
- Active (pressed)
- Focus
- Disabled

**Secondary button:**
- Same states as primary

**Ghost/tertiary button:**
- Same states

**Sizes:** Small, Medium, Large

### Cards

**Feature card:**
- Icon or image
- Title
- Description
- Optional link

**Testimonial card:**
- Quote
- Avatar
- Name and title
- Company (optional)

**Pricing card:**
- Plan name
- Price
- Features list
- CTA
- Popular/recommended state

### Form Elements

**Input field:**
- Default (empty)
- Placeholder
- Filled
- Focus
- Error
- Disabled

**Other inputs:**
- Checkbox
- Radio
- Select dropdown
- Toggle

### Navigation

**Header:**
- Logo
- Navigation links (default, hover, active)
- CTA button
- Mobile hamburger icon

**Mobile menu:**
- Full-screen or slide-in
- Navigation links
- CTA

**Footer:**
- Logo
- Link groups
- Social icons
- Legal text

## Step 3: Full Page Design

Now bring it all together:

### Design Process

1. **Start with the hero** (already done)
2. **Work section by section** down the page
3. **Use your components** consistently
4. **Check spacing** between sections
5. **Review hierarchy** — is the flow clear?

### Section-by-Section Tips

**Social proof/logos:**
- Greyscale logos for subtlety
- "Trusted by" or "Used by" label
- 4-6 logos maximum

**Features:**
- Consistent icon style
- Equal weight to each feature
- Clear visual grouping

**Testimonials:**
- Real-looking photos (use Unsplash)
- Specific, credible quotes
- Company context adds trust

**Pricing:**
- Highlight recommended plan
- Clear feature comparison
- Obvious CTA per plan

**FAQ:**
- Accordion pattern
- Scannable questions
- Concise answers

**Final CTA:**
- Reinforce main value proposition
- Strong headline
- Single clear action

### Design Review

Before moving to responsive:
- [ ] Consistent spacing throughout
- [ ] Typography hierarchy is clear
- [ ] Colour usage is intentional
- [ ] Alignment is precise
- [ ] Components used consistently

## Step 4: Responsive Designs

Adapt for all viewports:

### Tablet (768px)

Common adaptations:
- Navigation might stay horizontal or become hamburger
- 3-column grids become 2-column
- Hero image might stack below text
- Reduce horizontal padding
- Adjust typography scale slightly

### Mobile (375px)

Common adaptations:
- Navigation becomes hamburger menu
- All grids become single column
- Hero stacks vertically
- Larger touch targets (44px minimum)
- Reduced font sizes (but maintain hierarchy)
- Tighter spacing

### Testing Your Responsive Design

For each viewport:
- [ ] Can users complete the main task?
- [ ] Is text readable without zooming?
- [ ] Are touch targets large enough?
- [ ] Does important content fit above the fold?
- [ ] Is the visual hierarchy maintained?

## Checkpoint

Before moving on, verify:

- [ ] Hero section complete and impactful
- [ ] Component library built with all variants/states
- [ ] Full desktop design complete
- [ ] Tablet design complete
- [ ] Mobile design complete
- [ ] All designs use tokens consistently

## Try It Yourself

Complete all steps in your Figma file:

1. Design your hero section
2. Build your component library (buttons, cards, inputs, nav)
3. Design the full desktop page
4. Create tablet adaptation
5. Create mobile adaptation
6. Review consistency across all viewports

## Next Steps

Continue to [Capstone: Polish and Documentation](./05-capstone-polish.md) →

