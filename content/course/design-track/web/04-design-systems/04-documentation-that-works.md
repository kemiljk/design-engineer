# Documentation That Works

> **Quick Summary:** Documentation is the interface between your design system and its users. Without good docs, even great components go unused. Your goal is to answer the user's question before they have to ask it.

## What You'll Learn

- Why documentation matters for design systems
- Writing for different audiences (designers, developers, stakeholders)
- Best practices for effective documentation
- How to structure documentation that answers questions before they're asked

## The Documentation Problem

Many design systems fail not because the components are broken, but because nobody knows how to use them correctly.

Common signs of a documentation problem include designers detaching instances because they cannot find the correct variants, or developers frequently asking which buttons to use for specific contexts. Furthermore, if teams are repeatedly recreating existing patterns they didn't know existed, your documentation is likely failing to bridge the gap.

Good documentation is a competitive advantage. It scales your decision-making so you don't have to be in every meeting.

## Writing for Your Audiences

Documentation usually fails because it tries to be everything to everyone in a single paragraph. You have distinct audiences with distinct needs.

### 1. The Designer
Designers require visual examples, variant lists, and "Do and Don't" guidelines with clear links to the Figma library. This information is best presented by showing rather than just telling, using screenshots to compare correct and incorrect usage.

### 2. The Developer
Developers need functional details such as installation commands, API references for props and types, and copy-pasteable code snippets. These should be provided alongside accessibility implementation details through code blocks, props tables, and live playgrounds.

### 3. The Stakeholder
Stakeholders like product managers need a high-level catalog of capabilities and current development statuses ranging from alpha to stable. A component gallery grid or a status dashboard is the most effective format for this audience.

## What to Document

A blank page is intimidating. Use this checklist for every component you document.

### The "Why" (Overview)
Start with the purpose. "The Button triggers an action." is useless. "Use the Primary Button for the main call-to-action on a screen; use Secondary Buttons for everything else" is helpful guidance.

### The "How" (Usage Guidelines)
This is the meat of your documentation.
Detail where the component belongs within the interface and establish clear content guidelines for labels, such as when to use title case versus sentence case. Additionally, document interaction behaviours for hover, click, and error states to ensure a consistent user experience.

### The "What" (API & Specs)
For developers, provide a comprehensive list of props such as `variant`, `isDisabled`, and `onClick`, along with their valid types and default values.

For designers, list the Figma variants (Size, State, Icon).

## Documentation Formats

Where should this documentation live?

**1. The dedicated documentation site**
Tools like Storybook, Zeroheight, or custom websites (built with Nextra or Docusaurus) are the gold standard. They allow you to render live code alongside design guidelines, acting as the single source of truth.

In-tool documentation meets users where they already work, such as by using component descriptions and annotation layers within Figma. For developers, JSDoc and TSDoc comments allow them to view necessary documentation directly in their IDE when hovering over a component.

## Keeping It Alive

Outdated documentation is worse than no documentation—it breaks trust.

Keep documentation relevant by making its update part of the official "definition of done" for any component. Automate technical sections like props tables from TypeScript types to prevent manual errors, and treat every direct question from a team member as a sign that your documentation needs further refinement.

## Example: A Great Component Page

Instead of a generic template, here is what a high-quality documentation page looks like for a standard **Button** component. Notice how it guides the user.

```markdown
# Button

Buttons allow users to take actions, and make choices, with a single tap.

## Usage

Use buttons for important actions like submitting a form, cancelling a process, or creating a new item.

**Do not use buttons for navigation.** Use Links for that.

## Examples

<!-- visual-example: button-usage-demo -->

## Anatomy

<!-- visual-example: button-anatomy-demo -->

## Variants

### Primary
Used for the most important action on the page. There should rarely be more than one Primary Button per screen.
<!-- visual-example: button-primary-demo -->

### Secondary
Used for secondary actions or to reduce visual weight when next to a Primary Button.
<!-- visual-example: button-secondary-demo -->

### Ghost
Used for low-priority actions, often in toolbars or cards.
<!-- visual-example: button-ghost-demo -->

## API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'ghost' | 'primary' | Controls the visual style |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Controls height and padding |
| isLoading | boolean | false | Shows a spinner and disables clicks |
| leftIcon | ReactNode | undefined | Adds an icon before the label |

## Accessibility

- **Keyboard:** Users can trigger the button with `Enter` or `Space`.
- **Focus:** The button receives a visible focus ring when tabbed to.
- **Labels:** If the button contains only an icon, you must provide an `aria-label`.

## Try It Yourself

### Exercise 1: Audit an Existing Component
Audit an existing component by reading its available documentation to see if it clearly explains when to use the element, if its code snippets are accurate, and if it explicitly addresses accessibility requirements.

### Exercise 2: Write a "Do and Don't"
For a **Modal** component, write three "Do" rules and three "Don't" rules regarding its usage. (e.g., "Don't: Use a modal for a complex workflow requiring navigation.")

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "documentation-quiz",
  "type": "multiple-choice",
  "title": "Effective Documentation",
  "description": "Test your understanding of documentation best practices.",
  "difficulty": "easy",
  "question": "What is the most important first piece of information to include in component documentation?",
  "options": [
    {
      "id": "a",
      "text": "The full API reference with all props and types",
      "isCorrect": false,
      "explanation": "API reference is important but not the first thing users need—they first need to know if this is the right component."
    },
    {
      "id": "b",
      "text": "When and why to use this component (starting with 'why')",
      "isCorrect": true,
      "explanation": "Correct! Before explaining how to use a component, explain when to use it. Users need to know if this component solves their problem before diving into the API."
    },
    {
      "id": "c",
      "text": "Installation instructions and import statements",
      "isCorrect": false,
      "explanation": "Installation is important for getting started, but users first need to know if this component is right for their use case."
    },
    {
      "id": "d",
      "text": "Code examples showing all possible configurations",
      "isCorrect": false,
      "explanation": "Examples are valuable but overwhelming upfront. Start with the 'why' before showing all the 'how'."
    }
  ]
}
-->

## Key Takeaways

Effective documentation bridges the gap between a design system and its users by addressing the specific needs of designers, developers, and managers. By automating technical details and treating incoming questions as opportunities to refine the docs, you can ensure that your system remains a living, trusted source of truth.

## Next Steps

Continue to [Maintaining and Evolving](./05-maintaining-and-evolving.md) →
