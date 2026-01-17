# Dark Mode and Dynamic Color for Android

> **Quick Summary:** Material You brings personalization to Android. Learn how to design for dark theme and dynamic colour while maintaining brand identity.

## What You'll Learn

- Android's day/night theming system
- Material You and dynamic colour
- Designing adaptive colour schemes
- Maintaining brand identity

<!-- illustration: material-dynamic-colour -->

## The Android Theming System

Since Android 10, the operating system has treated appearance as a user preference, not a fixed state. Users can toggle between Light and Dark themes at will, or have their phone switch automatically based on the time of day or battery saver status.

Support for both themes is no longer optional—it is a baseline expectation. A well-designed dark theme saves battery life on OLED screens, reduces eye strain in low-light environments, and respects the user's choice. If your app blasts a white screen at a user lying in bed, they will likely uninstall it.

## Material Design Color System

Material Design 3 (Material You) introduces a systematic approach to color that handles this complexity for you. Instead of picking fixed hex codes, you map your design to **Color Roles**.

### Surface Colors and Elevation

In the physical world, shadows indicate depth. In Material's dark theme, however, shadows are invisible against dark backgrounds. Instead, Android uses **tonal surfaces** to express elevation.

The rule is simple: **Higher elevation = Lighter surface.**

- **Background:** Pure black or very dark grey (Tone 6).
- **Surface (Card):** Slightly lighter (Tone 12).
- **Dialog:** Lighter still (Tone 24).

This lighting model creates depth without relying on drop shadows, ensuring hierarchy remains visible even in pitch black.

### Color Roles

Every color in your UI has a semantic role.
- **Primary:** Your main brand color, used for prominent buttons and active states.
- **On Primary:** The color of text or icons that sit *on top* of the primary color (usually white or black).
- **Container:** A lower-emphasis background color (like a light blue background for a blue button).
- **On Container:** The text color for that container.

By strictly using these roles, you ensure that when the theme switches, the relationships remain intact. High contrast is preserved automatically because the system knows that `On Primary` must always be legible against `Primary`.

## Material You and Dynamic Color

Android 12 introduced a radical shift in UI design: **Dynamic Color**.

### How It Works

When a user selects a wallpaper, the system analyzes it to extract a seed color. Algorithms then generate a complete tonal palette—primaries, secondaries, surfaces, and accents—that harmonizes with that specific image.

This means your app's "blue" button might look lavender on one user's phone and teal on another's. The interface feels personal to the user because it literally reflects their aesthetic choices.

### Implementing Dynamic Color

In Jetpack Compose, supporting this is often a single line of code:

```kotlin
MaterialTheme(
    colorScheme = dynamicColorScheme()
)
```

However, as a designer, you must design for flexibility. You can no longer rely on a specific hue to convey meaning (e.g., "Red always means Error"). While semantic roles like `Error` remain stable, your brand colors need to coexist with this shifting palette.

## Maintaining Brand Identity

The obvious question is: "If the user picks the colors, where does my brand go?"

It is a valid concern. If every app looks like the user's wallpaper, they all start to look the same. The solution is a strategic hybrid approach.

**Strategy 1: Full Dynamic**
Embrace the system completely. Your app becomes a chameleon. Brand is expressed through typography, iconography, shape, and motion rather than color. This works exceptionally well for utility apps (calculators, clocks, file managers).

**Strategy 2: Brand Anchors**
Allow surfaces and secondary elements to be dynamic, but keep your core actions (like the "Book Ride" button) in your static brand color. This makes the app feel native to the device while keeping your primary call-to-action recognizable.

**Strategy 3: Static Brand, Dynamic Accents**
Keep your app mostly static (your brand colors), but use dynamic colors for subtle backgrounds, ripple effects, or highlights. This is often the safest middle ground for established brands.

## Designing Adaptive Schemes

### The Tonal Palette

To create a flexible scheme, don't just pick a "Light Mode" and "Dark Mode" palette. Build a **Tonal Palette**.

