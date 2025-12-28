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

**Primary & Secondary** — Each needs a full scale from 50 (lightest) to 900 (darkest), with 500 as the main colour.

**Neutral (Grays)** — Same 50-900 scale, where 50 is near white and 900 is near black.

**Semantic colours:**

| Purpose | Typical Colour |
|---------|----------------|
| Success | Green |
| Warning | Amber/Yellow |
| Error | Red |
| Info | Blue |

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

| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| Display | 48-72px | Bold | Hero headlines only |
| H1 | 36-48px | Bold | Page section titles |
| H2 | 28-32px | Semibold | Subsection titles |
| H3 | 22-24px | Semibold | Card titles, smaller sections |
| H4 | 18-20px | Semibold | Minor headings |
| Body Large | 18-20px | Regular | Intro paragraphs, featured text |
| Body | 16px | Regular | Main content, default |
| Small | 14px | Regular | Captions, labels, helper text |
| Tiny | 12px | Medium | Badges, metadata |

### Spacing Scale

Define consistent spacing values:

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight internal spacing |
| sm | 8px | Small gaps, icon spacing |
| md | 16px | Default component spacing |
| lg | 24px | Section padding, card spacing |
| xl | 32px | Between related sections |
| 2xl | 48px | Major section gaps |
| 3xl | 64px | Page section separation |
| 4xl | 96px | Hero/footer breathing room |

**Usage guidelines:**
- 4px-8px: Within components
- 16px-24px: Between components
- 32px-64px: Between sections
- 96px+: Major page divisions

### Border Radius

Define corner rounding:

| Token | Value | Usage |
|-------|-------|-------|
| none | 0px | Sharp corners |
| sm | 4px | Subtle rounding |
| md | 8px | Default, buttons, inputs |
| lg | 12px | Cards, containers |
| xl | 16px | Larger containers |
| full | 9999px | Pills, avatars |

### Shadows

Define elevation levels:

| Token | Value | Usage |
|-------|-------|-------|
| sm | 0 1px 2px rgba(0,0,0,0.05) | Subtle, cards at rest |
| md | 0 4px 6px rgba(0,0,0,0.07) | Default elevation |
| lg | 0 10px 15px rgba(0,0,0,0.1) | Hover states, dropdowns |
| xl | 0 20px 25px rgba(0,0,0,0.15) | Modals, popovers |

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

