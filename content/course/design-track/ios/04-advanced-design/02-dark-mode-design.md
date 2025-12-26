# Dark Mode Design for iOS

> **Quick Summary:** Dark Mode is a first-class citizen on iOS. Learn how to design interfaces that look stunning in both light and dark appearances.

## What You'll Learn

- iOS semantic colour system
- Designing for both appearances
- Handling images and illustrations
- Common dark mode pitfalls

<!-- illustration: dark-mode-mapping -->

## Why Dark Mode Matters

Since iOS 13, users can choose their preferred appearance:

- **Reduced eye strain** in low-light environments
- **Battery savings** on OLED displays
- **User preference** and comfort
- **Required by Apple** for new apps

## The Semantic Colour System

### System Colours
iOS provides colours that automatically adapt:

| Colour | Light Mode | Dark Mode |
|-------|------------|-----------|
| systemBackground | White | Black |
| secondarySystemBackground | Light grey | Dark grey |
| label | Black | White |
| secondaryLabel | Grey | Light grey |

### Why Use Semantic Colours?
- **Automatic adaptation:** No manual switching
- **Accessibility support:** Works with high contrast
- **Consistency:** Matches system UI
- **Future-proof:** Adapts to new features

## Colour Strategy for Dark Mode

### Don't Just Invert
Dark mode isn't simply inverted colours:

**❌ Wrong approach:**
- White → Black
- Black → White
- Same saturation

**✅ Right approach:**
- Consider depth and elevation
- Reduce saturation slightly
- Adjust for perceived brightness

### Elevation Through Colour
In dark mode, elevation is shown with lighter surfaces:

- **Base level:** Darkest (#000000 on OLED)
- **Card level:** Slightly lighter (#1C1C1E)
- **Modal level:** Even lighter (#2C2C2E)

This is opposite to light mode where shadows show elevation.

## Designing Both Appearances

### Primary Background
- **Light:** Pure white or off-white
- **Dark:** True black (#000000) or elevated black (#1C1C1E)

### Text Colours
Light mode text on dark backgrounds doesn't work reversed:

- **Primary text:** Full opacity in light, ~87% in dark
- **Secondary text:** ~60% opacity in light, ~60% in dark
- **Disabled text:** ~38% opacity in both

### Accent Colours
Your brand colours may need adjustment:

- **Vibrant colours:** May appear too bright in dark mode
- **Reduce saturation:** By 5-15% for dark mode
- **Test legibility:** Against dark backgrounds

## Handling Images and Media

### Photos
Generally work in both modes. Consider:
- Adding subtle borders in dark mode
- Adjusting blend modes if overlaying text

### Illustrations
May need two versions:

**Light mode version:**
- Dark strokes on light background
- Full colour saturation

**Dark mode version:**
- Light strokes on dark background
- Adjusted saturation

### Icons
SF Symbols automatically adapt. Custom icons should:
- Use template rendering mode
- Provide both appearances if needed
- Test in both contexts

## Common Dark Mode Pitfalls

### Pure Black Backgrounds
- Can feel too harsh
- Consider elevated blacks (#1C1C1E)
- Pure black okay for immersive content (photos, video)

### Insufficient Contrast
Dark grey text on dark backgrounds:
- Test with contrast checker
- Maintain 4.5:1 ratio minimum
- Consider colorblind users

### Shadows Don't Work
Shadows are invisible on dark backgrounds:
- Use subtle borders instead
- Lighter background for elevation
- Gentle glow effects sparingly

### Forgetting Dark Mode
The most common mistake:
- Always design both appearances
- Preview designs in dark mode
- Test on actual devices

## Design Tools Setup

### Figma
- Use colour styles that map to both modes
- Create separate frames for each appearance
- Use variables for automatic switching

### Sketch
- Create symbol overrides for appearance
- Use colour variables
- Preview in Appearance panel

## Testing Your Dark Mode Design

1. **Side by side:** View both appearances together
2. **In context:** Test on device in dark room
3. **Transitions:** Watch the switch animation
4. **Accessibility:** Test with increased contrast
5. **OLED check:** True blacks on OLED displays

## Try It Yourself

### Exercise 1: Colour Mapping

Create a colour mapping table:
1. List your 5 main UI colours
2. Define light mode values
3. Define dark mode equivalents
4. Check contrast ratios for both

### Exercise 2: Dark Mode Audit

Take one of your existing designs:
1. Apply iOS semantic colours
2. Adjust any illustrations
3. Check contrast ratios
4. Test elevation hierarchy

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-dark-mode-quiz",
  "type": "multiple-choice",
  "title": "Dark Mode Design",
  "description": "Test your understanding of iOS dark mode design.",
  "difficulty": "medium",
  "question": "How is elevation typically indicated in iOS dark mode?",
  "options": [
    {
      "id": "a",
      "text": "Using shadows, just like light mode",
      "isCorrect": false,
      "explanation": "Shadows are barely visible on dark backgrounds and don't effectively show elevation in dark mode."
    },
    {
      "id": "b",
      "text": "Lighter surface colours for higher elevations",
      "isCorrect": true,
      "explanation": "Correct! In dark mode, elevated surfaces use progressively lighter shades of dark grey to indicate depth, opposite to light mode's shadow approach."
    },
    {
      "id": "c",
      "text": "Colored borders around elevated elements",
      "isCorrect": false,
      "explanation": "While borders can help, the primary elevation indicator in iOS dark mode is surface colour."
    },
    {
      "id": "d",
      "text": "Blur effects under elevated elements",
      "isCorrect": false,
      "explanation": "Blur is used for materials like navigation bars, not for showing elevation hierarchy."
    }
  ]
}
-->

## Key Takeaways

- Use iOS semantic colours for automatic adaptation
- Elevation is shown with lighter surfaces in dark mode
- Adjust accent colour saturation for dark backgrounds
- Provide light/dark versions of illustrations
- Always design and test both appearances

## Next Steps

Continue to [Motion Design Principles](./03-motion-design-principles.md) →
