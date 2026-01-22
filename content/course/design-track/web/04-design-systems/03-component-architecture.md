# Component Architecture

> **Quick Summary:** Well-architected components are composable, flexible, and maintainable—they scale with your system instead of becoming technical debt.

## What You'll Learn

- Core principles of good component architecture
- How to build robust variants and states
- Composition patterns for handling complex UI structures
- Strategies for planning long-term flexibility and evolution

## Principles of Component Architecture

Building a component is easy. Building a *system* of components that doesn't collapse under its own weight is hard. Good architecture is about making the right trade-offs between flexibility and constraint.

### Single Responsibility

The "Swiss Army Knife" is a bad metaphor for components. A component that tries to do everything usually does nothing well.

**Bad:** A `Card` component that handles fetching data, formatting dates, tracking analytics, and positioning itself on the page.
**Good:** A `Card` component that simply renders the content you give it.

If your component API has 30 props and half of them are mutually exclusive (e.g., `hasImage` and `isVideoMode`), you likely have two components trapped in one file. Split them up.

### Composability

The best components work like LEGO bricks. They don't know or care what they are connected to; they just snap together.

Instead of building a `UserCard` that hard-codes a `UserAvatar` and `UserName` inside it, build a generic `Card` that accepts *any* content. This allows you to reuse the `Card` container for a `ProductCard`, a `NewsCard`, or a `SettingsPanel` without changing a line of code.

### Flexibility Without Bloat

There is a tension between making a component flexible ("It can do anything!") and making it easy to use ("It just works!").

**Too Rigid:** A button that can only be blue and 40px high.
**Too Flexible:** A button where you have to pass in the background colour, text colour, padding, and border radius every time you use it.
**Just Right:** A button that offers a limited set of meaningful variants (`primary`, `secondary`, `danger`) but handles the visual details internally.

## Designing Component Variants

Variants are predefined configurations of a component. They communicate intent.

<!-- visual-example: component-variants-demo -->

**Semantic Variants:**
Don't name variants after their look (`BlueButton`, `RedButton`). Name them after their purpose (`Primary`, `Danger`). If you rebrand and the primary colour changes to purple, `BlueButton` becomes a lie, but `Primary` remains true.

**Hierarchy:**
Most components require a clear hierarchy of emphasis, ranging from a primary solid fill for the main screen action to secondary outlines for alternative choices and tertiary ghost variants for low-priority text-only links.

**Sizes:**
Standardise your sizing so that a "Small" button aligns perfectly with a "Small" input field, ensuring visual rhythm across the interface.

## Designing Component States

A component is a state machine. It doesn't just look one way; it morphs based on interaction and data.

<!-- visual-example: component-states-demo -->
<!-- illustration: component-states -->

Every interactive element must provide feedback through distinct states, using hover to indicate clickability and active or pressed states to confirm user selection. Additionally, focus states are critical for keyboard navigation and accessibility, while disabled states clearly communicate when an action is temporarily unavailable.

Components must also handle the data lifecycle, employing loading states like skeletons or spinners to manage wait times, and empty states to provide helpful guidance when no content is present. Error states are equally vital, clearly explaining what went wrong and offering a direct path to a resolution.

## Composition Patterns

How do you build complex components from simple ones?

### The Slot Pattern
Instead of passing data strings (`title="Hello"`), pass components (`title={<h1>Hello</h1>}`). This gives the consumer full control over the rendering. They can pass an icon, a link, or a tooltip into that slot without the parent component needing to know about it.

### Compound Components
This pattern links multiple components together to share state implicitly.

```jsx
<Select>
  <Select.Trigger />
  <Select.Content>
    <Select.Item value="1">Option 1</Select.Item>
  </Select.Content>
</Select>
```

The `Select` parent manages the open/closed state, while the children handle the rendering. It provides great flexibility in layout while keeping the logic encapsulated.

### Layout Components
Separate layout from content. Instead of adding `margin-bottom` to your `Button`, wrap it in a `Stack` or `Box` component that handles the spacing. This makes the `Button` reusable in any context, whether it needs margin or not.

## Component API Design

The API (Application Programming Interface) is the "user interface" for developers using your component. It should be intuitive and predictable.

**Naming Props:**
Use standard HTML attributes where possible. If it acts like an `onclick`, call it `onClick`, not `handlePress`. Use booleans for flags (`disabled`, `loading`) and enums for multiple choices (`size="sm" | "md" | "lg"`).

**Defaults:**
Sensible defaults reduce boilerplate. A `Button` should probably default to `size="medium"` and `variant="primary"` (or secondary, depending on your system). The user should only have to specify what is *different* from the norm.

## Documentation Structure

A component without documentation is a black box. Good documentation includes:

Good documentation includes an overview of the component's purpose and usage context, accompanied by live examples that demonstrate its functionality. It should also feature a clear props table detailing every accepted input and type, along with "best practice" guidelines and specific notes on accessibility requirements like keyboard support and ARIA labels.

## Planning for Evolution

Your components will change. Plan for it.

**Extensibility:**
Allow users to pass a `className` or `style` prop to override styles in edge cases (but warn them about using it).

**Versioning:**
If you need to make a breaking change (like renaming a prop), consider if you can support both the old and new name for a while (deprecation) before removing the old one. This allows teams to upgrade at their own pace.

## Try It Yourself

### Exercise 1: Component Specification
Perform a component specification by choosing a "Notification Toast" and listing its required variants—such as success, error, and info—alongside its visual states and full API including title, description, and duration.

### Exercise 2: Composition Design
Identify the atoms like avatars and timestamps that make up a comment section and determine how they compose into molecules like headers and actions before forming a complete comment thread.

### Exercise 3: API Review
Examine a component in your current codebase to determine if its prop names are intuitive, if it has taken on too much responsibility, and whether its structure could be simplified through better composition.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "component-architecture-quiz",
  "type": "multiple-choice",
  "title": "Component Architecture",
  "description": "Test your understanding of good component architecture principles.",
  "difficulty": "medium",
  "question": "A Button component handles button rendering, form submission logic, analytics tracking, and tooltip positioning. What principle does this violate?",
  "options": [
    {
      "id": "a",
      "text": "Composability—buttons should be able to combine with other components",
      "isCorrect": false,
      "explanation": "While composability is important, this component's issue is more fundamental."
    },
    {
      "id": "b",
      "text": "Consistency—different buttons should work the same way",
      "isCorrect": false,
      "explanation": "Consistency is about similar components working similarly, not about a single component's scope."
    },
    {
      "id": "c",
      "text": "Single Responsibility—each component should do one thing well",
      "isCorrect": true,
      "explanation": "Correct! A Button should handle button rendering and interactions. Form submission, analytics, and tooltips should be separate concerns—either in parent components or as separate utilities."
    },
    {
      "id": "d",
      "text": "Flexibility—components should handle common cases elegantly",
      "isCorrect": false,
      "explanation": "Flexibility is about avoiding both rigidity and bloat—this component has too much responsibility, which is a different issue."
    }
  ]
}
-->

## Key Takeaways

Good components adhere to the single responsibility principle, doing one thing well while leveraging composition to build complex user interfaces. By using variants to handle semantic differences and props for customisation, you can design for every data and interaction state while ensuring APIs remain intuitive and prepared for future evolution through versioning.

## Next Steps

Continue to [Documentation That Works](./04-documentation-that-works.md) →
