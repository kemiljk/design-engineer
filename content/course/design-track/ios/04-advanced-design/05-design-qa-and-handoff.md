# Design QA and Handoff for iOS

> **Quick Summary:** Great design doesn't end with the mockup. Learn how to ensure your iOS designs are implemented correctly and how to collaborate effectively with SwiftUI developers to ship pixel-perfect apps.

## What You'll Learn

- Why handoff matters and how to prepare designs for developers
- Design file organisation and component structure
- Matching SwiftUI thinking in your designs
- Writing clear specifications and annotations
- Conducting QA to ensure pixel-perfect implementation

## Why Handoff Matters

The transition from design file to production code is the most dangerous moment in the product lifecycle. It is where "what we imagined" often diverges from "what we shipped."

A poor handoff creates a cascade of inefficiencies. Visual discrepancies frustrate designers. Missing specs force developers to guess. This leads to "design debt" that is expensive to fix later. Effective handoff isn't a "transfer of ownership"—it's a continued collaboration.

## Preparing for Handoff

### Design File Organisation
Your file is a map. If it's cluttered, developers get lost.
Ensure your file is organised by deleting explorations, structuring pages logically into specs and flows, and naming all layers semantically to help developers map them to code.

### Component Structure
Think like a developer. SwiftUI builds views using stacks.
Think in stacks by grouping vertical elements into **VStacks** and horizontal elements into **HStacks** to validate your layout logic.
This validates that your layout logic is actually buildable.

## SwiftUI-Aware Specifications

### Spacing Values
iOS relies on a consistent grid. Stick to the system token scale:
Adhere to the system token scale: **4pt** for tiny spacing, **8pt** for related items, **16pt** for standard padding, and **24pt** or more for section breaks.

### Typography Specs
Never just specify "SF Pro 17pt". Specify the **Text Style** (e.g., `.body`, `.headline`). This ensures the app supports Dynamic Type automatically.

### Colour Documentation
Use semantic tokens.
Document semantic tokens like **primary colour**, **system background**, and your **accent colour** to prevent hard-coded values that break in Dark Mode.
Documenting these tokens prevents hard-coded hex values that break in Dark Mode.

### Component Specs
For every component, document:
For every component, document the visual properties like radius and shadow, the layout constraints, and interactive details like touch targets and states.

## Creating a Spec Document

### Essential Information
For each screen, provide:
Provide an overview of the screen's purpose, the intended user flow, and critical edge cases like empty or error states.

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
As features are built, verify visual accuracy against the grid, ensure animations feel right, and test accessibility with VoiceOver and Dynamic Type.

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
Establish feedback loops through kickoff alignment, informal desk checks, and dedicated bug bashes to fix visual polish issues.

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

- A professional handoff involves **organising** design files with semantically named layers
- **specifying** values using points **specifying** values using points
- semantic tokens that align with iOS conventions semantic tokens that align with iOS conventions
- active **collaboration** ensures the final product speaks the native language of SwiftUI
- active **collaboration** ensures the final product speaks the native language of SwiftUI

## Module Complete! 🎉

You've completed the Advanced Design module for iOS. You now have the skills to design accessible, adaptive, and production-ready iOS apps.

Return to [Course Home](/course) or continue with another track →
