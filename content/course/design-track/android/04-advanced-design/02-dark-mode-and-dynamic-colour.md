# Dark Mode and Dynamic Colour for Android

> **Quick Summary:** Material You brings personalization to Android. Learn how to design for dark theme and dynamic colour while maintaining brand identity, creating an app that feels personal to every user.

## The Android Theming System

Since Android 10, the operating system has treated appearance as a user preference, not a fixed state. Users can toggle between Light and Dark themes at will, or have their phone switch automatically.

Support for both themes is no longer optional—it is a baseline expectation. A well-designed dark theme saves battery life on OLED screens, reduces eye strain in low-light environments, and respects the user's choice. If your app blasts a white screen at a user lying in bed, they will likely uninstall it.

## Material Design Colour System

Material Design 3 (Material You) introduces a systematic approach to colour that handles this complexity for you. Instead of picking fixed hex codes, you map your design to **Colour Roles**.

### Surface Colours and Elevation
In the physical world, shadows indicate depth. In Material's dark theme, however, shadows are invisible against dark backgrounds. Instead, Android uses **tonal surfaces** to express elevation.

To create this lighting model, backgrounds use a very dark grey or pure black, while cards and surface elements are slightly lighter. Modal components like dialogs use even lighter tones to simulate moving closer to the light source.

This lighting model creates depth without relying on drop shadows, ensuring hierarchy remains visible even in pitch black.

## Colour Roles
Every colour in your UI has a semantic role, starting with the primary brand colour and its corresponding on-primary content role for text and icons. Lower-emphasis backgrounds use the container role, while its associated on-container token handles any nested text.

By strictly using these roles, you ensure that when the theme switches, the relationships remain intact.

## Material You and Dynamic Colour

Android 12 introduced a radical shift in UI design: **Dynamic Colour**.

### How It Works
When a user selects a wallpaper, the system analyzes it to extract a seed color. Algorithms then generate a complete tonal palette—primaries, secondaries, surfaces, and accents—that harmonizes with that specific image. This means your app's "blue" button might look lavender on one user's phone and teal on another's. The interface feels personal to the user because it reflects their aesthetic choices.

### Implementing Dynamic Colour
In Jetpack Compose, supporting this is often a single line of code. As a designer, you must design for flexibility. You can no longer rely on a specific hue to convey meaning (e.g., "Red always means Error" is fine, but "Blue always means Brand" is not).

## Maintaining Brand Identity

The obvious question is: "If the user picks the colours, where does my brand go?"

**Strategy 1: Full Dynamic**
Embrace the system completely. Your app becomes a chameleon. Brand is expressed through typography, iconography, shape, and motion rather than color. This works well for utility apps.

**Strategy 2: Brand Anchors**
Allow surfaces and secondary elements to be dynamic, but keep your core actions (like the "Book Ride" button) in your static brand color. This makes the app feel native while keeping your primary call-to-action recognizable.

Alternatively, you could keep your app mostly static but use dynamic colours for subtle backgrounds, ripple effects, or highlights. This is a safe middle ground.

## Designing Adaptive Schemes

To create a flexible scheme, build a tonal palette by generating a spectrum from Tone 0 (black) to Tone 100 (white) for every colour. In this system, Tone 40 typically represents your primary colour in light mode, whereas Tone 80 is preferred for dark mode owing to its higher legibility. Secondary containers often use Tone 90, while the associated text relies on Tone 10 to guarantee a perfect contrast ratio.

By picking values from this mathematical scale, you guarantee contrast ratios. Tone 10 text will always pass accessibility standards against a Tone 90 background.

## Testing Colour Schemes

**Wallpaper Testing:** Load your design with different seed colors. Does it work if the user has a neon green wallpaper? What about a desaturated beige one?

**Contrast Verification:** Verify that your `On` colors (text) maintain a 4.5:1 contrast ratio against their containers in both light and dark modes.

## Design Tool Setup

Google provides a plugin called the **Material Theme Builder** for Figma. It is indispensable. You input your single brand colour, and it generates the entire tonal palette and all the colour roles for both light and dark themes. It even lets you simulate Dynamic Colour based on different source images.

### Token Handover
When handing off to developers, export the logic, not just the hex codes. Tell them "Primary Light is Tone 40, Primary Dark is Tone 80."

## Try It Yourself

### Exercise 1: Palette Generation
Install the Material Theme Builder plugin in Figma. Input your personal brand's primary color. Generate the full Material 3 scheme. Observe how the tool shifts the hue and saturation to create the Dark Mode variant (often a pastel version of your original).

### Exercise 2: Dynamic Colour Test
Take a screenshot of your app design. Visualize it with a vibrant red theme (from a red wallpaper) and a cool blue theme. Does the hierarchy still hold up?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-colour-quiz",
  "type": "multiple-choice",
  "title": "Dark Mode and Dynamic Colour",
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

Android theming is a cohesive system rather than a static choice, where dark mode specifically uses lighter surfaces rather than shadows to express depth. Dynamic colour extracts palettes from user wallpapers using semantic colour roles to ensure total consistency and accessibility. Ultimately, brand identity is maintained through core anchors while allowing the interface to adapt beautifully to the user's personal aesthetic.

## Next Steps

Continue to [Motion Design for Android](./03-motion-design-for-android.md) →
