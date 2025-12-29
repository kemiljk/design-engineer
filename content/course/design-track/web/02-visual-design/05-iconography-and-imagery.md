# Iconography and Imagery

> **Quick Summary:** Icons and images are powerful visual tools when used purposefully. Used carelessly, they add clutter and confusion.

## What You'll Learn

- When and why to use icons
- Principles of effective icon design and selection
- How to choose and use imagery effectively
- Illustration styles and when to use them
- Accessibility considerations for visual elements

## The Role of Visual Elements

> *"A logo is less important than the product it signifies; what it means is more important than what it looks like."* — Paul Rand

Icons, images, and illustrations serve specific purposes:

- **Recognition:** Quickly identify functions or content
- **Communication:** Convey meaning faster than text
- **Emotion:** Create mood and personality
- **Navigation:** Guide users through interfaces
- **Decoration:** Add visual interest (use sparingly)

Every visual element should earn its place. If it doesn't serve a purpose, it's noise.

## Icons

Icons are simplified visual symbols representing objects, actions, or concepts.

### When to Use Icons

**Good uses:**
- Universal actions (search, close, menu, home)
- Status indicators (success, warning, error)
- Object types (file, folder, user, settings)
- Navigation (arrows, expand/collapse)
- Platform conventions (share, favourite, download)

**Bad uses:**
- Abstract concepts (icons for "synergy" or "innovation")
- Actions that need explanation anyway
- Decoration without meaning
- Replacing clear text labels entirely

### Icon Principles

**Simplicity:** Icons should be instantly recognizable. Complex details get lost at small sizes.

**Consistency:** Icons in a set should share visual language: same weight, same corner radius, same perspective.

**Clarity:** A good icon has one clear meaning. If users guess wrong, the icon fails.

**Familiarity:** Use established conventions. Don't reinvent the hamburger menu.

### Pairing Icons with Text

Icons alone are often ambiguous. Best practice:

**Icons + text labels:** Clearest option. Use for navigation, important actions.

**Icons only:** Only for universally understood symbols (×, ←, ⚙️) or when space is critical and users are trained.

**Tooltips:** Reveal label on hover. Acceptable for icon-only interfaces, but not accessible on touch devices.

### Icon Sizing

<!-- illustration: icon-sizing -->

Icons should be designed for their target size:

- **16px:** Inline with text, tight spaces
- **20-24px:** Standard UI icons
- **32-48px:** Prominent features, navigation
- **64px+:** Hero icons, empty states

Don't scale icons arbitrarily. They lose clarity. Use icons designed for the size you need.

### Icon Libraries

Rather than designing icons from scratch, use established libraries:

**Open source:**
- Heroicons (Tailwind-aligned, clean)
- Feather Icons (simple, consistent)
- Lucide (Feather fork, active development)
- Tabler Icons (large set, consistent)

**Commercial:**
- SF Symbols (Apple ecosystem)
- Material Icons (Google ecosystem)
- Font Awesome (extensive, some free)

When using libraries:
- Stick to one library for consistency
- Don't mix styles (outlined with filled, etc.)
- Use icons at their intended sizes

### Icon Implementation

**SVG is preferred:** Scalable, styleable, accessible.

```html
<button>
  <svg aria-hidden="true" ...><!-- icon --></svg>
  <span>Download</span>
</button>
```

**For icon-only buttons, add accessible names:**

```html
<button aria-label="Close">
  <svg aria-hidden="true" ...><!-- × icon --></svg>
</button>
```

## Imagery

Images (photographs, graphics, screenshots) play a different role than icons.

### Types of UI Imagery

**Product photography:** Show what you're selling. E-commerce, SaaS dashboards.

**Lifestyle photography:** Show the benefit or context. Marketing pages.

**Screenshots:** Demonstrate the product. SaaS, documentation.

**Data visualisation:** Graphs, charts, maps. Dashboards, analytics.

**Decorative imagery:** Background patterns, abstract graphics. Branding.

### Selecting Effective Images

**Relevance:** The image should directly support the content. Don't use random stock photos.

**Quality:** Low-resolution, pixelated, or obviously stock images damage credibility.

**Consistency:** Images across your product should feel like they belong together.

**Authenticity:** Real photos beat obviously staged stock photography. If using stock, choose natural poses and situations.

**Diversity:** Represent your actual audience. Show diverse people, situations, contexts.

### Image Best Practices

**Size appropriately:** Don't use a 4000px image for a 200px thumbnail.

**Optimize:** Compress images for web. Use appropriate formats (WebP, AVIF for photos).

**Provide alt text:** Every meaningful image needs a text description for accessibility.

**Consider loading:** Large images affect performance. Use lazy loading.

**Handle missing images:** Show a placeholder or graceful fallback if images fail to load.

### Hero Images

The large images often used at the top of pages:

