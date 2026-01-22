# Elevation and Surfaces

> **Quick Summary:** Elevation is a core Material concept that uses shadow and surface tint to create visual hierarchy and indicate relationships. It transforms a flat interface into a spatial environment where objects have depth and weight.

## What You'll Learn

- How elevation works as a functional tool in Android
- Standard elevation levels and their appropriate use cases
- Distinguishing between shadows and surface tints
- Designing with intentional depth

## Understanding Elevation

In the physical world, objects exist in 3D space. Material Design brings this concept to the screen by assigning every element an elevation—its height above the base surface. Elevation is measured in **dp** (density-independent pixels).

Elevation isn't just for show; it serves a functional purpose. It establishes hierarchy (items on top are more important), indicates interactivity (items lift up when touched), and clarifies spatial relationships (a shadow explains that one object is floating above another).

## Elevation Levels

Material Design defines standard elevation levels to ensure consistency.

Material Design defines standard elevation levels to ensure consistency across interfaces. **Level 0 (0dp)** serves as the base surface and background of the application. **Level 1 (1dp)** is used for low-emphasis containers like cards or search bars, while **Level 2 (3dp)** provides a resting state for interactive elements like elevated buttons and Floating Action Buttons (FABs). Higher levels like **Level 3 (6dp)** are reserved for active states or snackbars, while the highest levels, **Level 4 (8dp)** and **Level 5 (12dp)**, are for modal elements that command attention, such as bottom sheets and dialogs.

## Shadow Components

Material shadows are constructed from two light sources to create a realistic effect.

Material shadows are constructed from two light sources to create a realistic effect. The **Key Shadow** provides definition and direction, representing a direct light source, while the **Ambient Shadow** is soft and surrounding, representing reflected light from the environment. Together, they create a depth effect that feels grounded and natural.

## Surface Tint

Material 3 introduces a major evolution: **Tonal Elevation**. In addition to shadows, elevation is now expressed through colour.

Surfaces at higher elevations receive a stronger tint of the primary colour. This is subtle in light themes—a Level 1 surface might be slightly tinged with the primary blue, while a Level 5 surface is noticeably bluer. In dark themes, this is critical. Since shadows are hard to see against a dark background, the surface tint becomes the primary way to distinguish layers. A higher surface is lighter, simulating it moving closer to the light source.

## Interactive Elevation

Elements are not static; they move in response to user input.

Elements are dynamic and move in response to user input. In a **Resting** state, a component sits at its default elevation. When **Hovered**, it may lift slightly to indicate it is ready to be clicked, and when **Pressed**, the ripple effect confirms the action as the elevation either decreases or stays steady. When **Dragged**, an element typically rises significantly to show it has detached from its position and is floating above the rest of the UI.

## Designing with Elevation

### Do
Use elevation to create a clear hierarchy. Temporary surfaces like dialogs should be higher than permanent ones like cards. Be consistent with the standard levels to avoid a "messy" look. Always consider how your elevation strategy translates to dark mode, relying on tint where shadows fail.

### Don't
Do not use elevation purely for decoration; every lift should have a meaning. Avoid creating impossible physical situations, such as a lower object casting a shadow on a higher one. Resist the urge to over-elevate everything—if everything is floating, nothing stands out.

## Try It Yourself

### Exercise 1: Elevation Audit

Open a few Google apps (Gmail, Drive, Maps) and analyse the depth. Identify which elements sit at Level 0. Find the elevated surfaces and guess their level. Notice how the elevation changes when you tap or drag an item.

### Exercise 2: Card Elevation

Design a simple card component. Define its appearance in two states:
Design a simple card component and define its appearance across two distinct states. At its resting state, the card should sit at 1dp elevation with a subtle shadow and tint, while the hover and press states should rise to 3dp with a larger shadow and significantly stronger tint.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "material-elevation-quiz",
  "type": "multiple-choice",
  "title": "Elevation and Surfaces",
  "description": "Test your understanding of Material elevation.",
  "difficulty": "medium",
  "question": "In Material 3, how is elevation primarily expressed?",
  "options": [
    {
      "id": "a",
      "text": "Only through shadows like in Material 2",
      "isCorrect": false,
      "explanation": "Material 3 introduced tonal elevation as the primary method."
    },
    {
      "id": "b",
      "text": "Through tonal colour shifts—higher surfaces are lighter/darker depending on theme",
      "isCorrect": true,
      "explanation": "Correct! Material 3 uses 'tonal elevation'—surfaces at higher elevation have slightly different tones. Shadows are still available but tonal changes are primary."
    },
    {
      "id": "c",
      "text": "Elevation is no longer used in Material 3",
      "isCorrect": false,
      "explanation": "Elevation remains important, just expressed differently."
    },
    {
      "id": "d",
      "text": "Through blur effects on lower surfaces",
      "isCorrect": false,
      "explanation": "Blur isn't the primary elevation indicator in Material Design."
    }
  ]
}
-->

## Key Takeaways

- Elevation establishes a clear visual hierarchy by combining shadows with surface tints, particularly in Material 3
- Elevation is dynamic, where elements rise and fall naturally based on user interaction
- Use standard elevation levels consistently to maintain visual order and indicate interactivity

## Next Steps

Continue to [Theming and Customisation](./04-theming-and-customisation.md) →
