# iOS Colour and Materials

> **Quick Summary:** iOS 26 introduces **Liquid Glass**, a dynamic material that unifies Apple's design language. Combined with semantic system colours and standard material layers, you can create interfaces that are beautiful, adaptive, and deeply integrated with the system.

## What You'll Learn

- Foundational materials and colour systems of iOS
- The new Liquid Glass design language and its functional layers
- How semantic system colours adapt to light and dark modes
- Building accessible, vibrant, and deeply integrated user interfaces

## System Colours

Colour on iOS is not static. Apple provides a suite of semantic colours that adapt automatically to different environments, ensuring your app looks correct in Light Mode, Dark Mode, and various accessibility settings.

### UI Element Colours

Instead of picking a hex code for "black" text, you use **Label Colour**. This ensures that when the device switches to Dark Mode, your text automatically turns white. The hierarchy is built-in:
Standard text roles include **Label** for primary opaque text, **Secondary Label** for less prominent information, and **Tertiary Label** for disabled or placeholder content. These are supported by **Separators** for structural division and **System Background** roles for the base layout layer.

### Accent Colours

Apple defines a palette of system tint colours—Blue, Green, Red, Orange, Yellow, Pink, Purple, Teal, and Indigo. These are not just "standard" RGB values; they are carefully tuned to remain vibrant and legible in both light and dark environments. Use **System Blue** for interactive elements like buttons and links, **System Red** for destructive actions, and **System Green** for success states.

### Why Use System Colours?

Using these semantic definitions future-proofs your app. If Apple introduces a "High Contrast Dark Mode" in a future update, your app will support it instantly without you writing a single line of code. It also ensures consistency; your "red" error message will match the "red" error message in the Settings app, creating a cohesive user experience.

## Dark Mode

Support for Dark Mode is mandatory for modern iOS apps. It isn't just a "night theme"; it's an aesthetic preference that many users utilise 24/7.

### Design Considerations

Dark Mode is not a simple inversion. You cannot just swap white for black.
Dark mode design must account for visual comfort and clarity. This involves ensuring high **contrast** to avoid OLED smearing, using **elevation** through lighter grey levels rather than shadows, and ensuring appropriate **saturation** so that system colours remain comfortable against dark backgrounds.

## Materials

iOS relies on translucency to convey depth. Materials allow background content to "shine through" foreground elements, maintaining context. iOS features two primary material systems.

### Liquid Glass (iOS 26+)

**Liquid Glass** is the modern material for functional layers. It is used for navigation bars, tab bars, toolbars, and floating controls. It separates the "chrome" (interface) from the content.

#### Characteristics
Liquid Glass blurs the content behind it, but unlike older materials, it actively reflects the colour and light of the surroundings. It feels like a physical pane of glass. When you interact with a Liquid Glass control, it responds with fluid motion, morphing and shifting light.

#### Variants
**Regular Liquid Glass** is the workhorse. It maintains high legibility for text and icons, making it perfect for navigation bars and sidebars.
**Clear Liquid Glass** is highly translucent. It is reserved for immersive media experiences—like a floating playback control over a full-screen video—where seeing the content is more important than the interface itself.

#### Design Guidelines
Use Liquid Glass sparingly. It is for the functional frame of your app, not the content itself. If you overuse it, the interface becomes noisy and difficult to read. Let the content infuse the material—don't force hard background colours onto your navigation bars.

### Standard Materials (Content Layer)

Within the content area itself (the scrollable part of your view), use Standard Materials to create separation. These range from **Ultra Thin** (subtle overlay) to **Thick** (strong separation). They are static and do not have the dynamic lighting properties of Liquid Glass, making them less distracting for reading.

## Vibrancy

Vibrancy is a technique where foreground content (text, icons) blends with the background material. Instead of painting text with a solid colour, the system uses a special blending mode that pulls colour from the blurred background and brightens it. This makes the text look like it is etched into the glass, ensuring perfect contrast and a premium feel.

## Accessibility

### Colour Contrast

Beauty cannot compromise usability. All custom text must maintain a contrast ratio of **4.5:1** against its background (or 3:1 for large text). System colours handle this automatically.

### Adaptability

iOS offers powerful accessibility settings like "Increase Contrast" and "Reduce Transparency."
- When transparency is reduced, your beautiful Liquid Glass tab bar turns solid grey. This is intended behaviour. You must design your app to look good in this "flat" state as well.
- When contrast is increased, light greys become dark greys. Ensure your visual hierarchy doesn't rely solely on subtle colour differences.

### Don't Rely on Colour Alone

Never use colour as the only indicator of state. A red circle might look identical to a green circle for a colour-blind user. Always pair colour with a secondary cue: an icon (check vs. x), a text label ("Success" vs. "Error"), or a shape change.

## Try It Yourself

### Exercise 1: Liquid Glass Audit

Open Apple's built-in apps (Music, Maps, Safari) on iOS 26. Identify the boundary between the Liquid Glass layer and the content layer. Notice how the album art in Music blurs beautifully behind the playback controls. Interact with the buttons and observe the fluid lighting response.

### Exercise 2: Colour Palette

Define a semantic colour palette for a new app. Choose a primary brand colour and define its Light and Dark variants. Create a "Success" state using System Green and an "Error" state using System Red. Test your palette against white (Light Mode) and dark grey (Dark Mode) backgrounds to ensure legibility.

### Exercise 3: Material Hierarchy

Sketch a screen layout that uses depth correctly.
1.  **Background:** Content layer.
2.  **Middle:** A standard material card floating on the content.
3.  **Top:** A Liquid Glass navigation bar floating above everything.

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

- Modern iOS design leverages **Liquid Glass** for navigation and control layers
- using **Standard Materials** to organize information within the content layer
- using **Standard Materials** to organize information within the content layer
- By using **Semantic System Colours** and **Vibrancy**, you ensure that interfaces remain beautiful
- legible across light legible across light
- dark modes, provided you always prioritize **Accessibility** through proper contrast
- dark modes, provided you always prioritize **Accessibility** through proper contrast
- transparency testing transparency testing

## Next Steps

Continue to [Adopting Liquid Glass](./05-adopting-liquid-glass.md) →
