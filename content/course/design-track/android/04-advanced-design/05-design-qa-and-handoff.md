# Design QA and Handoff for Android

> **Quick Summary:** Bridge the gap between design and implementation. Learn how to prepare your designs for Compose developers and ensure pixel-perfect results.

## What You'll Learn

- Preparing designs for handoff
- Compose-aware specifications
- Design QA process
- Effective designer-developer collaboration

<!-- illustration: design-handoff-flow -->

## Why Handoff Matters

Design doesn't stop when you finish the mockup. In fact, the most critical phase often begins after the pixels are polished: transferring that vision to the engineering team.

Poor handoff is a silent productivity killer. It manifests as visual inconsistencies that erode product quality over time, wasted hours spent on back-and-forth clarifications, and a frustrated relationship between design and engineering. When specs are unclear, developers are forced to guess, leading to delayed releases and "design debt" that is hard to fix later.

Conversely, a robust handoff process acts as a force multiplier. It enables developers to implement features accurately on the first try, speeds up the overall development cycle, and fosters a collaborative environment where both disciplines feel supported.

## Preparing for Handoff

The goal of preparation is to remove ambiguity. A developer opening your file should never have to wonder, "Is this the final version?" or "Which padding value did they mean?"

### Design File Organization

Your file structure is the first signal of intent. A disorganized file suggests disorganized thinking. Structure your deliverables to separate final, approved work from explorations and work-in-progress.

A clear hierarchy might look like this:

```text
📁 Feature Name
  📁 Final Designs
    - Light Theme
    - Dark Theme
    - Dynamic Color variants
  📁 States
    - Loading
    - Empty
    - Error
    - Success
  📁 Size Variations
    - Compact (Phone)
    - Medium (Tablet/Foldable)
    - Expanded (Desktop/Large Tablet)
  📁 Components
    - Specs & Variants
  📄 Handoff Notes
```

### Naming Conventions

Naming is more than just housekeeping; it is a shared language. When you name a layer `PrimaryButton/Pressed`, you are giving the developer a mental map that aligns with their codebase. When you leave a layer as `Frame 234` or `Group Copy Copy`, you force them to translate visual blobs into logical components every time they inspect the file.

Adopting a developer-friendly naming convention—like using PascalCase for components (`ProductCard`) or slash-notation for variants (`BottomSheet/Handle`)—reduces cognitive load and shows that you understand the implementation environment.

### Match Compose Thinking

Jetpack Compose, Android's modern UI toolkit, is declarative. It builds UIs by stacking "Composables" (functions) rather than nesting XML views. Your layer structure should reflect this mental model. Group elements logically into Columns (vertical stacks), Rows (horizontal stacks), and Boxes (z-index stacks). Instead of manually positioning elements, use auto-layout to simulate how Compose handles constraints and spacing.

## Compose-Aware Specifications

Standard CSS specs don't always translate 1:1 to Android. To be truly helpful, your specifications should speak the language of Material Design and Compose.

### Spacing Values

Android developers don't typically use random pixel values. They rely on the Material Design spacing scale. By sticking to this scale, you ensure your design fits naturally into the system.

| Name | Value | Use Case |
|------|-------|----------|
| xs | 4dp | Inline elements |
| sm | 8dp | Related items |
| md | 16dp | Section spacing |
| lg | 24dp | Major sections |
| xl | 32dp | Screen padding |

### Typography Mapping

Similarly, type styles should map to the Material Type Scale. Avoid creating custom text styles unless absolutely necessary. Using the system roles ensures that font scaling and dynamic type work automatically.

| Design | Material | Compose Implementation |
|--------|----------|---------|
| Display Large | displayLarge | `MaterialTheme.typography.displayLarge` |
| Headline Medium | headlineMedium | `MaterialTheme.typography.headlineMedium` |
| Body Large | bodyLarge | `MaterialTheme.typography.bodyLarge` |
| Label Small | labelSmall | `MaterialTheme.typography.labelSmall` |

### Color Documentation

Hard-coded hex values are brittle. They break in dark mode and fail to support Dynamic Color. Instead, specify colors using **Material Color Roles**. This abstraction allows the system to swap the actual color values based on the user's theme or wallpaper while preserving the semantic meaning of the element.

| Design Token | Compose Colour |
|--------------|----------------|
| Primary text | `MaterialTheme.colorScheme.onSurface` |
| Secondary text | `MaterialTheme.colorScheme.onSurfaceVariant` |
| Background | `MaterialTheme.colorScheme.surface` |
| Accent | `MaterialTheme.colorScheme.primary` |
| Error | `MaterialTheme.colorScheme.error` |

### Component Specifications

When specifying a component, go beyond just the visual properties. You need to define the logic of the component.

**Visual Properties** define the look: corner radius (Shape), shadow depth (Elevation), border strokes, and background colors.

**Sizing behaviors** tell the developer how the component adapts. Does it have a fixed width? Does it fill the available space? Does it wrap its content? Explicitly stating "Fill width, fixed height" prevents layout bugs on different screen sizes.

