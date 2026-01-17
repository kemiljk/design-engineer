# Designing Android Apps in Figma

> **Quick Summary:** Set up your Figma files correctly for Android design with proper device sizes, Material components, and design tokens. A well-structured file is the first step to a successful app.

## What You'll Learn

- Android design file setup
- Using Material Design kits
- Device frames and dimensions
- Component and token setup

## File Setup

### Device Dimensions
Start with standard Android frame sizes. Remember to design in **dp** (density-independent pixels).
- **Compact phone:** 360×800 dp (Standard starting point)
- **Large phone:** 412×915 dp (Pixel Pro / large devices)
- **Small tablet:** 600×960 dp
- **Large tablet:** 840×1280 dp

### Page Organization
Keep your file clean and navigable.
```text
📄 Cover
📄 Tokens & Styles (Local definitions)
📄 Components
📄 Screens - Home
📄 Screens - Detail
📄 Screens - Settings
📄 Prototypes
```

### Layout Grids
Configure layout grids to match Material responsive guidance.
- **Phone:** 4 columns, 16dp margin, 16dp gutter.
- **Tablet:** 12 columns, 24dp margin, 24dp gutter.
These grids ensure your content aligns correctly across different screen widths.

## Material Design Kit

### Official Resources
Google provides the **Material Design 3 Kit** for Figma. Use it.
- **Figma Community:** Search for "Material 3 Design Kit".
- **Material Theme Builder:** A plugin that generates colour palettes and text styles automatically.

### Using the Kit
1.  **Duplicate** the kit to your drafts or publish it as a library.
2.  **Import** it into your project file.
3.  **Use instances** of standard components like Top App Bars, Navigation Rails, and FABs.
4.  **Customize** these instances using the Figma properties panel (e.g., toggle icons, change labels).

### Components Included
The kit is comprehensive, covering Buttons (Filled, Tonal, Outlined, Text), Navigation (Bottom Bar, Rail, Drawer), Selection Controls (Switch, Checkbox, Radio, Chips), and Surfaces (Cards, Dialogs, Sheets).

## Typography Setup

### Roboto Font
**Roboto** is the standard system font for Android. It is clean, versatile, and legible. Figma has Google Fonts built-in, so you don't need to install it manually.

### Type Styles
Create text styles that map directly to the Material Type Scale.
- **Display:** Large/Medium/Small (Hero headers)
- **Headline:** Large/Medium/Small (Section headers)
- **Title:** Large/Medium/Small (Component titles)
- **Body:** Large/Medium/Small (Reading text)
- **Label:** Large/Medium/Small (Button text, captions)
 naming them strictly (e.g., "M3/Body/Large") ensures they map to code tokens.

## Color Setup

### Using Material Theme Builder
This plugin is your best friend.
1.  Input your brand's primary colour.
2.  The plugin generates the entire **Tonal Palette** (0-100) for primary, secondary, tertiary, neutral, and error colours.
3.  It creates the semantic styles (Surface, On Surface, Primary Container) automatically.
4.  It generates both **Light** and **Dark** modes.

### Color Styles Structure
Avoid raw hex codes. Use the generated semantic tokens:
- **Primary / On Primary:** High emphasis.
- **Primary Container / On Primary Container:** Lower emphasis.
- **Surface / On Surface:** Backgrounds and text.
- **Outline:** Borders and dividers.

## Icon Resources

### Material Symbols
Google's icon library is called **Material Symbols**.
- **Variable:** They support variable weight (thin to black), fill (on/off), and optical size.
- **Plugin:** Use the "Material Symbols" plugin in Figma to insert them directly.
- **SVG:** If you download them, keep them as SVGs.

### Using Icons
- **Size:** Standard icon size is 24x24dp.
- **Touch Target:** Always ensure the touch target is at least 48x48dp, even if the icon is smaller.
- **Style:** Stick to one style (Outlined, Rounded, or Sharp) for consistency.

## Try It Yourself

### Exercise 1: File Setup

Create a new Figma file. Set up a phone frame (360x800). Configure a 4-column grid with 16dp margins. Link the Material 3 Design Kit.

### Exercise 2: First Screen

Design a simple "Dashboard" screen.
1.  Place a **Top App Bar** with a title.
2.  Add a **Card** containing a title and supporting text.
3.  Add a **Floating Action Button** (FAB) in the bottom right corner.
4.  Use the **Material Theme Builder** to apply a custom brand colour to the entire page.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-figma-quiz",
  "type": "multiple-choice",
  "title": "Designing Android Apps in Figma",
  "description": "Test your understanding of Android design production.",
  "difficulty": "easy",
  "question": "What resources should you use in Figma when designing for Android?",
  "options": [
    {
      "id": "a",
      "text": "iOS design kits work fine for both platforms",
      "isCorrect": false,
      "explanation": "iOS and Android have different components, patterns, and guidelines."
    },
    {
      "id": "b",
      "text": "Material Design 3 kit with proper dp sizing and Material components",
      "isCorrect": true,
      "explanation": "Correct! Use the official Material 3 design kit from Google, work in dp units, and use Material components that map to Compose/XML implementations."
    },
    {
      "id": "c",
      "text": "Create everything from scratch to be unique",
      "isCorrect": false,
      "explanation": "Starting with Material ensures platform consistency and speeds up design."
    },
    {
      "id": "d",
      "text": "Any mobile design kit will work",
      "isCorrect": false,
      "explanation": "Android-specific kits ensure correct spacing, components, and patterns."
    }
  ]
}
-->

## Key Takeaways

- Start with correct **dp dimensions** (360x800).
- Use the **Material Design 3 Kit** to save time.
- Use **Material Theme Builder** to generate accessible colour palettes.
- Create semantic **Text Styles** that match the type scale.
- Include **Light and Dark** modes from day one.

## Next Steps

Continue to [Adaptive and Responsive](./02-adaptive-and-responsive.md) →
