# Elevation and Surfaces

> **Quick Summary:** Elevation is a core Material concept that uses shadow and surface tint to create visual hierarchy and indicate relationships. It transforms a flat interface into a spatial environment where objects have depth and weight.

## What You'll Learn

- How elevation works
- Elevation levels and usage
- Shadow vs. surface tint
- Designing with depth

## Understanding Elevation

In the physical world, objects exist in 3D space. Material Design brings this concept to the screen by assigning every element an elevation—its height above the base surface. Elevation is measured in **dp** (density-independent pixels).

Elevation isn't just for show; it serves a functional purpose. It establishes hierarchy (items on top are more important), indicates interactivity (items lift up when touched), and clarifies spatial relationships (a shadow explains that one object is floating above another).

## Elevation Levels

Material Design defines standard elevation levels to ensure consistency.

**Level 0 (0dp)** is the base surface. This is the background of your app and any content that sits flush with it. Disabled elements also typically rest at this level.

**Level 1 (1dp)** is for low-emphasis containers like Cards, search bars, and filled text fields. They sit just above the background, separating their content from the noise.

**Level 2 (3dp)** is the resting state for interactive elements like elevated buttons and Floating Action Buttons (FABs). This slight lift suggests that they can be pressed.

**Level 3 (6dp)** is often used for the active, pressed state of a FAB or for snackbars that toast a message above the content.

**Level 4 (8dp)** and **Level 5 (12dp)** are reserved for large, temporary surfaces that need to command attention, such as bottom sheets, navigation drawers, and dialogs. The high elevation casts a large shadow, visually separating these modal elements from the rest of the application.

## Shadow Components

Material shadows are constructed from two light sources to create a realistic effect.

The **Key Shadow** is sharp and directional, representing a direct light source (like the sun). It provides definition. The **Ambient Shadow** is soft and diffuse, representing light bouncing off the environment. It surrounds the element evenly. Together, they create a shadow that feels grounded and natural.

## Surface Tint

Material 3 introduces a major evolution: **Tonal Elevation**. In addition to shadows, elevation is now expressed through colour.

Surfaces at higher elevations receive a stronger tint of the primary colour. This is subtle in light themes—a Level 1 surface might be slightly tinged with the primary blue, while a Level 5 surface is noticeably bluer. In dark themes, this is critical. Since shadows are hard to see against a dark background, the surface tint becomes the primary way to distinguish layers. A higher surface is lighter, simulating it moving closer to the light source.

## Interactive Elevation

Elements are not static; they move in response to user input.

In its **Resting** state, a component sits at its default elevation. When **Hovered**, it might lift slightly (e.g., +1dp) to indicate it is ready to be clicked. When **Pressed**, the elevation might decrease (flattening against the surface) or remain steady, while the ripple effect confirms the action. When **Dragged**, an element typically rises significantly (e.g., to Level 3 or 4) to show that it has detached from its position and is floating above the rest of the UI.

## Designing with Elevation

### Do
Use elevation to create a clear hierarchy. Temporary surfaces like dialogs should be higher than permanent ones like cards. Be consistent with the standard levels to avoid a "messy" look. Always consider how your elevation strategy translates to dark mode, relying on tint where shadows fail.

### Don't
Do not use elevation purely for decoration; every lift should have a meaning. Avoid creating impossible physical situations, such as a lower object casting a shadow on a higher one. Resist the urge to over-elevate everything—if everything is floating, nothing stands out.

## Try It Yourself

### Exercise 1: Elevation Audit

Open a few Google apps (Gmail, Drive, Maps) and analyze the depth. Identify which elements sit at Level 0. Find the elevated surfaces and guess their level. Notice how the elevation changes when you tap or drag an item.

### Exercise 2: Card Elevation

Design a simple card component. Define its appearance in two states:
1.  **Resting:** 1dp elevation with a subtle shadow and tint.
2.  **Hover/Press:** 3dp elevation with a larger shadow and stronger tint.

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

- Elevation creates hierarchy through **shadow** and **surface tint**.
- Standard **elevation levels** (0dp to 12dp) ensure consistency.
- **Tonal elevation** (surface tint) is critical for depth in Dark Mode.
- Elevation is **dynamic**; elements rise and fall based on interaction.

## Next Steps

Continue to [Theming and Customization](./04-theming-and-customization.md) →
