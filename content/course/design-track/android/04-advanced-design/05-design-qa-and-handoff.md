# Design QA and Handoff for Android

> **Quick Summary:** Bridge the gap between design and implementation. Learn how to prepare your designs for Compose developers, write clear specifications using Material tokens, and ensure pixel-perfect results through a rigorous QA process.

## What You'll Learn

- Why handoff matters and how to prepare designs for developers
- Naming conventions and organising deliverables
- Matching Compose thinking in your designs
- Writing clear specifications using Material tokens
- Conducting rigorous QA to ensure pixel-perfect results

## Why Handoff Matters

Design doesn't stop when you finish the mockup. The most critical phase is transferring that vision to engineering. Poor handoff leads to "design debt"—visual inconsistencies, wasted hours, and a frustrated team. Robust handoff acts as a force multiplier, enabling developers to implement features accurately on the first try.

## Preparing for Handoff

Structure your deliverables to separate final work from explorations by organising your pages into categories like feature names, states, components, and archives, while ensuring every frame is clearly labelled as loaded or empty.

### Naming Conventions
Naming is a shared language.
Establish a shared naming language by using PascalCase for components like ProductCard and slash-notation for variants such as PrimaryButton/Pressed, which directly matches the mental model of a production codebase.

### Match Compose Thinking
Jetpack Compose is declarative. It builds UIs by stacking functions.
Since Jetpack Compose is declarative, you should group elements into meaningful vertical columns and horizontal rows, using auto layout to simulate constraints rather than relying on random groups.

## Compose-Aware Specifications

### Spacing Values
Android developers rely on the Material Design spacing scale (4, 8, 16, 24dp). Avoid random values like 13px. Sticking to the 8dp grid ensures your design fits the system.

### Typography Mapping
Map your styles to the **Material Type Scale** (`displayLarge`, `headlineMedium`, `bodyLarge`). Avoid creating custom text styles unless necessary. This ensures font scaling works automatically.

### Colour Documentation
Hard-coded hex values break in dark mode, so you must specify colours using Material Colour Roles such as `colourScheme.primary` for branding, `colourScheme.surface` for backgrounds, and `colourScheme.onSurface` for text content. This allows the system to swap values automatically based on the active theme or the user's wallpaper selection.

### Component Specifications
Define the logic, not just the look.
Specify the complete logic of each component by defining its visual properties like shape and elevation, its sizing constraints—whether it should fill width or wrap content—and its specific behaviour when text exceeds the available space.

## Creating Spec Documents

#### Filled Button Specification
The filled button is defined by a 100-unit rounded corner shape and uses the primary brand role from the colour scheme. It utilizes the large label typography with a 40dp height and 64dp minimum width, supporting disabled states at 38% opacity and pressed states with a ripple overlay. To ensure accessibility, it must maintain a minimum 48dp touch target and include a descriptive label for screen readers.

## Design QA Process

### Pre-Development Review
Run a self-check before handoff. Have you designed all states (Empty, Error, Loading)? Have you tested Dark Mode? Handing off incomplete work forces developers to guess.

### The Verification Loop
During development, request early builds.
During development, maintain a verification loop to check that spacing aligns with the 8dp grid and that the layout adapts correctly from phone to tablet. You must also ensure that dark mode is fully functional and that TalkBack reveals large enough touch targets for accessible interaction.

## Designer-Developer Collaboration

### Speak the Language
Learn basic Compose concepts.
Earn respect and clarity within the engineering team by learning basic Compose concepts, such as using composables for UI functions, modifiers for styling and layout, and state to drive data updates.

### Communication Best Practices
Establish regular touchpoints through kickoffs and QA sessions, ensuring you provide specific rationale for reachability decisions and use overlays to clearly demonstrate where padding or spacing needs adjustment.

## Tools for Handoff
Utilise powerful handoff tools like Figma Dev Mode for property inspection, the Material Theme Builder for exporting token files, and Relay for generating production-ready Compose code directly from your components.

## Try It Yourself

### Exercise 1: Spec a Card
Create a complete spec for a Card component. List every visual property, state, and sizing constraint. Note accessibility requirements.

### Exercise 2: QA Review
Take a screenshot of an implemented screen. Overlay it on your design at 50% opacity. Note every difference. This "pixel peeping" trains your eye.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-handoff-quiz",
  "type": "multiple-choice",
  "title": "Design QA and Handoff",
  "description": "Test your understanding of Android design handoff.",
  "difficulty": "medium",
  "question": "When specifying colours for Android handoff, what should you reference to ensure proper theme support?",
  "options": [
    {
      "id": "a",
      "text": "Hex colour values like #6750A4",
      "isCorrect": false,
      "explanation": "Hard-coded hex values don't adapt to dark theme or dynamic colour."
    },
    {
      "id": "b",
      "text": "Material colour scheme roles like colourScheme.primary",
      "isCorrect": true,
      "explanation": "Correct! Using Material colour roles ensures colours automatically adapt to light/dark themes and support dynamic colour from the user's wallpaper."
    },
    {
      "id": "c",
      "text": "RGB values for precision",
      "isCorrect": false,
      "explanation": "RGB values, like hex, don't adapt to theme changes."
    },
    {
      "id": "d",
      "text": "Color names like 'blue' or 'purple'",
      "isCorrect": false,
      "explanation": "Vague colour names don't provide the precision needed for implementation."
    }
  ]
}
-->

## Key Takeaways

- Effective Android handoff depends on clear naming conventions and specifications that leverage Material Design tokens and roles to define both logic and behaviour
- By treating design QA as a collaborative, ongoing process, you ensure pixel-perfect implementation
- Match Compose thinking by organising designs into meaningful columns and rows that translate directly to code

## Module Complete! 🎉

You've completed the Advanced Design module for Android. You now have the skills to design accessible, adaptive, and production-ready Android apps.

Return to [Course Home](/course) or continue with another track →
