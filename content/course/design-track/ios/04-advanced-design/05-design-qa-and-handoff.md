# Design QA and Handoff for iOS

> **Quick Summary:** Great design doesn't end with the mockup. Learn how to ensure your iOS designs are implemented correctly and how to collaborate effectively with SwiftUI developers to ship pixel-perfect apps.

## Why Handoff Matters

The transition from design file to production code is the most dangerous moment in the product lifecycle. It is where "what we imagined" often diverges from "what we shipped."

A poor handoff creates a cascade of inefficiencies. Visual discrepancies frustrate designers. Missing specs force developers to guess. This leads to "design debt" that is expensive to fix later. Effective handoff isn't a "transfer of ownership"—it's a continued collaboration.

## Preparing for Handoff

### Design File Organization
Your file is a map. If it's cluttered, developers get lost.
- **Clean Up:** Delete explorations. Keep only the "Source of Truth."
- **Structure:** Organize pages logically (e.g., "Specs," "Flows," "Archive").
- **Naming:** Name layers semantically (`PrimaryButton/Pressed`, not `Frame 42`). This helps developers map layers to code components.

### Component Structure
Think like a developer. SwiftUI builds views using stacks.
- Group vertical elements into **Auto Layout Frames** (VStacks).
- Group horizontal elements into Auto Layout Frames (HStacks).
This validates that your layout logic is actually buildable.

## SwiftUI-Aware Specifications

### Spacing Values
iOS relies on a consistent grid. Stick to the system token scale:
- **4pt:** Tiny spacing.
- **8pt:** Standard spacing between related items.
- **16pt:** Standard padding.
- **24pt+:** Section breaks.

### Typography Specs
Never just specify "SF Pro 17pt". Specify the **Text Style** (e.g., `.body`, `.headline`). This ensures the app supports Dynamic Type automatically.

### Colour Documentation
Use semantic tokens.
- `Color.primary` (Black in Light, White in Dark).
- `Color.systemBackground` (Base layer).
- `Color.accentColor` (Your brand colour).
Documenting these tokens prevents hard-coded hex values that break in Dark Mode.

### Component Specs
For every component, document:
- **Visual:** Radius, Border, Shadow.
- **Layout:** Fixed width? Flexible width? Min/Max constraints?
- **Interactive:** Touch target size (44pt+), Pressed state, Disabled state.

## Creating a Spec Document

### Essential Information
For each screen, provide:
- **Overview:** The purpose of the screen.
- **Flow:** Where does the user come from? Where do they go?
- **Edge Cases:** Empty states, Loading states, Error states. What happens if the text is too long?

### Example Component Spec
```markdown
## Primary Button
- **Background:** AccentColor
- **Radius:** 12pt
- **Font:** .headline (Semibold)
- **States:**
  - Pressed: 0.8 opacity, 0.98 scale
  - Disabled: 0.5 opacity
- **Accessibility:** Label = "Button Text", Traits = .button
```

## Design QA Process

### Pre-Development Review
Before writing code, walk through the design with the developer. Identify tricky layouts or animations. Catching "impossible" designs here saves days of coding.

### During Development
As features are built, check the implementation.
- **Visual:** Does the spacing match the grid?
- **Interactive:** Do the animations feel right?
- **Accessibility:** Does it work with VoiceOver? Does Dynamic Type break the layout?

### QA Checklist
- [ ] Visual accuracy (Colours, Fonts, Spacing).
- [ ] Dark Mode verification.
- [ ] Dynamic Type scaling.
- [ ] Loading and Error states.
- [ ] Touch target sizes.

## Designer-Developer Collaboration

### Shared Language
Learn the basics of SwiftUI concepts (Views, Modifiers, Stacks). You don't need to code, but knowing the vocabulary helps you explain your intent.

### Feedback Loops
- **Kickoff:** Align on goals.
- **Desk Checks:** Quick, informal reviews of work-in-progress.
- **Bug Bash:** Dedicated time to find and fix visual polish issues before release.

## Tools for Handoff
- **Figma Dev Mode:** The industry standard for inspection.
- **Xcode Previews:** Ask developers to show you live previews of components.
- **TestFlight:** The only way to test the real "feel" on a device.

## Try It Yourself

### Exercise 1: Spec a Component
Choose a key component. Document every aspect: visual properties, states, variations, and accessibility. Write it as if handing off to a remote developer.

### Exercise 2: QA Walkthrough
Take an existing app screen. Compare it to the design. Note every discrepancy. Prioritize them (P1: Broken, P2: Wrong, P3: Polish).

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-handoff-quiz",
  "type": "multiple-choice",
  "title": "Design QA and Handoff",
  "description": "Test your understanding of the handoff process.",
  "difficulty": "medium",
  "question": "When specifying typography for iOS handoff, what should you reference to ensure consistent implementation?",
  "options": [
    {
      "id": "a",
      "text": "Generic font names like 'Sans Serif Bold 17px'",
      "isCorrect": false,
      "explanation": "Generic names don't help developers implement the correct iOS text style."
    },
    {
      "id": "b",
      "text": "iOS text styles like .headline, .body, or .caption",
      "isCorrect": true,
      "explanation": "Correct! Referencing iOS text styles ensures developers use the system styles that support Dynamic Type and maintain platform consistency."
    },
    {
      "id": "c",
      "text": "Only the pixel size of the text",
      "isCorrect": false,
      "explanation": "Pixel size alone misses important information like weight, style, and Dynamic Type behaviour."
    },
    {
      "id": "d",
      "text": "Screenshots of the text without measurements",
      "isCorrect": false,
      "explanation": "Screenshots don't provide the precise specifications developers need."
    }
  ]
}
-->

## Key Takeaways

- **Organize** design files with developer-friendly naming.
- **Specify** values using iOS conventions (points, semantic tokens).
- **Document** all states, appearances, and edge cases.
- **QA** rigorously on real devices.
- **Collaborate** by speaking the language of SwiftUI.

## Module Complete! 🎉

You've completed the Advanced Design module for iOS. You now have the skills to design accessible, adaptive, and production-ready iOS apps.

Return to [Course Home](/course) or continue with another track →
