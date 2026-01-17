# Dark Mode Design

> **Quick Summary:** Dark Mode is a first-class citizen on iOS. It isn't just a theme; it's an environment. Learn how to design interfaces that look stunning and legible in both light and dark appearances.

## Why Dark Mode Matters

Since iOS 13, users have had the choice. Many use Dark Mode 24/7 for comfort or aesthetic preference. Others use it automatically at sunset to reduce eye strain. Designing for Dark Mode saves battery on OLED screens and prevents your app from being a blinding flashlight in a dark room. Apple requires all new apps to support it.

## The Semantic Colour System

### System Colours
iOS provides semantic colours that automatically adapt.
- **System Background:** White in Light Mode, Black in Dark Mode.
- **Label:** Black in Light Mode, White in Dark Mode.
- **System Blue:** A vibrant blue in Light Mode, a slightly lighter/brighter blue in Dark Mode to maintain contrast.

### Why Use Them?
Using semantic colours like `Color.label` or `Color.systemBackground` means your app supports Dark Mode instantly with zero extra code. It also ensures consistency with the rest of the OS.

## Colour Strategy for Dark Mode

### Don't Just Invert
Dark Mode is not a simple inversion.
**❌ Wrong:** White background → Black background. Black text → White text.
**✅ Right:** Consider depth. Dark surfaces often need to be "elevated" to show hierarchy. Reduce saturation for large blocks of colour to avoid eye strain.

### Elevation Through Colour
In Light Mode, we use shadows to show that a card is sitting on top of the background. In Dark Mode, shadows are invisible against a black background.
Instead, we use **Lightness**.
- **Base Level:** Pure Black (#000000).
- **Elevated Level (Card):** Dark Grey (#1C1C1E).
- **Modal Level:** Lighter Grey (#2C2C2E).
The "closer" the surface is to the light source (the user), the lighter it gets.

## Designing Both Appearances

### Text Colours
Pure white text on a pure black background can cause "halation" or vibrating edges for users with astigmatism.
- **Primary Text:** Use high opacity (e.g., 87% white) rather than 100% white.
- **Secondary Text:** Use medium opacity (e.g., 60% white).
- **Disabled Text:** Use low opacity (e.g., 38% white).

### Accent Colours
Your brand colour might look great on white, but it might be too dark or muddy on black. Or, if it's very saturated, it might "vibrate" visually.
- **Adjust Saturation:** You often need a desaturated or lighter version of your accent colour for Dark Mode to ensure it pops against the dark background without causing strain.

## Handling Images and Media

### Photos
Photos generally work fine, but bright images can be jarring. Consider applying a subtle dimming filter (e.g., 10% black overlay) to images when in Dark Mode to help them sit better in the interface.

### Illustrations
Illustrations often need two versions.
- **Light Mode:** Dark strokes, light fills.
- **Dark Mode:** Light strokes, dark fills.
Simply inverting an illustration often makes it look like a negative photo. You may need to recolour it specifically for the dark context.

### Icons
SF Symbols adapt automatically. For custom icons, ensure you use a "Template" rendering mode so they can be tinted by the text colour, or provide specific Light and Dark assets.

## Common Dark Mode Pitfalls

### Pure Black Backgrounds
While OLED screens love pure black (#000000) for battery saving, it can sometimes feel harsh or high-contrast. Using the system's "Elevated" background colours (dark greys) often feels softer and more premium, while preserving the ability to show depth.

### Shadows Don't Work
Stop relying on shadows. If your card is defined only by a shadow, it will disappear in Dark Mode. Add a subtle border or use a lighter background colour to define its edges.

### Forgetting to Test
The most common mistake is designing in Light Mode and "assuming" Dark Mode will work. It won't. Always preview your designs in both modes side-by-side.

## Design Tools Setup

### Figma
Use **Variables** (or Styles) that have two modes: Light and Dark. This allows you to switch a frame's mode instantly to verify the design. Never hard-code hex values; always link to your semantic palette.

## Testing Your Dark Mode Design

1.  **Side by Side:** View the same screen in both modes.
2.  **Context:** Test on a real device in a dark room. Does it hurt your eyes?
3.  **Transitions:** Switch modes in the Settings while your app is open. Does it transition smoothly?
4.  **Accessibility:** Enable "Increase Contrast" in Dark Mode to see if you lose hierarchy.

## Try It Yourself

### Exercise 1: Colour Mapping
Create a mapping table for your brand.
- **Brand Blue:** #007AFF (Light) → #0A84FF (Dark).
- **Background:** #FFFFFF (Light) → #000000 (Dark).
- **Surface:** #F2F2F7 (Light) → #1C1C1E (Dark).

### Exercise 2: Dark Mode Audit
Take an existing Light Mode screen. Convert it to Dark Mode manually.
- Did you lose the card borders?
- Is the text vibration too high?
- Do the shadows disappear?

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

- Use **Semantic System Colours** for free adaptation.
- In Dark Mode, **Lighter = Higher**. Use greys to show elevation.
- Adjust **Accent Colours** to be legible against dark backgrounds.
- Provide **Dark Mode specific assets** for illustrations.
- **Test** on real hardware in real dark environments.

## Next Steps

Continue to [Motion Design Principles](./03-motion-design-principles.md) →
