# Dark Mode and Dynamic Color for Android

> **Quick Summary:** Material You brings personalization to Android. Learn how to design for dark theme and dynamic colour while maintaining brand identity.

## What You'll Learn

- Android's day/night theming system
- Material You and dynamic colour
- Designing adaptive colour schemes
- Maintaining brand identity

<!-- illustration: material-dynamic-colour -->

## The Android Theming System

### Day/Night Themes
Since Android 10, users choose their theme:
- **Light theme:** Default for daytime
- **Dark theme:** Reduced brightness for night
- **System default:** Follows device setting

### Why Support Both?
- **User preference:** Respect personal choice
- **Battery savings:** Dark themes on OLED
- **Eye comfort:** Reduced strain in low light
- **Requirement:** Expected in modern apps

## Material Design Color System

### Surface Colors
Material 3 uses tonal surfaces:

| Surface | Light | Dark |
|---------|-------|------|
| Surface | #FFFBFE | #1C1B1F |
| Surface Variant | #E7E0EC | #49454F |
| Surface Container | #F3EDF7 | #211F26 |

### Color Roles
Semantic colours that adapt:

- **Primary:** Main brand colour
- **On Primary:** Text/icons on primary
- **Secondary:** Complementary colour
- **Tertiary:** Accent for variety
- **Error:** Error states
- **Surface:** Backgrounds

### Tonal Palettes
Each colour has 13 tones (0-100):
- Tone 0: Black
- Tone 10-30: Dark shades
- Tone 40-60: Middle tones
- Tone 70-90: Light shades
- Tone 100: White

## Material You and Dynamic Color

### What is Dynamic Color?
Introduced in Android 12:
- Extracts colours from wallpaper
- Creates personalized colour scheme
- Applies across system and apps
- User's wallpaper = their palette

### How It Works
1. User sets a wallpaper
2. System extracts key colours
3. Algorithm generates full palette
4. Apps use dynamic colour tokens

### Supporting Dynamic Color
In Compose:
```kotlin
MaterialTheme(
    colorScheme = dynamicColorScheme()
)
```

Your designs should:
- Use colour roles, not hard-coded values
- Test with various wallpapers
- Maintain contrast requirements
- Have fallback static colours

## Designing Adaptive Schemes

### Start with Brand Colors
1. Define your primary brand colour
2. Generate tonal palette (use Material Theme Builder)
3. Create complementary secondary
4. Add accent tertiary

### Light Theme Approach
- Use lighter tones for surfaces (90-99)
- Darker tones for text and icons (10-30)
- Primary at tone 40 typically
- High contrast is easier

### Dark Theme Approach
- Darker tones for surfaces (6-20)
- Lighter tones for text (80-90)
- Primary at tone 80 typically
- Watch for low contrast

### Elevation in Dark Theme
Unlike light theme's shadows:
- Higher surfaces are lighter
- Creates layered depth effect
- Surface at elevation 1: Tone 6
- Surface at elevation 5: Tone 17

## Maintaining Brand Identity

### The Challenge
Dynamic colour can overwhelm brand:
- User's wallpaper dictates colours
- Your brand may disappear
- Need strategic approach

### Strategies

**Full Dynamic:**
- Embrace dynamic colour everywhere
- Brand expressed through shape, typography
- Works for utility apps

**Partial Dynamic:**
- Dynamic for surfaces and accents
- Static for key brand elements (logo, hero)
- Good balance approach

**Static with Dynamic Accents:**
- Keep brand colours throughout
- Use dynamic for subtle accents
- Best for strong brands

### Key Brand Touchpoints
Keep these consistent:
- Logo and wordmark
- Hero illustrations
- Key action buttons (sometimes)
- Onboarding/marketing screens

## Testing Color Schemes

### What to Test
1. **Light theme:** Daytime visibility
2. **Dark theme:** Night readability
3. **Dynamic colours:** Various wallpapers
4. **High contrast:** Accessibility mode

### Wallpaper Testing
Test with different wallpaper types:
- Vibrant colours (red, blue, green)
- Muted colours (grey, beige)
- Photos (mixed colours)
- Dark wallpapers
- Light wallpapers

### Contrast Verification
For each theme variation:
- Primary text: 4.5:1 minimum
- Secondary text: 4.5:1 minimum
- Interactive elements: 3:1 minimum
- Use online contrast checkers

## Design Tool Setup

### Material Theme Builder
Google's official tool:
1. Set primary colour
2. Generate full palette
3. Preview in both themes
4. Export for implementation

### Figma Workflow
- Use Material Design 3 kit
- Create colour styles for roles
- Set up light/dark variants
- Test with theme switching

### Design Tokens
Export as tokens:
```json
{
  "primary": {
    "light": "#6750A4",
    "dark": "#D0BCFF"
  },
  "onPrimary": {
    "light": "#FFFFFF",
    "dark": "#381E72"
  }
}
```

## Try It Yourself

### Exercise 1: Palette Generation

Using Material Theme Builder:
1. Input your brand's primary colour
2. Generate full palette
3. Review light and dark schemes
4. Check contrast ratios

### Exercise 2: Dynamic Color Test

On an Android 12+ device:
1. Change wallpaper to red image
2. Open Material You-enabled apps
3. Note how colours adapt
4. Repeat with blue, green wallpapers

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

- Use Material colour roles, not hard-coded values
- Support dynamic colour for personalization
- Higher elevations = lighter surfaces in dark theme
- Maintain strategic brand touchpoints
- Test with various wallpapers and themes

## Next Steps

Continue to [Motion Design for Android](./03-motion-design-for-android.md) →
