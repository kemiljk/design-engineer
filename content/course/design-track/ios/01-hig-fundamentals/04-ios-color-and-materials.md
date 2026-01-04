# iOS Colour and Materials

> **Quick Summary:** iOS 26 introduces **Liquid Glass**, a dynamic material that unifies Apple's design language. Combined with system colours and standard materials, you can create beautiful, adaptive interfaces.

## What You'll Learn

- The two types of iOS materials: Liquid Glass and Standard Materials
- Liquid Glass variants (Regular and Clear)
- System colours and semantic colours
- Dark mode considerations
- Designing for accessibility

## System Colors

Apple provides semantic colours that adapt automatically:

### UI Element Colors
- **Label:** Primary text
- **Secondary Label:** Less prominent text
- **Tertiary Label:** Disabled or placeholder text
- **Separator:** Divider lines
- **Background:** View backgrounds

### Accent Colors
- **System Blue:** Links, buttons
- **System Green:** Success, positive
- **System Red:** Destructive, errors
- **System Orange:** Warnings
- **System Yellow:** Highlights
- **System Pink, Purple, Teal, Indigo:** Various accents

### Why System Colors?
- Automatically adapt to light/dark mode
- Respond to accessibility settings
- Maintain consistency across iOS
- Future-proof for new modes

## Dark Mode

iOS apps should support both light and dark appearance:

### What Changes
- Background colours invert
- Text colours adjust
- System colours adapt
- Elevation changes meaning

### Design Considerations
- Don't just invert colours
- Reduce contrast slightly in dark mode
- Elevated surfaces get lighter (not darker)
- Test both modes throughout design

### Elevation in Dark Mode
| Light Mode | Dark Mode |
|------------|-----------|
| Higher = more shadow | Higher = lighter background |
| Base is white | Base is near-black |

## Materials

iOS features two types of materials that help visually separate foreground elements from background content.

### Liquid Glass (iOS 26+)

**Liquid Glass** is the new dynamic material that forms a distinct functional layer for controls and navigation elements—floating above the content layer.

#### Characteristics
- **Blurs content** behind it whilst maintaining legibility
- **Reflects colour and light** from surrounding content
- **Reacts to interactions** with fluid motion
- **Morphs between states** during transitions

#### Where Liquid Glass Appears
Liquid Glass automatically applies to:
- Navigation bars and tab bars
- Toolbars and sidebars
- Sheets and popovers
- Buttons and controls
- Scroll edge effects

#### Liquid Glass Variants

| Variant | Use Case |
|---------|----------|
| **Regular** | Most components—maintains legibility for text, alerts, sidebars, popovers |
| **Clear** | Floating above photos/videos—highly translucent for immersive media experiences |

#### Design Guidelines
- **Don't overuse.** Reserve Liquid Glass for functional elements (controls, navigation). Overuse distracts from content.
- **Separate content from navigation.** Establish a clear hierarchy with navigation floating above content.
- **Let content infuse the material.** Be judicious with colour in controls so content can shine through.
- **Test with accessibility settings.** Liquid Glass adapts when users enable Reduce Transparency or Reduce Motion.

### Standard Materials (Content Layer)

Use standard materials within the content layer to create visual distinction:

| Material | Transparency | Use Case |
|----------|-------------|----------|
| **Ultra Thin** | Most transparent | Subtle overlay |
| **Thin** | High transparency | Light separation |
| **Regular** | Balanced | Default choice |
| **Thick** | Less transparent | Strong separation |

### When to Use Each Type
- **Liquid Glass:** Navigation and controls (floating layer)
- **Standard Materials:** Content backgrounds, cards, and visual distinction within the content layer

## Vibrancy

Text and symbols can interact with materials:

### Vibrancy Types
- **Label:** Primary text on materials
- **Secondary Label:** Less prominent
- **Tertiary Label:** Even more subtle
- **Separator:** Divider lines

Vibrant content appears to be part of the underlying material.

## Accessibility

### Color Contrast
System colours maintain accessible contrast.
Custom colours must meet:
- 4.5:1 for normal text
- 3:1 for large text

### Increase Contrast
iOS has an "Increase Contrast" setting:
- System colours respond automatically
- Test your app with this enabled

### Don't Rely on Color Alone
Pair colour with:
- Icons
- Text labels
- Patterns or shapes

## Try It Yourself

### Exercise 1: Liquid Glass Audit

Open Apple's built-in apps on iOS 26:
1. Identify where Liquid Glass appears (navigation bars, tab bars, toolbars)
2. Notice how content blurs behind Liquid Glass elements
3. Observe how the material reflects surrounding colours
4. Interact with controls and watch the fluid response

### Exercise 2: Colour Palette

Create a colour palette using system colours:
- Background colours for the content layer
- Text colours at different hierarchy levels
- Accent colours (use sparingly with Liquid Glass)
- Ensure both light and dark modes work

### Exercise 3: Material Hierarchy

Sketch a simple app screen showing:
- The Liquid Glass layer (navigation, controls)
- The content layer (using standard materials where needed)
- Clear visual separation between layers

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-materials-quiz",
  "type": "multiple-choice",
  "title": "iOS Colours and Materials",
  "description": "Test your understanding of iOS materials including Liquid Glass.",
  "difficulty": "medium",
  "question": "In iOS 26, what is the difference between Liquid Glass and Standard Materials?",
  "options": [
    {
      "id": "a",
      "text": "Liquid Glass is for dark mode, Standard Materials are for light mode",
      "isCorrect": false,
      "explanation": "Both material types work in both light and dark modes—they serve different purposes in the interface hierarchy."
    },
    {
      "id": "b",
      "text": "Liquid Glass forms the navigation/controls layer above content; Standard Materials are for the content layer",
      "isCorrect": true,
      "explanation": "Correct! Liquid Glass creates a distinct functional layer for navigation and controls that floats above content. Standard Materials (ultra-thin, thin, regular, thick) are used within the content layer for visual distinction."
    },
    {
      "id": "c",
      "text": "They're the same thing with different names",
      "isCorrect": false,
      "explanation": "They're distinct material systems with different visual properties and use cases."
    },
    {
      "id": "d",
      "text": "Liquid Glass is only for iPads, Standard Materials are for iPhones",
      "isCorrect": false,
      "explanation": "Both material systems work across all Apple platforms including iPhone and iPad."
    }
  ]
}
-->

## Key Takeaways

- **Liquid Glass** is the new material for navigation and controls in iOS 26
- Use **Regular** variant for text-heavy elements, **Clear** variant for media experiences
- **Standard Materials** are for the content layer—creating visual distinction
- Use semantic system colours for automatic adaptation
- Design for both light and dark modes
- Don't overuse Liquid Glass—reserve for functional elements
- Always test with accessibility settings (Reduce Transparency, Reduce Motion)

## Next Steps

Continue to [Adopting Liquid Glass](./05-adopting-liquid-glass.md) →
