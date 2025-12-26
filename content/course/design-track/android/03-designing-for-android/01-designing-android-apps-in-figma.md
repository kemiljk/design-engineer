# Designing Android Apps in Figma

> **Quick Summary:** Set up your Figma files correctly for Android design with proper device sizes, Material components, and design tokens.

## What You'll Learn

- Android design file setup
- Using Material Design kits
- Device frames and dimensions
- Component and token setup

## File Setup

### Device Dimensions
Common Android frame sizes (dp):
- Compact phone: 360×800
- Large phone: 412×915
- Small tablet: 600×960
- Large tablet: 840×1280

### Page Organization
```
📄 Cover
📄 Tokens & Styles
📄 Components
📄 Screens - Home
📄 Screens - Detail
📄 Screens - Settings
📄 Prototypes
```

### Layout Grids
Set up responsive grids:
- Phone: 4 columns, 16dp margin, 16dp gutter
- Tablet: 12 columns, 24dp margin, 24dp gutter

## Material Design Kit

### Official Resources
Google provides Material Design 3 kits:
- Figma Material Design Kit
- Material Theme Builder
- Component libraries

### Using the Kit
1. Duplicate to your drafts
2. Import as library
3. Use instances of components
4. Customize via themes

### Components Included
- Buttons (all variants)
- Navigation components
- Selection controls
- Lists and cards
- Dialogs and sheets
- All in light and dark modes

## Typography Setup

### Roboto Font
Default Android font:
- Available in Figma
- Multiple weights
- Condensed variants

### Type Styles
Create styles matching Material type scale:
- Display Large/Medium/Small
- Headline Large/Medium/Small
- Title Large/Medium/Small
- Body Large/Medium/Small
- Label Large/Medium/Small

## Colour Setup

### Using Material Theme Builder
1. Input brand colours
2. Generate tonal palettes
3. Export to Figma
4. Apply as styles

### Colour Styles Structure
- Primary and on-Primary
- Secondary and on-Secondary
- Surface and on-Surface
- Background and on-Background
- Error and on-Error

### Dark Theme
Create parallel dark theme styles:
- Surface colours adjusted
- Text colours inverted
- Primary colours adapted

## Icon Resources

### Material Symbols
Google's icon library:
- Download from Google Fonts
- Import SVGs to Figma
- Multiple styles (outlined, rounded, sharp)
- Variable weight

### Using Icons
- 24dp standard size
- Match weight to text
- Outlined for unselected
- Filled for selected

## Try It Yourself

### Exercise 1: File Setup

Create a new Android project file:
- Correct device frames
- Layout grids configured
- Material kit linked
- Type styles created

### Exercise 2: First Screen

Design a simple screen using:
- Material navigation bar
- Material cards
- System icons
- Proper type styles

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

- Start with correct device dimensions in dp
- Use official Material Design kit
- Set up semantic colour styles
- Create type styles matching Material scale
- Include both light and dark themes

## Next Steps

Continue to [Adaptive and Responsive](./02-adaptive-and-responsive.md) →
