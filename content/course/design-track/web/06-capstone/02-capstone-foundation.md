---
estimatedTime: 15
---

# Capstone: Foundation and Tokens

> **Quick Summary:** Build the foundation for your landing page by researching inspiration, defining your brand, and creating your design token system.

**Time Estimate:** 2-3 hours

## What You'll Learn

Throughout this phase, you will learn how to gather and organise design inspiration into a cohesive resource, define a distinct brand personality and voice, and create a comprehensive design token system that provides a robust foundation for your landing page project.

## Step 1: Research and Moodboard

Begin by gathering inspiration from 5-10 landing pages in your chosen category, taking screenshots of specific elements that grab your attention, such as effective hero sections, successful typography pairings, and compelling colour combinations. Pay close attention to layout patterns that feel intuitive and the subtle micro-interactions that add a layer of polish to the user experience.

### Analysing What Works

As you collect inspiration, analyse what makes these designs successful by noting recurring patterns in layout structure, font selections, and the use of bold versus muted colour palettes. Consider whether the imagery is photographic, illustrative, or abstract, and identify the overall tone—whether it feels professional, playful, technical, or warm.

### Creating Your Moodboard

Document these findings in Figma by creating a moodboard page where you can arrange your screenshots in a grid, add detailed notes on specific features you admire, and star the most inspiring examples to guide your own design process.

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

These foundational brand decisions inform every aspect of the project, from how the value proposition drives the hero messaging to how the target audience influences the visual style and complexity. Your brand attributes will directly guide your choices for colour, typography, and imagery, while the tone of voice ensures that your copy maintains a consistent and engaging personality.

## Step 3: Create Design Tokens

Now translate your brand into a systematic design language.

### Colour System

Create a structured colour palette:

Create a structured colour palette where your primary and secondary colours each have a full scale from light to dark, with 500 as the main functional colour. Include a corresponding neutral scale for greys, moving from near-white at 50 to near-black at 900.

**Semantic colours:**

| Purpose | Typical Colour |
|---------|----------------|
| Success | Green |
| Warning | Amber/Yellow |
| Error | Red |
| Info | Blue |

**Tips:**
When developing your palette, utilise tools like Coolors or Realtime Colors to test your primary colour across various tints while ensuring sufficient contrast for accessibility. Document each colour decision carefully to maintain system integrity.

### Typography Scale

Choose fonts and define your type scale:

When selecting fonts, choose heading and body typefaces (such as Inter, Space Grotesk, or Playfair Display) that complement each other and align with your brand's personality, whether you're using a single robust family or a pairing of serif and sans-serif fonts.

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
Apply these spacing tokens consistently across your design, using tight 4px-8px gaps within components and larger 16px-24px spacing between separate elements. Major page divisions and transitions between hero and footer sections should utilise breathing room of 96px or more to maintain a clean and professional hierarchy.

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

Before proceeding to the layout phase, verify that you have created a moodboard with detailed notes on inspiring examples, defined a complete brand identity, and documented all necessary colour, typography, spacing, border radius, and shadow tokens within Figma.

## Try It Yourself

Complete all steps above in your Figma file:

Finalise your foundational work by documenting all colours as named styles, creating text styles for your typography scale, and establishing documentation for your spacing, radius, and shadows. Be sure to take a screenshot of your completed tokens page for inclusion in your final case study.

## Next Steps

Continue to [Capstone: Layout and Wireframes](./03-capstone-layout.md) →

