# Adopting Liquid Glass

> **Quick Summary:** Learn how to bring Liquid Glass to your app's design—from app icons to navigation, controls, and modals. This practical guide covers everything you need to adopt Apple's new design language.

## What You'll Learn

- The scope of visual changes in iOS 26
- How to redesign app icons for Liquid Glass
- Navigation and control updates
- Windows, modals, and sheet considerations
- Organisation and layout changes
- Platform-specific considerations

## Getting Started

Adopting Liquid Glass doesn't mean reinventing your app from the ground up. Start by viewing your app in the latest version of Xcode to see what changes automatically—then follow these guidelines to refine your design.

### What Changes Automatically

If your app uses standard components from SwiftUI or UIKit, it picks up Liquid Glass automatically:
- Navigation bars and tab bars
- Toolbars and split views
- Buttons and controls
- Sheets and popovers

### The Three Design Principles

| Principle | Description |
|-----------|-------------|
| **Hierarchy** | Controls and navigation elevate above content, creating clear visual layers |
| **Harmony** | Interface elements align with the concentric design of hardware and software |
| **Consistency** | Designs adapt continuously across window sizes and platforms |

## App Icons

App icons take on a dynamic, expressive design with Liquid Glass. The system applies effects like reflection, refraction, shadow, blur, and highlights to your icon layers.

### New Icon Characteristics

- **Layered design:** Foreground, middle, and background layers
- **Appearance variants:** Default (light), dark, clear, and tinted
- **Updated grid:** Standardised iconography consistent across devices
- **System effects:** Masking, blurring, and visual effects applied automatically

### Icon Design Principles

1. **Provide visual consistency** across all platforms your app supports
2. **Simplify your design** using solid, filled, overlapping semi-transparent shapes
3. **Let the system handle effects** rather than baking them into your design
4. **Keep elements centred** to avoid clipping from rounded mask

### Design Workflow

1. **Design layers** in your app of choice (Figma, Sketch, etc.)
2. **Export layers** as separate foreground, middle, and background elements
3. **Use Icon Composer** in Xcode 26 to preview with system effects
4. **Test all variants** (light, dark, clear, tinted)

## Controls

Controls have a refreshed look and come to life during interaction. Knobs transform into Liquid Glass, and buttons fluidly morph into menus and popovers.

### Control Updates

- **Rounder forms:** Shapes match hardware curvature
- **Larger touch targets:** Extra-large size option available
- **Fluid interactions:** Controls respond with animation during use
- **Scroll edge effects:** Content beneath controls is obscured for legibility

### Design Guidelines

| Do | Don't |
|----|-------|
| Let controls adopt system appearance | Hard-code layout metrics |
| Use system colours that adapt to context | Apply custom colours that don't adapt |
| Use standard spacing metrics | Overcrowd or layer glass elements |
| Align rounded shapes with containers | Mix inconsistent corner radii |

### Colour in Controls

Be judicious with colour in controls:
- Let content infuse the Liquid Glass material
- Use system colours for automatic light/dark adaptation
- Maintain legibility—don't let colour overpower text

## Navigation

Key navigation elements float in the Liquid Glass layer above content.

### Navigation Hierarchy

Establish a clear separation:
1. **Liquid Glass layer:** Tab bars, sidebars, navigation bars
2. **Content layer:** Your app's content, scrolling beneath navigation

### Tab Bars

- Can adapt into sidebars depending on context (iPad, larger windows)
- Can automatically minimise when users scroll (opt-in)
- Search tabs appear at the trailing end for consistency

### Sidebars and Inspectors

- Use split views for sidebar layouts with inspector panels
- Extend content beneath sidebars with background extension effects
- Check safe areas to ensure content peeks through appropriately

### Background Extension Effect

Creates a sense of extending background content under sidebars:
- Mirrors adjacent content beneath the sidebar
- Applies blur to maintain sidebar legibility
- Perfect for edge-to-edge hero images

## Menus and Toolbars

### Menu Updates

