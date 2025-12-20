# Material Foundations

> **Quick Summary:** Material Design provides foundational systems for layout, color, typography, and iconography that work together coherently.

## What You'll Learn

- Layout and grid systems
- Color system architecture
- Typography scale
- Icon design principles

## Layout Grid

### Columns
Material uses a responsive column grid:
- Phone: 4 columns
- Tablet: 8 columns
- Desktop: 12 columns

### Margins and Gutters
- Margins: Space on screen edges (16dp typical)
- Gutters: Space between columns (16dp or 24dp)

### 8dp Grid
All measurements align to 8dp:
- Spacing: 8, 16, 24, 32, 40, 48...
- Component sizes
- Touch targets (48dp minimum)

## Color System

### Baseline Colors
- **Primary:** Main brand color
- **Secondary:** Accent color
- **Tertiary:** Additional accent
- **Error:** Error states
- **Neutral:** Backgrounds and surfaces

### Tonal Palettes
Each color generates a range of tones (0-100):
- 0: Darkest
- 50: Midpoint
- 100: Lightest

Use different tones for:
- Text on backgrounds
- State changes
- Emphasis levels

### Dynamic Color (Material 3)
Colors extracted from user's wallpaper:
- System generates harmonious palette
- Your app adapts automatically
- Maintains accessibility
- Creates personal connection

### Surface Colors
Surfaces use neutral colors with tints:
- Surface tint from primary color
- Higher elevation = more tint
- Creates unified, harmonious feel

## Typography

### Type Scale
Material provides semantic roles:
- **Display:** Large, expressive (3 sizes)
- **Headline:** Section headings (6 sizes)
- **Title:** Smaller titles (3 sizes)
- **Body:** Paragraph text (3 sizes)
- **Label:** Buttons, chips (3 sizes)

### Fonts
Default system fonts:
- Roboto: UI text
- Google Sans: Headlines (Google apps)

Custom fonts can be used following the type scale.

### Line Height
Generous line heights for readability:
- Body: ~150% of font size
- Headlines: ~120%

## Iconography

### System Icons
- 24×24dp standard size
- 2dp stroke weight
- Geometric, consistent style
- Filled and outlined variants

### Product Icons
- Unique brand expression
- Simple, recognizable shapes
- Follow icon grid (48×48)
- Limited color palette

### Icon Usage
- Use outlined for unselected states
- Use filled for selected states
- Maintain consistent sizing
- Adequate padding

## Try It Yourself

### Exercise 1: Grid Setup

Set up a Material layout grid in Figma:
- 4 columns for phone
- 16dp margins
- 16dp gutters

### Exercise 2: Color Palette

Create a Material 3 color palette:
- Primary with tonal range
- Secondary and tertiary
- Surface colors with tint
- Error and success states

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "material-foundations-quiz",
  "type": "multiple-choice",
  "title": "Material Foundations",
  "description": "Test your understanding of Material Design foundations.",
  "difficulty": "medium",
  "question": "What is Material 3's approach to color customization?",
  "options": [
    {
      "id": "a",
      "text": "Fixed color palettes that can't be changed",
      "isCorrect": false,
      "explanation": "Material 3 is highly customizable through dynamic color."
    },
    {
      "id": "b",
      "text": "Dynamic Color that can derive a full palette from a single seed color or wallpaper",
      "isCorrect": true,
      "explanation": "Correct! Material 3 introduces Dynamic Color—a system that generates harmonious color palettes from a source color. On Android 12+, it can even adapt to the user's wallpaper."
    },
    {
      "id": "c",
      "text": "Only primary and secondary colors can be customized",
      "isCorrect": false,
      "explanation": "Dynamic Color generates an entire palette including surfaces, containers, and tonal variations."
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

- 8dp grid underlies all measurements
- Tonal color palettes enable flexibility
- Dynamic color personalizes the experience
- Type scale provides semantic roles
- Icons have consistent geometry and sizing

## Next Steps

Continue to [Elevation and Surfaces](./03-elevation-and-surfaces.md) →
