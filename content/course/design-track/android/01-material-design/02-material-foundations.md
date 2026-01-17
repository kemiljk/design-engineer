# Material Foundations

> **Quick Summary:** Material Design provides foundational systems for layout, colour, typography, and iconography that work together coherently.

## What You'll Learn

- Layout and grid systems
- Colour system architecture
- Typography scale
- Icon design principles

## Layout Grid

### Columns
Material uses a responsive column grid to ensure consistency across devices.
- **Phone:** 4 columns
- **Tablet:** 8 columns
- **Desktop:** 12 columns

### Margins and Gutters
**Margins** are the space at the left and right edges of the screen, typically 16dp on mobile. **Gutters** are the spaces between columns, usually 16dp or 24dp. These spaces provide breathing room and structure to your content.

### The 8dp Grid
Almost all measurements in Material Design align to an 8dp grid. This "magic number" reduces decision fatigue.
- **Spacing:** Use multiples of 8 (8, 16, 24, 32, 48...).
- **Touch Targets:** The minimum touch target size is 48x48dp, ensuring usability.
- **Components:** Buttons, cards, and bars often have heights divisible by 8.

## Colour System

### Baseline Colours
- **Primary:** The main brand colour, used for key components like FABs and active states.
- **Secondary:** An accent colour for less prominent UI elements.
- **Tertiary:** A third accent for balancing the palette or adding variety.
- **Error:** Standard red for communicating failure or danger.
- **Neutral:** Shades of grey used for backgrounds, surfaces, and text.

### Tonal Palettes
Each colour in Material 3 is not just a single hex code; it generates a tonal palette ranging from 0 (black) to 100 (white). For example, your "Primary" colour might be tone 40, while the text on top of it is tone 100. This system ensures accessible contrast ratios automatically.

### Dynamic Colour (Material 3)
On Android 12+, the system can extract colours from the user's wallpaper to generate a custom theme for your app. This allows your interface to feel personal and integrated with the user's device, while the tonal system ensures it remains accessible regardless of the specific hue.

### Surface Colours
In Material 3, surface colours are often tints of the primary or neutral palettes. Higher elevation surfaces receive a stronger tint, replacing the shadow-heavy approach of previous versions with a more subtle, colour-based depth system.

## Typography

### Type Scale
Material provides a set of semantic roles to organize your text.
- **Display:** Large, expressive text for splash screens or hero sections (3 sizes).
- **Headline:** Section markings (6 sizes).
- **Title:** Smaller headings for components like cards (3 sizes).
- **Body:** The primary reading text (3 sizes).
- **Label:** Compact text for UI elements like buttons and chips (3 sizes).

### Fonts
The default system font is **Roboto**, a clean geometric sans-serif. Google apps often use **Google Sans** for headlines. You can replace these with your brand font, provided you map it correctly to the type scale roles.

### Line Height
Material enforces generous line heights to improve readability. Body text typically uses a line height of roughly 150% of the font size, while headlines are tighter at around 120%.

## Iconography

### System Icons
System icons are functional graphics used for navigation and actions.
- **Size:** Standard size is 24x24dp.
- **Style:** Geometric, simple, and consistent.
- **Stroke:** typically 2dp (can vary with optical sizing).
- **Variants:** Filled (for active states) and Outlined (for inactive states).

### Product Icons
Product icons represent your app on the home screen. They are expressive and unique to your brand. They follow a 48x48dp keyline grid but allow for more creative freedom in shape and colour.

### Icon Usage
- Use **Outlined** icons for unselected navigation items to reduce visual weight.
- Use **Filled** icons for the active selection to draw focus.
- Ensure all icons have adequate padding to meet the 48dp touch target requirement.

## Try It Yourself

### Exercise 1: Grid Setup

Set up a Material layout grid in Figma for a phone frame:
- Width: 360dp
- Columns: 4
- Margins: 16dp
- Gutters: 16dp

### Exercise 2: Colour Palette

Create a Material 3 colour palette for a fictional brand. Pick a primary seed colour and generate the tonal variations for:
- Primary Container
- On Primary Container
- Surface
- On Surface

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "material-foundations-quiz",
  "type": "multiple-choice",
  "title": "Material Foundations",
  "description": "Test your understanding of Material Design foundations.",
  "difficulty": "medium",
  "question": "What is Material 3's approach to colour customisation?",
  "options": [
    {
      "id": "a",
      "text": "Fixed colour palettes that can't be changed",
      "isCorrect": false,
      "explanation": "Material 3 is highly customizable through dynamic colour."
    },
    {
      "id": "b",
      "text": "Dynamic Colour that can derive a full palette from a single seed colour or wallpaper",
      "isCorrect": true,
      "explanation": "Correct! Material 3 introduces Dynamic Colour—a system that generates harmonious colour palettes from a source colour. On Android 12+, it can even adapt to the user's wallpaper."
    },
    {
      "id": "c",
      "text": "Only primary and secondary colours can be customised",
      "isCorrect": false,
      "explanation": "Dynamic Colour generates an entire palette including surfaces, containers, and tonal variations."
    },
    {
      "id": "d",
      "text": "Colors must be approved by Google before use",
      "isCorrect": false,
      "explanation": "There's no approval process—Material Design is flexible."
    }
  ]
}
-->

## Key Takeaways

- The **8dp grid** simplifies spacing and sizing decisions.
- **Tonal palettes** separate hue from luminance, ensuring accessibility.
- **Dynamic Colour** allows apps to adapt to the user's personal style.
- The **Type Scale** provides a semantic hierarchy for all text.
- **System Icons** should be simple and functional; **Product Icons** are expressive.

## Next Steps

Continue to [Elevation and Surfaces](./03-elevation-and-surfaces.md) →
