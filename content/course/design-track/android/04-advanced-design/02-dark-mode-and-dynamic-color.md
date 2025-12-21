# Dark Mode and Dynamic Color for Android

> **Quick Summary:** Material You brings personalization to Android. Learn how to design for dark theme and dynamic color while maintaining brand identity.

## What You'll Learn

- Android's day/night theming system
- Material You and dynamic color
- Designing adaptive color schemes
- Maintaining brand identity

<!-- illustration: material-dynamic-color -->

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
Semantic colors that adapt:

- **Primary:** Main brand color
- **On Primary:** Text/icons on primary
- **Secondary:** Complementary color
- **Tertiary:** Accent for variety
- **Error:** Error states
- **Surface:** Backgrounds

### Tonal Palettes
Each color has 13 tones (0-100):
- Tone 0: Black
- Tone 10-30: Dark shades
- Tone 40-60: Middle tones
- Tone 70-90: Light shades
- Tone 100: White

## Material You and Dynamic Color

### What is Dynamic Color?
Introduced in Android 12:
- Extracts colors from wallpaper
- Creates personalized color scheme
- Applies across system and apps
- User's wallpaper = their palette

### How It Works
1. User sets a wallpaper
2. System extracts key colors
3. Algorithm generates full palette
4. Apps use dynamic color tokens

### Supporting Dynamic Color
In Compose:
```kotlin
MaterialTheme(
    colorScheme = dynamicColorScheme()
)
```

Your designs should:
- Use color roles, not hard-coded values
- Test with various wallpapers
- Maintain contrast requirements
- Have fallback static colors

## Designing Adaptive Schemes

### Start with Brand Colors
1. Define your primary brand color
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
Dynamic color can overwhelm brand:
- User's wallpaper dictates colors
- Your brand may disappear
- Need strategic approach

### Strategies

**Full Dynamic:**
- Embrace dynamic color everywhere
- Brand expressed through shape, typography
- Works for utility apps

**Partial Dynamic:**
- Dynamic for surfaces and accents
- Static for key brand elements (logo, hero)
- Good balance approach

**Static with Dynamic Accents:**
- Keep brand colors throughout
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
3. **Dynamic colors:** Various wallpapers
4. **High contrast:** Accessibility mode

### Wallpaper Testing
Test with different wallpaper types:
- Vibrant colors (red, blue, green)
- Muted colors (gray, beige)
- Photos (mixed colors)
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
1. Set primary color
2. Generate full palette
3. Preview in both themes
4. Export for implementation

### Figma Workflow
- Use Material Design 3 kit
- Create color styles for roles
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
1. Input your brand's primary color
2. Generate full palette
3. Review light and dark schemes
4. Check contrast ratios

### Exercise 2: Dynamic Color Test

On an Android 12+ device:
1. Change wallpaper to red image
2. Open Material You-enabled apps
3. Note how colors adapt
4. Repeat with blue, green wallpapers

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-color-quiz",
  "type": "multiple-choice",
  "title": "Dark Mode and Dynamic Color",
  "description": "Test your understanding of Android color systems.",
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
      "text": "Progressively lighter surface colors for higher elevations",
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

- Use Material color roles, not hard-coded values
- Support dynamic color for personalization
- Higher elevations = lighter surfaces in dark theme
- Maintain strategic brand touchpoints
- Test with various wallpapers and themes

## Next Steps

Continue to [Motion Design for Android](./03-motion-design-for-android.md) →