- Adopt Liquid Glass appearance
- Common actions use icons for quick scanning
- iPadOS now has a keyboard shortcut menu bar

### Toolbar Updates

- Liquid Glass appearance with item grouping
- Group similar actions together
- Use SF Symbols instead of text where possible

### Design Guidelines

- **Group related items** that affect the same part of the interface
- **Use icons consistently**—don't mix text and icons within a group
- **Provide accessibility labels** for every icon
- **Match menu actions to swipe actions** for consistency

## Windows and Modals

### Window Changes

- Rounder corners to fit controls
- iPadOS supports continuous window resizing
- Split views reflow content fluidly during resize

### Sheets

- Increased corner radius
- Half sheets are inset from display edge
- Content peeks through around inset sheets
- Full-height sheets transition to more opaque appearance

### Action Sheets

- Originate from the triggering element (not bottom edge)
- Allow interaction with other parts of interface when active

### Design Checks

- Ensure content near sheet corners isn't too close to rounded edges
- Remove any custom background views from sheets/popovers
- Set source view for action sheets to create inline appearance

## Organisation and Layout

### Lists, Tables, and Forms

- Larger row height and padding
- Increased section corner radius
- Title-style capitalisation for section headers (no longer all caps)

### Design Guidelines

- Update section headers to title-case capitalisation
- Use SwiftUI forms for automatic layout metrics
- Give content room to breathe with standard spacing

## Platform Considerations

### iOS and iPadOS

Full Liquid Glass experience with:
- Tab bar adaptation to sidebar
- Window controls and continuous resizing (iPadOS)
- Background extension effects

### watchOS

Minimal changes:
- Adopt standard button styles and toolbar APIs
- Changes appear automatically without rebuilding

### tvOS

Focus-based Liquid Glass:
- Controls take on glass appearance when focused
- Apply focus effects to custom controls for consistency
- Requires Apple TV 4K (2nd generation) or newer

### macOS

- Liquid Glass in toolbars, split views, and navigation
- Window controls adapt to new appearance
- Use standard AppKit components for automatic adoption

## Accessibility

### Automatic Adaptations

Liquid Glass automatically adapts when users enable:
- **Reduce Transparency:** Removes translucency effects
- **Reduce Motion:** Simplifies morphing animations
- **Increase Contrast:** Enhances visual distinction

### Design Responsibilities

- Test your app with accessibility settings enabled
- Ensure custom elements provide fallback experiences
- Don't rely on translucency alone for information

## Try It Yourself

### Exercise 1: App Audit

Open your app (or an app you're redesigning) in Xcode 26:
1. Note what adopts Liquid Glass automatically
2. Identify custom backgrounds that might interfere
3. Check navigation hierarchy—is it clearly separated from content?

### Exercise 2: Icon Redesign

Redesign an app icon for Liquid Glass:
1. Simplify to 2-3 overlapping shapes
2. Create foreground, middle, and background layers
3. Preview in Icon Composer with all appearance variants

### Exercise 3: Navigation Review

Review your app's navigation structure:
1. Map out tab bar, sidebar, and toolbar items
2. Ensure clear hierarchy above content
3. Consider tab bar → sidebar adaptation for iPad

## Key Takeaways

- **Standard components adopt Liquid Glass automatically**—start by viewing your app in Xcode 26
- **Establish clear hierarchy** between navigation (Liquid Glass layer) and content
- **Redesign icons with layers** for dynamic system effects
- **Be judicious with colour** in controls—let content infuse the material
- **Test with accessibility settings** to ensure graceful degradation
- **Use Icon Composer** to preview app icons with system effects
- **Group toolbar items** and use SF Symbols consistently

## Resources

- [Apple Design Resources](https://developer.apple.com/design/resources/) — Download templates and Icon Composer
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) — Full design guidance
- [New Design Gallery](https://developer.apple.com/design/new-design-gallery/) — See how apps are using Liquid Glass

## Next Steps

Continue to [iOS Design Patterns: Standard UI Components](../02-ios-design-patterns/01-standard-ui-components.md) →
