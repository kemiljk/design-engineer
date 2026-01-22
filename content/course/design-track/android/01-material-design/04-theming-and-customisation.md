# Theming and Customisation

> **Quick Summary:** Material Design is meant to be customised. Theming lets you express your brand whilst maintaining Material's usability foundations.

## What You'll Learn

- Core concepts of Material Theming
- How to effectively customise colour, typography, and shape systems
- Strategies for balancing brand expression with usability standards

## Material Theming

Material Design provides the building blocks, but theming is how you make them yours. It separates the **customisable** visual layer from the **consistent** behavioural layer.

### What's Customisable
You can drastically change the look of your app by adjusting:
You can drastically change the look and feel of your app by adjusting several key axes. This includes the **colour palette** (hues and tones), **typography** (fonts and type scale), the **shape** of component corners, and the speed and style of **motion** animations. Maintaining behavioural consistency, accessibility standards, and established system interaction patterns ensures the app remains intuitive while expressing your brand identity.

### What Stays Consistent
To ensure your app remains usable and "feels" like an Android app, you should maintain:
To ensure your app remains usable and "feels" like an Android app, you should maintain consistent component behaviour—such as ripples on buttons—while adhering to accessibility standards for contrast and touch targets. Interaction patterns, including swipe gestures and navigation flows, should follow system norms to avoid user confusion.

## Colour Theming

### Baseline to Brand
Start with Material's semantic roles and map your brand to them:
Start by mapping your brand to Material's semantic roles: use your main brand colour for **Primary**, a complementary accent for **Secondary**, and reserve **Tertiary** for specific moments of surprise or unique expression.

### Generating Palettes
Don't just pick one hex code. Use the **Material Theme Builder** to generate a full tonal palette.
To generate an accessible theme using the Material Theme Builder, begin by inputting your brand's core colours and allowing the system to generate the complete tonal palette for containers and surfaces. You should then carefully check the resulting contrast ratios to verify accessibility before exporting the final theme directly to your Jetpack Compose or XML codebase.

### Dark Theme
Theming for Dark Mode isn't just inversion.
When designing for Dark Mode, you should desaturate your colours to avoid vibration against dark backgrounds, using softer and more pastel versions of your brand palette. It's also important to use dark surface tones that have a slight violet or blue tint, rather than pure black, to create a greater sense of depth.

## Typography Theming

### Custom Fonts
You are not stuck with Roboto. Replacing the font is the single most impactful branding move you can make.
Display text should employ a unique and expressive font to firmly establish your brand's voice, while body text requires a highly legible serif or sans-serif choice for longer reading sessions. Functional elements like buttons should typically stick to a clean, functional font to ensure absolute clarity for the user.

### Adjusting Scale
You can tweak the default type scale. If your brand is bold and loud, increase the size and weight of your Headlines. If it's elegant and refined, use lighter weights and more generous letter spacing.

## Shape Theming

### Corner Radius
Shape conveys personality. Material supports a wide range of corner treatments.
Corner radius communicates personality and brand values. **Sharp** (0dp) corners feel serious and professional, whereas **Slightly Rounded** (4dp) ones are traditional and safe. **Rounded** (8-12dp) treatments feel modern and friendly, and **Fully Rounded** or pill shapes convey a casual, playful tone. Applying these strategically—such as pill shapes for buttons and slightly rounded corners for cards—creates a nuanced brand expression.

### Applying Shape
You don't have to use one shape everywhere. You can mix them strategically.
Strategic application of shape helps signal hierarchy and component type. Small elements like buttons often use full pill shapes, while medium components like cards might use a 12dp radius, and large modal surfaces like bottom sheets can use larger radii to stand out..

### Brand Expression
Your shape strategy communicates your brand values. A banking app might use sharp corners to convey stability. A dating app might use fully rounded shapes to convey approachability.

## Putting It Together

### Example Theme: "EcoMarket"

**Colour:**
The EcoMarket brand palette relies on Forest Green to convey nature and growth as its primary colour, supported by an earthy brown secondary and a sunny yellow tertiary to evoke stability and optimism.

**Typography:**
Its typography pairs the organic serif feel of Merriweather for display text with the clean, modern sans-serif Lato for primary body content.

**Shape:**
The brand's friendly and soft tone is reinforced through a shape strategy that uses 16dp rounded corners for cards and full pill shapes for all primary buttons.

### Consistency
Once you define these values, apply them uniformly. Use design tokens (variables) in your code so that changing `shape-medium` updates every card in your app instantly.

## Try It Yourself

### Exercise 1: Theme Creation

Use the Material Theme Builder (web tool or Figma plugin) to:
Using the Material Theme Builder, input a brand colour to see how the software generates a full tonal palette. You should then preview the result on standard UI components and export the finalised values for implementation.

### Exercise 2: Shape Exploration

Take a standard card component and create three variants:
Create three distinct variants of a standard card: a strict version with 0dp sharp corners, a soft version with 12dp rounded corners, and a playful variant that uses 24dp corners on the top-left and bottom-right while keeping the others sharp. Observe which of these most drastically shifts the perceived "vibe" of the component.
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

Material theaming allows you to brand your application without breaking core usability, primarily by pulling three main levers: colour, typography, and shape. Automated tools like the Material Theme Builder handle the complex mathematics of maintaining accessibility, provided you apply your theme tokens consistently and globally throughout your product.

## Next Steps

Continue to [Material 3 Expressive](./05-material-3-expressive.md) →
