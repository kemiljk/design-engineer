# Theming and Customisation

> **Quick Summary:** Material Design is meant to be customised. Theming lets you express your brand whilst maintaining Material's usability foundations.

## What You'll Learn

- Material Theming concepts
- Customising colour
- Customising typography
- Customising shape
- Balancing brand and usability

## Material Theming

Material provides building blocks; theming makes them yours:

### What's Customisable
- Colour palette
- Typography
- Shape (corner radius)
- Motion (with care)

### What Stays Consistent
- Component behaviour
- Accessibility standards
- Interaction patterns
- Information architecture

## Colour Theming

### Baseline to Brand
Start with Material's colour roles, apply your brand:
- Primary → Your brand colour
- Secondary → Complementary accent
- Tertiary → Additional expression

### Generating Palettes
Use Material Theme Builder:
1. Input your brand colours
2. System generates tonal palettes
3. Ensure accessibility
4. Export to code/design tools

### Dark Theme
Don't just invert—adjust:
- Desaturate slightly
- Ensure contrast ratios
- Test readability
- Elevations look different

## Typography Theming

### Custom Fonts
Replace default with your brand font:
- Display: Expressive brand font
- Body: Readable, possibly different font
- Labels: Clear, functional

### Adjusting Scale
Modify sizes while keeping roles:
- Maintain hierarchy relationships
- Ensure readability
- Test on devices
- Consider accessibility

## Shape Theming

### Corner Radius
Material supports different corner treatments:
- Sharp: 0dp
- Slightly rounded: 4dp
- Rounded: 8-12dp
- Very rounded: 16dp+
- Full: Pill shapes

### Applying Shape
Different shapes for different components:
- Small components: Buttons, chips (4-8dp)
- Medium components: Cards, dialogs (12-16dp)
- Large components: Sheets, backgrounds (16-28dp)

### Brand Expression
Shape communicates personality:
- Sharp corners: Professional, precise
- Rounded corners: Friendly, approachable
- Mixed: Dynamic, intentional

## Putting It Together

### Example Theme

**Colour:**

| Role | Value |
|------|-------|
| Primary | Brand blue |
| Secondary | Warm coral |
| Tertiary | Soft green |

**Typography:**

| Role | Font |
|------|------|
| Display | Brand serif |
| Body | System sans-serif |
| Labels | System sans-serif |

**Shape:**

| Size | Corner Radius |
|------|---------------|
| Small | 8dp |
| Medium | 16dp |
| Large | 24dp |

### Consistency
- Apply theme uniformly
- Document decisions
- Create design tokens
- Build component library

## Try It Yourself

### Exercise 1: Theme Creation

Use Material Theme Builder to:
- Input a brand colour
- Generate palettes
- Preview in components
- Export values

### Exercise 2: Shape Exploration

Take a Material component and explore:
- Sharp corners version
- Rounded version
- Full rounded version

Which fits your brand?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "material-theming-quiz",
  "type": "multiple-choice",
  "title": "Theming and Customisation",
  "description": "Test your understanding of Material theming.",
  "difficulty": "easy",
  "question": "What are the main customisation axes in Material Design theming?",
  "options": [
    {
      "id": "a",
      "text": "Only colours can be customised",
      "isCorrect": false,
      "explanation": "Material theming covers multiple aspects."
    },
    {
      "id": "b",
      "text": "Colour, typography, and shape",
      "isCorrect": true,
      "explanation": "Correct! Material Design's three theming pillars are colour (palette and scheme), typography (type scale and fonts), and shape (corner radii and styles)."
    },
    {
      "id": "c",
      "text": "Animation timing only",
      "isCorrect": false,
      "explanation": "Motion has guidelines but isn't part of the theming system."
    },
    {
      "id": "d",
      "text": "Icons and illustrations",
      "isCorrect": false,
      "explanation": "While important, icons aren't part of the core theming system."
    }
  ]
}
-->

## Key Takeaways

- Theming customises Material for your brand
- Colour, typography, and shape are customisable
- Behaviour and accessibility stay consistent
- Use tools like Material Theme Builder
- Document and systematise your theme

## Congratulations!

You've completed the Material Design Fundamentals module!

Continue to [Android Design Patterns: Android Navigation](../02-android-design-patterns/01-android-navigation.md) →
