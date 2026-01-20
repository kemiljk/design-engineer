# Designing Android Apps in Figma

> **Quick Summary:** Set up your Figma files correctly for Android design with proper device sizes, Material components, and design tokens. A well-structured file is the first step to a successful app.

## What You'll Learn

During this lesson, you will master the setup of Android design files and learn how to effectively use the official Material Design kits. We'll examine standard device frames and dimensions, alongside the correct configuration of components and design tokens to ensure a professional workflow.

## File Setup

Start with standard Android frame sizes in Figma, ensuring you work in **dp** (density-independent pixels). For mobile, use a **Compact phone** size of 360×800 dp as your primary starting point, or 412×915 dp for **Large phone**/Pro devices. When designing for tablets, use 600×960 dp for **Small tablet** layouts and 840×1280 dp for **Large tablet** or desktop contexts.

Keep your Figma file clean and navigable by organising it into dedicated pages. This should begin with a cover and a page for tokens and local styles, followed by a central components library. Individual screen designs should be grouped logically—such as home, detail, and settings pages—with a final page reserved specifically for interactive prototypes.

Configure your layout grids to match Material's responsive guidance. This typically means using a 4-column grid with 16dp margins and gutters for **Phone** layouts, and expanding to a 12-column grid with 24dp margins and gutters for **Tablet** environments. These grids ensure your content remains structured and aligned across various screen widths.

## Material Design Kit

Google provides official resources through the **Material Design 3 Kit**, which can be found in the Figma Community and paired with the **Material Theme Builder** plugin to automate the generation of colour palettes and text styles.

### Using the Kit
To use the Material Design Kit effectively, you should first duplicate it to your drafts or publish it as a library before importing it into your specific project file. From there, you can place instances of standard components like Top App Bars and Navigation Rails, customising them through the properties panel to toggle icons or change labels as required.

The kit includes a comprehensive library of buttons, navigation components like rails and drawers, selection controls, and containment surfaces such as cards and bottom sheets.

## Typography Setup

### Roboto Font
**Roboto** is the standard system font for Android. It is clean, versatile, and legible. Figma has Google Fonts built-in, so you don't need to install it manually.

Create text styles that map directly to the Material Type Scale to ensure consistency between design and code. This includes large, medium, and small variants for **Display** (hero headers), **Headline** (section headers), **Title** (component titles), **Body** (reading text), and **Label** (button text and captions) roles.
 naming them strictly (e.g., "M3/Body/Large") ensures they map to code tokens.

The Material Theme Builder plugin is an essential tool that generates entire tonal palettes from a single brand colour. By inputting your primary hue, the plugin automatically creates semantic styles for surfaces and containers across both light and dark modes, ensuring absolute consistency in your design system.

A robust colour system avoids raw hex codes in favour of semantic tokens. This includes high-emphasis **Primary** and **On Primary** roles, lower-emphasis **Primary Container** options, and versatile **Surface** and **Outline** tokens for backgrounds and dividers.

## Icon Resources

Material Symbols is Google's variable icon library, supporting adjustable weight, fill, and optical size. These can be inserted directly via the Figma plugin or maintained as SVGs for implementation.

### Using Icons
When implementing icons, always maintain a standard 24x24dp size while ensuring the functional touch target is at least 48x48dp for accessibility. To preserve visual consistency, you should also stick to a single style—whether outlined, rounded, or sharp—throughout the entire application.

## Try It Yourself

### Exercise 1: File Setup

Create a new Figma file. Set up a phone frame (360x800). Configure a 4-column grid with 16dp margins. Link the Material 3 Design Kit.

### Exercise 2: First Screen

Design a simple "Dashboard" screen.
Design a simple dashboard screen by placing a Top App Bar and a Card containing title and supporting text. Add a Floating Action Button in the bottom right corner and use the Material Theme Builder to apply a custom brand colour across the entire interface.

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

To ensure a successful Android design, you should always start with correct 360x800dp dimensions and leverage the official Material Design 3 Kit to maintain platform consistency. Use the Material Theme Builder to generate accessible colour palettes and create semantic text styles that match the type scale, while always accounting for both light and dark modes from the very beginning of your project.

## Next Steps

Continue to [Adaptive and Responsive](./02-adaptive-and-responsive.md) →
