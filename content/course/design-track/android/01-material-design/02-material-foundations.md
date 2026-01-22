# Material Foundations

> **Quick Summary:** Material Design provides foundational systems for layout, colour, typography, and iconography that work together coherently.

## What You'll Learn

- Principles of layout and responsive grid systems for Android
- Architecture of the Material colour system
- The structured typography scale
- Core design principles for functional and expressive iconography

## Layout Grid

### Columns
Material uses a responsive column grid to ensure consistency across devices.
Material uses a responsive column grid to ensure consistency across devices, beginning with 4 columns for mobile phones, 8 columns for tablets, and 12 columns for desktop environments.

### Margins and Gutters
**Margins** are the space at the left and right edges of the screen, typically 16dp on mobile. **Gutters** are the spaces between columns, usually 16dp or 24dp. These spaces provide breathing room and structure to your content.

### The 8dp Grid
Almost all measurements in Material Design align to an 8dp grid. This "magic number" reduces decision fatigue.
 MEASUREMENTS in Material Design should align to multiples of 8, such as 16, 24, or 48dp, to ensure consistent spacing across the interface. This includes meeting the minimum touch target requirement of 48x48dp for all interactive elements and designing component heights for buttons, cards, and bars that are divisible by this magic number.

## Colour System

### Baseline Colours
Material Design specifies several semantic roles for colour to ensure clarity and accessibility. The **Primary** colour serves as the main brand expression for key components like FABs and active states, while **Secondary** and **Tertiary** colours provide accents for less prominent UI elements or moments of variety. Standard **Error** colours (typically red) communicate failure or danger, and **Neutral** shades of grey are used for backgrounds, surfaces, and text.

### Tonal Palettes
Each colour in Material 3 is not just a single hex code; it generates a tonal palette ranging from 0 (black) to 100 (white). For example, your "Primary" colour might be tone 40, while the text on top of it is tone 100. This system ensures accessible contrast ratios automatically.

### Dynamic Colour (Material 3)
On Android 12+, the system can extract colours from the user's wallpaper to generate a custom theme for your app. This allows your interface to feel personal and integrated with the user's device, while the tonal system ensures it remains accessible regardless of the specific hue.

### Surface Colours
In Material 3, surface colours are often tints of the primary or neutral palettes. Higher elevation surfaces receive a stronger tint, replacing the shadow-heavy approach of previous versions with a more subtle, colour-based depth system.

## Typography

### Type Scale
Material provides a set of semantic roles to organize your text.
The type scale is organised into semantic roles to help users understand information hierarchy. This starts with large, expressive **Display** text for hero sections, followed by **Headline** sizes for section markings and **Title** styles for component headings. **Body** text handles the primary reading experience, while **Label** roles provide compact text for UI elements like buttons and chips.

### Fonts
The default system font is **Roboto**, a clean geometric sans-serif. Google apps often use **Google Sans** for headlines. You can replace these with your brand font, provided you map it correctly to the type scale roles.

### Line Height
Material enforces generous line heights to improve readability. Body text typically uses a line height of roughly 150% of the font size, while headlines are tighter at around 120%.

## Iconography

### System Icons
System icons are functional graphics used for navigation and actions.
System icons are functional graphics that should be geometric, simple, and consistent. They use a standard 24x24dp size with a typically 2dp stroke, though this can vary with optical sizing. Icons are provided in both **Filled** variants for active states and **Outlined** variants for inactive or default states.

### Product Icons
Product icons represent your app on the home screen. They are expressive and unique to your brand. They follow a 48x48dp keyline grid but allow for more creative freedom in shape and colour.

### Icon Usage
When implementing icons, use outlined variants for unselected items to reduce visual weight, while employing filled versions for active selections to draw the user's focus. You must also ensure that all icons have adequate padding to maintain the required 48dp touch target for accessibility.

## Try It Yourself

### Exercise 1: Grid Setup

Set up a Material layout grid in Figma for a phone frame:
To set up a Material layout grid in Figma, use a 360dp phone frame with 4 columns, 16dp margins, and 16dp gutters to provide consistent structure.

### Exercise 2: Colour Palette

Create a Material 3 colour palette for a fictional brand. Pick a primary seed colour and generate the tonal variations for:
Pick a primary seed colour for a fictional brand and use it to generate a full Material 3 tonal palette. Your palette should clearly define variations for the primary container, its corresponding high-contrast content, the background surface, and the text that sits upon it.

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
      "explanation": "Material 3 is highly customisable through dynamic colour."
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
      "text": "Colours must be approved by Google before use",
      "isCorrect": false,
      "explanation": "There's no approval process—Material Design is flexible."
    }
  ]
}
-->

## Key Takeaways

- The 8dp grid acts as a fundamental guide that significantly simplifies spacing
- sizing decisions across any interface sizing decisions across any interface
- By separating hue from luminance into tonal palettes, Material ensures total accessibility
- the dynamic colour system allows your app to adapt seamlessly to a user's personal style
- the dynamic colour system allows your app to adapt seamlessly to a user's personal style
- Finally, the type scale provides a robust semantic hierarchy for all text
- iconography is divided between simple system functional and expressive product graphics
- iconography is divided between simple system functional and expressive product graphics

## Next Steps

Continue to [Elevation and Surfaces](./03-elevation-and-surfaces.md) →
