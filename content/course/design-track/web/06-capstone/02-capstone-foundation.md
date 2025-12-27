---
estimatedTime: 15
---

# Capstone: Foundation and Tokens

> **Quick Summary:** Build the foundation for your landing page by researching inspiration, defining your brand, and creating your design token system.

**Time Estimate:** 2-3 hours

## What You'll Learn

- How to gather and organise design inspiration
- Defining brand personality and voice
- Creating a complete design token system

## Step 1: Research and Moodboard

Before designing, gather inspiration:

### Finding Inspiration

- Find 5-10 landing pages in your chosen category
- Screenshot specific elements you admire:
  - Hero sections that grab attention
  - Typography pairings that work well
  - Colour combinations you like
  - Layout patterns that feel right
  - Micro-interactions and details

### Analysing What Works

As you collect inspiration, note patterns:
- **Layouts:** How do they structure information?
- **Typography:** What fonts are popular? What sizes?
- **Colour:** Bold and saturated or subtle and muted?
- **Imagery:** Photography, illustration, or abstract?
- **Tone:** Professional, playful, technical, warm?

### Creating Your Moodboard

In Figma, create a moodboard page:
- Arrange screenshots in a grid
- Add notes about what you like
- Identify common patterns
- Star the 2-3 most inspiring examples

## Step 2: Define Your Brand

Establish the personality before you design:

### Brand Definition Template

**Product name:** (fictional is fine)

**Value proposition:** (one sentence)
> Example: "The project management tool that gets out of your way."

**Target audience:** (be specific)
> Example: "Startup founders and small teams (5-20 people) who value simplicity over features."

**Brand attributes:** (3-5 adjectives)
> Example: Clean, confident, approachable, modern, trustworthy

**Tone of voice:**
> Example: "Professional but not corporate. Clear and direct. Occasional wit."

### Why This Matters

These decisions inform everything:
- **Value proposition** → Hero headline and messaging
- **Target audience** → Visual style and complexity
- **Brand attributes** → Colour, typography, imagery choices
- **Tone of voice** → Copy style and personality

## Step 3: Create Design Tokens

Now translate your brand into a systematic design language.

### Colour System

Create a structured colour palette:

```
Primary
├── primary-50   (lightest tint)
├── primary-100
├── primary-200
├── primary-300
├── primary-400
├── primary-500  (main colour)
├── primary-600
├── primary-700
├── primary-800
├── primary-900  (darkest shade)

Secondary
└── (Same structure as primary)

Neutral (Grays)
├── neutral-50   (near white)
├── neutral-100
├── neutral-200
├── neutral-300
├── neutral-400
├── neutral-500
├── neutral-600
├── neutral-700
├── neutral-800
├── neutral-900  (near black)

Semantic
├── success (green)
├── warning (amber/yellow)
├── error (red)
├── info (blue)
```

**Tips:**
- Use a tool like [Coolors](https://coolors.co) or [Realtime Colors](https://realtimecolors.com)
- Test your primary colour at different tints
- Ensure sufficient contrast for accessibility
- Document your colour decisions

### Typography Scale

Choose fonts and define your type scale:

**Font Selection:**
- **Heading font:** (e.g., Inter, Space Grotesk, Playfair Display)
- **Body font:** (often the same, or a complementary serif/sans)

**Type Scale:**

```
Display:    48-72px / Bold / Heading font
            (Hero headlines only)

H1:         36-48px / Bold
            (Page section titles)

H2:         28-32px / Semibold
            (Subsection titles)

H3:         22-24px / Semibold
            (Card titles, smaller sections)

H4:         18-20px / Semibold
            (Minor headings)

Body Large: 18-20px / Regular
            (Intro paragraphs, featured text)

Body:       16px / Regular
            (Main content, default)

Small:      14px / Regular
            (Captions, labels, helper text)

Tiny:       12px / Medium
            (Badges, metadata)
```

### Spacing Scale

Define consistent spacing values:

```
4px   (xs)   — Tight internal spacing
8px   (sm)   — Small gaps, icon spacing
16px  (md)   — Default component spacing
24px  (lg)   — Section padding, card spacing
32px  (xl)   — Between related sections
48px  (2xl)  — Major section gaps
64px  (3xl)  — Page section separation
96px  (4xl)  — Hero/footer breathing room
```

**Usage guidelines:**
- 4px-8px: Within components
- 16px-24px: Between components
- 32px-64px: Between sections
- 96px+: Major page divisions

### Border Radius

Define corner rounding:

```
none:   0px     (sharp corners)
sm:     4px     (subtle rounding)
md:     8px     (default, buttons, inputs)
lg:     12px    (cards, containers)
xl:     16px    (larger containers)
full:   9999px  (pills, avatars)
```

### Shadows

Define elevation levels:

```
sm:   0 1px 2px rgba(0,0,0,0.05)
      (subtle, cards at rest)

md:   0 4px 6px rgba(0,0,0,0.07)
      (default elevation)

lg:   0 10px 15px rgba(0,0,0,0.1)
      (hover states, dropdowns)

xl:   0 20px 25px rgba(0,0,0,0.15)
      (modals, popovers)
```

## Checkpoint

Before moving on, verify:

- [ ] Moodboard created with 5-10 examples
- [ ] Notes on what you admire in each
- [ ] Brand identity defined (name, proposition, audience, attributes, tone)
- [ ] Colour tokens documented in Figma
- [ ] Typography scale established with font choices
- [ ] Spacing scale defined
- [ ] Border radius and shadow tokens set

## Try It Yourself

Complete all steps above in your Figma file:

1. Create a "Tokens" page
2. Document all your colours as named styles
3. Create text styles for your typography scale
4. Add spacing, radius, and shadow documentation
5. Take a screenshot for your case study

## Next Steps

Continue to [Capstone: Layout and Wireframes](./03-capstone-layout.md) →

