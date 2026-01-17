# Design QA and Handoff for iOS

> **Quick Summary:** Great design doesn't end with the mockup. Learn how to ensure your iOS designs are implemented correctly and how to collaborate effectively with SwiftUI developers.

## What You'll Learn

- Preparing designs for handoff
- SwiftUI-aware specifications
- Design QA process
- Effective designer-developer collaboration

<!-- illustration: design-handoff-flow -->

## Why Handoff Matters

The transition from design file to production code is the most dangerous moment in the product lifecycle. It is where "what we imagined" often diverges from "what we shipped."

A poor handoff process creates a cascade of inefficiencies. Visual discrepancies frustrate designers who see their work degraded. Missing specifications force developers to make guesses, often leading to inconsistent UI behavior. Poor communication results in cycles of rework that delay shipping. Ultimately, relyig on QA to catch basic implementation errors is a waste of everyone's time; prevention is far cheaper than correction.

Effective handoff bridges this gap, treating the implementation phase not as a "transfer of ownership" but as a continued collaboration.

## Preparing for Handoff

### Design File Organization

Your design file is a map. If the map is cluttered with dead ends and old roads, the developer will get lost. Before sharing your work, clean it up. Structure your files to guide the viewer.

A well-organized file might look like this:

```text
📁 Screen Name
  📁 Final Designs
    - Light Mode
    - Dark Mode
    - Accessibility Sizes
  📁 States & Variations
    - Loading
    - Empty
    - Error
  📁 Interactions
    - Button States
    - Transitions
  📄 Specs & Notes
```

### Naming Conventions

Names in your design file should mirror the names in the codebase. This reduces the translation effort for developers. Avoid generic names like `Rectangle 47` or `Group Copy 3`. Instead, use semantic names like `PrimaryButton/Pressed` or `NavigationBar/Title`. This small discipline makes searching, inspecting, and understanding the file significantly faster for everyone involved.

### Component Structure

When organizing your layers, think like a SwiftUI developer. SwiftUI builds views using stacks: `VStack` (vertical), `HStack` (horizontal), and `ZStack` (layered depth). Group your related elements into Auto Layout frames that mirror these stacks. This helps developers verify that the layout logic in the design matches the logic they need to write in code.

## SwiftUI-Aware Specifications

### Spacing Values

iOS design isn't arbitrary. It relies on a consistent 8-point grid. When specifying spacing, stick to the system's token scale. This ensures that your app feels native and aligns with the platform's rhythm.

| Token | Value | Use Case |
|-------|-------|----------|
| xs | 4pt | Inline spacing |
| sm | 8pt | Related elements |
| md | 16pt | Section spacing |
| lg | 24pt | Major sections |
| xl | 32pt | Screen padding |

### Typography Specs

Similarly, iOS provides a set of Dynamic Type styles. Using these is critical because they allow the app to automatically respect the user's text size preferences. Never just specify "SF Pro 17pt"; specify the **Text Style** (e.g., `.body`).

| Design Name | iOS Style | Size/Weight |
|-------------|-----------|-------------|
| Title | `.title` | 28pt/Bold |
| Headline | `.headline` | 17pt/Semibold |
| Body | `.body` | 17pt/Regular |
| Caption | `.caption` | 12pt/Regular |

### Color Documentation

iOS colors are semantic. They adapt to their context. `Color.primary` isn't just black; it's black in Light Mode and white in Dark Mode. `Color.systemBackground` handles the subtle shifts between base and elevated layers. Specify your colors using these semantic tokens rather than raw hex values to ensure your app looks correct in all system appearances.

| Design Token | SwiftUI Colour |
|--------------|----------------|
| Label Primary | `Color.primary` |
| Label Secondary | `Color.secondary` |
| Background | `Color(UIColor.systemBackground)` |
| Accent | `Color.accentColor` |

### Component Specs

For every component, you must document the full range of its existence.

**Visual Properties** cover the basics: corner radius, border width, shadow definitions, and background fills.

**Layout Properties** define the rules of the component. Does it have fixed padding? Does it expand to fill the width? What are its minimum and maximum constraints?

**Interactive Properties** describe behavior. What is the touch target size (minimum 44pt)? How does it look when pressed? What is the disabled state? How is focus handled for keyboard or pointer users on iPad?

## Creating a Spec Document

### Essential Information