**Content rules** handle the variable data. What happens if the text is too long? Does it truncate or wrap? How do icons align if the text is short?

## Creating Spec Documents

### Screen Specifications

A visual mockup shows the "happy path," but a spec document explains the system. For each screen, provide a brief **Overview** covering its purpose, entry points, and how it adapts to different window size classes.

Detail the **Layout Structure**, explaining which parts scroll, which are pinned, and how safe areas (like the notch or gesture bar) are handled. Finally, document the **Interactions**—where does tapping this button lead? What happens when the user swipes?

### Component Spec Template

Here is an example of how to document a component thoroughly:

```markdown
## Filled Button

### Visual
- Shape: RoundedCornerShape(100)
- Background: colorScheme.primary
- Elevation: 0dp (resting), 2dp (pressed)

### Sizing
- Height: 40dp
- Padding: 24dp horizontal, 0dp vertical
- Min Width: 64dp

### Typography
- Style: labelLarge
- Color: colorScheme.onPrimary

### States
- Enabled: Full opacity
- Disabled: 38% content opacity
- Pressed: StateLayerOpacity.Pressed overlay
- Focused: StateLayerOpacity.Focus overlay

### Accessibility
- Min touch target: 48dp
- Content description: Button text
- Role: Button
```

## Design QA Process

Design Quality Assurance (QA) is the process of verifying that the implemented product matches the design intent. It is not just about finding bugs; it is about upholding the standard of quality.

### Pre-Development Review

Before you even hand off designs, run a self-check. Have you designed all the states? Are both light and dark themes complete? Have you tested your layout against different window size classes? Handing off incomplete work shifts the burden of decision-making to the developer, which often leads to "programmer art" solutions for edge cases.

### The Verification Loop

During development, establish a review loop. Don't wait until the feature is merged to look at it. Request early builds or screenshots.

**Visual Accuracy:** Check that colors utilize the correct theme roles and that spacing aligns with the 8dp grid. Verify typography styles and icon weights.

**Responsive Behavior:** Resize the window. Does the layout adapt gracefully from compact to medium to expanded? Do constraints hold up?

**Theme Support:** Toggle dark mode. Does the interface remain legible? Do surfaces elevate correctly (becoming lighter rather than using shadows)?

**Accessibility:** Turn on TalkBack. Are touch targets large enough? Are content descriptions present and meaningful?

## Designer-Developer Collaboration

The most effective tool for handoff is not a document, but a conversation.

### Speak the Language

Learning the basics of Compose helps you communicate effectively. Understanding that a **Composable** is just a UI function, a **Modifier** is how you style it, and **State** is what drives data updates allows you to speak to developers in their own terms.

### Communication Best Practices

When writing specs, use platform-standard units (dp, not px). Reference Material tokens rather than raw values. Most importantly, explain the **rationale**. Telling a developer *why* a button is placed at the bottom of the screen (e.g., "for reachability on tall devices") makes them a partner in the decision, rather than just an executioner of orders.

In reviews, be specific. Instead of saying "this looks wrong," provide a side-by-side comparison or an overlay showing exactly where the padding is off. Prioritize your feedback—distinguish between P1 (blocking issues) and P3 (polish).

### Regular Touchpoints

Establish a rhythm of collaboration:
1.  **Kickoff:** Walk through designs together before code is written.
2.  **Check-ins:** Review progress mid-flight to catch misunderstandings early.
3.  **QA Sessions:** A dedicated time for detailed review before release.
4.  **Retrospective:** Discuss what went well and what could be improved for next time.

## Tools for Handoff

- **Figma Dev Mode:** Use this to inspect properties and view component props directly.
- **Material Theme Builder:** Generate and export token files that developers can drop directly into the codebase.
- **Relay:** For teams using Figma, Relay allows you to package UI components and generate production-ready Compose code.

## Try It Yourself

### Exercise 1: Spec a Card Component

Create a complete specification for a Card component. Don't just draw it—define it. List every visual property, every state (hover, pressed, disabled), and the sizing constraints. Explicitly note accessibility requirements like touch targets and content descriptions.

### Exercise 2: QA Review

Take a screenshot of an implemented screen and place it next to your design in Figma. Set the screenshot to 50% opacity and overlay it. Note every difference. List them out and categorize them by severity. This "pixel peeping" trains your eye to spot subtle regressions.

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

- Organization and naming are your first tools for communication.
- Specifications must speak the language of Material Design (tokens, roles, scale).
- Documentation should cover logic and behavior, not just visuals.
- Design QA is a collaborative process of upholding quality.
- The goal is a shared understanding between design and engineering.

## Module Complete! 🎉

You've completed the Advanced Design module for Android. You now have skills to:
- Design accessible Android experiences
- Create adaptive dark mode and dynamic colour designs
- Use Material motion effectively
- Design for phones, tablets, foldables, and watches
- Collaborate with Compose developers

Return to [Course Home](/course) or continue with another track →
