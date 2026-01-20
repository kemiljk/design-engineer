# Adopting Liquid Glass

> **Quick Summary:** Learn how to bring Liquid Glass to your app's design—from app icons to navigation, controls, and modals. This practical guide covers everything you need to adopt Apple's new design language.

## Getting Started

Adopting a new design language can feel daunting, but Liquid Glass is designed to be an evolution, not a revolution. It builds on the existing principles of depth and layering that iOS has always used, but refines them with new materials and physics.

If you are using standard system components (SwiftUI or UIKit), you are 80% of the way there. The system automatically upgrades standard navigation bars, tab bars, and buttons to the new style. Your job is to refine the custom parts of your app to match this new harmony.

### The Three Design Principles

**Hierarchy** is paramount. Controls and navigation now sit on a distinct "Liquid Glass" layer that elevates them above the content. This creates a clear z-axis separation: interactive chrome floats, while content scrolls beneath.

**Harmony** ensures the software mirrors the hardware. The curvature of software windows matches the curvature of the device screen. The material effects mimic how light passes through physical glass, creating a sense of unity between the device and the interface.

**Consistency** means the language adapts. Whether your app is running on an iPhone, an iPad, or a Mac, the Liquid Glass materials scale and reshape themselves to fit the context, providing a familiar experience across the ecosystem.

## App Icons

Icons in this new era are dynamic. They are no longer static PNGs; they are layered assets that respond to the system.

### The Layered Approach
Think of your icon as a shadow box. You have a background layer, a middle layer, and a foreground layer. The system applies parallax effects, reflections, and shadows based on how the user tilts their device. This adds a sense of life and depth even before the user opens the app.

### Simplicity Wins
Because the system applies so many visual effects (refraction, blur, highlights), your underlying design should be simple. Complex gradients or tiny details often get muddy when combined with the glass effects. Stick to bold shapes and solid colours.

### Workflow
Design your layers in Figma or Sketch. Export them as separate assets. Then, use the **Icon Composer** in Xcode to assemble them. This tool lets you preview how the system lighting will affect your specific colour choices in real-time.

## Controls

Controls have become more tactile. They feel less like flat stickers and more like physical objects made of glass.

Modern controls feature a rounder **shape** that mimics hardware curvature and provides tactile **interaction** through physics-based feedback and fluid lighting. When applying **colour**, it is best to use system tints that blend harmoniously with the underlying glass materials rather than using hard-coded opaque backgrounds.

## Navigation

Navigation is the frame through which users view your content.

### The Glass Layer
Your Tab Bar and Navigation Bar are the primary residents of the Glass Layer. They are semi-transparent, allowing the content to hint at itself as it scrolls underneath. This provides context—the user always knows there is "more" below the fold.

### Tab Bars
On iPad and larger screens, the standard bottom Tab Bar automatically morphs into a Sidebar. This is a key feature of the new design language: navigation adapts to the available space. Design your navigation structure to handle this pivot gracefully.

### Background Extension
One subtle but powerful effect is the "Background Extension." If you have a beautiful hero image at the top of your content, the system can blur and extend that image *under* your navigation bar. This blends the chrome and the content into a single, cohesive experience.

## Menus and Toolbars

**Grouping:** Liquid Glass emphasise grouping. Related actions in a toolbar shouldn't just sit next to each other; they should share a common glass container. This visual grouping helps users parse complex interfaces by chunking related tasks.

**Icons vs Text:** Space is premium. Wherever possible, use SF Symbols instead of text labels in toolbars. The system applies specific weights and scales to these symbols to ensure they remain legible even on translucent backgrounds.

## Windows and Modals

**Sheets:** The new sheet style is more distinct. It has a higher corner radius and, crucially, it doesn't always cover the full width of the screen on larger devices. It feels like a card floating above the interface.

**Action Sheets:** These no longer slide up from the very bottom edge. They pop out from the element that triggered them (like a popover). This strengthens the relationship between the user's action (tapping a button) and the system's response (showing options).

## Accessibility

Liquid Glass relies heavily on transparency and blur. For some users, this reduces legibility.

While Liquid Glass features **automatic adaptation** to user settings like reduced transparency, it remains your **responsibility** to test these states to ensure custom controls and text remain perfectly legible without material effects.

## Try It Yourself

### Exercise 1: App Audit
Open your current app in the Xcode 26 simulator. Don't change any code yet. Just look. What broke? Which custom controls look "flat" compared to the new system standard? How does your brand colour look when filtered through the glass material?

### Exercise 2: Icon Redesign
Take your current app icon. Deconstruct it into three layers (Background, Middle, Foreground). Simplify the shapes. Drop these layers into Icon Composer and play with the lighting sliders to see the parallax effect.

### Exercise 3: Navigation Review
Look at your navigation hierarchy. Are you using a custom opaque navigation bar? Try switching to the standard translucent appearance. Does your content look good when it scrolls behind it? If not, you might need to adjust the top padding of your content views.

## Key Takeaways

Adopting Liquid Glass creates a clear z-axis hierarchy where **navigation** floats above the **content** layer. While system components update automatically, custom elements require refinement through rounder, tactile **controls** and layered, dynamic **icons**. Success depends on thorough **accessibility testing** to maintain legibility even when transparency is disabled.

## Next Steps

Continue to [iOS Design Patterns: Standard UI Components](../02-ios-design-patterns/01-standard-ui-components.md) →