For each screen, provide context. A developer needs to know the **Screen Overview**—its purpose, where it fits in the user flow, and any platform-specific variations (like iPad).

Detail the **Layout Specifications**, including how safe areas and scroll behaviors are handled. List the **Components** used, noting their states and interactions. Finally, explicitly document **Edge Cases**—empty states, loading skeletons, error messages, and what happens when text is too long for its container.

### Example Component Spec

Here is an example of a clear, actionable component specification:

```markdown
## Primary Button

### Visual
- Background: AccentColor
- Corner Radius: 12pt
- Padding: 16pt horizontal, 14pt vertical

### Typography
- Font: SF Pro Semibold, 17pt
- Color: White

### States
- Normal: Full opacity
- Pressed: 85% opacity, scale 0.98
- Disabled: 50% opacity

### Accessibility
- Touch Target: 44pt minimum height
- Label: Button text
- Hint: None required
- Traits: .button
```

## Design QA Process

### Pre-Development Review

Before handoff, perform a "pre-flight check." Have you designed all necessary states (loading, error, empty)? Have you verified the design in both Light and Dark modes? Have you tested how the layout responds to Accessibility text sizes? Ensuring your design is robust before it reaches code prevents many common bugs.

### During Development

As the feature is being built, check the implementation against the specs. Look for:
- **Spacing:** Does it follow the grid?
- **Typography:** Are the correct system styles used?
- **Colors:** Do they match the semantic definitions?
- **Touch Targets:** Are they large enough (44pt+)?
- **Motion:** Do animations feel fluid and native?

### QA Checklist

When performing a formal Design QA pass, be systematic:

**Visual Accuracy:** Sample colors to ensure they match. Measure spacing to verify the grid. Check that icons are the correct optical weight.

**Responsive Behavior:** Test on the smallest device (iPhone SE) and the largest (iPhone Pro Max). If you support iPad, check split-view and slide-over behaviors.

**Accessibility:** Enable VoiceOver. Is the focus order logical? Are labels clear? Does Dynamic Type break the layout? Test "Reduce Motion" and "Increase Contrast" settings.

**Edge Cases:** Enter 300 characters into a text field. Does it wrap or truncate? What happens if the network request fails?

## Designer-Developer Collaboration

### Shared Language

The best way to collaborate is to speak the same language. You don't need to be an expert coder, but understanding basic SwiftUI concepts—Views, Modifiers, Stacks, State, and Bindings—helps you explain your intent clearly.

### Communication Tips

In your spec documents, use precise measurements (points, not pixels). Reference iOS system styles whenever possible. Include the "why" behind your decisions to help developers understand the goals.

In discussions, be open to technical constraints. If a specific blur effect is performance-heavy, work together to find a solution that achieves the visual goal without killing the frame rate.

### Feedback Loops

Establish a regular cadence of communication. Hold a **Kickoff** to review designs together. Schedule **Check-ins** to catch issues early. Perform **QA Sessions** before release, and hold a **Retrospective** to improve the process for the next feature.

## Tools for Handoff

- **Figma:** Use Dev Mode and Auto Layout to communicate intent.
- **Slack:** Maintain a dedicated channel for quick questions and visual feedback.
- **GitHub:** Link your designs directly to issues or PRs so the context is never lost.

## Try It Yourself

### Exercise 1: Spec a Component

Choose a key component from your design system. Document every aspect of it: visual properties, states, variations, and accessibility requirements. Write it out in Markdown format as if you were handing it off to a remote developer.

### Exercise 2: QA Walkthrough

Take an existing screen from a project or a popular app. Compare it side-by-side with your design (or a mental model of "perfect"). Note every discrepancy, prioritize them (P1/P2/P3), and document them with annotated screenshots.

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

- Organize design files with developer-friendly naming conventions.
- Specify values using iOS conventions (points, system colors, text styles).
- Document all states, appearances (light/dark), and edge cases.
- Establish a rigorous Design QA process to verify quality.
- Build collaborative relationships by learning the basics of SwiftUI.

## Module Complete! 🎉

You've completed the Advanced Design module for iOS. You now have the skills to:
- Design accessible iOS experiences
- Create beautiful dark mode designs
- Use motion effectively
- Adapt designs across Apple devices
- Collaborate with SwiftUI developers

Return to [Course Home](/course) or continue with another track →
