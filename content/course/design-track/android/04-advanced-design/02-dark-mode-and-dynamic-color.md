# Dark Mode and Dynamic Color for Android

> **Quick Summary:** Material You brings personalization to Android. Learn how to design for dark theme and dynamic colour while maintaining brand identity, creating an app that feels personal to every user.

## The Android Theming System

Since Android 10, the operating system has treated appearance as a user preference, not a fixed state. Users can toggle between Light and Dark themes at will, or have their phone switch automatically.

Support for both themes is no longer optional—it is a baseline expectation. A well-designed dark theme saves battery life on OLED screens, reduces eye strain in low-light environments, and respects the user's choice. If your app blasts a white screen at a user lying in bed, they will likely uninstall it.

## Material Design Color System

Material Design 3 (Material You) introduces a systematic approach to color that handles this complexity for you. Instead of picking fixed hex codes, you map your design to **Color Roles**.

### Surface Colors and Elevation
In the physical world, shadows indicate depth. In Material's dark theme, however, shadows are invisible against dark backgrounds. Instead, Android uses **tonal surfaces** to express elevation.

**Higher elevation = Lighter surface.**
- **Background:** Pure black or very dark grey (Tone 6).
- **Surface (Card):** Slightly lighter (Tone 12).
- **Dialog:** Lighter still (Tone 24).

This lighting model creates depth without relying on drop shadows, ensuring hierarchy remains visible even in pitch black.

### Color Roles
Every color in your UI has a semantic role.
- **Primary:** Your main brand color.
- **On Primary:** The color of text/icons on top of the primary color (ensuring contrast).
- **Container:** A lower-emphasis background color.
- **On Container:** The text color for that container.

By strictly using these roles, you ensure that when the theme switches, the relationships remain intact.

## Material You and Dynamic Color

Android 12 introduced a radical shift in UI design: **Dynamic Color**.

### How It Works
When a user selects a wallpaper, the system analyzes it to extract a seed color. Algorithms then generate a complete tonal palette—primaries, secondaries, surfaces, and accents—that harmonizes with that specific image. This means your app's "blue" button might look lavender on one user's phone and teal on another's. The interface feels personal to the user because it reflects their aesthetic choices.

### Implementing Dynamic Color
In Jetpack Compose, supporting this is often a single line of code. As a designer, you must design for flexibility. You can no longer rely on a specific hue to convey meaning (e.g., "Red always means Error" is fine, but "Blue always means Brand" is not).

## Maintaining Brand Identity

The obvious question is: "If the user picks the colors, where does my brand go?"

**Strategy 1: Full Dynamic**
Embrace the system completely. Your app becomes a chameleon. Brand is expressed through typography, iconography, shape, and motion rather than color. This works well for utility apps.

**Strategy 2: Brand Anchors**
Allow surfaces and secondary elements to be dynamic, but keep your core actions (like the "Book Ride" button) in your static brand color. This makes the app feel native while keeping your primary call-to-action recognizable.

**Strategy 3: Static Brand, Dynamic Accents**
Keep your app mostly static, but use dynamic colors for subtle backgrounds, ripple effects, or highlights. This is a safe middle ground.

## Designing Adaptive Schemes

### The Tonal Palette
To create a flexible scheme, build a **Tonal Palette**. For every color, generate a spectrum from 0 (black) to 100 (white).
- **Tone 40** is usually your standard Primary in light mode.
- **Tone 80** is your Primary in dark mode (pastel colors are more legible on dark backgrounds).
- **Tone 90** is your Container color.
- **Tone 10** is your Text color.

By picking values from this mathematical scale, you guarantee contrast ratios. Tone 10 text will always pass accessibility standards against a Tone 90 background.

## Testing Color Schemes

**Wallpaper Testing:** Load your design with different seed colors. Does it work if the user has a neon green wallpaper? What about a desaturated beige one?

**Contrast Verification:** Verify that your `On` colors (text) maintain a 4.5:1 contrast ratio against their containers in both light and dark modes.

## Design Tool Setup

### Material Theme Builder
Google provides a plugin called the **Material Theme Builder** for Figma. It is indispensable. You input your single brand color, and it generates the entire tonal palette and all the color roles for both light and dark themes. It even lets you simulate Dynamic Color based on different source images.

### Token Handover
When handing off to developers, export the logic, not just the hex codes. Tell them "Primary Light is Tone 40, Primary Dark is Tone 80."

## Try It Yourself

### Exercise 1: Palette Generation
Install the Material Theme Builder plugin in Figma. Input your personal brand's primary color. Generate the full Material 3 scheme. Observe how the tool shifts the hue and saturation to create the Dark Mode variant (often a pastel version of your original).

### Exercise 2: Dynamic Color Test
Take a screenshot of your app design. Visualize it with a vibrant red theme (from a red wallpaper) and a cool blue theme. Does the hierarchy still hold up?

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
- **Dark mode** uses lighter surfaces (not shadows) to show depth.
- **Dynamic Color** extracts palettes from user wallpapers.
- Use **Semantic Color Roles** to ensure consistency and accessibility.
- **Brand identity** can be maintained through "anchors" while allowing adaptation.

## Next Steps

Continue to [Motion Design for Android](./03-motion-design-for-android.md) →
