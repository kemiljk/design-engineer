# Elevation and Surfaces

> **Quick Summary:** Elevation is a core Material concept that uses shadow and surface tint to create visual hierarchy and indicate relationships.

## What You'll Learn

- How elevation works
- Elevation levels and usage
- Shadow vs. surface tint
- Designing with depth

## Understanding Elevation

Elevation represents height above the base surface:
- Measured in dp (density-independent pixels)
- Creates hierarchy through shadow
- Indicates interactivity
- Shows relationships between elements

## Elevation Levels

### Level 0 (0dp)
- Base surface
- Background content
- Disabled elements

### Level 1 (1dp)
- Cards
- Search bars
- Text fields (filled)

### Level 2 (3dp)
- Elevated buttons
- Floating action button (resting)
- Refreshed snackbars

### Level 3 (6dp)
- FAB (pressed)
- Snackbars
- Elevated surfaces

### Level 4 (8dp)
- Bottom sheets
- Navigation drawer
- Side sheets

### Level 5 (12dp)
- Dialogs
- Modal bottom sheets

## Shadow Components

Material shadows have two layers:

### Key Shadow
- Sharper, more directional
- Represents key light
- More visible

### Ambient Shadow
- Softer, more diffuse
- Surrounds element evenly
- Subtle fill

### Shadow Values by Elevation
```
1dp: key 0 1px 1px, ambient 0 1px 3px
3dp: key 0 2px 3px, ambient 0 3px 4px
6dp: key 0 4px 6px, ambient 0 6px 10px
```

## Surface Tint

In Material 3, elevation also applies color tint:

### How It Works
- Higher elevation = more primary tint
- Visible on surface colors
- Works in light and dark themes
- Subtle but meaningful

### Light Theme
- Base surface is near-white
- Tint adds subtle color
- Higher = more visible tint

### Dark Theme
- Base surface is dark gray
- Tint lightens the surface
- More pronounced effect

## Interactive Elevation

Elements can change elevation on interaction:

### Resting State
Base elevation for the component.

### Hovered
Slight increase (e.g., +1dp).

### Pressed
Often decreases or matches resting.

### Dragged
Significant increase (e.g., +8dp).

## Designing with Elevation

### Do
- Use elevation to show hierarchy
- Increase elevation for temporary surfaces
- Be consistent with elevation levels
- Consider both shadow and tint

### Don't
- Use elevation for decoration only
- Create impossible "physical" situations
- Ignore dark theme implications
- Over-elevate everything

## Try It Yourself

### Exercise 1: Elevation Audit

Look at Google apps and identify:
- What's at elevation 0?
- What's elevated?
- How does elevation change on interaction?

### Exercise 2: Card Elevation

Design a card with:
- Resting elevation (1dp)
- Hover elevation (3dp)
- Appropriate shadows for each

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
      "text": "Through tonal color shifts—higher surfaces are lighter/darker depending on theme",
      "isCorrect": true,
      "explanation": "Correct! Material 3 uses 'tonal elevation'—surfaces at higher elevation have slightly different tones. Shadows are still available but tonal changes are primary."
    },
    {
      "id": "c",
      "text": "Elevation is no longer used in Material 3",
      "isCorrect": false,
      "explanation": "Elevation remains important—just expressed differently."
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

- Elevation creates hierarchy through shadow and tint
- Standard levels ensure consistency
- Both shadow and surface tint indicate elevation
- Elevation changes with interaction states
- Dark theme requires special consideration

## Next Steps

Continue to [Theming and Customization](./04-theming-and-customization.md) →
