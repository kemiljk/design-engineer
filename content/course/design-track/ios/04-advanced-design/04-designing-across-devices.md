# Designing Across Apple Devices

> **Quick Summary:** Apple's ecosystem spans from watch to TV. Learn how to adapt your designs across iPhone, iPad, and Apple Watch while maintaining a cohesive experience.

## What You'll Learn

- Device-specific design considerations
- Adapting layouts for different sizes
- Maintaining design consistency
- Platform-specific patterns

<!-- illustration: apple-device-family -->

## The Apple Device Ecosystem

### Why Multi-Device Matters
Users expect apps to:
- Work on all their Apple devices
- Share data seamlessly
- Feel familiar yet optimised
- Take advantage of each form factor

### Key Devices and Sizes

| Device | Width (points) | Use Context |
|--------|---------------|-------------|
| iPhone SE | 375 | Compact, one-handed |
| iPhone 15 | 393 | Standard one-handed |
| iPhone 15 Pro Max | 430 | Two-handed, media |
| iPad Mini | 744 | Reading, casual |
| iPad Pro 11" | 834 | Productivity |
| iPad Pro 12.9" | 1024 | Desktop replacement |
| Apple Watch | 184-205 | Glances, quick actions |

## Designing for iPhone

### Compact Layouts
iPhone designs prioritise:
- **Single-column layouts** in portrait
- **Thumb-reachable actions** at bottom
- **Full-width content** usage
- **Swipe navigation** over button taps

### Safe Areas
Account for:
- Status bar height
- Home indicator
- Notch/Dynamic Island
- Rounded corners

### iPhone-Specific Patterns
- Tab bar for main navigation
- Navigation stack for hierarchy
- Sheets for secondary content
- Pull-to-refresh

## Designing for iPad

### Expanded Layouts
iPad designs can use:
- **Multi-column layouts**
- **Sidebars** for navigation
- **Popovers** instead of full sheets
- **Drag and drop** interactions

### Split View Considerations
Apps run in different sizes:
- Full screen (tablet layout)
- 1/2 split (compact or regular)
- 1/3 split (compact width)
- Slide Over (compact overlay)

### iPad-Specific Patterns
- Sidebars for primary navigation
- Three-column layouts for content apps
- Toolbars for contextual actions
- Hover states for pointer support

### Pointer and Keyboard
iPad users may have:
- Magic Keyboard with trackpad
- External mouse
- Full keyboard shortcuts

Design for these inputs:
- Hover states on interactive elements
- Keyboard navigation support
- Cursor lift effects on buttons

## Designing for Apple Watch

### Glanceable Design
Watch interfaces must be:
- **Instant to understand** (2-5 seconds)
- **Minimal in content**
- **High contrast** for outdoor use
- **Large touch targets** (44pt minimum)

### Watch Screen Sizes
- **40/41mm:** 162pt width
- **44/45mm:** 184pt width
- **49mm Ultra:** 205pt width

### Watch-Specific Patterns
- Vertical scrolling lists
- Digital Crown interaction
- Complications for quick info
- Haptic feedback for confirmation

### What Works on Watch
- Quick glances at information
- Simple actions (approve, dismiss)
- Notifications
- Health and activity tracking

### What Doesn't Work
- Complex data entry
- Long reading content
- Multi-step workflows
- Detailed visualisations

## Creating Adaptive Designs

### Shared Design Language
Across all devices, maintain:
- Consistent brand colors
- Same typography scale (adjusted)
- Familiar iconography
- Unified navigation concepts

### Device-Optimized Experiences
Don't just shrink or stretch:
- Rethink information hierarchy
- Adapt interaction patterns
- Consider device context
- Optimize for form factor

### Breakpoint Strategy
Define how your design adapts:

**Compact Width (iPhone portrait, iPad 1/3)**
- Single column
- Tab bar navigation
- Full-width components

**Regular Width (iPhone landscape, iPad)**
- Multi-column option
- Sidebar navigation
- Inline dialogs

## Design File Organization

### Structure for Multi-Device
Organize your Figma/Sketch files:

```
📁 App Name
  📁 iPhone
    - Home
    - Detail
    - Settings
  📁 iPad
    - Home (Sidebar)
    - Detail (Multi-column)
    - Settings
  📁 Watch
    - Home
    - Notifications
    - Complications
  📁 Components
    - Shared
    - iPhone-specific
    - iPad-specific
    - Watch-specific
```

### Shared Components
Create components that adapt:
- Button (scales appropriately)
- Card (adjusts padding)
- List item (varies density)

## Try It Yourself

### Exercise 1: Device Audit

Take one screen from your app:
1. How would it work on iPhone SE?
2. How would it expand on iPad?
3. What would you show on Apple Watch?
4. List the changes needed for each

### Exercise 2: Sidebar Adaptation

Design a content app navigation:
1. Tab bar version for iPhone
2. Sidebar version for iPad
3. List version for Watch
4. Ensure visual consistency

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-devices-quiz",
  "type": "multiple-choice",
  "title": "Designing Across Devices",
  "description": "Test your understanding of multi-device design.",
  "difficulty": "medium",
  "question": "When designing an iPad app, what navigation pattern typically replaces the iPhone's tab bar?",
  "options": [
    {
      "id": "a",
      "text": "A larger tab bar with bigger icons",
      "isCorrect": false,
      "explanation": "Simply enlarging the tab bar doesn't take advantage of iPad's screen space."
    },
    {
      "id": "b",
      "text": "A sidebar navigation that's always visible",
      "isCorrect": true,
      "explanation": "Correct! iPad apps typically use a sidebar for primary navigation, taking advantage of the extra screen width while keeping content easily accessible."
    },
    {
      "id": "c",
      "text": "A hamburger menu in the top corner",
      "isCorrect": false,
      "explanation": "Hamburger menus hide navigation and aren't recommended for iPad's spacious layout."
    },
    {
      "id": "d",
      "text": "Gesture-based navigation without visible controls",
      "isCorrect": false,
      "explanation": "While iPad supports gestures, primary navigation should be visible and discoverable."
    }
  ]
}
-->

## Key Takeaways

- Each device has unique design requirements
- iPhone: compact, thumb-friendly, single-column
- iPad: expanded, pointer-aware, multi-column
- Watch: glanceable, minimal, instant value
- Maintain design consistency while optimising for form factor

## Next Steps

Continue to [Design QA and Handoff](./05-design-qa-and-handoff.md) →