**Principles:**
- Support, don't distract from, the headline
- Ensure text remains readable (overlay, contrast)
- Consider how the image works at different screen sizes
- Optimise aggressively. Hero images are often large.

**Patterns:**
- Full-width background with overlay
- Split layout (image + text)
- Contained image with text below
- Video backgrounds (use carefully, performance impact)

## Illustrations

Illustrations are custom-drawn graphics, ranging from simple icons to complex scenes.

### When to Use Illustrations

**Empty states:** Make "no data" screens friendlier
**Onboarding:** Guide users through setup
**Error pages:** Soften the impact of problems
**Feature explanations:** Visualise abstract concepts
**Brand personality:** Add character to the interface

### Illustration Styles

**Line illustrations:** Simple, scalable, often single-color. Good for icons and simple graphics.

**Flat illustrations:** No gradients or shadows, solid colors. Clean, modern feel.

**3D illustrations:** Depth and dimension. Trendy but can feel heavy.

**Hand-drawn:** Organic, friendly, approachable. Risk of looking unprofessional.

**Isometric:** 3D-ish perspective, good for showing systems or processes.

### Consistency in Illustrations

Like icons, illustrations should share a visual language:
- Same color palette
- Same level of detail
- Same line weights
- Same character proportions
- Same lighting direction (if applicable)

A mismatch in illustration style is jarring. Commission or select illustrations as a set.

### Illustration Resources

**Libraries:**
- unDraw (free, customizable colors)
- Humaaans (mix-and-match people)
- Blush (various styles)
- DrawKit (various styles)

**Commissioning:**
- Define your style guide first
- Work with one illustrator for consistency
- Get various scenes/situations, not just one

## Accessibility for Visual Elements

### Images

**Alt text:** Describe the image for screen readers.
- Informative images: Describe the content ("Team celebrating product launch")
- Decorative images: Use empty alt (`alt=""`) so screen readers skip them

**Text in images:** Avoid. If unavoidable, include the text in alt.

### Icons

**Meaningful icons:** Need accessible names (aria-label or accompanying text)

**Decorative icons:** Use `aria-hidden="true"` to hide from screen readers

### Color Independence

Don't rely on imagery alone to convey critical information. Icons for status should be accompanied by text. Charts should have patterns, not just colors.

## Try It Yourself

### Exercise 1: Icon Audit

Find an app or website and audit its icon usage:
1. List all icons used
2. Rate each: Is it clear? Is it necessary?
3. Are icons consistent in style?
4. Which icons could be removed or need labels?

### Exercise 2: Image Selection

For a hypothetical product page, select:
1. A hero image
2. Three feature images
3. A customer testimonial image

Explain why each image was chosen and how they work together.

### Exercise 3: Empty State Design

Design an empty state for "no search results":
1. Sketch an appropriate illustration
2. Write helpful copy
3. Include a call to action
4. Ensure it doesn't feel like an error

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "icons-accessibility-quiz",
  "type": "multiple-choice",
  "title": "Icons and Accessibility",
  "description": "Test your understanding of accessible icon usage.",
  "difficulty": "medium",
  "question": "What is the best practice for an icon-only close button (×)?",
  "options": [
    {
      "id": "a",
      "text": "Use a high-contrast color so users can see it clearly",
      "isCorrect": false,
      "explanation": "Contrast helps visual users but doesn't help screen reader users who can't see the icon."
    },
    {
      "id": "b",
      "text": "Add aria-label='Close' to the button and aria-hidden='true' to the icon SVG",
      "isCorrect": true,
      "explanation": "Correct! The aria-label provides an accessible name for screen readers, while aria-hidden prevents the icon from being announced (avoiding confusion)."
    },
    {
      "id": "c",
      "text": "Use a tooltip that appears on hover to explain the action",
      "isCorrect": false,
      "explanation": "Tooltips aren't accessible on touch devices and don't help screen reader users."
    },
    {
      "id": "d",
      "text": "The × symbol is universally understood, so no additional labeling is needed",
      "isCorrect": false,
      "explanation": "Screen readers need text labels. They can't interpret visual symbols."
    }
  ]
}
-->

## Key Takeaways

- Icons should aid recognition, not create confusion. Use established conventions.
- Pair icons with text labels when possible; icon-only requires universal symbols
- Use one icon library consistently; don't mix styles
- Images should be relevant, high-quality, consistent, and authentic
- Illustrations add personality but need stylistic consistency
- All visual elements need accessibility consideration (alt text, aria-labels)
- Every visual element should earn its place. If it doesn't serve a purpose, remove it.

## Next Steps

You've completed the Visual Design Deep Dive module! You now understand:
- Typography fundamentals and hierarchy
- Color theory, palettes, and accessibility
- Spacing systems and vertical rhythm
- Layout grids and composition
- Iconography and imagery best practices

Continue to [Design Tools: Thinking in Components](../03-design-tools/01-thinking-in-components.md) →
