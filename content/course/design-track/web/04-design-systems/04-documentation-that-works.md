# Documentation That Works

> **Quick Summary:** Documentation is the interface between your design system and its users. Without good docs, even great components go unused. Your goal is to answer the user's question before they have to ask it.

## The Documentation Problem

Many design systems fail not because the components are broken, but because nobody knows how to use them correctly.

**Signs of a documentation problem:**
*   Designers keep detaching instances because they "can't find the right variant."
*   Developers constantly message you: "Which button should I use here?"
*   Teams recreate existing patterns because they didn't know they existed.

Good documentation is a competitive advantage. It scales your decision-making so you don't have to be in every meeting.

## Writing for Your Audiences

Documentation usually fails because it tries to be everything to everyone in a single paragraph. You have distinct audiences with distinct needs.

### 1. The Designer
Designers are visual. They need to know *when* to use a component and *how* to manipulate it in Figma.
*   **Needs:** Visual examples, variant lists, "Do's and Don'ts," and clear links to the Figma library.
*   **Format:** Show, don't just tell. Use screenshots comparing correct vs. incorrect usage.

### 2. The Developer
Developers are functional. They need to get the code working quickly.
*   **Needs:** Installation commands, API references (props/types), copy-pasteable code snippets, and accessibility implementation details.
*   **Format:** Code blocks, props tables, and live playgrounds.

### 3. The Stakeholder
Product managers need to know what is available to put on their roadmap.
*   **Needs:** A high-level catalog of capabilities and the current status (Alpha, Beta, Stable).
*   **Format:** Component gallery grids and status dashboards.

## What to Document

A blank page is intimidating. Use this checklist for every component you document.

### The "Why" (Overview)
Start with the purpose. "The Button triggers an action." is useless. "Use the Primary Button for the main call-to-action on a screen; use Secondary Buttons for everything else" is helpful guidance.

### The "How" (Usage Guidelines)
This is the meat of your documentation.
*   **Placement:** Where does this component belong?
*   **Content:** How should we write labels for it? (e.g., "Use title case for headers, sentence case for body").
*   **Interaction:** What happens on hover, click, or error?

### The "What" (API & Specs)
For developers, list every prop.
*   `variant`: "primary" | "secondary" (default: "primary")
*   `isDisabled`: boolean
*   `onClick`: function

For designers, list the Figma variants (Size, State, Icon).

## Documentation Formats

Where should this documentation live?

**1. The dedicated documentation site**
Tools like Storybook, Zeroheight, or custom websites (built with Nextra or Docusaurus) are the gold standard. They allow you to render live code alongside design guidelines, acting as the single source of truth.

**2. In-tool documentation**
Don't make users leave their tool if you can help it.
*   **Figma:** Use component descriptions and annotation layers directly in the sticker sheet.
*   **Code:** Use JSDoc/TSDoc comments so developers see the documentation when they hover over the component in their IDE.

## Keeping It Alive

Outdated documentation is worse than no documentation—it breaks trust.

*   **Make it part of the definition of "Done".** A component isn't finished until the docs are updated.
*   **Automate what you can.** Use tools that generate props tables automatically from your TypeScript types. You should never have to manually type out API tables.
*   **Listen to questions.** Every time someone asks you a question about the system, it means the documentation failed. Answer the question, then update the docs so the next person doesn't have to ask.

## Example: A Great Component Page

Instead of a generic template, here is what a high-quality documentation page looks like for a standard **Button** component. Notice how it guides the user.

```markdown
# Button

Buttons allow users to take actions, and make choices, with a single tap.

## Usage

Use buttons for important actions like submitting a form, canceling a process, or creating a new item.

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
```

## Try It Yourself

### Exercise 1: Audit an Existing Component
Pick a component in your current project. Read its documentation (if it exists).
*   Does it explain *when* to use it?
*   Are the code snippets accurate?
*   Does it mention accessibility?

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

-   Documentation bridges the gap between the system and the user.
-   Address specific audiences: Designers need visuals; Developers need code; Managers need status.
-   Automate technical docs (API tables) to keep them in sync with code.
-   Treat documentation questions as bugs in the docs.

## Next Steps

Continue to [Maintaining and Evolving](./05-maintaining-and-evolving.md) →