For every color (Primary, Secondary, Tertiary), generate a spectrum from 0 (black) to 100 (white).
- **Tone 40** is usually your standard Primary in light mode.
- **Tone 80** is your Primary in dark mode (pastel colors are more legible on dark backgrounds).
- **Tone 90** is your Container color.
- **Tone 10** is your Text color.

By picking values from this mathematical scale, you guarantee contrast ratios. You know that Tone 10 text will always pass accessibility standards against a Tone 90 background.

## Testing Color Schemes

You cannot design these systems in isolation. You must stress-test them.

**Wallpaper Testing:** Load your design with different seed colors. Does it work if the user has a neon green wallpaper? What about a desaturated beige one? Does your text remain legible?

**Contrast Verification:** Verify that your `On` colors (text) maintain a 4.5:1 contrast ratio against their containers in both light and dark modes.

**High Contrast Mode:** Android offers accessibility settings that increase contrast further. Ensure your design doesn't break when these are forced by the system.

## Design Tool Setup

### Material Theme Builder

Google provides a plugin called the **Material Theme Builder** for Figma. It is indispensable. You input your single brand color, and it generates the entire tonal palette and all the color roles for both light and dark themes. It even lets you simulate Dynamic Color based on different source images.

### Token Handover

When handing off to developers, don't just export hex codes. Export the logic.

```json
{
  "primary": {
    "light": "Tone 40 (#6750A4)",
    "dark": "Tone 80 (#D0BCFF)"
  },
  "onPrimary": {
    "light": "Tone 100 (#FFFFFF)",
    "dark": "Tone 20 (#381E72)"
  }
}
```

This tells the developer exactly which tone mapping to use, ensuring the logic holds up even if the base color changes.

## Try It Yourself

### Exercise 1: Palette Generation

Install the Material Theme Builder plugin in Figma.
1. Input your personal brand's primary color.
2. Generate the full Material 3 scheme.
3. Observe how the tool shifts the hue and saturation to create the Dark Mode variant. Note how the "Dark" primary is a pastel version of your original color.

### Exercise 2: Dynamic Color Test

If you have an Android device (or an emulator):
1. Take a screenshot of your app design.
2. Change your wallpaper to a vibrant red image.
3. Open a system app (like Calculator or Settings).
4. Observe how the UI adopts the red tones.
5. Ask yourself: "If my app did this, would it still look like *my* app?"

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-colour-quiz",
  "type": "multiple-choice",
  "title": "Dark Mode and Dynamic Color",
  "description": "Test your understanding of Android colour systems.",
  "difficulty": "medium",
  "question": "How is elevation typically shown in Android's dark theme?",
  "options": [
    {
      "id": "a",
      "text": "Drop shadows, same as light theme",
      "isCorrect": false,
      "explanation": "Shadows are barely visible on dark surfaces and don't work well in dark theme."
    },
    {
      "id": "b",
      "text": "Progressively lighter surface colours for higher elevations",
      "isCorrect": true,
      "explanation": "Correct! In Material dark theme, elevated surfaces use progressively lighter tones to show depth, opposite to light theme's shadow approach."
    },
    {
      "id": "c",
      "text": "Colored borders around elevated components",
      "isCorrect": false,
      "explanation": "Borders aren't the primary elevation indicator in Material Design."
    },
    {
      "id": "d",
      "text": "Animation effects when scrolling",
      "isCorrect": false,
      "explanation": "Animation isn't used to indicate static elevation levels."
    }
  ]
}
-->

## Key Takeaways

- Android theming is a system, not a static choice.
- Dark mode uses lighter surfaces (not shadows) to show depth.
- Dynamic Color extracts palettes from user wallpapers to personalize the UI.
- Use Semantic Color Roles (Primary, On Primary, Container) to ensure consistency.
- Brand identity can be maintained through "anchors" while allowing the rest of the UI to adapt.
- Test your designs against multiple wallpapers and high-contrast modes.

## Next Steps

Continue to [Motion Design for Android](./03-motion-design-for-android.md) →
