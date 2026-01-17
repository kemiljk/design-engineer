# Design QA and Handoff for Android

> **Quick Summary:** Bridge the gap between design and implementation. Learn how to prepare your designs for Compose developers, write clear specifications using Material tokens, and ensure pixel-perfect results through a rigorous QA process.

## Why Handoff Matters

Design doesn't stop when you finish the mockup. The most critical phase is transferring that vision to engineering. Poor handoff leads to "design debt"—visual inconsistencies, wasted hours, and a frustrated team. Robust handoff acts as a force multiplier, enabling developers to implement features accurately on the first try.

## Preparing for Handoff

### Design File Organization
Structure your deliverables to separate final work from explorations.
- **Pages:** Feature Name, States, Components, Archive.
- **Frames:** Label them clearly (e.g., `Profile / Loaded`, `Profile / Empty`).

### Naming Conventions
Naming is a shared language.
- Use **PascalCase** for components (`ProductCard`).
- Use **slash-notation** for variants (`PrimaryButton/Pressed`).
This matches the mental model of a codebase.

### Match Compose Thinking
Jetpack Compose is declarative. It builds UIs by stacking functions.
- Group elements into **Columns** (vertical) and **Rows** (horizontal).
- Use **Auto Layout** to simulate constraints.
- Avoid random groups; make every container meaningful.

## Compose-Aware Specifications

### Spacing Values
Android developers rely on the Material Design spacing scale (4, 8, 16, 24dp). Avoid random values like 13px. Sticking to the 8dp grid ensures your design fits the system.

### Typography Mapping
Map your styles to the **Material Type Scale** (`displayLarge`, `headlineMedium`, `bodyLarge`). Avoid creating custom text styles unless necessary. This ensures font scaling works automatically.

### Color Documentation
Hard-coded hex values break in dark mode. Specify colors using **Material Color Roles**.
- `colorScheme.primary` (Brand).
- `colorScheme.surface` (Background).
- `colorScheme.onSurface` (Text).
This allows the system to swap values based on the theme or wallpaper (Dynamic Color).

### Component Specifications
Define the logic, not just the look.
- **Visual:** Shape, Elevation, Stroke.
- **Sizing:** Fixed width? Fill width? Wrap content?
- **Content:** What happens if text is too long? (Truncate vs. Wrap).

## Creating Spec Documents

### Component Spec Template
```markdown
## Filled Button
- **Shape:** RoundedCornerShape(100)
- **Background:** colorScheme.primary
- **Typography:** labelLarge
- **Sizing:** Height 40dp, Min Width 64dp
- **States:**
  - Disabled: 38% opacity
  - Pressed: Ripple overlay
- **Accessibility:** Min touch target 48dp, Description="Button Text"
```

## Design QA Process

### Pre-Development Review
Run a self-check before handoff. Have you designed all states (Empty, Error, Loading)? Have you tested Dark Mode? Handing off incomplete work forces developers to guess.

### The Verification Loop
During development, request early builds.
- **Visual Accuracy:** Does spacing align with the 8dp grid?
- **Responsive Behavior:** Does the layout adapt from phone to tablet?
- **Theme Support:** Does Dark Mode work?
- **Accessibility:** Turn on TalkBack. Are touch targets large enough?

## Designer-Developer Collaboration

### Speak the Language
Learn basic Compose concepts.
- **Composable:** A UI function.
- **Modifier:** How you style/layout a component.
- **State:** What drives data updates.
Using these terms earns you respect and clarity.

### Communication Best Practices
- Explain the **Rationale**: "Button is at the bottom for reachability."
- Be **Specific**: Use overlays to show exactly where padding is off.
- Establish **Regular Touchpoints**: Kickoffs, Check-ins, QA Sessions.

## Tools for Handoff
- **Figma Dev Mode:** Inspect properties directly.
- **Material Theme Builder:** Export token files for developers.
- **Relay:** Generate production-ready Compose code from Figma components.

## Try It Yourself

### Exercise 1: Spec a Card
Create a complete spec for a Card component. List every visual property, state, and sizing constraint. Note accessibility requirements.

### Exercise 2: QA Review
Take a screenshot of an implemented screen. Overlay it on your design at 50% opacity. Note every difference. This "pixel peeping" trains your eye.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-handoff-quiz",
  "type": "multiple-choice",
  "title": "Design QA and Handoff",
  "description": "Test your understanding of Android design handoff.",
  "difficulty": "medium",
  "question": "When specifying colours for Android handoff, what should you reference to ensure proper theme support?",
  "options": [
    {
      "id": "a",
      "text": "Hex colour values like #6750A4",
      "isCorrect": false,
      "explanation": "Hard-coded hex values don't adapt to dark theme or dynamic colour."
    },
    {
      "id": "b",
      "text": "Material colour scheme roles like colorScheme.primary",
      "isCorrect": true,
      "explanation": "Correct! Using Material colour roles ensures colours automatically adapt to light/dark themes and support dynamic colour from the user's wallpaper."
    },
    {
      "id": "c",
      "text": "RGB values for precision",
      "isCorrect": false,
      "explanation": "RGB values, like hex, don't adapt to theme changes."
    },
    {
      "id": "d",
      "text": "Color names like 'blue' or 'purple'",
      "isCorrect": false,
      "explanation": "Vague colour names don't provide the precision needed for implementation."
    }
  ]
}
-->

## Key Takeaways

- **Naming** is your first tool for communication.
- Specs must speak **Material Design** (tokens, roles).
- Document **logic and behavior**, not just visuals.
- **Design QA** is a collaborative process.
- The goal is a **shared understanding** between design and engineering.

## Module Complete! 🎉

You've completed the Advanced Design module for Android. You now have the skills to design accessible, adaptive, and production-ready Android apps.

Return to [Course Home](/course) or continue with another track →
