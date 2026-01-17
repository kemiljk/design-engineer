# Theming and Customisation

> **Quick Summary:** Material Design is meant to be customised. Theming lets you express your brand whilst maintaining Material's usability foundations.

## What You'll Learn

- Material Theming concepts
- Customising colour
- Customising typography
- Customising shape
- Balancing brand and usability

## Material Theming

Material Design provides the building blocks, but theming is how you make them yours. It separates the **customisable** visual layer from the **consistent** behavioural layer.

### What's Customisable
You can drastically change the look of your app by adjusting:
- **Colour palette:** The hues and tones used across the UI.
- **Typography:** The fonts and scale used for text.
- **Shape:** The corner radius of components like cards and buttons.
- **Motion:** The speed and style of animations (though care is needed here).

### What Stays Consistent
To ensure your app remains usable and "feels" like an Android app, you should maintain:
- **Component behaviour:** A switch should still slide; a button should still ripple.
- **Accessibility standards:** Contrast ratios and touch targets must remain compliant.
- **Interaction patterns:** Swipe gestures and navigation flows should follow system norms.

## Colour Theming

### Baseline to Brand
Start with Material's semantic roles and map your brand to them:
- **Primary:** Use your main brand colour here.
- **Secondary:** Use a complementary accent.
- **Tertiary:** Use this for moments of surprise or specific expression.

### Generating Palettes
Don't just pick one hex code. Use the **Material Theme Builder** to generate a full tonal palette.
1.  Input your brand colours.
2.  The system generates all the necessary tones (containers, surfaces, on-colours).
3.  Check the generated contrast ratios to ensure accessibility.
4.  Export the theme to your codebase (Jetpack Compose or XML).

### Dark Theme
Theming for Dark Mode isn't just inversion.
- **Desaturate:** Bright colours vibrate against dark backgrounds. Use softer, pastel versions of your brand colours.
- **Surface Tones:** Dark surfaces often have a slight blue or violet tint in Material, rather than pure black, to create depth.

## Typography Theming

### Custom Fonts
You are not stuck with Roboto. Replacing the font is the single most impactful branding move you can make.
- **Display:** Use an expressive, unique font for large headlines to capture your brand voice.
- **Body:** Use a highly legible serif or sans-serif font for long-form reading.
- **Labels:** Stick to a functional font (often the system default) for UI elements like buttons to ensure clarity.

### Adjusting Scale
You can tweak the default type scale. If your brand is bold and loud, increase the size and weight of your Headlines. If it's elegant and refined, use lighter weights and more generous letter spacing.

## Shape Theming

### Corner Radius
Shape conveys personality. Material supports a wide range of corner treatments.
- **Sharp (0dp):** Feels serious, precise, and professional.
- **Slightly Rounded (4dp):** Feels traditional and safe.
- **Rounded (8-12dp):** Feels modern and friendly.
- **Fully Rounded (Pill):** Feels playful and casual.

### Applying Shape
You don't have to use one shape everywhere. You can mix them strategically.
- **Small components** like buttons and chips often use full pill shapes (50% height radius).
- **Medium components** like cards might use a 12dp radius.
- **Large components** like bottom sheets might use a massive 28dp radius to signal they are separate surfaces.

### Brand Expression
Your shape strategy communicates your brand values. A banking app might use sharp corners to convey stability. A dating app might use fully rounded shapes to convey approachability.

## Putting It Together

### Example Theme: "EcoMarket"

**Colour:**
- **Primary:** Forest Green (Nature, growth)
- **Secondary:** Earthy Brown (Stability)
- **Tertiary:** Sunny Yellow (Optimism)

**Typography:**
- **Display:** "Merriweather" (Serif, organic feel)
- **Body:** "Lato" (Clean, modern sans-serif)

**Shape:**
- **Cards:** 16dp rounded corners (Soft, organic)
- **Buttons:** Full pill shape (Friendly)

### Consistency
Once you define these values, apply them uniformly. Use design tokens (variables) in your code so that changing `shape-medium` updates every card in your app instantly.

## Try It Yourself

### Exercise 1: Theme Creation

Use the Material Theme Builder (web tool or Figma plugin) to:
1. Input a brand colour.
2. See how it generates the full tonal palette.
3. Preview the result on standard components.
4. Export the values.

### Exercise 2: Shape Exploration

Take a standard card component and create three variants:
1. **Strict:** 0dp corners.
2. **Soft:** 12dp corners.
3. **Playful:** 24dp top-left and bottom-right, 0dp others.
Which one changes the "vibe" of the component the most?

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

- **Theming** allows you to brand Material Design without breaking usability.
- **Colour, Typography, and Shape** are the three main levers you can pull.
- **Tools** like Material Theme Builder automate the complex math of accessibility.
- **Consistency** is key—apply your theme tokens globally, not locally.

## Next Steps

Continue to [Material 3 Expressive](./05-material-3-expressive.md) →
